-- Quick test to check if signup will work
-- Run this in Supabase SQL Editor

-- 1. Check if profiles table exists and has data
SELECT COUNT(*) as profile_count FROM profiles;

-- 2. Check if we can insert a test profile
INSERT INTO profiles (id, username, email, full_name, created_at)
VALUES (
  gen_random_uuid(),
  'test_user_123',
  'test@example.com',
  'Test User',
  NOW()
);

-- 3. Check if the test profile was created
SELECT * FROM profiles WHERE username = 'test_user_123';

-- 4. Clean up test data
DELETE FROM profiles WHERE username = 'test_user_123';

-- 5. Test username availability function
SELECT public.check_username_availability('yz.rex') as is_available;
