import { Link } from 'react-router-dom';
import { enterpriseHomeFeatures } from '@/mocks/homeData';

export default function EnterprisePreview() {
  return (
    <section className="py-20 md:py-28 bg-background-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Enterprise Ready</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
            Built to scale with your workplace
          </h2>
          <p className="text-base text-foreground-600 max-w-xl mx-auto leading-relaxed">
            From a single office to a global estate — HotDesk Hub grows with you. Enterprise features, local gateways, and integrations for complex workplace environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {enterpriseHomeFeatures.map((feature) => (
            <div key={feature.title} className="bg-background-100 border border-background-200/70 rounded-xl p-6 hover:border-primary-200 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <i className={`${feature.icon} text-lg text-primary-600`}></i>
              </div>
              <h4 className="font-semibold text-sm text-foreground-900 mb-2">{feature.title}</h4>
              <p className="text-xs text-foreground-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-background-100 border border-background-200/70 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
              <i className="ri-global-line text-2xl text-accent-600"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-foreground-900 mb-1">Future-ready connected workplace systems</h3>
              <p className="text-sm text-foreground-600 leading-relaxed">
                HotDesk Hub is designed as a standalone SaaS platform with future support for secure connected systems, including a separate site parking management SaaS through a Workplace Connector API.
              </p>
            </div>
            <Link
              to="/enterprise"
              className="inline-flex items-center gap-2 bg-foreground-900 text-background-50 font-semibold text-sm px-6 py-3 rounded-full hover:bg-foreground-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Explore Enterprise
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}