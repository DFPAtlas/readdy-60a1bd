import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { mockAdminOverview, mockAdminClients, mockFailedPayments, mockWebhookEvents } from '@/mocks/subscriptionData';
import MRROverview from './components/MRROverview';
import ClientBillingTable from './components/ClientBillingTable';
import FailedPayments from './components/FailedPayments';
import WebhookLogs from './components/WebhookLogs';
import PlanOverridePanel from './components/PlanOverridePanel';

export default function AdminBilling() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-6 md:pt-40 md:pb-8 bg-background-50">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full">Admin</span>
                  <span className="text-xs text-foreground-400">Platform billing management</span>
                </div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950">Billing Dashboard</h1>
                <p className="text-sm text-foreground-500 mt-1">Monitor subscriptions, payments, webhooks, and manage client billing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 md:py-10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 space-y-5">
            <MRROverview overview={mockAdminOverview} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              <div className="lg:col-span-3 space-y-5">
                <ClientBillingTable clients={mockAdminClients} />
                <WebhookLogs events={mockWebhookEvents} />
              </div>
              <div className="space-y-5">
                <FailedPayments failedPayments={mockFailedPayments} />
                <PlanOverridePanel />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}