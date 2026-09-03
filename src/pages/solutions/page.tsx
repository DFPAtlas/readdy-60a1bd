import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { solutions } from '@/mocks/solutionsData';

const solutionImages: Record<string, string> = {
  'solution-hybrid': 'https://readdy.ai/api/search-image?query=Modern%20hybrid%20office%20space%20with%20clean%20white%20desks%20and%20natural%20light%2C%20minimalist%20interior%20design%2C%20warm%20cream%20tones%2C%20professional%20workspace%20with%20plants%2C%20architectural%20photography%2C%20soft%20ambient%20lighting&width=800&height=500&seq=solution-hybrid&orientation=landscape',
  'solution-facilities': 'https://readdy.ai/api/search-image?query=Facilities%20management%20office%20with%20multiple%20workspaces%2C%20clean%20organized%20desks%2C%20warm%20neutral%20colors%2C%20modern%20corporate%20interior%2C%20professional%20environment%2C%20soft%20lighting%2C%20spacious%20layout&width=800&height=500&seq=solution-facilities&orientation=landscape',
  'solution-office': 'https://readdy.ai/api/search-image?query=Office%20manager%20workspace%20with%20clean%20minimalist%20design%2C%20warm%20beige%20walls%2C%20organized%20desk%20setup%2C%20natural%20light%20from%20windows%2C%20professional%20atmosphere%2C%20modern%20office%20interior&width=800&height=500&seq=solution-office&orientation=landscape',
  'solution-multisite': 'https://readdy.ai/api/search-image?query=Multi%20site%20corporate%20office%20with%20glass%20walls%20and%20clean%20modern%20design%2C%20multiple%20floors%20visible%2C%20warm%20neutral%20palette%2C%20professional%20building%20interior%2C%20soft%20natural%20lighting%2C%20spacious%20architecture&width=800&height=500&seq=solution-multisite&orientation=landscape',
  'solution-enterprise': 'https://readdy.ai/api/search-image?query=Enterprise%20corporate%20headquarters%20with%20modern%20architecture%2C%20large%20office%20floor%2C%20clean%20white%20desks%2C%20professional%20atmosphere%2C%20warm%20lighting%2C%20high%20ceilings%2C%20contemporary%20design%2C%20premium%20workspace&width=800&height=500&seq=solution-enterprise&orientation=landscape',
  'solution-intelligence': 'https://readdy.ai/api/search-image?query=Data%20analytics%20workplace%20with%20dashboard%20displays%2C%20modern%20office%20setting%2C%20clean%20minimalist%20design%2C%20warm%20neutral%20tones%2C%20professional%20environment%2C%20large%20screens%20showing%20charts%2C%20bright%20natural%20light&width=800&height=500&seq=solution-intelligence&orientation=landscape',
};

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Solutions</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
              Built for every modern workplace
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              Whether you run a small hybrid office or a multi-building estate, HotDesk Hub helps you manage desks, occupancy, and workplace data with confidence.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {solutions.map((solution) => (
                <div key={solution.title} className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden hover:border-accent-200 transition-colors group">
                  <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                    <img
                      src={solutionImages[solution.imageSeq]}
                      alt={solution.title}
                      title={`HotDesk Hub — ${solution.title}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2.5 md:gap-3 mb-2.5 md:mb-3">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-accent-100 flex items-center justify-center group-hover:bg-accent-200 transition-colors">
                        <i className={`${solution.icon} text-sm md:text-base text-accent-600`}></i>
                      </div>
                      <h3 className="font-heading text-base md:text-lg font-bold text-foreground-900">{solution.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-foreground-600 leading-relaxed mb-3 md:mb-4">{solution.description}</p>
                    <ul className="space-y-1 md:space-y-1.5 border-t border-background-200/70 pt-3 md:pt-4">
                      {solution.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 md:gap-2 text-xs text-foreground-600">
                          <i className="ri-check-line text-accent-600 text-xs"></i>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background-50 text-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
              Find the right setup for your workplace
            </h2>
            <p className="text-base text-foreground-600 mb-8">From hybrid offices to enterprise estates — we have a solution.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/pricing" className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                View Pricing
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link to="/book-demo" className="inline-flex items-center gap-2 border border-foreground-200 text-foreground-800 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer">
                Book Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}