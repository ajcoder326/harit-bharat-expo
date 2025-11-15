# Quick Deployment Checklist

## ✅ Pre-Deployment
- [ ] Have cPanel login credentials ready
- [ ] Know your domain name
- [ ] Have FTP client installed (optional)

## 1️⃣ Database Setup (5 minutes)

1. **cPanel → MySQL Databases**
   - Create database: `username_harit_expo`
   - Create user with strong password
   - Add user to database (ALL PRIVILEGES)
   - **Save credentials!**

2. **cPanel → phpMyAdmin**
   - Select your database
   - SQL tab
   - Copy/paste contents from `database.sql`
   - Click "Go"

## 2️⃣ Upload Files (2 minutes)

**Upload these 3 files to `public_html`:**
- ✅ `index.php` → to `public_html/api/index.php` (create api folder)
- ✅ `.htaccess` → to `public_html/.htaccess`
- ✅ Frontend files (from dist/) → to `public_html/`

**File Permissions:**
- Files: 644
- Folders: 755

## 3️⃣ Configure Database (1 minute)

Edit `public_html/api/index.php` lines 10-13:

```php
$host = 'localhost';
$dbname = 'your_cpanel_db_name';        // From step 1
$username = 'your_cpanel_db_username';  // From step 1
$password = 'your_cpanel_db_password';  // From step 1
```

## 4️⃣ Test API (1 minute)

Open in browser:
```
https://yourdomain.com/api/
```

Should see:
```json
{"message":"Harit Bharat Expo API","status":"running","database":"MySQL/MariaDB"}
```

## 5️⃣ Update Frontend & Deploy (5 minutes)

**Edit before building:**

`src/pages/Index.tsx`:
```typescript
const API_ENDPOINTS = [
  'https://yourdomain.com/api/registrations',
];
```

`src/pages/Admin.tsx` - Replace all:
```typescript
'http://localhost/harit-bharat-expo/api'
// With:
'https://yourdomain.com/api'
```

**Build & Upload:**
```bash
npm run build
```

Upload all files from `dist/` to `public_html/`

## 6️⃣ Verify (2 minutes)

1. **Frontend:** https://yourdomain.com
2. **Admin:** https://yourdomain.com/#/admin (password: admin@2024)
3. **Test registration form**
4. **Check admin panel shows registration**

## ✅ Done!

**Total Time:** ~15 minutes

---

## 🔒 Security (Do Before Going Live!)

- [ ] Change admin password in code
- [ ] Update CORS in `index.php` (remove `*`)
- [ ] Enable HTTPS/SSL
- [ ] Use strong database password

## 🆘 Common Issues

**500 Error:** Check PHP version (need 7.4+) in cPanel  
**404 on /api:** Upload `.htaccess` file  
**Database Error:** Verify credentials in `index.php`  
**CORS Error:** Check API URL in frontend matches domain
