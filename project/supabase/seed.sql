-- =============================================================================
-- seed.sql
-- Description: Development/testing seed data for the Fashion Kardex POS system.
--              Safe to run multiple times — all inserts use ON CONFLICT DO NOTHING.
--              Fixed UUIDs ensure idempotency.
-- =============================================================================

DO $$
DECLARE
  -- Product UUIDs
  v_product_1 UUID := '11111111-0000-0000-0000-000000000001';
  v_product_2 UUID := '11111111-0000-0000-0000-000000000002';
  v_product_3 UUID := '11111111-0000-0000-0000-000000000003';
BEGIN
  -- -------------------------------------------------------------------------
  -- Products (name, sku, description, category, base_price, active)
  -- -------------------------------------------------------------------------
  INSERT INTO public.products (id, name, sku, description, category, base_price, low_stock_threshold, active)
  VALUES
    (v_product_1,
     'Classic Cotton T-Shirt',
     'TSH-CLASSIC',
     'A comfortable, everyday cotton t-shirt available in multiple sizes and colours.',
     'Tops',
     19.99,
     10,
     true),
    (v_product_2,
     'Slim-Fit Chino Pants',
     'CHN-SLIM',
     'Modern slim-fit chinos crafted from lightweight stretch fabric.',
     'Bottoms',
     49.99,
     5,
     true),
    (v_product_3,
     'Leather Belt',
     'BLT-LEATHER',
     'Genuine leather belt with a brushed-metal buckle. One size fits most.',
     'Accessories',
     29.99,
     15,
     true)
  ON CONFLICT (id) DO NOTHING;

  -- -------------------------------------------------------------------------
  -- Product Variants (product_id, size, color, stock_quantity, price_override)
  -- -------------------------------------------------------------------------

  -- T-Shirt variants
  INSERT INTO public.product_variants (id, product_id, size, color, stock_quantity, price_override)
  VALUES
    ('22222222-0000-0000-0000-000000000001', v_product_1, 'S',  'White', 50, NULL),
    ('22222222-0000-0000-0000-000000000002', v_product_1, 'M',  'White', 75, NULL),
    ('22222222-0000-0000-0000-000000000003', v_product_1, 'M',  'Black', 60, NULL),
    ('22222222-0000-0000-0000-000000000004', v_product_1, 'L',  'Black', 40, NULL)
  ON CONFLICT (id) DO NOTHING;

  -- Chino variants
  INSERT INTO public.product_variants (id, product_id, size, color, stock_quantity, price_override)
  VALUES
    ('22222222-0000-0000-0000-000000000005', v_product_2, 'W30 L32', 'Khaki', 30, NULL),
    ('22222222-0000-0000-0000-000000000006', v_product_2, 'W32 L32', 'Khaki', 25, NULL),
    ('22222222-0000-0000-0000-000000000007', v_product_2, 'W32 L32', 'Navy',  20, NULL)
  ON CONFLICT (id) DO NOTHING;

  -- Leather Belt variant (one-size)
  INSERT INTO public.product_variants (id, product_id, size, color, stock_quantity, price_override)
  VALUES
    ('22222222-0000-0000-0000-000000000008', v_product_3, 'One Size', 'Brown', 100, NULL)
  ON CONFLICT (id) DO NOTHING;

  -- -------------------------------------------------------------------------
  -- Customers (name, email, phone, address, active)
  -- -------------------------------------------------------------------------
  INSERT INTO public.customers (id, name, email, phone, address, active)
  VALUES
    ('33333333-0000-0000-0000-000000000001',
     'María García',
     'maria.garcia@example.com',
     '+52-555-100-0001',
     'Av. Reforma 123, Ciudad de México, CDMX',
     true),
    ('33333333-0000-0000-0000-000000000002',
     'Carlos López',
     'carlos.lopez@example.com',
     '+52-555-100-0002',
     'Calle Juárez 45, Guadalajara, Jalisco',
     true),
    ('33333333-0000-0000-0000-000000000003',
     'Ana Martínez',
     'ana.martinez@example.com',
     '+52-555-100-0003',
     'Blvd. Independencia 78, Monterrey, Nuevo León',
     true)
  ON CONFLICT (id) DO NOTHING;
END;
$$;
