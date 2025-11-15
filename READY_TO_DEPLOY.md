# 🚀 READY TO DEPLOY - jodhpur.theharitbharat.com

## ✅ All Code Updated!

**Domain**: http://jodhpur.theharitbharat.com
**API Domain**: http://jodhpur.theharitbharat.com/api

All API endpoints have been updated to use your production domain.

---

## 📦 Files Ready to Upload

### 1️⃣ Frontend Files (Upload to `public_html/`)
**Location**: `dist/` folder
- `dist/index.html`
- `dist/assets/` (all files)
- `.htaccess` (root of project - upload this too)

### 2️⃣ Backend Files (Upload to `api/` folder)
- `server-simple.js` 
- `package.json`
- Create empty `data/` folder in api directory

---

## 📋 cPanel Upload Steps

### Step 1: Upload Frontend
1. Login to cPanel
2. Open **File Manager**
3. Go to `public_html/`
4. Upload ALL files from `dist/` folder
5. Upload `.htaccess` file to `public_html/`

### Step 2: Setup Backend API
1. In cPanel, go to **Setup Node.js App**
2. Click **Create Application**
   - Node.js version: 18.x or 20.x
   - Application mode: Production
   - Application root: `api`
   - Application startup file: `server-simple.js`
   - Application URL: Leave default or set subdomain
3. Click **Create**

### Step 3: Upload Backend Files
1. In File Manager, navigate to `/home/yourusername/api/`
2. Upload:
   - `server-simple.js`
   - `package.json`
3. Create `data/` folder (right-click → Create Folder)
4. Set permissions on `data/` folder to 755

### Step 4: Install Dependencies & Start
1. Back in **Setup Node.js App**, find your application
2. Click **Run NPM Install** (wait for completion)
3. Click **Start App** or **Restart App**
4. Status should show "Running" ✅

---

## 🔧 Important Configuration

### Backend Port Configuration
Your Node.js app will get a port assigned by cPanel. You need to configure your web server to proxy requests from:
```
http://jodhpur.theharitbharat.com/api → http://localhost:PORT
```

### Add .htaccess Rule for API Proxy (in public_html/)
Add this to your `.htaccess` in `public_html/`:

```apache
# Proxy API requests to Node.js backend
<IfModule mod_proxy.c>
  ProxyPreserveHost On
  ProxyPass /api http://localhost:PORT/api
  ProxyPassReverse /api http://localhost:PORT/api
</IfModule>
```

**Replace `PORT`** with the actual port shown in your Node.js App settings.

**Alternative**: If proxy doesn't work, you may need to:
1. Use a subdomain like `api.jodhpur.theharitbharat.com`
2. Point it to your Node.js app in cPanel
3. Update the code to use subdomain (let me know if needed)

---

## ✅ Quick Test Checklist

After upload:
- [ ] Visit http://jodhpur.theharitbharat.com → Should load registration form
- [ ] Fill and submit registration → Should show success message
- [ ] Visit http://jodhpur.theharitbharat.com/admin → Should load admin login
- [ ] Login with password `admin@2024` → Should see dashboard
- [ ] Check registrations tab → Should see submitted data

If API not connecting:
- Check Node.js app is running in cPanel
- Verify proxy configuration in .htaccess
- Check browser console (F12) for specific errors

---

## 📁 Files Summary

**✅ Build Complete**: `dist/` folder ready
**✅ Domain Updated**: All API calls point to jodhpur.theharitbharat.com
**✅ CORS Configured**: Backend accepts requests from your domain
**✅ .htaccess Created**: React Router will work properly

---

## 🎯 What's Changed

1. **Frontend** (`Index.tsx`, `Admin.tsx`):
   - Changed: `http://localhost:5000/api/*`
   - To: `http://jodhpur.theharitbharat.com/api/*`

2. **Backend** (`server-simple.js`):
   - Added CORS for your domain
   - Accepts requests from: `http://jodhpur.theharitbharat.com` and `https://jodhpur.theharitbharat.com`

3. **Build**:
   - Fresh production build created in `dist/`

---

## 🆘 Need Help?

If you face issues:
1. Check Node.js app status in cPanel (should be "Running")
2. Check the port assigned to your Node.js app
3. Verify proxy configuration in .htaccess
4. Check file permissions on `data/` folder (755)
5. Look at browser console for error messages

**Admin Password**: `admin@2024`

---

**You're all set! Just upload and enjoy! 🎉**
