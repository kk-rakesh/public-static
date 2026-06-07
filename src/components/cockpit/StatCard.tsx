import { ReactNode, useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Sparkline } from '../charts/Sparkline';

type StatCardProps = {
  label: string;
  value: ReactNode;
  delta?: { value: string; positive: boolean };
  icon?: LucideIcon;
  spark?: number[];
  sparkColor?: string;
  accent?: 'emerald' | 'blue' | 'amber' | 'rose' | 'violet';
  big?: boolean;
  children?: ReactNode;
};

const ACCENTS: Record<NonNullable<StatCardProps['accent']>, { bar: string; text: string; glow: string }> = {
  emerald: { bar: 'from-emerald-500/50 to-emerald-500/0', text: 'text-emerald-300', glow: 'shadow-[0_0_60px_-20px_rgba(16,185,129,0.5)]' },
  blue:    { bar: 'from-blue-500/50 to-blue-500/0',       text: 'text-blue-300',    glow: 'shadow-[0_0_60px_-20px_rgba(59,130,246,0.55)]' },
  amber:   { bar: 'from-amber-500/50 to-amber-500/0',     text: 'text-amber-300',   glow: 'shadow-[0_0_60px_-20px_rgba(245,158,11,0.45)]' },
  rose:    { bar: 'from-rose-500/50 to-rose-500/0',       text: 'text-rose-300',    glow: 'shadow-[0_0_60px_-20px_rgba(244,63,94,0.45)]' },
  violet:  { bar: 'from-violet-500/50 to-violet-500/0',   text: 'text-violet-300',  glow: 'shadow-[0_0_60px_-20px_rgba(139,92,246,0.45)]' },
};

export function StatCard({ label, value, delta, icon: Icon, spark, sparkColor, accent = 'blue', big, children }: StatCardProps) {
  const a = ACCENTS[accent];
  return (
    <div className={`group relative liquid-glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/15 transition-all p-5 ${a.glow}`}>
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${a.bar}`} />
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/45 font-mono">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-white/5 grid place-items-center group-hover:bg-white/10 transition-colors">
            <Icon className={`w-4 h-4 ${a.text}`} />
          </div>
        )}
      </div>
      <div className={`font-mono ${big ? 'text-2xl md:text-3xl xl:text-4xl' : 'text-2xl md:text-3xl'} font-semibold tabular-nums leading-tight break-all`}>{value}</div>
      {delta && (
        <div className={`mt-2 text-xs font-mono ${delta.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {delta.positive ? '▲' : '▼'} {delta.value}
        </div>
      )}
      {spark && (
        <div className="mt-3 h-10 -mx-1">
          <Sparkline data={spark} color={sparkColor ?? (delta?.positive === false ? '#EF4444' : '#10B981')} height={40} width={200} />
        </div>
      )}
      {children}
    </div>
  );
}

export function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0, duration = 1200 }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return (
    <span className="tabular-nums">
      {prefix}
      {v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
