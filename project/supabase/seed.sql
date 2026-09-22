-- =============================================================================
-- seed.sql
-- Description: Development/testing seed data for the Fashion Kardex POS system.
--              Safe to run multiple times — uses ON CONFLICT DO NOTHING.
-- =============================================================================

DO $$
DECLARE
  v_product_1 UUID := '11111111-0000-0000-0000-000000000001';
  v_product_2 UUID := '11111111-0000-0000-0000-000000000002';
  v_product_3 UUID := '11111111-0000-0000-0000-000000000003';
BEGIN
  -- -------------------------------------------------------------------------
  -- Products
  -- -------------------------------------------------------------------------
  INSERT INTO public.products (id, name, description, category, is_active)
  VALUES
    (v_product_1, 'Classic Cotton T-Shirt',
     'A comfortable, everyday cotton t-shirt available in multiple sizes and colours.',
     'Tops', true),
    (v_product_2, 'Slim-Fit Chino Pants',
     'Modern slim-fit chinos crafted from lightweight stretch fabric.',
     'Bottoms', true),
    (v_product_3, 'Leather Belt',
     'Genuine leather belt with a brushed-metal buckle. One size fits most.',
     'Accessories', true)
  ON CONFLICT (id) DO NOTHING;

  -- -------------------------------------------------------------------------
  -- Product Variants (SKU, name, price, stock_quantity)
  -- -------------------------------------------------------------------------

  -- T-Shirt variants
  INSERT INTO public.product_variants
    (id, product_id, sku, name, price, stock_quantity, low_stock_threshold)
  VALUES
    ('22222222-0000-0000-0000-000000000001', v_product_1,
     'TSH-WHT-S',  'Classic Cotton T-Shirt – White / S',   19.99, 50, 10),
    ('22222222-0000-0000-0000-000000000002', v_product_1,
     'TSH-WHT-M',  'Classic Cotton T-Shirt – White / M',   19.99, 75, 10),
    ('22222222-0000-0000-0000-000000000003', v_product_1,
     'TSH-BLK-M',  'Classic Cotton T-Shirt – Black / M',   19.99, 60, 10),
    ('22222222-0000-0000-0000-000000000004', v_product_1,
     'TSH-BLK-L',  'Classic Cotton T-Shirt – Black / L',   19.99, 40, 10)
  ON CONFLICT (id) DO NOTHING;

  -- Chino variants
  INSERT INTO public.product_variants
    (id, product_id, sku, name, price, stock_quantity, low_stock_threshold)
  VALUES
    ('22222222-0000-0000-0000-000000000005', v_product_2,
     'CHN-KHK-30', 'Slim-Fit Chino – Khaki / W30 L32',   49.99, 30, 5),
    ('22222222-0000-0000-0000-000000000006', v_product_2,
     'CHN-KHK-32', 'Slim-Fit Chino – Khaki / W32 L32',   49.99, 25, 5),
    ('22222222-0000-0000-0000-000000000007', v_product_2,
     'CHN-NVY-32', 'Slim-Fit Chino – Navy / W32 L32',    49.99, 20, 5)
  ON CONFLICT (id) DO NOTHING;

  -- Leather Belt variant (one-size)
  INSERT INTO public.product_variants
    (id, product_id, sku, name, price, stock_quantity, low_stock_threshold)
  VALUES
    ('22222222-0000-0000-0000-000000000008', v_product_3,
     'BLT-BRN-OS', 'Leather Belt – Brown / One Size',     29.99, 100, 15)
  ON CONFLICT (id) DO NOTHING;

  -- -------------------------------------------------------------------------
  -- Customers
  -- -------------------------------------------------------------------------
  INSERT INTO public.customers (id, name, email, phone, address)
  VALUES
    ('33333333-0000-0000-0000-000000000001',
     'María García',
     'maria.garcia@example.com',
     '+52-555-100-0001',
     'Av. Reforma 123, Ciudad de México, CDMX'),
    ('33333333-0000-0000-0000-000000000002',
     'Carlos López',
     'carlos.lopez@example.com',
     '+52-555-100-0002',
     'Calle Juárez 45, Guadalajara, Jalisco')
  ON CONFLICT (id) DO NOTHING;
END;
$$;
