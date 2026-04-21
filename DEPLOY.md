# Railway Deployment Guide

## One-Click Deploy (Fastest — ~5 minutes)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/JamesMobelaris/forex-pnl-dashboard)

1. Click the button above → you'll land on railway.app
2. Connect GitHub if prompted
3. In the new project, click **+ New** → **Database** → **Add PostgreSQL**
4. Hit **Deploy** — Railway detects the Dockerfile automatically
5. Once deployed, copy your `*.up.railway.app` URL

Your webhook endpoint will be: `https://<your-url>/api/webhook`

---

## Auto-Deploy CI/CD Setup (After Initial Deploy)

Add this file to `.github/workflows/railway-deploy.yml` in the repo:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Railway CLI
        run: npm install -g @railway/cli
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: railway up --detach
```

Then add `RAILWAY_TOKEN` to GitHub repo secrets (Railway → Project Settings → Tokens → New Token).

---

## PineConnector Webhook Setup

After deploy, set this URL in your PineConnector alerts:

```
https://<your-railway-url>/api/webhook
```

### Alert message format (PineConnector):
```
long cadjpy-0.01
```
or
```
short chfjpy-0.01
```

PineConnector sends a POST with the trade signal; the dashboard ingests and displays it live.
