import { Link } from 'react-router-dom';
import { howItWorksSteps } from '@/mocks/homeData';

export default function HowItWorksPreview() {
  return (
    <section className="py-20 md:py-28 bg-background-100">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">How It Works</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
            From desk tags to workplace intelligence
          </h2>
          <p className="text-base text-foreground-600 max-w-xl mx-auto leading-relaxed">
            HotDesk Hub starts with simple QR/NFC desk check-ins and grows with your organisation into a full workplace data and AI insights platform.
          </p>
        </div>

        <div className="relative mb-10">
          <div className="hidden xl:block absolute top-10 left-[calc(7.14%+16px)] right-[calc(7.14%+16px)] h-0.5 bg-background-300/60"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 md:gap-5">
            {howItWorksSteps.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 w-12 h-12 rounded-full bg-background-50 border-2 border-primary-300 flex items-center justify-center mb-3 group-hover:border-primary-500 group-hover:bg-primary-50 transition-colors">
                  <span className="font-heading text-sm font-bold text-primary-600">{step.step}</span>
                </div>
                <h4 className="font-semibold text-sm text-foreground-900 mb-1">{step.title}</h4>
                <p className="text-xs text-foreground-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-5 bg-background-50 rounded-xl border border-background-200/70">
          <div className="flex items-center gap-2 text-xs text-foreground-500 flex-wrap justify-center">
            <span className="px-2.5 py-1 bg-background-100 rounded-md font-medium text-foreground-700">Company Setup</span>
            <i className="ri-arrow-right-line text-foreground-400"></i>
            <span className="px-2.5 py-1 bg-background-100 rounded-md font-medium text-foreground-700">Site Setup</span>
            <i className="ri-arrow-right-line text-foreground-400"></i>
            <span className="px-2.5 py-1 bg-background-100 rounded-md font-medium text-foreground-700">Desk Tags</span>
            <i className="ri-arrow-right-line text-foreground-400"></i>
            <span className="px-2.5 py-1 bg-background-100 rounded-md font-medium text-foreground-700">Staff Check-In</span>
            <i className="ri-arrow-right-line text-foreground-400"></i>
            <span className="px-2.5 py-1 bg-background-100 rounded-md font-medium text-foreground-700">Live Dashboard</span>
            <i className="ri-arrow-right-line text-foreground-400"></i>
            <span className="px-2.5 py-1 bg-primary-100 rounded-md font-semibold text-primary-700">AI Insights</span>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
          >
            See the full process
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}