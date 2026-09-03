import type { AdminBillingOverview } from '@/mocks/subscriptionData';

interface MRROverviewProps {
  overview: AdminBillingOverview;
}

export default function MRROverview({ overview }: MRROverviewProps) {
  const stats = [
    { label: 'Monthly Recurring Revenue', value: `£${overview.mrr.toLocaleString()}`, icon: 'ri-money-pound-circle-line', accent: 'bg-primary-100 text-primary-700' },
    { label: 'Active Subscriptions', value: overview.activeSubscriptions.toString(), icon: 'ri-user-heart-line', accent: 'bg-accent-100 text-accent-700' },
    { label: 'Failed Payments', value: overview.failedPayments.toString(), icon: 'ri-error-warning-line', accent: 'bg-red-100 text-red-700', highlight: overview.failedPayments > 0 },
    { label: 'AI Credit Sales', value: `£${overview.aiCreditSales.toLocaleString()}`, icon: 'ri-brain-line', accent: 'bg-secondary-100 text-secondary-700' },
    { label: 'Active Desks', value: overview.activeDeskCount.toLocaleString(), icon: 'ri-computer-line', accent: 'bg-accent-100 text-accent-700' },
    { label: 'Trial Accounts', value: overview.trialAccounts.toString(), icon: 'ri-timer-line', accent: 'bg-secondary-100 text-secondary-700' },
    { label: 'Enterprise Accounts', value: overview.enterpriseAccounts.toString(), icon: 'ri-building-4-line', accent: 'bg-foreground-100 text-foreground-700' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className={`bg-background-50 border ${stat.highlight ? 'border-red-300/60' : 'border-background-200/70'} rounded-lg p-4`}>
          <div className={`w-8 h-8 rounded-md ${stat.accent} flex items-center justify-center mb-3`}>
            <i className={`${stat.icon} text-sm`}></i>
          </div>
          <p className="font-heading text-xl font-bold text-foreground-950">{stat.value}</p>
          <p className="text-xs text-foreground-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}