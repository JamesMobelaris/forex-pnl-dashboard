import { NextResponse } from 'next/server'
import { RAW_TRADES } from '@/lib/sampleData'
import { computeStats, computeDailyPnL, computeWeeklyPnL, computeMonthlyPnL } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

export async function GET() {
  const daily = computeDailyPnL(RAW_TRADES)
  return NextResponse.json({
    trades: RAW_TRADES,
    stats: computeStats(RAW_TRADES),
    daily,
    weekly: computeWeeklyPnL(daily),
    monthly: computeMonthlyPnL(daily),
  })
}
