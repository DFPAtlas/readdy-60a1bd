import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { enterpriseData } from '@/mocks/securityData';

export default function Enterprise() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Enterprise</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
              Enterprise-ready workplace intelligence
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              Scale HotDesk Hub across sites, buildings, floors, teams, and advanced workplace systems with enterprise-grade features and support.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enterpriseData.map((item) => (
                <div key={item.title} className="bg-background-50 border border-background-200/70 rounded-xl p-6 hover:border-primary-200 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                    <i className={`${item.icon} text-lg text-primary-600`}></i>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-foreground-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 text-center mb-10">Enterprise Architecture</h2>
            <div className="bg-background-100 border border-background-200/70 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="bg-primary-100 border border-primary-200 rounded-xl px-8 py-4 text-center">
                  <p className="font-heading font-bold text-foreground-900">HotDesk Hub Cloud Platform</p>
                  <p className="text-xs text-foreground-500 mt-1">Core SaaS platform</p>
                </div>

                <div className="flex items-center gap-2 text-foreground-400">
                  <i className="ri-arrow-up-down-line text-2xl"></i>
                </div>

                <div className="bg-accent-100 border border-accent-200 rounded-xl px-8 py-4 text-center">
                  <p className="font-heading font-bold text-foreground-900">Local Site Gateway</p>
                  <p className="text-xs text-foreground-500 mt-1">On-premises data processing</p>
                </div>

                <div className="flex items-center gap-2 text-foreground-400">
                  <i className="ri-arrow-up-down-line text-2xl"></i>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="bg-background-50 border border-background-200/70 rounded-lg px-4 py-2 text-sm font-medium text-foreground-700">Desk Tags</span>
                  <span className="bg-background-50 border border-background-200/70 rounded-lg px-4 py-2 text-sm font-medium text-foreground-700">Sensors</span>
                  <span className="bg-background-50 border border-background-200/70 rounded-lg px-4 py-2 text-sm font-medium text-foreground-700">Access Control</span>
                  <span className="bg-background-50 border border-background-200/70 rounded-lg px-4 py-2 text-sm font-medium text-foreground-700">CCTV</span>
                  <span className="bg-background-50 border border-background-200/70 rounded-lg px-4 py-2 text-sm font-medium text-foreground-700">Probe Data</span>
                </div>

                <div className="flex items-center gap-2 text-foreground-400">
                  <i className="ri-arrow-up-down-line text-2xl"></i>
                </div>

                <div className="bg-secondary-100 border border-secondary-200 rounded-xl px-8 py-4 text-center">
                  <p className="font-heading font-bold text-foreground-900">AI Analytics Dashboard</p>
                  <p className="text-xs text-foreground-500 mt-1">Insights and reporting</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background-100">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="bg-background-50 border border-background-200/70 rounded-2xl p-8 md:p-10 text-center">
              <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">Future-ready connected workplace systems</h3>
              <p className="text-sm text-foreground-600 max-w-xl mx-auto leading-relaxed">
                HotDesk Hub is designed as a standalone SaaS platform with future support for secure connected systems, including a separate site parking management SaaS through a Workplace Connector API.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background-50 text-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">
              Talk to us about your enterprise workplace setup
            </h2>
            <p className="text-base text-foreground-600 mb-8">Custom solutions for complex workplace environments.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-foreground-900 text-background-50 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-foreground-800 transition-colors whitespace-nowrap cursor-pointer">
              Contact Sales
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}