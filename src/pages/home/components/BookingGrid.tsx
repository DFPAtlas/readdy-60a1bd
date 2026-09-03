import { Link } from 'react-router-dom';
import { plans } from '@/mocks/homeData';

export default function BookingGrid() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-background-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Pricing</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
            Simple desk-based pricing
          </h2>
          <p className="text-base text-foreground-600 max-w-xl mx-auto leading-relaxed">
            Choose a plan, add your desk count, and scale into AI analytics, floorplans, and enterprise integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => {
            const planImages: Record<string, string> = {
              'plan-basic-02': 'https://readdy.ai/api/search-image?query=Small%20modern%20office%20with%20two%20clean%20white%20desks%2C%20minimalist%20workspace%2C%20warm%20natural%20light%20from%20window%2C%20laptop%20on%20desk%2C%20simple%20and%20clean%20design%2C%20professional%20interior%20photography%2C%20neutral%20cream%20and%20beige%20tones%2C%20one%20person%20workspace%20scene&width=600&height=400&seq=plan-basic-02&orientation=landscape',
              'plan-pro-02': 'https://readdy.ai/api/search-image?query=Modern%20open%20plan%20office%20with%20multiple%20clean%20workstations%2C%20warm%20wood%20desks%2C%20hanging%20pendant%20lights%2C%20green%20plants%2C%20collaborative%20workspace%20atmosphere%2C%20neutral%20cream%20palette%2C%20professional%20architectural%20photography%2C%20spacious%20contemporary%20office&width=600&height=400&seq=plan-pro-02&orientation=landscape',
              'plan-intel-02': 'https://readdy.ai/api/search-image?query=Large%20modern%20corporate%20office%20floor%20with%20rows%20of%20clean%20white%20desks%2C%20glass%20partition%20walls%2C%20sleek%20design%2C%20high%20ceilings%2C%20natural%20light%2C%20warm%20neutral%20tones%2C%20professional%20real%20estate%20photography%2C%20spacious%20workspace&width=600&height=400&seq=plan-intel-02&orientation=landscape',
              'plan-ent-02': 'https://readdy.ai/api/search-image?query=Premium%20corporate%20headquarters%20office%20building%20interior%2C%20modern%20architecture%2C%20multiple%20floors%20visible%20through%20atrium%2C%20clean%20minimalist%20design%2C%20warm%20lighting%2C%20professional%20atmosphere%2C%20cream%20and%20beige%20tones%2C%20high%20end%20commercial%20space&width=600&height=400&seq=plan-ent-02&orientation=landscape',
            };
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.name}
                className={`rounded-lg overflow-hidden border transition-all duration-300 flex flex-col ${
                  isHighlighted
                    ? 'bg-background-50 border-primary-300/60 ring-1 ring-primary-200/50 relative'
                    : 'bg-background-50 border-background-200/70 hover:border-background-300/60'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute top-4 right-4 bg-primary-500 text-background-50 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap z-10">
                    Most Popular
                  </div>
                )}

                <div className="relative h-44 overflow-hidden">
                  <img
                    src={planImages[plan.imageSeq] || ''}
                    alt={`${plan.name} plan`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-semibold text-foreground-900 text-center">{plan.name}</h3>
                  <div className="text-center mt-2 mb-4">
                    <span className="font-heading text-3xl font-bold text-foreground-950">{plan.price}</span>
                    <span className="text-sm text-foreground-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-xs text-foreground-600 text-center mb-5">{plan.description}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-foreground-700">
                        <span className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <i className="ri-check-line text-accent-600 text-xs"></i>
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.cta === 'Contact Sales' ? '/contact' : '/signup'}
                    className={`w-full text-center py-2.5 rounded-md font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer ${
                      isHighlighted
                        ? 'bg-primary-500 text-background-50 hover:bg-primary-600'
                        : plan.cta === 'Contact Sales'
                          ? 'bg-foreground-900 text-background-50 hover:bg-foreground-800'
                          : 'border border-background-300/60 text-foreground-800 hover:bg-background-100'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {plan.cta !== 'Contact Sales' && (
                    <p className="text-xs text-foreground-400 text-center mt-2">No credit card required</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
          >
            View full pricing details
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}