"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/login/LoginForm";
import SignupModal from "@/components/login/SignupModal";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="flex-1 w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header with Logo - same container as home page */}
        <header className="py-3">
          <Link href="/" className="block">
            <Logo />
          </Link>
          <div className="mt-1">
            <p className="text-text-gray text-sm">Engineering your next 10x</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center py-4 lg:py-8">
          {/* Title */}
          <h1 className="text-3xl font-light text-center mb-4">Investors Login</h1>

          {/* Subtitle */}
          <p className="text-center text-text-gray mb-8 max-w-md">
            Please note that access is currently <strong className="font-semibold text-black">invite only</strong>.
          </p>

          {/* Login Form */}
          <div className="max-w-md w-full">
            <LoginForm onSignupClick={() => setShowSignupModal(true)} />
          </div>

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
      </div>

      <div className="mt-auto w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Footer showNav={false} />
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
    </div>
  );
}
