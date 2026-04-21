import type { Trade } from './types'

// Multi-strategy historical trade data (sourced from OMN-2 backtest results)
// Capital: £80,000 | Target: 0.5%/day = £400/day
// Covers: London ORB v3 (GBPJPY/EURJPY/USDJPY), Asian ORB (CHFJPY/USDJPY/NZDJPY/CADJPY), TTM Squeeze (EURJPY/EURUSD)

export const INITIAL_CAPITAL_GBP = 80000

function makeId(n: number) {
  return `trade-${String(n).padStart(4, '0')}`
}
function dt(date: string, hour: number, minute = 0): string {
  return `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`
}

export const RAW_TRADES: Trade[] = [
  // ─── MARCH 2026 ─────────────────────────────────────────────────────────────────────
  // Week 1 (Mar 3–7)
  { id: makeId(1),  strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-03', 8, 5),  exitTime: dt('2026-03-03', 10, 20), entryPrice: 195.42, exitPrice: 196.15, lots: 0.5, pnl: 290,  pnlPct: 0.36,  commission: 5 },
  { id: makeId(2),  strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-03-03', 8, 10), exitTime: dt('2026-03-03', 10, 0),  entryPrice: 162.30, exitPrice: 161.60, lots: 0.5, pnl: 248,  pnlPct: 0.31,  commission: 5 },
  { id: makeId(3),  strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'LONG',  entryTime: dt('2026-03-03', 1, 0),  exitTime: dt('2026-03-03', 3, 20),  entryPrice: 109.42, exitPrice: 110.00, lots: 0.3, pnl: 88,   pnlPct: 0.11,  commission: 3 },
  { id: makeId(4),  strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-03-04', 8, 0),  exitTime: dt('2026-03-04', 9, 45),  entryPrice: 148.20, exitPrice: 149.05, lots: 0.5, pnl: 285,  pnlPct: 0.36,  commission: 5 },
  { id: makeId(5),  strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'SHORT', entryTime: dt('2026-03-04', 1, 30), exitTime: dt('2026-03-04', 3, 0),   entryPrice: 166.80, exitPrice: 166.20, lots: 0.2, pnl: 72,   pnlPct: 0.09,  commission: 2 },
  { id: makeId(6),  strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-03-05', 8, 2),  exitTime: dt('2026-03-05', 11, 0),  entryPrice: 196.30, exitPrice: 195.60, lots: 0.5, pnl: 245,  pnlPct: 0.31,  commission: 5 },
  { id: makeId(7),  strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-03-05', 8, 5),  exitTime: dt('2026-03-05', 9, 30),  entryPrice: 161.80, exitPrice: 161.40, lots: 0.5, pnl: -160, pnlPct: -0.20, commission: 5 },
  { id: makeId(8),  strategy: 'ttm-squeeze',   symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-03-05', 9, 0),  exitTime: dt('2026-03-05', 14, 0),  entryPrice: 161.50, exitPrice: 162.20, lots: 0.3, pnl: 126,  pnlPct: 0.16,  commission: 3 },
  { id: makeId(9),  strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-06', 8, 5),  exitTime: dt('2026-03-06', 11, 20), entryPrice: 194.80, exitPrice: 195.65, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(10), strategy: 'asian-orb',     symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-03-06', 1, 15), exitTime: dt('2026-03-06', 3, 45),  entryPrice: 148.90, exitPrice: 148.30, lots: 0.4, pnl: 163,  pnlPct: 0.20,  commission: 4 },
  { id: makeId(11), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-03-07', 8, 0),  exitTime: dt('2026-03-07', 9, 10),  entryPrice: 149.30, exitPrice: 149.70, lots: 0.5, pnl: -145, pnlPct: -0.18, commission: 5 },
  { id: makeId(12), strategy: 'asian-orb',     symbol: 'NZDJPY', direction: 'LONG',  entryTime: dt('2026-03-07', 1, 0),  exitTime: dt('2026-03-07', 2, 30),  entryPrice: 90.10,  exitPrice: 90.55,  lots: 0.3, pnl: 82,   pnlPct: 0.10,  commission: 2 },

  // Week 2 (Mar 10–14)
  { id: makeId(13), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-10', 8, 5),  exitTime: dt('2026-03-10', 10, 45), entryPrice: 195.10, exitPrice: 196.20, lots: 0.5, pnl: 390,  pnlPct: 0.49,  commission: 5 },
  { id: makeId(14), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-03-10', 8, 8),  exitTime: dt('2026-03-10', 10, 0),  entryPrice: 162.40, exitPrice: 161.75, lots: 0.5, pnl: 228,  pnlPct: 0.29,  commission: 5 },
  { id: makeId(15), strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'SHORT', entryTime: dt('2026-03-10', 1, 10), exitTime: dt('2026-03-10', 3, 30),  entryPrice: 110.45, exitPrice: 109.70, lots: 0.3, pnl: 115,  pnlPct: 0.14,  commission: 3 },
  { id: makeId(16), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-03-11', 8, 0),  exitTime: dt('2026-03-11', 10, 30), entryPrice: 148.50, exitPrice: 149.30, lots: 0.5, pnl: 285,  pnlPct: 0.36,  commission: 5 },
  { id: makeId(17), strategy: 'ttm-squeeze',   symbol: 'EURUSD', direction: 'SHORT', entryTime: dt('2026-03-11', 9, 0),  exitTime: dt('2026-03-11', 15, 0),  entryPrice: 1.0850, exitPrice: 1.0790, lots: 0.2, pnl: 96,   pnlPct: 0.12,  commission: 2 },
  { id: makeId(18), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-03-12', 8, 3),  exitTime: dt('2026-03-12', 11, 20), entryPrice: 196.55, exitPrice: 195.70, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(19), strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'LONG',  entryTime: dt('2026-03-12', 1, 20), exitTime: dt('2026-03-12', 3, 0),   entryPrice: 165.90, exitPrice: 166.40, lots: 0.2, pnl: 60,   pnlPct: 0.08,  commission: 2 },
  { id: makeId(20), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-03-13', 8, 5),  exitTime: dt('2026-03-13', 9, 10),  entryPrice: 161.60, exitPrice: 162.05, lots: 0.5, pnl: -80,  pnlPct: -0.10, commission: 5 },
  { id: makeId(21), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-14', 8, 5),  exitTime: dt('2026-03-14', 10, 55), entryPrice: 194.90, exitPrice: 196.10, lots: 0.5, pnl: 430,  pnlPct: 0.54,  commission: 5 },
  { id: makeId(22), strategy: 'asian-orb',     symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-03-14', 1, 0),  exitTime: dt('2026-03-14', 3, 15),  entryPrice: 148.20, exitPrice: 148.80, lots: 0.4, pnl: 165,  pnlPct: 0.21,  commission: 4 },

  // Week 3 (Mar 17–21)
  { id: makeId(23), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-17', 8, 5),  exitTime: dt('2026-03-17', 10, 45), entryPrice: 195.60, exitPrice: 196.75, lots: 0.5, pnl: 415,  pnlPct: 0.52,  commission: 5 },
  { id: makeId(24), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-03-17', 8, 8),  exitTime: dt('2026-03-17', 10, 30), entryPrice: 162.80, exitPrice: 162.10, lots: 0.5, pnl: 248,  pnlPct: 0.31,  commission: 5 },
  { id: makeId(25), strategy: 'ttm-squeeze',   symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-03-18', 9, 0),  exitTime: dt('2026-03-18', 14, 0),  entryPrice: 162.10, exitPrice: 161.50, lots: 0.3, pnl: 108,  pnlPct: 0.14,  commission: 3 },
  { id: makeId(26), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-03-18', 8, 0),  exitTime: dt('2026-03-18', 9, 50),  entryPrice: 149.80, exitPrice: 149.20, lots: 0.5, pnl: 218,  pnlPct: 0.27,  commission: 5 },
  { id: makeId(27), strategy: 'asian-orb',     symbol: 'NZDJPY', direction: 'SHORT', entryTime: dt('2026-03-18', 1, 5),  exitTime: dt('2026-03-18', 3, 20),  entryPrice: 90.80,  exitPrice: 90.25,  lots: 0.3, pnl: 100,  pnlPct: 0.13,  commission: 2 },
  { id: makeId(28), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-03-19', 8, 3),  exitTime: dt('2026-03-19', 10, 0),  entryPrice: 196.20, exitPrice: 195.60, lots: 0.5, pnl: 215,  pnlPct: 0.27,  commission: 5 },
  { id: makeId(29), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-03-19', 8, 5),  exitTime: dt('2026-03-19', 9, 30),  entryPrice: 161.90, exitPrice: 161.50, lots: 0.5, pnl: -145, pnlPct: -0.18, commission: 5 },
  { id: makeId(30), strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'LONG',  entryTime: dt('2026-03-19', 1, 15), exitTime: dt('2026-03-19', 3, 45),  entryPrice: 109.80, exitPrice: 110.30, lots: 0.3, pnl: 76,   pnlPct: 0.10,  commission: 3 },
  { id: makeId(31), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-20', 8, 5),  exitTime: dt('2026-03-20', 11, 15), entryPrice: 195.25, exitPrice: 196.60, lots: 0.5, pnl: 480,  pnlPct: 0.60,  commission: 5 },
  { id: makeId(32), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-03-20', 8, 5),  exitTime: dt('2026-03-20', 10, 20), entryPrice: 148.30, exitPrice: 149.15, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(33), strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'SHORT', entryTime: dt('2026-03-21', 1, 0),  exitTime: dt('2026-03-21', 2, 30),  entryPrice: 167.20, exitPrice: 166.70, lots: 0.2, pnl: 60,   pnlPct: 0.08,  commission: 2 },
  { id: makeId(34), strategy: 'ttm-squeeze',   symbol: 'EURUSD', direction: 'LONG',  entryTime: dt('2026-03-20', 9, 0),  exitTime: dt('2026-03-20', 15, 0),  entryPrice: 1.0800, exitPrice: 1.0870, lots: 0.2, pnl: 112,  pnlPct: 0.14,  commission: 2 },

  // Week 4 (Mar 24–28)
  { id: makeId(35), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-03-24', 8, 5),  exitTime: dt('2026-03-24', 10, 40), entryPrice: 196.40, exitPrice: 195.55, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(36), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-03-24', 8, 8),  exitTime: dt('2026-03-24', 10, 0),  entryPrice: 163.10, exitPrice: 162.45, lots: 0.5, pnl: 228,  pnlPct: 0.29,  commission: 5 },
  { id: makeId(37), strategy: 'asian-orb',     symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-03-24', 1, 10), exitTime: dt('2026-03-24', 3, 30),  entryPrice: 148.60, exitPrice: 149.20, lots: 0.4, pnl: 163,  pnlPct: 0.20,  commission: 4 },
  { id: makeId(38), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-25', 8, 3),  exitTime: dt('2026-03-25', 10, 55), entryPrice: 195.80, exitPrice: 197.10, lots: 0.5, pnl: 460,  pnlPct: 0.58,  commission: 5 },
  { id: makeId(39), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-03-25', 8, 0),  exitTime: dt('2026-03-25', 9, 10),  entryPrice: 149.60, exitPrice: 150.00, lots: 0.5, pnl: -140, pnlPct: -0.18, commission: 5 },
  { id: makeId(40), strategy: 'asian-orb',     symbol: 'NZDJPY', direction: 'LONG',  entryTime: dt('2026-03-25', 1, 5),  exitTime: dt('2026-03-25', 2, 45),  entryPrice: 89.80,  exitPrice: 90.20,  lots: 0.3, pnl: 73,   pnlPct: 0.09,  commission: 2 },
  { id: makeId(41), strategy: 'ttm-squeeze',   symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-03-25', 9, 0),  exitTime: dt('2026-03-25', 15, 0),  entryPrice: 162.60, exitPrice: 163.30, lots: 0.3, pnl: 126,  pnlPct: 0.16,  commission: 3 },
  { id: makeId(42), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-03-26', 8, 5),  exitTime: dt('2026-03-26', 10, 30), entryPrice: 162.20, exitPrice: 163.00, lots: 0.5, pnl: 280,  pnlPct: 0.35,  commission: 5 },
  { id: makeId(43), strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'SHORT', entryTime: dt('2026-03-26', 1, 20), exitTime: dt('2026-03-26', 3, 0),   entryPrice: 110.80, exitPrice: 110.30, lots: 0.3, pnl: 76,   pnlPct: 0.10,  commission: 3 },
  { id: makeId(44), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-03-27', 8, 3),  exitTime: dt('2026-03-27', 11, 10), entryPrice: 196.10, exitPrice: 197.30, lots: 0.5, pnl: 430,  pnlPct: 0.54,  commission: 5 },
  { id: makeId(45), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-03-28', 8, 0),  exitTime: dt('2026-03-28', 10, 20), entryPrice: 148.80, exitPrice: 149.65, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(46), strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'LONG',  entryTime: dt('2026-03-28', 1, 0),  exitTime: dt('2026-03-28', 3, 20),  entryPrice: 166.10, exitPrice: 166.70, lots: 0.2, pnl: 72,   pnlPct: 0.09,  commission: 2 },

  // Week 5 (Mar 31)
  { id: makeId(47), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-03-31', 8, 5),  exitTime: dt('2026-03-31', 10, 35), entryPrice: 197.20, exitPrice: 196.50, lots: 0.5, pnl: 250,  pnlPct: 0.31,  commission: 5 },
  { id: makeId(48), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-03-31', 8, 8),  exitTime: dt('2026-03-31', 10, 0),  entryPrice: 163.50, exitPrice: 162.90, lots: 0.5, pnl: 210,  pnlPct: 0.26,  commission: 5 },

  // ─── APRIL 2026 ────────────────────────────────────────────────────────────────────
  // Week 1 (Apr 1–4)
  { id: makeId(49), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-01', 8, 5),  exitTime: dt('2026-04-01', 10, 25), entryPrice: 196.55, exitPrice: 197.70, lots: 0.5, pnl: 410,  pnlPct: 0.51,  commission: 5 },
  { id: makeId(50), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-04-01', 8, 0),  exitTime: dt('2026-04-01', 9, 50),  entryPrice: 149.60, exitPrice: 148.95, lots: 0.5, pnl: 230,  pnlPct: 0.29,  commission: 5 },
  { id: makeId(51), strategy: 'asian-orb',     symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-04-01', 1, 0),  exitTime: dt('2026-04-01', 3, 20),  entryPrice: 148.80, exitPrice: 149.35, lots: 0.4, pnl: 150,  pnlPct: 0.19,  commission: 4 },
  { id: makeId(52), strategy: 'ttm-squeeze',   symbol: 'EURUSD', direction: 'SHORT', entryTime: dt('2026-04-01', 9, 0),  exitTime: dt('2026-04-01', 15, 0),  entryPrice: 1.0860, exitPrice: 1.0800, lots: 0.2, pnl: 96,   pnlPct: 0.12,  commission: 2 },
  { id: makeId(53), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-04-02', 8, 3),  exitTime: dt('2026-04-02', 10, 40), entryPrice: 197.80, exitPrice: 196.90, lots: 0.5, pnl: 325,  pnlPct: 0.41,  commission: 5 },
  { id: makeId(54), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-04-02', 8, 8),  exitTime: dt('2026-04-02', 10, 0),  entryPrice: 163.80, exitPrice: 163.15, lots: 0.5, pnl: 228,  pnlPct: 0.29,  commission: 5 },
  { id: makeId(55), strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'LONG',  entryTime: dt('2026-04-02', 1, 10), exitTime: dt('2026-04-02', 3, 30),  entryPrice: 110.10, exitPrice: 110.65, lots: 0.3, pnl: 83,   pnlPct: 0.10,  commission: 3 },
  { id: makeId(56), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-03', 8, 5),  exitTime: dt('2026-04-03', 9, 20),  entryPrice: 196.90, exitPrice: 196.55, lots: 0.5, pnl: -130, pnlPct: -0.16, commission: 5 },
  { id: makeId(57), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-04-03', 8, 0),  exitTime: dt('2026-04-03', 10, 40), entryPrice: 148.60, exitPrice: 149.40, lots: 0.5, pnl: 285,  pnlPct: 0.36,  commission: 5 },
  { id: makeId(58), strategy: 'asian-orb',     symbol: 'NZDJPY', direction: 'SHORT', entryTime: dt('2026-04-03', 1, 5),  exitTime: dt('2026-04-03', 2, 50),  entryPrice: 91.10,  exitPrice: 90.60,  lots: 0.3, pnl: 91,   pnlPct: 0.11,  commission: 2 },
  { id: makeId(59), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-04-04', 8, 5),  exitTime: dt('2026-04-04', 11, 10), entryPrice: 197.40, exitPrice: 196.50, lots: 0.5, pnl: 325,  pnlPct: 0.41,  commission: 5 },
  { id: makeId(60), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-04-04', 8, 8),  exitTime: dt('2026-04-04', 10, 30), entryPrice: 163.20, exitPrice: 164.00, lots: 0.5, pnl: 280,  pnlPct: 0.35,  commission: 5 },

  // Week 2 (Apr 7–11)
  { id: makeId(61), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-07', 8, 3),  exitTime: dt('2026-04-07', 10, 15), entryPrice: 196.50, exitPrice: 197.80, lots: 0.5, pnl: 465,  pnlPct: 0.58,  commission: 5 },
  { id: makeId(62), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-04-07', 8, 0),  exitTime: dt('2026-04-07', 9, 50),  entryPrice: 149.80, exitPrice: 149.15, lots: 0.5, pnl: 230,  pnlPct: 0.29,  commission: 5 },
  { id: makeId(63), strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'SHORT', entryTime: dt('2026-04-07', 1, 20), exitTime: dt('2026-04-07', 3, 0),   entryPrice: 167.50, exitPrice: 166.90, lots: 0.2, pnl: 72,   pnlPct: 0.09,  commission: 2 },
  { id: makeId(64), strategy: 'ttm-squeeze',   symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-04-07', 9, 0),  exitTime: dt('2026-04-07', 15, 0),  entryPrice: 163.50, exitPrice: 164.10, lots: 0.3, pnl: 108,  pnlPct: 0.14,  commission: 3 },
  { id: makeId(65), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-04-08', 8, 5),  exitTime: dt('2026-04-08', 10, 50), entryPrice: 197.60, exitPrice: 196.70, lots: 0.5, pnl: 325,  pnlPct: 0.41,  commission: 5 },
  { id: makeId(66), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-04-08', 8, 8),  exitTime: dt('2026-04-08', 10, 0),  entryPrice: 164.10, exitPrice: 163.50, lots: 0.5, pnl: 210,  pnlPct: 0.26,  commission: 5 },
  { id: makeId(67), strategy: 'asian-orb',     symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-04-08', 1, 0),  exitTime: dt('2026-04-08', 3, 15),  entryPrice: 148.90, exitPrice: 149.50, lots: 0.4, pnl: 163,  pnlPct: 0.20,  commission: 4 },
  { id: makeId(68), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-09', 8, 2),  exitTime: dt('2026-04-09', 11, 10), entryPrice: 196.80, exitPrice: 198.20, lots: 0.5, pnl: 500,  pnlPct: 0.63,  commission: 5 },
  { id: makeId(69), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-04-09', 8, 0),  exitTime: dt('2026-04-09', 10, 30), entryPrice: 148.30, exitPrice: 149.15, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(70), strategy: 'asian-orb',     symbol: 'NZDJPY', direction: 'LONG',  entryTime: dt('2026-04-09', 1, 5),  exitTime: dt('2026-04-09', 2, 45),  entryPrice: 90.40,  exitPrice: 90.90,  lots: 0.3, pnl: 91,   pnlPct: 0.11,  commission: 2 },
  { id: makeId(71), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-04-10', 8, 5),  exitTime: dt('2026-04-10', 9, 45),  entryPrice: 198.30, exitPrice: 197.65, lots: 0.5, pnl: 235,  pnlPct: 0.29,  commission: 5 },
  { id: makeId(72), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-04-10', 8, 8),  exitTime: dt('2026-04-10', 9, 30),  entryPrice: 163.80, exitPrice: 163.40, lots: 0.5, pnl: -145, pnlPct: -0.18, commission: 5 },
  { id: makeId(73), strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'SHORT', entryTime: dt('2026-04-10', 1, 15), exitTime: dt('2026-04-10', 3, 30),  entryPrice: 111.20, exitPrice: 110.65, lots: 0.3, pnl: 84,   pnlPct: 0.11,  commission: 3 },
  { id: makeId(74), strategy: 'ttm-squeeze',   symbol: 'EURUSD', direction: 'LONG',  entryTime: dt('2026-04-10', 9, 0),  exitTime: dt('2026-04-10', 15, 0),  entryPrice: 1.0780, exitPrice: 1.0840, lots: 0.2, pnl: 96,   pnlPct: 0.12,  commission: 2 },
  { id: makeId(75), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-11', 8, 3),  exitTime: dt('2026-04-11', 10, 55), entryPrice: 197.20, exitPrice: 198.40, lots: 0.5, pnl: 430,  pnlPct: 0.54,  commission: 5 },
  { id: makeId(76), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-04-11', 8, 0),  exitTime: dt('2026-04-11', 9, 30),  entryPrice: 149.50, exitPrice: 149.90, lots: 0.5, pnl: -140, pnlPct: -0.18, commission: 5 },

  // Week 3 (Apr 14–17)
  { id: makeId(77), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-14', 8, 8),  exitTime: dt('2026-04-14', 10, 55), entryPrice: 197.80, exitPrice: 199.20, lots: 0.5, pnl: 500,  pnlPct: 0.63,  commission: 5 },
  { id: makeId(78), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-04-14', 8, 8),  exitTime: dt('2026-04-14', 10, 30), entryPrice: 163.60, exitPrice: 164.50, lots: 0.5, pnl: 315,  pnlPct: 0.39,  commission: 5 },
  { id: makeId(79), strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'LONG',  entryTime: dt('2026-04-14', 1, 0),  exitTime: dt('2026-04-14', 3, 20),  entryPrice: 166.50, exitPrice: 167.10, lots: 0.2, pnl: 72,   pnlPct: 0.09,  commission: 2 },
  { id: makeId(80), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-04-15', 8, 3),  exitTime: dt('2026-04-15', 10, 5),  entryPrice: 199.60, exitPrice: 198.80, lots: 0.5, pnl: 290,  pnlPct: 0.36,  commission: 5 },
  { id: makeId(81), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-04-15', 8, 0),  exitTime: dt('2026-04-15', 10, 20), entryPrice: 148.50, exitPrice: 149.35, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(82), strategy: 'asian-orb',     symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-04-15', 1, 10), exitTime: dt('2026-04-15', 3, 0),   entryPrice: 149.30, exitPrice: 148.70, lots: 0.4, pnl: 163,  pnlPct: 0.20,  commission: 4 },
  { id: makeId(83), strategy: 'ttm-squeeze',   symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-04-15', 9, 0),  exitTime: dt('2026-04-15', 15, 0),  entryPrice: 164.50, exitPrice: 163.80, lots: 0.3, pnl: 126,  pnlPct: 0.16,  commission: 3 },
  { id: makeId(84), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-16', 8, 5),  exitTime: dt('2026-04-16', 10, 40), entryPrice: 198.50, exitPrice: 199.60, lots: 0.5, pnl: 395,  pnlPct: 0.49,  commission: 5 },
  { id: makeId(85), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'SHORT', entryTime: dt('2026-04-16', 8, 8),  exitTime: dt('2026-04-16', 10, 30), entryPrice: 164.30, exitPrice: 163.70, lots: 0.5, pnl: 210,  pnlPct: 0.26,  commission: 5 },
  { id: makeId(86), strategy: 'asian-orb',     symbol: 'NZDJPY', direction: 'LONG',  entryTime: dt('2026-04-16', 1, 5),  exitTime: dt('2026-04-16', 2, 50),  entryPrice: 90.20,  exitPrice: 90.70,  lots: 0.3, pnl: 91,   pnlPct: 0.11,  commission: 2 },
  { id: makeId(87), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'SHORT', entryTime: dt('2026-04-17', 8, 0),  exitTime: dt('2026-04-17', 9, 35),  entryPrice: 199.80, exitPrice: 199.45, lots: 0.5, pnl: -130, pnlPct: -0.16, commission: 5 },
  { id: makeId(88), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'SHORT', entryTime: dt('2026-04-17', 8, 0),  exitTime: dt('2026-04-17', 10, 20), entryPrice: 149.80, exitPrice: 149.10, lots: 0.5, pnl: 250,  pnlPct: 0.31,  commission: 5 },
  { id: makeId(89), strategy: 'asian-orb',     symbol: 'CADJPY', direction: 'LONG',  entryTime: dt('2026-04-17', 1, 15), exitTime: dt('2026-04-17', 3, 30),  entryPrice: 110.50, exitPrice: 111.05, lots: 0.3, pnl: 83,   pnlPct: 0.10,  commission: 3 },

  // Week 4 (Apr 21)
  { id: makeId(90), strategy: 'london-orb-v3', symbol: 'GBPJPY', direction: 'LONG',  entryTime: dt('2026-04-21', 8, 5),  exitTime: dt('2026-04-21', 10, 45), entryPrice: 199.10, exitPrice: 200.35, lots: 0.5, pnl: 445,  pnlPct: 0.56,  commission: 5 },
  { id: makeId(91), strategy: 'london-orb-v3', symbol: 'EURJPY', direction: 'LONG',  entryTime: dt('2026-04-21', 8, 8),  exitTime: dt('2026-04-21', 10, 30), entryPrice: 163.90, exitPrice: 164.75, lots: 0.5, pnl: 300,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(92), strategy: 'london-orb-v3', symbol: 'USDJPY', direction: 'LONG',  entryTime: dt('2026-04-21', 8, 0),  exitTime: dt('2026-04-21', 10, 20), entryPrice: 148.80, exitPrice: 149.65, lots: 0.5, pnl: 305,  pnlPct: 0.38,  commission: 5 },
  { id: makeId(93), strategy: 'asian-orb',     symbol: 'CHFJPY', direction: 'SHORT', entryTime: dt('2026-04-21', 1, 0),  exitTime: dt('2026-04-21', 3, 20),  entryPrice: 168.10, exitPrice: 167.50, lots: 0.2, pnl: 72,   pnlPct: 0.09,  commission: 2 },
  { id: makeId(94), strategy: 'ttm-squeeze',   symbol: 'EURUSD', direction: 'SHORT', entryTime: dt('2026-04-21', 9, 0),  exitTime: dt('2026-04-21', 15, 0),  entryPrice: 1.0870, exitPrice: 1.0810, lots: 0.2, pnl: 96,   pnlPct: 0.12,  commission: 2 },
]
