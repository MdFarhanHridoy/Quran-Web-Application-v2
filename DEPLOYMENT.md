# Production Deployment Guide

This guide provides step-by-step instructions to deploy the Quran Web Application to production using **Render** for the backend and **Vercel** for the frontend.

## Prerequisites

Before starting, ensure you have:
- ✅ GitHub repository with the project code (already pushed)
- ✅ GitHub account with access to the repository
- ✅ Render account (free) - https://render.com/
- ✅ Vercel account (free) - https://vercel.com/
- ✅ Node.js installed locally for testing

## Project Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend       │
│   (Vercel)      │────────▶│   (Render)      │
│   Next.js       │  HTTPS  │   Hono + SQLite │
│   Port 3000     │         │   Port 3001     │
└─────────────────┘         └─────────────────┘
```

---

## Part 1: Deploy Backend to Render

### Step 1.1: Prepare for Render Deployment

**Why Render?**
- ✅ Free tier for web services
- ✅ Always running (no sleep for web services)
- ✅ Easy GitHub integration
- ✅ Automatic SSL certificates
- ✅ Supports Node.js and native modules (better-sqlite3)

**Important Note:** Render's free tier uses ephemeral storage. The SQLite database will be in the container, not persistent storage. For this hiring task, this is acceptable.

### Step 1.2: Create Render Account

1. Go to https://render.com/
2. Sign up for a free account (use GitHub to sign in)
3. Verify your email if required

### Step 1.3: Connect GitHub Repository

1. After logging in to Render, click **"New +"** button
2. Select **"Web Service"**
3. If prompted, authorize Render to access your GitHub account
4. Select your repository: `MdFarhanHridoy/Quran-Web-Application`
5. Click **"Connect"**

### Step 1.4: Configure Backend Web Service

**Basic Settings:**
- **Name:** `quran-backend` (or your preferred name)
- **Region:** Oregon (us-west) or closest to you
- **Branch:** `main`

**Build & Deploy Settings:**
- **Root Directory:** `backend` (IMPORTANT - specifies backend subdirectory)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Settings:**
- **Instance Type:** **Free** (default)
- **RAM:** 512 MB
- **CPU:** 0.1 (shared)

**Advanced Settings:**
- Click **"Advanced"** to configure:
  - **Environment Variables:** Add `PORT` with value `3001`

**Complete Configuration:**
```
Name: quran-backend
Region: Oregon (us-west)
Branch: main

Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start

Instance Type: Free

Environment Variables:
  PORT = 3001
```

### Step 1.5: Deploy Backend

1. Review all settings
2. Click **"Create Web Service"**
3. Wait for deployment to complete (2-5 minutes)
4. You'll see build logs and deployment status
5. Once deployed, Render will provide a URL like: `https://quran-backend.onrender.com`

### Step 1.6: Verify Backend Deployment

1. Click the provided URL to open your backend
2. Test the health endpoint: `https://quran-backend.onrender.com/api/health`
3. Expected response: `{"status":"ok"}` or similar
4. Test surahs endpoint: `https://quran-backend.onrender.com/api/surahs`
5. Expected response: JSON array with 114 surahs

**Save your backend URL:** You'll need this for frontend configuration
```
https://quran-backend.onrender.com
```

### Step 1.7: Backend Troubleshooting

**Issue:** "Module not found: better-sqlite3"
- **Solution:** Render automatically installs native modules. If issues persist, check build logs.

**Issue:** "Database not found"
- **Solution:** The database file is in your git repo at `backend/src/db/quran.db`. Ensure it's committed.

**Issue:** "Port already in use"
- **Solution:** Render automatically assigns ports. Ensure `PORT` environment variable is set to `3001` and backend uses `process.env.PORT`.

**Issue:** "404 Not Found" on API routes
- **Solution:** Check that the `Root Directory` is set to `backend` and the start command is correct.

---

## Part 2: Deploy Frontend to Vercel

### Step 2.1: Prepare for Vercel Deployment

**Why Vercel?**
- ✅ Official platform for Next.js (built by Next.js creators)
- ✅ Free tier with generous limits
- ✅ Automatic deployments from Git
- ✅ Global CDN for fast performance
- ✅ Edge functions support
- ✅ Zero configuration for most Next.js apps

### Step 2.2: Create Vercel Account

1. Go to https://vercel.com/
2. Click **"Sign Up"**
3. Sign up with your GitHub account (recommended)
4. Verify your email if required

### Step 2.3: Import GitHub Repository

1. After logging in, click **"Add New..."** → **"Project"**
2. If prompted, install Vercel to your GitHub account
3. Find and select: `MdFarhanHridoy/Quran-Web-Application`
4. Click **"Import"**

### Step 2.4: Configure Frontend Project

**Project Settings:**

**Framework Preset:**
- **Framework:** **Next.js** (auto-detected)
- **Root Directory:** `frontend` (IMPORTANT - specifies frontend subdirectory)

**Build & Output Settings:**
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

**Environment Variables:**

Click **"Add Environment Variable"** and add:
- **Key:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://quran-backend.onrender.com` (replace with your actual backend URL from Part 1)
- **Environment:** Select **Production**, **Preview**, and **Development**

**Important:** Make sure the variable starts with `NEXT_PUBLIC_` or it won't be accessible in the browser!

**Complete Configuration:**
```
Framework: Next.js
Root Directory: frontend

Build Command: npm run build
Output Directory: .next
Install Command: npm install

Environment Variables:
  NEXT_PUBLIC_API_URL = https://quran-backend.onrender.com
```

### Step 2.5: Deploy Frontend

1. Review all settings
2. Click **"Deploy"**
3. Wait for deployment to complete (2-4 minutes)
4. Vercel will provide a URL like: `https://quran-web-application.vercel.app`
5. The deployment is automatic - no manual steps needed

### Step 2.6: Verify Frontend Deployment

1. Click the provided URL to open your frontend
2. You should see the homepage with "The Holy Quran" title
3. Test browsing surahs:
   - Click on any surah
   - Verify Arabic text and English translation display
   - Verify Settings button is visible on homepage
4. Test search functionality:
   - Navigate to "Search by Ayahs"
   - Search for a common word like "Allah" or "faith"
   - Verify results display
   - Test "Load More" button if more than 50 results
5. Test settings:
   - Click "⚙️ Settings" button
   - Change Arabic font (Amiri/Scheherazade)
   - Adjust font sizes
   - Verify changes apply immediately
   - Refresh page and verify settings persist

### Step 2.7: Frontend Troubleshooting

**Issue:** "Failed to fetch surahs" or API errors
- **Solution:** Check that `NEXT_PUBLIC_API_URL` is set correctly and starts with `https://`. Ensure backend is running.

**Issue:** "Module not found" errors
- **Solution:** Vercel automatically installs dependencies. Check build logs for specific errors.

**Issue:** Settings not persisting
- **Solution:** Settings use localStorage, which is browser-specific. This is expected behavior.

**Issue:** CORS errors in browser console
- **Solution:** Backend CORS is configured to allow all origins (`origin: '*'`). If issues persist, check backend logs.

**Issue:** Build fails with TypeScript errors
- **Solution:** Ensure `typescript` is in devDependencies. Vercel will run type checking during build.

---

## Part 3: Post-Deployment Testing

### Step 3.1: Complete Testing Checklist

**Backend Tests:**
- [ ] Health endpoint returns 200 OK
- [ ] `/api/surahs` returns 114 surahs
- [ ] `/api/surahs/1` returns Surah Al-Fatiha
- [ ] `/api/surah/1/ayahs` returns 7 ayahs
- [ ] Search endpoint works with pagination
- [ ] CORS headers allow frontend access

**Frontend Tests:**
- [ ] Homepage loads without errors
- [ ] All 114 surahs are listed
- [ ] Clicking surah navigates to detail page
- [ ] Arabic text displays correctly with proper font
- [ ] English translation displays correctly
- [ ] Search functionality works
- [ ] "Load More" button appears when needed
- [ ] Settings button visible on homepage only
- [ ] Settings panel opens and works correctly
- [ ] Font changes apply immediately
- [ ] Settings persist after page refresh
- [ ] Responsive design works on mobile

**Integration Tests:**
- [ ] Frontend successfully connects to backend
- [ ] No CORS errors in browser console
- [ ] All API calls complete successfully
- [ ] Error handling works (network failures, etc.)
- [ ] Loading states display properly

**Performance Tests:**
- [ ] Initial page load < 3 seconds
- [ ] API responses < 500ms
- [ ] Navigation between pages is smooth
- [ ] No memory leaks (check browser DevTools)

### Step 3.2: Share Deployment Links

**For Hiring Task Submission:**

1. **Backend URL:** `https://quran-backend.onrender.com`
   - Test: `https://quran-backend.onrender.com/api/health`

2. **Frontend URL:** `https://quran-web-application.vercel.app`
   - This is the main link to share

3. **GitHub Repository:** `https://github.com/MdFarhanHridoy/Quran-Web-Application`

**Format for submission:**
```
GitHub Repository: https://github.com/MdFarhanHridoy/Quran-Web-Application
Live Application: https://quran-web-application.vercel.app
Backend API: https://quran-backend.onrender.com
```

---

## Part 4: Environment Variables Reference

### Backend Environment Variables (Render)

**Required:**
```bash
PORT=3001
```

**Optional:**
```bash
# No additional variables needed for this project
```

### Frontend Environment Variables (Vercel)

**Required:**
```bash
NEXT_PUBLIC_API_URL=https://quran-backend.onrender.com
```

**Important Notes:**
- Vercel environment variables must start with `NEXT_PUBLIC_` to be accessible in browser code
- The API URL should include `https://` (not `http://`)
- Do NOT include trailing slashes in the URL
- Update the value to match your actual Render backend URL

---

## Part 5: Common Issues and Solutions

### Issue 1: Backend Deployment Fails

**Symptoms:** Render shows "Build failed" or "Deploy failed"

**Solutions:**
1. Check build logs in Render dashboard
2. Verify `package.json` has correct `start` script
3. Ensure all dependencies are in `dependencies` (not `devDependencies`)
4. Check that `better-sqlite3` is properly installed
5. Verify file paths are correct (database location)

### Issue 2: Frontend Can't Connect to Backend

**Symptoms:** "Failed to fetch" errors, CORS errors, or 404s

**Solutions:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
2. Ensure backend is deployed and running
3. Check browser console for specific error messages
4. Test backend API directly in browser
5. Verify CORS settings in backend (`origin: '*'`)

### Issue 3: Database Not Found in Production

**Symptoms:** "Database not found" or "SQLITE_CANTOPEN" errors

**Solutions:**
1. Verify `backend/src/db/quran.db` is in git repository
2. Check file path in `backend/src/db/connection.js`
3. Ensure database file is not in `.gitignore`
4. Verify database was committed to repository

### Issue 4: Build Takes Too Long

**Symptoms:** Build process exceeds time limits

**Solutions:**
1. This is usually a one-time issue
2. Subsequent builds use caching and are faster
3. Ensure `.gitignore` excludes `node_modules`
4. Reduce the size of committed files

### Issue 5: Out of Memory Errors

**Symptoms:** "JavaScript heap out of memory" during build

**Solutions:**
1. This is rare with this project size
2. If it occurs, may be a Vercel platform issue
3. Try redeploying
4. Check for memory leaks in code

---

## Part 6: Maintenance and Updates

### How to Update Deployed Applications

**Backend Updates:**
1. Make changes to backend code
2. Commit and push to GitHub
3. Render automatically detects changes and redeploys
4. No manual action needed

**Frontend Updates:**
1. Make changes to frontend code
2. Commit and push to GitHub
3. Vercel automatically detects changes and redeploys
4. No manual action needed

**Both Frontend and Backend:**
1. Make changes to both
2. Commit and push to GitHub
3. Both platforms auto-deploy independently
4. Backend usually deploys first (simpler build)

### Monitoring

**Render Dashboard:**
- View logs: https://dashboard.render.com/
- Check service status
- Monitor resource usage
- View deployment history

**Vercel Dashboard:**
- View deployments: https://vercel.com/dashboard
- Check analytics
- Monitor performance
- View build logs

### Cleanup (After Hiring Task)

**If you want to remove deployments:**

1. **Delete from Render:**
   - Go to Render dashboard
   - Select your web service
   - Click "Settings" → "Delete Service"

2. **Delete from Vercel:**
   - Go to Vercel dashboard
   - Select your project
   - Click "Settings" → "Delete Project"

3. **Keep or Delete GitHub:**
   - Keep as portfolio piece
   - Or delete if preferred

---

## Part 7: Cost Summary

### Render (Backend)
- **Free Tier:** $0/month
- **Included:**
  - 750 hours/month of web service time
  - 512 MB RAM
  - 0.1 CPU (shared)
  - Automatic SSL
  - Git integration
- **Duration:** Sufficient for hiring task evaluation

### Vercel (Frontend)
- **Hobby Tier:** $0/month
- **Included:**
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - Preview deployments
  - Edge functions
- **Duration:** Sufficient for hiring task evaluation

### Total Cost
**$0.00** - Completely free for this use case!

---

## Part 8: Alternative Deployment Options

If Render or Vercel don't work for you, here are alternatives:

### Backend Alternatives

**Railway:**
- Free: $5 credit/month
- URL: https://railway.app/
- Similar to Render, easy setup

**Fly.io:**
- Free: 3 VMs with shared CPU
- URL: https://fly.io/
- More complex setup, credit card required

**Replit:**
- Free tier available
- URL: https://replit.com/
- Good for simple deployments

### Frontend Alternatives

**Netlify:**
- Free tier available
- URL: https://netlify.com/
- Great for static sites

**GitHub Pages:**
- Free
- URL: https://pages.github.com/
- Not ideal for Next.js (requires export)

**Cloudflare Pages:**
- Free tier available
- URL: https://pages.cloudflare.com/
- Good performance, global CDN

---

## Quick Reference Card

### Backend (Render)
```
Platform: Render
URL: https://quran-backend.onrender.com
Root Directory: backend
Build Command: npm install
Start Command: npm start
Environment: PORT=3001
```

### Frontend (Vercel)
```
Platform: Vercel
URL: https://quran-web-application.vercel.app
Root Directory: frontend
Build Command: npm run build
Environment: NEXT_PUBLIC_API_URL=https://quran-backend.onrender.com
```

### GitHub
```
Repository: https://github.com/MdFarhanHridoy/Quran-Web-Application
Branch: main
Status: Public
```

---

## Conclusion

Following this guide, you should have:
- ✅ Backend deployed and running on Render
- ✅ Frontend deployed and running on Vercel
- ✅ Both services connected and working
- ✅ Full application accessible via public URL
- ✅ Ready to share with hiring company

**Next Steps:**
1. Complete the testing checklist
2. Share the deployment links
3. Be prepared to explain your architecture and deployment process
4. Highlight the free hosting choices and their benefits

**Good luck with your hiring task!** 🚀
