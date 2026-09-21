-- =============================================================================
-- Migration: 20240001000003_indexes.sql
-- Description: Performance indexes on frequently queried columns and foreign
--              keys to improve query execution plans for the POS system.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- product_variants
-- ---------------------------------------------------------------------------
-- FK join from product_variants -> products
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id
  ON public.product_variants (product_id);

-- SKU lookups (also unique, but explicit index aids partial scans)
CREATE INDEX IF NOT EXISTS idx_product_variants_sku
  ON public.product_variants (sku);

-- Active-variant filtering
CREATE INDEX IF NOT EXISTS idx_product_variants_is_active
  ON public.product_variants (is_active);

-- ---------------------------------------------------------------------------
-- stock_adjustments
-- ---------------------------------------------------------------------------
-- FK join from stock_adjustments -> product_variants
CREATE INDEX IF NOT EXISTS idx_stock_adjustments_variant_id
  ON public.stock_adjustments (variant_id);

-- Chronological audit queries
CREATE INDEX IF NOT EXISTS idx_stock_adjustments_created_at
  ON public.stock_adjustments (created_at DESC);

-- ---------------------------------------------------------------------------
-- customers
-- ---------------------------------------------------------------------------
-- Unique constraints already create implicit indexes; explicit partial indexes
-- improve performance for IS NOT NULL lookups on optional columns.
CREATE INDEX IF NOT EXISTS idx_customers_email
  ON public.customers (email)
  WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_customers_phone
  ON public.customers (phone)
  WHERE phone IS NOT NULL;

-- Full-name search / ordering
CREATE INDEX IF NOT EXISTS idx_customers_name
  ON public.customers (name);

-- ---------------------------------------------------------------------------
-- sales
-- ---------------------------------------------------------------------------
-- FK join from sales -> customers
CREATE INDEX IF NOT EXISTS idx_sales_customer_id
  ON public.sales (customer_id);

-- Date-range queries (most recent first)
CREATE INDEX IF NOT EXISTS idx_sales_sale_date
  ON public.sales (sale_date DESC);

-- Status filtering (pending / completed / refunded)
CREATE INDEX IF NOT EXISTS idx_sales_status
  ON public.sales (status);

-- Queries scoped to a specific cashier / user
CREATE INDEX IF NOT EXISTS idx_sales_created_by
  ON public.sales (created_by);

-- ---------------------------------------------------------------------------
-- sale_line_items
-- ---------------------------------------------------------------------------
-- FK join from sale_line_items -> sales
CREATE INDEX IF NOT EXISTS idx_sale_line_items_sale_id
  ON public.sale_line_items (sale_id);

-- FK join from sale_line_items -> product_variants
CREATE INDEX IF NOT EXISTS idx_sale_line_items_variant_id
  ON public.sale_line_items (variant_id);

-- ---------------------------------------------------------------------------
-- sale_refunds
-- ---------------------------------------------------------------------------
-- FK join from sale_refunds -> sales
CREATE INDEX IF NOT EXISTS idx_sale_refunds_sale_id
  ON public.sale_refunds (sale_id);
