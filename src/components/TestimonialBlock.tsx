import { TESTIMONIALS } from '../data/mock';

function Avatar({ seed, name }: { seed: number; name: string }) {
  const palettes = [
    ['#FF7043', '#5C2C0F'],
    ['#A8FF60', '#0E3F0E'],
    ['#5E63FF', '#1A1D5E'],
    ['#22D3EE', '#0E3F4E'],
    ['#8B5CF6', '#2E1E5E'],
  ];
  const [a, b] = palettes[seed % palettes.length];
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <div
      className="w-12 h-12 rounded-full grid place-items-center text-sm font-semibold shrink-0"
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

export function TestimonialBlock() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="surface p-6 flex flex-col gap-5 relative">
          {/* Big opening quote */}
          <div className="font-serif text-mint text-5xl leading-none -mt-1 opacity-70 select-none">"</div>

          <blockquote className="text-[15px] leading-relaxed text-white/85">
            {t.quote}
          </blockquote>

          <div className="mt-auto pt-5 border-t border-hairline flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar seed={t.avatarSeed} name={t.name} />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{t.name}</div>
                <div className="text-[11px] text-white/45 truncate">{t.role}</div>
                <div className="mono text-[10px] text-white/30 truncate">{t.city}</div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-mint font-semibold text-base mono tabular-nums">{t.metric.value}</div>
              <div className="mono text-[9px] uppercase tracking-widest text-white/35">{t.metric.label}</div>
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
}
