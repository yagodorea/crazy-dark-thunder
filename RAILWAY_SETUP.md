# Railway Monorepo Setup

This guide explains how to deploy both backend and frontend to Railway.

## Architecture

Railway requires **separate services** for each app in a monorepo:
- **Service 1:** Backend (apps/backend)
- **Service 2:** Frontend (apps/frontend) - Optional, Vercel is recommended

---

## Deploy Backend Service

### 1. Create Backend Service
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click "Add Service" → "GitHub Repo"

### 2. Configure Backend
1. Service Settings → **Root Directory**: `apps/backend`
2. Railway will automatically detect `railway.toml`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`

### 3. Add Environment Variables
```
PORT=5001
MONGODB_URI=<your-mongodb-atlas-connection-string>
NODE_ENV=production
```

### 4. Generate Domain
1. Settings → Generate Domain
2. Copy your backend URL (e.g., `https://backend-production-xxxx.railway.app`)

---

## Deploy Frontend Service (Optional)

**Note:** We recommend using **Vercel** for the frontend instead of Railway. But if you want to use Railway:

### 1. Create Frontend Service
1. In the same Railway project, click "New Service"
2. Choose "GitHub Repo" (same repository)

### 2. Configure Frontend
1. Service Settings → **Root Directory**: `apps/frontend`
2. Railway will automatically detect `railway.toml`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run preview`

### 3. Add Environment Variables
```
VITE_API_URL=<your-backend-railway-url>/api
```

### 4. Generate Domain
1. Settings → Generate Domain
2. Your frontend will be available at the generated URL

---

## Configuration Files

Each service has its own `railway.toml`:

**Backend (`apps/backend/railway.toml`):**
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

**Frontend (`apps/frontend/railway.toml`):**
```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm run preview"
```

---

## Why Separate Services?

Railway doesn't support multiple services in a single configuration. Each service:
- Has its own deployment pipeline
- Has its own environment variables
- Has its own domain/URL
- Scales independently

---

## Recommended Setup

✅ **Backend:** Railway
✅ **Frontend:** Vercel
✅ **Database:** MongoDB Atlas

This gives you:
- Best performance for static frontend (Vercel's CDN)
- Easy backend scaling (Railway)
- Managed database (Atlas)
- All on free tiers!

---

## Troubleshooting

### Build Fails
- Check that root directory is set correctly (`apps/backend` or `apps/frontend`)
- Verify `railway.toml` exists in the service directory
- Check build logs for specific errors

### Start Command Not Found
- Ensure `package.json` has the correct start script
- For backend: `"start": "node dist/index.js"`
- For frontend: `"preview": "vite preview"`

### Environment Variables Not Working
- Verify variables are set in Railway dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding/changing variables
