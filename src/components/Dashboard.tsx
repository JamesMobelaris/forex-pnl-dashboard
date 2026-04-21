'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { StatCard } from '@/components/ui/StatCard'
import { EquityCurve } from '@/components/charts/EquityCurve'
import { PnLBarChart } from '@/components/charts/PnLBarChart'
import { TradeLog } from '@/components/TradeLog'
import { StrategyPanel } from '@/components/StrategyPanel'
import type { Trade, PortfolioStats, DailyPnL, WeeklyPnL, MonthlyPnL, StrategyId, StrategyMeta } from '@/lib/types'

type Period = 'daily' | 'weekly' | 'monthly'
type StrategyView = 'all' | StrategyId

interface StrategyData {
  trades: Trade[]
  stats: PortfolioStats
  daily: DailyPnL[]
  weekly: WeeklyPnL[]
  monthly: MonthlyPnL[]
  equity: { date: string; equity: number; drawdown: number }[]
}

interface Props {
  strategies: StrategyMeta[]
  totalEstDaily: number
  dailyTarget: number
  byStrategy: Record<string, StrategyData>
  combined: StrategyData
}

function gbp(n: number, sign = false) {
  const abs = `£${Math.abs(n).toLocaleString('en-GB')}`
  if (!sign) return abs
  return n >= 0 ? `+${abs}` : `-${abs}`
}

const STRATEGY_VIEWS: { id: StrategyView; label: string }[] = [
  { id: 'all',            label: 'All Strategies' },
  { id: 'london-orb-v3', label: 'London ORB v3' },
  { id: 'asian-orb',     label: 'Asian ORB' },
  { id: 'ttm-squeeze',   label: 'TTM Squeeze' },
]

export function Dashboard({ strategies, totalEstDaily, dailyTarget, byStrategy, combined }: Props) {
  const [strategyView, setStrategyView] = useState<StrategyView>('all')
  const [period, setPeriod] = useState<Period>('daily')

  const data: StrategyData = strategyView === 'all' ? combined : (byStrategy[strategyView] ?? combined)
  const { trades, stats, daily, weekly, monthly, equity } = data

  const barData =
    period === 'daily'
      ? daily.map((d) => ({ label: d.date.slice(5), pnl: d.pnl, pnlPct: d.pnlPct, trades: d.trades }))
      : period === 'weekly'
      ? weekly.map((w) => ({ label: w.label, pnl: w.pnl, pnlPct: w.pnlPct, trades: w.trades }))
      : monthly.map((m) => ({ label: m.label, pnl: m.pnl, pnlPct: m.pnlPct, trades: m.trades }))

  const todayPnL = daily.at(-1)?.pnl ?? 0
  const todayPct = daily.at(-1)?.pnlPct ?? 0

  const activeStrategy = strategies.find((s) => s.id === strategyView)
  const headerSubtitle = strategyView === 'all'
    ? 'London ORB v3 · Asian ORB · TTM Squeeze · All pairs'
    : activeStrategy
      ? `${activeStrategy.session} Session · ${activeStrategy.timeframe} · ${activeStrategy.pairs.join(' / ')}`
      : ''

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Forex PnL Dashboard</h1>
            <p className="text-xs text-slate-500">{headerSubtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-wider">Today&apos;s PnL</div>
            <div className={clsx('text-xl font-bold', todayPnL >= 0 ? 'text-emerald-400' : 'text-red-400')}>
              {gbp(todayPnL, true)}{' '}
              <span className="text-sm font-normal opacity-70">
                ({todayPct > 0 ? '+' : ''}{todayPct}%)
              </span>
            </div>
          </div>
        </div>

        {/* Strategy selector */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex gap-2 overflow-x-auto">
          {STRATEGY_VIEWS.map((sv) => (
            <button
              key={sv.id}
              onClick={() => setStrategyView(sv.id)}
              className={clsx(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                strategyView === sv.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200'
              )}
            >
              {sv.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Key stats */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard
            label="Current Equity"
            value={gbp(stats.currentEquity)}
            sub={`${gbp(stats.totalPnL, true)} total`}
            positive={stats.totalPnL >= 0}
            icon="💼"
          />
          <StatCard
            label="Total PnL"
            value={`${stats.totalPnLPct > 0 ? '+' : ''}${stats.totalPnLPct}%`}
            sub={gbp(stats.totalPnL, true)}
            positive={stats.totalPnLPct >= 0}
            icon="📈"
          />
          <StatCard
            label="Win Rate"
            value={`${stats.winRate}%`}
            sub={`${stats.winningTrades}W / ${stats.losingTrades}L`}
            positive={stats.winRate >= 50}
            icon="🎯"
          />
          <StatCard
            label="Profit Factor"
            value={stats.profitFactor === Infinity ? '∞' : String(stats.profitFactor)}
            sub={`Avg win ${gbp(stats.avgWin)} / loss ${gbp(stats.avgLoss)}`}
            positive={stats.profitFactor >= 1.5}
            icon="⚖️"
          />
          <StatCard
            label="Max Drawdown"
            value={`-${stats.maxDrawdownPct}%`}
            sub={gbp(stats.maxDrawdown)}
            positive={false}
            icon="📉"
          />
          <StatCard
            label="Total Trades"
            value={String(stats.totalTrades)}
            sub={`Best day ${gbp(stats.bestDay, true)}`}
            positive={null}
            icon="🔁"
          />
        </section>

        {/* Capital bar */}
        <section className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Capital Deployed</span>
            <span className="text-xs text-slate-400">
              {gbp(stats.initialCapital)} initial · {gbp(stats.currentEquity)} current
            </span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
              style={{
                width: `${Math.min(100, (stats.currentEquity / stats.initialCapital) * 100).toFixed(1)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>£0</span>
            <span className={stats.currentEquity >= stats.initialCapital ? 'text-emerald-400' : 'text-red-400'}>
              {gbp(stats.currentEquity)} ({stats.totalPnLPct > 0 ? '+' : ''}{stats.totalPnLPct}%)
            </span>
            <span>{gbp(stats.initialCapital * 1.5)}</span>
          </div>
        </section>

        {/* Equity curve */}
        <EquityCurve data={equity} />

        {/* PnL bars */}
        <section className="space-y-3">
          <div className="flex gap-2">
            {(['daily', 'weekly', 'monthly'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={clsx(
                  'px-4 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  period === p
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200'
                )}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <PnLBarChart
            data={barData}
            title={`${period.charAt(0).toUpperCase() + period.slice(1)} PnL`}
          />
        </section>

        {/* Strategy breakdown — shown in All Strategies view */}
        {strategyView === 'all' && (
          <StrategyPanel
            strategies={strategies}
            totalEstDaily={totalEstDaily}
            dailyTarget={dailyTarget}
          />
        )}

        {/* Trade log */}
        <TradeLog trades={trades} />

        {/* Footer */}
        <footer className="text-center text-xs text-slate-600 pb-6">
          Target: +0.5%/day (£400/day) · Initial capital: £80,000 · {strategies.length} strategies live
        </footer>
      </main>
    </div>
  )
}
