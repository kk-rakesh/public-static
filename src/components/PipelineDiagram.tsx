/**
 * Architecture data-flow diagram, Lighter.xyz style.
 * Boxes + arrows + monospaced labels. The single most credibility-claiming
 * move on the marketing page.
 */

import { useEffect, useState } from 'react';

const NODES = [
  { id: 'feed',       label: 'TICK_FEED',        sub: 'NSE · BSE · MCX',     latency: '< 1 ms' },
  { id: 'normaliser', label: 'NORMALISER',       sub: 'dedup · L1+L2 merge', latency: '0.4 ms' },
  { id: 'strategy',   label: 'STRATEGY_ENGINE',  sub: '5 live · 14 research', latency: '2.1 ms' },
  { id: 'risk',       label: 'RISK_ENGINE',      sub: '9 rules · audit log', latency: '0.8 ms' },
  { id: 'router',     label: 'SMART_ROUTER',     sub: 'multi-broker · 38 ms p50', latency: '38 ms' },
  { id: 'broker',     label: 'BROKER',           sub: 'Zerodha · Angel · Dhan', latency: '—' },
];

export function PipelineDiagram() {
  const [hot, setHot] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHot((h) => (h + 1) % NODES.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-x-auto hide-scrollbar">
      <div className="min-w-[1100px] py-6 px-2">
        <div className="grid grid-cols-6 gap-0 items-center">
          {NODES.map((n, i) => {
            const isHot = i === hot;
            const isPast = i < hot;
            return (
              <div key={n.id} className="relative flex items-center">
                {/* Node box */}
                <div
                  className={`relative w-full surface px-4 py-5 transition-all duration-500 ${
                    isHot ? 'border-mint shadow-[0_0_30px_-8px_rgba(168,255,96,0.5)]' : ''
                  }`}
                  style={{
                    borderColor: isHot ? 'rgba(168,255,96,0.55)' : undefined,
                    background:  isHot ? 'linear-gradient(180deg, rgba(168,255,96,0.06), rgba(168,255,96,0))' : undefined,
                  }}
                >
                  {/* Corner ticks */}
                  <div className="absolute top-0 left-0  w-2.5 h-2.5 border-l border-t border-mint opacity-70" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r border-t border-mint opacity-70" />
                  <div className="absolute bottom-0 left-0  w-2.5 h-2.5 border-l border-b border-mint opacity-70" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r border-b border-mint opacity-70" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] mono text-white/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isHot ? 'bg-mint pulse-dot' : isPast ? 'bg-mint/40' : 'bg-white/15'
                      }`}
                    />
                  </div>
                  <div className="mt-3 mono text-[13px] tracking-wide" style={{ color: isHot ? '#A8FF60' : '#F5F5F2' }}>
                    {n.label}
                  </div>
                  <div className="mt-1.5 text-[11px] text-white/50 leading-snug">{n.sub}</div>
                  <div className="mt-3 mono text-[10px] text-white/40">{n.latency}</div>
                </div>

                {/* Arrow */}
                {i < NODES.length - 1 && (
                  <div className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 z-10 w-10 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 40 14" className="w-full" preserveAspectRatio="none">
                      <line
                        x1="2" y1="7" x2="32" y2="7"
                        stroke={isHot ? '#A8FF60' : 'rgba(245,245,242,0.18)'}
                        strokeWidth="1"
                        strokeDasharray={isHot ? '0' : '3 3'}
                      />
                      <path
                        d="M 32 3 L 38 7 L 32 11"
                        stroke={isHot ? '#A8FF60' : 'rgba(245,245,242,0.35)'}
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trace line below boxes */}
        <div className="mt-6 grid grid-cols-6 gap-0 mono text-[10px] text-white/30 uppercase tracking-widest">
          {NODES.map((n, i) => (
            <div key={n.id} className="px-1">
              <span className="text-white/45">{String(i + 1).padStart(2, '0')}</span> · {n.label.toLowerCase().replace('_', ' ')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
