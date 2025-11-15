# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import your GitHub repository
5. Vercel will auto-detect Vite
6. Click **"Deploy"**

That's it! Vercel handles everything automatically.

---

## 🔧 Configuration

The project is already configured with `vercel.json`:
- ✅ Frontend served from `dist/`
- ✅ Backend API at `/api/*`
- ✅ Automatic routing

---

## 🌐 After Deployment

Your site will be live at: `https://your-project-name.vercel.app`

### Update API URLs (if needed)

If Vercel assigns a different domain, you may need to update:

1. **`src/pages/Index.tsx`** - Change API endpoints
2. **`src/pages/Admin.tsx`** - Change API endpoints

But the current setup with relative paths should work automatically!

---

## ✅ Advantages of Vercel

- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Auto-scaling**
- ✅ **Zero configuration**
- ✅ **Free tier available**
- ✅ **Automatic builds on git push**
- ✅ **Environment variables support**
- ✅ **Node.js 18+ support**

---

## 📝 Files for Vercel

Already in your project:
- ✅ `vercel.json` - Deployment configuration
- ✅ `dist/` - Production build
- ✅ `server-simple.js` - API backend
- ✅ `package.json` - Dependencies

---

## 🎯 Testing After Deploy

1. Visit your Vercel URL
2. Test registration form
3. Visit `/admin` (password: `admin@2024`)
4. Check if registrations save

---

**Much easier than cPanel! 🎉**
