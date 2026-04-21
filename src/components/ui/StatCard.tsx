'use client'

import clsx from 'clsx'

interface Props {
  label: string
  value: string
  sub?: string
  positive?: boolean | null
  icon?: string
}

export function StatCard({ label, value, sub, positive, icon }: Props) {
  const colour = positive === null || positive === undefined ? 'text-slate-100' : positive ? 'text-emerald-400' : 'text-red-400'

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <span className={clsx('text-2xl font-bold', colour)}>{value}</span>
      {sub && <span className="text-xs text-slate-500">{sub}</span>}
    </div>
  )
}
