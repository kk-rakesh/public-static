/**
 * O4F Marketing — "Institutional Onyx, Indian Edge"
 *
 * Aesthetic: Bloomberg-meets-Hyperliquid. Pure near-black, one saffron-mint accent,
 * transitional serif headlines, hairline borders (no glass). Real architecture,
 * real receipts, real names, real numbers.
 */

import { useEffect, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';

import { Logo } from '../components/Logo';
import { LiveTicker } from '../components/cockpit/LiveTicker';
import { EquityChart } from '../components/charts/EquityChart';
import { CandleChart } from '../components/charts/CandleChart';
import { HeatMap } from '../components/charts/HeatMap';
import { OrderBookMesh } from '../components/charts/OrderBookMesh';
import { PipelineDiagram } from '../components/PipelineDiagram';
import { PayoutMarquee } from '../components/PayoutMarquee';
import { TestimonialBlock } from '../components/TestimonialBlock';
import { AnimatedNumber } from '../components/cockpit/StatCard';
import { BACKTESTS, PERFORMANCE_HEATMAP, FOUNDERS_TICKER, TRUST_BAR } from '../data/mock';

/* -------------------------------------------------------------------------- */
/* Navbar                                                                     */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all px-5 sm:px-6 md:px-12 py-3 ${
        scrolled ? 'bg-[#08090C] border-b border-hairline' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="text-2xl font-bold tracking-tighter" />
          <span className="font-serif italic text-sm text-white/40">infrastructure</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-[13px]">
          <NavLink to="/cockpit">Cockpit</NavLink>
          <NavLink to="/backtest">Backtest</NavLink>
          <NavLink to="/strategy">Strategies</NavLink>
          <NavLink to="/rms">RMS</NavLink>
          <NavLink to="/blogs">Research</NavLink>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 mono text-[10px] uppercase tracking-widest text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-dot" />
            NSE · live
          </span>
          <Link
            to="/cockpit"
            className="flex items-center gap-2 px-4 py-2 mono text-[11px] uppercase tracking-widest bg-mint text-black hover:bg-[#7FFF8C] transition-colors"
          >
            Open cockpit →
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="px-3 py-1.5 text-white/55 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero — "The algo desk for India's best FnO traders"                        */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative pt-32 pb-12 px-5 sm:px-6 md:px-12 overflow-hidden">
      {/* Hairline grid backdrop */}
      <div className="absolute inset-0 bg-hairgrid pointer-events-none opacity-60" />
      {/* Subtle radial wash */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at center, rgba(168,255,96,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Top crosshair label */}
        <div className="flex items-center justify-between mono text-[10px] uppercase tracking-[0.25em] text-white/35 mb-6">
          <span><span className="text-mint">○</span> O4F · v0.9.3</span>
          <span>Bengaluru · 13.04°N 77.59°E</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="heading-serif text-[clamp(2.6rem,6.5vw,5.4rem)] max-w-[18ch]">
              The algo desk for India's best{' '}
              <span className="font-serif italic text-mint">FnO traders.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/65 max-w-2xl leading-relaxed">
              Real-time ticks, AI-native strategies, hard-gated risk, multi-broker routing — a single quant terminal that runs your book while you sleep. Built in Bengaluru.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/cockpit"
                className="group flex items-center justify-between px-6 py-4 bg-mint text-black mono text-xs uppercase tracking-widest hover:bg-[#7FFF8C] transition-colors min-w-[220px]"
              >
                Open the cockpit
                <span className="ml-4">→</span>
              </Link>
              <Link
                to="/backtest"
                className="group flex items-center justify-between px-6 py-4 surface-2 mono text-xs uppercase tracking-widest hover:border-mint transition-colors min-w-[220px]"
              >
                Try a backtest
                <span className="ml-4 text-mint">↗</span>
              </Link>
            </div>

            {/* Big numeric strip */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-6 max-w-2xl pt-8 border-t border-hairline">
              <Stat value={<><AnimatedNumber value={2.4} decimals={1} />k/s</>} label="ticks normalised" />
              <Stat value={<><AnimatedNumber value={148.7} decimals={1} />%</>} label="CAGR · 6mo backtest" />
              <Stat value={<><AnimatedNumber value={38} />ms</>} label="median fill latency" />
            </div>
          </div>

          {/* Right: order book mesh */}
          <div className="lg:col-span-5 relative">
            <div className="relative surface-elevated p-6 corner-ticks">
              <div className="tl" /><div className="tr" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-mint">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-dot" />
                  Live · order book depth
                </div>
                <div className="mono text-[10px] text-white/40">NIFTY · 24,987.20</div>
              </div>
              <OrderBookMesh />
              <div className="mt-4 grid grid-cols-3 gap-2 mono text-[10px]">
                <ReadingPill label="bid" value="24,985.10" />
                <ReadingPill label="ask" value="24,989.30" />
                <ReadingPill label="spread" value="0.02%" mint />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: SEBI + brokers trust strip */}
        <div className="mt-14 pt-6 border-t border-hairline grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 mono text-[10px] uppercase tracking-[0.25em] text-white/35">
            <span className="text-mint">●</span> {TRUST_BAR.sebi}
          </div>
          <div className="md:col-span-6 flex items-center gap-x-8 gap-y-2 flex-wrap">
            <span className="mono text-[10px] uppercase tracking-widest text-white/35">Brokers integrated</span>
            {TRUST_BAR.brokers.map((b) => (
              <span key={b} className="font-serif italic text-base text-white/70">{b}</span>
            ))}
          </div>
          <div className="md:col-span-3 mono text-[10px] uppercase tracking-widest text-white/35 md:text-right">
            <span className="text-mint mono">★ {TRUST_BAR.trustpilot.rating}</span> · {TRUST_BAR.trustpilot.reviews} reviews
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div>
      <div className="mono text-3xl md:text-4xl font-medium text-shimmer-mint tabular-nums leading-none">{value}</div>
      <div className="mono text-[10px] uppercase tracking-widest text-white/40 mt-2.5">{label}</div>
    </div>
  );
}

function ReadingPill({ label, value, mint }: { label: string; value: string; mint?: boolean }) {
  return (
    <div className="surface px-2.5 py-1.5">
      <div className="text-[9px] uppercase tracking-widest text-white/35">{label}</div>
      <div className={`tabular-nums ${mint ? 'text-mint' : 'text-white/85'}`}>{value}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Founders ticker — "Built by people who shipped at..."                     */
/* -------------------------------------------------------------------------- */

function FoundersTicker() {
  const items = [...FOUNDERS_TICKER, ...FOUNDERS_TICKER, ...FOUNDERS_TICKER];
  return (
    <section className="border-y border-hairline overflow-hidden bg-[#0A0C12]">
      <div
        className="flex items-center gap-12 py-5 animate-ticker whitespace-nowrap"
        style={{ maskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)' }}
      >
        {items.map((t, i) => {
          const isLabel = i % FOUNDERS_TICKER.length === 0;
          return (
            <span
              key={`${t}-${i}`}
              className={isLabel
                ? 'mono text-[11px] uppercase tracking-[0.25em] text-white/35'
                : 'font-serif italic text-2xl text-white/75'}
            >
              {t}
              {!isLabel && <span className="text-mint/50 ml-12 not-italic font-sans">·</span>}
            </span>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Architecture section — Pipeline diagram                                   */
/* -------------------------------------------------------------------------- */

function ArchitectureSection() {
  return (
    <section className="px-5 sm:px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <SectionHeader
        number="01"
        kicker="Architecture"
        title={<>Tick to fill in <span className="font-serif italic text-mint">six steps.</span></>}
        body="Every signal flows through the same pipeline. Every step is logged, replayable, and timestamped to the millisecond. No black boxes — you can read every line of every decision."
      />
      <div className="mt-12">
        <PipelineDiagram />
      </div>

      {/* SLO ribbon below diagram */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline">
        {[
          { label: 'p50 fill latency',  v: '38 ms' },
          { label: 'p99 fill latency',  v: '124 ms' },
          { label: 'tick → signal',     v: '3.6 ms' },
          { label: 'rms eval',          v: '0.8 ms' },
        ].map((s) => (
          <div key={s.label} className="bg-[#08090C] px-5 py-5">
            <div className="mono text-2xl text-mint tabular-nums">{s.v}</div>
            <div className="mono text-[10px] uppercase tracking-widest text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header                                                            */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  number,
  kicker,
  title,
  body,
  align = 'left',
}: {
  number: string;
  kicker: string;
  title: ReactNode;
  body?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`grid lg:grid-cols-12 gap-6 ${align === 'center' ? 'text-center' : ''}`}>
      <div className="lg:col-span-2">
        <div className="mono text-mint text-[11px] tracking-[0.3em]">{number} / 06</div>
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/35 mt-2">{kicker}</div>
      </div>
      <div className="lg:col-span-10">
        <h2 className="heading-serif text-[clamp(2.2rem,5vw,4.4rem)] max-w-[22ch]">{title}</h2>
        {body && <p className="text-lg text-white/60 mt-4 max-w-3xl leading-relaxed">{body}</p>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Cockpit preview                                                           */
/* -------------------------------------------------------------------------- */

function CockpitSection() {
  return (
    <section className="px-5 sm:px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <SectionHeader
        number="02"
        kicker="The Cockpit"
        title={<>One screen. <span className="font-serif italic text-mint">Every</span> position.</>}
        body="Your live book, every fill, every pending approval, every broker's health — refreshed at 4 Hz. Designed to be checked in a glance, not studied."
      />

      <div className="mt-12 surface-elevated p-4 md:p-6 relative corner-ticks">
        <div className="tl" /><div className="tr" />

        {/* Mock window chrome */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 mono text-[10px] uppercase tracking-widest text-white/40">
            <span className="w-2 h-2 rounded-full bg-mint pulse-dot" />
            LIVE · 10:42:18 IST
          </div>
          <div className="mono text-[10px] uppercase tracking-widest text-white/40">26 May 2026 · admin@o4f</div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          {/* PnL & equity */}
          <div className="lg:col-span-7 surface p-5">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-white/40">Live portfolio</div>
                <div className="mono text-4xl md:text-5xl tabular-nums mt-1.5">₹1,08,43,200</div>
                <div className="text-mint mono text-sm mt-1">+ ₹84,320 today &nbsp; · &nbsp; +1.73%</div>
              </div>
              <div className="flex gap-1 mono text-[10px]">
                {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((r, i) => (
                  <span key={r} className={`px-2 py-1 border ${i === 0 ? 'border-mint text-mint' : 'border-hairline text-white/40'}`}>{r}</span>
                ))}
              </div>
            </div>
            <EquityChart data={BACKTESTS.combined.equityCurve.slice(-60)} color="#A8FF60" height={220} showAxis={false} />
          </div>

          {/* Signals + RMS posture */}
          <div className="lg:col-span-5 space-y-4">
            <div className="surface p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="mono text-[10px] uppercase tracking-widest text-mint">▸ Signal stream</div>
                <div className="mono text-[10px] text-white/40">14 today</div>
              </div>
              {[
                { sym: 'RELIANCE',  side: 'LONG'  as const, conf: 74, pnl: '+₹3,637' },
                { sym: 'HDFCBANK',  side: 'LONG'  as const, conf: 81, pnl: '+₹858'   },
                { sym: 'TATAMOTORS',side: 'SHORT' as const, conf: 62, pnl: '+₹1,368' },
                { sym: 'BAJFINANCE',side: 'SHORT' as const, conf: 55, pnl: 'PENDING' },
              ].map((s) => (
                <div key={s.sym} className="grid grid-cols-12 items-center gap-2 py-2 border-t border-hairline first:border-0">
                  <span className="col-span-4 text-sm">{s.sym}</span>
                  <span className={`col-span-2 mono text-[10px] ${s.side === 'LONG' ? 'text-mint' : 'text-loss'}`}>{s.side}</span>
                  <span className="col-span-3 mono text-[10px] text-white/40">conf {s.conf}%</span>
                  <span className={`col-span-3 text-right mono text-[11px] ${s.pnl === 'PENDING' ? 'text-amber-300' : 'text-mint'}`}>{s.pnl}</span>
                </div>
              ))}
            </div>

            <div className="surface p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="mono text-[10px] uppercase tracking-widest text-mint">▸ RMS posture · live</div>
                <div className="mono text-[10px] text-white/40">8 of 9 armed</div>
              </div>
              {[
                { name: 'Position sizing v2',   v: '2% / 3 max', on: true },
                { name: 'Daily loss cap',       v: '-1.5%',      on: true },
                { name: 'Low-conf block',       v: '< 0.50',     on: true },
                { name: 'High-volatility cap',  v: 'IV > 80%',   on: true },
                { name: 'News blackout',        v: '±5 min',     on: false },
              ].map((r) => (
                <div key={r.name} className="grid grid-cols-12 items-center gap-2 py-1.5 border-t border-hairline first:border-0">
                  <span className="col-span-6 text-[12px] text-white/75">{r.name}</span>
                  <span className="col-span-4 mono text-[10px] text-white/50">{r.v}</span>
                  <span className="col-span-2 text-right">
                    <span className={`mono text-[9px] ${r.on ? 'text-mint' : 'text-white/30'}`}>{r.on ? 'ARMED' : 'OFF'}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-hairline mono text-[10px] uppercase tracking-widest text-white/40">
          <span>▸ render simulated · production data over websocket</span>
          <Link to="/cockpit" className="text-mint hover:underline">Open live cockpit →</Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Backtest section                                                          */
/* -------------------------------------------------------------------------- */

function BacktestSection() {
  return (
    <section className="px-5 sm:px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <SectionHeader
        number="03"
        kicker="Backtest"
        title={<>Six months <span className="font-serif italic text-mint">replayed</span> in twelve seconds.</>}
        body="See what your strategy would have done. See what your RMS would have done. See what the two together would have done. Then ship whichever wins."
      />

      <div className="mt-12 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 surface p-6 relative corner-ticks">
          <div className="tl" /><div className="tr" />
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <div className="mono text-[10px] uppercase tracking-widest text-white/40">Strategy + RMS · 6mo</div>
              <div className="mono text-4xl tabular-nums mt-1">₹24,87,300 <span className="text-mint text-base">+148.7%</span></div>
            </div>
            <div className="flex gap-4 mono text-xs">
              <div><span className="text-white/40">sharpe</span> <span className="text-mint">2.41</span></div>
              <div><span className="text-white/40">trades</span> <span>842</span></div>
              <div><span className="text-white/40">win%</span> <span className="text-mint">64.2</span></div>
              <div><span className="text-white/40">max DD</span> <span className="text-loss">-₹82K</span></div>
            </div>
          </div>
          <EquityChart data={BACKTESTS.combined.equityCurve} color="#A8FF60" height={300} markPeakAndTrough />
        </div>

        <div className="lg:col-span-4 surface p-6">
          <div className="mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Compare modes</div>
          <div className="space-y-2.5">
            {[
              { label: 'Strategy + RMS', v: '₹24.87L', s: '2.41', color: '#A8FF60' },
              { label: 'Strategy only',  v: '₹21.28L', s: '1.21', color: '#FBBF24' },
              { label: 'RMS only',       v: '₹18.14L', s: '2.07', color: '#22D3EE' },
            ].map((m) => (
              <div key={m.label} className="border-t border-hairline pt-2.5 first:border-0 first:pt-0">
                <div className="flex justify-between mb-1.5">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2" style={{ background: m.color }} />
                    {m.label}
                  </span>
                  <span className="mono tabular-nums">{m.v}</span>
                </div>
                <div className="mono text-[10px] text-white/40">sharpe {m.s}</div>
              </div>
            ))}
          </div>
          <Link to="/backtest" className="mt-6 inline-flex items-center gap-2 mono text-xs uppercase tracking-widest text-mint hover:underline">
            Run your own →
          </Link>
        </div>
      </div>

      <div className="mt-4 surface p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="mono text-[10px] uppercase tracking-widest text-white/40">Strategy performance · 12 months</div>
            <div className="font-serif italic text-lg mt-1">Every cell is replayable from raw ticks.</div>
          </div>
          <div className="flex items-center gap-3 mono text-[10px] text-white/40">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-mint/60" /> positive</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-loss/60" /> negative</span>
          </div>
        </div>
        <HeatMap data={PERFORMANCE_HEATMAP} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Market intel + candle chart                                               */
/* -------------------------------------------------------------------------- */

function MarketIntelSection() {
  return (
    <section className="px-5 sm:px-6 md:px-12 py-20 md:py-28 border-t border-hairline">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="mono text-mint text-[11px] tracking-[0.3em]">04 / 06</div>
          <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/35 mt-2">Market intel</div>
          <h3 className="heading-serif text-[clamp(2rem,4.5vw,4rem)] mt-5">
            2.4 thousand ticks per second, <span className="font-serif italic text-mint">normalised.</span>
          </h3>
          <p className="text-lg text-white/60 mt-5 leading-relaxed">
            Multi-exchange feed handlers, dedup-by-symbol, full L1 + L2 + DOM. Stored at tick resolution for a 10-year replay window. Built on our own event bus — not Kafka, not Redis Streams.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 max-w-md">
            <Field label="Exchanges"      value="NSE · BSE · MCX" />
            <Field label="Asset classes"  value="Equities · F&O · ETFs" />
            <Field label="Tick depth"     value="L1 + L2 + DOM" />
            <Field label="Replay window"  value="10 years · tick" />
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="surface-elevated p-5 relative corner-ticks">
            <div className="tl" /><div className="tr" />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl font-medium">NIFTY 50</span>
                <span className="mono text-lg tabular-nums">24,987.20</span>
                <span className="text-mint mono text-xs">+124.30 (+0.50%)</span>
              </div>
              <div className="flex gap-1 mono text-[10px]">
                {['1m', '5m', '15m', '1h', '1D'].map((r, i) => (
                  <span key={r} className={`px-2 py-0.5 ${i === 2 ? 'text-mint border border-mint' : 'text-white/40 border border-hairline'}`}>{r}</span>
                ))}
              </div>
            </div>
            <CandleChart height={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono text-[10px] uppercase tracking-widest text-white/35">{label}</div>
      <div className="text-sm mt-1">{value}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Payouts                                                                   */
/* -------------------------------------------------------------------------- */

function PayoutsSection() {
  return (
    <section className="py-20 md:py-28 border-y border-hairline bg-[#0A0C12]">
      <div className="px-5 sm:px-6 md:px-12 max-w-7xl mx-auto mb-10">
        <SectionHeader
          number="05"
          kicker="What it's paying"
          title={<>Real desks. Real receipts. Real <span className="font-serif italic text-mint">rupees.</span></>}
          body="Live snapshots from the platform's last 30 days. Names redacted to handles, amounts settled to verified UPI."
        />
      </div>
      <PayoutMarquee />

      <div className="px-5 sm:px-6 md:px-12 max-w-7xl mx-auto mt-14">
        <TestimonialBlock />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Closing — capability ledger                                               */
/* -------------------------------------------------------------------------- */

function CapabilityLedger() {
  const rows = [
    { n: '01', cap: 'Real-time tick ingestion',  detail: 'NSE · BSE · MCX with L1+L2 depth, 2.4k ticks/sec',     status: 'live' },
    { n: '02', cap: 'AI strategy library',       detail: '5 production strategies · 14 in research · custom DSL', status: 'live' },
    { n: '03', cap: 'Risk Management System',    detail: '9 hot-loaded rules, 12,418 evals/day, full audit log',  status: 'live' },
    { n: '04', cap: 'Smart Order Router',        detail: 'Multi-broker · 38ms p50 · slippage-aware',              status: 'live' },
    { n: '05', cap: 'Backtest engine',           detail: '10-year tick replay · 4 modes · 12s for 6-month run',   status: 'live' },
    { n: '06', cap: 'Mobile cockpit',            detail: 'iOS · Android · biometric kill-switch',                 status: 'beta' },
    { n: '07', cap: 'Custom strategy DSL',       detail: 'Write strategies in TypeScript · hot-deploy',           status: 'Q3' },
    { n: '08', cap: 'Pairs / basket trading',    detail: 'Multi-leg execution with delta-neutral guarantees',     status: 'Q4' },
  ];
  return (
    <section className="px-5 sm:px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <SectionHeader
        number="06"
        kicker="Capability ledger"
        title={<>What ships, what's <span className="font-serif italic text-mint">shipping.</span></>}
        body="No vapor. No 'coming soon' carousels. The work, dated."
      />
      <div className="mt-12 surface">
        {rows.map((r) => (
          <div
            key={r.n}
            className="grid grid-cols-12 items-center gap-4 px-6 py-5 border-t border-hairline first:border-0 hover:bg-[#0E1117] transition-colors"
          >
            <div className="col-span-1 mono text-mint text-[12px]">{r.n}</div>
            <div className="col-span-4 text-base font-medium">{r.cap}</div>
            <div className="col-span-5 text-sm text-white/55">{r.detail}</div>
            <div className="col-span-2 text-right">
              <span
                className={`mono text-[10px] uppercase tracking-widest px-2 py-1 ${
                  r.status === 'live'
                    ? 'bg-mint-soft text-mint border-mint'
                    : r.status === 'beta'
                    ? 'border border-amber-400/40 text-amber-300'
                    : 'border border-hairline text-white/40'
                } border`}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA                                                                       */
/* -------------------------------------------------------------------------- */

function CTA() {
  return (
    <section className="px-5 sm:px-6 md:px-12 py-20 md:py-32">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mono text-mint text-[11px] tracking-[0.3em]">end · transmission</div>
        <h2 className="heading-serif text-[clamp(2.8rem,7vw,6rem)] mt-6 leading-[0.95]">
          The desk is open.<br />
          <span className="font-serif italic text-mint">Take a seat.</span>
        </h2>
        <p className="text-lg text-white/60 mt-6 max-w-2xl mx-auto">
          Open the cockpit. Run a backtest. Wire a broker. Or just talk to us. We answer every email — usually within an hour.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/cockpit"
            className="px-8 py-4 bg-mint text-black mono text-xs uppercase tracking-widest hover:bg-[#7FFF8C] transition-colors"
          >
            Open the cockpit →
          </Link>
          <a
            href="mailto:info@o4f.co.in"
            className="px-8 py-4 surface-2 mono text-xs uppercase tracking-widest hover:border-mint transition-colors"
          >
            info@o4f.co.in
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-hairline px-5 sm:px-6 md:px-12 pt-14 pb-8 bg-[#06070A]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-5">
          <Logo className="text-3xl font-bold tracking-tighter" />
          <p className="font-serif italic text-lg text-white/65 max-w-sm leading-snug">
            A quant terminal for Indian retail, with the design discipline of a market-maker.
          </p>
          <div className="mono text-[10px] uppercase tracking-widest text-white/35 leading-relaxed">
            205, 3rd Cross, Sector 2 · HSR Layout<br />
            Bengaluru · Karnataka 560102 · IN<br />
            <span className="text-mint mt-2 inline-block">{TRUST_BAR.sebi}</span>
          </div>
        </div>
        <div className="md:col-span-2 space-y-2">
          <h4 className="mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Product</h4>
          <FooterLink to="/cockpit">Cockpit</FooterLink>
          <FooterLink to="/backtest">Backtest</FooterLink>
          <FooterLink to="/strategy">Strategies</FooterLink>
          <FooterLink to="/orders">Orders</FooterLink>
          <FooterLink to="/rms">RMS</FooterLink>
          <FooterLink to="/history">History</FooterLink>
        </div>
        <div className="md:col-span-2 space-y-2">
          <h4 className="mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Research</h4>
          <FooterLink to="/blogs">Blog</FooterLink>
          <FooterLink to="/blogs/ma-macd">Technical guides</FooterLink>
          <a href="mailto:info@o4f.co.in" className="block text-sm text-white/50 hover:text-white">info@o4f.co.in</a>
        </div>
        <div className="md:col-span-3 space-y-2">
          <h4 className="mono text-[10px] uppercase tracking-widest text-white/40 mb-3">Status</h4>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-mint pulse-dot" />
            All systems nominal
          </div>
          <div className="mono text-[10px] text-white/40">99.987% · 90-day uptime</div>
          <div className="mono text-[10px] text-white/40">38ms · median fill</div>
          <div className="mono text-[10px] text-white/40">v0.9.3 · cockpit</div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-hairline mono text-[10px] uppercase tracking-widest text-white/30 flex justify-between flex-wrap gap-3">
        <span>© 2026 O4F LLP · All rights reserved</span>
        <span>Built in Bengaluru · Trading the Indian market since '26</span>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="block text-sm text-white/50 hover:text-white transition-colors">
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                      */
/* -------------------------------------------------------------------------- */

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F2] overflow-x-hidden">
      <Navbar />
      <main className="pt-12">
        <LiveTicker />
        <Hero />
        <FoundersTicker />
        <ArchitectureSection />
        <CockpitSection />
        <BacktestSection />
        <MarketIntelSection />
        <PayoutsSection />
        <CapabilityLedger />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
