'use client'

import type { StrategyMeta } from '@/lib/types'

interface Props {
  strategies: StrategyMeta[]
  totalEstDaily: number
  dailyTarget: number
}

function pct(n: number) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`
}
function gbp(n: number) {
  return `£${Math.abs(Math.round(n)).toLocaleString('en-GB')}`
}

const statusBadge: Record<string, string> = {
  live:     'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  tested:   'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  losing:   'bg-red-500/20 text-red-400 border border-red-500/30',
  'no-data':'bg-slate-700 text-slate-500 border border-slate-600',
}

export function StrategyPanel({ strategies, totalEstDaily, dailyTarget }: Props) {
  const targetPct = Math.round((totalEstDaily / dailyTarget) * 100)

  return (
    <section className="space-y-4">
      {/* Combined progress bar */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-medium text-white">Combined Daily Target Progress</div>
            <div className="text-xs text-slate-400 mt-0.5">All active strategies · {gbp(totalEstDaily)}/day est. vs £400 target</div>
          </div>
          <div className={`text-2xl font-bold ${targetPct >= 100 ? 'text-emerald-400' : targetPct >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
            {targetPct}%
          </div>
        </div>
        <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${targetPct >= 100 ? 'bg-emerald-500' : targetPct >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min(100, targetPct)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-slate-500">
          <span>£0</span>
          <span>Target: £400/day</span>
        </div>
      </div>

      {/* Per-strategy cards */}
      {strategies.map((strat) => (
        <div key={strat.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {/* Strategy header */}
          <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{strat.name}</span>
                {strat.isLive && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    LIVE
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {strat.session} Session · {strat.timeframe} · {strat.pairs.join(', ')}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Est. daily</div>
              <div className="text-base font-bold text-emerald-400">+{gbp(strat.estDailyGBP)}</div>
            </div>
          </div>

          {/* Backtest results table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-700/50">
                  <th className="text-left px-5 py-2 font-medium">Pair</th>
                  <th className="text-left px-3 py-2 font-medium">TF</th>
                  <th className="text-right px-3 py-2 font-medium">Net P&L</th>
                  <th className="text-right px-3 py-2 font-medium">CAGR</th>
                  <th className="text-right px-3 py-2 font-medium">Win%</th>
                  <th className="text-right px-3 py-2 font-medium">PF</th>
                  <th className="text-right px-3 py-2 font-medium">Max DD</th>
                  <th className="text-right px-5 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {strat.backtestResults.filter((r) => r.status !== 'no-data').map((r, i) => (
                  <tr key={i} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                    <td className="px-5 py-2 font-medium text-slate-200">{r.pair}</td>
                    <td className="px-3 py-2 text-slate-400">{r.timeframe}</td>
                    <td className={`px-3 py-2 text-right font-mono ${r.netPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {r.netPnL >= 0 ? '+' : ''}{gbp(r.netPnL)} ({pct(r.netPnLPct)})
                    </td>
                    <td className={`px-3 py-2 text-right font-mono ${r.cagr >= 10 ? 'text-emerald-400' : r.cagr >= 0 ? 'text-slate-300' : 'text-red-400'}`}>
                      {pct(r.cagr)}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-slate-300">{r.winRate.toFixed(1)}%</td>
                    <td className={`px-3 py-2 text-right font-mono ${r.profitFactor >= 1.2 ? 'text-emerald-400' : r.profitFactor >= 1 ? 'text-slate-300' : 'text-red-400'}`}>
                      {r.profitFactor > 0 ? r.profitFactor.toFixed(3) : '—'}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-red-400">
                      -{r.maxDrawdownPct.toFixed(1)}%
                    </td>
                    <td className="px-5 py-2 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  )
}
