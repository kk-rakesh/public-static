const principles = [
  {
    name: "Modular",
    description: "Systems evolve without rebuilding the platform.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="24" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="4" y="24" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="24" y="24" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "Event Driven",
    description: "Real-world signals drive automated decisions.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <path
          d="M24 4L12 24h12l-4 16L40 20H28L32 4z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "AI Native",
    description: "AI is built into the architecture from day one.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <circle cx="22" cy="22" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M22 6v8M22 30v8M6 22h8M30 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10.1 10.1l5.66 5.66M28.24 28.24l5.66 5.66M33.9 10.1l-5.66 5.66M15.76 28.24l-5.66 5.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Real Time",
    description: "Intelligence must operate at machine speed.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="22" y1="10" x2="22" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="22" x2="30" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="22" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function TechPrinciples() {
  return (
    <section className="w-full bg-gray-50 py-8 lg:py-12">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-xl font-bold mb-4">Technology Principles</h2>
        <p className="text-text-gray mb-8">Great systems share common principles.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => (
            <div
              key={p.name}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-shadow duration-200"
            >
              <div className="text-brand-green mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
              <p className="text-text-gray text-sm">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
