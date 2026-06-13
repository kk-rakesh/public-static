import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import { CockpitShell } from '../components/cockpit/CockpitShell';
import { CandleChart } from '../components/charts/CandleChart';
import { Sparkline } from '../components/charts/Sparkline';
import { STRATEGY_OUTPUTS } from '../data/mock';

const SCAN_TAGS = [
  'Block deal flow',
  'FII net buyer',
  'Long OI buildup',
  'PCR spike',
  'IV crush',
  'Earnings momentum',
  'Sectoral leader',
];

export function StrategyPage() {
  return (
    <CockpitShell
      title="Strategy outputs"
      subtitle="Signals fired by our AI-native decision engine today. Every output carries its full RMS verdict and audit trail."
      actions={
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-gradient-to-r from-violet-600 to-blue-500 hover:to-blue-400 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.6)] transition-all">
          <Sparkles className="w-3.5 h-3.5" />
          Run signal scan
        </button>
      }
    >
      <div className="space-y-6">
        {/* Pulse header */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Signals fired today', value: '14',  delta: '+2 vs avg',     color: 'emerald' },
            { label: 'Auto-executed',       value: '10',  delta: '71% pass-rate', color: 'emerald' },
            { label: 'Awaiting approval',   value: '2',   delta: '< 5 min queue', color: 'amber' },
            { label: 'Blocked by RMS',      value: '2',   delta: 'low confidence', color: 'rose' },
          ].map((s) => (
            <div key={s.label} className="liquid-glass rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">{s.label}</div>
              <div className="text-3xl font-mono font-semibold mt-1.5">{s.value}</div>
              <div className={`text-xs mt-1 ${s.color === 'emerald' ? 'text-emerald-400' : s.color === 'amber' ? 'text-amber-400' : 'text-rose-400'}`}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono mr-2">scan tags</span>
          {SCAN_TAGS.map((t, i) => (
            <button
              key={t}
              className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                i === 0 ? 'bg-blue-500/15 border-blue-500/30 text-blue-200' : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Strategy output cards */}
        <div className="grid lg:grid-cols-2 gap-4">
          {STRATEGY_OUTPUTS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="liquid-glass rounded-3xl p-5 border border-white/[0.06] hover:border-white/15 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold tracking-tight">{s.symbol}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                        s.signal === 'LONG' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
                      }`}
                    >
                      {s.signal}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50 mt-1 font-mono">{s.strategy} · {s.timestamp.slice(11, 16)} IST</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-semibold tabular-nums">₹{s.ltp.toFixed(2)}</div>
                  <div className="text-[10px] text-white/40 font-mono">LTP</div>
                </div>
              </div>

              {/* Mini chart */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-2 mb-4 overflow-hidden">
                <CandleChart seed={i * 11 + 3} height={140} showVolume={false} showIndicators={false} />
              </div>

              {/* Trade params */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono">Entry</div>
                  <div className="font-mono text-sm font-medium">₹{s.entry.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-rose-300/70 font-mono">Stop loss</div>
                  <div className="font-mono text-sm font-medium text-rose-300">₹{s.sl.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-emerald-300/70 font-mono">Target</div>
                  <div className="font-mono text-sm font-medium text-emerald-300">₹{s.target.toFixed(2)}</div>
                </div>
              </div>

              {/* Confidence + tags */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-mono text-white/40 mb-1.5">
                  <span>AI Confidence</span>
                  <span className="text-white/80">{(s.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
                    style={{ width: `${s.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">PCR {s.pcr}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">{s.oiBuildup}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-200">{s.trendlyneTag}</span>
              </div>

              {/* RMS verdict */}
              <div className="border-t border-white/[0.06] pt-3 mt-3 -mx-5 px-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {s.rms.verdict === 'AUTO' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span className="text-[10px] uppercase tracking-widest font-mono text-white/45">RMS Verdict</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      s.rms.verdict === 'AUTO'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}
                  >
                    {s.rms.verdict}
                  </span>
                </div>
                <div className="text-[11px] text-white/50 leading-snug">{s.rms.reason}</div>
                <div className="flex items-center justify-between mt-3 text-[11px]">
                  <span className="font-mono text-white/40">Position: ₹{(s.rms.positionINR / 1000).toFixed(0)}K · {s.rms.lots} lots</span>
                  <button className="flex items-center gap-1 text-blue-300 hover:text-blue-200">
                    {s.status === 'pending-approval' ? 'Approve now' : 'View detail'}
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CockpitShell>
  );
}
