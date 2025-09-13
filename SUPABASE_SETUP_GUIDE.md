# Supabase Setup Guide

## Quick Fix for "Failed to Fetch" Error

The "failed to fetch" error occurs because your Supabase configuration is missing. Follow these steps to fix it:

### Step 1: Get Your Supabase Credentials

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in to your account
3. Create a new project or select an existing one
4. Go to **Settings** → **API**
5. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 2: Update Your Environment File

1. Open the `.env` file in your `react-client` folder
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Restart Your Development Server

```bash
npm run dev
```

## Database Setup

Make sure your Supabase database has the required tables. Run the SQL from `COMPLETE_SUPABASE_SETUP.sql` in your Supabase SQL editor.

## Username Validation

✅ **Fixed!** Usernames now support:
- Letters (a-z, A-Z)
- Numbers (0-9)
- Underscores (_)
- Dots (.) - like "yz.rex"

❌ **Not allowed:**
- Starting or ending with dots
- Consecutive dots (..)
- Special characters other than _ and .

## Testing

1. Try creating an account with username "yz.rex"
2. Try creating another account with the same username - it should show "Username is already taken"
3. The signup should work without "failed to fetch" errors

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Make sure the `.env` file is in the correct location (`react-client/.env`)
4. Restart your development server after making changes
