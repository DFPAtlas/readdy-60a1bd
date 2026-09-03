import { useState } from 'react';
import { pricingPlans, planEntitlements } from '@/mocks/billingData';

export default function PlanOverridePanel() {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [manualBilling, setManualBilling] = useState(false);
  const [creditAdjustment, setCreditAdjustment] = useState('');
  const [creditReason, setCreditReason] = useState('');

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Plan & Entitlement Override</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground-700 mb-1.5">Company</label>
          <input
            type="text"
            placeholder="Search company..."
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full text-xs bg-background-100 border border-background-200/70 rounded-md px-3 py-2 focus:outline-none focus:border-primary-300"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground-700 mb-1.5">Override Plan</label>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full text-xs bg-background-100 border border-background-200/70 rounded-md px-3 py-2 focus:outline-none focus:border-primary-300"
          >
            {pricingPlans.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={manualBilling}
              onChange={() => setManualBilling(!manualBilling)}
              className="rounded border-background-300 text-primary-500 focus:ring-primary-400"
            />
            <span className="text-xs text-foreground-700">Enterprise Manual Billing</span>
          </label>
        </div>

        <div className="border-t border-background-200/70 pt-4">
          <p className="text-xs font-semibold text-foreground-700 mb-3">Manual AI Credit Adjustment</p>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Credit amount (+/-)"
              value={creditAdjustment}
              onChange={(e) => setCreditAdjustment(e.target.value)}
              className="w-full text-xs bg-background-100 border border-background-200/70 rounded-md px-3 py-2 focus:outline-none focus:border-primary-300"
            />
            <input
              type="text"
              placeholder="Reason for adjustment"
              value={creditReason}
              onChange={(e) => setCreditReason(e.target.value)}
              className="w-full text-xs bg-background-100 border border-background-200/70 rounded-md px-3 py-2 focus:outline-none focus:border-primary-300"
            />
          </div>
        </div>

        <div className="border-t border-background-200/70 pt-4">
          <p className="text-xs font-semibold text-foreground-700 mb-2">Entitlement Toggles</p>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
            {planEntitlements.filter((e) => e.type === 'boolean').slice(0, 20).map((ent) => (
              <label key={ent.key} className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded border-background-300 text-primary-500 focus:ring-primary-400 scale-90" />
                <span className="text-xs text-foreground-600">{ent.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full text-xs font-semibold bg-primary-500 text-background-50 py-2.5 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          Apply Override
        </button>
      </div>
    </div>
  );
}