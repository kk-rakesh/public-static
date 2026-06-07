/**
 * HomePage v2 — "We are…" manifesto, refined pass.
 *
 *  · Heavier serif (700–900 weight), no italics.
 *  · Warm-ink black + cream sections + cobalt-blue accent (#3B5BFD).
 *  · Prototype screens carried through the page, not only the hero.
 *  · Tagline: "intelligent systems".
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Logo } from '../components/Logo';
import introVideoWebm from '../assets/intro-o4f.webm';
import introVideoMp4  from '../assets/intro-o4f-optimized.mp4';

const ROLES = [
  'statisticians',
  'engineers',
  'mathematicians',
  'researchers',
  'traders',
  'systems thinkers',
  'option theorists',
  'risk-managers',
  'platform builders',
  'pattern-finders',
];

const SCREENS = {
  dashboard:    '/screens/dashboard.png',
  strategies:   '/screens/strategies.png',
  rms:          '/screens/rms.png',
  orders:       '/screens/orders.png',
  approve:      '/screens/approve.png',
  pipeline:     '/screens/pipeline.png',
  backtest:     '/screens/backtest-chart.png',
  backtestForm: '/screens/backtest-modal.png',
};

const COBALT = '#3B5BFD';
const COBALT_SOFT = '#5C77FF';
const INK = '#0A0B10';
const CREAM = '#F2EFE6';
const CREAM_DEEP = '#E8E2D2';

/* -------------------------------------------------------------------------- */
/* Video hero — first screen (ported from master)                             */
/* Master parity: full-bleed video + centered "We are [rotating]" headline,  */
/* ProcessingWave, subtitle, dual CTAs. Kept verbatim per request.            */
/* -------------------------------------------------------------------------- */

const ROTATING_MARKET_ROLES = [
  'engineers',
  'mathematicians',
  'researchers',
  'traders',
  'developers',
  'systems thinkers',
  'risk-managers',
  'platform builders',
  'fintech experts',
] as const;

function RotatingMarketIdentity() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const typedTextRef = useRef('');

  useEffect(() => {
    let active = true;
    let phase: 'typing' | 'paused_full' | 'deleting' | 'paused_empty' = 'typing';
    const currentRole = ROTATING_MARKET_ROLES[roleIndex];
    let phaseStartTime = performance.now();
    typedTextRef.current = '';
    setTypedText('');

    const tick = (now: number) => {
      if (!active) return;
      const elapsed = now - phaseStartTime;

      if (phase === 'typing') {
        const lettersToShow = Math.min(currentRole.length, Math.floor(elapsed / 100));
        const nextText = currentRole.slice(0, lettersToShow);
        if (nextText !== typedTextRef.current) {
          typedTextRef.current = nextText;
          setTypedText(nextText);
        }
        if (lettersToShow >= currentRole.length) {
          phase = 'paused_full';
          phaseStartTime = now;
        }
      } else if (phase === 'paused_full') {
        if (elapsed >= 1500) {
          phase = 'deleting';
          phaseStartTime = now;
        }
      } else if (phase === 'deleting') {
        const lettersToKeep = Math.max(0, currentRole.length - Math.floor(elapsed / 50));
        const nextText = currentRole.slice(0, lettersToKeep);
        if (nextText !== typedTextRef.current) {
          typedTextRef.current = nextText;
          setTypedText(nextText);
        }
        if (lettersToKeep === 0) {
          phase = 'paused_empty';
          phaseStartTime = now;
        }
      } else if (phase === 'paused_empty') {
        if (elapsed >= 400) {
          const nextIndex = (roleIndex + 1) % ROTATING_MARKET_ROLES.length;
          setRoleIndex(nextIndex);
          return;
        }
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { active = false; };
  }, [roleIndex]);

  return (
    <span className="inline-flex items-center text-primary w-[10ch] sm:w-[12ch] md:w-[18ch]">
      <span>{typedText || '​'}</span>
      <span className="ml-1 h-[0.9em] w-[4px] bg-primary cursor-blink" aria-hidden="true" />
    </span>
  );
}

function ProcessingWave({ color = 'bg-secondary' }: { color?: string }) {
  return (
    <div className="flex items-center gap-1 h-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className={`block w-1 rounded-full ${color}`}
          style={{ animation: `wave-bar 1s ${i * 0.1}s ease-in-out infinite alternate` }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          from { height: 8px; }
          to   { height: 24px; }
        }
      `}</style>
    </div>
  );
}

function VideoHero() {
  return (
    <section
      id="home"
      className="master-hero-scope relative min-h-[100svh] md:min-h-screen flex items-center justify-center horizontal-padding overflow-x-hidden touch-pan-y"
    >
      <div className="absolute inset-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={SCREENS.backtest}
          className="w-full h-full object-cover video-hero-bg"
        >
          <source src={introVideoWebm} type="video/webm" />
          <source src={introVideoMp4}  type="video/mp4" />
        </video>
        {/* Multi-pass overlay: dark veil + cobalt vignette + film grain.
            Gives the low-res source video extra depth without replacing it. */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 40%, rgba(10,11,16,0.55) 100%)` }} />
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.05] pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
      </div>

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-primary/12 rounded-full blur-[72px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[320px] h-[320px] bg-secondary/12 rounded-full blur-[64px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full z-10 py-24 flex justify-center px-5 sm:px-6 md:px-8">
        <div className="flex flex-col gap-7 sm:gap-8 items-center text-center">
          <h1
            className="heading-italic font-semibold text-white leading-[0.96]"
            style={{ fontSize: 'clamp(2.4rem, 7.2vw, 6.5rem)' }}
          >
            Infrastructure for{' '}
            <span style={{ color: 'hsl(258 100% 68%)' }}>Intelligent</span> Systems
          </h1>

          <div className="mt-1 origin-center scale-x-125">
            <ProcessingWave color="bg-secondary" />
          </div>

          <p className="body-light text-xl sm:text-2xl md:text-3xl text-white/90 font-semibold max-w-4xl">
            AI-native platforms powering real-time data, ultra-low latency compute, and autonomous decision systems.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#waitlist"
              className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-body hover:bg-white/10 transition-all text-center"
            >
              Join the waitlist
            </a>
            <a
              href="#manifesto"
              className="border border-white/10 rounded-full px-8 py-4 text-sm font-body hover:bg-white/5 transition-all text-center"
            >
              Read the manifesto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Equalizer kept for backward-compat with anything else that imports it */
function Equalizer() {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="block w-[3px] rounded-full"
          style={{
            background: COBALT_SOFT,
            animation: `eq-bar 1.2s ${i * 0.08}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes eq-bar {
          from { height: 5px; opacity: 0.45; }
          to   { height: 24px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Top bar                                                                    */
/* -------------------------------------------------------------------------- */

function TopBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between"
        style={{ mixBlendMode: 'difference' }}
      >
        <Link to="/v2" className="flex items-center gap-3 min-w-0">
          <Logo className="text-xl font-bold tracking-tighter text-white shrink-0" />
          <span className="hidden lg:inline font-sans font-medium text-[13px] tracking-[-0.005em] text-white/85 whitespace-nowrap">
            intelligent systems
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[13px] font-medium text-white/80">
          <a href="#manifesto" className="hover:text-white">Manifesto</a>
          <a href="#platform"  className="hover:text-white">Platform</a>
          <a href="#method"    className="hover:text-white">Method</a>
          <Link to="/blogs"    className="hover:text-white">Research</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center px-3 lg:px-4 py-2 text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.14em] border border-white/85 hover:bg-white hover:text-black transition-colors text-white whitespace-nowrap"
          >
            Join the waitlist →
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 grid place-items-center text-white"
            aria-label="Open navigation"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {open && (
        <div className="fixed inset-0 z-[60]" style={{ background: 'rgba(10,11,16,0.96)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <Link to="/v2" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <Logo className="text-xl font-bold tracking-tighter text-white" />
              <span className="font-sans font-medium text-[13px] text-white/85">intelligent systems</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-10 h-10 grid place-items-center text-white"
              aria-label="Close navigation"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-5 pt-8 pb-12 gap-1 text-white">
            {[
              { href: '#manifesto', label: 'Manifesto', external: false },
              { href: '#platform',  label: 'Platform',  external: false },
              { href: '#method',    label: 'Method',    external: false },
              { to:   '/blogs',     label: 'Research',  external: true  },
            ].map((l) => (
              l.external
                ? <Link key={l.label} to={l.to as string} onClick={() => setOpen(false)} className="font-serif text-[clamp(2rem,9vw,3rem)] leading-tight tracking-[-0.02em] py-2 border-b border-white/10" style={{ fontWeight: 700 }}>{l.label}</Link>
                : <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-serif text-[clamp(2rem,9vw,3rem)] leading-tight tracking-[-0.02em] py-2 border-b border-white/10" style={{ fontWeight: 700 }}>{l.label}</a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-3 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.14em]"
              style={{ background: COBALT, color: 'white' }}
            >
              Join the waitlist →
            </a>
            <div className="mt-auto pt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Early access · 2026 · Bengaluru
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: INK }}>
      {/* Soft ambient cobalt glow behind the chart so it doesn't sit flat on the ink */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{ background: `radial-gradient(circle, ${COBALT}33 0%, transparent 60%)` }} />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: `radial-gradient(circle, ${COBALT}22 0%, transparent 65%)` }} />

      {/* Subtle hairline grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.18]"
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      <div className="relative z-10 w-full px-5 sm:px-6 md:px-10 lg:px-14 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT: copy (33%) — overflow-hidden so a long rotating word
              can never bleed onto the chart collage on the right ────── */}
          <div className="lg:col-span-4 order-1 min-w-0 overflow-hidden">
            <div className="font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] sm:tracking-[0.32em] mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 flex-wrap" style={{ color: 'rgba(242,239,230,0.6)' }}>
              <span className="w-6 sm:w-9 h-px" style={{ background: COBALT }} />
              <span style={{ color: COBALT_SOFT, fontWeight: 600 }}>01 / 06</span>
              <span>·</span>
              <span>The desk</span>
            </div>

            {/* Headline — sized so the longest rotating word ("platform builders",
                "mathematicians") fits inside the left column at the lg breakpoint. */}
            <h1
              className="font-serif relative z-0 leading-[1.02] tracking-[-0.025em] text-white max-w-full"
              style={{
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.6vw, 3.4rem)',
              }}
            >
              <span className="block">We are</span>
              <span className="block"><RotatingRole /></span>
            </h1>

            <p className="mt-8 md:mt-10 max-w-xl text-[16px] sm:text-[18px] md:text-[20px] leading-[1.55] text-white/82" style={{ fontWeight: 400 }}>
              We build the machines that read Indian markets — millisecond by millisecond, tick by tick — and decide what to do with them.
            </p>
            <p className="mt-3 sm:mt-4 max-w-xl text-[14px] sm:text-[16px] md:text-[18px] leading-[1.55] text-white/55" style={{ fontWeight: 400 }}>
              Not a brokerage. Not a research house. A desk.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center sm:justify-start gap-3 px-6 sm:px-7 py-4 font-semibold tracking-[0.08em] text-[12px] sm:text-[13px] uppercase transition-all w-full sm:w-auto"
                style={{ background: COBALT, color: 'white', boxShadow: `0 14px 40px -12px ${COBALT}` }}
              >
                Join the waitlist <span aria-hidden>→</span>
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center justify-center sm:justify-start gap-3 text-[12px] sm:text-[13px] tracking-[0.16em] uppercase border-b border-white/40 hover:border-white pb-1 text-white font-medium self-start"
              >
                Read the manifesto
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 max-w-2xl font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/45">
              <Status k="09:15 IST" v="markets opening" />
              <Status k="2,418 /s" v="ticks normalised" cobalt />
              <Status k="9 rules" v="rms armed" />
              <Status k="3 brokers" v="all nominal" />
            </div>
          </div>

          {/* RIGHT: collage stack (sits ABOVE the headline so the rotating word
              flows behind the chart) ─────────────────────────────────── */}
          <div className="lg:col-span-8 order-2 relative z-10">
            <ScreenStack />

            {/* Caption under the stack */}
            <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 px-1">
              <span>Backtest · Dashboard · Strategies · RMS · Pipeline</span>
              <span style={{ color: COBALT_SOFT, fontWeight: 600 }}>5 screens · live data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stack of 6 prototype screens — chart in front (primary, uncropped, brightest),
 * RMS / Pipeline / Strategies / Orders / Dashboard fanned out behind it.
 * Each tile is clipped to its own rounded box, so even small rotations don't
 * leak past the container.
 */
/**
 * Collage layout — chart in the centre, supporting screens fanned out
 * behind it at rotation. All tiles visible, primary chart on top.
 * Sized in % of container so the whole thing scales cleanly with zoom and
 * across breakpoints. Container has overflow-hidden so rotated corners
 * never spill into the headline column.
 */
function ScreenStack() {
  // Tiles fanned tightly around the centre chart. Bigger tilts (10–20°),
  // closer to the chart so the whole thing feels like a stack of paper.
  // (x,y) is the centre of each tile as a % of the collage box.
  const fans = [
    { src: SCREENS.strategies, x: 22, y: 16, w: 50, r: -16, z: 2, label: 'Strategies' },
    { src: SCREENS.dashboard,  x: 78, y: 12, w: 52, r:  14, z: 3, label: 'Dashboard'  },
    { src: SCREENS.rms,        x: 16, y: 70, w: 50, r:  18, z: 2, label: 'RMS rules'  },
    { src: SCREENS.pipeline,   x: 82, y: 74, w: 50, r: -13, z: 3, label: 'Pipeline'   },
    { src: SCREENS.orders,     x: 50, y: 92, w: 48, r:   6, z: 1, label: 'Orders'     },
  ];

  return (
    <div className="relative collage-root">
      {/* Cobalt glow ring behind the whole collage */}
      <div className="absolute -inset-12 pointer-events-none rounded-[40px]"
           style={{ background: `radial-gradient(ellipse at center, ${COBALT}33 0%, transparent 70%)`, filter: 'blur(48px)' }} />

      {/* Collage box — fixed aspect ratio so it scales predictably */}
      <div
        className="relative w-full"
        style={{ aspectRatio: '1.18 / 1' }}
      >
        {/* SUPPORTING TILES fanned around the chart */}
        {fans.map((t, i) => (
          <div
            key={t.label}
            className="collage-tile absolute rounded-md overflow-hidden cursor-default"
            style={{
              left: `${t.x}%`,
              top:  `${t.y}%`,
              width: `${t.w}%`,
              ['--tile-rotate' as string]: `${t.r}deg`,
              transform: `translate(-50%, -50%) rotate(${t.r}deg)`,
              zIndex: t.z,
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 18px 30px -14px rgba(0,0,0,0.55)',
              background: '#0a0c12',
              opacity: 0,
              animation: `tile-pop 0.9s ${0.15 + i * 0.1}s cubic-bezier(0.2,0.7,0.2,1) forwards`,
            }}
          >
            <div className="tile-frame relative" style={{ aspectRatio: '1600 / 1013' }}>
              <img
                src={t.src}
                alt={t.label}
                className="tile-img block w-full h-full object-cover transition-[filter] duration-400"
                style={{ filter: 'contrast(1.05) saturate(1) brightness(0.7)' }}
              />
              <div
                className="tile-veil absolute inset-0 transition-opacity duration-400"
                style={{ background: 'linear-gradient(155deg, rgba(10,11,16,0.22), rgba(10,11,16,0.55))' }}
              />
            </div>
            <div className="absolute top-1.5 left-1.5 font-mono text-[8px] uppercase tracking-[0.18em] px-1.5 py-0.5 transition-colors duration-400"
                 style={{ background: 'rgba(10,11,16,0.7)', color: COBALT_SOFT, fontWeight: 600 }}>
              {t.label}
            </div>
          </div>
        ))}

        {/* PRIMARY: cropped chart, centred, on top, brightest, no rotation */}
        <div
          className="collage-tile collage-tile--primary absolute rounded-md overflow-hidden cursor-default"
          style={{
            left: '50%',
            top:  '48%',
            width: '78%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            border: `1px solid ${COBALT}66`,
            boxShadow: `0 40px 100px -28px ${COBALT}99, 0 12px 30px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)`,
            background: '#0a0c12',
            opacity: 0,
            animation: 'tile-pop 0.9s 0.05s cubic-bezier(0.2,0.7,0.2,1) forwards',
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06]" style={{ background: 'rgba(0,0,0,0.45)' }}>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <span className="w-2 h-2 rounded-full bg-[#28C840]" />
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] truncate px-2" style={{ color: COBALT_SOFT, fontWeight: 600 }}>
              ▸ live · test3 · ma_crossover · BSE · 1m
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 whitespace-nowrap">
              09:15 → 10:30
            </span>
          </div>

          {/* Chart-only crop */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '1320 / 480' }}>
            <img
              src={SCREENS.backtest}
              alt="Candles, indicators, price"
              className="tile-img absolute block transition-[filter] duration-400"
              style={{
                width: '121%',
                maxWidth: 'none',
                right: 0,
                bottom: 0,
                filter: 'contrast(1.08) saturate(1.08) brightness(1.02)',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tile-pop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Hover lift — supporting tiles brighten & rise to top while user reads
           them. Primary chart gets a softer brightness pop. Cursor stays default
           so users don't think they can click into a route. */
        .collage-tile {
          transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.45s ease;
          will-change: transform;
        }
        .collage-tile:hover {
          z-index: 40 !important;
          transform: translate(-50%, -50%) rotate(var(--tile-rotate, 0deg)) scale(1.04) !important;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(92,119,255,0.45);
        }
        .collage-tile:hover .tile-img {
          filter: contrast(1.1) saturate(1.08) brightness(1.04) !important;
        }
        .collage-tile:hover .tile-veil {
          opacity: 0;
        }
        .collage-tile--primary:hover {
          transform: translate(-50%, -50%) scale(1.025) !important;
          box-shadow: 0 50px 130px -30px ${COBALT}cc, 0 18px 40px -10px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .collage-tile--primary:hover .tile-img {
          filter: contrast(1.12) saturate(1.12) brightness(1.06) !important;
        }
      `}</style>
    </div>
  );
}

function Status({ k, v, cobalt }: { k: string; v: string; cobalt?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[16px] sm:text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] text-white" style={{ color: cobalt ? COBALT_SOFT : 'white', fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}>{k}</span>
      <span className="text-[9px] sm:text-[10px]">{v}</span>
    </div>
  );
}

/* Rotating identity word with HRT-style blinking cursor caret */
function RotatingRole() {
  const [i, setI] = useState(0);
  // Type-in / type-out cadence: build word, hold, erase, swap, repeat
  const [typed, setTyped] = useState(ROLES[0]);
  const [phase, setPhase] = useState<'hold' | 'erasing' | 'typing'>('hold');

  useEffect(() => {
    const word = ROLES[i];
    let timer: number;
    if (phase === 'hold') {
      timer = window.setTimeout(() => setPhase('erasing'), 1800);
    } else if (phase === 'erasing') {
      if (typed.length === 0) {
        setI((x) => (x + 1) % ROLES.length);
        setPhase('typing');
      } else {
        timer = window.setTimeout(() => setTyped(typed.slice(0, -1)), 38);
      }
    } else {
      if (typed.length === word.length) {
        setPhase('hold');
      } else {
        timer = window.setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 70);
      }
    }
    return () => window.clearTimeout(timer);
  }, [phase, typed, i]);

  return (
    <span className="inline-flex items-center" style={{ color: COBALT_SOFT, fontWeight: 800 }}>
      <span className="whitespace-nowrap">{typed || '​'}</span>
      <span
        className="ml-[0.08em] inline-block cursor-blink shrink-0"
        aria-hidden
        style={{
          width: '6px',
          height: '0.82em',
          background: COBALT_SOFT,
          boxShadow: `0 0 18px ${COBALT_SOFT}99`,
          borderRadius: '1px',
          transform: 'translateY(0.04em)',
        }}
      />
    </span>
  );
}

/* Six angled prototype screens forming the hero background */
function ScreenMosaic() {
  const tiles = [
    // Chart is the hero tile — biggest, frontmost, brightest.
    // Pulled in from the right edge and rotation softened so nothing crops.
    { src: SCREENS.backtest,   top: '14%',  left: '42%', w: 720, rotate: -3,  z: 9, delay: 0,   bright: true },
    { src: SCREENS.strategies, top: '56%',  left: '36%', w: 560, rotate:  4,  z: 5, delay: 0.4 },
    { src: SCREENS.rms,        top: '4%',   left: '68%', w: 460, rotate: -6,  z: 4, delay: 0.7 },
    { src: SCREENS.orders,     top: '60%',  left: '66%', w: 460, rotate: -2,  z: 3, delay: 1.0 },
    { src: SCREENS.pipeline,   top: '2%',   left: '24%', w: 380, rotate:  5,  z: 2, delay: 1.3 },
    { src: SCREENS.dashboard,  top: '64%',  left: '20%', w: 420, rotate:  4,  z: 1, delay: 1.6 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {tiles.map((t, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: t.top,
            left: t.left,
            width: t.w,
            transform: `rotate(${t.rotate}deg)`,
            zIndex: t.z,
            opacity: 0,
            filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))',
            animation: `tile-in 1.4s ${t.delay}s cubic-bezier(0.2, 0.7, 0.2, 1) forwards, tile-drift 22s ${t.delay + 1.5}s ease-in-out infinite alternate`,
          }}
        >
          <div className="relative" style={{ aspectRatio: '1600 / 1100' }}>
            <img
              src={t.src}
              alt=""
              className="w-full h-full object-cover"
              style={{
                border: t.bright ? '1px solid rgba(92,119,255,0.35)' : '1px solid rgba(255,255,255,0.08)',
                filter: t.bright ? 'brightness(0.96) contrast(1.08) saturate(1.1)' : 'brightness(0.78) contrast(1.05) saturate(0.9)',
                boxShadow: t.bright ? '0 40px 90px -30px rgba(59,91,253,0.45)' : undefined,
              }}
            />
            <div className="absolute inset-0" style={{ background: t.bright ? 'linear-gradient(155deg, rgba(13,16,22,0.0), rgba(13,16,22,0.18))' : `linear-gradient(155deg, rgba(13,16,22,0.28), rgba(13,16,22,0.65))` }} />
          </div>
        </div>
      ))}
      <style>{`
        @keyframes tile-in { from { opacity: 0; transform: rotate(var(--r, 0deg)) scale(0.96) translateY(20px); } to { opacity: 0.95; } }
        @keyframes tile-drift { from { translate: 0 0; } to { translate: -10px 14px; } }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Manifesto                                                                  */
/* -------------------------------------------------------------------------- */

function Manifesto() {
  return (
    <section id="manifesto" className="px-5 sm:px-6 md:px-14 py-20 sm:py-28 md:py-48" style={{ background: CREAM, color: INK }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-3">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] md:sticky md:top-32" style={{ color: 'rgba(10,11,16,0.55)' }}>
            <div className="mb-2" style={{ color: COBALT, fontWeight: 600 }}>02 / 06</div>
            <div>The manifesto</div>
          </div>
        </div>
        <div className="md:col-span-9 space-y-8 sm:space-y-12">
          <h2 className="font-serif text-[clamp(2rem,6vw,6rem)] leading-[1.04] tracking-[-0.02em] max-w-[18ch]" style={{ fontWeight: 800 }}>
            Markets are noisy.<br />
            <span style={{ color: COBALT, fontWeight: 800 }}>The right machine</span> is patient.
          </h2>

          <div className="space-y-6 sm:space-y-8 text-[16px] sm:text-[19px] md:text-[22px] leading-[1.55] max-w-3xl" style={{ color: 'rgba(10,11,16,0.82)', fontWeight: 400 }}>
            <p>
              O4F was founded on a small observation: the Indian options and futures markets are wide enough, deep enough, and now fast enough that the gap between a good intuition and a great execution is wider than most people think.
            </p>
            <p>
              The instruments don't reward genius. They reward <strong style={{ fontWeight: 700, color: INK }}>discipline at the seconds-scale</strong> — the kind only software can hold for eight hours a day, every day, without bargaining with itself.
            </p>
            <p>
              We build that software. We host it next to the exchange. We pipe it through risk rules our worst day taught us. We replay our last six months every weekend, and we keep what survives.
            </p>
            <p style={{ color: COBALT, fontWeight: 600 }}>
              We do not predict the market. We listen to it.
            </p>
          </div>

          <div className="pt-8 sm:pt-10 border-t font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em]" style={{ borderColor: 'rgba(10,11,16,0.15)', color: 'rgba(10,11,16,0.5)' }}>
            Signed · the founding desk · Bengaluru · 2026
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Pillars — Research / Risk / Replay / Trade                                 */
/* -------------------------------------------------------------------------- */

const PILLARS = [
  { word: 'Research', tag: 'Question',  body: "Every signal starts as a question. We model the option chain, the order book, the price-volume tape. We test the question against ten years of Indian tick data. If it survives, it becomes a strategy.", detail: '12,418 backtest runs · 7 research notes · 0 black boxes' },
  { word: 'Risk',     tag: 'Constraint', body: 'Risk is the only product we sell to ourselves. Nine rules sit between every signal and the broker. Position size, loss caps, volatility gates, news blackouts — every one of them was written by an outage.', detail: '9 rules · 12,418 evals/day · 2-factor on every change' },
  { word: 'Replay',   tag: 'Verify',     body: "We do not run experiments live. Every weekend we replay the last six months — tick for tick — with the new code in. If next Monday's behaviour cannot be derived from last Friday's tape, the code does not ship.", detail: '6 months replayed in 12 seconds · tick-level reproducibility' },
  { word: 'Trade',    tag: 'Execute',    body: 'Execution is the last 38 milliseconds. Three brokers, smart routing, slippage-aware sizing. We do not optimise for fee rebates; we optimise for fills that match what the model said.', detail: '38 ms median · 3 brokers · 14 bps avg slippage saved' },
];

function Pillars() {
  return (
    <section id="method" className="px-5 sm:px-6 md:px-14 py-20 sm:py-28 md:py-48" style={{ background: INK, color: CREAM }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: COBALT, fontWeight: 600 }}>03 / 06</div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/55">How we think</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2rem,6vw,6rem)] leading-[1.04] tracking-[-0.02em] max-w-[18ch] text-white" style={{ fontWeight: 800 }}>
              Four words.<br />
              <span style={{ color: COBALT_SOFT, fontWeight: 800 }}>In this order.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
          {PILLARS.map((p, i) => (
            <article key={p.word} className="p-6 sm:p-10 md:p-14 group transition-colors hover:bg-[#11131A]" style={{ background: INK }}>
              <div className="flex items-baseline justify-between mb-5 sm:mb-8">
                <span className="font-mono text-[12px] sm:text-[14px] tracking-[0.25em]" style={{ color: COBALT_SOFT, fontWeight: 600 }}>0{i + 1}</span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">{p.tag}</span>
              </div>
              <h3 className="font-serif text-[clamp(2.2rem,5vw,5rem)] leading-none tracking-[-0.025em] mb-5 sm:mb-7 text-white" style={{ fontWeight: 800 }}>
                {p.word}<span style={{ color: COBALT }}>.</span>
              </h3>
              <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-[1.65] text-white/72 max-w-md" style={{ fontWeight: 400 }}>
                {p.body}
              </p>
              <div className="mt-7 sm:mt-10 pt-4 sm:pt-5 border-t font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {p.detail}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Platform — sticky scroll-swap. Left = 4 features (long vertical stack).    */
/* Right = one sticky terminal frame that crossfades through 4 screenshots    */
/* as the active feature changes. Mobile fallback: plain stack, no sticky.    */
/* -------------------------------------------------------------------------- */

type PlatformFeature = {
  id: string;
  title: string;
  body: string;
  screen: string;
  label: string;
};

const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 'cockpit',
    title: 'The cockpit.',
    body: "One screen. Your live portfolio, today's signals, every broker's health.",
    screen: SCREENS.dashboard,
    label: 'Cockpit · live portfolio',
  },
  {
    id: 'backtest',
    title: 'The backtest.',
    body: 'Replay any strategy against six months of Indian tick data. Indicators, BUY/SELL markers, PnL — frame by frame.',
    screen: SCREENS.backtest,
    label: 'Backtest · test3 · ma_crossover · BSE',
  },
  {
    id: 'library',
    title: 'The library.',
    body: 'Every strategy has an explainer, a simulator, a backtest, and (when ready) a live feed.',
    screen: SCREENS.strategies,
    label: 'Strategy library',
  },
  {
    id: 'risk',
    title: 'The risk system.',
    body: 'Nine rules. Every signal evaluated. Every change audit-logged and two-factor approved.',
    screen: SCREENS.rms,
    label: 'RMS rules',
  },
];

function PlatformStickyScroll() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Pick the feature whose vertical center is closest to viewport center.
  // Lightweight setTimeout throttle (works even when the tab is hidden,
  // unlike rAF which the browser pauses).
  useEffect(() => {
    let pending = false;
    const tick = () => {
      pending = false;
      const viewportCenter = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      featureRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.height === 0) return; // skip hidden (mobile) duplicates
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive((prev) => (prev !== best ? best : prev));
    };
    const onScroll = () => {
      if (!pending) {
        pending = true;
        setTimeout(tick, 16);
      }
    };
    // Initial measure (deferred so refs are settled after mount)
    setTimeout(tick, 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="platform" className="px-5 sm:px-6 md:px-14 py-20 sm:py-28 md:py-44" style={{ background: CREAM, color: INK }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 sm:mb-16">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: COBALT, fontWeight: 600 }}>04 / 06</div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em]" style={{ color: 'rgba(10,11,16,0.55)' }}>The platform</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[1.04] tracking-[-0.02em]" style={{ fontWeight: 800 }}>
              One desk. <span style={{ color: COBALT, fontWeight: 800 }}>Open-eyed.</span>
            </h2>
          </div>
        </div>

        {/* DESKTOP: sticky scroll-swap (hidden on mobile) */}
        <div className="hidden lg:grid lg:grid-cols-10 lg:gap-14 relative">
          {/* LEFT: 4 features stacked far apart so each gets its own viewport center */}
          <div className="lg:col-span-4 flex flex-col">
            {PLATFORM_FEATURES.map((f, i) => {
              const isActive = i === active;
              return (
                <div
                  key={f.id}
                  ref={(el) => { featureRefs.current[i] = el; }}
                  className="py-[28vh] first:pt-[14vh] last:pb-[28vh] transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0.32 }}
                >
                  <div
                    className="pl-6 transition-all duration-500"
                    style={{
                      borderLeft: `2px solid ${isActive ? COBALT : 'rgba(10,11,16,0.12)'}`,
                    }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3"
                         style={{ color: isActive ? COBALT : 'rgba(10,11,16,0.4)', fontWeight: 600 }}>
                      0{i + 1} · {f.id}
                    </div>
                    <h3 className="font-serif text-[clamp(2.2rem,3.6vw,3.8rem)] leading-[1.04] tracking-[-0.015em] mb-4" style={{ fontWeight: 800 }}>
                      {f.title}
                    </h3>
                    <p className="text-[16px] md:text-[18px] leading-[1.55] max-w-md" style={{ color: 'rgba(10,11,16,0.7)' }}>
                      {f.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: sticky terminal frame, crossfades through 4 screenshots */}
          <div className="lg:col-span-6">
            <div className="sticky" style={{ top: 'calc(50vh - 30vh)', alignSelf: 'start' }}>
              <PlatformFrame
                active={active}
                features={PLATFORM_FEATURES}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET fallback: plain vertical stack, no sticky / no crossfade */}
        <div className="lg:hidden space-y-14">
          {PLATFORM_FEATURES.map((f, i) => (
            <article key={f.id} className="space-y-5">
              <div
                className="pl-5"
                style={{ borderLeft: `2px solid ${COBALT}` }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2"
                     style={{ color: COBALT, fontWeight: 600 }}>
                  0{i + 1} · {f.id}
                </div>
                <h3 className="font-serif text-[clamp(1.8rem,5vw,2.6rem)] leading-tight tracking-[-0.015em]" style={{ fontWeight: 800 }}>
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.55] max-w-md" style={{ color: 'rgba(10,11,16,0.7)' }}>
                  {f.body}
                </p>
              </div>
              <StaticFrame src={f.screen} label={f.label} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformFrame({
  active,
  features,
  reducedMotion,
}: {
  active: number;
  features: PlatformFeature[];
  reducedMotion: boolean;
}) {
  return (
    <div className="relative">
      {/* Soft cobalt glow ring */}
      <div className="absolute -inset-8 pointer-events-none"
           style={{ background: `radial-gradient(ellipse at center, ${COBALT}26 0%, transparent 70%)`, filter: 'blur(36px)' }} />

      <div
        className="relative overflow-hidden rounded-md"
        style={{
          border: `1px solid ${COBALT}40`,
          background: '#0a0c12',
          boxShadow: `0 30px 80px -28px ${COBALT}55, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06]" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500"
               style={{ color: COBALT_SOFT, fontWeight: 600 }}>
            ▸ {features[active].label}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            0{active + 1} / 0{features.length}
          </span>
        </div>

        {/* Stacked screenshots — only the active one is opaque */}
        <div className="relative" style={{ aspectRatio: '1600 / 1100' }}>
          {features.map((f, i) => {
            const isActive = i === active;
            return (
              <img
                key={f.id}
                src={f.screen}
                alt={f.title}
                className="absolute inset-0 w-full h-full object-cover will-change-[opacity,transform]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: reducedMotion
                    ? 'none'
                    : `scale(${isActive ? 1 : 0.985})`,
                  transition: reducedMotion
                    ? 'opacity 0.45s ease'
                    : 'opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'contrast(1.06) saturate(1.06)',
                  zIndex: isActive ? 2 : 1,
                }}
                loading="eager"
              />
            );
          })}
        </div>
      </div>

      {/* Tiny progress dots beneath the frame */}
      <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(10,11,16,0.45)' }}>
        <div className="flex items-center gap-2">
          {features.map((_, i) => (
            <span
              key={i}
              className="block transition-all duration-400 rounded-full"
              style={{
                width: i === active ? '24px' : '8px',
                height: '4px',
                background: i === active ? COBALT : 'rgba(10,11,16,0.18)',
              }}
            />
          ))}
        </div>
        <span style={{ color: COBALT_SOFT, fontWeight: 600 }}>scroll to swap →</span>
      </div>
    </div>
  );
}

function StaticFrame({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-md"
      style={{
        border: `1px solid ${COBALT}33`,
        background: '#0a0c12',
        boxShadow: `0 20px 50px -20px ${COBALT}44`,
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06]" style={{ background: 'rgba(0,0,0,0.4)' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: COBALT_SOFT, fontWeight: 600 }}>
          ▸ {label}
        </div>
        <span className="w-10" />
      </div>
      <img src={src} alt={label} className="block w-full h-auto" style={{ filter: 'contrast(1.05) saturate(1.05)' }} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Product strip — three screens with captions                                */
/* -------------------------------------------------------------------------- */

function ProductStrip() {
  const featured = {
    src: SCREENS.backtest,
    title: 'The backtest.',
    body: 'Replay any strategy against six months of Indian tick data. Indicators, BUY/SELL markers, PnL — frame by frame.',
    cta: { to: '/backtest', label: 'Run a backtest' },
    badge: '01 · live',
  };
  const items = [
    { src: SCREENS.dashboard,  title: 'The cockpit.',     body: "One screen. Your live portfolio, today's signals, every broker's health.",         cta: { to: '/cockpit', label: 'Open cockpit'  }, badge: '02 · live' },
    { src: SCREENS.strategies, title: 'The library.',     body: 'Every strategy has an explainer, a simulator, a backtest, and (when ready) a live feed.', cta: { to: '/strategy', label: 'See strategies' }, badge: '03 · live' },
    { src: SCREENS.rms,        title: 'The risk system.', body: 'Nine rules. Every signal evaluated. Every change audit-logged and two-factor approved.', cta: { to: '/rms',      label: 'See the rules'  }, badge: '04 · live' },
    { src: SCREENS.pipeline,   title: 'The pipeline.',    body: 'Signal → RMS → OMS. Dry-runs trace every broker hop without placing a real order.',         cta: { to: '/cockpit',  label: 'View pipeline'  }, badge: '05 · live' },
  ];
  return (
    <section className="px-5 sm:px-6 md:px-14 py-20 sm:py-28 md:py-44" style={{ background: CREAM, color: INK }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 sm:mb-16">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: COBALT, fontWeight: 600 }}>04 / 06</div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em]" style={{ color: 'rgba(10,11,16,0.55)' }}>The product</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[1.04] tracking-[-0.02em] max-w-[18ch]" style={{ fontWeight: 800 }}>
              What we built. <span style={{ color: COBALT, fontWeight: 800 }}>Open-eyed.</span>
            </h2>
          </div>
        </div>

        {/* Featured chart screen — full width, the hero of this section */}
        <article className="mb-12 sm:mb-16 md:mb-20 group">
          <div
            className="relative overflow-hidden"
            style={{
              border: `1px solid ${COBALT}33`,
              background: CREAM_DEEP,
              boxShadow: `0 30px 80px -30px ${COBALT}55`,
            }}
          >
            <img
              src={featured.src}
              alt={featured.title}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
              style={{ filter: 'contrast(1.06) saturate(1.06)' }}
            />
            <span className="absolute top-3 sm:top-4 left-3 sm:left-4 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.22em] px-2 sm:px-3 py-1 sm:py-1.5" style={{ background: COBALT, color: 'white', fontWeight: 600 }}>
              <span className="hidden sm:inline">{featured.badge} · chart with indicators</span>
              <span className="sm:hidden">{featured.badge}</span>
            </span>
          </div>
          <div className="mt-6 sm:mt-7 grid md:grid-cols-12 gap-5 sm:gap-6 items-start md:items-end">
            <div className="md:col-span-8">
              <h3 className="font-serif text-[clamp(1.8rem,4vw,4rem)] leading-tight tracking-[-0.02em]" style={{ fontWeight: 800 }}>
                {featured.title}
              </h3>
              <p className="mt-3 text-[15px] sm:text-[18px] md:text-[20px] leading-[1.5] max-w-2xl" style={{ color: 'rgba(10,11,16,0.72)' }}>
                {featured.body}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link to={featured.cta.to} className="inline-flex items-center justify-center sm:justify-start gap-3 px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] w-full sm:w-auto" style={{ background: COBALT, color: 'white', fontWeight: 600 }}>
                {featured.cta.label} →
              </Link>
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-16">
          {items.map((it) => (
            <article key={it.title} className="space-y-5 group">
              <div className="relative overflow-hidden" style={{ border: '1px solid rgba(10,11,16,0.12)', background: CREAM_DEEP }}>
                <img src={it.src} alt={it.title} className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]" style={{ filter: 'contrast(1.05) saturate(1.05)' }} />
                <span className="absolute top-3 left-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2 py-1" style={{ background: COBALT, color: 'white' }}>
                  {it.badge}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3 sm:gap-6">
                <div>
                  <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2.8rem)] leading-tight tracking-[-0.015em]" style={{ fontWeight: 800 }}>{it.title}</h3>
                  <p className="mt-2 text-[14px] sm:text-[16px] leading-[1.55] max-w-md" style={{ color: 'rgba(10,11,16,0.7)' }}>{it.body}</p>
                </div>
                <Link to={it.cta.to} className="shrink-0 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] underline underline-offset-4 hover:no-underline decoration-2" style={{ color: COBALT, textUnderlineOffset: '6px' }}>
                  {it.cta.label} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Roll call                                                                  */
/* -------------------------------------------------------------------------- */

function RollCall() {
  const looking = [
    { title: 'Quant researcher',   loc: 'Bengaluru',         note: 'Statistics, signal processing, or comparable.' },
    { title: 'Execution engineer', loc: 'Bengaluru · remote', note: 'C++ or Rust, low-latency Linux, you have read the FIX spec.' },
    { title: 'Risk lead',          loc: 'Mumbai · Bengaluru', note: 'You can argue with your own backtest. Bonus: SEBI compliance background.' },
    { title: 'Frontend engineer',  loc: 'Bengaluru · remote', note: 'TypeScript, charts, an eye for terminals over dashboards.' },
    { title: 'Quant-adjacent ops', loc: 'Bengaluru',         note: 'You like trading floors, lunch tables, and clean handover notes.' },
    { title: 'Tinkerers, unite.',  loc: 'anywhere',           note: 'Tell us what you are obsessed with.' },
  ];
  return (
    <section className="px-6 md:px-14 py-32 md:py-44 relative overflow-hidden" style={{ background: INK, color: CREAM }}>
      {/* Pipeline screen as a subtle right-edge accent */}
      <div className="absolute -right-32 top-20 w-[820px] opacity-[0.08] pointer-events-none" style={{ transform: 'rotate(-4deg)' }}>
        <img src={SCREENS.pipeline} alt="" className="w-full h-auto" style={{ filter: 'grayscale(0.4)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] mb-2" style={{ color: COBALT, fontWeight: 600 }}>05 / 06</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55">The desk is hiring</div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[1.02] tracking-[-0.02em] max-w-[18ch] text-white" style={{ fontWeight: 800 }}>
              Small now. Staying small. <span style={{ color: COBALT_SOFT, fontWeight: 800 }}>Also hiring.</span>
            </h2>
          </div>
        </div>

        <div className="border-t border-white/12">
          {looking.map((r) => (
            <a key={r.title} href={`mailto:careers@o4f.co.in?subject=Hiring · ${encodeURIComponent(r.title)}`} className="group grid grid-cols-12 gap-6 py-8 items-baseline border-b border-white/12 hover:bg-white/[0.025] -mx-4 px-4 transition-colors">
              <div className="col-span-12 md:col-span-6 font-serif text-[clamp(1.8rem,2.5vw,2.5rem)] tracking-[-0.015em] text-white" style={{ fontWeight: 700 }}>
                {r.title}
              </div>
              <div className="col-span-6 md:col-span-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                {r.loc}
              </div>
              <div className="col-span-6 md:col-span-3 text-[14px] text-white/70 md:text-right group-hover:text-white">
                {r.note} <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COBALT_SOFT }}>→</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-white/12 flex flex-wrap justify-between items-center gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/55">
            Curious? Cold-email is welcomed.
          </span>
          <a href="mailto:careers@o4f.co.in" className="font-serif text-[24px] underline underline-offset-[6px] decoration-2 hover:no-underline" style={{ color: COBALT_SOFT, fontWeight: 700 }}>
            careers@o4f.co.in
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Insights — blogs carousel ported from master, re-skinned for /v2           */
/* -------------------------------------------------------------------------- */
/*
 * Data source: /blogs/index.json (already shipped by master, now on our
 * branch post-merge). Each card links to /blogs/${slug} which renders via
 * master's BlogDetailsPage — we don't own the article page, only the
 * homepage surface. Two posts today; layout assumes 2-up and degrades
 * gracefully if more land.
 */

type BlogMeta = {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: number;
  author: string;
  description: string;
  date: string;
  featured?: boolean;
};

function BlogsSection() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/blogs/index.json')
      .then((r) => r.json())
      .then((data: { blogs: BlogMeta[] }) => {
        if (cancelled) return;
        const sorted = [...data.blogs].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setBlogs(sorted);
      })
      .catch(() => {
        // Soft-fail — section just collapses if the manifest can't be read.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Hide the whole section if there's nothing to show — avoids an empty rail
  // that would only confuse a visitor.
  if (!loading && blogs.length === 0) return null;

  return (
    <section
      id="insights"
      className="px-5 sm:px-6 md:px-14 py-20 sm:py-24 md:py-32"
      style={{ background: INK, color: CREAM }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header — matches the eyebrow/headline pattern used elsewhere */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="md:col-span-5">
            <div
              className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] mb-3"
              style={{ color: COBALT, fontWeight: 600 }}
            >
              05 / 06 · Insights
            </div>
            <h2
              className="font-serif leading-[0.98] tracking-[-0.022em]"
              style={{ fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            >
              Notes from the lab.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 self-end">
            <p
              className="font-serif text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.55]"
              style={{ color: 'rgba(242, 239, 230, 0.72)' }}
            >
              Working papers, market autopsies, and operator notes from the desk.
              Written for traders and investors who want to know how the machine
              actually thinks.
            </p>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-[280px] rounded-[2px] border border-white/10 animate-pulse"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {blogs.map((b) => (
              <button
                key={b.id}
                onClick={() => navigate({ to: `/blogs/${b.slug}` })}
                className="group text-left p-7 sm:p-8 md:p-10 border border-white/10 transition-all duration-200 hover:bg-white/[0.02] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                style={{ borderRadius: 2 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COBALT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                }}
              >
                {/* Category eyebrow */}
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.28em] mb-5"
                  style={{ color: COBALT_SOFT, fontWeight: 600 }}
                >
                  {b.category}
                </div>

                {/* Title */}
                <h3
                  className="font-serif leading-[1.08] tracking-[-0.018em] mb-5"
                  style={{ fontWeight: 700, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
                >
                  {b.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[15px] leading-[1.55] mb-8"
                  style={{ color: 'rgba(242, 239, 230, 0.62)' }}
                >
                  {b.description}
                </p>

                {/* Meta row */}
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.22em] flex flex-wrap items-center gap-x-3 gap-y-1"
                  style={{ color: 'rgba(242, 239, 230, 0.45)' }}
                >
                  <span>{formatBlogDate(b.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{b.readTime} min read</span>
                  <span aria-hidden>·</span>
                  <span>{b.author}</span>
                </div>

                {/* Read arrow — only visible on hover, mirrors the rest of /v2's micro-affordances */}
                <div
                  className="mt-7 font-mono text-[11px] uppercase tracking-[0.28em] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: COBALT }}
                >
                  Read the note →
                </div>
              </button>
            ))}
          </div>
        )}

        {/* See-all link — separate from cards so it survives the empty/loading state */}
        {!loading && blogs.length > 0 && (
          <div className="mt-10 sm:mt-14 flex justify-end">
            <Link
              to="/blogs"
              className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.28em] inline-flex items-center gap-2 group/all"
              style={{ color: 'rgba(242, 239, 230, 0.72)' }}
            >
              See all notes
              <span
                className="transition-transform group-hover/all:translate-x-1"
                style={{ color: COBALT }}
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function formatBlogDate(iso: string): string {
  // "2026-04-01" → "01 Apr 2026" — keeps the ISO date semantically clean while
  // displaying the friendlier "DD Mon YYYY" we use everywhere in /v2.
  const d = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return iso;
  const day = String(d.getUTCDate()).padStart(2, '0');
  const mon = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  return `${day} ${mon} ${d.getUTCFullYear()}`;
}

/* -------------------------------------------------------------------------- */
/* Pull quote                                                                 */
/* -------------------------------------------------------------------------- */

function PullQuote() {
  return (
    <section className="px-5 sm:px-6 md:px-14 py-20 sm:py-28 md:py-48" style={{ background: CREAM, color: INK }}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] mb-8 sm:mb-12" style={{ color: COBALT, fontWeight: 600 }}>
          <span className="hidden sm:inline">06 / 06 · A note we keep on the wall</span>
          <span className="sm:hidden">06 / 06 · Wall note</span>
        </div>
        <blockquote className="font-serif text-[clamp(1.6rem,4.5vw,4.5rem)] leading-[1.18] tracking-[-0.02em]" style={{ fontWeight: 800 }}>
          "The market is a teacher that does not believe in second chances.
          <span style={{ color: COBALT }}> We built a machine </span>
          that can sit through her lessons longer than we can."
        </blockquote>
        <div className="mt-8 sm:mt-12 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em]" style={{ color: 'rgba(10,11,16,0.55)' }}>
          — internal memo · founding week
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Offices + footer                                                           */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Waitlist — early-access email capture                                      */
/* -------------------------------------------------------------------------- */

/**
 * Waitlist behaves as a MODAL now, not a section.
 * Opening is hash-driven (`#waitlist`), so every existing `<a href="#waitlist">`
 * across the page just works. Dismiss via backdrop click, ESC, or close button.
 * The matching success state stays visible until the user dismisses — we never
 * auto-close after submit.
 */
function Waitlist() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');
  const cardRef = useRef<HTMLDivElement | null>(null);

  const validate = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  // Hash routing: open whenever the URL hash is #waitlist; close by removing it.
  useEffect(() => {
    const sync = () => setIsOpen(window.location.hash === '#waitlist');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // ESC dismiss
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  function close() {
    // Strip the hash without reloading or jumping the page
    if (window.location.hash === '#waitlist') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setIsOpen(false);
  }

  function onBackdrop(e: { target: EventTarget | null; currentTarget: EventTarget | null }) {
    if (e.target === e.currentTarget) close();
  }

  async function onSubmit(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    setErrMsg('');
    if (!validate(email)) {
      setErrMsg('Please enter a valid email.');
      return;
    }
    setState('submitting');
    try {
      const existing: string[] = JSON.parse(localStorage.getItem('o4f.waitlist.v1') || '[]');
      if (!existing.includes(email.trim().toLowerCase())) {
        existing.push(email.trim().toLowerCase());
        localStorage.setItem('o4f.waitlist.v1', JSON.stringify(existing));
      }
      // TODO: wire to a real backend (Formspree / Buttondown / Mailchimp / Resend).
      await new Promise((r) => setTimeout(r, 700));
      setState('success');
    } catch {
      setState('error');
      setErrMsg('Could not save your email. Try again, or write to info@o4f.co.in.');
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-heading"
      onMouseDown={onBackdrop}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-10 animate-modal-in"
      style={{ background: 'rgba(6,7,11,0.78)', backdropFilter: 'blur(8px)' }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-[24px] sm:rounded-[32px] text-center"
        style={{
          background: '#0A0B10',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: `0 40px 100px -30px ${COBALT}99, 0 12px 30px -10px rgba(0,0,0,0.7)`,
          animation: 'modal-card-in 0.4s cubic-bezier(0.2,0.7,0.2,1)',
        }}
      >
        {/* Soft cobalt glow */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: `radial-gradient(ellipse at top, ${COBALT}33 0%, transparent 65%)` }} />

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close waitlist"
          className="absolute top-4 right-4 z-20 w-10 h-10 grid place-items-center rounded-full transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        <div className="relative z-10 p-8 sm:p-12 md:p-14">
          {/* Eyebrow */}
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-6 sm:mb-8 flex items-center justify-center gap-3"
               style={{ color: COBALT_SOFT, fontWeight: 600 }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: COBALT_SOFT, boxShadow: `0 0 14px ${COBALT_SOFT}` }} />
            Early access · Limited spots · 2026
          </div>

          {state === 'success' ? (
            <>
              <div className="mx-auto mb-6 w-14 h-14 rounded-full grid place-items-center"
                   style={{ background: `${COBALT}22`, border: `1.5px solid ${COBALT_SOFT}` }}>
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={COBALT_SOFT} strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l5 5 9-10" />
                </svg>
              </div>
              <h2 id="waitlist-heading" className="font-serif text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.02em] mb-4 text-white" style={{ fontWeight: 800 }}>
                You're <span style={{ color: COBALT_SOFT }}>on the list.</span>
              </h2>
              <p className="text-[15px] sm:text-[17px] leading-[1.55] max-w-md mx-auto text-white/72 mb-3">
                We'll write to <span className="text-white">{email}</span> when the desk opens to early users.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mt-4">
                Reply with anything — we read every message.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-8 inline-flex items-center justify-center gap-2 px-7 py-3 font-mono text-[12px] uppercase tracking-[0.16em] rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Back to the desk ←
              </button>
            </>
          ) : (
            <>
              <h2 id="waitlist-heading" className="font-serif text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] tracking-[-0.02em] mb-4 text-white" style={{ fontWeight: 800 }}>
                Join the <span style={{ color: COBALT_SOFT }}>waitlist.</span>
              </h2>
              <p className="text-[15px] sm:text-[17px] md:text-[18px] leading-[1.55] max-w-xl mx-auto mb-8 text-white/72">
                Built for the people who read the Indian markets in their sleep — traders, investors, and the quietly obsessed. Drop your email; we'll write when there's a seat.
              </p>

              <form onSubmit={onSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 sm:bg-black/40 sm:border sm:border-white/12 sm:rounded-full sm:p-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errMsg) setErrMsg(''); }}
                    required
                    autoFocus
                    autoComplete="email"
                    placeholder="you@yourdesk.co"
                    disabled={state === 'submitting'}
                    aria-label="Email address"
                    className="flex-1 min-w-0 px-5 py-4 bg-black/40 sm:bg-transparent border border-white/12 sm:border-0 rounded-full sm:rounded-none text-[15px] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#5C77FF]/40 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="shrink-0 px-6 sm:px-7 py-4 font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.16em] rounded-full transition-all disabled:opacity-70"
                    style={{ background: COBALT, color: 'white', boxShadow: `0 14px 30px -12px ${COBALT}` }}
                  >
                    {state === 'submitting' ? 'Joining…' : 'Join waitlist →'}
                  </button>
                </div>
                {errMsg && (
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-rose-300">
                    {errMsg}
                  </div>
                )}
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  No spam. No third-party tracking. One quiet email when we're ready.
                </p>
              </form>
            </>
          )}

          {/* Quiet trust strip at the bottom of the modal card */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40"
               style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span>SEBI registration in progress</span>
            <span className="hidden sm:inline">·</span>
            <span>~50 desks · private beta</span>
            <span className="hidden sm:inline">·</span>
            <span>Built in Bengaluru</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfficesAndFooter() {
  return (
    <>
      <Waitlist />


      {/* Footer — master-style 3-column */}
      <footer className="border-t border-white/10 py-12 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12" style={{ background: INK, color: CREAM }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="space-y-5">
            <Logo className="text-3xl font-bold tracking-tighter" />
            <p className="text-[14px] text-white/65 max-w-xs leading-relaxed">
              Engineering the foundations of intelligent systems.
            </p>
            <div className="space-y-2">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45" style={{ fontWeight: 600 }}>About us</h4>
              <p className="text-[13px] text-white/55 leading-relaxed">
                205, 3rd Cross, Sector 2, HSR Layout,<br />
                Bengaluru, Karnataka 560102
              </p>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 pt-1">
                SEBI Reg. No. INH000018342
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1" style={{ fontWeight: 600 }}>Navigation</h4>
            <FooterLink to="/">Home</FooterLink>
            <FooterAnchor href="#manifesto">Manifesto</FooterAnchor>
            <FooterAnchor href="#method">Method</FooterAnchor>
            <FooterAnchor href="#platform">Platform</FooterAnchor>
            <FooterAnchor href="#waitlist">Waitlist</FooterAnchor>
            <FooterLink to="/blogs">Research</FooterLink>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-1" style={{ fontWeight: 600 }}>Reach us</h4>
            <FooterLink to="/blogs/ma-macd">Technical indicators guide</FooterLink>
            <a href="mailto:info@o4f.co.in" className="block text-[14px] text-white/55 hover:text-white transition-colors">info@o4f.co.in</a>
            <a href="mailto:careers@o4f.co.in" className="block text-[14px] text-white/55 hover:text-white transition-colors">careers@o4f.co.in</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
          <span>© 2026 O4F LLP · All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="block text-[14px] text-white/65 hover:text-white transition-colors">{children}</Link>;
}

function FooterAnchor({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="block text-[14px] text-white/65 hover:text-white transition-colors">{children}</a>;
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function HomePageV2() {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (!window.location.hash) window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="antialiased" style={{ background: INK, color: CREAM }}>
      <TopBar />
      <main>
        <VideoHero />
        <Hero />
        <Manifesto />
        <Pillars />
        <PlatformStickyScroll />
        <BlogsSection />
        <PullQuote />
      </main>
      <OfficesAndFooter />
    </div>
  );
}
