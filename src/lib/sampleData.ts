import type { Trade } from './types'

const INITIAL_CAPITAL = 80000

function makeId(n: number) { return `trade-${String(n).padStart(4, '0')}` }
function dt(date: string, hour: number, minute = 0): string {
  return `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`
}

export const RAW_TRADES: Trade[] = [
  { id: makeId(1),  symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-03',8,5),  exitTime: dt('2026-03-03',10,20), entryPrice:109.42, exitPrice:110.15, lots:1.0, pnl:520,   pnlPct:0.65, commission:7 },
  { id: makeId(2),  symbol:'GBPJPY', direction:'SHORT', entryTime: dt('2026-03-04',8,2),  exitTime: dt('2026-03-04',9,45),  entryPrice:195.30, exitPrice:194.60, lots:0.5, pnl:245,   pnlPct:0.31, commission:5 },
  { id: makeId(3),  symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-05',8,10), exitTime: dt('2026-03-05',11,0),  entryPrice:110.20, exitPrice:109.55, lots:1.0, pnl:430,   pnlPct:0.54, commission:7 },
  { id: makeId(4),  symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-06',8,5),  exitTime: dt('2026-03-06',9,30),  entryPrice:109.80, exitPrice:109.40, lots:1.0, pnl:-310,  pnlPct:-0.39, commission:7 },
  { id: makeId(5),  symbol:'USDJPY', direction:'LONG',  entryTime: dt('2026-03-09',8,0),  exitTime: dt('2026-03-09',10,15), entryPrice:148.20, exitPrice:149.05, lots:0.8, pnl:380,   pnlPct:0.48, commission:6 },
  { id: makeId(6),  symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-10',8,5),  exitTime: dt('2026-03-10',10,40), entryPrice:110.45, exitPrice:109.70, lots:1.0, pnl:540,   pnlPct:0.68, commission:7 },
  { id: makeId(7),  symbol:'GBPJPY', direction:'LONG',  entryTime: dt('2026-03-11',8,3),  exitTime: dt('2026-03-11',9,55),  entryPrice:193.80, exitPrice:194.50, lots:0.5, pnl:260,   pnlPct:0.33, commission:5 },
  { id: makeId(8),  symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-12',8,8),  exitTime: dt('2026-03-12',11,20), entryPrice:109.10, exitPrice:110.00, lots:1.0, pnl:630,   pnlPct:0.79, commission:7 },
  { id: makeId(9),  symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-13',8,2),  exitTime: dt('2026-03-13',9,10),  entryPrice:110.05, exitPrice:110.45, lots:1.0, pnl:-295,  pnlPct:-0.37, commission:7 },
  { id: makeId(10), symbol:'USDJPY', direction:'SHORT', entryTime: dt('2026-03-16',8,0),  exitTime: dt('2026-03-16',10,30), entryPrice:149.30, exitPrice:148.55, lots:0.8, pnl:410,   pnlPct:0.51, commission:6 },
  { id: makeId(11), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-17',8,5),  exitTime: dt('2026-03-17',10,45), entryPrice:109.60, exitPrice:110.35, lots:1.0, pnl:510,   pnlPct:0.64, commission:7 },
  { id: makeId(12), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-18',8,10), exitTime: dt('2026-03-18',9,50),  entryPrice:110.55, exitPrice:109.90, lots:1.0, pnl:450,   pnlPct:0.56, commission:7 },
  { id: makeId(13), symbol:'GBPJPY', direction:'LONG',  entryTime: dt('2026-03-19',8,2),  exitTime: dt('2026-03-19',10,0),  entryPrice:194.10, exitPrice:193.70, lots:0.5, pnl:-150,  pnlPct:-0.19, commission:5 },
  { id: makeId(14), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-20',8,5),  exitTime: dt('2026-03-20',11,15), entryPrice:109.25, exitPrice:110.10, lots:1.0, pnl:590,   pnlPct:0.74, commission:7 },
  { id: makeId(15), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-23',8,0),  exitTime: dt('2026-03-23',9,40),  entryPrice:110.30, exitPrice:109.65, lots:1.0, pnl:460,   pnlPct:0.58, commission:7 },
  { id: makeId(16), symbol:'USDJPY', direction:'LONG',  entryTime: dt('2026-03-24',8,5),  exitTime: dt('2026-03-24',10,20), entryPrice:148.50, exitPrice:149.30, lots:0.8, pnl:440,   pnlPct:0.55, commission:6 },
  { id: makeId(17), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-25',8,8),  exitTime: dt('2026-03-25',10,55), entryPrice:109.45, exitPrice:110.20, lots:1.0, pnl:520,   pnlPct:0.65, commission:7 },
  { id: makeId(18), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-26',8,3),  exitTime: dt('2026-03-26',9,30),  entryPrice:110.40, exitPrice:110.80, lots:1.0, pnl:-285,  pnlPct:-0.36, commission:7 },
  { id: makeId(19), symbol:'GBPJPY', direction:'SHORT', entryTime: dt('2026-03-27',8,0),  exitTime: dt('2026-03-27',10,10), entryPrice:195.80, exitPrice:194.95, lots:0.5, pnl:310,   pnlPct:0.39, commission:5 },
  { id: makeId(20), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-03-30',8,5),  exitTime: dt('2026-03-30',11,0),  entryPrice:109.30, exitPrice:110.05, lots:1.0, pnl:530,   pnlPct:0.66, commission:7 },
  { id: makeId(21), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-03-31',8,2),  exitTime: dt('2026-03-31',10,35), entryPrice:110.20, exitPrice:109.50, lots:1.0, pnl:490,   pnlPct:0.61, commission:7 },
  { id: makeId(22), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-04-01',8,5),  exitTime: dt('2026-04-01',10,25), entryPrice:109.55, exitPrice:110.30, lots:1.0, pnl:525,   pnlPct:0.66, commission:7 },
  { id: makeId(23), symbol:'USDJPY', direction:'SHORT', entryTime: dt('2026-04-02',8,0),  exitTime: dt('2026-04-02',9,50),  entryPrice:149.60, exitPrice:148.80, lots:0.8, pnl:445,   pnlPct:0.56, commission:6 },
  { id: makeId(24), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-04-03',8,10), exitTime: dt('2026-04-03',10,40), entryPrice:110.70, exitPrice:109.95, lots:1.0, pnl:540,   pnlPct:0.68, commission:7 },
  { id: makeId(25), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-04-04',8,5),  exitTime: dt('2026-04-04',9,20),  entryPrice:109.80, exitPrice:109.45, lots:1.0, pnl:-260,  pnlPct:-0.33, commission:7 },
  { id: makeId(26), symbol:'GBPJPY', direction:'LONG',  entryTime: dt('2026-04-07',8,3),  exitTime: dt('2026-04-07',10,15), entryPrice:193.50, exitPrice:194.40, lots:0.5, pnl:330,   pnlPct:0.41, commission:5 },
  { id: makeId(27), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-04-08',8,5),  exitTime: dt('2026-04-08',10,50), entryPrice:110.60, exitPrice:109.85, lots:1.0, pnl:530,   pnlPct:0.66, commission:7 },
  { id: makeId(28), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-04-09',8,2),  exitTime: dt('2026-04-09',11,10), entryPrice:109.40, exitPrice:110.25, lots:1.0, pnl:600,   pnlPct:0.75, commission:7 },
  { id: makeId(29), symbol:'USDJPY', direction:'LONG',  entryTime: dt('2026-04-10',8,0),  exitTime: dt('2026-04-10',10,30), entryPrice:148.30, exitPrice:149.15, lots:0.8, pnl:470,   pnlPct:0.59, commission:6 },
  { id: makeId(30), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-04-11',8,5),  exitTime: dt('2026-04-11',9,45),  entryPrice:110.35, exitPrice:110.75, lots:1.0, pnl:-285,  pnlPct:-0.36, commission:7 },
  { id: makeId(31), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-04-14',8,8),  exitTime: dt('2026-04-14',10,55), entryPrice:109.20, exitPrice:110.05, lots:1.0, pnl:600,   pnlPct:0.75, commission:7 },
  { id: makeId(32), symbol:'GBPJPY', direction:'SHORT', entryTime: dt('2026-04-15',8,3),  exitTime: dt('2026-04-15',10,5),  entryPrice:195.60, exitPrice:194.80, lots:0.5, pnl:295,   pnlPct:0.37, commission:5 },
  { id: makeId(33), symbol:'CADJPY', direction:'SHORT', entryTime: dt('2026-04-16',8,5),  exitTime: dt('2026-04-16',10,40), entryPrice:110.50, exitPrice:109.75, lots:1.0, pnl:540,   pnlPct:0.68, commission:7 },
  { id: makeId(34), symbol:'CADJPY', direction:'LONG',  entryTime: dt('2026-04-17',8,0),  exitTime: dt('2026-04-17',9,35),  entryPrice:109.65, exitPrice:109.30, lots:1.0, pnl:-250,  pnlPct:-0.31, commission:7 },
  { id: makeId(35), symbol:'USDJPY', direction:'SHORT', entryTime: dt('2026-04-22',8,5),  exitTime: dt('2026-04-22',10,20), entryPrice:149.80, exitPrice:148.95, lots:0.8, pnl:480,   pnlPct:0.60, commission:6 },
]

export const INITIAL_CAPITAL_GBP = INITIAL_CAPITAL
