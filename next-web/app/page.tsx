import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ExpandableText from "@/components/home/ExpandableText";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="flex-1 w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />

        <main className="py-4 lg:py-8">
          {/* Two-column grid: text + image, collapses on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,545px)_310px] gap-4 lg:gap-8 items-start">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
              <h1 className="text-[clamp(28px,5vw,36px)] font-bold leading-tight mb-4">
                <span className="text-brand-green">F</span> is for Futures.
              </h1>
              <ExpandableText />
            </div>

            {/* Image Column */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <Image
                src="/minimal.png"
                alt="O4F - Options For Futures"
                width={310}
                height={310}
                priority
                className="w-full max-w-[310px] h-auto"
              />
            </div>
          </div>
        </main>
      </div>

      <div className="mt-auto w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Footer />
      </div>
    </div>
  );
}
