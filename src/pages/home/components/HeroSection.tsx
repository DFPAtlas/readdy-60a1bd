import { Link } from 'react-router-dom';
import { stats } from '@/mocks/homeData';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-background-50 overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background-100/80 via-transparent to-accent-50/30"></div>

      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-background-100 border border-background-200/70 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              <span className="text-xs font-medium text-foreground-700">Smart Spaces. Smarter Work.</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground-950 leading-tight mb-6">
              Your office,
              <br />
              <span className="text-primary-500">intelligently orchestrated</span>
            </h1>

            <p className="text-base md:text-lg text-foreground-600 leading-relaxed mb-7 max-w-lg">
              QR and NFC desk check-ins, live availability, occupancy analytics, AI-powered workplace insights, and privacy-first controls — one clean platform for modern hot desk workplaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 text-background-50 font-semibold text-base px-9 py-4 rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Get Started Free
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link
                to="/book-demo"
                className="inline-flex items-center justify-center gap-2 border border-foreground-200 text-foreground-800 font-semibold text-base px-9 py-4 rounded-full hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Book a Demo
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-background-200/70">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl md:text-3xl font-bold text-foreground-950">{stat.value}</p>
                  <p className="text-xs text-foreground-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-100/60 via-accent-100/40 to-background-50 rounded-2xl blur-2xl"></div>
              <img
                src="https://readdy.ai/api/search-image?query=Aerial%20elevated%20view%20of%20a%20modern%20industrial%20hot%20desk%20workspace%20featuring%20rows%20of%20shared%20workstations%2C%20exposed%20brick%20walls%2C%20warm%20pendant%20lighting%2C%20steel%20and%20wood%20desk%20surfaces%2C%20professionals%20collaborating%20and%20working%20on%20laptops%2C%20large%20factory-style%20windows%20with%20natural%20daylight%20streaming%20in%2C%20green%20hanging%20plants%2C%20polished%20concrete%20floors%2C%20editorial%20architectural%20photography%2C%20clean%20composition%20with%20leading%20lines%2C%20warm%20amber%20and%20terracotta%20accents%20against%20neutral%20greys&width=1400&height=1000&seq=hero-office-2026&orientation=landscape&nocache=true"
                alt="Modern open-plan office with hot desks and warm natural lighting"
                title="HotDesk Hub — Modern workplace management platform"
                className="relative rounded-2xl w-full h-auto object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}