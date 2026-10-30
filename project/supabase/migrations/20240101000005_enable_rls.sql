-- =============================================================================
-- Migration: 20240101000005_enable_rls.sql
-- Description: Enables Row Level Security on all application tables and
--              grants authenticated users full CRUD access via policies.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read products"
  ON public.products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- product_variants
-- ---------------------------------------------------------------------------
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read product_variants"
  ON public.product_variants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert product_variants"
  ON public.product_variants FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update product_variants"
  ON public.product_variants FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete product_variants"
  ON public.product_variants FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- stock_adjustments
-- ---------------------------------------------------------------------------
ALTER TABLE public.stock_adjustments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read stock_adjustments"
  ON public.stock_adjustments FOR SELECT
  TO authenticated
  USING (true);

-- INSERT restricted to rows where created_by matches the calling user
CREATE POLICY "Authenticated users can insert stock_adjustments"
  ON public.stock_adjustments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update stock_adjustments"
  ON public.stock_adjustments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete stock_adjustments"
  ON public.stock_adjustments FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read customers"
  ON public.customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert customers"
  ON public.customers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update customers"
  ON public.customers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete customers"
  ON public.customers FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- sales
-- ---------------------------------------------------------------------------
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sales"
  ON public.sales FOR SELECT
  TO authenticated
  USING (true);

-- INSERT restricted to rows where created_by matches the calling user
CREATE POLICY "Authenticated users can insert sales"
  ON public.sales FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update sales"
  ON public.sales FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sales"
  ON public.sales FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- sale_line_items
-- ---------------------------------------------------------------------------
ALTER TABLE public.sale_line_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sale_line_items"
  ON public.sale_line_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sale_line_items"
  ON public.sale_line_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sale_line_items"
  ON public.sale_line_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sale_line_items"
  ON public.sale_line_items FOR DELETE
  TO authenticated
  USING (true);

-- ---------------------------------------------------------------------------
-- sale_refunds
-- ---------------------------------------------------------------------------
ALTER TABLE public.sale_refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sale_refunds"
  ON public.sale_refunds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sale_refunds"
  ON public.sale_refunds FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sale_refunds"
  ON public.sale_refunds FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sale_refunds"
  ON public.sale_refunds FOR DELETE
  TO authenticated
  USING (true);
