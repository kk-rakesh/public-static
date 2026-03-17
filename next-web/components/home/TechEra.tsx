"use client";

import { useState } from "react";

const eras = [
  {
    id: "software",
    label: "Software",
    year: "1980s – 2000s",
    headline: "Software transformed industries.",
    detail:
      "Automation replaced manual processes, enabling businesses to scale operations and deliver repeatable results. Software became the backbone of every industry.",
  },
  {
    id: "data",
    label: "Data",
    year: "2000s – 2020s",
    headline: "Data transformed businesses.",
    detail:
      "Organizations that mastered data gained decisive competitive edges. Insight became the new currency — driving strategy, product, and market position.",
  },
  {
    id: "ai",
    label: "AI",
    year: "Now →",
    headline: "AI will transform decision-making.",
    detail:
      "Intelligence at machine speed, informed by real-time data and executed autonomously. The next layer is not just analysis — it is action.",
  },
];

export default function TechEra() {
  const [active, setActive] = useState("ai");

  const activeEra = eras.find((e) => e.id === active)!;

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-bold mb-6">The Next Era of Technology</h2>

        {/* Timeline */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-8">
          {eras.map((era, i) => (
            <div key={era.id} className="flex sm:flex-row flex-col sm:items-center">
              {/* Era node */}
              <button
                onClick={() => setActive(era.id)}
                className={`flex flex-col gap-1 px-5 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer focus:outline-none text-left
                  ${
                    active === era.id
                      ? "border-brand-green bg-[#6dd03f10] text-black"
                      : "border-gray-200 bg-white text-text-gray hover:border-gray-400"
                  }`}
              >
                <span className={`text-xs font-medium tracking-wide ${active === era.id ? "text-brand-green" : "text-text-gray"}`}>
                  {era.year}
                </span>
                <span className="text-base font-bold">{era.label}</span>
              </button>

              {/* Arrow connector — horizontal on sm+, vertical on mobile */}
              {i < eras.length - 1 && (
                <>
                  {/* Horizontal arrow (sm+) */}
                  <div className="hidden sm:flex items-center px-2">
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden>
                      <line x1="0" y1="8" x2="24" y2="8" stroke={active === eras[i + 1].id ? "#6dd03f" : "#d1d5db"} strokeWidth="2" />
                      <polyline points="20,3 28,8 20,13" stroke={active === eras[i + 1].id ? "#6dd03f" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                  {/* Vertical arrow (mobile) */}
                  <div className="flex sm:hidden items-center justify-start pl-6 py-1">
                    <svg width="16" height="24" viewBox="0 0 16 32" fill="none" aria-hidden>
                      <line x1="8" y1="0" x2="8" y2="24" stroke={active === eras[i + 1].id ? "#6dd03f" : "#d1d5db"} strokeWidth="2" />
                      <polyline points="3,20 8,28 13,20" stroke={active === eras[i + 1].id ? "#6dd03f" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div
          key={active}
          className="border border-gray-200 rounded-xl p-6 mb-10 animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 rounded-full bg-brand-green flex-shrink-0" />
            <div>
              <p className="text-lg font-semibold mb-1">{activeEra.headline}</p>
              <p className="text-text-gray">{activeEra.detail}</p>
            </div>
          </div>
        </div>

        <p className="text-text-gray mb-8">
          But intelligence at scale requires something deeper:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            "Real-time data infrastructure",
            "AI-native platforms",
            "High-performance compute networks",
            "Autonomous execution systems",
          ].map((label) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-brand-green font-bold text-lg leading-none">—</span>
              <span className="text-text-gray">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-text-gray">
          O4F is building the foundation for this new era.
        </p>
      </div>
    </section>
  );
}
