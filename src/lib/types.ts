export interface Trade {
  id: string
  symbol: string
  direction: 'LONG' | 'SHORT'
  entryTime: string
  exitTime: string
  entryPrice: number
  exitPrice: number
  lots: number
  pnl: number
  pnlPct: number
  commission: number
}

export interface DailyPnL {
  date: string
  pnl: number
  pnlPct: number
  trades: number
  equity: number
}

export interface WeeklyPnL {
  week: string
  label: string
  pnl: number
  pnlPct: number
  trades: number
}

export interface MonthlyPnL {
  month: string
  label: string
  pnl: number
  pnlPct: number
  trades: number
}

export interface PortfolioStats {
  initialCapital: number
  currentEquity: number
  totalPnL: number
  totalPnLPct: number
  winRate: number
  profitFactor: number
  maxDrawdown: number
  maxDrawdownPct: number
  totalTrades: number
  winningTrades: number
  losingTrades: number
  avgWin: number
  avgLoss: number
  bestDay: number
  worstDay: number
}
