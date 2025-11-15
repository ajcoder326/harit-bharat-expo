# Harit Bharat Expo - PHP Setup Guide

## Overview
This project has been converted to PHP with MySQL/MariaDB database.

## Requirements
- PHP 7.4 or higher (8.0+ recommended)
- MySQL 5.7+ or MariaDB 10.3+
- Apache/Nginx web server
- PDO MySQL extension enabled

## Local Development Setup

### 1. Install XAMPP/WAMP/MAMP
Download and install one of these PHP development environments:
- **XAMPP**: https://www.apachefriends.org/ (Windows, Linux, macOS)
- **WAMP**: https://www.wampserver.com/ (Windows)
- **MAMP**: https://www.mamp.info/ (macOS, Windows)

### 2. Setup Database

#### Start MySQL Server
- Open XAMPP/WAMP/MAMP Control Panel
- Start Apache and MySQL services

#### Create Database
1. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
2. Click "SQL" tab
3. Copy and paste the contents of `database.sql`
4. Click "Go" to execute

Or use command line:
```bash
mysql -u root -p < database.sql
```

### 3. Configure Database Connection

#### Option A: Environment Variables (Recommended)
Create a `.env` file in the root directory:
```
DB_HOST=localhost
DB_NAME=harit_bharat_expo
DB_USER=root
DB_PASS=
```

#### Option B: Direct Configuration
Edit `api/index.php` lines 10-13:
```php
$host = 'localhost';
$dbname = 'harit_bharat_expo';
$username = 'root';
$password = 'your_password_here';
```

### 4. Setup Web Server

#### XAMPP
1. Copy the entire project folder to `C:\xampp\htdocs\harit-bharat-expo`
2. Access at: http://localhost/harit-bharat-expo

#### WAMP
1. Copy the entire project folder to `C:\wamp64\www\harit-bharat-expo`
2. Access at: http://localhost/harit-bharat-expo

#### MAMP
1. Copy the entire project folder to `/Applications/MAMP/htdocs/harit-bharat-expo`
2. Access at: http://localhost:8888/harit-bharat-expo

### 5. Configure Frontend API Endpoint

Update the API endpoint in your frontend files to point to your PHP backend:

Edit `src/pages/Index.tsx` and `src/pages/Admin.tsx`:
```typescript
const API_BASE_URL = 'http://localhost/harit-bharat-expo/api';
```

### 6. Build Frontend
```bash
npm install
npm run build
```

The built files in `dist/` folder should be in the root of your PHP project.

## cPanel Hosting Deployment

### 1. Prepare Files
1. Build the frontend: `npm run build`
2. Copy all files from `dist/` folder
3. Include `api/` folder with `index.php`
4. Include `database.sql`

### 2. Upload to cPanel
1. Login to cPanel
2. Open File Manager
3. Navigate to `public_html` (or your domain folder)
4. Upload all files

### 3. Create MySQL Database
1. In cPanel, go to "MySQL Databases"
2. Create new database (e.g., `username_harit_expo`)
3. Create database user
4. Add user to database with ALL PRIVILEGES
5. Note: username, password, database name

### 4. Import Database
1. In cPanel, open phpMyAdmin
2. Select your database
3. Click "Import" tab
4. Choose `database.sql` file
5. Click "Go"

### 5. Configure Database Connection
Edit `api/index.php` with your cPanel database credentials:
```php
$host = 'localhost';
$dbname = 'username_harit_expo';
$username = 'username_dbuser';
$password = 'your_password';
```

### 6. Update Frontend API URL
If deploying to a domain, update API endpoints in the built files or rebuild with production URL:

In `src/pages/Index.tsx` and `src/pages/Admin.tsx`:
```typescript
const API_BASE_URL = 'https://jodhpur.theharitbharat.com/api';
```

Then rebuild: `npm run build` and re-upload.

### 7. Setup .htaccess (for clean URLs)
Create `.htaccess` in root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect API requests to PHP
  RewriteRule ^api/(.*)$ api/index.php [L,QSA]
  
  # Frontend routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

## API Endpoints

All endpoints are in `api/index.php`:

- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Add new registration
- `DELETE /api/registrations/:id` - Delete registration
- `GET /api/smtp-config` - Get SMTP configuration
- `POST /api/smtp-config` - Update SMTP configuration
- `POST /api/smtp-test` - Test SMTP connection
- `GET /api/health` - Health check

## Database Schema

### registrations
- `id` - INT (Primary Key, Auto Increment)
- `full_name` - VARCHAR(255)
- `email` - VARCHAR(255)
- `phone` - VARCHAR(20)
- `registered_at` - TIMESTAMP

### smtp_config
- `id` - INT (Primary Key, Default 1)
- `host` - VARCHAR(255)
- `port` - INT
- `secure` - BOOLEAN
- `auth_user` - VARCHAR(255)
- `auth_pass` - VARCHAR(255)
- `from` - VARCHAR(255)
- `recipients` - TEXT
- `updated_at` - TIMESTAMP

## Admin Panel
- URL: `http://your-domain.com/#/admin`
- Password: `admin@2024`

## Troubleshooting

### Database Connection Error
- Check MySQL service is running
- Verify database credentials in `api/index.php`
- Ensure PDO MySQL extension is enabled in `php.ini`

### CORS Errors
- Check `Access-Control-Allow-Origin` headers in `api/index.php`
- For production, set specific domain instead of `*`

### 404 on API Endpoints
- Ensure `.htaccess` is properly configured
- Check `mod_rewrite` is enabled in Apache
- Verify file permissions (755 for folders, 644 for files)

### Frontend Not Loading
- Check all files from `dist/` are uploaded
- Verify `index.html` is in the root directory
- Clear browser cache

## Security Recommendations

### Production Deployment
1. **Change admin password** in `src/pages/Admin.tsx`
2. **Restrict CORS** in `api/index.php`:
   ```php
   header('Access-Control-Allow-Origin: https://yourdomain.com');
   ```
3. **Use environment variables** for database credentials
4. **Enable HTTPS** (SSL certificate)
5. **Hash SMTP passwords** before storing in database
6. **Add rate limiting** for API endpoints
7. **Validate and sanitize** all user inputs
8. **Set proper file permissions** (755/644)

## Support
For issues, check:
- PHP error logs (usually in `logs/` folder or cPanel Error Log)
- Browser console for frontend errors
- Database connection and permissions
- File permissions on server

---

**Tech Stack**
- Backend: PHP 7.4+ with PDO
- Database: MySQL/MariaDB
- Frontend: React + TypeScript + Vite
- UI: Tailwind CSS + shadcn/ui
