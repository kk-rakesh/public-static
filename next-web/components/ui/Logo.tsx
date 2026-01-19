"use client";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`font-bold text-2xl tracking-tight ${className}`}>
      <span className="text-[#ff5555]">O</span>
      <span className="text-[#5588ff]">4</span>
      <span className="text-[#88dd55]">F</span>
    </span>
  );
}
