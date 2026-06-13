import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Bookmark,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Wallet,
  Layers,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import { CockpitShell } from '../components/cockpit/CockpitShell';
import { EquityChart } from '../components/charts/EquityChart';
import { DrawdownChart } from '../components/charts/DrawdownChart';
import { HeatMap } from '../components/charts/HeatMap';
import { BACKTESTS, RULE_CONTRIBUTIONS, PERFORMANCE_HEATMAP } from '../data/mock';

type Mode = 'combined' | 'strategy-only' | 'rms-only' | 'compare';

const MODES: Array<{ id: Mode; label: string; sub: string; icon: string }> = [
  { id: 'combined',      label: 'Strategy + RMS',  sub: 'Production behaviour',     icon: '⚙' },
  { id: 'strategy-only', label: 'Strategy only',   sub: 'Raw alpha, no gating',     icon: '◈' },
  { id: 'rms-only',      label: 'RMS only',        sub: 'Rule contribution sweep',  icon: '◉' },
  { id: 'compare',       label: 'Compare',         sub: 'All three side-by-side',   icon: '⇆' },
];

const formatInr = (n: number) => {
  const sign = n < 0 ? '-' : '+';
  const abs = Math.abs(n);
  if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)}Cr`;
  if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)}L`;
  if (abs >= 1e3) return `${sign}₹${(abs / 1e3).toFixed(1)}K`;
  return `${sign}₹${abs}`;
};

export function BacktestPage() {
  const [mode, setMode] = useState<Mode>('combined');
  const [running, setRunning] = useState(false);

  const runBacktest = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2400);
  };

  const active = mode === 'compare' ? BACKTESTS.combined : BACKTESTS[mode];

  return (
    <CockpitShell
      title="Backtesting"
      subtitle="Replay any strategy or RMS profile against historical data. See exactly what your edge looks like — and what it costs."
      actions={
        <>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
            <Bookmark className="w-3.5 h-3.5" />
            Saved runs
          </button>
          <button
            onClick={runBacktest}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] transition-all"
          >
            {running ? (
              <>
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                Running… 1.2M ticks
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run backtest
              </>
            )}
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Mode tabs */}
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => {
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-white/25 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                    : 'border-white/[0.06] hover:border-white/15 bg-white/[0.02]'
                }`}
              >
                <span className={`text-lg ${isActive ? 'text-blue-300' : 'text-white/40'}`}>{m.icon}</span>
                <div className="text-left">
                  <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>{m.label}</div>
                  <div className="text-[10px] text-white/40 font-mono uppercase tracking-wider">{m.sub}</div>
                </div>
              </button>
            );
          })}
        </div>

        {mode !== 'compare' ? (
          <>
            {/* Headline metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <HeroMetric label="Net P&L" value={formatInr(active.metrics.pnl)} positive={active.metrics.pnl >= 0} primary />
              <HeroMetric label="CAGR" value={`${active.metrics.cagr.toFixed(1)}%`} positive />
              <HeroMetric label="Sharpe" value={active.metrics.sharpe.toFixed(2)} positive={active.metrics.sharpe >= 1.5} />
              <HeroMetric label="Sortino" value={active.metrics.sortino.toFixed(2)} positive />
              <HeroMetric label="Max DD" value={formatInr(active.metrics.maxDD)} positive={false} />
              <HeroMetric label="Win rate" value={`${(active.metrics.winRate * 100).toFixed(1)}%`} positive />
            </div>

            {/* Main charts row */}
            <div className="grid lg:grid-cols-4 gap-4">
              {/* Config panel */}
              <div className="lg:col-span-1 liquid-glass rounded-3xl p-5 border border-white/[0.06]">
                <h3 className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-4">Configuration</h3>
                <div className="space-y-3 text-xs">
                  <ConfigField icon={Sparkles} label="Strategy" value="PCR + OI Reversal v3" />
                  <ConfigField icon={Calendar} label="From" value="2025-11-26" />
                  <ConfigField icon={Calendar} label="To"   value="2026-05-26" />
                  <ConfigField icon={Wallet}   label="Capital" value="₹10,00,000" />
                  <ConfigField icon={Layers}   label="Universe" value="FnO 200" />
                  {mode !== 'strategy-only' && (
                    <ConfigField icon={Activity} label="RMS profile" value="Production (9 rules)" />
                  )}
                  <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-2">
                    <label className="flex items-center gap-2 text-xs text-white/70">
                      <div className="w-8 h-4 rounded-full bg-blue-500 relative">
                        <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white" />
                      </div>
                      Include broker slippage (2bps)
                    </label>
                    <label className="flex items-center gap-2 text-xs text-white/70">
                      <div className="w-8 h-4 rounded-full bg-blue-500 relative">
                        <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white" />
                      </div>
                      Apply daily loss cap
                    </label>
                  </div>
                </div>
                {mode === 'strategy-only' && (
                  <div className="mt-4 p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 text-[11px] text-amber-200 flex gap-2">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>Strategy-only shows worst-case downside. Never trade this profile in production.</span>
                  </div>
                )}
              </div>

              {/* Equity chart */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-3 liquid-glass rounded-3xl p-6 border border-white/[0.06] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-72 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="flex items-start justify-between mb-4 relative">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Equity Curve · {active.label}</div>
                    <div className="text-3xl font-mono font-semibold tabular-nums mt-1">
                      ₹{active.equityCurve[active.equityCurve.length - 1].toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-emerald-400 mt-1 font-mono">
                      +{(((active.equityCurve[active.equityCurve.length - 1] - active.equityCurve[0]) / active.equityCurve[0]) * 100).toFixed(1)}% over 6mo
                    </div>
                  </div>
                  <div className="flex gap-3 text-[11px] font-mono">
                    <Pill color="emerald" label={`${active.metrics.trades} trades`} />
                    <Pill color="blue" label={`PF ${active.metrics.profitFactor.toFixed(2)}`} />
                    <Pill color="violet" label={`avg win ${formatInr(active.metrics.avgWin).replace('+', '')}`} />
                  </div>
                </div>
                <EquityChart data={active.equityCurve} color={active.color} height={300} markPeakAndTrough smooth />
                <div className="mt-2">
                  <DrawdownChart data={active.drawdownCurve} height={110} />
                </div>
              </motion.div>
            </div>

            {/* Bottom row */}
            {mode === 'rms-only' ? (
              <div className="liquid-glass rounded-3xl p-6 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Rule contribution</h3>
                    <p className="text-xl font-medium">What each rule actually does</p>
                  </div>
                  <span className="text-[10px] text-white/30 font-mono">delta vs "rule off" counterfactual</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                        <th className="text-left  py-3 px-2">Rule</th>
                        <th className="text-right py-3 px-2">Trades affected</th>
                        <th className="text-right py-3 px-2">P&L delta</th>
                        <th className="text-right py-3 px-2">Max DD delta</th>
                        <th className="text-left  py-3 px-2">What it does</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RULE_CONTRIBUTIONS.map((r) => (
                        <tr key={r.rule} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-2 font-medium">{r.rule}</td>
                          <td className="py-3 px-2 text-right font-mono text-white/60">{r.tradesAffected}</td>
                          <td className={`py-3 px-2 text-right font-mono font-semibold ${r.pnlDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {formatInr(r.pnlDelta)}
                          </td>
                          <td className={`py-3 px-2 text-right font-mono font-semibold ${r.ddDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {formatInr(r.ddDelta)}
                          </td>
                          <td className="py-3 px-2 text-white/50 text-[11px]">{r.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 liquid-glass rounded-3xl p-6 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Sample trades</h3>
                      <p className="text-xl font-medium">Recent fills · backtest replay</p>
                    </div>
                    <button className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                      View all {active.metrics.trades} <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[680px]">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Symbol</th>
                        <th className="text-left py-2">Side</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-right py-2">Qty</th>
                        <th className="text-right py-2">Entry</th>
                        <th className="text-right py-2">Exit</th>
                        <th className="text-right py-2">P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {active.sampleTrades.map((t, i) => (
                        <tr key={i} className="border-t border-white/[0.04]">
                          <td className="py-3 text-white/60 font-mono text-xs">{t.date}</td>
                          <td className="py-3 font-medium">{t.symbol}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.side === 'LONG' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                              {t.side}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${t.status === 'target-hit' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                              {t.status === 'target-hit' ? 'TGT' : 'SL'}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-white/60">{t.qty}</td>
                          <td className="py-3 text-right font-mono text-white/70">{t.entry.toFixed(2)}</td>
                          <td className="py-3 text-right font-mono text-white/70">{t.exit.toFixed(2)}</td>
                          <td className={`py-3 text-right font-mono font-semibold ${t.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {t.pnl >= 0 ? '+' : ''}₹{Math.abs(t.pnl).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>

                <div className="liquid-glass rounded-3xl p-6 border border-white/[0.06]">
                  <h3 className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-1">Risk profile</h3>
                  <p className="text-xl font-medium mb-4">Distribution & ratios</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Avg win',  value: formatInr(active.metrics.avgWin),  pct:  Math.min(100, (active.metrics.avgWin / 12000) * 100),  positive: true },
                      { label: 'Avg loss', value: formatInr(active.metrics.avgLoss), pct:  Math.min(100, (Math.abs(active.metrics.avgLoss) / 12000) * 100), positive: false },
                      { label: 'Profit factor', value: active.metrics.profitFactor.toFixed(2), pct: Math.min(100, (active.metrics.profitFactor / 3) * 100), positive: true },
                      { label: 'Rejected by RMS', value: `${active.metrics.rejectedByRMS}`, pct: Math.min(100, (active.metrics.rejectedByRMS / 500) * 100), positive: true },
                    ].map((d) => (
                      <div key={d.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/60">{d.label}</span>
                          <span className={`font-mono ${d.positive ? 'text-emerald-300' : 'text-rose-300'}`}>{d.value}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${d.pct}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full rounded-full ${d.positive ? 'bg-gradient-to-r from-emerald-500 to-emerald-300' : 'bg-gradient-to-r from-rose-500 to-rose-300'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-5 border-t border-white/[0.06]">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-2">Monthly returns</div>
                    <div className="grid grid-cols-6 gap-1">
                      {active.monthlyReturns.map((r, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded text-[9px] font-mono grid place-items-center"
                          style={{
                            background: r >= 0 ? `rgba(16,185,129,${0.2 + Math.min(0.6, r / 20)})` : `rgba(239,68,68,${0.2 + Math.min(0.6, Math.abs(r) / 20)})`,
                          }}
                        >
                          {r > 0 ? '+' : ''}
                          {r.toFixed(0)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          // COMPARE MODE
          <div className="space-y-6">
            <div className="liquid-glass rounded-3xl p-6 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">All three modes · same strategy, same window</div>
                  <h3 className="text-xl font-medium mt-1">PCR + OI Reversal v3 · 6 months</h3>
                </div>
                <div className="flex gap-4 text-[11px] font-mono">
                  {(['combined', 'strategy-only', 'rms-only'] as const).map((m) => (
                    <div key={m} className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm" style={{ background: BACKTESTS[m].color }} />
                      <span className="text-white/70">{BACKTESTS[m].label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <CompareChart />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {(['combined', 'strategy-only', 'rms-only'] as const).map((m) => {
                const b = BACKTESTS[m];
                return (
                  <div key={m} className="liquid-glass rounded-3xl p-5 border border-white/[0.06] relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: b.color }} />
                    <div className="text-[10px] uppercase tracking-[0.18em] font-mono" style={{ color: b.color }}>
                      {b.label}
                    </div>
                    <div className="text-3xl font-mono font-semibold tabular-nums mt-1.5">{formatInr(b.metrics.pnl)}</div>
                    <p className="text-xs text-white/45 mt-2 leading-snug">{b.desc}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      {[
                        ['Trades',  b.metrics.trades],
                        ['Win rate', `${(b.metrics.winRate * 100).toFixed(1)}%`],
                        ['Sharpe',  b.metrics.sharpe.toFixed(2)],
                        ['Max DD', formatInr(b.metrics.maxDD)],
                        ['CAGR',   `${b.metrics.cagr.toFixed(1)}%`],
                        ['PF',     b.metrics.profitFactor.toFixed(2)],
                      ].map(([k, v]) => (
                        <div key={String(k)} className="flex justify-between border-b border-white/[0.04] pb-1">
                          <span className="text-white/50">{k}</span>
                          <span className="font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="liquid-glass rounded-2xl p-5 border-l-4 border-emerald-500 bg-emerald-500/[0.04]">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <p className="text-sm text-white/80">
                  <span className="text-emerald-300 font-medium">Reading the chart:</span> Strategy-only has the highest peak — and the deepest drawdown. RMS rules give up some upside in exchange for a far smoother curve (lower max DD, higher Sharpe). That spread is the dollar value of risk management.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Strategy performance heatmap */}
        <div className="liquid-glass rounded-3xl p-6 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Strategy performance · 12 months</div>
              <h3 className="text-xl font-medium mt-1">Monthly returns heatmap</h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500/60" /> negative</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/60" /> positive</span>
            </div>
          </div>
          <HeatMap data={PERFORMANCE_HEATMAP} />
        </div>
      </div>

      {/* Running overlay */}
      <AnimatePresence>
        {running && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center"
          >
            <div className="text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" />
                <div className="absolute inset-3 rounded-full border-2 border-emerald-500/30" />
                <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-emerald-400 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
              </div>
              <div>
                <div className="heading-italic text-3xl">Running backtest…</div>
                <div className="text-sm text-white/50 mt-2 font-mono">Replaying 1.2M ticks · 142 strategy outputs · 9 RMS rules</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CockpitShell>
  );
}

function HeroMetric({ label, value, positive, primary }: { label: string; value: string; positive: boolean; primary?: boolean }) {
  return (
    <div className={`liquid-glass rounded-2xl p-4 border border-white/[0.06] relative overflow-hidden ${primary ? 'ring-1 ring-emerald-500/30' : ''}`}>
      {primary && <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/20 blur-2xl" />}
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-2">{label}</div>
      <div className={`text-2xl font-mono font-semibold tabular-nums ${positive ? 'text-emerald-300' : 'text-rose-300'}`}>{value}</div>
    </div>
  );
}

function ConfigField({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-wider font-mono mb-1">
        <Icon className="w-3 h-3" /> {label}
      </label>
      <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium">{value}</div>
    </div>
  );
}

function Pill({ color, label }: { color: 'emerald' | 'blue' | 'violet'; label: string }) {
  const map = {
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    blue:    'bg-blue-500/10 text-blue-300 border-blue-500/20',
    violet:  'bg-violet-500/10 text-violet-300 border-violet-500/20',
  };
  return <span className={`px-2.5 py-1 rounded-full border ${map[color]}`}>{label}</span>;
}

function CompareChart() {
  const series = [BACKTESTS.combined, BACKTESTS['strategy-only'], BACKTESTS['rms-only']];
  const allVals = series.flatMap((s) => s.equityCurve);
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const width = 1000;
  const height = 360;
  const padX = 50;
  const padY = 24;
  const n = series[0].equityCurve.length;
  const x = (i: number) => padX + (i / (n - 1)) * (width - padX * 2);
  const y = (v: number) => height - padY - ((v - min) / (max - min)) * (height - padY * 2);

  const buildPath = (data: number[]) => {
    let path = `M ${x(0)},${y(data[0])}`;
    for (let i = 1; i < data.length; i++) {
      const cpX = (x(i - 1) + x(i)) / 2;
      path += ` C ${cpX},${y(data[i - 1])} ${cpX},${y(data[i])} ${x(i)},${y(data[i])}`;
    }
    return path;
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor={s.color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
        <filter id="cmp-glow">
          <feGaussianBlur stdDeviation="2.5" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g opacity={0.15}>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={padX} y1={padY + t * (height - padY * 2)} x2={width - padX} y2={padY + t * (height - padY * 2)} stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" />
        ))}
      </g>

      <line x1={padX} y1={y(1000000)} x2={width - padX} y2={y(1000000)} stroke="#9CA3AF" strokeDasharray="3 4" strokeWidth="0.5" opacity={0.5} />
      <text x={width - padX} y={y(1000000) - 5} textAnchor="end" fontSize="10" fill="#9CA3AF" fontFamily="ui-monospace, monospace">starting capital ₹10L</text>

      {series.map((s, i) => (
        <path
          key={i}
          d={`${buildPath(s.equityCurve)} L ${x(s.equityCurve.length - 1)},${height - padY} L ${x(0)},${height - padY} Z`}
          fill={`url(#grad-${i})`}
        />
      ))}
      {series.map((s, i) => (
        <path key={`l-${i}`} d={buildPath(s.equityCurve)} fill="none" stroke={s.color} strokeWidth="2" filter="url(#cmp-glow)" strokeLinecap="round" />
      ))}
    </svg>
  );
}
