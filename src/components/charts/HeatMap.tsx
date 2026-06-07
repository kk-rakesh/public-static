type HeatMapProps = {
  data: Array<{ strategy: string; months: number[] }>;
  monthLabels?: string[];
};

const DEFAULT_LABELS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

function colorFor(value: number): string {
  const abs = Math.min(20, Math.abs(value));
  const intensity = abs / 20;
  if (value >= 0) {
    return `rgba(16, 185, 129, ${0.15 + intensity * 0.75})`;
  }
  return `rgba(239, 68, 68, ${0.15 + intensity * 0.75})`;
}

export function HeatMap({ data, monthLabels = DEFAULT_LABELS }: HeatMapProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate" style={{ borderSpacing: '4px' }}>
        <thead>
          <tr>
            <th className="text-left text-[10px] uppercase tracking-widest text-white/40 font-mono px-2 py-1.5">
              Strategy
            </th>
            {monthLabels.map((m) => (
              <th key={m} className="text-center text-[10px] uppercase tracking-widest text-white/40 font-mono px-2 py-1.5 min-w-[42px]">
                {m}
              </th>
            ))}
            <th className="text-right text-[10px] uppercase tracking-widest text-white/40 font-mono px-2 py-1.5">
              YTD
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const ytd = row.months.reduce((s, v) => s + v, 0);
            return (
              <tr key={row.strategy}>
                <td className="text-xs font-medium text-white/85 px-2 py-1 whitespace-nowrap">{row.strategy}</td>
                {row.months.map((v, i) => (
                  <td
                    key={i}
                    className="text-center font-mono text-[11px] font-semibold rounded-md py-2 px-1 cursor-default transition-transform hover:scale-110 hover:shadow-lg"
                    style={{
                      background: colorFor(v),
                      color: Math.abs(v) > 5 ? '#fff' : 'rgba(255,255,255,0.85)',
                    }}
                    title={`${row.strategy}: ${v > 0 ? '+' : ''}${v.toFixed(1)}%`}
                  >
                    {v > 0 ? '+' : ''}
                    {v.toFixed(1)}
                  </td>
                ))}
                <td
                  className="text-right font-mono text-[12px] font-bold px-2"
                  style={{ color: ytd >= 0 ? '#10B981' : '#EF4444' }}
                >
                  {ytd > 0 ? '+' : ''}
                  {ytd.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
