# Harit Bharat Expo - Registration System (PHP Version)

## 🚀 Project Overview

Full-stack registration system for Harit Bharat Expo (November 21-23, 2024, Jodhpur).

**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui  
**Backend:** PHP 7.4+ with PDO  
**Database:** MySQL/MariaDB  

## ✨ Features

- ✅ Modern registration form with validation
- ✅ Password-protected admin dashboard
- ✅ View all registrations in table format
- ✅ Delete registrations
- ✅ Export to CSV
- ✅ SMTP configuration interface
- ✅ Responsive design
- ✅ Works on cPanel shared hosting
- ✅ No Node.js server required

## 📋 Requirements

- PHP 7.4 or higher (8.0+ recommended)
- MySQL 5.7+ or MariaDB 10.3+
- Apache/Nginx with mod_rewrite
- PDO MySQL extension enabled
- Node.js & npm (for building frontend only)

## 🏃 Quick Start

### Local Development (XAMPP)

1. **Install XAMPP**
   - Download: https://www.apachefriends.org/

2. **Setup Project**
   ```powershell
   # Clone repository
   git clone https://github.com/ajcoder326/harit-bharat-expo.git
   cd harit-bharat-expo
   
   # Copy to XAMPP
   xcopy /E /I "." "C:\xampp\htdocs\harit-bharat-expo"
   ```

3. **Create Database**
   - Start XAMPP (Apache + MySQL)
   - Open http://localhost/phpmyadmin
   - Import `database.sql`

4. **Build Frontend**
   ```powershell
   npm install
   npm run build
   
   # Copy built files to XAMPP
   xcopy /E /Y "dist\*" "C:\xampp\htdocs\harit-bharat-expo\"
   ```

5. **Access Application**
   - Frontend: http://localhost/harit-bharat-expo
   - Admin Panel: http://localhost/harit-bharat-expo/#/admin
   - Password: `admin@2024`

## 🌐 cPanel Deployment

See detailed guide in **[PHP_SETUP.md](./PHP_SETUP.md)** or **[QUICKSTART_PHP.md](./QUICKSTART_PHP.md)**

**Quick Steps:**
1. Build: `npm run build`
2. Upload `dist/` files + `api/` folder to cPanel
3. Create MySQL database in cPanel
4. Import `database.sql`
5. Configure `api/index.php` with database credentials
6. Done! ✅

## 📁 Project Structure

```
harit-bharat-expo/
├── src/                    # React source code
│   ├── pages/
│   │   ├── Index.tsx      # Registration form
│   │   └── Admin.tsx      # Admin dashboard
│   ├── components/        # UI components
│   └── hooks/             # React hooks
├── api/
│   └── index.php          # PHP backend API
├── database.sql           # MySQL schema
├── .htaccess             # Apache routing
├── composer.json         # PHP dependencies
├── package.json          # Node dependencies
└── docs/
    ├── PHP_SETUP.md      # Detailed setup guide
    └── QUICKSTART_PHP.md # Quick start guide
```

## 🔌 API Endpoints

Base URL: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/registrations` | Get all registrations |
| POST | `/registrations` | Add new registration |
| DELETE | `/registrations/:id` | Delete registration |
| GET | `/smtp-config` | Get SMTP settings |
| POST | `/smtp-config` | Update SMTP settings |
| POST | `/smtp-test` | Test SMTP connection |
| GET | `/health` | Health check |

## 🗄️ Database Schema

### `registrations`
- `id` - INT (Primary Key, Auto Increment)
- `full_name` - VARCHAR(255)
- `email` - VARCHAR(255)
- `phone` - VARCHAR(20)
- `registered_at` - TIMESTAMP

### `smtp_config`
- `id` - INT (Primary Key)
- `host` - VARCHAR(255)
- `port` - INT
- `secure` - BOOLEAN
- `auth_user` - VARCHAR(255)
- `auth_pass` - VARCHAR(255)
- `from` - VARCHAR(255)
- `recipients` - TEXT
- `updated_at` - TIMESTAMP

## 🛠️ Development

```powershell
# Install dependencies
npm install

# Start Vite dev server (frontend only)
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🧪 Testing

Playwright test suite included:
```powershell
npm test              # Run all tests
npm run test:ui       # Interactive UI mode
npm run test:headed   # Run with browser visible
npm run test:report   # View test report
```

## 🔐 Security Notes

### For Production:
1. Change admin password in `src/pages/Admin.tsx`
2. Update CORS origin in `api/index.php` (remove `*`)
3. Use strong MySQL credentials
4. Enable HTTPS (SSL)
5. Set proper file permissions (755/644)
6. Add input validation
7. Enable PHP error logging (not display)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection failed | Check MySQL running, verify credentials |
| 404 on API endpoints | Check `.htaccess`, enable `mod_rewrite` |
| CORS errors | Update headers in `api/index.php` |
| Frontend not loading | Copy all `dist/` files, clear cache |

See **[PHP_SETUP.md](./PHP_SETUP.md)** for detailed troubleshooting.

## 📚 Documentation

- **[QUICKSTART_PHP.md](./QUICKSTART_PHP.md)** - Quick start guide
- **[PHP_SETUP.md](./PHP_SETUP.md)** - Complete setup documentation
- **[database.sql](./database.sql)** - Database schema

## 🔗 Links

- **GitHub:** https://github.com/ajcoder326/harit-bharat-expo
- **Live Demo:** http://jodhpur.theharitbharat.com (if deployed)

## 🏗️ Tech Stack

- **Frontend:** React 18.3.1, TypeScript, Vite 5.4
- **UI Library:** shadcn/ui, Radix UI, Tailwind CSS
- **Backend:** PHP 7.4+ with PDO
- **Database:** MySQL 5.7+ / MariaDB 10.3+
- **Testing:** Playwright
- **Hosting:** Works on XAMPP, WAMP, MAMP, cPanel

## 📝 License

This project is private and confidential.

## 👨‍💻 Author

**ajcoder326**

## 🤝 Contributing

This is a private project. Contact repository owner for contribution guidelines.

---

**Admin Credentials:** Password: `admin@2024` (Change in production!)
