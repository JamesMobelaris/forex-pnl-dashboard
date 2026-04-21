import { RAW_TRADES } from '@/lib/sampleData'
import { STRATEGIES, TOTAL_EST_DAILY_GBP, DAILY_TARGET_GBP } from '@/lib/strategies'
import {
  computeDailyPnL,
  computeWeeklyPnL,
  computeMonthlyPnL,
  computeEquityCurve,
  computeStats,
} from '@/lib/analytics'
import { Dashboard } from '@/components/Dashboard'
import type { StrategyId } from '@/lib/types'

function buildStrategyData(trades: typeof RAW_TRADES) {
  const daily = computeDailyPnL(trades)
  return {
    trades,
    stats: computeStats(trades),
    daily,
    weekly: computeWeeklyPnL(daily),
    monthly: computeMonthlyPnL(daily),
    equity: computeEquityCurve(trades),
  }
}

// Server component — all analytics computed server-side, zero client bundle overhead
export default function Home() {
  const combined = buildStrategyData(RAW_TRADES)

  const strategyIds: StrategyId[] = ['london-orb-v3', 'asian-orb', 'ttm-squeeze', 'fvg-port']
  const byStrategy = Object.fromEntries(
    strategyIds.map((id) => [
      id,
      buildStrategyData(RAW_TRADES.filter((t) => t.strategy === id)),
    ])
  )

  return (
    <Dashboard
      strategies={STRATEGIES}
      totalEstDaily={TOTAL_EST_DAILY_GBP}
      dailyTarget={DAILY_TARGET_GBP}
      combined={combined}
      byStrategy={byStrategy}
    />
  )
}
