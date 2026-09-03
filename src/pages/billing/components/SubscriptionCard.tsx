import { Link } from 'react-router-dom';
import type { ClientSubscription } from '@/mocks/subscriptionData';

interface SubscriptionCardProps {
  subscription: ClientSubscription;
}

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const statusColors: Record<string, string> = {
    active: 'bg-accent-100 text-accent-700',
    trialing: 'bg-secondary-100 text-secondary-700',
    past_due: 'bg-red-100 text-red-700',
    cancelled: 'bg-foreground-100 text-foreground-600',
    expired: 'bg-foreground-100 text-foreground-600',
  };

  const paymentColors: Record<string, string> = {
    paid: 'text-accent-600',
    pending: 'text-amber-600',
    overdue: 'text-red-600',
    none: 'text-foreground-400',
  };

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading text-lg font-semibold text-foreground-900">{subscription.planName}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[subscription.status]}`}>
              {subscription.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-foreground-500">Since {new Date(subscription.startedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl font-bold text-foreground-950">£{subscription.estimatedMonthlyTotal.toLocaleString()}</p>
          <p className="text-xs text-foreground-500">per month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-background-100 rounded-md p-3 text-center">
          <p className="text-xs text-foreground-500 mb-0.5">Active Desks</p>
          <p className="text-lg font-bold text-foreground-900">{subscription.activeDesks}</p>
        </div>
        <div className="bg-background-100 rounded-md p-3 text-center">
          <p className="text-xs text-foreground-500 mb-0.5">Staff Users</p>
          <p className="text-lg font-bold text-foreground-900">{subscription.activeUsers}</p>
        </div>
        <div className="bg-background-100 rounded-md p-3 text-center">
          <p className="text-xs text-foreground-500 mb-0.5">Sites</p>
          <p className="text-lg font-bold text-foreground-900">{subscription.activeSites}</p>
        </div>
        <div className="bg-background-100 rounded-md p-3 text-center">
          <p className="text-xs text-foreground-500 mb-0.5">Desk Areas</p>
          <p className="text-lg font-bold text-foreground-900">{subscription.activeHotDeskAreas}</p>
        </div>
      </div>

      <div className="border-t border-background-200/70 pt-4 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-foreground-500">Renewal date</span>
          <span className="text-foreground-800 font-medium">{new Date(subscription.renewalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-foreground-500">Payment status</span>
          <span className={`font-medium capitalize ${paymentColors[subscription.paymentStatus]}`}>{subscription.paymentStatus}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-foreground-500">Base price</span>
          <span className="text-foreground-800 font-medium">£{subscription.basePrice}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-foreground-500">Desk cost ({subscription.activeDesks} × £{subscription.perDeskPrice.toFixed(2)})</span>
          <span className="text-foreground-800 font-medium">£{(subscription.activeDesks * subscription.perDeskPrice).toFixed(2)}</span>
        </div>
        {subscription.extraUsage.totalExtraCost > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-foreground-500">Extra usage</span>
            <span className="text-accent-600 font-medium">£{subscription.extraUsage.totalExtraCost.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-background-200/70 flex flex-col sm:flex-row gap-2">
        <Link
          to="/pricing"
          className="flex-1 text-center text-xs font-semibold border border-primary-500 text-primary-600 hover:bg-primary-50 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer"
        >
          Upgrade Plan
        </Link>
        <Link
          to="/contact"
          className="flex-1 text-center text-xs font-semibold border border-background-300/60 text-foreground-600 hover:bg-background-100 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}