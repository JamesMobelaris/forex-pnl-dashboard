import type { StrategyMeta } from './types'

// Source: OMN-2 backtest report (2026-04-21), capital base £80k live / £100k backtest
export const STRATEGIES: StrategyMeta[] = [
  {
    id: 'london-orb-v3',
    name: 'London Session ORB v3',
    shortName: 'London ORB',
    session: 'London',
    timeframe: '15m',
    pairs: ['GBPJPY', 'EURJPY', 'USDJPY'],
    estDailyGBP: 227,
    rank: 1,
    isLive: true,
    backtestResults: [
      { pair: 'GBPJPY', timeframe: '15m', periodLabel: 'Jun 25→Apr 26', netPnL: 38351, netPnLPct: 38.35, cagr: 49.53, winRate: 44.10, profitFactor: 1.295, maxDrawdownPct: 12.08, sharpe: 0.519, status: 'live' },
      { pair: 'EURJPY', timeframe: '15m', periodLabel: '~1yr',          netPnL: 22633, netPnLPct: 22.63, cagr: 25.89, winRate: 46.28, profitFactor: 1.157, maxDrawdownPct: 7.94,  sharpe: 0.469, status: 'live' },
      { pair: 'EURJPY', timeframe: '1H',  periodLabel: '3.3yr',         netPnL: 24866, netPnLPct: 24.87, cagr: 6.96,  winRate: 51.51, profitFactor: 1.138, maxDrawdownPct: 15.23, sharpe: 0.269, status: 'tested' },
      { pair: 'USDJPY', timeframe: '15m', periodLabel: '3.3yr',         netPnL: 7141,  netPnLPct: 7.14,  cagr: 8.09,  winRate: 41.57, profitFactor: 1.066, maxDrawdownPct: 8.69,  sharpe: 0.161, status: 'live' },
      { pair: 'USDJPY', timeframe: '5m',  periodLabel: '3.3yr',         netPnL: 1341,  netPnLPct: 1.34,  cagr: 5.01,  winRate: 41.67, profitFactor: 1.062, maxDrawdownPct: 4.33,  sharpe: 0.078, status: 'tested' },
      { pair: 'GBPUSD', timeframe: '15m', periodLabel: '3.3yr',         netPnL: -15014, netPnLPct: -15.01, cagr: -4.8, winRate: 34.88, profitFactor: 0.783, maxDrawdownPct: 15.01, sharpe: -0.35, status: 'losing' },
      { pair: 'EURUSD', timeframe: 'any', periodLabel: '—',             netPnL: 0, netPnLPct: 0, cagr: 0, winRate: 0, profitFactor: 0, maxDrawdownPct: 0, sharpe: 0, status: 'no-data' },
    ],
  },
  {
    id: 'asian-orb',
    name: 'Asian Session ORB v1',
    shortName: 'Asian ORB',
    session: 'Asian',
    timeframe: '15m',
    pairs: ['CHFJPY', 'USDJPY', 'NZDJPY', 'CADJPY'],
    estDailyGBP: 13,
    rank: 2,
    isLive: true,
    backtestResults: [
      { pair: 'USDJPY', timeframe: '15m', periodLabel: '3.3yr', netPnL: 5191, netPnLPct: 5.19, cagr: 1.54, winRate: 49.55, profitFactor: 1.056, maxDrawdownPct: 5.49, sharpe: -0.019, status: 'live' },
      { pair: 'EURJPY', timeframe: '15m', periodLabel: '—',     netPnL: 0, netPnLPct: 0, cagr: 0, winRate: 0, profitFactor: 0, maxDrawdownPct: 0, sharpe: 0, status: 'no-data' },
      { pair: 'CHFJPY', timeframe: '15m', periodLabel: 'live',  netPnL: 0, netPnLPct: 0, cagr: 0, winRate: 0, profitFactor: 0, maxDrawdownPct: 0, sharpe: 0, status: 'live' },
      { pair: 'NZDJPY', timeframe: '15m', periodLabel: 'live',  netPnL: 0, netPnLPct: 0, cagr: 0, winRate: 0, profitFactor: 0, maxDrawdownPct: 0, sharpe: 0, status: 'live' },
      { pair: 'CADJPY', timeframe: '15m', periodLabel: 'live',  netPnL: 0, netPnLPct: 0, cagr: 0, winRate: 0, profitFactor: 0, maxDrawdownPct: 0, sharpe: 0, status: 'live' },
    ],
  },
  {
    id: 'ttm-squeeze',
    name: 'London Session TTM Squeeze v4',
    shortName: 'TTM Squeeze',
    session: 'London',
    timeframe: '1H',
    pairs: ['EURJPY', 'EURUSD'],
    estDailyGBP: 6,
    rank: 3,
    isLive: true,
    backtestResults: [
      { pair: 'EURJPY', timeframe: '1H', periodLabel: '3.3yr', netPnL: 3399, netPnLPct: 3.40, cagr: 1.02, winRate: 36.45, profitFactor: 1.111, maxDrawdownPct: 5.72, sharpe: -0.071, status: 'live' },
      { pair: 'EURUSD', timeframe: '1H', periodLabel: 'live',  netPnL: 0, netPnLPct: 0, cagr: 0, winRate: 0, profitFactor: 0, maxDrawdownPct: 0, sharpe: 0, status: 'live' },
    ],
  },
]

export const STRATEGY_MAP = Object.fromEntries(STRATEGIES.map((s) => [s.id, s])) as Record<string, StrategyMeta>

export const TOTAL_EST_DAILY_GBP = STRATEGIES.reduce((s, st) => s + st.estDailyGBP, 0)
export const DAILY_TARGET_GBP = 400
