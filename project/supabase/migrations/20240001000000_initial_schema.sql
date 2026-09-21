-- =============================================================================
-- Migration: 20240001000000_initial_schema.sql
-- Description: Initial database schema for the Fashion Kardex POS system.
--              Creates all core tables in dependency order with constraints,
--              foreign keys, and updated_at trigger automation.
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
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  description   TEXT,
  image_url     TEXT,
  category      TEXT,
  is_active     BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 2. product_variants
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_variants (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id          UUID        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku                 TEXT        NOT NULL UNIQUE,
  name                TEXT        NOT NULL,
  price               NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock_quantity      INTEGER     NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold INTEGER     NOT NULL DEFAULT 10,
  is_active           BOOLEAN     NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. stock_adjustments
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.stock_adjustments (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id      UUID        NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity_change INTEGER     NOT NULL,
  reason          TEXT,
  adjusted_by     UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 4. customers
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customers (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        UNIQUE,
  phone      TEXT        UNIQUE,
  address    TEXT,
  notes      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 5. sales
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sales (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID        REFERENCES public.customers(id) ON DELETE SET NULL,
  sale_date        TIMESTAMPTZ NOT NULL DEFAULT now(),
  subtotal         NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax_amount       NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  discount_amount  NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount     NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  payment_method   TEXT,
  status           TEXT        NOT NULL DEFAULT 'completed'
                     CHECK (status IN ('pending', 'completed', 'refunded', 'partially_refunded')),
  notes            TEXT,
  created_by       UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_sales_updated_at
  BEFORE UPDATE ON public.sales
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 6. sale_line_items
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sale_line_items (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id         UUID        NOT NULL REFERENCES public.sales(id) ON DELETE CASCADE,
  variant_id      UUID        NOT NULL REFERENCES public.product_variants(id) ON DELETE RESTRICT,
  quantity        INTEGER     NOT NULL CHECK (quantity > 0),
  unit_price      NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  line_total      NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 7. sale_refunds
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sale_refunds (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id      UUID        NOT NULL REFERENCES public.sales(id) ON DELETE CASCADE,
  refund_date  TIMESTAMPTZ NOT NULL DEFAULT now(),
  amount       NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  reason       TEXT,
  refunded_by  UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
