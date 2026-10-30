-- =============================================================================
-- Migration: 20240101000003_create_stock_adjustments.sql
-- Description: Creates the stock_adjustments table for tracking all inventory
--              changes. Append-only audit log — no updated_at column.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.stock_adjustments (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  variant_id      UUID        NOT NULL REFERENCES public.product_variants (id) ON DELETE RESTRICT,
  quantity_change INTEGER     NOT NULL,
  reason          TEXT,
  created_by      UUID        NOT NULL REFERENCES auth.users (id) ON DELETE RESTRICT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stock_adjustments_variant_id
  ON public.stock_adjustments (variant_id);

CREATE INDEX IF NOT EXISTS idx_stock_adjustments_created_by
  ON public.stock_adjustments (created_by);

CREATE INDEX IF NOT EXISTS idx_stock_adjustments_created_at
  ON public.stock_adjustments (created_at DESC);
