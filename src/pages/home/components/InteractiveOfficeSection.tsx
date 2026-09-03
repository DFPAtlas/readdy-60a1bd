export default function InteractiveOfficeSection() {
  return (
    <section className="py-20 md:py-28 bg-background-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Interactive Experience</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
            See your workspace in real time
          </h2>
          <p className="text-base text-foreground-600 max-w-xl mx-auto leading-relaxed">
            Every desk, every floor, every site — live occupancy data at a glance. Scan a desk tag with any phone and watch the dashboard update instantly.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-background-200/70 bg-background-50">
          <img
            src="https://readdy.ai/api/search-image?query=Digital%20interactive%20floorplan%20dashboard%20with%20color%20coded%20hot%20desk%20zones%2C%20modern%20UI%20design%2C%20clean%20minimalist%20interface%2C%20real%20time%20occupancy%20indicators%20with%20green%20and%20amber%20status%20dots%2C%20warm%20neutral%20color%20palette%2C%20professional%20SaaS%20dashboard%20aesthetic%2C%20soft%20shadows%2C%20friendly%20rounded%20cards%2C%20corporate%20workspace%20management%20tool%20with%20drag%20and%20drop%20desk%20cards%2C%20light%20background%2C%20high%20detail%20UI%20mockup&width=1600&height=900&seq=interactive-office-hotspot&orientation=landscape"
            alt="Interactive office floorplan dashboard showing real-time desk occupancy"
            title="HotDesk Hub — Interactive floorplan view with live desk status"
            className="w-full h-auto object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-foreground-900/60 via-transparent to-transparent"></div>

          <div className="absolute top-4 md:top-6 right-4 md:right-6 flex flex-col gap-1.5 md:gap-2">
            <div className="bg-background-50/90 backdrop-blur-md rounded-md md:rounded-lg px-2 md:px-3 py-1 md:py-2 border border-background-200/50 flex items-center gap-1.5 md:gap-2">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-accent-500 flex-shrink-0"></span>
              <span className="text-xs font-medium text-foreground-800 whitespace-nowrap">12 Occupied</span>
            </div>
            <div className="bg-background-50/90 backdrop-blur-md rounded-md md:rounded-lg px-2 md:px-3 py-1 md:py-2 border border-background-200/50 flex items-center gap-1.5 md:gap-2">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-secondary-400 flex-shrink-0"></span>
              <span className="text-xs font-medium text-foreground-800 whitespace-nowrap">8 Available</span>
            </div>
            <div className="bg-background-50/90 backdrop-blur-md rounded-md md:rounded-lg px-2 md:px-3 py-1 md:py-2 border border-background-200/50 flex items-center gap-1.5 md:gap-2">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-foreground-300 flex-shrink-0"></span>
              <span className="text-xs font-medium text-foreground-800 whitespace-nowrap">3 Booked</span>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex -space-x-1.5 md:-space-x-2">
                <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary-200 border-2 border-background-50 flex items-center justify-center text-xs font-bold text-primary-700">A</span>
                <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent-200 border-2 border-background-50 flex items-center justify-center text-xs font-bold text-accent-700">M</span>
                <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary-200 border-2 border-background-50 flex items-center justify-center text-xs font-bold text-secondary-700">L</span>
              </div>
              <span className="text-xs md:text-sm text-background-50 font-medium">Floor 3 — Active now</span>
            </div>
            <span className="text-xs text-background-50/80 bg-foreground-900/40 backdrop-blur-md rounded-full px-3 md:px-4 py-1 md:py-1.5 whitespace-nowrap">
              Last updated 3s ago
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}