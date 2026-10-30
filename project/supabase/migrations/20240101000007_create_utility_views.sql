-- =============================================================================
-- Migration: 20240101000007_create_utility_views.sql
-- Description: Helpful views for common queries: low-stock variants and sale
--              summaries with refund totals.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- low_stock_variants
--   Returns all active product variants whose stock is at or below the
--   product's low_stock_threshold.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.low_stock_variants AS
SELECT
  pv.id,
  pv.product_id,
  p.name             AS product_name,
  p.sku,
  pv.size,
  pv.color,
  pv.stock_quantity,
  p.low_stock_threshold
FROM public.product_variants pv
JOIN public.products p ON p.id = pv.product_id
WHERE pv.stock_quantity <= p.low_stock_threshold
  AND p.active = true
ORDER BY pv.stock_quantity ASC;

GRANT SELECT ON public.low_stock_variants TO authenticated;

-- ---------------------------------------------------------------------------
-- sale_summaries
--   Returns each sale with customer name and cumulative refund total.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.sale_summaries AS
SELECT
  s.id,
  s.sale_number,
  s.customer_id,
  c.name                               AS customer_name,
  s.payment_method,
  s.total_amount,
  s.created_by,
  s.created_at,
  COALESCE(SUM(sr.refund_amount), 0)   AS total_refunded
FROM public.sales s
LEFT JOIN public.customers   c  ON c.id  = s.customer_id
LEFT JOIN public.sale_refunds sr ON sr.sale_id = s.id
GROUP BY s.id, c.name
ORDER BY s.created_at DESC;

GRANT SELECT ON public.sale_summaries TO authenticated;
