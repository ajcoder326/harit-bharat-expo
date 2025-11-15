# 🌿 Harit Bharat Expo - Quick Start Guide

## ✅ What's Been Set Up

Your full-stack web application is now ready with:

### ✨ Frontend (React + TypeScript)
- **URL**: http://localhost:8080/
- Registration form with validation
- Beautiful eco-friendly UI design
- Admin panel at `/admin`

### ⚙️ Backend (Express.js API)
- **URL**: http://localhost:5000/
- Data persistence with JSON files
- SMTP configuration management
- Registration management endpoints

### 🔐 Admin Dashboard
- **URL**: http://localhost:8080/admin
- **Password**: `admin@2024`
- View all registrations in a table
- Export data as CSV
- Manage SMTP settings

---

## 🚀 How to Use

### Step 1: Start the Frontend (if not already running)
```bash
npm run dev
```
- Opens at http://localhost:8080/

### Step 2: Start the Backend (if not already running)
```bash
node server-simple.js
```
- Runs at http://localhost:5000/

### Step 3: Access the Application
- **Registration Page**: http://localhost:8080/
- **Admin Panel**: http://localhost:8080/admin

---

## 📝 Test the Registration Form

1. Go to http://localhost:8080/
2. Fill in:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+91 9876543210`
3. Click "Complete Registration"
4. Check the backend console - the registration should be saved

---

## 🔐 Access Admin Panel

1. Go to http://localhost:8080/admin
2. Password: `admin@2024`
3. You'll see two tabs:

### Registrations Tab
- View all submitted registrations in a table format
- See: Name, Email, Phone, Registration Time
- Delete registrations with the trash icon
- Export all data as CSV file

### SMTP Settings Tab
- Configure email notification settings
- **Fields**:
  - SMTP Host (e.g., `smtp.gmail.com`)
  - SMTP Port (e.g., `587`)
  - From Email Address
  - Email/Username
  - Password/App Password
  - Secure Connection Checkbox
- Test connection before saving
- Status indicator shows if SMTP is configured

---

## 📧 How to Set Up Email Notifications

### Using Gmail

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Google generates a 16-character password
   - Copy this password
3. **In Admin Panel - SMTP Settings**:
   - **SMTP Host**: `smtp.gmail.com`
   - **SMTP Port**: `587`
   - **Secure**: OFF (unchecked)
   - **From Email**: Your Gmail address
   - **Email/Username**: Your Gmail address
   - **Password**: The 16-character app password
4. Click **"Test Connection"** (shows success/error)
5. Click **"Save Configuration"**

Once configured:
- Users will receive confirmation emails after registering
- Email will contain event details

---

## 📊 API Endpoints

All endpoints are available at `http://localhost:5000/api/`

### Registrations
```bash
# Get all registrations
GET /api/registrations

# Submit new registration
POST /api/registrations
Body: { fullName, email, phone }

# Delete a registration
DELETE /api/registrations/:id
```

### SMTP Configuration
```bash
# Get current SMTP config
GET /api/smtp-config

# Update SMTP config
POST /api/smtp-config
Body: { host, port, secure, auth, from }

# Test SMTP connection
POST /api/smtp-test
```

---

## 📂 Project Files

```
├── src/
│   ├── pages/
│   │   ├── Index.tsx      # Registration page
│   │   ├── Admin.tsx      # Admin dashboard
│   │   └── NotFound.tsx   # 404 page
│   ├── components/ui/     # shadcn/ui components
│   ├── App.tsx            # Routes
│   └── main.tsx           # Entry point
├── server-simple.js       # Backend API
├── public/
│   └── logo.png           # Logo image
├── data/                  # Auto-created folder
│   ├── registrations.json # Stored registrations
│   └── smtp-config.json   # SMTP settings
├── package.json
└── vite.config.ts
```

---

## 🛠️ Troubleshooting

### Backend not starting?
```bash
# Make sure port 5000 is free
# Try:
node server-simple.js
```

### Frontend not connecting to backend?
- Check backend is running on `http://localhost:5000/`
- Check browser console for CORS errors
- Verify Express server is listening

### Admin login failing?
- Password is: `admin@2024` (case-sensitive)
- Check browser console for errors

### SMTP test failing?
- Verify credentials are correct
- For Gmail: Make sure you're using App Password, not account password
- Check internet connection
- Port 587 should be accessible

### Registration not saving?
- Check backend console for errors
- Verify registration data is being sent (check Network tab in DevTools)
- Check `data/registrations.json` file exists

---

## 📊 Data Storage

All data is stored in JSON files in the `data/` folder:

### registrations.json
Contains all visitor registrations:
```json
[
  {
    "id": "1234567890",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "registeredAt": "2024-11-14T10:30:00.000Z"
  }
]
```

### smtp-config.json
Contains SMTP configuration:
```json
{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "your-email@gmail.com",
    "pass": "your-16-char-password"
  },
  "from": "noreply@haritbharatexpo.com"
}
```

---

## 🎯 Next Steps

1. ✅ Test registration form - submit some test data
2. ✅ Log into admin panel
3. ✅ Set up SMTP for email notifications
4. ✅ Export registration data as CSV
5. ✅ Customize branding and colors as needed

---

## 💡 Features Overview

| Feature | Status | Location |
|---------|--------|----------|
| User Registration Form | ✅ Complete | `/` |
| Admin Dashboard | ✅ Complete | `/admin` |
| View Registrations | ✅ Complete | Admin > Registrations |
| Export to CSV | ✅ Complete | Admin > Registrations |
| Delete Registration | ✅ Complete | Admin > Registrations |
| SMTP Configuration | ✅ Complete | Admin > SMTP Settings |
| Email Notifications | ⚠️ Requires SMTP Setup | After registration |
| Password Protection | ✅ Complete | Admin Panel |

---

## 📞 Support

For issues:
1. Check the browser console (F12)
2. Check the backend console output
3. Verify ports 8080 and 5000 are available
4. Ensure all dependencies are installed: `npm install`

---

## 🚀 Deployment Notes

For production deployment:
1. Use a proper database (MongoDB, PostgreSQL) instead of JSON files
2. Implement proper authentication (JWT tokens)
3. Use environment variables for SMTP credentials
4. Deploy backend on Node.js hosting (Heroku, Railway, etc.)
5. Deploy frontend as static files (Vercel, Netlify, etc.)
6. Use HTTPS everywhere

---

**Happy registrations! 🌿**
