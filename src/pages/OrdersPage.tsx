import { Receipt, Filter, Download } from 'lucide-react';
import { CockpitShell } from '../components/cockpit/CockpitShell';
import { ORDERS } from '../data/mock';

const BROKER_STYLE: Record<string, string> = {
  zerodha: 'bg-rose-500/10 text-rose-200 border-rose-500/20',
  angel:   'bg-blue-500/10 text-blue-200 border-blue-500/20',
  dhan:    'bg-emerald-500/10 text-emerald-200 border-emerald-500/20',
};

const STATUS_STYLE: Record<string, string> = {
  filled:      'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  'target-hit':'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  'sl-hit':    'bg-rose-500/15 text-rose-300 border-rose-500/30',
  placed:      'bg-blue-500/10 text-blue-300 border-blue-500/20',
  rejected:    'bg-white/5 text-white/40 border-white/10',
};

export function OrdersPage() {
  const totalPnL = ORDERS.reduce((s, o) => s + o.pnl, 0);
  const wins = ORDERS.filter((o) => o.pnl > 0).length;

  return (
    <CockpitShell
      title="Orders monitor"
      subtitle="Every fill, every broker. Live execution telemetry across Zerodha, Angel, and Dhan with no manual reconciliation."
      actions={
        <>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Summary label="Orders today"    value={ORDERS.length.toString()} sub="across 3 brokers" />
          <Summary label="Realised P&L"    value={`+₹${totalPnL.toLocaleString('en-IN')}`} sub="net of slippage" positive />
          <Summary label="Win rate"        value={`${((wins / ORDERS.length) * 100).toFixed(0)}%`} sub={`${wins} / ${ORDERS.length}`} positive />
          <Summary label="Avg fill latency" value="38ms" sub="zerodha · angel · dhan" />
        </div>

        {/* Broker breakdown bars */}
        <div className="grid md:grid-cols-3 gap-4">
          {(['zerodha', 'angel', 'dhan'] as const).map((b) => {
            const orders = ORDERS.filter((o) => o.broker === b);
            const pnl = orders.reduce((s, o) => s + o.pnl, 0);
            return (
              <div key={b} className="liquid-glass rounded-2xl p-5 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider border ${BROKER_STYLE[b]}`}>{b}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-2xl font-mono font-semibold">{orders.length} orders</div>
                <div className={`text-xs font-mono mt-1 ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pnl >= 0 ? '+' : ''}₹{Math.abs(pnl).toLocaleString('en-IN')} realised
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-[10px] text-white/40 font-mono">
                  <div>API: <span className="text-emerald-300">ok</span></div>
                  <div>WS: <span className="text-emerald-300">ok</span></div>
                  <div>RMS: <span className="text-emerald-300">ok</span></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orders table */}
        <div className="liquid-glass rounded-3xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-blue-300" />
              <h3 className="text-sm font-medium">All orders · today</h3>
              <span className="text-[10px] text-white/40 font-mono uppercase">{ORDERS.length} fills</span>
            </div>
            <div className="flex gap-2">
              {['All', 'Filled', 'TGT hit', 'SL hit', 'Placed', 'Rejected'].map((f, i) => (
                <button
                  key={f}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                    i === 0 ? 'bg-white/10 border-white/25 text-white' : 'border-white/10 text-white/55 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-white/30 font-mono bg-white/[0.02]">
                <th className="text-left  py-3 px-6">Time</th>
                <th className="text-left  py-3 px-3">ID</th>
                <th className="text-left  py-3 px-3">Symbol</th>
                <th className="text-left  py-3 px-3">Broker</th>
                <th className="text-left  py-3 px-3">Side</th>
                <th className="text-right py-3 px-3">Qty</th>
                <th className="text-right py-3 px-3">Entry</th>
                <th className="text-right py-3 px-3">LTP</th>
                <th className="text-left  py-3 px-3">Status</th>
                <th className="text-right py-3 px-6">P&L</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o, i) => (
                <tr key={o.id} className={`border-t border-white/[0.04] hover:bg-white/[0.025] transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'}`}>
                  <td className="py-3 px-6 font-mono text-xs text-white/60">{o.time}</td>
                  <td className="py-3 px-3 font-mono text-xs text-white/40">{o.id}</td>
                  <td className="py-3 px-3 font-medium">{o.symbol}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider border ${BROKER_STYLE[o.broker]}`}>{o.broker}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${o.side === 'BUY' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {o.side}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-white/60">{o.qty}</td>
                  <td className="py-3 px-3 text-right font-mono text-white/80">{o.entry.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right font-mono text-white">{o.ltp.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider border ${STATUS_STYLE[o.status]}`}>
                      {o.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className={`py-3 px-6 text-right font-mono font-semibold ${o.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {o.pnl >= 0 ? '+' : ''}₹{Math.abs(o.pnl).toLocaleString('en-IN')}
                  </td>
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

function Summary({ label, value, sub, positive }: { label: string; value: string; sub: string; positive?: boolean }) {
  return (
    <div className="liquid-glass rounded-2xl p-5 border border-white/[0.06]">
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">{label}</div>
      <div className={`text-3xl font-mono font-semibold mt-1.5 ${positive ? 'text-emerald-300' : ''}`}>{value}</div>
      <div className="text-[11px] text-white/40 mt-1">{sub}</div>
    </div>
  );
}
