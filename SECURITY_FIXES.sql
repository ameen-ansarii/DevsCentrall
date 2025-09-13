-- =====================================================
-- SECURITY FIXES FOR SUPABASE DATABASE LINTER WARNINGS
-- =====================================================
-- Run this script in your Supabase SQL Editor to fix security warnings

-- 1. Fix function search_path security warnings
-- This prevents SQL injection attacks by setting a fixed search_path

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Fix check_username_availability function
CREATE OR REPLACE FUNCTION public.check_username_availability(username_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM profiles WHERE username = username_to_check
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- AUTHENTICATION SECURITY SETTINGS
-- =====================================================

-- Note: The leaked password protection setting needs to be enabled
-- in the Supabase Dashboard under Authentication > Settings
-- 
-- Steps to enable leaked password protection:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to Authentication > Settings
-- 3. Scroll down to "Password Protection"
-- 4. Enable "Check for leaked passwords"
-- 5. Save the settings

-- =====================================================
-- ADDITIONAL SECURITY IMPROVEMENTS
-- =====================================================

-- Add more restrictive RLS policies for better security
-- (These are already in your main setup, but here for reference)

-- Ensure profiles table has proper RLS enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies with more specific conditions
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON profiles;

-- Recreate policies with better security
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- =====================================================
-- SECURITY AUDIT QUERIES
-- =====================================================

-- Check if all functions have proper search_path set
SELECT 
  n.nspname as schema_name,
  p.proname as function_name,
  p.proconfig as configuration
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN ('handle_new_user', 'update_updated_at_column', 'check_username_availability');

-- Check RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'profiles';

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- After running this script:
-- 1. The function search_path warnings should be resolved
-- 2. Enable leaked password protection in Supabase Dashboard
-- 3. Your database will be more secure against SQL injection attacks
