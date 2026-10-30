-- =============================================================================
-- Migration: 20240101000004_create_sales.sql
-- Description: Creates the sales, sale_line_items, and sale_refunds tables.
--              Includes a sequence-backed sale_number for human-readable search.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Sequence for human-readable sale numbers (starts at 1000)
-- ---------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.sale_number_seq START 1000;

-- ---------------------------------------------------------------------------
-- 1. sales
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sales (
  id             UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_number    INTEGER        NOT NULL UNIQUE DEFAULT nextval('public.sale_number_seq'),
  customer_id    UUID           REFERENCES public.customers (id) ON DELETE SET NULL,
  payment_method TEXT           NOT NULL,
  total_amount   NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  created_by     UUID           NOT NULL REFERENCES auth.users (id) ON DELETE RESTRICT,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sales_sale_number
  ON public.sales (sale_number);

CREATE INDEX IF NOT EXISTS idx_sales_customer_id
  ON public.sales (customer_id);

CREATE INDEX IF NOT EXISTS idx_sales_created_by
  ON public.sales (created_by);

CREATE INDEX IF NOT EXISTS idx_sales_created_at
  ON public.sales (created_at DESC);

-- ---------------------------------------------------------------------------
-- 2. sale_line_items
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sale_line_items (
  id         UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id    UUID           NOT NULL REFERENCES public.sales (id) ON DELETE CASCADE,
  variant_id UUID           NOT NULL REFERENCES public.product_variants (id) ON DELETE RESTRICT,
  quantity   INTEGER        NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ    NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sale_line_items_sale_id
  ON public.sale_line_items (sale_id);

CREATE INDEX IF NOT EXISTS idx_sale_line_items_variant_id
  ON public.sale_line_items (variant_id);

-- ---------------------------------------------------------------------------
-- 3. sale_refunds
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sale_refunds (
  id            UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id       UUID           NOT NULL REFERENCES public.sales (id) ON DELETE RESTRICT,
  refund_amount NUMERIC(10, 2) NOT NULL CHECK (refund_amount > 0),
  reason        TEXT,
  created_at    TIMESTAMPTZ    NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sale_refunds_sale_id
  ON public.sale_refunds (sale_id);
