# Quick Deployment Checklist

## 📋 Before You Upload

### 1. Update API URLs in Code
Replace all instances of `http://localhost:5000` with your production API URL:

**Files to update:**
- `src/pages/Index.tsx` (line ~150)
- `src/pages/Admin.tsx` (lines ~91, ~112, ~135, ~153, ~174)

**Change from:**
```typescript
http://localhost:5000/api/registrations
```

**To:**
```typescript
https://api.yourdomain.com/api/registrations
```

### 2. Rebuild
```bash
npm run build
```

---

## 📦 What to Upload

### Frontend (Upload to `public_html/`)
- All files from `dist/` folder

### Backend (Upload to `api/` or `backend/` folder)
- `server-simple.js`
- `package.json`
- Create empty `data/` folder

### .htaccess (Create in `public_html/`)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🎯 cPanel Steps

1. **Login to cPanel**
2. **File Manager** → Upload frontend files to `public_html/`
3. **Setup Node.js App**:
   - Application root: `api`
   - Startup file: `server-simple.js`
   - Click "Create" → "Run NPM Install" → "Start App"
4. **Note the API URL** (e.g., `https://api.yourdomain.com`)
5. **Update API URLs** in code (step 1 above)
6. **Rebuild and re-upload** frontend

---

## ✅ Test

- Visit `https://yourdomain.com` → Should load registration form
- Visit `https://api.yourdomain.com/` → Should show API status JSON
- Test registration → Should work and save to admin panel
- Visit `https://yourdomain.com/admin` → Login with `admin@2024`

---

## 🚨 Common Issues

**Cannot connect to API:**
- Check if Node.js app is running in cPanel
- Verify API URL in frontend code matches your actual API URL
- Check CORS settings in `server-simple.js`

**404 on page refresh:**
- Upload `.htaccess` file to `public_html/`

**Admin panel blank:**
- Check browser console (F12) for errors
- Verify API is accessible

---

**Full guide:** See `CPANEL_DEPLOYMENT_GUIDE.md`
