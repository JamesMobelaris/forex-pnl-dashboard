/**
 * PineConnector webhook endpoint.
 * PineConnector sends trade signals in this format:
 *   license_id,command,symbol,risk,sl,tp
 * e.g.:  "12345,buy,CADJPY,1,50,100"
 *
 * For full trade close events it sends:
 *   license_id,closelong,CADJPY  (or closeshort)
 *
 * This endpoint receives the raw signal and logs it.
 * In production, you'd persist to a DB (e.g. PlanetScale, Supabase, or a JSON file).
 */

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface PineConnectorPayload {
  id?: string
  passphrase?: string
  timestamp?: string
  // trade fields
  action?: 'buy' | 'sell' | 'closelong' | 'closeshort'
  symbol?: string
  price?: number
  qty?: number
  sl?: number
  tp?: number
  pnl?: number
  // raw string form
  raw?: string
}

// In-memory store (resets on restart; swap for DB in production)
const tradeLog: (PineConnectorPayload & { receivedAt: string })[] = []

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? ''
    let payload: PineConnectorPayload = {}

    if (contentType.includes('application/json')) {
      payload = await req.json()
    } else {
      // PineConnector may send as plain text
      const text = await req.text()
      payload = { raw: text }
    }

    const entry = { ...payload, receivedAt: new Date().toISOString() }
    tradeLog.push(entry)

    console.log('[webhook] PineConnector signal received:', entry)

    return NextResponse.json({ ok: true, received: entry }, { status: 200 })
  } catch (err) {
    console.error('[webhook] Error processing signal:', err)
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ signals: tradeLog, count: tradeLog.length })
}
