import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getAssetPath } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O4F - Options For Futures",
  description: "Building generational wealth. The future should be accessible to everyone.",
  keywords: ["fintech", "investment", "futures", "options", "wealth management"],
  authors: [{ name: "O4F LLP" }],
  icons: {
    icon: getAssetPath("/favicon.svg"),
  },
  openGraph: {
    title: "O4F - Options For Futures",
    description: "Building generational wealth. The future should be accessible to everyone.",
    url: "https://o4f.co.in",
    siteName: "O4F",
    type: "website",
  },
  other: {
    "color-scheme": "light only",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans bg-white text-black`}>
        {children}
      </body>
    </html>
  );
}
