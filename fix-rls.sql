-- ==========================================================
-- SMARTKIDS TOYS — Fix Database RLS Policy Recursion
-- Run this in Supabase SQL Editor to resolve profile query errors
-- ==========================================================

-- 1. Helper Security Definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM profiles WHERE id = auth.uid()),
    false
  );
$$;

-- 2. Drop existing problematic recursive policies
DROP POLICY IF EXISTS "profiles_admin_all" ON profiles;
DROP POLICY IF EXISTS "profiles_own" ON profiles;
DROP POLICY IF EXISTS "profiles_public_read" ON profiles;
DROP POLICY IF EXISTS "profiles_read_all" ON profiles;
DROP POLICY IF EXISTS "profiles_user_all" ON profiles;

-- 3. Create non-recursive, safe policies on profiles
CREATE POLICY "profiles_read_all" 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "profiles_own_insert" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_own_update" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "profiles_admin_delete" 
  ON profiles FOR DELETE 
  USING (public.is_admin());

-- 4. Products policies
DROP POLICY IF EXISTS "products_admin_all" ON products;
DROP POLICY IF EXISTS "products_public_read" ON products;

CREATE POLICY "products_public_read" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "products_admin_all" 
  ON products FOR ALL 
  USING (public.is_admin());

-- 5. Orders policies
DROP POLICY IF EXISTS "orders_admin_all" ON orders;
DROP POLICY IF EXISTS "orders_own_read" ON orders;
DROP POLICY IF EXISTS "orders_public_insert" ON orders;

CREATE POLICY "orders_public_insert" 
  ON orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "orders_own_read" 
  ON orders FOR SELECT 
  USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "orders_admin_all" 
  ON orders FOR ALL 
  USING (public.is_admin());

-- 6. Order items policies
DROP POLICY IF EXISTS "order_items_admin_all" ON order_items;
DROP POLICY IF EXISTS "order_items_public_insert" ON order_items;
DROP POLICY IF EXISTS "order_items_own_read" ON order_items;

CREATE POLICY "order_items_public_insert" 
  ON order_items FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "order_items_own_read" 
  ON order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.customer_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "order_items_admin_all" 
  ON order_items FOR ALL 
  USING (public.is_admin());

-- 7. Site settings policies
DROP POLICY IF EXISTS "settings_public_read" ON site_settings;
DROP POLICY IF EXISTS "settings_admin_all" ON site_settings;

CREATE POLICY "settings_public_read" 
  ON site_settings FOR SELECT 
  USING (true);

CREATE POLICY "settings_admin_all" 
  ON site_settings FOR ALL 
  USING (public.is_admin());
