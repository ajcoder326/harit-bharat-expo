# 🎉 Admin Panel & SMTP Setup - Complete!

## What Has Been Created

### ✅ Admin Panel Features
1. **User Registrations Management**
   - View all registrations in a beautiful table
   - See: Full Name, Email, Phone, Registration Time
   - Delete individual registrations
   - Export all data as CSV file with timestamp

2. **SMTP Configuration Management**
   - Configure your email server settings
   - Update host, port, credentials, and sender email
   - Test SMTP connection before saving
   - Visual indicator showing if SMTP is configured
   - Support for Gmail, Outlook, Yahoo, and custom SMTP servers

3. **Security**
   - Password-protected admin panel
   - Default password: `admin@2024`
   - Login page before accessing dashboard

### ✅ Integration Points

#### Frontend (React)
- **File**: `src/pages/Admin.tsx` (267 lines)
- Routes added to `src/App.tsx`
- Registration form updated in `src/pages/Index.tsx` to send data to backend

#### Backend (Express.js)
- **File**: `server-simple.js` (208 lines)
- Runs on `http://localhost:5000/`
- RESTful API with CORS enabled
- JSON file storage for data persistence

#### Data Storage
- **Folder**: `data/`
- `registrations.json` - All visitor registrations
- `smtp-config.json` - SMTP configuration

---

## 🚀 Quick Access URLs

| Page | URL | Purpose |
|------|-----|---------|
| Registration | `http://localhost:8080/` | Submit registration |
| Admin Panel | `http://localhost:8080/admin` | View data & configure SMTP |
| Admin Password | - | `admin@2024` |
| Backend API | `http://localhost:5000/api/*` | Data endpoints |

---

## 📋 API Endpoints Summary

### Registration Endpoints
```
GET    /api/registrations              → Get all registrations
POST   /api/registrations              → Add new registration
DELETE /api/registrations/:id          → Delete a registration
```

### SMTP Configuration Endpoints
```
GET    /api/smtp-config                → Get current SMTP config
POST   /api/smtp-config                → Update SMTP settings
POST   /api/smtp-test                  → Test SMTP connection
```

---

## 🔧 Files Created/Modified

### New Files Created
- ✅ `src/pages/Admin.tsx` - Admin dashboard component
- ✅ `server-simple.js` - Express backend server
- ✅ `SETUP_GUIDE.md` - Comprehensive setup guide
- ✅ `QUICK_START.md` - Quick start guide
- ✅ `ADMIN_SETUP.md` - This file

### Modified Files
- ✅ `src/App.tsx` - Added admin route
- ✅ `src/pages/Index.tsx` - Updated to send data to backend API
- ✅ `package.json` - Added server scripts

### Data Folders Created
- ✅ `data/registrations.json` - Auto-created on first run
- ✅ `data/smtp-config.json` - Auto-created on first run

---

## 🎯 How to Run

### Terminal 1: Start Frontend
```bash
npm run dev
```
- Vite dev server opens at `http://localhost:8080/`

### Terminal 2: Start Backend
```bash
node server-simple.js
```
- Express server starts at `http://localhost:5000/`

### Or Run Both Together
```bash
npm run dev:all
```
- Requires `concurrently` package: `npm install concurrently`

---

## 📧 SMTP Setup Guide (Gmail Example)

### Step 1: Prepare Your Gmail Account
1. Go to myaccount.google.com
2. Enable 2-Factor Authentication

### Step 2: Create App Password
1. Visit: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Google generates a 16-character password
4. Copy the password (remove spaces)

### Step 3: Configure in Admin Panel
1. Go to `http://localhost:8080/admin`
2. Login with password: `admin@2024`
3. Click "SMTP Settings" tab
4. Fill in:
   ```
   SMTP Host: smtp.gmail.com
   SMTP Port: 587
   From Email: your-email@gmail.com
   Email/Username: your-email@gmail.com
   Password: (paste the 16-char app password here)
   Secure: OFF (unchecked)
   ```
5. Click "Test Connection" (should show success)
6. Click "Save Configuration"

### Step 4: Verify
- Submit a registration from the main page
- Check if confirmation email is received
- Check spam/junk folder if not in inbox

---

## 📊 Admin Panel Walkthrough

### Login Screen
- Enter password: `admin@2024`
- Click "Login"

### Registrations Tab
- **View Registrations**: Table with all submitted registrations
- **Export CSV**: Download all data as CSV file (includes timestamp)
- **Delete**: Remove a registration with trash icon
- **Pagination**: Shows total count

### SMTP Settings Tab
- **Configuration Status**: Green checkmark if configured
- **SMTP Form Fields**:
  - Host: Mail server address (e.g., smtp.gmail.com)
  - Port: Port number (e.g., 587)
  - From Email: Sender email address
  - Email/Username: Login email
  - Password: Login password or app password
  - Secure: TLS/SSL checkbox
- **Test Button**: Verify configuration works
- **Save Button**: Save configuration
- **Gmail Guide**: Built-in instructions

---

## 💾 Data Management

### Viewing Data
**Registrations** stored in `data/registrations.json`:
```json
[
  {
    "id": "1234567890123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "registeredAt": "2024-11-14T10:30:00.000Z"
  }
]
```

**SMTP Config** stored in `data/smtp-config.json`:
```json
{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "your-email@gmail.com",
    "pass": "your-app-password"
  },
  "from": "noreply@haritbharatexpo.com"
}
```

### Exporting Data
- Click "Export CSV" button in Registrations tab
- Downloads file: `registrations-YYYY-MM-DD.csv`
- Use in Excel, Google Sheets, or any spreadsheet app

---

## 🔒 Security Features

1. **Admin Authentication**
   - Password-protected dashboard
   - Session management
   - Logout button available

2. **SMTP Credentials**
   - Password never shown in admin panel
   - Stored securely in JSON file
   - Only SMTP status shown in API responses

3. **Data Protection**
   - CORS enabled for cross-origin requests
   - Input validation on all endpoints
   - Error handling for invalid operations

---

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Check if port 5000 is in use
# Try killing the process on port 5000
netstat -ano | findstr :5000
# Then restart: node server-simple.js
```

### Admin Login Not Working
- Password is case-sensitive: `admin@2024`
- Check browser console for errors
- Clear browser cache and try again

### SMTP Test Fails
- Verify username and password are correct
- For Gmail: Use App Password, not account password
- Ensure 2FA is enabled on Gmail
- Check internet connection

### Registration Not Saving
- Verify backend is running on port 5000
- Check backend console for error messages
- Verify `data/registrations.json` file exists

### Can't Access Admin Panel
- Check frontend is running on port 8080
- Verify no browser cache issues
- Try incognito/private window

---

## 📚 Additional Resources

### File Locations
- Frontend code: `src/`
- Backend code: `server-simple.js`
- Admin component: `src/pages/Admin.tsx`
- Configuration: `data/`
- Setup guides: `SETUP_GUIDE.md`, `QUICK_START.md`

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js, CORS
- **Storage**: JSON files
- **UI Library**: Radix UI, Lucide Icons

---

## ✨ Key Capabilities

| Feature | Details |
|---------|---------|
| Admin Password | `admin@2024` |
| Max Registrations | Unlimited (JSON file) |
| Export Format | CSV with timestamp |
| SMTP Providers | Gmail, Outlook, Yahoo, Custom |
| Email Notifications | Automatic on registration |
| Secure Connection | TLS/SSL support |
| Data Persistence | JSON files in `data/` folder |
| API Format | RESTful JSON |

---

## 🎯 Next Steps

1. ✅ Start both servers (frontend & backend)
2. ✅ Test registration form
3. ✅ Log into admin panel
4. ✅ Configure SMTP settings
5. ✅ Test email notifications
6. ✅ Export sample data

---

## 📞 Support Notes

- **Frontend URL**: http://localhost:8080/
- **Backend URL**: http://localhost:5000/
- **Admin Panel**: http://localhost:8080/admin
- **Admin Password**: admin@2024
- **Backend Console**: Shows all API requests and responses
- **Browser Console**: Frontend errors and logs

---

**Admin panel and SMTP functionality is now fully integrated! 🚀**
