# Supabase Setup Guide

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Create new project
4. Choose region closest to your users
5. Set a strong database password

## 2. Get Your Credentials
1. Go to Settings > API
2. Copy your Project URL
3. Copy your anon/public key

## 3. Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 4. Database Setup
Run these SQL files in your Supabase SQL Editor (in order):

1. `database/01_users_table.sql`
2. `database/02_profiles_table.sql`
3. `database/03_messages_table.sql`
4. `database/04_bookmarks_table.sql`

## 5. Authentication Setup
1. Go to Authentication > Settings
2. Enable email confirmations (optional)
3. Add your domain to Site URL
4. Configure redirect URLs

## 6. Security
- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- No sensitive data is exposed

## 7. Test
1. Run `npm run dev`
2. Try signing up with a test email
3. Check if user appears in Supabase dashboard

## Features Included:
- ✅ User signup/signin
- ✅ Password reset
- ✅ User profiles
- ✅ Direct messaging
- ✅ Bookmarks
- ✅ Secure database
- ✅ Clean UI matching your theme
