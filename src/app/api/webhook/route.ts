/**
 * PineConnector webhook endpoint.
 *
 * JSON payload (recommended):
 *   { "strategy": "london-orb-v3", "symbol": "GBPJPY", "action": "buy", "price": 199.10, ... }
 *
 * Plain text (legacy PineConnector format):
 *   license_id,command,symbol,risk,sl,tp
 *
 * GET /api/webhook?strategy=london-orb-v3  — filter by strategy
 * GET /api/webhook                          — all signals
 */

import { NextRequest, NextResponse } from 'next/server'
import { insertSignal, listSignals } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface PineConnectorPayload {
  strategy?: string
  id?: string
  passphrase?: string
  timestamp?: string
  action?: 'buy' | 'sell' | 'closelong' | 'closeshort'
  symbol?: string
  price?: number
  qty?: number
  sl?: number
  tp?: number
  pnl?: number
  raw?: string
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? ''
    let payload: PineConnectorPayload = {}

    if (contentType.includes('application/json')) {
      payload = await req.json()
    } else {
      const text = await req.text()
      payload = { raw: text }
    }

    const entry = { ...payload, receivedAt: new Date().toISOString() }
    await insertSignal(entry as Record<string, unknown>)

    console.log('[webhook] signal received:', entry)

    return NextResponse.json({ ok: true, received: entry }, { status: 200 })
  } catch (err) {
    console.error('[webhook] Error processing signal:', err)
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const strategy = req.nextUrl.searchParams.get('strategy') ?? undefined
    const signals = await listSignals(strategy)
    return NextResponse.json({ signals, count: signals.length })
  } catch (err) {
    console.error('[webhook] Error fetching signals:', err)
    return NextResponse.json({ signals: [], count: 0, error: 'DB unavailable' })
  }
}
