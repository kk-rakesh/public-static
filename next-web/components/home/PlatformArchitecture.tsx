const layers = [
  {
    title: "Data Layer",
    description: "Aggregates real-time data from exchanges, brokers, and external sources.",
    bullets: ["streaming ingestion", "real-time analytics", "historical data storage", "event pipelines"],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <ellipse cx="18" cy="10" rx="12" ry="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M6 10v8c0 2.21 5.37 4 12 4s12-1.79 12-4v-8" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M6 18v8c0 2.21 5.37 4 12 4s12-1.79 12-4v-8" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    title: "Intelligence Layer",
    description: "Transforms raw data into insight through AI models and research tools.",
    bullets: ["AI models", "strategy builders", "quantitative research tools", "simulation frameworks"],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M18 4v6M18 26v6M4 18h6M26 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8.1 8.1l4.24 4.24M23.66 23.66l4.24 4.24M27.9 8.1l-4.24 4.24M12.34 23.66l-4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Execution Layer",
    description: "Deploys strategies directly into production environments.",
    bullets: ["execution engines", "order routing", "portfolio systems", "transaction processing"],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <polygon points="10,6 30,18 10,30" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    title: "Compute Fabric",
    description: "All layers run on a high-performance compute network optimized for speed and scale.",
    bullets: ["distributed nodes", "low-latency mesh", "auto-scaling", "fault tolerance"],
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="22" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="4" y="22" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="22" y="22" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="14" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="2" />
        <line x1="9" y1="14" x2="9" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="27" y1="14" x2="27" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto my-8">
      <svg
        viewBox="0 0 680 260"
        className="w-full max-w-[680px] mx-auto block"
        aria-label="O4F Platform Architecture Diagram"
      >
        {/* Data Layer */}
        <rect x="20" y="20" width="200" height="60" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="120" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#111">Data Layer</text>
        <text x="120" y="65" textAnchor="middle" fontSize="11" fill="#686767">Real-time ingestion &amp; storage</text>

        {/* Intelligence Layer */}
        <rect x="240" y="20" width="200" height="60" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="340" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#111">Intelligence Layer</text>
        <text x="340" y="65" textAnchor="middle" fontSize="11" fill="#686767">AI models &amp; strategy research</text>

        {/* Execution Layer */}
        <rect x="460" y="20" width="200" height="60" rx="8" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="560" y="46" textAnchor="middle" fontSize="13" fontWeight="600" fill="#111">Execution Layer</text>
        <text x="560" y="65" textAnchor="middle" fontSize="11" fill="#686767">Orders, routing &amp; portfolios</text>

        {/* Arrows between layers */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#6dd03f" />
          </marker>
        </defs>
        <line x1="221" y1="50" x2="238" y2="50" stroke="#6dd03f" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="441" y1="50" x2="458" y2="50" stroke="#6dd03f" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Compute Fabric bar */}
        <rect x="20" y="160" width="640" height="60" rx="8" fill="#6dd03f" fillOpacity="0.08" stroke="#6dd03f" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x="340" y="186" textAnchor="middle" fontSize="13" fontWeight="600" fill="#111">Compute Fabric</text>
        <text x="340" y="205" textAnchor="middle" fontSize="11" fill="#686767">High-performance distributed compute — underpins all layers</text>

        {/* Vertical connectors from layers to Compute Fabric */}
        <line x1="120" y1="80" x2="120" y2="160" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="340" y1="80" x2="340" y2="160" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
        <line x1="560" y1="80" x2="560" y2="160" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
    </div>
  );
}

export default function PlatformArchitecture() {
  return (
    <section className="w-full py-8 lg:py-12">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-xl font-bold mb-4">Platform Architecture</h2>
        <p className="text-text-gray mb-6">
          The O4F platform is built as a modular intelligent system.
        </p>

        <ArchitectureDiagram />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {layers.map((l) => (
            <div
              key={l.title}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-gray-300 transition-shadow duration-200"
            >
              <div className="text-brand-green mb-4">{l.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{l.title}</h3>
              <p className="text-text-gray text-sm mb-3">{l.description}</p>
              <ul className="space-y-1">
                {l.bullets.map((b) => (
                  <li key={b} className="text-text-gray text-sm flex items-start gap-2">
                    <span className="text-brand-green font-bold leading-5">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
