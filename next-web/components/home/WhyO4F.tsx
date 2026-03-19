export default function WhyO4F() {
  return (
    <section className="w-full bg-gray-100 py-8 lg:py-12">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-xl font-bold mb-6">Why O4F</h2>
        <p className="text-text-gray mb-8">We are building technology for a world where:</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Decisions are automated",
              detail: "Intelligent systems act on signals the moment they occur — no human bottleneck.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <rect x="8" y="14" width="32" height="22" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="17" cy="25" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="31" cy="25" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="20" y1="25" x2="28" y2="25" stroke="currentColor" strokeWidth="2" />
                  <line x1="17" y1="36" x2="17" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="31" y1="36" x2="31" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="42" x2="36" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="24" cy="5" r="2" fill="currentColor" />
                </svg>
              ),
            },
            {
              label: "Intelligence is distributed",
              detail: "No single point of failure. Intelligence lives across a resilient network of nodes.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="40" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="8" cy="36" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="40" cy="36" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="11" y1="14" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="37" y1="14" x2="27" y2="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="11" y1="34" x2="21" y2="27" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="37" y1="34" x2="27" y2="27" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                </svg>
              ),
            },
            {
              label: "Systems react instantly",
              detail: "From signal to action in microseconds. Latency is eliminated as a constraint.",
              icon: (
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <path d="M26 4L12 26h14l-4 18L42 22H28L32 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-brand-green mb-4">{item.icon}</div>
              <p className="text-base font-semibold mb-2">{item.label}</p>
              <p className="text-text-gray text-sm leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-text-gray mb-2">The next generation of infrastructure will not just process data.</p>
        <p className="text-text-gray mb-2">It will understand and act.</p>
        <p className="text-text-gray">O4F is building that infrastructure.</p>
      </div>
    </section>
  );
}
