# Forex PnL Dashboard

Real-time forex trading dashboard tracking PnL across multiple strategies via PineConnector webhooks.

## Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/JamesMobelaris/forex-pnl-dashboard)

**Steps after clicking the button:**
1. Connect your GitHub account if prompted
2. Click **Add PostgreSQL** to provision a database (Railway will auto-set `DATABASE_URL`)
3. Click **Deploy** — the Dockerfile handles the build automatically
4. Copy the generated `*.up.railway.app` URL — your webhook endpoint: `https://<your-url>/api/webhook`

## Automated Deploys (CI/CD)

Once deployed, every push to `main` auto-deploys via the included GitHub Actions workflow.

**One-time setup:**
1. In Railway: **Project Settings → Tokens → New Token** — copy the token
2. In GitHub: **Settings → Secrets → Actions → New repository secret**
   - Name: `RAILWAY_TOKEN`
   - Value: (paste the Railway token)
3. Done — future pushes to `main` deploy automatically

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes — auto-set by Railway PostgreSQL plugin |
| `PORT` | Server port (default: 3000) | No |

## Webhook Endpoint

```
POST https://<your-railway-url>/api/webhook
```

Point your PineConnector alerts here. The dashboard at `/` shows all incoming trades in real time.

## Strategies Tracked

- London ORB v3 (GBPJPY, EURJPY, USDJPY, CADJPY, CHFJPY)
- Asian ORB v1
- TTM Squeeze v4
