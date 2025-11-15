# Quick Start Guide - PHP Version

## What Changed?
✅ Converted from Node.js + Supabase to **PHP + MySQL**
✅ No more Node.js backend server needed
✅ Works with XAMPP, WAMP, MAMP, or any PHP hosting (including cPanel)
✅ Database: MySQL/MariaDB instead of PostgreSQL

## Requirements
- PHP 7.4+ (PHP 8.0+ recommended)
- MySQL 5.7+ or MariaDB 10.3+
- Apache/Nginx with mod_rewrite enabled
- PDO MySQL extension

## Quick Start (Local Development)

### Option 1: XAMPP (Recommended for Windows)

1. **Download & Install XAMPP**
   - Download: https://www.apachefriends.org/
   - Install to default location (C:\xampp)

2. **Copy Project Files**
   ```powershell
   # Copy this entire folder to XAMPP htdocs
   xcopy /E /I "." "C:\xampp\htdocs\harit-bharat-expo"
   ```

3. **Start Services**
   - Open XAMPP Control Panel
   - Click "Start" for Apache and MySQL

4. **Create Database**
   - Open browser: http://localhost/phpmyadmin
   - Click "SQL" tab
   - Copy and paste contents from `database.sql`
   - Click "Go"

5. **Build Frontend**
   ```powershell
   npm install
   npm run build
   ```

6. **Copy Built Files**
   ```powershell
   # Copy dist folder contents to XAMPP project root
   xcopy /E /Y "dist\*" "C:\xampp\htdocs\harit-bharat-expo\"
   ```

7. **Open Application**
   - Frontend: http://localhost/harit-bharat-expo
   - Admin: http://localhost/harit-bharat-expo/#/admin
   - Password: `admin@2024`

### Option 2: WAMP (Windows)

1. Download from https://www.wampserver.com/
2. Copy project to `C:\wamp64\www\harit-bharat-expo`
3. Follow steps 3-7 above (use /wamp64/www/ instead of /xampp/htdocs/)

### Option 3: MAMP (macOS/Windows)

1. Download from https://www.mamp.info/
2. Copy project to `/Applications/MAMP/htdocs/harit-bharat-expo` (macOS)
   Or `C:\MAMP\htdocs\harit-bharat-expo` (Windows)
3. Follow steps 3-7 above
4. Open: http://localhost:8888/harit-bharat-expo

## Configure Database Connection

Edit `api/index.php` (lines 10-13):
```php
$host = 'localhost';
$dbname = 'harit_bharat_expo';
$username = 'root';
$password = ''; // Leave empty for XAMPP/WAMP default
```

## cPanel Deployment

### Step 1: Build Project
```powershell
npm run build
```

### Step 2: Prepare Files
Create a folder with:
- All files from `dist/` folder
- `api/` folder with `index.php`
- `.htaccess` file
- `database.sql` file

### Step 3: Upload to cPanel
1. Login to cPanel
2. Open File Manager
3. Navigate to `public_html` or domain folder
4. Upload all files

### Step 4: Create MySQL Database
1. In cPanel → "MySQL Databases"
2. Create database: `username_haritexpo`
3. Create user with strong password
4. Add user to database with ALL PRIVILEGES

### Step 5: Import Database
1. cPanel → phpMyAdmin
2. Select your database
3. Import tab → Choose `database.sql`
4. Click "Go"

### Step 6: Configure Connection
Edit `api/index.php` with your cPanel credentials:
```php
$host = 'localhost';
$dbname = 'username_haritexpo';
$username = 'username_dbuser';
$password = 'your_secure_password';
```

### Step 7: Update Frontend API URLs
Before building, edit these files:

**src/pages/Index.tsx** (line ~64):
```typescript
const API_ENDPOINTS = [
  'https://jodhpur.theharitbharat.com/api/registrations',
  'http://jodhpur.theharitbharat.com/api/registrations'
];
```

**src/pages/Admin.tsx** (lines ~81, 100, 124, 146, 166):
```typescript
// Replace all instances of:
'http://localhost/harit-bharat-expo/api'
// With:
'https://jodhpur.theharitbharat.com/api'
```

Then rebuild: `npm run build`

## API Endpoints

Base URL: `http://localhost/harit-bharat-expo/api` (local)
Or: `https://yourdomain.com/api` (production)

- `GET /api/registrations` - Fetch all registrations
- `POST /api/registrations` - Add new registration
- `DELETE /api/registrations/:id` - Delete registration
- `GET /api/smtp-config` - Get SMTP settings
- `POST /api/smtp-config` - Update SMTP settings
- `POST /api/smtp-test` - Test SMTP connection
- `GET /api/health` - Health check

## Testing API

### Using Browser
```
http://localhost/harit-bharat-expo/api/health
```

### Using PowerShell
```powershell
Invoke-RestMethod -Uri "http://localhost/harit-bharat-expo/api/registrations"
```

### Using curl
```bash
curl http://localhost/harit-bharat-expo/api/registrations
```

## Troubleshooting

### "Database connection failed"
✅ Check MySQL service is running (XAMPP/WAMP Control Panel)
✅ Verify credentials in `api/index.php`
✅ Ensure database exists and is imported

### "404 Not Found" on API
✅ Check `.htaccess` exists and `mod_rewrite` is enabled
✅ Verify file permissions (755 folders, 644 files)
✅ Restart Apache

### "CORS Error"
✅ Check `.htaccess` has CORS headers
✅ For production, update `Access-Control-Allow-Origin` in `api/index.php`

### "Frontend not loading"
✅ Ensure all `dist/` files are copied to web root
✅ Check `index.html` exists in project root
✅ Clear browser cache (Ctrl+F5)

### "Cannot GET /api/registrations"
✅ Verify `.htaccess` rewrite rules
✅ Check Apache has `AllowOverride All` in httpd.conf
✅ Ensure `api/index.php` has correct permissions

## File Structure

```
harit-bharat-expo/
├── index.html              # Frontend entry (from dist/)
├── assets/                 # Frontend assets (from dist/)
├── api/
│   └── index.php          # PHP backend API
├── .htaccess              # Apache routing & CORS
├── database.sql           # MySQL schema
├── composer.json          # PHP dependencies
├── PHP_SETUP.md          # Detailed setup guide
└── src/                   # React source (for development)
```

## Development Workflow

1. **Make Frontend Changes**
   ```powershell
   # Edit files in src/
   npm run dev  # Test locally with Vite dev server
   ```

2. **Build for Production**
   ```powershell
   npm run build
   ```

3. **Copy to XAMPP**
   ```powershell
   xcopy /E /Y "dist\*" "C:\xampp\htdocs\harit-bharat-expo\"
   ```

4. **Test**
   - Open http://localhost/harit-bharat-expo
   - Test registration form
   - Test admin panel

## Security Checklist for Production

- [ ] Change admin password in `src/pages/Admin.tsx`
- [ ] Update CORS origin in `api/index.php` (remove `*`)
- [ ] Use strong MySQL password
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set file permissions: 755 folders, 644 files
- [ ] Disable directory listing
- [ ] Keep PHP updated
- [ ] Enable PHP error logging (not display)
- [ ] Add input validation and sanitization
- [ ] Consider rate limiting

## Need Help?

See detailed documentation in:
- `PHP_SETUP.md` - Complete setup guide
- `database.sql` - Database schema
- `api/index.php` - Backend code

---

**Stack:**
- Backend: PHP 7.4+ with PDO
- Database: MySQL/MariaDB
- Frontend: React 18 + TypeScript + Vite
- UI: Tailwind CSS + shadcn/ui
