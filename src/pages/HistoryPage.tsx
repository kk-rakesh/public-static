import { CockpitShell } from '../components/cockpit/CockpitShell';
import { EquityChart } from '../components/charts/EquityChart';
import { HeatMap } from '../components/charts/HeatMap';
import { BACKTESTS, PERFORMANCE_HEATMAP, ORDERS } from '../data/mock';

const SESSIONS = [
  { date: '2026-05-26', trades: 14, win: 10, pnl:  84320, dd: -3400, note: 'Choppy open, FII flow turned constructive after 10am.' },
  { date: '2026-05-23', trades: 12, win:  9, pnl:  62100, dd: -2800, note: 'Big block-deal hit on RELIANCE drove the day.' },
  { date: '2026-05-22', trades: 18, win: 11, pnl:  41700, dd: -8200, note: 'RBI policy whipsaw before lunch.' },
  { date: '2026-05-21', trades: 11, win:  8, pnl:  58400, dd: -2100, note: 'Banknifty rotation, ICICI + HDFC drove it.' },
  { date: '2026-05-20', trades: 16, win: 12, pnl:  76900, dd: -1800, note: 'Clean trend day, low IV, RMS slept.' },
];

export function HistoryPage() {
  const totalPnL = SESSIONS.reduce((s, x) => s + x.pnl, 0);
  return (
    <CockpitShell
      title="History"
      subtitle="Every session, every trade, forever. Drill into any day to replay what happened — including counter-factuals on RMS toggles."
    >
      <div className="space-y-6">
        {/* Equity */}
        <div className="liquid-glass rounded-3xl p-6 border border-white/[0.06]">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">Live portfolio · since launch</div>
              <div className="text-4xl font-mono font-semibold mt-1">
                ₹{(BACKTESTS.combined.equityCurve[BACKTESTS.combined.equityCurve.length - 1]).toLocaleString('en-IN')}
              </div>
              <div className="text-emerald-400 text-sm font-mono mt-0.5">
                +{(((BACKTESTS.combined.equityCurve[BACKTESTS.combined.equityCurve.length - 1] - 1_000_000) / 1_000_000) * 100).toFixed(1)}% in 6 months
              </div>
            </div>
            <div className="text-right text-xs text-white/40 font-mono">
              <div>{SESSIONS.length} sessions shown</div>
              <div>+₹{totalPnL.toLocaleString('en-IN')} last week</div>
            </div>
          </div>
          <EquityChart data={BACKTESTS.combined.equityCurve} color="#10B981" height={280} markPeakAndTrough />
        </div>

        {/* Heatmap */}
        <div className="liquid-glass rounded-3xl p-6 border border-white/[0.06]">
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-1">Strategy performance · 12 months</h3>
          <p className="text-xl font-medium mb-5">Monthly returns by strategy</p>
          <HeatMap data={PERFORMANCE_HEATMAP} />
        </div>

        {/* Session list */}
        <div className="liquid-glass rounded-3xl border border-white/[0.06] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h3 className="text-sm font-medium">Recent sessions</h3>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/30 font-mono bg-white/[0.02]">
                <th className="text-left  py-3 px-6">Date</th>
                <th className="text-right py-3 px-3">Trades</th>
                <th className="text-right py-3 px-3">Wins</th>
                <th className="text-right py-3 px-3">P&L</th>
                <th className="text-right py-3 px-3">Max DD</th>
                <th className="text-left  py-3 px-6">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SESSIONS.map((s) => (
                <tr key={s.date} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="py-3 px-6 font-mono text-xs text-white/70">{s.date}</td>
                  <td className="py-3 px-3 text-right font-mono">{s.trades}</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-300">{s.win}</td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-400">+₹{s.pnl.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right font-mono text-rose-400">₹{s.dd.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-6 text-xs text-white/55">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </CockpitShell>
  );
}
