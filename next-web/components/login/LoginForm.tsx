"use client";

import { useState, FormEvent } from "react";

interface LoginFormProps {
  onSignupClick: () => void;
}

export default function LoginForm({ onSignupClick }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) return;

    // Simulate login (replace with actual auth logic)
    try {
      // For demo purposes, show error for any login attempt
      setError("Invalid email or password");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Username/Email Field */}
      <div>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5588ff] transition-colors ${
            error && isShaking ? "border-[#ff5555] animate-shake" : "border-gray-300"
          }`}
          placeholder="Username or Email"
          autoComplete="email"
        />
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5588ff] transition-colors pr-12 ${
            error && isShaking ? "border-[#ff5555] animate-shake" : "border-gray-300"
          }`}
          placeholder="Password"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-[#ff5555] text-sm animate-fade-in">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
          isFormValid
            ? "bg-[#88dd55] text-white hover:bg-opacity-90 cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Login
      </button>

      {/* Intent Form Note */}
      <p className="text-center text-sm text-text-gray italic mt-6">
        If you have submitted the O4F Intent Form, please check your email for more details.
      </p>

      {/* Sign Up Link */}
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={onSignupClick}
          className="text-[#5588ff] font-medium hover:underline cursor-pointer"
        >
          Join Waitlist
        </button>
      </div>
    </form>
  );
}
