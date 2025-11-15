# 🚀 cPanel Deployment Guide

## ✅ Build Completed Successfully

Your production build is ready in the `dist` folder:
- `dist/index.html` - Main HTML file
- `dist/assets/` - All CSS and JavaScript files

---

## 📋 Prerequisites

1. **cPanel Access**: Login credentials to your cPanel hosting
2. **Node.js Support**: Your hosting should support Node.js applications (for the backend)
3. **Domain/Subdomain**: A domain or subdomain configured in cPanel

---

## 📦 What You Need to Upload

### Frontend Files (from `dist` folder):
- All files inside the `dist` folder

### Backend Files:
- `server-simple.js`
- `package.json`
- `data/` folder (will be created automatically if not exists)

---

## 🎯 Step-by-Step Deployment

### **Step 1: Prepare Your Files**

1. **Create a deployment folder** on your computer:
   ```
   harit-bharat-expo-deploy/
   ├── public_html/          (Frontend - contents of dist folder)
   │   ├── index.html
   │   └── assets/
   └── api/                  (Backend)
       ├── server-simple.js
       ├── package.json
       └── data/
   ```

2. **Copy files**:
   - Copy everything from `dist/` to `public_html/`
   - Copy `server-simple.js` and `package.json` to `api/`
   - Create an empty `data/` folder inside `api/`

---

### **Step 2: Login to cPanel**

1. Go to your cPanel URL (usually `yourdomain.com/cpanel` or `yourdomain.com:2083`)
2. Enter your cPanel username and password
3. Navigate to **File Manager**

---

### **Step 3: Upload Frontend Files**

1. In File Manager, navigate to `public_html/` (or your domain's document root)
2. Click **Upload** button at the top
3. Upload all files from your `dist/` folder:
   - `index.html`
   - All files in `assets/` folder
   
4. **Alternative**: Use FTP client like FileZilla:
   - Host: `ftp.yourdomain.com`
   - Upload files to `/public_html/` directory

---

### **Step 4: Setup Backend (Node.js Application)**

#### Option A: Using cPanel Node.js Selector (Recommended)

1. **Navigate to Node.js App**:
   - In cPanel, search for "Node.js" or "Setup Node.js App"
   - Click on **Setup Node.js App**

2. **Create New Application**:
   - Click **Create Application**
   - **Node.js version**: Select latest stable (18.x or 20.x)
   - **Application mode**: Production
   - **Application root**: `api` (or full path like `/home/username/api`)
   - **Application URL**: Choose subdomain (e.g., `api.yourdomain.com`)
   - **Application startup file**: `server-simple.js`
   - Click **Create**

3. **Upload Backend Files**:
   - Using File Manager, navigate to the `api/` folder you specified
   - Upload `server-simple.js`, `package.json`, and create `data/` folder

4. **Install Dependencies**:
   - In the Node.js App interface, find your application
   - Click **Run NPM Install** button
   - Wait for dependencies to install (express, cors, body-parser, nodemailer)

5. **Configure Environment**:
   - Click **Edit** on your Node.js application
   - Note the **Port** assigned (e.g., 3000, 3001)
   - Update the port in `server-simple.js` if needed

6. **Start Application**:
   - Click **Start App** or **Restart App**
   - Status should show "Running"

#### Option B: Manual Setup via Terminal (If SSH access available)

```bash
# SSH into your server
ssh username@yourdomain.com

# Navigate to api folder
cd ~/api

# Install Node.js if not installed (use nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Install dependencies
npm install

# Start the server with PM2 (process manager)
npm install -g pm2
pm2 start server-simple.js --name harit-bharat-api
pm2 save
pm2 startup
```

---

### **Step 5: Update Frontend API URLs**

**IMPORTANT**: Your frontend needs to connect to the backend API.

1. **Find your API URL**:
   - If using subdomain: `https://api.yourdomain.com`
   - If using port: `https://yourdomain.com:PORT`

2. **Update API URLs in code** (before building):
   
   Edit `src/pages/Index.tsx`:
   ```typescript
   // Change from:
   const response = await fetch("http://localhost:5000/api/registrations", {
   
   // To:
   const response = await fetch("https://api.yourdomain.com/api/registrations", {
   ```

   Edit `src/pages/Admin.tsx` (3 locations):
   ```typescript
   // Change all instances of:
   http://localhost:5000/api/
   
   // To:
   https://api.yourdomain.com/api/
   ```

3. **Rebuild the application**:
   ```bash
   npm run build
   ```

4. **Re-upload the `dist/` folder** to cPanel

---

### **Step 6: Configure .htaccess for React Router**

Create a `.htaccess` file in `public_html/` with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Force HTTPS (optional but recommended)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

This ensures:
- React Router works properly (all routes go to index.html)
- HTTPS is enforced

---

### **Step 7: Configure CORS on Backend**

Update `server-simple.js` CORS settings:

```javascript
// Change from:
app.use(cors());

// To:
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    'https://api.yourdomain.com'
  ],
  credentials: true
}));
```

Restart the Node.js app after this change.

---

### **Step 8: Test Your Deployment**

1. **Test Frontend**:
   - Visit `https://yourdomain.com`
   - Registration form should load properly
   - Check browser console for errors (F12)

2. **Test Backend API**:
   - Visit `https://api.yourdomain.com/` 
   - Should see: `{"message":"Harit Bharat Expo API Server","status":"running"}`

3. **Test Registration**:
   - Fill out and submit the registration form
   - Should see success message

4. **Test Admin Panel**:
   - Visit `https://yourdomain.com/admin`
   - Login with password: `admin@2024`
   - Check if registrations appear

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution**: 
- Check if Node.js app is running in cPanel
- Verify API URL is correct in frontend code
- Check CORS settings in `server-simple.js`
- Check browser console for specific errors

### Issue: "404 on page refresh"
**Solution**: 
- Ensure `.htaccess` file is properly configured
- Check if mod_rewrite is enabled in cPanel

### Issue: "Admin panel not loading"
**Solution**:
- Verify `.htaccess` rewrite rules are working
- Check React Router configuration

### Issue: "Data not persisting"
**Solution**:
- Ensure `data/` folder has write permissions (chmod 755 or 775)
- Check Node.js app has permission to write files
- In File Manager, right-click `data/` folder → Change Permissions → Set to 755

### Issue: "SMTP not sending emails"
**Solution**:
- Configure SMTP settings in admin panel
- Use Gmail App Passwords (not regular password)
- Check if port 587 is open on your hosting
- Some shared hosting blocks outgoing SMTP - contact support

---

## 📱 Quick Checklist

- [ ] Build created (`npm run build`)
- [ ] Frontend files uploaded to `public_html/`
- [ ] Backend files uploaded to `api/` folder
- [ ] Node.js app created and running in cPanel
- [ ] Dependencies installed (`npm install`)
- [ ] API URLs updated in frontend code
- [ ] `.htaccess` file configured
- [ ] CORS settings updated
- [ ] File permissions set for `data/` folder
- [ ] Website accessible at domain
- [ ] API responding at api subdomain
- [ ] Registration form working
- [ ] Admin panel accessible
- [ ] SMTP configured (optional)

---

## 🌐 Alternative: Deploy on Vercel/Netlify (Frontend) + Render/Railway (Backend)

If cPanel Node.js is not available or too complex:

### Frontend (Vercel/Netlify):
1. Push code to GitHub
2. Connect GitHub to Vercel/Netlify
3. Deploy automatically

### Backend (Render/Railway):
1. Push code to GitHub
2. Create new Web Service on Render
3. Deploy `server-simple.js`
4. Get the API URL and update frontend

---

## 📞 Need Help?

Common cPanel issues:
- **Node.js not available**: Contact hosting provider to enable Node.js
- **Port access**: Ask support which ports are available
- **File permissions**: Use File Manager → Change Permissions → 755 for folders, 644 for files

---

**🎉 Congratulations! Your Harit Bharat Expo registration system is now live!**

**URLs to bookmark**:
- Frontend: `https://yourdomain.com`
- Admin Panel: `https://yourdomain.com/admin`
- API Status: `https://api.yourdomain.com/`

**Admin Password**: `admin@2024`
