export type StrategyId = 'london-orb-v3' | 'asian-orb' | 'ttm-squeeze' | 'fvg-port'

export interface Trade {
  id: string
  strategy: StrategyId
  symbol: string
  direction: 'LONG' | 'SHORT'
  entryTime: string
  exitTime: string
  entryPrice: number
  exitPrice: number
  lots: number
  pnl: number        // in GBP
  pnlPct: number     // as percentage of capital
  commission: number
}

export interface DailyPnL {
  date: string       // YYYY-MM-DD
  pnl: number
  pnlPct: number
  trades: number
  equity: number
}

export interface WeeklyPnL {
  week: string       // e.g. "2026-W15"
  label: string      // e.g. "Apr 7–11"
  pnl: number
  pnlPct: number
  trades: number
}

export interface MonthlyPnL {
  month: string      // YYYY-MM
  label: string      // e.g. "Apr 2026"
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

export interface BacktestResult {
  pair: string
  timeframe: string
  periodLabel: string
  netPnL: number
  netPnLPct: number
  cagr: number
  winRate: number
  profitFactor: number
  maxDrawdownPct: number
  sharpe: number
  status: 'live' | 'tested' | 'losing' | 'no-data'
}

export interface StrategyMeta {
  id: StrategyId
  name: string
  shortName: string
  session: 'London' | 'Asian'
  timeframe: string
  pairs: string[]
  backtestResults: BacktestResult[]
  estDailyGBP: number
  rank: number
  isLive: boolean
}
