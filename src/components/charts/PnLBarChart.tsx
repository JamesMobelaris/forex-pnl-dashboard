'use client'

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine } from 'recharts'

interface BarData {
  label: string
  pnl: number
  pnlPct: number
  trades: number
}

interface Props {
  data: BarData[]
  title: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { payload: BarData }[]; label?: string }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs shadow-lg">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className={d.pnl >= 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
        £{d.pnl.toLocaleString('en-GB')} ({d.pnlPct > 0 ? '+' : ''}{d.pnlPct}%)
      </p>
      <p className="text-slate-500">{d.trades} trade{d.trades !== 1 ? 's' : ''}</p>
    </div>
  )
}

export function PnLBarChart({ data, title }: Props) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `£${v.toLocaleString('en-GB')}`} />
          <ReferenceLine y={0} stroke="#475569" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (<Cell key={i} fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} />))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
