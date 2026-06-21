/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * O4F — Systematic, multi-strategy investment firm.
 * Redesigned: institutional, motion-driven, mobile-first.
 */

import {
  ArrowUpRight, ArrowRight, ArrowLeft, Clock, User, Menu, X,
  ChevronLeft, ChevronRight, Sigma, Cpu, Users, LineChart,
  ShieldCheck, GitBranch, Gauge, Layers, Binary, Workflow,
  ArrowDownRight, Mail, Lock, Sun, Moon,
} from 'lucide-react';
import {
  m, AnimatePresence, useScroll, useTransform, useSpring,
  useInView, animate, useReducedMotion, type Variants,
} from 'framer-motion';
import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import {
  fetchBlogsIndex, fetchBlogBySlug, prefetchBlogBySlug,
  type BlogMetadata, type BlogContent,
} from './lib/blogService';
import { Logo } from './components/Logo';
import { slotText, type SlotTextController, type SlotOptions } from 'slot-text';

const EASE = [0.2, 0.7, 0.2, 1] as const;
const FORM_URL = 'https://forms.gle/TmK4SU1A2G5isAui6';
const SECTIONS = [
  { id: 'thesis', label: 'Thesis' },
  { id: 'approach', label: 'Approach' },
  { id: 'strategies', label: 'Strategies' },
  { id: 'insights', label: 'Insights' },
  { id: 'contact', label: 'Contact' },
];

/* ============================================================
   Animation primitives
   ============================================================ */

const Reveal: React.FC<{ children: ReactNode; className?: string; delay?: number; y?: number; once?: boolean }> = ({
  children, className, delay = 0, y = 24, once = true,
}) => {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/** Word-by-word mask reveal for display headlines. */
export function Headline({
  text, className, delay = 0, as = 'h2',
}: { text: string; className?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' | 'span' }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: '115%' },
    show: { y: '0%', transition: { duration: 0.85, ease: EASE } },
  };
  const Tag = m[as] as any;
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.16em', marginBottom: '-0.16em' }}>
          <m.span variants={word} style={{ display: 'inline-block' }}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

/** Count-up number, triggered on scroll into view. */
function Counter({
  to, suffix = '', prefix = '', decimals = 0, className,
}: { to: number; suffix?: string; prefix?: string; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, {
      duration: 1.6, ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);
  return (
    <span ref={ref} className={className}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  );
}

/** Magnetic wrapper for buttons. */
function Magnetic({ children, className, strength = 0.4 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handle = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
  };
  return (
    <m.div
      ref={ref}
      className={className}
      onMouseMove={handle}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.3 }}
    >
      {children}
    </m.div>
  );
}

/* ============================================================
   Slot — slot-text roll wrapper (reduced-motion safe)
   ============================================================ */

function Slot({
  value, options, className, as = 'span',
  rollOnView = false, rerollOnHover = false, flashText,
}: {
  value: string;
  options?: SlotOptions;
  className?: string;
  as?: 'span' | 'div';
  rollOnView?: boolean;
  rerollOnHover?: boolean;
  flashText?: string;
}) {
  const ref = useRef<any>(null);
  const ctrl = useRef<SlotTextController | null>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const Tag = as as any;

  useEffect(() => {
    if (reduce || !ref.current) return;
    ctrl.current = slotText(ref.current, rollOnView ? '' : value, options);
    return () => { ctrl.current?.destroy(); ctrl.current = null; };
  }, [reduce]);

  useEffect(() => {
    if (reduce || !ctrl.current) return;
    if (rollOnView && !inView) return;
    ctrl.current.set(value, options);
  }, [value, inView, reduce]);

  if (reduce) return <Tag className={className}>{value}</Tag>;

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={value}
      onMouseEnter={rerollOnHover ? () => ctrl.current?.set(value, { ...options, skipUnchanged: false }) : undefined}
      onClick={flashText ? () => ctrl.current?.flash(flashText, { enter: { color: 'var(--color-secondary)', direction: 'up' } }) : undefined}
    />
  );
}

/* ============================================================
   Signal curve (hero visual)
   ============================================================ */

/** Pointer tracking that snaps to a path's exact geometry (handles any line/curve). */
function usePathHover(viewW: number, viewH: number) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  const move = (clientX: number) => {
    const wrap = wrapRef.current, path = pathRef.current;
    if (!wrap || !path) return;
    const rect = wrap.getBoundingClientRect();
    const fracX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const targetVX = fracX * viewW;
    let lo = 0, hi = path.getTotalLength();
    for (let i = 0; i < 22; i++) {
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid).x < targetVX) lo = mid; else hi = mid;
    }
    const p = path.getPointAtLength((lo + hi) / 2);
    setPt({ x: (p.x / viewW) * rect.width, y: (p.y / viewH) * rect.height });
  };
  return {
    wrapRef, pathRef, pt,
    onPointerMove: (e: React.PointerEvent) => move(e.clientX),
    onPointerLeave: () => setPt(null),
  };
}

/** Crosshair overlay (guide line + glowing marker), positioned in pixels. */
function CurveMarker({ pt, color = 'var(--color-secondary)' }: { pt: { x: number; y: number } | null; color?: string }) {
  return (
    <AnimatePresence>
      {pt && (
        <m.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 bottom-0 w-px" style={{ left: pt.x, background: 'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-foreground) 22%, transparent), transparent)' }} />
          <div
            className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: pt.x, top: pt.y, background: color, boxShadow: `0 0 0 4px color-mix(in srgb, ${color} 22%, transparent), 0 0 18px ${color}` }}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}

function SignalCurve() {
  const { wrapRef, pathRef, pt, onPointerMove, onPointerLeave } = usePathHover(800, 260);
  const path =
    'M0,235 L40,228 L80,236 L120,212 L160,220 L200,196 L240,205 L280,178 ' +
    'L320,186 L360,158 L400,170 L440,140 L480,150 L520,120 L560,132 L600,98 ' +
    'L640,110 L680,80 L720,92 L760,58 L800,66';
  const area = path + ' L800,260 L0,260 Z';
  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full pointer-events-none md:pointer-events-auto"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <svg viewBox="0 0 800 260" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="sig-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sig-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-secondary)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        {[60, 120, 180].map((y) => (
          <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="var(--grid-line)" strokeWidth="1" />
        ))}
        <m.path
          d={area} fill="url(#sig-fill)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1 }}
        />
        <m.path
          ref={pathRef}
          d={path} fill="none" stroke="url(#sig-line)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.4 }}
        />
      </svg>
      <CurveMarker pt={pt} />
    </div>
  );
}

/* ============================================================
   Navigation
   ============================================================ */

function useGoToSection() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate({ to: '/', hash: id });
    }
  };
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );
  const toggle = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('o4f-theme', next); } catch { /* ignore */ }
      return next;
    });
  };
  return { theme, toggle };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(',')]);
  return active;
}

export function Navbar() {
  const goTo = useGoToSection();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handle = (id: string) => { setOpen(false); goTo(id); };

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="fixed top-0 inset-x-0 z-50"
      >
        <div className={`absolute inset-0 -z-10 nav-frost transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
        <nav className="container-x flex items-center justify-between h-16 md:h-20">
          <button onClick={() => (window.location.pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate({ to: '/' }))} className="flex items-center gap-2" aria-label="O4F home">
            <Logo className="text-2xl font-display tracking-tight" />
            <span className="hidden sm:block eyebrow text-[0.7rem] ml-2 pl-3 border-l border-border">Capital</span>
          </button>

          <div className="hidden md:flex items-center gap-9">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handle(s.id)}
                className={`text-sm transition-colors link-underline ${active === s.id ? 'nav-active' : 'text-muted hover:text-foreground'}`}
              >
                <Slot value={s.label} rerollOnHover options={{ direction: 'down', stagger: 26, duration: 240 }} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-muted hover:text-foreground transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" strokeWidth={1.5} /> : <Sun className="w-5 h-5" strokeWidth={1.5} />}
            </button>
            <Magnetic className="hidden md:block">
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost rounded-full px-5 py-2 text-sm inline-flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> <Slot value="Investor access" rerollOnHover options={{ direction: 'up', stagger: 18, duration: 230 }} />
              </a>
            </Magnetic>
            <button className="md:hidden -mr-2 text-foreground inline-flex items-center justify-center w-11 h-11" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden glass flex flex-col"
          >
            <div className="container-x flex items-center justify-between h-16">
              <Logo className="text-2xl font-display" />
              <button className="-mr-2 inline-flex items-center justify-center w-11 h-11" onClick={() => setOpen(false)} aria-label="Close menu"><X className="w-6 h-6" /></button>
            </div>
            <div className="container-x flex-1 flex flex-col justify-center gap-2">
              {SECTIONS.map((s, i) => (
                <m.button
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, ease: EASE }}
                  onClick={() => handle(s.id)}
                  className="display text-5xl py-2 text-left hover:text-primary transition-colors"
                >
                  {s.label}
                </m.button>
              ))}
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn btn-primary rounded-full px-6 py-3 mt-8 inline-flex items-center justify-center gap-2 w-full">
                <Lock className="w-4 h-4" /> Investor access
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   Hero
   ============================================================ */

const HERO_WORDS = ['computation', 'probability', 'asymmetry', 'conviction', 'structure'];

function Hero() {
  const goTo = useGoToSection();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const reduceHero = useReducedMotion();
  const [wi, setWi] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduceHero || paused) return;
    const id = setInterval(() => setWi((p) => (p + 1) % HERO_WORDS.length), 3800);
    return () => clearInterval(id);
  }, [reduceHero, paused]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* texture */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] glow-primary rounded-full blur-2xl md:blur-3xl opacity-50 drift" />
      <div className="absolute top-10 -right-32 w-[30rem] h-[30rem] glow-secondary rounded-full blur-2xl md:blur-3xl opacity-40 drift" style={{ animationDelay: '-6s' }} />

      <m.div style={{ y, opacity: fade }} className="container-x relative z-10 w-full">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-60 pulse-dot" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="eyebrow">Systematic · Multi-Strategy · Established 2026</span>
          </div>
        </Reveal>

        <h1 className="display text-[clamp(2.7rem,8vw,6.5rem)] max-w-[16ch]">
          <Headline as="span" text="Markets are a problem of" className="block" delay={0.1} />
          <span className="block">
            <Headline as="span" text="computation" className="text-primary display-italic" delay={0.45} />
            <span> &amp; </span>
            <Headline as="span" text="probability." className="text-secondary display-italic" delay={0.6} />
          </span>
        </h1>

        <Reveal delay={0.8} className="mt-8 max-w-2xl">
          <p className="lead text-lg md:text-xl leading-relaxed balance">
            O4F is a math-first, technology-first investment firm. We engineer systematic
            strategies across equities, ETFs and derivatives — and build the system that solves
            the problem better than intuition can.
          </p>
        </Reveal>

        <Reveal delay={0.9} className="mt-7">
          <div
            className="flex items-center gap-3 flex-wrap"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="eyebrow">Our edge lives in</span>
            <Slot
              value={HERO_WORDS[wi]}
              options={{ direction: 'up', stagger: 32, duration: 300, color: 'var(--color-primary)' }}
              className="mono text-base md:text-lg text-foreground lowercase"
            />
          </div>
        </Reveal>

        <Reveal delay={1} className="mt-10 flex flex-col sm:flex-row gap-4">
          <Magnetic>
            <button onClick={() => goTo('approach')} className="btn btn-primary rounded-full px-7 py-3.5 inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <Slot value="Explore our approach" rerollOnHover options={{ direction: 'up', stagger: 16, duration: 240 }} /> <ArrowRight className="w-4 h-4" />
            </button>
          </Magnetic>
          <Magnetic>
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost rounded-full px-7 py-3.5 inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              <Lock className="w-4 h-4" /> <Slot value="Investor access" rerollOnHover options={{ direction: 'up', stagger: 16, duration: 240 }} />
            </a>
          </Magnetic>
        </Reveal>
      </m.div>

      {/* signal curve anchored to the bottom */}
      <m.div style={{ opacity: fade }} className="absolute bottom-0 inset-x-0 h-[34vh] md:h-[40vh]">
        <SignalCurve />
      </m.div>
    </section>
  );
}

/* ============================================================
   Ticker band
   ============================================================ */

const UNIVERSE = [
  'EQUITIES', 'INDEX OPTIONS', 'ETFs', 'FUTURES', 'STATISTICAL ARBITRAGE',
  'VOLATILITY', 'RELATIVE VALUE', 'EVENT-DRIVEN', 'SYSTEMATIC MACRO', 'MICROSTRUCTURE',
];

function TickerBand() {
  const row = [...UNIVERSE, ...UNIVERSE];
  return (
    <section className="hairline-y border-y border-border py-5 overflow-hidden marquee bg-surface/40">
      <div className="marquee-track gap-12">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="eyebrow text-foreground/70 whitespace-nowrap">{t}</span>
            <span className="text-secondary/50 text-xs">◆</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Metrics band
   ============================================================ */

const METRICS = [
  { display: '100%', label: 'Systematic decisions', note: 'Every position is model-driven — no discretionary overrides.' },
  { display: '3', label: 'Core instrument classes', note: 'Equities, ETFs and derivatives, traded as one book.' },
  { display: '24/5', label: 'Research & risk cycle', note: 'Continuous monitoring across the trading week.' },
  { display: '<1ms', label: 'Target execution', note: 'Latency treated as a competitive variable, not an IT concern.' },
];

function Metrics() {
  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden panel">
        {METRICS.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08} className="bg-background p-6 md:p-8">
            <div className="mb-3" style={{ minHeight: '1.1em' }}>
              <Slot
                value={m.display}
                rollOnView
                options={{ direction: 'up', stagger: 55, duration: 360 }}
                className="mono text-4xl md:text-5xl text-foreground inline-block leading-none"
              />
            </div>
            <div className="text-sm font-medium mb-2">{m.label}</div>
            <p className="muted text-xs leading-relaxed">{m.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Thesis (editorial / paper)
   ============================================================ */

function Thesis() {
  return (
    <section id="thesis" className="hairline-t border-t border-border py-24 md:py-36">
      <div className="container-x">
        <Reveal><span className="eyebrow">The thesis</span></Reveal>
        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <Headline
              as="h2"
              text="We are not a traditional asset manager."
              className="display text-[clamp(2rem,5vw,3.75rem)] text-foreground"
            />
            <Reveal delay={0.2}>
              <p className="display text-[clamp(2rem,5vw,3.75rem)] text-foreground/35 leading-[0.98] mt-1 balance">
                We are a firm built on the conviction that whoever builds the best system, wins.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-3 space-y-6">
            <Reveal delay={0.15}>
              <p className="lead text-lg leading-relaxed">
                Financial markets are, at their core, a problem of computation and probability.
                The edge is not relationships or intuition — it lives in the gap between a correct
                model and the market's misunderstanding of itself.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="muted leading-relaxed">
                O4F is an early-stage, multi-strategy firm operating at the intersection of rigorous
                mathematics, proprietary technology and exceptional talent. We trade markets that reward
                precision, speed and structural insight.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <Logo className="text-xl" />
                <span className="text-sm muted">— The founding team</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pillars (sticky scroll)
   ============================================================ */

const PILLARS = [
  {
    n: '01', key: 'Math-First', icon: Sigma,
    title: 'Math-first',
    body: 'Every strategy originates from a quantifiable edge — an identifiable mispricing, structural inefficiency or statistical pattern a model can operationalize.',
    points: ['Risk measured in probability distributions, not narratives', 'We trade signals with confidence intervals, not opinions', 'Research and trading are the same function'],
  },
  {
    n: '02', key: 'Tech-First', icon: Cpu,
    title: 'Technology-first',
    body: 'Technology is not a support function — it is the business. Our core trading and risk systems are built in-house. We own the stack; the stack does not own us.',
    points: ['Execution quality and latency are competitive variables', 'Built to be stress-tested by market dislocation', 'Versioned, reviewed, with honest postmortems'],
  },
  {
    n: '03', key: 'Talent-First', icon: Users,
    title: 'Talent-first',
    body: 'The person who designs a strategy is the person who understands its failure modes. We hire for rigor, ownership and intellectual honesty over pedigree.',
    points: ['Small teams, high trust, full ownership', 'Ideas win on expected value, not seniority', 'A culture that compounds like the book does'],
  },
];

function Pillars() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="max-w-3xl">
        <Reveal><span className="eyebrow">Operating principles</span></Reveal>
        <Headline as="h2" text="Three pillars, encoded from day one." className="display text-[clamp(2rem,5vw,3.75rem)] mt-6" />
        <Reveal delay={0.2}>
          <p className="lead text-lg mt-6 max-w-xl">
            The firms that defined quantitative finance shared the same structural DNA — not as slogans,
            but as principles built into every decision.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-5">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.key} delay={i * 0.12}>
              <div className="panel panel-hover rounded-3xl p-7 md:p-8 h-full group">
                <div className="flex items-center justify-between mb-8">
                  <span className="mono text-xs faint">{p.n}</span>
                  <span className="w-11 h-11 rounded-full grid place-items-center panel group-hover:border-primary/40 transition-colors">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="display text-2xl mb-3">{p.title}</h3>
                <p className="muted text-sm leading-relaxed mb-6">{p.body}</p>
                <ul className="space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm">
                      <span className="text-secondary mt-1.5 w-1 h-1 rounded-full bg-secondary shrink-0" />
                      <span className="text-foreground/75">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   System pipeline
   ============================================================ */

const PIPELINE = [
  { icon: Binary, title: 'Research', body: 'Hypotheses formed from data, tested against history and live markets.' },
  { icon: LineChart, title: 'Signal', body: 'Edges expressed as calibrated signals with measurable confidence.' },
  { icon: ShieldCheck, title: 'Risk', body: 'Position sizing and drawdown limits are outputs of the model.' },
  { icon: Gauge, title: 'Execution', body: 'Low-latency, in-house execution turns signal into position.' },
];

function SystemPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  return (
    <section id="approach" className="hairline-t border-t border-border">
      <div className="container-x py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Reveal><span className="eyebrow flex items-center gap-2"><Workflow className="w-4 h-4" /> The system</span></Reveal>
            <Headline as="h2" text="One continuous loop, end to end." className="display text-[clamp(2rem,5vw,3.5rem)] mt-6" />
          </div>
          <Reveal delay={0.2}>
            <p className="muted text-sm max-w-xs md:text-right">
              Research and execution are not separate departments. They are stages of a single feedback loop
              that compounds with every iteration.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {/* connecting track — centered on the icon row, between the first and last node */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-border -translate-y-1/2">
            <m.div className="h-full bg-gradient-to-r from-secondary to-primary origin-left" style={{ scaleX: line }} />
          </div>
          <div className="grid md:grid-cols-4 gap-10 md:gap-5">
            {PIPELINE.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.12}>
                  <div className="relative md:text-center">
                    <div
                      className="w-14 h-14 rounded-2xl panel grid place-items-center mb-5 relative z-10 md:mx-auto"
                      style={{ backgroundColor: 'var(--color-background)' }}
                    >
                      <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 mb-2 md:justify-center">
                      <span className="mono text-xs faint">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-lg font-medium">{s.title}</h3>
                    </div>
                    <p className="muted text-sm leading-relaxed md:max-w-[24ch] md:mx-auto">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 flex items-center justify-center gap-3 text-sm">
              <GitBranch className="w-4 h-4 text-secondary" />
              <span className="muted">Every outcome feeds back into research. The loop never closes.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Strategies
   ============================================================ */

const STRATEGIES = [
  { icon: Sigma, name: 'Statistical Arbitrage', desc: 'Mean-reversion and relationships across baskets, captured systematically with strict risk budgets.' },
  { icon: LineChart, name: 'Equity Long / Short', desc: 'Factor- and signal-driven positioning that isolates idiosyncratic edge from market beta.' },
  { icon: Layers, name: 'Systematic Volatility', desc: 'Options and derivative structures that monetize mispriced risk and convexity.' },
  { icon: GitBranch, name: 'Index & ETF Relative Value', desc: 'Structural dislocations between indices, constituents and their tradable wrappers.' },
  { icon: Workflow, name: 'Event & Microstructure', desc: 'Short-horizon edges around flows, rebalances and the mechanics of the order book.' },
  { icon: Gauge, name: 'Systematic Macro', desc: 'Cross-asset, model-driven views expressed with disciplined, probabilistic sizing.' },
];

function Strategies() {
  return (
    <section id="strategies" className="hairline-t border-t border-border">
      <div className="container-x py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <Reveal><span className="eyebrow">Multi-strategy</span></Reveal>
          <Headline as="h2" text="Many edges. One book. One system." className="display text-[clamp(2rem,5vw,3.75rem)] mt-6" />
          <Reveal delay={0.2}>
            <p className="lead text-lg mt-6">
              Diversification is engineered, not assembled. Independent, uncorrelated strategies share a single
              risk framework, execution layer and research culture.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STRATEGIES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.name} delay={(i % 3) * 0.1}>
                <div className="panel panel-hover rounded-2xl p-7 h-full group flex flex-col">
                  <Icon className="w-6 h-6 text-secondary mb-6" strokeWidth={1.5} />
                  <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="muted text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs text-faint group-hover:text-primary transition-colors">
                    <span className="mono">Strategy {String(i + 1).padStart(2, '0')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-auto" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Performance philosophy (illustrative)
   ============================================================ */

function Philosophy() {
  const { wrapRef, pathRef, pt, onPointerMove, onPointerLeave } = usePathHover(400, 200);
  return (
    <section className="hairline-t border-t border-border">
      <div className="container-x py-24 md:py-32 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Reveal><span className="eyebrow">Risk &amp; return</span></Reveal>
          <Headline as="h2" text="We optimise for asymmetry, not adrenaline." className="display text-[clamp(2rem,4.5vw,3.25rem)] mt-6" />
          <Reveal delay={0.2}>
            <p className="lead text-lg mt-6">
              Capital preservation is the first input, not an afterthought. We size positions to survive being
              wrong, compound when right, and let the mathematics of risk-adjusted return do the work over time.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {[
              ['Capital preservation first', 'Drawdown limits are hard constraints, set before any trade.'],
              ['Probabilistic sizing', 'Every position is scaled to its expected value and downside.'],
              ['No single point of failure', 'Uncorrelated strategies smooth the path of returns.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={0.25 + i * 0.08}>
                <div className="flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="font-medium text-sm">{t}</div>
                    <div className="muted text-sm">{d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="panel rounded-3xl p-7 md:p-9">
            <div className="flex items-center justify-between mb-6">
              <span className="eyebrow">Compounding, illustrated</span>
              <span className="flex items-center gap-1.5 text-xs text-secondary"><span className="w-2 h-2 rounded-full bg-secondary pulse-dot" /> conceptual</span>
            </div>
            <div ref={wrapRef} className="h-48 md:h-56 relative" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="phil-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[50, 100, 150].map((yy) => <line key={yy} x1="0" y1={yy} x2="400" y2={yy} stroke="var(--grid-line)" />)}
                <m.path
                  d="M0,185 C60,180 90,160 130,150 C180,138 200,120 240,95 C280,72 300,60 340,38 L400,18 L400,200 L0,200 Z"
                  fill="url(#phil-fill)"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }}
                />
                <m.path
                  ref={pathRef}
                  d="M0,185 C60,180 90,160 130,150 C180,138 200,120 240,95 C280,72 300,60 340,38 L400,18"
                  fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE }}
                />
              </svg>
              <CurveMarker pt={pt} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              {[['Horizon', 'Long'], ['Bias', 'Convex'], ['Discipline', 'Always']].map(([k, v]) => (
                <div key={k}>
                  <div className="mono text-lg text-foreground">{v}</div>
                  <div className="eyebrow mt-1">{k}</div>
                </div>
              ))}
            </div>
            <p className="muted text-[0.8rem] leading-relaxed mt-5">
              Illustrative only. Not a representation or projection of any actual or expected returns.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Insights (blog carousel)
   ============================================================ */

export function Insights({ onOpenBlog }: { onOpenBlog: (slug: string) => void }) {
  const [blogs, setBlogs] = useState<BlogMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBlogsIndex();
        setBlogs([...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } finally { setLoading(false); }
    })();
  }, []);

  const checkScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };
  useEffect(() => { checkScroll(); window.addEventListener('resize', checkScroll); return () => window.removeEventListener('resize', checkScroll); }, [blogs]);
  useEffect(() => { if (!loading) blogs.forEach((b) => prefetchBlogBySlug(b.slug)); }, [blogs, loading]);

  const scroll = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
    setTimeout(checkScroll, 320);
  };

  return (
    <section id="insights" className="hairline-t border-t border-border">
      <div className="container-x py-24 md:py-32">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <Reveal><span className="eyebrow">Insights</span></Reveal>
            <Headline as="h2" text="Research &amp; writing." className="display text-[clamp(2rem,5vw,3.5rem)] mt-6" />
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll('left')} disabled={!canLeft} className="w-11 h-11 rounded-full panel panel-hover grid place-items-center disabled:opacity-30 transition-opacity" aria-label="Scroll left"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => scroll('right')} disabled={!canRight} className="w-11 h-11 rounded-full panel panel-hover grid place-items-center disabled:opacity-30 transition-opacity" aria-label="Scroll right"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {loading ? (
          <div className="muted py-12">Loading insights…</div>
        ) : blogs.length === 0 ? (
          <div className="muted py-12">No insights published yet.</div>
        ) : (
          <div ref={carouselRef} onScroll={checkScroll} className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {blogs.map((b, i) => (
              <m.button
                key={b.slug}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => onOpenBlog(b.slug)}
                onMouseEnter={() => prefetchBlogBySlug(b.slug)}
                className="text-left flex-shrink-0 w-[78vw] sm:w-[340px] panel panel-hover rounded-3xl overflow-hidden snap-start group"
              >
                <div className="aspect-[16/10] relative overflow-hidden border-b border-border">
                  <div className="absolute inset-0 grid-bg opacity-60" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="display text-6xl text-foreground/10 group-hover:text-primary/30 transition-colors">{b.category.slice(0, 2)}</span>
                  </div>
                  <div className="absolute top-4 left-4 eyebrow text-[0.7rem] glass px-3 py-1 rounded-full">{b.category}</div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-lg font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">{b.title}</h3>
                  <p className="muted text-sm line-clamp-2">{b.description}</p>
                  <div className="flex items-center justify-between pt-3 mt-1 border-t border-border text-xs">
                    <span className="muted flex items-center gap-1.5"><Clock className="w-3 h-3" /> {b.readTime} min</span>
                    <span className="text-primary flex items-center gap-1 font-medium">Read <ArrowUpRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </m.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   Contact / Investor relations
   ============================================================ */

function Contact() {
  return (
    <section id="contact" className="hairline-t border-t border-border relative overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] glow-primary rounded-full blur-2xl md:blur-3xl opacity-30" />
      <div className="container-x py-24 md:py-36 relative">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal><span className="eyebrow">Investor relations</span></Reveal>
          <Headline as="h2" text="Built for those who think in expected value." className="display text-[clamp(2.2rem,6vw,4.5rem)] mt-6 mx-auto" />
          <Reveal delay={0.2}>
            <p className="lead text-lg mt-7 max-w-xl mx-auto balance">
              O4F works with a select group of qualified investors and partners who share our conviction
              that the best system wins. Access is by introduction.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-full px-7 py-3.5 inline-flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4" /> <Slot value="Request investor access" rerollOnHover flashText="Opening form…" options={{ direction: 'up', stagger: 14, duration: 230 }} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost rounded-full px-7 py-3.5 inline-flex items-center gap-2 justify-center">
                  <Slot value="Join the team" rerollOnHover options={{ direction: 'up', stagger: 16, duration: 230 }} /> <ArrowUpRight className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="muted text-sm mt-8">
              Or contact us at{' '}
              <a href="mailto:info@o4f.co.in" className="text-foreground hover:text-primary transition-colors link-underline">info@o4f.co.in</a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */

export function Footer() {
  const goTo = useGoToSection();
  return (
    <footer className="hairline-t border-t border-border bg-surface/40">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo className="text-3xl font-display" />
            <p className="muted text-sm mt-5 max-w-sm leading-relaxed">
              A systematic, multi-strategy investment firm. Markets are computation and probability —
              we build the system that solves them.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Navigate</div>
            <ul className="space-y-3">
              {SECTIONS.map((s) => (
                <li key={s.id}><button onClick={() => goTo(s.id)} className="text-sm muted hover:text-foreground transition-colors">{s.label}</button></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:info@o4f.co.in" className="muted hover:text-foreground transition-colors link-underline">info@o4f.co.in</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border space-y-5">
          <p className="muted text-[0.8rem] leading-relaxed max-w-4xl">
            This website is for informational purposes only and does not constitute an offer to sell, or a
            solicitation of an offer to buy, any security or investment product, nor shall there be any sale
            of securities in any jurisdiction in which such offer or sale would be unlawful. Any such offer
            will be made only to qualified investors by means of definitive offering documents. Investing
            involves risk, including the possible loss of principal. Past performance is not indicative of
            future results.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="faint text-xs">© {new Date().getFullYear()} O4F LLP. All rights reserved.</span>
            <span className="faint text-xs mono">Systematic · Multi-Strategy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Pages
   ============================================================ */

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto', block: 'start' }));
    window.history.replaceState(null, '', `/#${id}`);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TickerBand />
        <Metrics />
        <Thesis />
        <Pillars />
        <SystemPipeline />
        <Strategies />
        <Philosophy />
        <Insights onOpenBlog={(slug) => navigate({ to: `/blogs/${slug}` })} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

