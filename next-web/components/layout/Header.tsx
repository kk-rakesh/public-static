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
      <div className="flex justify-between items-center">
        <Link href="/" className="block">
          <Logo />
        </Link>
        <Link
          href="/login"
          className="text-sm text-text-gray hover:bg-gray-100 hover:shadow-sm px-4 py-2 rounded-lg transition-all"
        >
          Investors Login
        </Link>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-text-gray text-sm hidden sm:block">Engineering your next 10x</p>
        <nav className="flex items-center gap-1 overflow-x-auto">
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
      </div>
    </header>
  );
}
