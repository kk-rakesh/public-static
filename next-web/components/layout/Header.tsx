"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="py-3">
      {/* Row 1: Logo + Login */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <Link href="/" className="block">
            <Logo />
          </Link>
          <p className="text-text-gray text-sm mt-0.5">Engineering your next 10x</p>
        </div>
        <Link
          href="/login"
          className="text-sm text-text-gray hover:bg-gray-100 hover:shadow-sm px-4 py-1.5 rounded-lg transition-all whitespace-nowrap"
        >
          Investors Login
        </Link>
      </div>

      {/* Row 2: Nav links — spread on mobile, right-aligned on desktop */}
      <nav className="flex items-center justify-between sm:justify-end gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-1.5 rounded-lg transition-all whitespace-nowrap
                ${isActive
                  ? "text-black font-medium bg-gray-100"
                  : "text-text-gray hover:text-black hover:bg-gray-100"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
