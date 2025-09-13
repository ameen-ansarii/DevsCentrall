# Security Setup Guide

## Fixing Supabase Database Linter Warnings

You have 4 security warnings that need to be addressed. Here's how to fix them:

## 🔧 **Step 1: Fix Function Search Path Warnings**

Run the `SECURITY_FIXES.sql` script in your Supabase SQL Editor:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `SECURITY_FIXES.sql`
5. Click **Run** to execute the script

This will fix the 3 function search_path warnings by adding `SET search_path = public` to each function.

## 🔐 **Step 2: Enable Leaked Password Protection**

This needs to be done in the Supabase Dashboard:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **Settings**
4. Scroll down to **"Password Protection"** section
5. Enable **"Check for leaked passwords"**
6. Click **Save**

This will enable Supabase to check passwords against the HaveIBeenPwned database to prevent users from using compromised passwords.

## ✅ **What These Fixes Do:**

### Function Search Path Security
- **Problem**: Functions without fixed search_path can be vulnerable to SQL injection
- **Solution**: Sets `search_path = public` to prevent malicious schema manipulation
- **Functions Fixed**: 
  - `handle_new_user`
  - `update_updated_at_column` 
  - `check_username_availability`

### Leaked Password Protection
- **Problem**: Users can use passwords that have been compromised in data breaches
- **Solution**: Supabase checks passwords against HaveIBeenPwned.org database
- **Benefit**: Prevents users from using known compromised passwords

## 🧪 **Testing After Fixes:**

1. **Test signup with a known compromised password** (like "password123")
   - Should show error: "Password has been found in data breaches"
2. **Test signup with a strong, unique password**
   - Should work normally
3. **Test username "yz.rex" functionality**
   - Should still work as before

## 📊 **Verification:**

After running the fixes, you can verify they worked by:

1. **Check the linter again** in Supabase Dashboard → Database → Linter
2. **The warnings should be gone** or reduced
3. **Test the leaked password protection** with a common password

## 🚨 **Important Notes:**

- These are security improvements, not breaking changes
- Your existing functionality will continue to work
- The fixes make your app more secure against common attacks
- Always test after making security changes

## 🔗 **Useful Links:**

- [Supabase Security Best Practices](https://supabase.com/docs/guides/database/security)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Password Security Documentation](https://supabase.com/docs/guides/auth/password-security)
