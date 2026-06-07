/**
 * Mock data for the O4F glamour showcase.
 * Numbers are aspirational — designed to look believable while we build the real thing.
 */

export type Trade = {
  date: string;
  symbol: string;
  side: 'LONG' | 'SHORT';
  pnl: number;
  status: 'target-hit' | 'sl-hit';
  qty: number;
  entry: number;
  exit: number;
  strategy: string;
};

export type Order = {
  id: string;
  symbol: string;
  broker: 'zerodha' | 'angel' | 'dhan';
  side: 'BUY' | 'SELL';
  qty: number;
  entry: number;
  ltp: number;
  sl: number;
  target: number;
  status: 'filled' | 'target-hit' | 'sl-hit' | 'placed' | 'rejected';
  pnl: number;
  time: string;
  strategy: string;
};

export type StrategyOutput = {
  id: string;
  timestamp: string;
  symbol: string;
  ltp: number;
  signal: 'LONG' | 'SHORT';
  entry: number;
  sl: number;
  target: number;
  pcr: number;
  oiBuildup: string;
  trendlyneTag: string;
  strategy: string;
  confidence: number;
  rms: {
    positionINR: number;
    lots: number;
    verdict: 'AUTO' | 'MANUAL';
    reason: string;
  };
  status: 'auto-executed' | 'pending-approval' | 'filled' | 'rejected';
};

export type BacktestResult = {
  label: string;
  desc: string;
  color: string;
  metrics: {
    trades: number;
    winRate: number;
    pnl: number;
    maxDD: number;
    sharpe: number;
    sortino: number;
    avgWin: number;
    avgLoss: number;
    profitFactor: number;
    rejectedByRMS: number;
    cagr: number;
  };
  equityCurve: number[];
  drawdownCurve: number[];
  monthlyReturns: number[];
  sampleTrades: Trade[];
};

// Generate a believable equity curve seeded for repeatability
function generateEquityCurve(start: number, end: number, volatility: number, length: number, seed = 7): number[] {
  const arr: number[] = [start];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = 1; i < length; i++) {
    const drift = ((end - arr[arr.length - 1]) / (length - i)) * 1.4;
    const noise = (rand() - 0.5) * volatility;
    arr.push(Math.max(start * 0.7, arr[arr.length - 1] + drift + noise));
  }
  arr[arr.length - 1] = end;
  return arr;
}

function deriveDrawdown(curve: number[]): number[] {
  let peak = curve[0];
  return curve.map((v) => {
    if (v > peak) peak = v;
    return ((v - peak) / peak) * 100;
  });
}

const combinedCurve = generateEquityCurve(1000000, 2487300, 28000, 180, 11);
const strategyCurve = generateEquityCurve(1000000, 2128400, 96000, 180, 23);
const rmsCurve = generateEquityCurve(1000000, 1814500, 14000, 180, 41);

export const BACKTESTS: Record<'combined' | 'strategy-only' | 'rms-only', BacktestResult> = {
  combined: {
    label: 'Strategy + RMS',
    desc: 'Strategy signals filtered + sized by risk management rules. This is production behaviour.',
    color: '#3B82F6',
    metrics: {
      trades: 842,
      winRate: 0.642,
      pnl: 1487300,
      maxDD: -82400,
      sharpe: 2.41,
      sortino: 3.18,
      avgWin: 6210,
      avgLoss: -2480,
      profitFactor: 2.93,
      rejectedByRMS: 327,
      cagr: 148.7,
    },
    equityCurve: combinedCurve,
    drawdownCurve: deriveDrawdown(combinedCurve),
    monthlyReturns: [4.2, 6.1, 3.8, 9.4, 7.2, 11.8, 8.6, 4.1, 12.3, 6.7, 8.9, 14.2],
    sampleTrades: [
      { date: '2026-05-22', symbol: 'RELIANCE', side: 'LONG',  pnl:  8420, status: 'target-hit', qty: 250, entry: 2935.00, exit: 2968.68, strategy: 'PCR + OI Reversal v3' },
      { date: '2026-05-22', symbol: 'HDFCBANK', side: 'LONG',  pnl:  5940, status: 'target-hit', qty: 165, entry: 1613.00, exit: 1649.00, strategy: 'Big Player Tracker v2' },
      { date: '2026-05-21', symbol: 'TATAMOTORS', side: 'SHORT', pnl:  6712, status: 'target-hit', qty: 240, entry:  928.00, exit:  900.04, strategy: 'PCR + OI Reversal v3' },
      { date: '2026-05-21', symbol: 'ICICIBANK', side: 'LONG',  pnl:  4120, status: 'target-hit', qty: 100, entry: 1125.00, exit: 1166.20, strategy: 'Big Player Tracker v2' },
      { date: '2026-05-20', symbol: 'BAJFINANCE', side: 'SHORT', pnl:  9810, status: 'target-hit', qty:  20, entry: 7220.00, exit: 7129.50, strategy: 'PCR + OI Reversal v3' },
      { date: '2026-05-20', symbol: 'SBIN',     side: 'LONG',  pnl: -2180, status: 'sl-hit',      qty: 380, entry:  812.50, exit:  806.76, strategy: 'Block Deal Follower v1' },
      { date: '2026-05-19', symbol: 'INFY',     side: 'LONG',  pnl:  3210, status: 'target-hit', qty: 200, entry: 1782.00, exit: 1798.05, strategy: 'PCR + OI Reversal v3' },
      { date: '2026-05-19', symbol: 'ADANIENT', side: 'SHORT', pnl: 12480, status: 'target-hit', qty:  40, entry: 3140.00, exit: 3033.30, strategy: 'Big Player Tracker v2' },
    ],
  },
  'strategy-only': {
    label: 'Strategy only',
    desc: 'Every signal executes at default position size. No RMS gating. Reveals raw alpha — and worst-case drawdowns.',
    color: '#F59E0B',
    metrics: {
      trades: 1206,
      winRate: 0.539,
      pnl: 1128400,
      maxDD: -284200,
      sharpe: 1.21,
      sortino: 1.42,
      avgWin: 8410,
      avgLoss: -5680,
      profitFactor: 1.47,
      rejectedByRMS: 0,
      cagr: 112.8,
    },
    equityCurve: strategyCurve,
    drawdownCurve: deriveDrawdown(strategyCurve),
    monthlyReturns: [7.2, -4.1, 12.8, -8.4, 18.2, -6.7, 14.6, 9.1, -11.3, 16.7, 8.9, 24.2],
    sampleTrades: [
      { date: '2026-05-22', symbol: 'RELIANCE', side: 'LONG',  pnl:  12800, status: 'target-hit', qty: 500, entry: 2935.00, exit: 2960.60, strategy: 'PCR + OI Reversal v3' },
      { date: '2026-05-22', symbol: 'TCS',      side: 'SHORT', pnl:  -8200, status: 'sl-hit',      qty: 100, entry: 3812.00, exit: 3894.00, strategy: 'PCR + OI Reversal v3' },
    ],
  },
  'rms-only': {
    label: 'RMS only',
    desc: 'Hold historical strategy outputs fixed. Sweep RMS rule values. See exactly what each rule filters.',
    color: '#10B981',
    metrics: {
      trades: 842,
      winRate: 0.642,
      pnl:  814500,
      maxDD: -54200,
      sharpe: 2.07,
      sortino: 2.81,
      avgWin: 4210,
      avgLoss: -2180,
      profitFactor: 2.51,
      rejectedByRMS: 327,
      cagr: 81.4,
    },
    equityCurve: rmsCurve,
    drawdownCurve: deriveDrawdown(rmsCurve),
    monthlyReturns: [3.1, 4.8, 2.6, 6.2, 5.4, 7.1, 5.8, 3.9, 8.2, 4.7, 6.1, 9.8],
    sampleTrades: [],
  },
};

export const RULE_CONTRIBUTIONS = [
  { rule: 'Position sizing v2',       tradesAffected: 842, pnlDelta: -382400, ddDelta:  +148200, note: 'Caps per-trade exposure to 2%' },
  { rule: 'Daily loss cap',           tradesAffected:  18, pnlDelta: -141600, ddDelta:  +245600, note: 'Halts trading on bad days' },
  { rule: 'Auto-approve threshold',   tradesAffected: 327, pnlDelta:  +26200, ddDelta:   -12400, note: 'Routes risky outputs to manual review' },
  { rule: 'Position size manual cap', tradesAffected:  48, pnlDelta: -118300, ddDelta:  +112100, note: 'Forces approval on trades > ₹2L' },
  { rule: 'Low-confidence block',     tradesAffected: 124, pnlDelta:  -49800, ddDelta:   +36700, note: 'Rejects outputs below 0.50 conf' },
  { rule: 'High-volatility cap',      tradesAffected:  82, pnlDelta:  +23200, ddDelta:    -8100, note: 'Halves size on high-IV trades' },
  { rule: 'Square-off by 3:15 PM',    tradesAffected: 842, pnlDelta: -144200, ddDelta:  +224800, note: 'Prevents overnight gap risk' },
];

export const STRATEGY_OUTPUTS: StrategyOutput[] = [
  {
    id: 'so_1', timestamp: '2026-05-26T09:22:13+05:30', symbol: 'RELIANCE', ltp: 2934.10,
    signal: 'LONG', entry: 2935.00, sl: 2926.20, target: 2970.20,
    pcr: 0.78, oiBuildup: 'Long Buildup', trendlyneTag: 'FII Net Buyer · Block Deal',
    strategy: 'PCR + OI Reversal v3', confidence: 0.74,
    rms: { positionINR: 145000, lots: 5, verdict: 'AUTO', reason: 'Risk score 0.18 — below auto threshold (0.35).' },
    status: 'auto-executed',
  },
  {
    id: 'so_2', timestamp: '2026-05-26T09:23:01+05:30', symbol: 'HDFCBANK', ltp: 1612.40,
    signal: 'LONG', entry: 1613.00, sl: 1608.16, target: 1632.36,
    pcr: 0.82, oiBuildup: 'Long Buildup', trendlyneTag: 'Big Player Accumulation',
    strategy: 'Big Player Tracker v2', confidence: 0.81,
    rms: { positionINR: 168000, lots: 3, verdict: 'AUTO', reason: 'Risk score 0.22 — below auto threshold (0.35).' },
    status: 'auto-executed',
  },
  {
    id: 'so_3', timestamp: '2026-05-26T09:31:44+05:30', symbol: 'TATAMOTORS', ltp: 928.55,
    signal: 'SHORT', entry: 928.00, sl: 930.78, target: 916.86,
    pcr: 1.42, oiBuildup: 'Short Buildup', trendlyneTag: 'Block Deal - Sell Side',
    strategy: 'PCR + OI Reversal v3', confidence: 0.62,
    rms: { positionINR: 220000, lots: 4, verdict: 'MANUAL', reason: 'Position size > ₹2L threshold — requires admin approval.' },
    status: 'pending-approval',
  },
  {
    id: 'so_4', timestamp: '2026-05-26T09:34:12+05:30', symbol: 'ICICIBANK', ltp: 1124.65,
    signal: 'LONG', entry: 1125.00, sl: 1121.62, target: 1138.50,
    pcr: 0.69, oiBuildup: 'Long Buildup', trendlyneTag: 'FII Net Buyer',
    strategy: 'Big Player Tracker v2', confidence: 0.68,
    rms: { positionINR: 112000, lots: 2, verdict: 'AUTO', reason: 'Risk score 0.24 — below auto threshold (0.35).' },
    status: 'auto-executed',
  },
  {
    id: 'so_5', timestamp: '2026-05-26T09:41:38+05:30', symbol: 'BAJFINANCE', ltp: 7218.20,
    signal: 'SHORT', entry: 7220.00, sl: 7241.66, target: 7133.36,
    pcr: 1.31, oiBuildup: 'Short Buildup', trendlyneTag: 'FII Net Seller · High IV',
    strategy: 'PCR + OI Reversal v3', confidence: 0.55,
    rms: { positionINR: 305000, lots: 1, verdict: 'MANUAL', reason: 'Confidence 0.55 below 0.60 + high IV flag.' },
    status: 'pending-approval',
  },
  {
    id: 'so_6', timestamp: '2026-05-26T10:02:18+05:30', symbol: 'INFY', ltp: 1782.10,
    signal: 'LONG', entry: 1782.00, sl: 1776.65, target: 1803.38,
    pcr: 0.71, oiBuildup: 'Long Buildup', trendlyneTag: 'Sector Rotation Signal',
    strategy: 'PCR + OI Reversal v3', confidence: 0.77,
    rms: { positionINR: 178000, lots: 1, verdict: 'AUTO', reason: 'Risk score 0.21 — below auto threshold (0.35).' },
    status: 'filled',
  },
];

export const ORDERS: Order[] = [
  { id: 'ord_1041', symbol: 'RELIANCE',   broker: 'zerodha', side: 'BUY',  qty: 250, entry: 2935.00, ltp: 2949.55, sl: 2926.20, target: 2970.20, status: 'filled',     pnl:  3637.50, time: '09:22:46', strategy: 'PCR + OI Reversal v3' },
  { id: 'ord_1042', symbol: 'HDFCBANK',   broker: 'angel',   side: 'BUY',  qty: 165, entry: 1613.00, ltp: 1618.20, sl: 1608.16, target: 1632.36, status: 'filled',     pnl:   858.00, time: '09:23:18', strategy: 'Big Player Tracker v2' },
  { id: 'ord_1043', symbol: 'INFY',       broker: 'dhan',    side: 'BUY',  qty: 200, entry: 1782.00, ltp: 1798.05, sl: 1776.65, target: 1803.38, status: 'target-hit', pnl:  3210.00, time: '10:02:18', strategy: 'PCR + OI Reversal v3' },
  { id: 'ord_1044', symbol: 'SBIN',       broker: 'zerodha', side: 'SELL', qty: 750, entry:  812.50, ltp:  802.75, sl:  814.94, target:  802.75, status: 'target-hit', pnl:  7312.50, time: '09:11:22', strategy: 'Block Deal Follower v1' },
  { id: 'ord_1045', symbol: 'AXISBANK',   broker: 'angel',   side: 'BUY',  qty: 300, entry: 1184.00, ltp: 1180.45, sl: 1180.45, target: 1198.21, status: 'sl-hit',     pnl: -1065.00, time: '09:05:55', strategy: 'PCR + OI Reversal v3' },
  { id: 'ord_1046', symbol: 'BAJFINANCE', broker: 'angel',   side: 'SELL', qty:  20, entry: 7220.00, ltp: 7158.50, sl: 7241.66, target: 7133.36, status: 'filled',     pnl:  1230.00, time: '10:21:08', strategy: 'PCR + OI Reversal v3' },
  { id: 'ord_1047', symbol: 'TCS',        broker: 'dhan',    side: 'BUY',  qty: 100, entry: 3812.00, ltp: 3826.40, sl: 3800.50, target: 3848.20, status: 'placed',     pnl:  1440.00, time: '10:42:11', strategy: 'Big Player Tracker v2' },
  { id: 'ord_1048', symbol: 'TATAMOTORS', broker: 'zerodha', side: 'SELL', qty: 240, entry:  928.00, ltp:  922.30, sl:  930.78, target:  916.86, status: 'filled',     pnl:  1368.00, time: '09:31:55', strategy: 'PCR + OI Reversal v3' },
  { id: 'ord_1049', symbol: 'ADANIENT',   broker: 'zerodha', side: 'SELL', qty:  40, entry: 3140.00, ltp: 3098.50, sl: 3155.00, target: 3033.30, status: 'placed',     pnl:  1660.00, time: '10:58:20', strategy: 'Big Player Tracker v2' },
];

export const RMS_RULES = [
  { id: 'r1', name: 'Position sizing v2',         desc: 'Max 2% of capital per trade; max 3 concurrent positions.', value: '2% / 3 max',           on: true,  hits: 142 },
  { id: 'r2', name: 'Daily loss cap',             desc: 'Halt all new orders once intraday drawdown hits this %.',   value: '-1.5%',                on: true,  hits: 18  },
  { id: 'r3', name: 'SL / Target defaults',       desc: 'Default stop-loss & target if strategy doesn\'t override.', value: 'SL -0.3% / TGT +1.2%', on: true,  hits: 842 },
  { id: 'r4', name: 'Auto-approve threshold',     desc: 'Below this risk score, output is auto-executed.',           value: '≤ 0.35',               on: true,  hits: 327 },
  { id: 'r5', name: 'Position size manual cap',   desc: 'Any trade above this INR amount requires manual approval.', value: '₹2,00,000',           on: true,  hits: 48  },
  { id: 'r6', name: 'Low-confidence block',       desc: 'Reject strategy outputs below this confidence.',            value: '< 0.50 rejected',      on: true,  hits: 124 },
  { id: 'r7', name: 'High-volatility cap',        desc: 'Halve position size when IV percentile > threshold.',       value: 'IV > 80th %ile',       on: true,  hits: 82  },
  { id: 'r8', name: 'News blackout window',       desc: 'Pause new orders 5 mins before/after high-impact events.',  value: '±5 min',               on: false, hits: 0   },
  { id: 'r9', name: 'Square-off all by 3:15 PM',  desc: 'Force exit all open intraday positions before close.',      value: '15:15 IST',            on: true,  hits: 842 },
];

export const TICKER_SYMBOLS = [
  { symbol: 'NIFTY 50',     ltp: 24987.20, change: +124.30,  pct: +0.50 },
  { symbol: 'BANKNIFTY',    ltp: 54218.40, change: +388.10,  pct: +0.72 },
  { symbol: 'SENSEX',       ltp: 82014.85, change: -94.65,   pct: -0.12 },
  { symbol: 'RELIANCE',     ltp:  2949.55, change: +14.55,   pct: +0.49 },
  { symbol: 'HDFCBANK',     ltp:  1618.20, change: +5.20,    pct: +0.32 },
  { symbol: 'TCS',          ltp:  3826.40, change: +14.40,   pct: +0.38 },
  { symbol: 'ICICIBANK',    ltp:  1180.45, change: -3.55,    pct: -0.30 },
  { symbol: 'INFY',         ltp:  1798.05, change: +16.05,   pct: +0.90 },
  { symbol: 'BAJFINANCE',   ltp:  7158.50, change: -61.50,   pct: -0.85 },
  { symbol: 'SBIN',         ltp:   802.75, change: -9.75,    pct: -1.20 },
  { symbol: 'INDIAVIX',     ltp:    14.82, change: -0.43,    pct: -2.82 },
  { symbol: 'USDINR',       ltp:    83.42, change: +0.06,    pct: +0.07 },
];

export const COCKPIT_STATS = {
  capitalDeployed: 4_870_000,
  livePnL: 84_320,
  livePnLPct: 1.73,
  positionsOpen: 7,
  pendingApprovals: 2,
  rmsBlocks: 3,
  todayTrades: 14,
  winRateToday: 0.71,
  strategiesActive: 5,
  brokerLatencyMs: 38,
  uptime: 99.987,
};

// Manufactured social proof — trader payout receipts (FTMO-style)
export type Payout = {
  name: string;
  handle?: string;
  city: string;
  strategy: string;
  amount: number;
  period: string;
  date: string;
  avatarSeed: number;
};

export const PAYOUTS: Payout[] = [
  { name: 'Aniket S.',       handle: '@aniket_fno',     city: 'Pune',       strategy: 'Iron Condor · Bank Nifty',   amount: 428000, period: 'May 2026',     date: '24 May', avatarSeed: 1 },
  { name: 'Rohit Mehra',     handle: '@rmehra_options', city: 'Mumbai',     strategy: 'PCR + OI Reversal',          amount: 312500, period: 'May 2026',     date: '22 May', avatarSeed: 2 },
  { name: 'Priya Kalra',     handle: '@priyaktrades',   city: 'Bengaluru',  strategy: 'Block Deal Follower',        amount: 187300, period: 'May 2026',     date: '21 May', avatarSeed: 3 },
  { name: 'Karthik V.',      handle: '@kvquants',       city: 'Chennai',    strategy: 'Big Player Tracker v2',      amount: 562000, period: 'Apr-May 2026', date: '19 May', avatarSeed: 4 },
  { name: 'Sneha P.',        handle: '@sneha_p_fno',    city: 'Hyderabad',  strategy: 'Vol-IV Sweep',               amount: 248900, period: 'May 2026',     date: '18 May', avatarSeed: 5 },
  { name: 'Vikram B.',       handle: '@vikramb_algo',   city: 'Delhi',      strategy: 'Sector Rotation IV',         amount: 671000, period: 'Mar-May 2026', date: '17 May', avatarSeed: 6 },
  { name: 'Anjali R.',       handle: '@anjalir_options',city: 'Ahmedabad',  strategy: 'Momentum Hedge v1',          amount: 152400, period: 'May 2026',     date: '16 May', avatarSeed: 7 },
  { name: 'Devansh K.',      handle: '@devkamal',       city: 'Indore',     strategy: 'PCR + OI Reversal',          amount: 384200, period: 'May 2026',     date: '15 May', avatarSeed: 8 },
  { name: 'Manish T.',       handle: '@manisht_quant',  city: 'Jaipur',     strategy: 'Strangle · Custom',          amount: 219800, period: 'May 2026',     date: '14 May', avatarSeed: 9 },
];

// Pipeline nodes for the architecture diagram
export const PIPELINE_NODES = [
  { id: 'feed',     label: 'Tick feed',          sub: 'NSE · BSE · MCX · L2 depth' },
  { id: 'normaliser', label: 'Normaliser',       sub: 'Dedup · symbol map · 2.4k/s' },
  { id: 'strategy', label: 'Strategy engine',    sub: '5 live · 14 in research' },
  { id: 'risk',     label: 'Risk engine',        sub: '9 rules · 12,418 evals/day' },
  { id: 'router',   label: 'Smart order router', sub: 'Multi-broker · 38 ms p50' },
  { id: 'broker',   label: 'Broker',             sub: 'Zerodha · Angel · Dhan' },
];

// Hand-written voice testimonials with avatar info (FTMO-style)
export type Testimonial = {
  name: string;
  role: string;
  city: string;
  quote: string;
  metric: { label: string; value: string };
  avatarSeed: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Saurabh Iyer',
    role: 'Independent trader, ex-DE Shaw',
    city: 'Mumbai',
    quote: "I used to babysit four broker tabs at 9:14am. Now I sleep through the open and O4F's RMS handles the noise. The first month I made more than my entire 2025.",
    metric: { label: '6mo return', value: '+218%' },
    avatarSeed: 11,
  },
  {
    name: 'Ritika Sharma',
    role: 'Options trader · 9 years',
    city: 'Gurugram',
    quote: "What sold me was the backtest. I ran the same Iron Condor I've been trading by hand for years and it told me — to the rupee — what my risk caps were costing me. That's not marketing software. That's a partner.",
    metric: { label: 'Sharpe lift', value: '1.42 → 2.41' },
    avatarSeed: 12,
  },
  {
    name: 'Arjun Khanna',
    role: 'Founder, small-prop desk',
    city: 'Bengaluru',
    quote: "We tried building this ourselves for 18 months. Cancelled the project the day after we plugged into O4F. The smart router alone saved us 14 bps on every trade.",
    metric: { label: 'Slippage saved', value: '14 bps' },
    avatarSeed: 13,
  },
];

export const TRUST_BAR = {
  brokers: ['Zerodha', 'Angel One', 'Dhan', 'Upstox'],
  exchanges: ['NSE', 'BSE', 'MCX'],
  sebi: 'SEBI Reg. No. INH000018342',
  trustpilot: { rating: 4.7, reviews: 412 },
};

export const FOUNDERS_TICKER = [
  'Built by teams who shipped at',
  'Goldman Sachs',
  'D. E. Shaw',
  'Citadel',
  'Tower Research',
  'Zerodha',
  'Razorpay',
  'IIT Bombay',
  'IIT Madras',
];

export const PERFORMANCE_HEATMAP: Array<{ strategy: string; months: number[] }> = [
  { strategy: 'PCR + OI Reversal v3',  months: [ +4.2, +6.8, +2.1, +8.4, +5.7, +11.2, +7.4,  +3.8, +12.8, +5.9, +8.2, +13.4] },
  { strategy: 'Big Player Tracker v2', months: [ +3.1, +4.2, -1.4, +6.9, +9.1, +5.3,  +8.1, +12.7, +4.4,  +7.2, +10.4, +6.7] },
  { strategy: 'Block Deal Follower v1',months: [ +1.8, +2.4, +3.7, +5.1, -0.8, +6.4,  +4.3,  +5.9, +7.6,  +3.4, +5.2, +4.8] },
  { strategy: 'Sector Rotation IV',    months: [ -1.2, +3.1, +5.4, +2.8, +4.3, +3.7,  +6.2,  +4.4, +3.9,  +5.1, +6.8, +4.2] },
  { strategy: 'Momentum Hedge v1',     months: [ +0.4, +1.8, +2.4, -0.8, +3.1, +4.4,  +2.7,  +1.9, +3.6,  +2.1, +3.9, +2.8] },
];
