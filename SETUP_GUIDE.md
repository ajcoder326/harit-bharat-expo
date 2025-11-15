# Harit Bharat Expo - Setup Guide

## Project Structure

This is a full-stack web application for the Harit Bharat Expo visitor registration system with an admin panel.

### Features

✨ **Frontend (React + TypeScript)**
- Responsive visitor registration form
- Beautiful eco-friendly UI with Tailwind CSS
- Form validation and error handling
- Admin panel route (/admin)

✨ **Backend (Express.js)**
- RESTful API for managing registrations
- SMTP configuration management
- Email notifications on registration
- Data persistence using JSON files

✨ **Admin Panel**
- View all visitor registrations in a table
- Delete registrations
- Export registrations as CSV
- Configure SMTP settings
- Test SMTP connection
- Password-protected dashboard

---

## Installation

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
npm install express cors body-parser nodemailer concurrently
```

If you encounter issues, try installing packages individually:
```bash
npm install express
npm install cors
npm install body-parser
npm install nodemailer
npm install concurrently
```

---

## Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Frontend (Vite Dev Server):**
```bash
npm run dev
```
Frontend will be available at: http://localhost:8080/

**Terminal 2 - Backend (Express Server):**
```bash
npm run server
```
Backend API will be available at: http://localhost:5000/

### Option 2: Run Both Together

```bash
npm run dev:all
```
This uses `concurrently` to run both frontend and backend in the same terminal.

---

## Using the Application

### 📝 Visitor Registration

1. Go to http://localhost:8080/
2. Fill in the registration form with:
   - Full Name
   - Email Address
   - Phone Number
3. Click "Complete Registration"
4. If SMTP is configured, you'll receive a confirmation email

### 🔐 Admin Panel

1. Go to http://localhost:8080/admin
2. Login with password: **admin@2024**
3. Access two tabs:

#### Registrations Tab
- View all visitor registrations in a table
- Export data as CSV
- Delete individual registrations

#### SMTP Settings Tab
- Configure your SMTP server
- Set up email notifications
- Test connection before saving

---

## SMTP Configuration

### Using Gmail

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
3. **Configure in Admin Panel:**
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Secure: `OFF` (for TLS)
   - Email/Username: Your Gmail address
   - Password: The 16-character app password from step 2
4. Click "Test Connection" to verify
5. Click "Save Configuration"

### Using Other Email Providers

**Outlook/Hotmail:**
- Host: `smtp-mail.outlook.com`
- Port: `587`
- Secure: `OFF`

**Yahoo Mail:**
- Host: `smtp.mail.yahoo.com`
- Port: `587` or `465`
- Secure: Check or uncheck depending on port

---

## Project Files

```
├── src/
│   ├── pages/
│   │   ├── Index.tsx          # Registration page
│   │   ├── Admin.tsx          # Admin dashboard
│   │   └── NotFound.tsx       # 404 page
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── App.tsx                # Main app with routes
│   └── main.tsx               # React entry point
├── server.js                  # Express backend server
├── package.json               # Dependencies
├── vite.config.ts             # Vite config
├── tailwind.config.ts         # Tailwind config
└── README.md                  # This file
```

---

## API Endpoints

### Registrations
- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Add new registration
- `DELETE /api/registrations/:id` - Delete registration

### SMTP Configuration
- `GET /api/smtp-config` - Get current SMTP config
- `POST /api/smtp-config` - Update SMTP config
- `POST /api/smtp-test` - Test SMTP connection

---

## Troubleshooting

### Backend not starting
- Make sure port 5000 is not in use
- Check Node.js is installed: `node --version`

### Frontend not connecting to backend
- Ensure backend is running on http://localhost:5000
- Check browser console for CORS errors
- Verify CORS is enabled in server.js

### Emails not sending
- Check SMTP credentials in admin panel
- Test connection first
- For Gmail, ensure you're using an App Password, not your account password
- Check spam/junk folder

### Admin login not working
- Default password is: `admin@2024`
- Password is case-sensitive

---

## Production Deployment

For production:

1. Build frontend:
   ```bash
   npm run build
   ```

2. Deploy backend server separately (requires Node.js hosting)

3. Update API URLs in frontend to point to production backend

4. Store SMTP credentials securely (use environment variables)

5. Use a proper database instead of JSON files

---

## Technologies Used

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router

**Backend:**
- Express.js
- Nodemailer
- CORS
- Body Parser

---

## Support

For issues or questions, please check:
1. Browser console for errors
2. Backend server logs
3. Verify all dependencies are installed
4. Ensure ports 8080 and 5000 are available

---

Happy registrations! 🌿
