type SparklineProps = {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  fill?: boolean;
};

export function Sparkline({ data, color = '#10B981', height = 40, width = 120, fill = true }: SparklineProps) {
  if (data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const x = (i: number) => (i / (data.length - 1)) * width;
  const y = (v: number) => height - ((v - min) / range) * height;

  let path = `M ${x(0)},${y(data[0])}`;
  for (let i = 1; i < data.length; i++) {
    const cpX = (x(i - 1) + x(i)) / 2;
    path += ` C ${cpX},${y(data[i - 1])} ${cpX},${y(data[i])} ${x(i)},${y(data[i])}`;
  }
  const area = `${path} L ${x(data.length - 1)},${height} L 0,${height} Z`;
  const id = `spark-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${id})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
