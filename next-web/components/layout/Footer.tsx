"use client";

import { useState } from "react";
import Modal from "../ui/Modal";

export default function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showWhoWeAre, setShowWhoWeAre] = useState(false);

  return (
    <>
      <footer className="py-8 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-0">
          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <button
              onClick={() => setShowWhoWeAre(true)}
              className="hover:text-brand-green transition-colors"
            >
              Who We Are
            </button>
            <button
              onClick={() => setShowComingSoon(true)}
              className="hover:text-brand-green transition-colors"
            >
              Blogs
            </button>
          </nav>

          {/* Copyright and Address */}
          <div className="text-sm text-text-gray text-left lg:text-right">
            <p>&copy; 2026 O4F LLP</p>
            <p className="mt-1 max-w-xs">
              205, 3rd Cross, Sector 2, HSR Layout, Bengaluru, Karnataka 560102
            </p>
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <Modal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Coming Soon"
        size="sm"
      >
        <div className="text-center py-8">
          <p className="text-text-gray">
            This feature is currently under development. Check back soon!
          </p>
        </div>
      </Modal>

      {/* Who We Are Modal */}
      <Modal
        isOpen={showWhoWeAre}
        onClose={() => setShowWhoWeAre(false)}
        title="Who We Are"
        size="md"
      >
        <div className="space-y-4 text-text-gray">
          <p>
            <strong className="text-foreground">O4F</strong> (Options For Futures) is dedicated to building generational wealth by making the future accessible to everyone.
          </p>
          <p>
            We empower investors through clarity and simplification in navigating modern markets.
          </p>
          <h3 className="font-semibold text-foreground pt-4">Our Expertise</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Deep systems expertise in fintech environments</li>
            <li>Quantitative and scientific rigor in research</li>
            <li>Experienced fintech leadership</li>
            <li>Platform engineering for trillion-dollar scale operations</li>
          </ul>
        </div>
      </Modal>
    </>
  );
}
