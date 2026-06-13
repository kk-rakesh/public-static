/**
 * 3D-looking order-book wireframe mesh.
 * Stylised depth-of-market visualisation — looks like infrastructure, not stock illustration.
 */

import { useEffect, useMemo, useRef, useState } from 'react';

type OrderBookMeshProps = {
  rows?: number;
  cols?: number;
  className?: string;
};

export function OrderBookMesh({ rows = 22, cols = 28, className = '' }: OrderBookMeshProps) {
  const [phase, setPhase] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    let start = performance.now();
    const tick = (t: number) => {
      setPhase((t - start) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Project (x, y, z) into iso-ish 2D
  const project = (x: number, y: number, z: number) => {
    const xs = 18;
    const ys = 9;
    return {
      px: x * xs - y * xs * 0.55,
      py: -z * 1.5 + y * ys + x * 2.5,
    };
  };

  const cells = useMemo(() => {
    const out: Array<{ x: number; y: number; baseZ: number }> = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const distFromMid = Math.abs(x - cols / 2);
        const baseZ = Math.max(0, 14 - distFromMid * 0.9) + Math.sin(x * 0.5 + y * 0.3) * 3;
        out.push({ x, y, baseZ });
      }
    }
    return out;
  }, [rows, cols]);

  const heightOf = (x: number, y: number) =>
    cells[y * cols + x].baseZ +
    Math.sin(x * 0.4 + phase * 1.3) * 4 +
    Math.cos(y * 0.4 + phase * 0.8) * 3 +
    Math.sin((x + y) * 0.3 + phase * 0.6) * 2;

  // Build line paths along x and along y
  const xPaths: string[] = [];
  const yPaths: string[] = [];
  const points: Array<{ x: number; y: number; z: number; px: number; py: number }> = [];

  for (let y = 0; y < rows; y++) {
    let path = '';
    for (let x = 0; x < cols; x++) {
      const z = heightOf(x, y);
      const p = project(x - cols / 2, y - rows / 2, z);
      points.push({ x, y, z, px: p.px, py: p.py });
      path += `${x === 0 ? 'M' : 'L'} ${p.px} ${p.py} `;
    }
    xPaths.push(path);
  }
  for (let x = 0; x < cols; x++) {
    let path = '';
    for (let y = 0; y < rows; y++) {
      const z = heightOf(x, y);
      const p = project(x - cols / 2, y - rows / 2, z);
      path += `${y === 0 ? 'M' : 'L'} ${p.px} ${p.py} `;
    }
    yPaths.push(path);
  }

  return (
    <svg viewBox="-280 -200 560 400" className={`w-full h-auto ${className}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="meshFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#A8FF60" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#A8FF60" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#A8FF60" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="hotspot" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor="#A8FF60" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#A8FF60" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.6" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="-280" y="-200" width="560" height="400" fill="url(#hotspot)" />

      <g stroke="url(#meshFade)" strokeWidth="0.55" fill="none" filter="url(#glow)">
        {xPaths.map((p, i) => (
          <path key={`x${i}`} d={p} opacity={0.4 + (i / rows) * 0.55} />
        ))}
        {yPaths.map((p, i) => (
          <path key={`y${i}`} d={p} opacity={0.25 + (1 - i / cols) * 0.5} />
        ))}
      </g>

      {/* Highlight ridge — the bid/ask spine */}
      <g stroke="#A8FF60" strokeWidth="1.2" fill="none">
        {(() => {
          let path = '';
          const midY = Math.floor(rows / 2);
          for (let x = 0; x < cols; x++) {
            const z = heightOf(x, midY) + 1.2;
            const p = project(x - cols / 2, midY - rows / 2, z);
            path += `${x === 0 ? 'M' : 'L'} ${p.px} ${p.py} `;
          }
          return <path d={path} />;
        })()}
      </g>

      {/* Crosshair ticks */}
      <g stroke="#A8FF60" strokeWidth="0.6" opacity="0.4">
        <line x1="-260" y1="-180" x2="-240" y2="-180" />
        <line x1="-260" y1="-180" x2="-260" y2="-160" />
        <line x1="260"  y1="180"  x2="240"  y2="180" />
        <line x1="260"  y1="180"  x2="260"  y2="160" />
      </g>
      <text x="-258" y="-186" fontSize="8" fontFamily="ui-monospace, monospace" fill="#A8FF60" opacity="0.7">DEPTH</text>
      <text x="240" y="190" fontSize="8" fontFamily="ui-monospace, monospace" fill="#A8FF60" opacity="0.7" textAnchor="end">BID · ASK · SPREAD</text>
    </svg>
  );
}
