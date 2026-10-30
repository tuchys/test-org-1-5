-- =============================================================================
-- Migration: 20240101000001_create_products.sql
-- Description: Creates the products and product_variants tables with all
--              constraints, indexes, and updated_at trigger automation.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Utility: updated_at trigger function
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- 1. products
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id                  UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT           NOT NULL,
  sku                 TEXT           NOT NULL,
  description         TEXT,
  category            TEXT,
  base_price          NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
  image_url           TEXT,
  low_stock_threshold INTEGER        NOT NULL DEFAULT 5,
  active              BOOLEAN        NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ    NOT NULL DEFAULT now(),

  CONSTRAINT products_sku_unique UNIQUE (sku)
);

CREATE INDEX IF NOT EXISTS idx_products_sku
  ON public.products (sku);

CREATE INDEX IF NOT EXISTS idx_products_category
  ON public.products (category);

CREATE INDEX IF NOT EXISTS idx_products_active
  ON public.products (active);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. product_variants
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id             UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     UUID           NOT NULL REFERENCES public.products (id) ON DELETE CASCADE,
  size           TEXT,
  color          TEXT,
  stock_quantity INTEGER        NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  price_override NUMERIC(10, 2) CHECK (price_override >= 0),
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ    NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id
  ON public.product_variants (product_id);

CREATE TRIGGER trg_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
