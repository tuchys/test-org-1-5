-- =============================================================================
-- Migration: 20240001000001_rls_policies.sql
-- Description: Enable Row Level Security on all tables and grant authenticated
--              users full CRUD access via policies.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on products"
  ON public.products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on products"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on products"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on products"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- product_variants
-- ---------------------------------------------------------------------------
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on product_variants"
  ON public.product_variants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on product_variants"
  ON public.product_variants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on product_variants"
  ON public.product_variants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on product_variants"
  ON public.product_variants
  FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- stock_adjustments
-- ---------------------------------------------------------------------------
ALTER TABLE public.stock_adjustments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on stock_adjustments"
  ON public.stock_adjustments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on stock_adjustments"
  ON public.stock_adjustments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on stock_adjustments"
  ON public.stock_adjustments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on stock_adjustments"
  ON public.stock_adjustments
  FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on customers"
  ON public.customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on customers"
  ON public.customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on customers"
  ON public.customers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on customers"
  ON public.customers
  FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- sales
-- ---------------------------------------------------------------------------
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on sales"
  ON public.sales
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on sales"
  ON public.sales
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on sales"
  ON public.sales
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on sales"
  ON public.sales
  FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- sale_line_items
-- ---------------------------------------------------------------------------
ALTER TABLE public.sale_line_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on sale_line_items"
  ON public.sale_line_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on sale_line_items"
  ON public.sale_line_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on sale_line_items"
  ON public.sale_line_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on sale_line_items"
  ON public.sale_line_items
  FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- sale_refunds
-- ---------------------------------------------------------------------------
ALTER TABLE public.sale_refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated select on sale_refunds"
  ON public.sale_refunds
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on sale_refunds"
  ON public.sale_refunds
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on sale_refunds"
  ON public.sale_refunds
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on sale_refunds"
  ON public.sale_refunds
  FOR DELETE
  TO authenticated
  USING (true);
