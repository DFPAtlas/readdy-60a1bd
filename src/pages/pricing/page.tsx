import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';
import { pricingPlans } from '@/mocks/billingData';
import PlanCard from './components/PlanCard';
import PricingCalculator from './components/PricingCalculator';
import AiCreditSection from './components/AiCreditSection';
import AddOnsSection from './components/AddOnsSection';
import PricingFAQ from './components/PricingFAQ';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Pricing</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">
              Simple desk-based pricing that scales with your workplace
            </h1>
            <p className="text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
              Choose a plan, add your desk count, and scale into AI analytics, floorplans, location intelligence, and enterprise integrations when you need them.
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {pricingPlans.map((plan) => (
                <PlanCard key={plan.slug} plan={plan} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background-50">
          <div className="max-w-[1000px] mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">Estimate your monthly cost</h2>
              <p className="text-sm text-foreground-500">Adjust the sliders to see your estimated monthly total with live plan limit warnings.</p>
            </div>
            <PricingCalculator />
          </div>
        </section>

        <AiCreditSection />
        <AddOnsSection />
        <PricingFAQ />

        <section className="py-16 md:py-24 bg-background-50 text-center">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-4">Ready to simplify hot desk management?</h2>
            <p className="text-base text-foreground-600 mb-8 max-w-lg mx-auto">Start with a 14-day free trial. No credit card required.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                Start Free Trial
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link to="/book-demo" className="inline-flex items-center gap-2 border border-primary-500 text-primary-600 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-primary-50 transition-colors whitespace-nowrap cursor-pointer">
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