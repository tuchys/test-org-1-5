-- =============================================================================
-- Migration: 20240001000002_rpc_functions.sql
-- Description: RPC functions for atomic stock operations (decrement on sale,
--              restore on refund) and compound sale/refund creation.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. decrement_stock
--    Atomically reduces stock_quantity for a variant.
--    Raises an exception if stock is insufficient (prevents negative stock).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.decrement_stock(
  p_variant_id UUID,
  p_quantity   INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_rows_affected INTEGER;
BEGIN
  IF p_quantity <= 0 THEN
    RAISE EXCEPTION 'Quantity to decrement must be positive, got %', p_quantity;
  END IF;

  UPDATE public.product_variants
  SET stock_quantity = stock_quantity - p_quantity
  WHERE id = p_variant_id
    AND stock_quantity >= p_quantity;

  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;

  IF v_rows_affected = 0 THEN
    RAISE EXCEPTION
      'Insufficient stock for variant %. Either the variant does not exist or available stock is less than %.',
      p_variant_id, p_quantity;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.decrement_stock(UUID, INTEGER) TO authenticated;

-- ---------------------------------------------------------------------------
-- 2. restore_stock
--    Atomically restores (adds back) stock_quantity for a variant.
--    Used when processing refunds or cancellations.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.restore_stock(
  p_variant_id UUID,
  p_quantity   INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_rows_affected INTEGER;
BEGIN
  IF p_quantity <= 0 THEN
    RAISE EXCEPTION 'Quantity to restore must be positive, got %', p_quantity;
  END IF;

  UPDATE public.product_variants
  SET stock_quantity = stock_quantity + p_quantity
  WHERE id = p_variant_id;

  GET DIAGNOSTICS v_rows_affected = ROW_COUNT;

  IF v_rows_affected = 0 THEN
    RAISE EXCEPTION
      'Variant % not found. Cannot restore stock.',
      p_variant_id;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.restore_stock(UUID, INTEGER) TO authenticated;

-- ---------------------------------------------------------------------------
-- 3. create_sale_with_items
--    Creates a sale record along with all line items and atomically
--    decrements stock for each variant.  Returns the new sale UUID.
--
--    p_items JSONB format (array):
--      [
--        {
--          "variant_id":      "<uuid>",
--          "quantity":        <int>,
--          "unit_price":      <numeric>,
--          "discount_amount": <numeric>,   -- optional, defaults to 0
--          "line_total":      <numeric>
--        },
--        ...
--      ]
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_sale_with_items(
  p_customer_id      UUID,
  p_items            JSONB,
  p_subtotal         NUMERIC,
  p_tax_amount       NUMERIC,
  p_discount_amount  NUMERIC,
  p_total_amount     NUMERIC,
  p_payment_method   TEXT    DEFAULT NULL,
  p_notes            TEXT    DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sale_id   UUID;
  v_item      JSONB;
  v_variant_id UUID;
  v_quantity  INTEGER;
BEGIN
  -- Insert the sale record
  INSERT INTO public.sales (
    customer_id,
    subtotal,
    tax_amount,
    discount_amount,
    total_amount,
    payment_method,
    notes,
    created_by
  ) VALUES (
    p_customer_id,
    p_subtotal,
    COALESCE(p_tax_amount, 0),
    COALESCE(p_discount_amount, 0),
    p_total_amount,
    p_payment_method,
    p_notes,
    auth.uid()
  )
  RETURNING id INTO v_sale_id;

  -- Process each line item
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_variant_id := (v_item->>'variant_id')::UUID;
    v_quantity   := (v_item->>'quantity')::INTEGER;

    -- Insert the line item
    INSERT INTO public.sale_line_items (
      sale_id,
      variant_id,
      quantity,
      unit_price,
      discount_amount,
      line_total
    ) VALUES (
      v_sale_id,
      v_variant_id,
      v_quantity,
      (v_item->>'unit_price')::NUMERIC,
      COALESCE((v_item->>'discount_amount')::NUMERIC, 0),
      (v_item->>'line_total')::NUMERIC
    );

    -- Atomically decrement stock (raises exception if insufficient)
    PERFORM public.decrement_stock(v_variant_id, v_quantity);
  END LOOP;

  RETURN v_sale_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_sale_with_items(
  UUID, JSONB, NUMERIC, NUMERIC, NUMERIC, NUMERIC, TEXT, TEXT
) TO authenticated;

-- ---------------------------------------------------------------------------
-- 4. process_refund
--    Creates a refund record for a sale, optionally restores stock for
--    specific items, and updates the sale status accordingly.
--    Returns the new refund UUID.
--
--    p_items JSONB format (array, optional):
--      [
--        { "variant_id": "<uuid>", "quantity": <int> },
--        ...
--      ]
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.process_refund(
  p_sale_id  UUID,
  p_amount   NUMERIC,
  p_reason   TEXT    DEFAULT NULL,
  p_items    JSONB   DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_refund_id        UUID;
  v_item             JSONB;
  v_total_refunded   NUMERIC;
  v_sale_total       NUMERIC;
  v_new_status       TEXT;
BEGIN
  -- Insert refund record
  INSERT INTO public.sale_refunds (
    sale_id,
    amount,
    reason,
    refunded_by
  ) VALUES (
    p_sale_id,
    p_amount,
    p_reason,
    auth.uid()
  )
  RETURNING id INTO v_refund_id;

  -- Restore stock if items are provided
  IF p_items IS NOT NULL AND jsonb_array_length(p_items) > 0 THEN
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
    LOOP
      PERFORM public.restore_stock(
        (v_item->>'variant_id')::UUID,
        (v_item->>'quantity')::INTEGER
      );
    END LOOP;
  END IF;

  -- Determine new sale status based on whether the refund is full or partial
  SELECT total_amount INTO v_sale_total
  FROM public.sales
  WHERE id = p_sale_id;

  SELECT COALESCE(SUM(amount), 0) INTO v_total_refunded
  FROM public.sale_refunds
  WHERE sale_id = p_sale_id;

  IF v_total_refunded >= v_sale_total THEN
    v_new_status := 'refunded';
  ELSE
    v_new_status := 'partially_refunded';
  END IF;

  UPDATE public.sales
  SET status = v_new_status
  WHERE id = p_sale_id;

  RETURN v_refund_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.process_refund(UUID, NUMERIC, TEXT, JSONB) TO authenticated;
