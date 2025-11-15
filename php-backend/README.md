# PHP Backend for Harit Bharat Expo

## 📦 What's Included

This folder contains everything you need to deploy the PHP backend on cPanel:

- `index.php` - Main PHP API file
- `database.sql` - MySQL database schema
- `.htaccess` - Apache configuration for routing and CORS
- `README.md` - This file

## 🚀 cPanel Deployment Instructions

### Step 1: Create MySQL Database

1. Login to your cPanel
2. Go to **"MySQL Databases"**
3. Create a new database:
   - Database name: `username_harit_expo` (cPanel will add prefix automatically)
4. Create a database user:
   - Username: `username_dbuser`
   - Password: Create a strong password (save it!)
5. Add user to database:
   - Select the user and database
   - Grant **ALL PRIVILEGES**
6. Note down these details:
   - Database name
   - Database username
   - Database password

### Step 2: Import Database Schema

1. In cPanel, open **phpMyAdmin**
2. Select your database from the left sidebar
3. Click the **"SQL"** tab
4. Open `database.sql` file from this folder
5. Copy all contents and paste into the SQL query box
6. Click **"Go"** to execute

### Step 3: Upload Files

#### Option A: File Manager
1. In cPanel, open **File Manager**
2. Navigate to `public_html` (or your domain's folder)
3. Upload ALL files from this `php-backend` folder:
   - `index.php` → upload to root or `api/` subfolder
   - `.htaccess` → upload to root
4. Set file permissions:
   - Files: 644
   - Folders: 755

#### Option B: FTP
1. Use FileZilla or any FTP client
2. Connect using cPanel FTP credentials
3. Upload files to `public_html`

### Step 4: Configure Database Connection

1. Locate and edit `index.php` (or `api/index.php` if in subfolder)
2. Find lines 10-13:
   ```php
   $host = getenv('DB_HOST') ?: 'localhost';
   $dbname = getenv('DB_NAME') ?: 'harit_bharat_expo';
   $username = getenv('DB_USER') ?: 'root';
   $password = getenv('DB_PASS') ?: '';
   ```

3. Replace with your cPanel database credentials:
   ```php
   $host = 'localhost';
   $dbname = 'username_harit_expo';  // Your actual database name
   $username = 'username_dbuser';     // Your database username
   $password = 'your_password_here';  // Your database password
   ```

4. Save the file

### Step 5: Verify Installation

Test the API by visiting these URLs in your browser:

1. **Health Check:**
   ```
   https://yourdomain.com/api/
   ```
   Should return:
   ```json
   {
     "message": "Harit Bharat Expo API",
     "status": "running",
     "database": "MySQL/MariaDB"
   }
   ```

2. **Registrations Endpoint:**
   ```
   https://yourdomain.com/api/registrations
   ```
   Should return empty array:
   ```json
   []
   ```

3. **Health Status:**
   ```
   https://yourdomain.com/api/health
   ```
   Should return:
   ```json
   {
     "status": "ok",
     "timestamp": "2024-11-15T..."
   }
   ```

### Step 6: Update Frontend (Important!)

After backend is deployed, you need to update the frontend to point to your domain:

**Before building frontend, edit these files:**

1. **src/pages/Index.tsx** (around line 64):
   ```typescript
   const API_ENDPOINTS = [
     'https://yourdomain.com/api/registrations',
     'http://yourdomain.com/api/registrations'
   ];
   ```

2. **src/pages/Admin.tsx** (multiple locations):
   Replace all instances of:
   ```typescript
   'http://localhost/harit-bharat-expo/api'
   ```
   With:
   ```typescript
   'https://yourdomain.com/api'
   ```

3. Then rebuild frontend:
   ```bash
   npm run build
   ```

4. Upload contents of `dist/` folder to cPanel `public_html`

## 📁 File Structure on cPanel

```
public_html/
├── index.html              # Frontend entry point
├── assets/                 # Frontend CSS/JS
│   ├── index-[hash].js
│   └── index-[hash].css
├── api/                    # (optional subfolder)
│   └── index.php          # PHP backend
├── .htaccess              # Routing configuration
└── robots.txt
```

**Or if using root:**
```
public_html/
├── index.html
├── index.php              # Backend directly in root
├── assets/
├── .htaccess
└── robots.txt
```

## 🔧 Configuration Options

### Using Subdomain
If you want to use a subdomain like `api.yourdomain.com`:

1. Create subdomain in cPanel
2. Upload PHP files to subdomain folder
3. Update frontend API URLs to use subdomain

### Environment Variables (Advanced)
Instead of hardcoding credentials, use cPanel environment variables:

1. In cPanel, go to **"Terminal"**
2. Add to `.htaccess`:
   ```apache
   SetEnv DB_HOST localhost
   SetEnv DB_NAME username_harit_expo
   SetEnv DB_USER username_dbuser
   SetEnv DB_PASS your_password
   ```

## 🔐 Security Recommendations

### Production Checklist:
- [ ] Use strong MySQL password
- [ ] Update CORS settings in `index.php`:
  ```php
  header('Access-Control-Allow-Origin: https://yourdomain.com');
  ```
- [ ] Enable HTTPS (SSL certificate from cPanel)
- [ ] Set proper file permissions (644 for files, 755 for folders)
- [ ] Don't commit database credentials to Git
- [ ] Keep PHP updated (check cPanel PHP version)
- [ ] Enable error logging instead of display:
  ```php
  ini_set('display_errors', 0);
  ini_set('log_errors', 1);
  ```

## 🐛 Troubleshooting

### "Database connection failed"
✅ **Solution:**
- Verify database exists in phpMyAdmin
- Check credentials in `index.php` are correct
- Ensure user has ALL PRIVILEGES on database
- Confirm MySQL service is running

### "404 Not Found" for /api/registrations
✅ **Solution:**
- Check `.htaccess` file is uploaded
- Verify `mod_rewrite` is enabled (usually is on cPanel)
- Ensure `index.php` is in correct location
- Check file permissions: 644 for `index.php`

### "CORS Policy" error in browser
✅ **Solution:**
- Update `Access-Control-Allow-Origin` in `index.php`
- Check `.htaccess` has CORS headers
- Clear browser cache

### "Internal Server Error 500"
✅ **Solution:**
- Check PHP error log in cPanel (under "Errors")
- Verify PHP version is 7.4+ (cPanel > "Select PHP Version")
- Check syntax errors in `index.php`
- Ensure all required extensions are enabled (PDO, pdo_mysql)

### Can't access /api/registrations
✅ **Solution:**
- Test directly: `yourdomain.com/index.php`
- If works, fix `.htaccess` rewrite rules
- Ensure `AllowOverride All` in Apache config

## 📊 API Documentation

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/` | API info and status |
| GET | `/api/health` | Health check |
| GET | `/api/registrations` | Get all registrations |
| POST | `/api/registrations` | Add new registration |
| DELETE | `/api/registrations/:id` | Delete registration |
| GET | `/api/smtp-config` | Get SMTP settings |
| POST | `/api/smtp-config` | Update SMTP settings |
| POST | `/api/smtp-test` | Test SMTP connection |

### Example Requests

**Add Registration:**
```bash
curl -X POST https://yourdomain.com/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }'
```

**Get All Registrations:**
```bash
curl https://yourdomain.com/api/registrations
```

**Delete Registration:**
```bash
curl -X DELETE https://yourdomain.com/api/registrations/1
```

## 📞 Support

If you encounter issues:

1. Check PHP error logs in cPanel
2. Review this README troubleshooting section
3. Verify database connection and credentials
4. Test API endpoints directly in browser
5. Check file permissions

## 🔄 Updating

To update the backend:

1. Edit `index.php` locally
2. Test on local XAMPP/WAMP
3. Upload to cPanel (overwrite existing)
4. Clear PHP OpCache if needed (cPanel > PHP Settings)

---

**Tech Stack:**
- PHP 7.4+ with PDO
- MySQL 5.7+ / MariaDB 10.3+
- Apache with mod_rewrite

**Domain Example:** Replace `yourdomain.com` with `jodhpur.theharitbharat.com` or your actual domain.
