import { useMemo } from 'react';

type DrawdownChartProps = {
  data: number[]; // negative percent values
  height?: number;
  color?: string;
};

export function DrawdownChart({ data, height = 140, color = '#EF4444' }: DrawdownChartProps) {
  const width = 900;
  const padX = 40;
  const padY = 18;

  const { areaPath, max } = useMemo(() => {
    const max = Math.min(...data); // most negative
    const x = (i: number) => padX + (i / (data.length - 1)) * (width - padX * 2);
    const y = (v: number) => padY + (v / max) * (height - padY * 2);
    let path = `M ${x(0)},${padY}`;
    for (let i = 0; i < data.length; i++) {
      path += ` L ${x(i)},${y(data[i])}`;
    }
    path += ` L ${x(data.length - 1)},${padY} Z`;
    return { areaPath: path, max };
  }, [data, height]);

  const gradId = `dd-${color.replace('#', '')}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g opacity={0.15}>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={padX} y1={padY + t * (height - padY * 2)} x2={width - padX} y2={padY + t * (height - padY * 2)} stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" />
        ))}
      </g>
      <path d={areaPath} fill={`url(#${gradId})`} stroke={color} strokeWidth="1.5" strokeOpacity="0.8" />
      <g fill="#fff" opacity={0.5} fontSize="9" fontFamily="ui-monospace, monospace">
        <text x={padX} y={padY - 4}>0%</text>
        <text x={padX} y={height - padY + 12}>{max.toFixed(1)}%</text>
        <text x={width - padX} y={padY - 4} textAnchor="end">DRAWDOWN</text>
      </g>
    </svg>
  );
}
