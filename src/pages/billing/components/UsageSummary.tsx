import type { ClientSubscription } from '@/mocks/subscriptionData';

interface UsageSummaryProps {
  subscription: ClientSubscription;
}

export default function UsageSummary({ subscription }: UsageSummaryProps) {
  const limits = [
    { label: 'Sites', current: subscription.activeSites, max: subscription.includedLimits.maxSites, extra: subscription.extraUsage.extraSites, extraCost: subscription.extraUsage.extraSitesCost },
    { label: 'Staff Users', current: subscription.activeUsers, max: subscription.includedLimits.maxStaffUsers, extra: subscription.extraUsage.extraUsers, extraCost: subscription.extraUsage.extraUsersCost },
    { label: 'Hot Desk Areas', current: subscription.activeHotDeskAreas, max: subscription.includedLimits.maxHotDeskAreas, extra: subscription.extraUsage.extraAreas, extraCost: subscription.extraUsage.extraAreasCost },
    { label: 'Floorplans', current: subscription.activeAddOns.filter((a) => a.name.includes('Floorplan')).length, max: subscription.includedLimits.maxFloorplans, extra: subscription.extraUsage.extraFloorplans, extraCost: subscription.extraUsage.extraFloorplansCost },
  ];

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Plan Limits & Usage</h3>
      <div className="space-y-3">
        {limits.map((limit) => {
          const percent = limit.max > 0 ? Math.min(100, (limit.current / limit.max) * 100) : 0;
          return (
            <div key={limit.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground-500">{limit.label}</span>
                <span className="text-foreground-800 font-medium">
                  {limit.current}
                  <span className="text-foreground-400"> / {limit.max}</span>
                  {limit.extra > 0 && (
                    <span className="text-accent-600 ml-1">(+{limit.extra} @ £{limit.extraCost.toFixed(2)})</span>
                  )}
                </span>
              </div>
              <div className="w-full h-1.5 bg-background-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    percent > 100 ? 'bg-red-500' : percent > 80 ? 'bg-amber-500' : 'bg-accent-500'
                  }`}
                  style={{ width: `${Math.min(100, percent)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}