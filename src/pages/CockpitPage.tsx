import {
  TrendingUp,
  Wallet,
  Target,
  Shield,
  Bot,
  Gauge,
  Clock,
  CheckCircle2,
  CircleDashed,
  Flame,
  ArrowUpRight,
  Zap,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { CockpitShell } from '../components/cockpit/CockpitShell';
import { StatCard, AnimatedNumber } from '../components/cockpit/StatCard';
import { EquityChart } from '../components/charts/EquityChart';
import { Sparkline } from '../components/charts/Sparkline';
import { BACKTESTS, COCKPIT_STATS, ORDERS, STRATEGY_OUTPUTS } from '../data/mock';

const intraEquity = [
  1_000_000, 1_000_400, 1_002_900, 1_001_200, 1_004_800, 1_009_400, 1_007_200, 1_012_600,
  1_018_800, 1_022_400, 1_026_100, 1_021_300, 1_027_900, 1_033_400, 1_038_700, 1_042_200,
  1_046_800, 1_052_100, 1_058_300, 1_062_700, 1_068_400, 1_074_200, 1_079_800, 1_084_320,
];

export function CockpitPage() {
  return (
    <CockpitShell
      title="Cockpit"
      subtitle="Your real-time pulse on capital, strategies, RMS and execution. Everything in one glance."
      actions={
        <>
          <Link to="/backtest" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
            Open backtest
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-gradient-to-r from-rose-600 to-rose-500 hover:to-rose-400 shadow-[0_8px_30px_-10px_rgba(244,63,94,0.7)] transition-all">
            <Flame className="w-3.5 h-3.5" />
            Kill Switch
          </button>
        </>
      }
    >
      <div className="space-y-8">
        {/* Hero metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          <StatCard
            label="Capital deployed"
            value={<AnimatedNumber value={COCKPIT_STATS.capitalDeployed} prefix="₹" />}
            icon={Wallet}
            accent="blue"
            big
          />
          <StatCard
            label="Live P&L · today"
            value={<AnimatedNumber value={COCKPIT_STATS.livePnL} prefix="+₹" />}
            delta={{ value: `+${COCKPIT_STATS.livePnLPct.toFixed(2)}%`, positive: true }}
            icon={TrendingUp}
            accent="emerald"
            spark={intraEquity}
            big
          />
          <StatCard
            label="Win rate · today"
            value={`${(COCKPIT_STATS.winRateToday * 100).toFixed(1)}%`}
            delta={{ value: '10 W · 4 L', positive: true }}
            icon={Target}
            accent="emerald"
          />
          <StatCard
            label="Open positions"
            value={COCKPIT_STATS.positionsOpen}
            delta={{ value: `${COCKPIT_STATS.pendingApprovals} pending approval`, positive: false }}
            icon={CircleDashed}
            accent="amber"
          />
          <StatCard
            label="Strategies live"
            value={COCKPIT_STATS.strategiesActive}
            delta={{ value: `${COCKPIT_STATS.rmsBlocks} RMS blocks today`, positive: false }}
            icon={Bot}
            accent="violet"
          />
        </div>

        {/* Equity & quick stats row */}
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 liquid-glass rounded-3xl p-6 border border-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Equity Curve · Live</div>
                <div className="flex items-baseline gap-3 mt-1">
                  <div className="text-4xl font-mono font-semibold tabular-nums">₹1,08,43,200</div>
                  <div className="text-emerald-400 text-sm font-mono">+ ₹84,320 (+1.73%)</div>
                </div>
                <div className="text-xs text-white/40 mt-1">since 09:15 IST · auto-refresh every 250ms</div>
              </div>
              <div className="flex gap-1 p-1 rounded-full liquid-glass-strong">
                {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((r, i) => (
                  <button
                    key={r}
                    className={`text-[10px] font-mono px-3 py-1.5 rounded-full transition-colors ${
                      i === 0 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <EquityChart data={intraEquity} color="#10B981" height={260} markPeakAndTrough />
          </motion.div>

          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="liquid-glass rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300/90 font-mono">Execution edge</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-2xl font-mono font-semibold">{COCKPIT_STATS.brokerLatencyMs}<span className="text-white/40 text-sm">ms</span></div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">avg broker latency</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-semibold">{COCKPIT_STATS.uptime}<span className="text-white/40 text-sm">%</span></div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">90-day uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-semibold">2.4<span className="text-white/40 text-sm">k/s</span></div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">tick throughput</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-semibold">3<span className="text-white/40 text-sm"> brokers</span></div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">zerodha · angel · dhan</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="liquid-glass rounded-2xl p-5 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="w-4 h-4 text-blue-300" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">RMS posture · live</span>
              </div>
              {[
                { name: 'Position sizing v2', val: '2% / 3 max', state: true },
                { name: 'Daily loss cap',     val: '-1.5%',      state: true },
                { name: 'Low-conf block',     val: '< 0.50',     state: true },
                { name: 'High-volatility cap',val: 'IV > 80%',   state: true },
                { name: 'News blackout',      val: '±5 min',     state: false },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between py-1.5 text-xs border-b border-white/[0.04] last:border-0">
                  <span className="text-white/70 truncate pr-2">{r.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white/50">{r.val}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${r.state ? 'bg-emerald-400 shadow-[0_0_6px_#10B981]' : 'bg-white/20'}`} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Strategy + Pending approvals */}
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 liquid-glass rounded-3xl p-6 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Today · Strategy outputs</div>
                <h3 className="heading-italic text-3xl mt-1">Signals fired this session</h3>
              </div>
              <Link to="/strategy" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2.5">
              {STRATEGY_OUTPUTS.slice(0, 5).map((s) => (
                <div key={s.id} className="grid grid-cols-12 items-center gap-3 p-3 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.04] transition-colors">
                  <div className="col-span-3">
                    <div className="font-medium text-sm">{s.symbol}</div>
                    <div className="text-[10px] text-white/40 font-mono">{s.strategy}</div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        s.signal === 'LONG' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
                      }`}
                    >
                      {s.signal}
                    </span>
                  </div>
                  <div className="col-span-2 font-mono text-xs">
                    <div className="text-white/80">₹{s.entry.toFixed(2)}</div>
                    <div className="text-[10px] text-white/40">entry</div>
                  </div>
                  <div className="col-span-2">
                    <div className="relative h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
                        style={{ width: `${s.confidence * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-white/40 font-mono mt-1">conf {(s.confidence * 100).toFixed(0)}%</div>
                  </div>
                  <div className="col-span-3 flex justify-end">
                    {s.status === 'auto-executed' && (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono">
                        <CheckCircle2 className="w-3 h-3" /> Auto
                      </span>
                    )}
                    {s.status === 'pending-approval' && (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full font-mono">
                        <Clock className="w-3 h-3" /> Approve
                      </span>
                    )}
                    {s.status === 'filled' && (
                      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full font-mono">
                        <CheckCircle2 className="w-3 h-3" /> Filled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="liquid-glass rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-violet-300" />
                <div className="text-[10px] uppercase tracking-[0.18em] text-violet-300/90 font-mono">90-day backtest</div>
              </div>
              <div className="text-3xl font-mono font-semibold tabular-nums">
                +₹{(BACKTESTS.combined.metrics.pnl / 100000).toFixed(2)}L
              </div>
              <div className="text-xs text-white/40 mt-1">Strategy + RMS · 842 trades · sharpe {BACKTESTS.combined.metrics.sharpe.toFixed(2)}</div>
              <div className="mt-3 h-14">
                <Sparkline data={BACKTESTS.combined.equityCurve} color="#3B82F6" />
              </div>
              <Link to="/backtest" className="mt-3 text-xs text-blue-400 hover:underline flex items-center gap-1">
                Open full backtest <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="liquid-glass rounded-2xl p-5 border border-white/[0.06]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-3">Recent fills</div>
              <div className="space-y-2.5">
                {ORDERS.slice(0, 5).map((o) => (
                  <div key={o.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${o.pnl >= 0 ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      <span className="font-medium text-white/85 w-20">{o.symbol}</span>
                      <span className="text-white/30 font-mono text-[10px]">{o.broker}</span>
                    </div>
                    <span className={`font-mono font-medium ${o.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {o.pnl >= 0 ? '+' : ''}₹{Math.abs(o.pnl).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
}
