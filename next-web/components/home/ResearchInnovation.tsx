export default function ResearchInnovation() {
  return (
    <section className="w-full py-8 lg:py-12">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-xl font-bold mb-4">Research & Innovation</h2>
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
    </section>
  );
}
