import { RAW_TRADES } from '@/lib/sampleData'
import {
  computeDailyPnL,
  computeWeeklyPnL,
  computeMonthlyPnL,
  computeEquityCurve,
  computeStats,
} from '@/lib/analytics'
import { Dashboard } from '@/components/Dashboard'

// Server component — computes all analytics server-side
export default function Home() {
  const trades = RAW_TRADES
  const daily = computeDailyPnL(trades)
  const weekly = computeWeeklyPnL(daily)
  const monthly = computeMonthlyPnL(daily)
  const equity = computeEquityCurve(trades)
  const stats = computeStats(trades)

  return (
    <Dashboard
      trades={trades}
      stats={stats}
      daily={daily}
      weekly={weekly}
      monthly={monthly}
      equity={equity}
    />
  )
}
