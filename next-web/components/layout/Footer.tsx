"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "../ui/Modal";

interface FooterProps {
  showNav?: boolean;
}

export default function Footer({ showNav = true }: FooterProps) {
  const [showWhoWeAre, setShowWhoWeAre] = useState(false);

  return (
    <>
      <footer className="py-4 border-t border-gray-100">
        <div className={`flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 ${!showNav ? 'lg:justify-end' : ''}`}>
          {/* Navigation Links */}
          {showNav && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <button
                onClick={() => setShowWhoWeAre(true)}
                className="hover:text-brand-green transition-colors cursor-pointer"
              >
                Who We Are
              </button>
              <Link
                href="/blogs"
                className="hover:text-brand-green transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/newsletters"
                className="hover:text-brand-green transition-colors"
              >
                Newsletters
              </Link>
            </nav>
          )}

          {/* Copyright and Address */}
          <div className="text-sm text-text-gray text-left lg:text-right">
            <p>&copy; 2026 O4F LLP</p>
            <p className="mt-1 max-w-xs">
              205, 3rd Cross, Sector 2, HSR Layout, Bengaluru, Karnataka 560102
            </p>
          </div>
        </div>
      </footer>

      {/* Who We Are Modal */}
      <Modal
        isOpen={showWhoWeAre}
        onClose={() => setShowWhoWeAre(false)}
        title="Who We Are"
        size="md"
      >
        <div className="space-y-4 text-text-gray">
          <p>
            <strong className="text-foreground">Deep Systems Expertise.</strong> Proven experience building and operating high-performance, low-latency, and distributed systems in demanding fintech environments.
          </p>
          <p>
            <strong className="text-foreground">Quantitative &amp; Scientific Rigor.</strong> Grounded in rigorous quantitative research, market microstructure, and systems-level optimization.
          </p>
          <p>
            <strong className="text-foreground">Experienced Fintech Leadership.</strong> Led by seasoned fintech leaders with a track record of scaling complex platforms and trading infrastructure.
          </p>
          <p>
            <strong className="text-foreground">Engineered for Massive Scale.</strong> Designing platforms to operate at trillion-dollar scale, driven by discipline, precision, and resilience.
          </p>
        </div>
      </Modal>
    </>
  );
}
