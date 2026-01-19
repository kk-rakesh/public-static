"use client";

import Link from "next/link";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <Link href="/" className="block">
        <Logo />
        <p className="text-text-gray text-sm mt-1">Engineering your next 10x</p>
      </Link>
      <Link
        href="/login"
        className="text-sm font-medium hover:text-brand-green transition-colors"
      >
        Investors Login
      </Link>
    </header>
  );
}
