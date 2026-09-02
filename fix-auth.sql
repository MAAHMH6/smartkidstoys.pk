-- ==========================================================
-- SMARTKIDS TOYS — Fix "Database error querying schema"
-- Copy ALL of this and run in Supabase SQL Editor
-- ==========================================================

-- 1. Grant necessary permissions on the public schema to Supabase roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 2. Clean up any broken trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 3. Create a rock-solid, safe trigger for new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  cust_count INT;
  cust_num TEXT;
BEGIN
  SELECT COUNT(*) + 1 INTO cust_count FROM public.profiles WHERE is_admin = FALSE;
  cust_num := 'SKT-CUS-' || LPAD(cust_count::TEXT, 4, '0');

  INSERT INTO public.profiles (id, full_name, customer_number, phone, is_admin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    cust_num,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    CASE 
      WHEN NEW.email = 'admin@smartkidstoys.pk' THEN true 
      ELSE COALESCE((NEW.raw_user_meta_data->>'is_admin')::BOOLEAN, FALSE)
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = CASE WHEN EXCLUDED.phone <> '' THEN EXCLUDED.phone ELSE public.profiles.phone END,
    is_admin = CASE WHEN NEW.email = 'admin@smartkidstoys.pk' THEN true ELSE public.profiles.is_admin END;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Never crash auth signup/login if profile insert fails
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Clean and recreate the Admin Account properly with auth.identities
DO $$
DECLARE
  admin_uid UUID := gen_random_uuid();
BEGIN
  -- Remove any incomplete previous entries
  DELETE FROM auth.identities WHERE identity_data->>'email' = 'admin@smartkidstoys.pk';
  DELETE FROM auth.users WHERE email = 'admin@smartkidstoys.pk';
  DELETE FROM public.profiles WHERE id NOT IN (SELECT id FROM auth.users);

  -- Insert full valid auth.users entry
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    aud,
    role,
    is_super_admin
  ) VALUES (
    admin_uid,
    '00000000-0000-0000-0000-000000000000',
    'admin@smartkidstoys.pk',
    crypt('admin12345', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Admin","is_admin":true}',
    NOW(),
    NOW(),
    '',
    'authenticated',
    'authenticated',
    false
  );

  -- Insert required auth.identities record (Crucial for Supabase Auth to query schema successfully!)
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    admin_uid,
    admin_uid,
    jsonb_build_object('sub', admin_uid::text, 'email', 'admin@smartkidstoys.pk'),
    'email',
    'admin@smartkidstoys.pk',
    NOW(),
    NOW(),
    NOW()
  );

  -- Ensure profile entry exists and is admin
  INSERT INTO public.profiles (id, full_name, customer_number, phone, is_admin)
  VALUES (admin_uid, 'Admin', 'SKT-ADM-0001', '03098444501', true)
  ON CONFLICT (id) DO UPDATE SET is_admin = true, full_name = 'Admin';

END $$;

-- 5. Fix RLS on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_read_all" ON public.profiles;
CREATE POLICY "profiles_read_all" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_own_insert" ON public.profiles;
CREATE POLICY "profiles_own_insert" ON public.profiles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "profiles_own_update" ON public.profiles;
CREATE POLICY "profiles_own_update" ON public.profiles FOR UPDATE USING (true);

DROP POLICY IF EXISTS "products_public_read" ON public.products;
CREATE POLICY "products_public_read" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "products_admin_all" ON public.products;
CREATE POLICY "products_admin_all" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "orders_all_access" ON public.orders;
CREATE POLICY "orders_all_access" ON public.orders FOR ALL USING (true);

DROP POLICY IF EXISTS "order_items_all_access" ON public.order_items;
CREATE POLICY "order_items_all_access" ON public.order_items FOR ALL USING (true);

DROP POLICY IF EXISTS "settings_all_access" ON public.site_settings;
CREATE POLICY "settings_all_access" ON public.site_settings FOR ALL USING (true);
