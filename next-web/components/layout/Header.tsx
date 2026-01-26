"use client";

import Link from "next/link";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="py-3">
      <Link href="/" className="block">
        <Logo />
      </Link>
      <div className="flex justify-between items-start mt-1">
        <p className="text-text-gray text-sm">Engineering your next 10x</p>
        <Link
          href="/login"
          className="text-sm text-text-gray hover:bg-gray-100 hover:shadow-sm px-4 py-2 rounded-lg transition-all -mt-1"
        >
          Investors Login
        </Link>
      </div>
    </header>
  );
}
