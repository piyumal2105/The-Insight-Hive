export default function HexLogo({ size = 40 }: { size?: number }) {
  const barCount = 7;
  const barWidth = size * 0.06;
  const gap = size * 0.04;
  const totalBarsWidth = barCount * barWidth + (barCount - 1) * gap;
  const startX = (size - totalBarsWidth) / 2;
  const heights = [0.4, 0.6, 0.85, 1.0, 0.85, 0.6, 0.4];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A2E8C" />
          <stop offset="50%" stopColor="#C2436B" />
          <stop offset="100%" stopColor="#E8722E" />
        </linearGradient>
        <clipPath id="hexClip">
          <polygon points={`${size*0.5},0 ${size*0.93},${size*0.25} ${size*0.93},${size*0.75} ${size*0.5},${size} ${size*0.07},${size*0.75} ${size*0.07},${size*0.25}`} />
        </clipPath>
      </defs>
      <polygon
        points={`${size*0.5},0 ${size*0.93},${size*0.25} ${size*0.93},${size*0.75} ${size*0.5},${size} ${size*0.07},${size*0.75} ${size*0.07},${size*0.25}`}
        fill="url(#hexGrad)"
      />
      <g clipPath="url(#hexClip)">
        {Array.from({ length: barCount }).map((_, i) => {
          const x = startX + i * (barWidth + gap);
          const h = heights[i] * size * 0.55;
          const y = (size - h) / 2;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={barWidth / 2}
              fill="rgba(255,255,255,0.9)"
            />
          );
        })}
      </g>
    </svg>
  );
}
