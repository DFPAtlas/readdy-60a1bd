import { addOnServices, dataFlowAddons } from '@/mocks/billingData';

export default function AddOnsSection() {
  return (
    <section className="py-16 md:py-20 bg-background-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Add-ons & Services</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">Extend your platform</h2>
          <p className="text-sm text-foreground-500 max-w-xl mx-auto">
            Add data-flow levels, onboarding support, and hardware services as your workplace grows.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-6 text-center">Data-Flow Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {dataFlowAddons.map((level) => (
              <div key={level.level} className="bg-background-100 border border-background-200/70 rounded-lg p-4 md:p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent-500 text-background-50 flex items-center justify-center text-xs font-bold">{level.level}</span>
                  <span className="text-xs md:text-sm font-semibold text-foreground-900">{level.name}</span>
                </div>
                <p className="text-xs text-foreground-600 mb-2 flex-1">{level.description}</p>
                <p className="text-xs md:text-sm font-bold text-primary-600 mb-2 md:mb-3">{level.price}</p>
                <div className="flex flex-wrap gap-1">
                  {level.includedIn.map((plan) => (
                    <span key={plan} className="text-xs bg-background-50 border border-background-200/70 px-2 py-0.5 rounded-full text-foreground-500 capitalize">{plan}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base md:text-lg font-semibold text-foreground-900 mb-5 md:mb-6 text-center">Setup &amp; Support Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 max-w-[1000px] mx-auto">
            {addOnServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between bg-background-100 border border-background-200/70 rounded-lg px-3 py-2.5 md:px-4 md:py-3 hover:border-background-300/60 transition-colors">
                <div>
                  <span className="text-xs text-foreground-700 font-medium">{service.name}</span>
                  <span className="block text-xs text-foreground-400 capitalize">{service.category}</span>
                </div>
                <span className="text-xs font-semibold text-foreground-900 whitespace-nowrap">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}