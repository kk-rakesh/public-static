import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatWeBuild from "@/components/home/WhatWeBuild";
import PlatformArchitecture from "@/components/home/PlatformArchitecture";
import TechPrinciples from "@/components/home/TechPrinciples";

export default function PlatformPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />
        <div className="pt-8 pb-4">
          <h1 className="text-[clamp(28px,5vw,36px)] font-bold leading-tight mb-3">
            The O4F Platform
          </h1>
          <p className="text-text-gray text-lg">
            The infrastructure for intelligent decision systems.
          </p>
        </div>
      </div>

      <WhatWeBuild />
      <PlatformArchitecture />
      <TechPrinciples />

      <div className="mt-auto w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Footer />
      </div>
    </div>
  );
}
