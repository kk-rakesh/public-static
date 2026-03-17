const features = [
  {
    title: "Real-Time Data Infrastructure",
    description:
      "Modern systems require continuous awareness of the world. Our platform ingests and processes massive real-time streams.",
    bullets: [
      "financial market data",
      "broker and exchange feeds",
      "external signals and events",
      "news and sentiment data",
    ],
    suffix: "All processed in milliseconds.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="4" y="10" width="32" height="4" rx="2" fill="currentColor" opacity="0.9" />
        <rect x="4" y="18" width="24" height="4" rx="2" fill="currentColor" opacity="0.65" />
        <rect x="4" y="26" width="28" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <circle cx="34" cy="28" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "AI Native Decision Systems",
    description:
      "O4F systems turn data into intelligent action. Our platform supports the full intelligence stack.",
    bullets: [
      "AI agents",
      "quantitative models",
      "signal generation",
      "automated decision engines",
    ],
    suffix: "Enabling organizations to detect opportunities and act instantly.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="20" y1="4" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="28" x2="20" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8.69" y1="8.69" x2="14.34" y2="14.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="25.66" y1="25.66" x2="31.31" y2="31.31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="31.31" y1="8.69" x2="25.66" y2="14.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="14.34" y1="25.66" x2="8.69" y2="31.31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Autonomous Trading Infrastructure",
    description:
      "We build highly optimized systems for modern markets covering the full lifecycle from research to production.",
    bullets: [
      "strategy development frameworks",
      "backtesting environments",
      "real-time execution engines",
      "risk management pipelines",
    ],
    suffix: "Research → Simulation → Production, unified.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <polyline points="4,30 12,20 18,24 26,12 36,8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="36" cy="8" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Ultra-Low Latency Compute",
    description:
      "Speed matters. Our infrastructure is designed for decisions that occur at machine speed.",
    bullets: [
      "event-driven processing",
      "high-frequency decision pipelines",
      "distributed compute networks",
      "optimized execution pathways",
    ],
    suffix: null,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M22 4L10 22h12l-4 14 18-18H24L28 4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
];

export default function WhatWeBuild() {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-bold mb-6">What We Build</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-shadow duration-200"
            >
              <div className="text-brand-green mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-text-gray text-sm mb-3">{f.description}</p>
              <ul className="space-y-1 mb-3">
                {f.bullets.map((b) => (
                  <li key={b} className="text-text-gray text-sm flex items-start gap-2">
                    <span className="text-brand-green font-bold leading-5">•</span>
                    {b}
                  </li>
                ))}
              </ul>
              {f.suffix && (
                <p className="text-sm font-medium mt-2">{f.suffix}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
