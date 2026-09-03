import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { privacyFeatures, enterpriseData } from '@/mocks/securityData';

export default function Security() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Security & Privacy</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
              Privacy-first workplace intelligence
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              HotDesk Hub is designed to help organisations understand workplace usage while keeping staff data transparent, controlled, and protected.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 text-center mb-10">Privacy Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {privacyFeatures.map((feature) => (
                <div key={feature.title} className="bg-background-50 border border-background-200/70 rounded-xl p-6 hover:border-accent-200 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
                    <i className={`${feature.icon} text-lg text-accent-600`}></i>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground-900 mb-2">{feature.title}</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="bg-background-100 border border-background-200/70 rounded-2xl p-8 md:p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-6">Enterprise Data Controls</h2>
              <p className="text-sm text-foreground-600 leading-relaxed mb-8 max-w-2xl">
                HotDesk Hub provides secure account access, role-based permissions, audit logs, data controls, optional anonymisation, and future enterprise integrations with clear, transparent controls. We do not claim any specific legal compliance — we provide the tools to help you manage workplace data responsibly.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {enterpriseData.slice(0, 8).map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <i className={`${item.icon} text-accent-600 mt-0.5`}></i>
                    <div>
                      <p className="text-xs font-semibold text-foreground-900">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background-100 text-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
              Build workplace intelligence with trust
            </h2>
            <p className="text-base text-foreground-600 mb-8">Privacy controls built in, not bolted on.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/book-demo" className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                Book Demo
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