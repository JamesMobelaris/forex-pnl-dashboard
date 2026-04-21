import type { StrategyMeta } from './types'

// Source: Notion "Forex Trading System — Developer Handoff" (2026-04-20)
// Capital base: £100k backtest / £80k live. Returns shown on £100k base.
// 10-month period: Jun 2025 → Apr 2026.  estDailyGBP scaled to £80k live capital.
export const STRATEGIES: StrategyMeta[] = [
  {
    id: 'london-orb-v3',
    name: 'London Session ORB v3',
    shortName: 'London ORB',
    session: 'London',
    timeframe: '15m',
    pairs: ['GBPJPY', 'EURJPY', 'CHFJPY', 'CADJPY', 'USDJPY', 'USDCHF'],
    estDailyGBP: 455,   // £143k over 10mo × 200 days × 0.8 capital scale
    rank: 1,
    isLive: true,
    backtestResults: [
      { pair: 'GBPJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 44100, netPnLPct: 44.10, cagr: 52.9, winRate: 44.1, profitFactor: 1.295, maxDrawdownPct: 12.08, sharpe: 0.52, status: 'live' },
      { pair: 'EURJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 37000, netPnLPct: 37.00, cagr: 44.4, winRate: 46.3, profitFactor: 1.157, maxDrawdownPct: 7.94,  sharpe: 0.47, status: 'live' },
      { pair: 'CHFJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 28000, netPnLPct: 28.00, cagr: 33.6, winRate: 44.0, profitFactor: 1.220, maxDrawdownPct: 9.50,  sharpe: 0.41, status: 'live' },
      { pair: 'CADJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 19400, netPnLPct: 19.40, cagr: 23.3, winRate: 43.0, profitFactor: 1.180, maxDrawdownPct: 8.20,  sharpe: 0.32, status: 'live' },
      { pair: 'USDJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 8800,  netPnLPct: 8.80,  cagr: 10.6, winRate: 41.6, profitFactor: 1.066, maxDrawdownPct: 8.69,  sharpe: 0.16, status: 'live' },
      { pair: 'USDCHF', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 5700,  netPnLPct: 5.70,  cagr: 6.8,  winRate: 40.0, profitFactor: 1.050, maxDrawdownPct: 6.40,  sharpe: 0.10, status: 'live' },
    ],
  },
  {
    id: 'asian-orb',
    name: 'Asian Session ORB v1',
    shortName: 'Asian ORB',
    session: 'Asian',
    timeframe: '15m',
    pairs: ['CHFJPY', 'USDJPY', 'CADJPY', 'NZDJPY'],
    estDailyGBP: 165,  // £44k over 10mo × 200 days × 0.8 capital scale
    rank: 2,
    isLive: true,
    backtestResults: [
      { pair: 'CHFJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 15600, netPnLPct: 15.60, cagr: 18.7, winRate: 47.0, profitFactor: 1.280, maxDrawdownPct: 6.20, sharpe: 0.35, status: 'live' },
      { pair: 'USDJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 11100, netPnLPct: 11.10, cagr: 13.3, winRate: 49.6, profitFactor: 1.448, maxDrawdownPct: 5.49, sharpe: 0.28, status: 'live' },
      { pair: 'CADJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 9400,  netPnLPct: 9.40,  cagr: 11.3, winRate: 48.0, profitFactor: 1.573, maxDrawdownPct: 4.80, sharpe: 0.26, status: 'live' },
      { pair: 'NZDJPY', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 7900,  netPnLPct: 7.90,  cagr: 9.5,  winRate: 46.0, profitFactor: 1.035, maxDrawdownPct: 5.90, sharpe: 0.14, status: 'live' },
    ],
  },
  {
    id: 'ttm-squeeze',
    name: 'London Session TTM Squeeze v4',
    shortName: 'TTM Squeeze',
    session: 'London',
    timeframe: '1H',
    pairs: ['EURJPY', 'EURUSD'],
    estDailyGBP: 17,   // £4.3k over 10mo × 200 days × 0.8 capital scale
    rank: 3,
    isLive: true,
    backtestResults: [
      { pair: 'EURJPY', timeframe: '1H', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 1733, netPnLPct: 1.73, cagr: 2.1,  winRate: 36.5, profitFactor: 1.111, maxDrawdownPct: 5.72, sharpe: -0.07, status: 'live' },
      { pair: 'EURUSD', timeframe: '1H', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 2605, netPnLPct: 2.61, cagr: 3.1,  winRate: 38.0, profitFactor: 1.792, maxDrawdownPct: 4.20, sharpe: 0.08,  status: 'live' },
    ],
  },
  {
    id: 'fvg-port',
    name: 'FVG Strategy Port v1',
    shortName: 'FVG Port',
    session: 'London',
    timeframe: '15m',
    pairs: ['GBPUSD'],
    estDailyGBP: 44,   // £11.6k over 10mo × 200 days × 0.8 capital scale (pilot)
    rank: 4,
    isLive: true,
    backtestResults: [
      { pair: 'GBPUSD', timeframe: '15m', periodLabel: '10-mo (Jun25→Apr26)', netPnL: 11624, netPnLPct: 11.60, cagr: 13.9, winRate: 45.5, profitFactor: 1.350, maxDrawdownPct: 7.80, sharpe: 0.29, status: 'live' },
    ],
  },
]

export const STRATEGY_MAP = Object.fromEntries(STRATEGIES.map((s) => [s.id, s])) as Record<string, StrategyMeta>

export const TOTAL_EST_DAILY_GBP = STRATEGIES.reduce((s, st) => s + st.estDailyGBP, 0)
export const DAILY_TARGET_GBP = 400
