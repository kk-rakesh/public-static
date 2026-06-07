import { useState } from 'react';
import { Shield, Plus, AlertTriangle } from 'lucide-react';
import { CockpitShell } from '../components/cockpit/CockpitShell';
import { RMS_RULES } from '../data/mock';

export function RmsPage() {
  const [rules, setRules] = useState(RMS_RULES);
  const liveCount = rules.filter((r) => r.on).length;
  const totalHits = rules.reduce((s, r) => s + (r.on ? r.hits : 0), 0);

  return (
    <CockpitShell
      title="Risk Management"
      subtitle="The rules that keep us alive. Every signal flows through this gate before reaching the broker — no exceptions."
      actions={
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium bg-gradient-to-r from-violet-600 to-blue-500 hover:to-blue-400 shadow-[0_8px_30px_-10px_rgba(139,92,246,0.6)] transition-all">
          <Plus className="w-3.5 h-3.5" />
          Add custom rule
        </button>
      }
    >
      <div className="space-y-6">
        {/* Live banner */}
        <div className="liquid-glass rounded-2xl p-5 border border-emerald-500/20 bg-gradient-to-r from-emerald-500/[0.06] to-transparent flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 grid place-items-center">
            <Shield className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{liveCount} of {rules.length} rules currently armed · last 24h</div>
            <div className="text-xs text-white/55 mt-0.5">
              <span className="text-emerald-300 font-mono">{totalHits.toLocaleString('en-IN')}</span> rule evaluations applied · 0 outages · everything nominal
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Master switch</div>
            <div className="mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </div>
          </div>
        </div>

        {/* Hero ratios */}
        <div className="grid md:grid-cols-3 gap-4">
          <RatioCard label="Capital protected"   value="₹4.87Cr" sub="across 3 brokers" color="emerald" />
          <RatioCard label="Trades evaluated · 90d" value="12,418" sub="never missed" color="blue" />
          <RatioCard label="Worst-case prevented" value="₹3.84L" sub="vs strategy-only" color="violet" />
        </div>

        {/* Rules list */}
        <div className="liquid-glass rounded-3xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-300" />
              Active rule set
            </h3>
            <span className="text-[10px] text-white/40 font-mono uppercase">{rules.length} rules</span>
          </div>
          <div>
            {rules.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center gap-4 px-6 py-4 border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-1">
                  <div className={`w-9 h-9 rounded-xl grid place-items-center border ${r.on ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300' : 'bg-white/[0.03] border-white/10 text-white/30'}`}>
                    <Shield className="w-4 h-4" />
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-[11px] text-white/50 mt-0.5">{r.desc}</div>
                </div>
                <div className="col-span-2 font-mono text-xs">
                  <div className="px-2 py-1 rounded-md bg-white/5 border border-white/[0.06] text-white/70 inline-block">{r.value}</div>
                </div>
                <div className="col-span-2 text-xs text-white/50 font-mono">
                  <div>{r.hits.toLocaleString('en-IN')} hits</div>
                  <div className="text-[10px] text-white/30">last 24h</div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() =>
                      setRules((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))
                    }
                    className={`relative w-10 h-5 rounded-full transition-colors ${r.on ? 'bg-blue-500' : 'bg-white/15'}`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        r.on ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance footnote */}
        <div className="liquid-glass rounded-2xl p-5 border-l-4 border-amber-500 bg-amber-500/[0.04] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="text-sm text-white/80">
            <span className="text-amber-300 font-medium">SEBI compliance:</span> Every rule evaluation is logged with input, output, verdict, and timestamp. Audit trail retained for 7 years. RMS profile changes are 2-factor approved.
          </div>
        </div>
      </div>
    </CockpitShell>
  );
}

function RatioCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: 'emerald' | 'blue' | 'violet' }) {
  const map = {
    emerald: 'from-emerald-500/40 to-emerald-500/0 text-emerald-300',
    blue:    'from-blue-500/40 to-blue-500/0 text-blue-300',
    violet:  'from-violet-500/40 to-violet-500/0 text-violet-300',
  };
  return (
    <div className="liquid-glass rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${map[color]}`} />
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">{label}</div>
      <div className={`text-3xl font-mono font-semibold mt-1.5 ${map[color].split(' ').pop()}`}>{value}</div>
      <div className="text-xs text-white/40 mt-1">{sub}</div>
    </div>
  );
}
