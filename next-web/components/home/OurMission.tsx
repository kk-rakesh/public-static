export default function OurMission() {
  return (
    <section className="w-full bg-gray-100 py-8 lg:py-12">
      <div className="max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12">
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
          <h2 className="text-xl font-bold mt-2">Our Mission</h2>
        </div>
        <p className="text-text-gray mb-3">To build systems that expand human capability.</p>
        <p className="text-text-gray mb-3">Technology should not simply optimize the present.</p>
        <p className="text-text-gray">It should create new possibilities for the future.</p>
      </div>
    </section>
  );
}
