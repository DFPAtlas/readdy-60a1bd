import { aiCreditPacks } from '@/mocks/billingData';
import { getLowCreditWarning } from '@/services/aiCreditsService';

interface AiCreditWalletProps {
  balance: number;
  usedThisMonth: number;
  monthlyAllowance: number;
}

export default function AiCreditWallet({ balance, usedThisMonth, monthlyAllowance }: AiCreditWalletProps) {
  const warning = getLowCreditWarning(balance, monthlyAllowance);
  const usagePercent = monthlyAllowance > 0 ? Math.min(100, (usedThisMonth / monthlyAllowance) * 100) : 0;

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground-900">AI Credit Wallet</h3>
        <i className="ri-brain-line text-accent-500 text-lg"></i>
      </div>

      <div className="text-center mb-4">
        <p className="text-xs text-foreground-500 mb-1">Current Balance</p>
        <p className={`font-heading text-3xl font-bold ${warning.isLow ? 'text-red-600' : 'text-foreground-950'}`}>
          {balance.toLocaleString()}
        </p>
        <p className="text-xs text-foreground-400">credits</p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-foreground-500">Used this month</span>
          <span className="text-foreground-800 font-medium">{usedThisMonth.toLocaleString()} / {monthlyAllowance.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 bg-background-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 60 ? 'bg-amber-500' : 'bg-accent-500'}`}
            style={{ width: `${usagePercent}%` }}
          ></div>
        </div>
      </div>

      {warning.message && (
        <div className={`p-3 rounded-md mb-4 text-xs ${warning.isLow ? 'bg-red-50 border border-red-200/70 text-red-700' : 'bg-amber-50 border border-amber-200/70 text-amber-700'}`}>
          <div className="flex items-start gap-2">
            <i className={`${warning.isLow ? 'ri-error-warning-fill' : 'ri-information-line'} flex-shrink-0 mt-0.5`}></i>
            <span>{warning.message}</span>
          </div>
        </div>
      )}

      <div className="border-t border-background-200/70 pt-4">
        <p className="text-xs font-semibold text-foreground-700 mb-3">Buy More Credits</p>
        <div className="grid grid-cols-2 gap-2">
          {aiCreditPacks.filter((p) => p.price > 0).slice(0, 4).map((pack) => (
            <button
              key={pack.slug}
              className="text-xs border border-background-200/70 hover:border-primary-300/60 bg-background-100 rounded-md p-3 text-center cursor-pointer transition-colors"
            >
              <p className="font-semibold text-foreground-900">£{pack.price}</p>
              <p className="text-foreground-500 mt-0.5">{pack.credits.toLocaleString()} credits</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-foreground-400 text-center mt-3">£1 = 1,000 credits. Core desk management always stays active.</p>
      </div>
    </div>
  );
}