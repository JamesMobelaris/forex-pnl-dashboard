import { Pool } from 'pg'

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    })
  }
  return pool
}

export async function ensureSchema(): Promise<void> {
  const client = await getPool().connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS webhook_signals (
        id SERIAL PRIMARY KEY,
        strategy VARCHAR(100),
        symbol VARCHAR(20),
        payload JSONB NOT NULL,
        received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)
    // Idempotent column additions for existing deployments
    await client.query(`
      ALTER TABLE webhook_signals ADD COLUMN IF NOT EXISTS strategy VARCHAR(100);
      ALTER TABLE webhook_signals ADD COLUMN IF NOT EXISTS symbol VARCHAR(20);
    `).catch(() => { /* ignore if columns already exist on older pg */ })
  } finally {
    client.release()
  }
}

export interface SignalEntry {
  strategy?: string
  symbol?: string
  [key: string]: unknown
  receivedAt: string
}

export async function insertSignal(payload: Record<string, unknown>): Promise<void> {
  await ensureSchema()
  const strategy = (payload.strategy as string | undefined) ?? null
  const symbol = (payload.symbol as string | undefined) ?? null
  await getPool().query(
    'INSERT INTO webhook_signals (strategy, symbol, payload, received_at) VALUES ($1, $2, $3, NOW())',
    [strategy, symbol, JSON.stringify(payload)]
  )
}

export async function listSignals(strategy?: string): Promise<SignalEntry[]> {
  await ensureSchema()
  let result
  if (strategy) {
    result = await getPool().query(
      'SELECT payload, received_at FROM webhook_signals WHERE strategy = $1 ORDER BY received_at DESC LIMIT 500',
      [strategy]
    )
  } else {
    result = await getPool().query(
      'SELECT payload, received_at FROM webhook_signals ORDER BY received_at DESC LIMIT 500'
    )
  }
  return result.rows.map((row) => ({
    ...row.payload,
    receivedAt: row.received_at,
  }))
}
