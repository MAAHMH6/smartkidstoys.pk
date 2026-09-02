-- ============================================
-- Run this AFTER setup.sql to create admin
-- ============================================

-- Insert admin directly into profiles table
-- (Run this AFTER creating the user in Auth UI,
--  OR if UI fails, run the block below instead)

-- Option A: If you already created the user in Auth UI, just run this:
UPDATE profiles 
SET is_admin = true, full_name = 'Admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@smartkidstoys.pk');


-- ============================================
-- Option B: If Auth UI creation keeps failing,
-- run THIS instead to create admin via SQL:
-- ============================================

/*
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
  role
)
SELECT
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@smartkidstoys.pk',
  crypt('admin12345', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin"}',
  NOW(),
  NOW(),
  '',
  'authenticated',
  'authenticated'
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@smartkidstoys.pk'
);

-- Then grant admin role:
UPDATE profiles 
SET is_admin = true, full_name = 'Admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@smartkidstoys.pk');
*/
