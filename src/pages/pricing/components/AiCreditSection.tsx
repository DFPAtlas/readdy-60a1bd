import { aiCreditPacks, aiUsageCosts } from '@/mocks/billingData';
import { Link } from 'react-router-dom';

export default function AiCreditSection() {
  return (
    <section className="py-16 md:py-20 bg-background-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">AI Credits</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">AI credits for advanced workplace insights</h2>
          <p className="text-sm text-foreground-500 max-w-xl mx-auto">
            Each plan includes monthly AI credits. Buy extra packs for AI reports, workplace recommendations, floorplan analysis, and DPIA support.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {aiCreditPacks.map((pack) => {
            const isCustom = pack.slug === 'custom-pack';
            return (
              <div key={pack.slug} className="bg-background-50 border border-background-200/70 rounded-lg p-4 text-center hover:border-primary-300/60 transition-colors">
                <p className="text-xs font-semibold text-foreground-900 mb-1">{pack.name}</p>
                {isCustom ? (
                  <p className="text-lg font-bold text-foreground-950 mb-1">Custom</p>
                ) : (
                  <>
                    <p className="text-lg font-bold text-foreground-950 mb-1">£{pack.price}</p>
                    <p className="text-xs text-foreground-500 mb-2">{pack.credits.toLocaleString()} credits</p>
                    <p className="text-xs text-foreground-400">£1 = 1,000 credits</p>
                  </>
                )}
                {isCustom && <p className="text-xs text-foreground-500">Contact Sales</p>}
              </div>
            );
          })}
        </div>

        <div className="max-w-[900px] mx-auto">
          <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4 text-center">What can AI credits do?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiUsageCosts.map((item) => (
              <div key={item.feature} className="flex items-center gap-3 bg-background-50 border border-background-200/70 rounded-lg px-4 py-3">
                <div className="w-9 h-9 rounded-md bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-accent-600 text-sm`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground-800 truncate">{item.feature}</p>
                  <p className="text-xs text-accent-600 font-semibold">{item.credits.toLocaleString()} credits</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-3 md:p-4 bg-background-50 border border-background-200/70 rounded-lg max-w-[700px] mx-auto">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-information-line text-accent-600 text-sm"></i>
            </div>
            <div>
              <p className="text-xs text-foreground-700 leading-relaxed">
                <strong>Core desk management keeps working even if AI credits run out.</strong> AI-powered features (reports, recommendations, analysis) pause until credits are topped up. Your check-ins, dashboards, and desk availability stay fully operational.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}