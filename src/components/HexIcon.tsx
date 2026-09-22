export default function HexIcon({ children, size = 48 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
        background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)',
      }}
    >
      <span className="flex items-center justify-center" style={{ color: '#fff', fontSize: size * 0.42, lineHeight: 1 }}>{children}</span>
    </div>
  );
}
