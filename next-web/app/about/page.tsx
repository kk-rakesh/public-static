import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TechEra from "@/components/home/TechEra";
import WhyO4F from "@/components/home/WhyO4F";
import ResearchInnovation from "@/components/home/ResearchInnovation";
import OurMission from "@/components/home/OurMission";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />
        <div className="pt-8 pb-4">
          <h1 className="text-[clamp(28px,5vw,36px)] font-bold leading-tight mb-3">
            About O4F
          </h1>
          <p className="text-text-gray text-lg">
            Building the foundation for the AI economy.
          </p>
        </div>
      </div>

      <TechEra />
      <WhyO4F />
      <ResearchInnovation />
      <OurMission />

      <div className="mt-auto w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Footer />
      </div>
    </div>
  );
}
