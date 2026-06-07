/**
 * Scrolling FTMO-style trader payout receipts.
 * Each card = name, strategy, payout amount, date, "PAID" stamp.
 * Manufactured social proof, but the format makes it feel inevitable.
 */

import { PAYOUTS, type Payout } from '../data/mock';

// Soft pseudo-photo avatar — colored gradient with monogram. No stock photos.
function Avatar({ seed, name }: { seed: number; name: string }) {
  const palettes = [
    ['#FF7043', '#5C2C0F'],
    ['#A8FF60', '#0E3F0E'],
    ['#5E63FF', '#1A1D5E'],
    ['#EC4899', '#5E1F3E'],
    ['#FBBF24', '#5E3D0E'],
    ['#22D3EE', '#0E3F4E'],
    ['#8B5CF6', '#2E1E5E'],
    ['#FF5470', '#5E0E22'],
    ['#10B981', '#0E3F2E'],
  ];
  const [a, b] = palettes[seed % palettes.length];
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <div
      className="w-10 h-10 rounded-full grid place-items-center text-xs font-semibold shrink-0"
      style={{
        background: `linear-gradient(135deg, ${a}, ${b})`,
        color: '#fff',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      {initials}
    </div>
  );
}

function ReceiptCard({ p }: { p: Payout }) {
  const inr = (n: number) => {
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
    return `₹${(n / 1e3).toFixed(1)}K`;
  };
  return (
    <div className="relative w-[300px] shrink-0 surface px-4 py-4 overflow-hidden">
      {/* "PAID" stamp */}
      <div
        className="absolute -right-3 top-2 rotate-12 border border-mint px-2 py-0.5 mono text-[9px] tracking-[0.25em] text-mint opacity-80 pointer-events-none"
        style={{ background: 'rgba(168,255,96,0.06)' }}
      >
        PAID
      </div>

      <div className="flex items-center gap-3">
        <Avatar seed={p.avatarSeed} name={p.name} />
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{p.name}</div>
          <div className="mono text-[10px] text-white/40 truncate">{p.handle} · {p.city}</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-hairline grid grid-cols-3 gap-2 items-end">
        <div className="col-span-2">
          <div className="mono text-[9px] uppercase tracking-widest text-white/35">Strategy</div>
          <div className="text-[12px] mt-0.5 truncate">{p.strategy}</div>
        </div>
        <div className="text-right">
          <div className="mono text-[9px] uppercase tracking-widest text-white/35">{p.period}</div>
          <div className="text-mint font-semibold text-base mono tabular-nums mt-0.5">
            {inr(p.amount)}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between mono text-[9px] text-white/35">
        <span>SETTLED · {p.date}</span>
        <span className="text-mint/70">▲ verified</span>
      </div>
    </div>
  );
}

export function PayoutMarquee() {
  // Duplicate so the loop is seamless
  const rowA = [...PAYOUTS, ...PAYOUTS];
  const rowB = [...PAYOUTS.slice(3), ...PAYOUTS.slice(0, 3), ...PAYOUTS];

  return (
    <div className="relative overflow-hidden py-2 space-y-3" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
      <div className="flex gap-3 animate-ticker">
        {rowA.map((p, i) => (
          <div key={`a-${i}`}>{ReceiptCard({ p })}</div>
        ))}
      </div>
      <div className="flex gap-3 animate-ticker-fast" style={{ animationDirection: 'reverse' }}>
        {rowB.map((p, i) => (
          <div key={`b-${i}`}>{ReceiptCard({ p })}</div>
        ))}
      </div>
    </div>
  );
}
