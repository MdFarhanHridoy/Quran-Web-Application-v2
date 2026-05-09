# Production Deployment Guide

Deploy the Quran Web Application using **Render** (backend) and **Vercel** (frontend). Total cost: **$0/month**.

## Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │   Backend       │
│   (Vercel)      │────────▶│   (Render)      │
│   Next.js 16    │  HTTPS  │   Hono + SQLite │
└─────────────────┘         └─────────────────┘
```

---

## Part 1: Deploy Backend to Render

### Why Render?
- Free tier with 750 hours/month
- Automatic SSL
- Node.js + native module support (better-sqlite3)
- GitHub integration with auto-deploy

> **Note:** Render's free tier uses ephemeral storage. The SQLite database is included in the repo and will be deployed with the container. This is acceptable for this project.

### Steps

1. Go to [render.com](https://render.com/) and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your repository
4. Configure:

```
Name:            quran-backend
Region:          Oregon (us-west) or closest
Branch:          main
Root Directory:  backend
Runtime:         Node
Build Command:   npm install
Start Command:   npm start
Instance Type:   Free
```

5. Under **Advanced** → **Environment Variables**, add:
   - `PORT` = `3001`

6. Click **"Create Web Service"**
7. Wait for deployment (2-5 minutes)
8. Save the backend URL (e.g. `https://quran-backend.onrender.com`)

### Verify

```
GET https://quran-backend.onrender.com/api/health
→ {"status":"ok","message":"Backend is running","timestamp":"..."}

GET https://quran-backend.onrender.com/api/surahs
→ [array of 114 surahs]
```

---

## Part 2: Deploy Frontend to Vercel

### Why Vercel?
- Official Next.js hosting platform
- Free hobby tier with global CDN
- Automatic deployments from Git
- Zero-config for most Next.js apps

### Steps

1. Go to [vercel.com](https://vercel.com/) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your repository
4. Configure:

```
Framework Preset:  Next.js (auto-detected)
Root Directory:    frontend
Build Command:     npm run build
Output Directory:  .next
Install Command:   npm install
```

 5. Under **Environment Variables**, add:
    - `NEXT_PUBLIC_API_URL` = `https://quran-backend-v2.onrender.com`
    - Select **Production**, **Preview**, and **Development**

> **Important:** The variable must start with `NEXT_PUBLIC_` to be accessible in the browser. Use `https://` (not `http://`). No trailing slash. Use the correct backend URL: `https://quran-backend-v2.onrender.com`.

6. Click **"Deploy"**
 7. Wait for deployment (2-4 minutes)
  8. Save the frontend URL (e.g. `https://quran-web-application-v2.vercel.app`)

> **Note**: A `vercel.json` configuration file has been added to the `frontend` directory for explicit Vercel configuration, which helps prevent middleware 404 errors.

### Verify

- Homepage loads and redirects to `/surah/1`
- Surah list in sidebar is populated (114 surahs)
- Arabic text and English translation display correctly
- Search returns results
- Settings panel works and persists after refresh
- Audio play button works on each ayah

---

## Part 3: Post-Deployment Testing

### Backend
- [ ] `/api/health` returns 200 OK
- [ ] `/api/surahs` returns 114 surahs
- [ ] `/api/surahs/1` returns Surah Al-Fatihah
- [ ] `/api/surah/1/ayahs` returns 7 ayahs with translations
- [ ] `/api/search?q=allah` returns results with pagination
- [ ] CORS headers present on all responses

### Frontend
- [ ] Homepage loads without errors
- [ ] All 114 surahs listed in sidebar
- [ ] Clicking surah navigates to detail page
- [ ] Arabic text displays with configurable font
- [ ] English translation displays correctly
- [ ] Audio playback works per ayah
- [ ] Search returns and highlights results
- [ ] Settings panel opens with slide animation
- [ ] Font changes apply immediately
- [ ] Settings persist after page refresh
- [ ] Responsive on mobile (drawer overlays)

### Performance
- [ ] Initial page load < 3 seconds
- [ ] API responses < 500ms
- [ ] Smooth navigation between surahs

---

## Environment Variables Reference

### Backend (Render)

| Variable | Required | Value |
|---|---|---|
| `PORT` | Yes | `3001` |

### Frontend (Vercel)

| Variable | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Your Render backend URL (e.g. `https://quran-backend.onrender.com`) |

---

## Troubleshooting

### Backend deployment fails
- Check build logs in Render dashboard
- Verify `package.json` has correct `start` script
- Ensure `better-sqlite3` is in `dependencies` (not `devDependencies`)
- Verify `backend/src/db/quran.db` is committed to the repo

### Vercel Middleware 404 Errors

If you see "Middleware Status: 404" in Vercel runtime logs:

1. **Check Root Directory** (Most Common Cause):
   - Go to Settings → General in Vercel dashboard
   - Ensure Root Directory is set to `frontend`
   - NOT the project root `/`

2. **Verify Framework Detection**:
   - Framework Preset should be `Next.js`
   - If showing `Other` or `Node.js`, change to `Next.js`

3. **Add or Update vercel.json**:
   - The `frontend/vercel.json` file provides explicit configuration
   - Ensure it exists and has correct settings:
     ```json
     {
       "buildCommand": "npm run build",
       "outputDirectory": ".next",
       "framework": "nextjs",
       "installCommand": "npm install"
     }
     ```

4. **Clear Browser Cache**:
   - Vercel 404 responses can be cached
   - Try incognito mode or clear browser cache
   - The deployment may have changed but browser is showing cached 404

5. **Verify Deployment Status**:
   - Ensure deployment shows "Ready" status in Vercel dashboard
   - Check for failed builds or errors in deployment logs

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` starts with `https://`
- Ensure backend is deployed and running
- Test backend URL directly in browser
- Check CORS settings (backend allows `origin: '*'`)

### Database not found in production
- Verify `backend/src/db/quran.db` is in the git repository
- Check file path in `backend/src/db/connection.js`
- Ensure database file is not in `.gitignore`
- Commit was made to add database to git (commit 40c2a72)

### TypeScript build errors on Vercel
- Ensure `typescript` is in `devDependencies`
- Run `npm run build` locally to catch errors before deploying
- Check Vercel build logs for specific errors

---

## Maintenance

Both platforms auto-deploy on push to `main`:

1. Make changes locally
2. Commit and push to GitHub
3. Render and Vercel detect changes and redeploy independently

### Dashboards
- **Render:** https://dashboard.render.com/
- **Vercel:** https://vercel.com/dashboard

---

## Cost Summary

| Platform | Tier | Cost |
|---|---|---|
| Render (Backend) | Free | $0/month |
| Vercel (Frontend) | Hobby | $0/month |
| **Total** | | **$0/month** |

---

## Alternative Platforms

### Backend
- [Railway](https://railway.app/) — $5 free credit/month
- [Fly.io](https://fly.io/) — 3 free VMs
- [Replit](https://replit.com/) — Free tier available

### Frontend
- [Netlify](https://netlify.com/) — Free tier, good for static sites
- [Cloudflare Pages](https://pages.cloudflare.com/) — Free tier with global CDN

---

## Submission Format

```
GitHub Repository: https://github.com/<username>/Quran-Web-Application-v2
Live Application:   https://quran-web-application-v2.vercel.app
Backend API:        https://quran-backend-v2.onrender.com
```
