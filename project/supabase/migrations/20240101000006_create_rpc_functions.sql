-- =============================================================================
-- Migration: 20240101000006_create_rpc_functions.sql
-- Description: Transactional RPC functions for atomic sale creation with stock
--              decrement and refund recording with stock restoration.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. create_sale_with_stock_decrement
--
--    Creates a sale record with line items while atomically decrementing stock
--    for each variant. Raises an exception and rolls back if any variant has
--    insufficient stock or does not exist.
--
--    p_line_items JSONB array element schema:
--      {
--        "variant_id": "<uuid>",
--        "quantity":   <int>,
--        "unit_price": <numeric>
--      }
--
--    Returns JSON:
--      { "sale_id": "<uuid>", "sale_number": <int>, "total_amount": <numeric> }
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_sale_with_stock_decrement(
  p_customer_id    UUID,
  p_payment_method TEXT,
  p_created_by     UUID,
  p_line_items     JSONB
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sale_id      UUID;
  v_sale_number  INTEGER;
  v_total        NUMERIC(10, 2) := 0;
  v_item         JSONB;
  v_variant_id   UUID;
  v_quantity     INTEGER;
  v_unit_price   NUMERIC(10, 2);
  v_curr_stock   INTEGER;
BEGIN
  -- ------------------------------------------------------------------
  -- Phase 1: Validate stock for every line item (lock rows for update)
  -- ------------------------------------------------------------------
  FOR v_item IN SELECT value FROM jsonb_array_elements(p_line_items)
  LOOP
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_quantity   := (v_item->>'quantity')::INTEGER;
    v_unit_price := (v_item->>'unit_price')::NUMERIC;

    IF v_quantity <= 0 THEN
      RAISE EXCEPTION 'Quantity must be positive for variant %', v_variant_id;
    END IF;

    SELECT stock_quantity
      INTO v_curr_stock
      FROM public.product_variants
     WHERE id = v_variant_id
       FOR UPDATE;          -- row-level lock prevents concurrent oversell

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Variant % not found', v_variant_id;
    END IF;

    IF v_curr_stock < v_quantity THEN
      RAISE EXCEPTION
        'Insufficient stock for variant %. Available: %, Requested: %',
        v_variant_id, v_curr_stock, v_quantity;
    END IF;

    v_total := v_total + (v_unit_price * v_quantity);
  END LOOP;

  -- ------------------------------------------------------------------
  -- Phase 2: Insert the sale record
  -- ------------------------------------------------------------------
  INSERT INTO public.sales (customer_id, payment_method, total_amount, created_by)
  VALUES (p_customer_id, p_payment_method, v_total, p_created_by)
  RETURNING id, sale_number
  INTO v_sale_id, v_sale_number;

  -- ------------------------------------------------------------------
  -- Phase 3: Insert line items, decrement stock, log adjustment
  -- ------------------------------------------------------------------
  FOR v_item IN SELECT value FROM jsonb_array_elements(p_line_items)
  LOOP
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_quantity   := (v_item->>'quantity')::INTEGER;
    v_unit_price := (v_item->>'unit_price')::NUMERIC;

    -- Line item
    INSERT INTO public.sale_line_items (sale_id, variant_id, quantity, unit_price)
    VALUES (v_sale_id, v_variant_id, v_quantity, v_unit_price);

    -- Decrement stock (CHECK constraint prevents going below 0 as safety net)
    UPDATE public.product_variants
       SET stock_quantity = stock_quantity - v_quantity
     WHERE id = v_variant_id;

    -- Audit log
    INSERT INTO public.stock_adjustments (variant_id, quantity_change, reason, created_by)
    VALUES (
      v_variant_id,
      -v_quantity,
      'Sale #' || v_sale_number::TEXT,
      p_created_by
    );
  END LOOP;

  RETURN json_build_object(
    'sale_id',      v_sale_id,
    'sale_number',  v_sale_number,
    'total_amount', v_total
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_sale_with_stock_decrement(UUID, TEXT, UUID, JSONB)
  TO authenticated;

-- ---------------------------------------------------------------------------
-- 2. process_refund_with_stock_restore
--
--    Records a refund for an existing sale and optionally restores stock for
--    the specified variant quantities. All changes are atomic.
--
--    p_restore_items JSONB array element schema (optional):
--      { "variant_id": "<uuid>", "quantity": <int> }
--
--    Returns JSON:
--      { "refund_id": "<uuid>", "sale_id": "<uuid>", "refund_amount": <numeric> }
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.process_refund_with_stock_restore(
  p_sale_id       UUID,
  p_refund_amount NUMERIC,
  p_reason        TEXT,
  p_created_by    UUID,
  p_restore_items JSONB DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_refund_id   UUID;
  v_sale_number INTEGER;
  v_item        JSONB;
  v_variant_id  UUID;
  v_quantity    INTEGER;
BEGIN
  -- Verify the sale exists
  SELECT sale_number
    INTO v_sale_number
    FROM public.sales
   WHERE id = p_sale_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Sale % not found', p_sale_id;
  END IF;

  -- Insert refund record
  INSERT INTO public.sale_refunds (sale_id, refund_amount, reason)
  VALUES (p_sale_id, p_refund_amount, p_reason)
  RETURNING id INTO v_refund_id;

  -- Optionally restore stock for each item
  IF p_restore_items IS NOT NULL AND jsonb_array_length(p_restore_items) > 0 THEN
    FOR v_item IN SELECT value FROM jsonb_array_elements(p_restore_items)
    LOOP
      v_variant_id := (v_item->>'variant_id')::UUID;
      v_quantity   := (v_item->>'quantity')::INTEGER;

      IF v_quantity <= 0 THEN
        RAISE EXCEPTION 'Restore quantity must be positive for variant %', v_variant_id;
      END IF;

      -- Restore stock
      UPDATE public.product_variants
         SET stock_quantity = stock_quantity + v_quantity
       WHERE id = v_variant_id;

      IF NOT FOUND THEN
        RAISE EXCEPTION 'Variant % not found — cannot restore stock', v_variant_id;
      END IF;

      -- Audit log
      INSERT INTO public.stock_adjustments (variant_id, quantity_change, reason, created_by)
      VALUES (
        v_variant_id,
        v_quantity,
        'Refund for Sale #' || v_sale_number::TEXT,
        p_created_by
      );
    END LOOP;
  END IF;

  RETURN json_build_object(
    'refund_id',     v_refund_id,
    'sale_id',       p_sale_id,
    'refund_amount', p_refund_amount
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.process_refund_with_stock_restore(UUID, NUMERIC, TEXT, UUID, JSONB)
  TO authenticated;
