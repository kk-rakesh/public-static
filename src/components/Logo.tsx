type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={className}
      style={{ fontFamily: 'var(--font-logo)', fontWeight: 700, letterSpacing: '-0.04em' }}
    >
      <span style={{ color: '#B0122B' }}>O</span>
      <span style={{ color: '#0470d9' }}>4</span>
      <span className="text-secondary">F</span>
    </span>
  );
}
