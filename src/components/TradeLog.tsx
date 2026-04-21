'use client'

import { useState } from 'react'
import clsx from 'clsx'
import type { Trade } from '@/lib/types'

function fmt(n: number) {
  return `£${Math.abs(n).toLocaleString('en-GB', { minimumFractionDigits: 0 })}`
}

function fmtTime(iso: string) {
  return iso.replace('T', ' ').slice(0, 16).replace('Z', '')
}

export function TradeLog({ trades }: { trades: Trade[] }) {
  const [filter, setFilter] = useState<'all' | 'win' | 'loss'>('all')
  const [sortKey, setSortKey] = useState<'exitTime' | 'pnl'>('exitTime')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = trades
    .filter((t) =>
      filter === 'all' ? true : filter === 'win' ? t.pnl > 0 : t.pnl <= 0
    )
    .sort((a, b) => {
      const av = sortKey === 'pnl' ? a.pnl : a.exitTime
      const bv = sortKey === 'pnl' ? b.pnl : b.exitTime
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
    })

  function toggleSort(key: 'exitTime' | 'pnl') {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Trade Log <span className="text-slate-500 font-normal">({filtered.length})</span>
        </h2>
        <div className="flex gap-2">
          {(['all', 'win', 'loss'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                filter === f
                  ? f === 'win' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : f === 'loss' ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-slate-600 text-slate-200 border border-slate-500'
                  : 'bg-transparent text-slate-500 border border-slate-700 hover:border-slate-500'
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-700">
              <th className="pb-2 text-left font-medium pr-4">Strategy</th>
              <th className="pb-2 text-left font-medium pr-4">Symbol</th>
              <th className="pb-2 text-left font-medium pr-4">Dir</th>
              <th className="pb-2 text-left font-medium pr-4">Entry</th>
              <th className="pb-2 text-left font-medium pr-4">Exit</th>
              <th className="pb-2 text-right font-medium pr-4">Entry px</th>
              <th className="pb-2 text-right font-medium pr-4">Exit px</th>
              <th
                className="pb-2 text-right font-medium pr-4 cursor-pointer select-none hover:text-slate-300"
                onClick={() => toggleSort('exitTime')}
              >
                Time {sortKey === 'exitTime' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
              </th>
              <th
                className="pb-2 text-right font-medium cursor-pointer select-none hover:text-slate-300"
                onClick={() => toggleSort('pnl')}
              >
                PnL {sortKey === 'pnl' ? (sortDir === 'desc' ? '↓' : '↑') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="py-2 pr-4 text-xs text-slate-500 whitespace-nowrap">{t.strategy}</td>
                <td className="py-2 pr-4 font-mono text-slate-200">{t.symbol}</td>
                <td className="py-2 pr-4">
                  <span className={clsx(
                    'px-2 py-0.5 rounded text-xs font-semibold',
                    t.direction === 'LONG' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                  )}>
                    {t.direction}
                  </span>
                </td>
                <td className="py-2 pr-4 text-slate-400 text-xs">{fmtTime(t.entryTime).slice(0, 10)}</td>
                <td className="py-2 pr-4 text-slate-400 text-xs">{fmtTime(t.exitTime).slice(0, 10)}</td>
                <td className="py-2 pr-4 text-right font-mono text-slate-300">{t.entryPrice.toFixed(2)}</td>
                <td className="py-2 pr-4 text-right font-mono text-slate-300">{t.exitPrice.toFixed(2)}</td>
                <td className="py-2 pr-4 text-right text-slate-400 text-xs">{fmtTime(t.exitTime).slice(11, 16)}</td>
                <td className={clsx(
                  'py-2 text-right font-semibold font-mono',
                  t.pnl > 0 ? 'text-emerald-400' : 'text-red-400'
                )}>
                  {t.pnl > 0 ? '+' : ''}{fmt(t.pnl)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-500">No trades found</div>
        )}
      </div>
    </div>
  )
}
