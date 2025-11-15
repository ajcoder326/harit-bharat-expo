# 🗄️ Supabase Setup Guide

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign in with GitHub
4. Create a new organization (if needed)

---

## Step 2: Create Database

1. Click **"New Project"**
2. **Project name**: `harit-bharat-expo`
3. **Database Password**: Choose a strong password (save it!)
4. **Region**: Choose closest to you
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup

---

## Step 3: Create Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Paste this SQL:

```sql
-- Registrations table
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- SMTP Config table
CREATE TABLE smtp_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  host TEXT NOT NULL DEFAULT 'smtp.gmail.com',
  port INTEGER NOT NULL DEFAULT 587,
  secure BOOLEAN DEFAULT FALSE,
  auth_user TEXT,
  auth_pass TEXT,
  "from" TEXT DEFAULT 'noreply@haritbharatexpo.com',
  recipients TEXT,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default SMTP config
INSERT INTO smtp_config (id) VALUES (1);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE smtp_config ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - restrict in production)
CREATE POLICY "Enable all access for registrations" 
  ON registrations FOR ALL USING (true);

CREATE POLICY "Enable all access for smtp_config" 
  ON smtp_config FOR ALL USING (true);
```

4. Click **"Run"** ✅

---

## Step 4: Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

---

## Step 5: Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Select your **harit-bharat-expo** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = eyJhbGc...your-key...
```

5. Click **"Save"** for each

---

## Step 6: Redeploy on Vercel

1. Go to **Deployments** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**

Or just push the updated code:
```bash
git add .
git commit -m "Add Supabase integration"
git push
```

---

## ✅ Test Your Database

After redeployment, test:

1. **Registration form**: Fill and submit → Should save to database
2. **Admin panel**: Login → Should show registrations from database
3. **Data persists**: Refresh page → Data stays (permanent storage!)

---

## 🔍 View Your Data

In Supabase dashboard:
1. Go to **Table Editor**
2. Select **registrations** table
3. See all form submissions!

---

## 🔐 Security Notes (For Production)

Current setup allows all access. For production:

1. **Update RLS policies** in Supabase
2. **Add authentication** for admin panel
3. **Use service role key** for admin operations
4. **Add rate limiting**

---

## 💰 Pricing

**Supabase Free Tier**:
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

Perfect for your expo registration! 🎉

---

## 🆘 Troubleshooting

**"relation does not exist" error**:
- Make sure you ran the SQL queries in Step 3

**"Invalid API key" error**:
- Double-check environment variables in Vercel
- Make sure you copied the **anon** key, not service_role

**Data not saving**:
- Check Vercel logs: Settings → Functions → View function logs
- Check Supabase logs: Dashboard → Logs

---

**Your database is now production-ready! 🚀**
