# 🎉 PHP Backend Ready for cPanel!

## 📦 What You Have

I've created a complete PHP backend in the `php-backend/` folder that's ready to upload to cPanel.

### Folder Contents:
- ✅ `index.php` - PHP API (all endpoints)
- ✅ `database.sql` - MySQL schema
- ✅ `.htaccess` - Apache routing
- ✅ `README.md` - Complete deployment guide
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- ✅ `.env.example` - Database config template

## 🚀 Quick Deployment (3 Ways)

### Option 1: Upload Zip File (Easiest!)

I've created `php-backend-cpanel.zip` for you!

1. **Download the zip:**
   - Location: Project root → `php-backend-cpanel.zip`

2. **Upload to cPanel:**
   - cPanel → File Manager → public_html
   - Click "Upload" → Select `php-backend-cpanel.zip`
   - Right-click zip → "Extract"
   - Delete the zip file after extraction

3. **Setup database** (see below)

### Option 2: Manual Upload

Upload these files from `php-backend/` folder:
- `index.php` → `public_html/api/index.php`
- `.htaccess` → `public_html/.htaccess`
- `database.sql` → (use for import, don't need on server)

### Option 3: FTP

Use FileZilla with your cPanel FTP credentials to upload the `php-backend/` contents.

## 🗄️ Database Setup (2 minutes)

### Step 1: Create Database in cPanel
```
cPanel → MySQL Databases → Create Database
Name: harit_expo (will become: username_harit_expo)

Create User:
Username: dbuser
Password: [Generate Strong Password]

Add User to Database → ALL PRIVILEGES
```

### Step 2: Import Schema
```
cPanel → phpMyAdmin → Select database → SQL tab
Copy/paste contents from database.sql → Execute
```

### Step 3: Configure PHP File
Edit `public_html/api/index.php` lines 10-13:
```php
$host = 'localhost';
$dbname = 'username_harit_expo';    // Your cPanel database name
$username = 'username_dbuser';       // Your database username
$password = 'your_password_here';    // Your database password
```

## ✅ Test API

Visit in browser:
```
https://jodhpur.theharitbharat.com/api/
```

Should return:
```json
{
  "message": "Harit Bharat Expo API",
  "status": "running",
  "database": "MySQL/MariaDB"
}
```

## 🎨 Deploy Frontend

After backend is working:

1. **Update API URLs** in source code:

   `src/pages/Index.tsx`:
   ```typescript
   const API_ENDPOINTS = [
     'https://jodhpur.theharitbharat.com/api/registrations',
   ];
   ```

   `src/pages/Admin.tsx` - Replace all instances:
   ```typescript
   'https://jodhpur.theharitbharat.com/api'
   ```

2. **Build frontend:**
   ```bash
   npm run build
   ```

3. **Upload `dist/` contents** to `public_html/`

## 📋 Full Documentation

- **php-backend/README.md** - Complete guide with troubleshooting
- **php-backend/DEPLOYMENT_CHECKLIST.md** - Step-by-step checklist
- **PHP_SETUP.md** - Detailed PHP setup guide
- **QUICKSTART_PHP.md** - Quick start for local XAMPP

## 🔧 File Structure on cPanel

After uploading everything should look like:

```
public_html/
├── index.html              # Frontend (from dist/)
├── assets/                 # Frontend assets (from dist/)
│   ├── index-[hash].js
│   └── index-[hash].css
├── api/
│   └── index.php          # PHP backend
├── .htaccess              # Routing config
└── robots.txt
```

## 🎯 What Changed from Node.js

- ❌ No more Node.js server needed
- ❌ No more Supabase
- ❌ No more Vercel serverless
- ✅ Pure PHP with PDO
- ✅ MySQL/MariaDB database
- ✅ Works on any cPanel hosting
- ✅ No special requirements

## 📞 Need Help?

Check these files in order:
1. `php-backend/DEPLOYMENT_CHECKLIST.md` - Quick steps
2. `php-backend/README.md` - Detailed guide + troubleshooting
3. `PHP_SETUP.md` - Complete PHP setup guide

## 🔐 Security (Important!)

Before going live:
- [ ] Change admin password in `src/pages/Admin.tsx`
- [ ] Update CORS in `api/index.php` to your domain
- [ ] Use strong database password
- [ ] Enable SSL certificate (HTTPS)

## ✨ Summary

Your PHP backend is ready in the `php-backend/` folder!

**Next Steps:**
1. Extract `php-backend-cpanel.zip` on cPanel
2. Create MySQL database
3. Import `database.sql`
4. Configure credentials in `index.php`
5. Test API endpoint
6. Build & upload frontend

**Time Required:** ~15 minutes

---

**GitHub Repo:** https://github.com/ajcoder326/harit-bharat-expo
**Commit:** "Convert project to PHP - Ready for cPanel deployment"
