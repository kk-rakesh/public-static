import { TICKER_SYMBOLS } from '../../data/mock';

export function LiveTicker() {
  // Duplicate symbols so the marquee can loop seamlessly
  const symbols = [...TICKER_SYMBOLS, ...TICKER_SYMBOLS];

  return (
    <div className="w-full overflow-hidden border-y border-hairline bg-[#06070A]">
      <div className="flex items-center gap-8 py-2.5 animate-ticker whitespace-nowrap">
        {symbols.map((s, i) => {
          const up = s.change >= 0;
          return (
            <div key={`${s.symbol}-${i}`} className="flex items-center gap-3 font-mono text-xs">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 font-medium tracking-wide">{s.symbol}</span>
              <span className="text-white tabular-nums">{s.ltp.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
              <span className={up ? 'text-green-400' : 'text-red-400'}>
                {up ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)} ({up ? '+' : ''}
                {s.pct.toFixed(2)}%)
              </span>
              <span className="text-white/20">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
