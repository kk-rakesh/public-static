type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={className}>
      <span className="text-[#B0122B]">O</span>
      <span className="text-[#0470d9]">4</span>
      <span className="text-secondary">F</span>
    </span>
  );
}
