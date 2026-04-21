import { format, startOfWeek, getISOWeek, getYear } from 'date-fns'
import type { Trade, DailyPnL, WeeklyPnL, MonthlyPnL, PortfolioStats } from './types'
import { INITIAL_CAPITAL_GBP } from './sampleData'

export function computeDailyPnL(trades: Trade[]): DailyPnL[] {
  const byDay = new Map<string, { pnl: number; trades: number }>()

  for (const t of trades) {
    const day = t.exitTime.slice(0, 10)
    const cur = byDay.get(day) ?? { pnl: 0, trades: 0 }
    byDay.set(day, { pnl: cur.pnl + t.pnl, trades: cur.trades + 1 })
  }

  const sorted = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b))

  let equity = INITIAL_CAPITAL_GBP
  return sorted.map(([date, { pnl, trades }]) => {
    equity += pnl
    return {
      date,
      pnl: Math.round(pnl),
      pnlPct: parseFloat(((pnl / INITIAL_CAPITAL_GBP) * 100).toFixed(2)),
      trades,
      equity: Math.round(equity),
    }
  })
}

export function computeWeeklyPnL(daily: DailyPnL[]): WeeklyPnL[] {
  const byWeek = new Map<string, { pnl: number; trades: number; start: Date }>()

  for (const d of daily) {
    const date = new Date(d.date)
    const week = `${getYear(startOfWeek(date, { weekStartsOn: 1 }))}-W${String(getISOWeek(date)).padStart(2, '0')}`
    const cur = byWeek.get(week) ?? { pnl: 0, trades: 0, start: startOfWeek(date, { weekStartsOn: 1 }) }
    byWeek.set(week, { pnl: cur.pnl + d.pnl, trades: cur.trades + d.trades, start: cur.start })
  }

  return [...byWeek.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, { pnl, trades, start }]) => ({
      week,
      label: format(start, 'MMM d'),
      pnl: Math.round(pnl),
      pnlPct: parseFloat(((pnl / INITIAL_CAPITAL_GBP) * 100).toFixed(2)),
      trades,
    }))
}

export function computeMonthlyPnL(daily: DailyPnL[]): MonthlyPnL[] {
  const byMonth = new Map<string, { pnl: number; trades: number }>()

  for (const d of daily) {
    const month = d.date.slice(0, 7)
    const cur = byMonth.get(month) ?? { pnl: 0, trades: 0 }
    byMonth.set(month, { pnl: cur.pnl + d.pnl, trades: cur.trades + d.trades })
  }

  return [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { pnl, trades }]) => ({
      month,
      label: format(new Date(month + '-01'), 'MMM yyyy'),
      pnl: Math.round(pnl),
      pnlPct: parseFloat(((pnl / INITIAL_CAPITAL_GBP) * 100).toFixed(2)),
      trades,
    }))
}

export function computeEquityCurve(trades: Trade[]): { date: string; equity: number; drawdown: number }[] {
  const daily = computeDailyPnL(trades)
  let peak = INITIAL_CAPITAL_GBP
  return [
    { date: 'Start', equity: INITIAL_CAPITAL_GBP, drawdown: 0 },
    ...daily.map((d) => {
      if (d.equity > peak) peak = d.equity
      const drawdown = parseFloat((((peak - d.equity) / peak) * 100).toFixed(2))
      return { date: d.date, equity: d.equity, drawdown }
    }),
  ]
}

export function computeStats(trades: Trade[]): PortfolioStats {
  const daily = computeDailyPnL(trades)
  const equity = daily.at(-1)?.equity ?? INITIAL_CAPITAL_GBP
  const totalPnL = equity - INITIAL_CAPITAL_GBP

  const wins = trades.filter((t) => t.pnl > 0)
  const losses = trades.filter((t) => t.pnl <= 0)

  const grossWin = wins.reduce((s, t) => s + t.pnl, 0)
  const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pnl, 0))
  const profitFactor = grossLoss === 0 ? Infinity : parseFloat((grossWin / grossLoss).toFixed(2))
  const winRate = trades.length === 0 ? 0 : parseFloat(((wins.length / trades.length) * 100).toFixed(1))

  let peak = INITIAL_CAPITAL_GBP
  let maxDD = 0
  let runningEq = INITIAL_CAPITAL_GBP
  for (const d of daily) {
    runningEq = d.equity
    if (runningEq > peak) peak = runningEq
    const dd = peak - runningEq
    if (dd > maxDD) maxDD = dd
  }

  const dayPnLs = daily.map((d) => d.pnl)
  return {
    initialCapital: INITIAL_CAPITAL_GBP,
    currentEquity: Math.round(equity),
    totalPnL: Math.round(totalPnL),
    totalPnLPct: parseFloat(((totalPnL / INITIAL_CAPITAL_GBP) * 100).toFixed(2)),
    winRate,
    profitFactor,
    maxDrawdown: Math.round(maxDD),
    maxDrawdownPct: parseFloat(((maxDD / INITIAL_CAPITAL_GBP) * 100).toFixed(2)),
    totalTrades: trades.length,
    winningTrades: wins.length,
    losingTrades: losses.length,
    avgWin: wins.length === 0 ? 0 : Math.round(grossWin / wins.length),
    avgLoss: losses.length === 0 ? 0 : Math.round(grossLoss / losses.length),
    bestDay: Math.max(...dayPnLs, 0),
    worstDay: Math.min(...dayPnLs, 0),
  }
}
