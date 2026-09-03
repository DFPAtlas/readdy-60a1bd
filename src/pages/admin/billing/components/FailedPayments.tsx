import type { FailedPayment } from '@/mocks/subscriptionData';

interface FailedPaymentsProps {
  failedPayments: FailedPayment[];
}

export default function FailedPayments({ failedPayments }: FailedPaymentsProps) {
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground-900">Failed Payments</h3>
        {failedPayments.length > 0 && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">{failedPayments.length} pending</span>
        )}
      </div>

      {failedPayments.length === 0 ? (
        <p className="text-xs text-foreground-400 text-center py-6">No failed payments.</p>
      ) : (
        <div className="space-y-3">
          {failedPayments.map((fp) => (
            <div key={fp.id} className="bg-background-100 border border-background-200/70 rounded-md p-3">
              <div className="flex items-start justify-between mb-1.5">
                <div>
                  <p className="text-xs font-semibold text-foreground-900">{fp.company}</p>
                  <p className="text-xs text-foreground-500">{new Date(fp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <span className="text-xs font-bold text-red-600">£{fp.amount.toLocaleString()}</span>
              </div>
              <p className="text-xs text-foreground-600 mb-2">{fp.reason}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-400">Retries: {fp.retryCount}</span>
                <div className="flex gap-1.5">
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer whitespace-nowrap">Retry</button>
                  <button className="text-xs text-foreground-400 hover:text-foreground-600 cursor-pointer whitespace-nowrap">Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}