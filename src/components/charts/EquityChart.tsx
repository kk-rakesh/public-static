import { useMemo, useState } from 'react';

type EquityChartProps = {
  data: number[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  animate?: boolean;
  fillOpacity?: number;
  smooth?: boolean;
  markPeakAndTrough?: boolean;
};

export function EquityChart({
  data,
  color = '#3B82F6',
  height = 280,
  showGrid = true,
  showAxis = true,
  fillOpacity = 0.25,
  smooth = true,
  markPeakAndTrough = false,
}: EquityChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const width = 900;
  const padX = 40;
  const padY = 22;

  const { points, areaPath, linePath, min, max, peakIdx, troughIdx } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const x = (i: number) => padX + (i / (data.length - 1)) * (width - padX * 2);
    const y = (v: number) => height - padY - ((v - min) / range) * (height - padY * 2);
    const pts = data.map((v, i) => ({ x: x(i), y: y(v), v }));

    let linePath = `M ${pts[0].x},${pts[0].y}`;
    if (smooth) {
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const cpX = (prev.x + curr.x) / 2;
        linePath += ` C ${cpX},${prev.y} ${cpX},${curr.y} ${curr.x},${curr.y}`;
      }
    } else {
      for (let i = 1; i < pts.length; i++) {
        linePath += ` L ${pts[i].x},${pts[i].y}`;
      }
    }
    const areaPath = `${linePath} L ${pts[pts.length - 1].x},${height - padY} L ${pts[0].x},${height - padY} Z`;

    let peakIdx = 0;
    let troughIdx = 0;
    data.forEach((v, i) => {
      if (v > data[peakIdx]) peakIdx = i;
      if (v < data[troughIdx]) troughIdx = i;
    });

    return { points: pts, areaPath, linePath, min, max, peakIdx, troughIdx };
  }, [data, height, smooth]);

  const formatInr = (v: number) => {
    if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)}Cr`;
    if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)}L`;
    if (v >= 1e3) return `₹${(v / 1e3).toFixed(1)}K`;
    return `₹${Math.round(v)}`;
  };

  const gradId = `eq-grad-${color.replace('#', '')}`;
  const glowId = `eq-glow-${color.replace('#', '')}`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
        onMouseLeave={() => setHoverIdx(null)}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const xRel = ((e.clientX - rect.left) / rect.width) * width;
          const idx = Math.max(0, Math.min(data.length - 1, Math.round(((xRel - padX) / (width - padX * 2)) * (data.length - 1))));
          setHoverIdx(idx);
        }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor={color} stopOpacity={fillOpacity} />
            <stop offset="60%" stopColor={color} stopOpacity={fillOpacity * 0.5} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {showGrid && (
          <g opacity={0.18}>
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1={padX}
                y1={padY + t * (height - padY * 2)}
                x2={width - padX}
                y2={padY + t * (height - padY * 2)}
                stroke="#ffffff"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            ))}
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={`v${t}`}
                x1={padX + t * (width - padX * 2)}
                y1={padY}
                x2={padX + t * (width - padX * 2)}
                y2={height - padY}
                stroke="#ffffff"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            ))}
          </g>
        )}

        {showAxis && (
          <g fill="#ffffff" opacity={0.45} fontSize="9" fontFamily="ui-monospace, 'SF Mono', Menlo, monospace">
            <text x={padX} y={padY - 6}>{formatInr(max)}</text>
            <text x={padX} y={height - padY + 14}>{formatInr(min)}</text>
            <text x={width - padX} y={height - padY + 14} textAnchor="end">today</text>
            <text x={padX} y={height - padY + 14}>6mo ago</text>
          </g>
        )}

        <path d={areaPath} fill={`url(#${gradId})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.2" filter={`url(#${glowId})`} strokeLinecap="round" />

        {markPeakAndTrough && (
          <g>
            <circle cx={points[peakIdx].x}  cy={points[peakIdx].y} r="5" fill="#10B981" stroke="#0a1518" strokeWidth="2" />
            <circle cx={points[troughIdx].x} cy={points[troughIdx].y} r="5" fill="#EF4444" stroke="#0a1518" strokeWidth="2" />
            <text x={points[peakIdx].x + 8} y={points[peakIdx].y - 4} fontSize="9" fill="#10B981" fontFamily="ui-monospace, monospace">peak {formatInr(data[peakIdx])}</text>
          </g>
        )}

        {hoverIdx !== null && (
          <g>
            <line
              x1={points[hoverIdx].x}
              y1={padY}
              x2={points[hoverIdx].x}
              y2={height - padY}
              stroke={color}
              strokeWidth="0.8"
              strokeDasharray="3 3"
              opacity={0.5}
            />
            <circle
              cx={points[hoverIdx].x}
              cy={points[hoverIdx].y}
              r="5"
              fill={color}
              stroke="#000"
              strokeWidth="2"
            />
            <g transform={`translate(${Math.min(width - 120, Math.max(padX, points[hoverIdx].x + 8))}, ${Math.max(padY, points[hoverIdx].y - 38)})`}>
              <rect width="110" height="32" rx="6" fill="rgba(0,0,0,0.85)" stroke={color} strokeOpacity="0.4" />
              <text x="10" y="14" fontSize="10" fill="#9CA3AF" fontFamily="ui-monospace, monospace">day {hoverIdx + 1}</text>
              <text x="10" y="26" fontSize="12" fill="#fff" fontFamily="ui-monospace, monospace" fontWeight="600">{formatInr(data[hoverIdx])}</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
