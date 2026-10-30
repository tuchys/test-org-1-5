-- =============================================================================
-- Migration: 20240101000002_create_customers.sql
-- Description: Creates the customers table with partial unique indexes on
--              email and phone (unique when not NULL), and active/updated_at
--              support.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.customers (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT,
  phone      TEXT,
  address    TEXT,
  notes      TEXT,
  active     BOOLEAN     NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique email only when not NULL (partial unique index)
CREATE UNIQUE INDEX IF NOT EXISTS customers_email_unique
  ON public.customers (email)
  WHERE email IS NOT NULL;

-- Unique phone only when not NULL (partial unique index)
CREATE UNIQUE INDEX IF NOT EXISTS customers_phone_unique
  ON public.customers (phone)
  WHERE phone IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_customers_active
  ON public.customers (active);

CREATE INDEX IF NOT EXISTS idx_customers_name
  ON public.customers (name);

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
