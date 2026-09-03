import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { howItWorksStepsFull, roleJourneys } from '@/mocks/howItWorksData';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">How It Works</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
              From desk tags to workplace intelligence
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              HotDesk Hub starts with simple QR/NFC desk check-ins and grows with your organisation into a full workplace data and AI insights platform.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-[900px] mx-auto px-4 md:px-6">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-background-300/60 hidden md:block"></div>

              <div className="space-y-10">
                {howItWorksStepsFull.map((step) => (
                  <div key={step.step} className="relative flex gap-6 md:gap-8">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 border-4 border-background-50 flex items-center justify-center hidden md:flex">
                      <span className="font-heading text-sm font-bold text-background-50">{step.step}</span>
                    </div>
                    <div className="flex-1 bg-background-50 border border-background-200/70 rounded-xl p-5 md:p-6">
                      <div className="flex items-center gap-3 mb-2 md:hidden">
                        <span className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center font-heading text-xs font-bold text-background-50">{step.step}</span>
                        <h3 className="font-heading text-lg font-bold text-foreground-900">Step {step.step}</h3>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2 hidden md:block">{step.title}</h3>
                      <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2 md:hidden">{step.title}</h3>
                      <p className="text-sm text-foreground-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="bg-background-100 border border-background-200/70 rounded-2xl p-6 md:p-10">
              <div className="flex items-center justify-center gap-2 flex-wrap text-xs md:text-sm font-medium">
                <span className="px-3 py-1.5 bg-background-50 rounded-md text-foreground-700 border border-background-200/70">Company Setup</span>
                <i className="ri-arrow-right-line text-foreground-400"></i>
                <span className="px-3 py-1.5 bg-background-50 rounded-md text-foreground-700 border border-background-200/70">Site Setup</span>
                <i className="ri-arrow-right-line text-foreground-400"></i>
                <span className="px-3 py-1.5 bg-background-50 rounded-md text-foreground-700 border border-background-200/70">Desk Tags</span>
                <i className="ri-arrow-right-line text-foreground-400"></i>
                <span className="px-3 py-1.5 bg-background-50 rounded-md text-foreground-700 border border-background-200/70">Staff Check-In</span>
                <i className="ri-arrow-right-line text-foreground-400"></i>
                <span className="px-3 py-1.5 bg-background-50 rounded-md text-foreground-700 border border-background-200/70">Live Dashboard</span>
                <i className="ri-arrow-right-line text-foreground-400"></i>
                <span className="px-3 py-1.5 bg-primary-100 rounded-md font-semibold text-primary-700 border border-primary-200">AI Insights</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 text-center mb-10">Role-based journeys</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {roleJourneys.map((role) => (
                <div key={role.role} className="bg-background-50 border border-background-200/70 rounded-xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                    <i className={`${role.icon} text-lg text-accent-600`}></i>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground-900 mb-2">{role.role}</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed mb-4">{role.description}</p>
                  <ul className="space-y-1.5">
                    {role.steps.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-foreground-600">
                        <i className="ri-arrow-right-s-line text-foreground-400"></i>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background-50 text-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
              Start with QR/NFC check-ins today. Scale into AI workplace intelligence tomorrow.
            </h2>
            <p className="text-base text-foreground-600 mb-8">Seven simple steps from setup to AI-powered insights.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                Get Started
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 border border-foreground-200 text-foreground-800 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}