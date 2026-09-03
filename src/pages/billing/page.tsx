import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { mockClientSubscription } from '@/mocks/subscriptionData';
import SubscriptionCard from './components/SubscriptionCard';
import AiCreditWallet from './components/AiCreditWallet';
import UsageSummary from './components/UsageSummary';
import InvoiceList from './components/InvoiceList';
import AddOnsManager from './components/AddOnsManager';

export default function Billing() {
  const subscription = mockClientSubscription;

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-6 md:pt-40 md:pb-8 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-3">Billing</span>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950">Billing & Subscription</h1>
                <p className="text-sm text-foreground-500 mt-1">Manage your plan, credits, and invoices.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-5">
                <SubscriptionCard subscription={subscription} />
                <UsageSummary subscription={subscription} />
                <InvoiceList invoices={subscription.invoices} />
              </div>
              <div className="space-y-5">
                <AiCreditWallet
                  balance={subscription.aiCredits.balance}
                  usedThisMonth={subscription.aiCredits.usedThisMonth}
                  monthlyAllowance={subscription.aiCredits.monthlyAllowance}
                />
                <AddOnsManager
                  activeAddOns={subscription.activeAddOns}
                  availableAddOns={subscription.availableAddOns}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}