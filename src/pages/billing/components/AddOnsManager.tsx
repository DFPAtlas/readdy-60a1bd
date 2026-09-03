interface AddOnsManagerProps {
  activeAddOns: { name: string; monthlyCost: number }[];
  availableAddOns: { name: string; monthlyCost: number; description: string }[];
}

export default function AddOnsManager({ activeAddOns, availableAddOns }: AddOnsManagerProps) {
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Add-ons</h3>

      {activeAddOns.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-foreground-700 mb-2">Active Add-ons</p>
          <div className="space-y-2">
            {activeAddOns.map((addon) => (
              <div key={addon.name} className="flex items-center justify-between bg-background-100 border border-background-200/70 rounded-md px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0"></div>
                  <span className="text-xs font-medium text-foreground-800">{addon.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground-900">£{addon.monthlyCost}/mo</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {availableAddOns.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-foreground-700 mb-2">Available Add-ons</p>
          <div className="space-y-2">
            {availableAddOns.map((addon) => (
              <div key={addon.name} className="flex items-center justify-between bg-background-100 border border-background-200/70 rounded-md px-3 py-2.5">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-xs font-medium text-foreground-800">{addon.name}</p>
                  <p className="text-xs text-foreground-400 truncate">{addon.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground-900 whitespace-nowrap">£{addon.monthlyCost}/mo</span>
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 border border-primary-300 px-2.5 py-1 rounded-md hover:bg-primary-50 transition-colors cursor-pointer whitespace-nowrap">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}