import { NextRequest, NextResponse } from 'next/server'
import { RAW_TRADES } from '@/lib/sampleData'
import { computeStats, computeDailyPnL, computeWeeklyPnL, computeMonthlyPnL, computeEquityCurve } from '@/lib/analytics'
import type { StrategyId } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const strategyFilter = req.nextUrl.searchParams.get('strategy') as StrategyId | null

  const trades = strategyFilter
    ? RAW_TRADES.filter((t) => t.strategy === strategyFilter)
    : RAW_TRADES

  const daily = computeDailyPnL(trades)
  return NextResponse.json({
    trades,
    stats: computeStats(trades),
    daily,
    weekly: computeWeeklyPnL(daily),
    monthly: computeMonthlyPnL(daily),
    equity: computeEquityCurve(trades),
  })
}
