import { useMemo } from 'react';

type Candle = { o: number; h: number; l: number; c: number };

type CandleChartProps = {
  candles?: Candle[];
  height?: number;
  showVolume?: boolean;
  showIndicators?: boolean;
  seed?: number;
};

function generateCandles(count: number, seed: number, start = 24850): Candle[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const out: Candle[] = [];
  let last = start;
  for (let i = 0; i < count; i++) {
    const drift = (rand() - 0.5) * 22;
    const o = last;
    const c = o + drift + Math.sin(i / 6) * 8;
    const h = Math.max(o, c) + rand() * 16;
    const l = Math.min(o, c) - rand() * 16;
    out.push({ o, h, l, c });
    last = c;
  }
  return out;
}

function sma(values: number[], window: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < values.length; i++) {
    if (i < window - 1) {
      out.push(NaN);
      continue;
    }
    let sum = 0;
    for (let k = i - window + 1; k <= i; k++) sum += values[k];
    out.push(sum / window);
  }
  return out;
}

export function CandleChart({
  candles,
  height = 360,
  showVolume = true,
  showIndicators = true,
  seed = 17,
}: CandleChartProps) {
  const data = useMemo(() => candles ?? generateCandles(90, seed), [candles, seed]);

  const width = 1000;
  const padX = 28;
  const padTop = 22;
  const padBottom = showVolume ? 70 : 22;

  const { min, max, candleWidth, x, y, sma20, sma50, volMax } = useMemo(() => {
    const min = Math.min(...data.map((d) => d.l));
    const max = Math.max(...data.map((d) => d.h));
    const range = max - min;
    const usableH = height - padTop - padBottom;
    const candleWidth = ((width - padX * 2) / data.length) * 0.7;
    const x = (i: number) => padX + (i + 0.5) * ((width - padX * 2) / data.length);
    const y = (v: number) => padTop + ((max - v) / range) * usableH;
    const closes = data.map((d) => d.c);
    const sma20 = sma(closes, 20);
    const sma50 = sma(closes, 50);
    const ranges = data.map((d) => Math.abs(d.h - d.l));
    const volMax = Math.max(...ranges);
    return { min, max, candleWidth, x, y, sma20, sma50, volMax };
  }, [data, height]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="bg-chart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59,130,246,0.04)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      <rect x={padX} y={padTop} width={width - padX * 2} height={height - padTop - padBottom} fill="url(#bg-chart)" />

      {/* Horizontal grid */}
      <g opacity={0.12}>
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const ty = padTop + t * (height - padTop - padBottom);
          return (
            <line key={t} x1={padX} y1={ty} x2={width - padX} y2={ty} stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 4" />
          );
        })}
      </g>

      {/* Axis labels (price) */}
      <g fill="#9CA3AF" fontSize="9" fontFamily="ui-monospace, 'SF Mono', Menlo, monospace">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const px = max - t * (max - min);
          const ty = padTop + t * (height - padTop - padBottom);
          return (
            <text key={t} x={width - padX + 4} y={ty + 3}>
              {px.toFixed(0)}
            </text>
          );
        })}
      </g>

      {/* Candles */}
      <g>
        {data.map((c, i) => {
          const isUp = c.c >= c.o;
          const color = isUp ? '#10B981' : '#EF4444';
          const cx = x(i);
          const bodyTop = y(Math.max(c.o, c.c));
          const bodyBottom = y(Math.min(c.o, c.c));
          return (
            <g key={i}>
              <line x1={cx} y1={y(c.h)} x2={cx} y2={y(c.l)} stroke={color} strokeWidth="1" opacity={0.8} />
              <rect
                x={cx - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(1, bodyBottom - bodyTop)}
                fill={color}
                opacity={isUp ? 0.95 : 0.85}
                rx="0.5"
              />
            </g>
          );
        })}
      </g>

      {/* SMA20 / SMA50 indicators */}
      {showIndicators && (
        <g fill="none" strokeWidth="1.5" strokeLinecap="round" opacity={0.85}>
          <path
            stroke="#FBBF24"
            d={
              sma20
                .map((v, i) => (isNaN(v) ? null : `${i === 0 || isNaN(sma20[i - 1]) ? 'M' : 'L'} ${x(i)} ${y(v)}`))
                .filter(Boolean)
                .join(' ')
            }
          />
          <path
            stroke="#8B5CF6"
            d={
              sma50
                .map((v, i) => (isNaN(v) ? null : `${i === 0 || isNaN(sma50[i - 1]) ? 'M' : 'L'} ${x(i)} ${y(v)}`))
                .filter(Boolean)
                .join(' ')
            }
          />
        </g>
      )}

      {/* Volume bars */}
      {showVolume && (
        <g>
          {data.map((c, i) => {
            const isUp = c.c >= c.o;
            const cx = x(i);
            const range = Math.abs(c.h - c.l);
            const vh = (range / volMax) * (padBottom - 30);
            return (
              <rect
                key={`vol-${i}`}
                x={cx - candleWidth / 2}
                y={height - padBottom + 16 + (padBottom - 30 - vh)}
                width={candleWidth}
                height={Math.max(1, vh)}
                fill={isUp ? '#10B981' : '#EF4444'}
                opacity={0.35}
              />
            );
          })}
          <text x={padX} y={height - padBottom + 12} fontSize="9" fill="#6B7280" fontFamily="ui-monospace, monospace">
            VOLUME
          </text>
        </g>
      )}

      {/* Legend */}
      {showIndicators && (
        <g fontSize="10" fontFamily="ui-monospace, 'SF Mono', Menlo, monospace">
          <rect x={padX + 4} y={padTop - 14} width="170" height="14" fill="rgba(0,0,0,0.6)" rx="3" />
          <circle cx={padX + 12} cy={padTop - 7} r="3" fill="#FBBF24" />
          <text x={padX + 20} y={padTop - 4} fill="#FBBF24">SMA 20</text>
          <circle cx={padX + 80} cy={padTop - 7} r="3" fill="#8B5CF6" />
          <text x={padX + 88} y={padTop - 4} fill="#8B5CF6">SMA 50</text>
        </g>
      )}
    </svg>
  );
}
