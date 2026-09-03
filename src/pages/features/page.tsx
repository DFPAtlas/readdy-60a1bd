import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { featureGroups } from '@/mocks/featuresData';

export default function Features() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Features</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
              Everything you need to manage modern hot desk workplaces
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              HotDesk Hub brings desk check-ins, live availability, floorplans, AI insights, privacy controls, and admin tools into one clean workplace platform.
            </p>
          </div>
        </section>

        {featureGroups.map((group, idx) => (
          <section key={group.title} className={`py-16 md:py-20 ${idx % 2 === 0 ? 'bg-background-50' : 'bg-background-100'}`}>
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                  <i className={`${group.icon} text-lg text-accent-600`}></i>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950">{group.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {group.features.map((feature) => (
                  <div key={feature.title} className="bg-background-50 border border-background-200/70 rounded-xl p-4 md:p-6 hover:border-accent-200 transition-colors group">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent-100 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-accent-200 transition-colors">
                      <i className={`${feature.icon} text-base md:text-lg text-accent-600`}></i>
                    </div>
                    <h4 className="font-semibold text-xs md:text-sm text-foreground-900 mb-1.5 md:mb-2">{feature.title}</h4>
                    <p className="text-xs text-foreground-500 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-16 md:py-24 bg-background-100 text-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
              Ready to simplify hot desk management?
            </h2>
            <p className="text-base text-foreground-600 mb-8">Start with simple check-ins. Scale into full workplace intelligence.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                Get Started
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link to="/book-demo" className="inline-flex items-center gap-2 border border-foreground-200 text-foreground-800 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer">
                Book a Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}