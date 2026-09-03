import { privacyFeatures } from '@/mocks/homeData';

export default function PrivacyTrustSection() {
  return (
    <section id="privacy" className="bg-background-100 py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="flex-1">
            <p className="font-label text-xs md:text-sm font-semibold tracking-widest uppercase text-accent-500 mb-4">
              Trust &amp; Transparency
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 leading-tight">
              Privacy by Design,<br />Not an Afterthought
            </h2>
          </div>
          <div className="flex-1 flex items-end">
            <p className="text-sm md:text-base text-foreground-600 max-w-md leading-relaxed">
              Powerful workspace analytics should never come at the cost of personal privacy. Every feature is built with GDPR-first principles — giving both admins and staff complete control over their data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {privacyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-background-50 rounded-lg border border-background-200/70 p-5 md:p-6 flex gap-4 md:gap-5 group hover:border-accent-300/60 transition-colors duration-200 cursor-default"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md bg-accent-100 shrink-0">
                <i className={`${feature.icon} text-accent-500 text-lg md:text-xl`}></i>
              </div>
              <div>
                <h3 className="font-heading text-base md:text-lg font-bold text-foreground-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground-500">
            <i className="ri-shield-star-line text-accent-500"></i>
            <span>ISO 27001 Certified</span>
          </div>
          <span className="hidden sm:inline text-foreground-300">|</span>
          <div className="flex items-center gap-2 text-sm text-foreground-500">
            <i className="ri-lock-line text-accent-500"></i>
            <span>GDPR Compliant</span>
          </div>
          <span className="hidden sm:inline text-foreground-300">|</span>
          <div className="flex items-center gap-2 text-sm text-foreground-500">
            <i className="ri-database-2-line text-accent-500"></i>
            <span>SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </section>
  );
}