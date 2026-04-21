'use client'

import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface DataPoint {
  date: string
  equity: number
  drawdown: number
}

function fmt(n: number) {
  return `£${n.toLocaleString('en-GB')}`
}

export function EquityCurve({ data }: { data: DataPoint[] }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Equity Curve</h2>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis yAxisId="equity" orientation="left" tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} domain={['auto', 'auto']} />
          <YAxis yAxisId="dd" orientation="right" tick={{ fill: '#f87171', fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `-${v.toFixed(1)}%`} domain={[0, 'auto']} reversed />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} labelStyle={{ color: '#94a3b8', fontSize: 12 }} formatter={(value: number, name: string) => name === 'equity' ? [fmt(value), 'Equity'] : [`-${value.toFixed(2)}%`, 'Drawdown']} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} formatter={(v) => (v === 'equity' ? 'Equity' : 'Drawdown')} />
          <Area yAxisId="equity" type="monotone" dataKey="equity" stroke="#10b981" strokeWidth={2} fill="url(#equityGradient)" dot={false} />
          <Line yAxisId="dd" type="monotone" dataKey="drawdown" stroke="#f87171" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
