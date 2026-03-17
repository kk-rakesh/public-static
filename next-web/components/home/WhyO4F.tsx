export default function WhyO4F() {
  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">

        {/* Why O4F */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Why O4F</h2>
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
              <div key={item.label} className="border border-gray-200 rounded-xl p-6">
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

        {/* Research & Innovation */}
        <div>
          <h3 className="text-xl font-bold mb-4">Research & Innovation</h3>
          <p className="text-text-gray mb-6">Our work spans multiple domains including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: "AI infrastructure", icon: <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden><rect x="4" y="4" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="24" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="24" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><line x1="14.5" y1="12" x2="21.5" y2="12" stroke="currentColor" strokeWidth="1.5" /><line x1="14.5" y1="24" x2="21.5" y2="24" stroke="currentColor" strokeWidth="1.5" /><line x1="12" y1="14.5" x2="12" y2="21.5" stroke="currentColor" strokeWidth="1.5" /><line x1="24" y1="14.5" x2="24" y2="21.5" stroke="currentColor" strokeWidth="1.5" /></svg> },
              { label: "Intelligent trading systems", icon: <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden><polyline points="4,28 10,18 16,22 22,10 30,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="30" cy="6" r="3" fill="currentColor" /><line x1="4" y1="32" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
              { label: "Distributed compute networks", icon: <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden><rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="23" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="3" y="23" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="23" y="23" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><line x1="13" y1="8" x2="23" y2="8" stroke="currentColor" strokeWidth="1.5" /><line x1="8" y1="13" x2="8" y2="23" stroke="currentColor" strokeWidth="1.5" /><line x1="28" y1="13" x2="28" y2="23" stroke="currentColor" strokeWidth="1.5" /><line x1="13" y1="28" x2="23" y2="28" stroke="currentColor" strokeWidth="1.5" /></svg> },
              { label: "Real-time data platforms", icon: <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden><rect x="4" y="8" width="28" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="4" y="16" width="20" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="4" y="24" width="24" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="30" cy="18.5" r="3.5" fill="currentColor" /></svg> },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-4 border border-gray-200 rounded-xl p-6">
                <div className="text-brand-green flex-shrink-0">{d.icon}</div>
                <span className="text-text-gray text-sm">{d.label}</span>
              </div>
            ))}
          </div>
          <p className="text-text-gray">
            We focus on long-term technological foundations rather than short-term products.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex gap-4 items-start mb-6">
            <div className="text-brand-green flex-shrink-0 mt-1">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="24" cy="24" r="2.5" fill="currentColor" />
                <line x1="24" y1="6" x2="24" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="32" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="24" x2="16" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="32" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mt-2">Our Mission</h3>
          </div>
          <p className="text-text-gray mb-3">To build systems that expand human capability.</p>
          <p className="text-text-gray mb-3">Technology should not simply optimize the present.</p>
          <p className="text-text-gray">It should create new possibilities for the future.</p>
        </div>

        {/* Join the Builders */}
        <div className="border border-gray-200 rounded-2xl p-8">
          <div className="flex gap-4 items-start mb-4">
            <div className="text-brand-green flex-shrink-0 mt-1">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden>
                <circle cx="18" cy="14" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="34" cy="18" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M4 38c0-7.73 6.27-14 14-14s14 6.27 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M34 28c4.42 0 8 3.58 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mt-2">Join the Builders</h3>
          </div>
          <p className="text-text-gray mb-3">
            We are building a team of engineers, researchers, and thinkers who want to create lasting systems.
          </p>
          <p className="text-text-gray mb-6">
            If you want to work on deep technology with real-world impact, we would love to connect.
          </p>
          <a
            href="mailto:hello@o4f.com"
            className="inline-block px-6 py-3 bg-brand-green text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-150"
          >
            Get in touch
          </a>
        </div>

      </div>
    </section>
  );
}
