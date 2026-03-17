import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div className="w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />

        <main className="py-12 lg:py-20 max-w-[600px]">
          <div className="text-brand-green mb-8">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
              <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="34" cy="18" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M4 38c0-7.73 6.27-14 14-14s14 6.27 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M34 28c4.42 0 8 3.58 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <h1 className="text-[clamp(28px,5vw,36px)] font-bold leading-tight mb-6">
            Join the Builders
          </h1>

          <p className="text-text-gray mb-4">
            We are building a team of engineers, researchers, and thinkers who want to create lasting systems.
          </p>
          <p className="text-text-gray mb-10">
            If you want to work on deep technology with real-world impact, we would love to connect.
          </p>

          <a
            href="mailto:hello@o4f.com"
            className="inline-block px-8 py-4 bg-brand-green text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-150"
          >
            Get in touch
          </a>
        </main>
      </div>

      <div className="mt-auto w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <Footer />
      </div>
    </div>
  );
}
