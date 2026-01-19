"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/login/LoginForm";
import SignupModal from "@/components/login/SignupModal";

export default function LoginPage() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black px-6 sm:px-12 lg:px-16 py-8">
      {/* Header with Logo */}
      <header className="mb-8 max-w-4xl">
        <Link href="/" className="inline-block">
          <Logo />
        </Link>
        <p className="text-text-gray text-sm mt-1">Engineering your next 10x</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        {/* Title */}
        <h1 className="text-3xl font-light text-center mb-4">Investors Login</h1>

        {/* Subtitle */}
        <p className="text-center text-text-gray mb-8">
          Please note that access is currently <strong className="font-semibold text-black">invite only</strong>.
        </p>

        {/* Login Form */}
        <LoginForm onSignupClick={() => setShowSignupModal(true)} />

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-text-gray hover:text-[#5588ff] transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 text-sm text-text-gray max-w-4xl">
        <p>@ 2026. O4F LLP. All rights reserved.</p>
        <p className="mt-1">O4F LLP, 205, 3rd Cross, Sector 2, HSR Layout, Bengaluru, Karnataka 560102</p>
      </footer>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
}
