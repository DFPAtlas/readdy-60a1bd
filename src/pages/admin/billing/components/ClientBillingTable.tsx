import { useState } from 'react';
import type { AdminClientRecord } from '@/mocks/subscriptionData';

interface ClientBillingTableProps {
  clients: AdminClientRecord[];
}

export default function ClientBillingTable({ clients }: ClientBillingTableProps) {
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = clients.filter((c) => {
    const matchSearch = c.company.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === 'all' || c.plan === filterPlan;
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchPlan && matchStatus;
  });

  const statusColor: Record<string, string> = {
    active: 'bg-accent-100 text-accent-700',
    trialing: 'bg-secondary-100 text-secondary-700',
    past_due: 'bg-red-100 text-red-700',
    cancelled: 'bg-foreground-100 text-foreground-600',
  };
  const paymentColor: Record<string, string> = {
    paid: 'text-accent-600',
    overdue: 'text-red-600',
    none: 'text-foreground-400',
  };

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-lg p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-heading text-lg font-semibold text-foreground-900">Client Billing Table</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-xs text-foreground-400"></i>
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs bg-background-100 border border-background-200/70 rounded-md pl-8 pr-3 py-1.5 w-40 focus:outline-none focus:border-primary-300"
            />
          </div>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="text-xs bg-background-100 border border-background-200/70 rounded-md px-3 py-1.5 focus:outline-none focus:border-primary-300"
          >
            <option value="all">All Plans</option>
            <option value="basic">Basic</option>
            <option value="professional">Professional</option>
            <option value="intelligence">Intelligence</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-background-100 border border-background-200/70 rounded-md px-3 py-1.5 focus:outline-none focus:border-primary-300"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="trialing">Trialing</option>
            <option value="past_due">Past Due</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-background-200/70">
              <th className="text-left py-2.5 font-medium text-foreground-500">Company</th>
              <th className="text-left py-2.5 font-medium text-foreground-500">Plan</th>
              <th className="text-left py-2.5 font-medium text-foreground-500">Status</th>
              <th className="text-right py-2.5 font-medium text-foreground-500">Monthly</th>
              <th className="text-right py-2.5 font-medium text-foreground-500">Desks</th>
              <th className="text-right py-2.5 font-medium text-foreground-500">AI Credits</th>
              <th className="text-right py-2.5 font-medium text-foreground-500">Payment</th>
              <th className="text-right py-2.5 font-medium text-foreground-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr key={client.id} className="border-b border-background-100 hover:bg-background-100/50 transition-colors">
                <td className="py-2.5">
                  <span className="font-medium text-foreground-900">{client.company}</span>
                  {client.isEnterprise && (
                    <span className="ml-1.5 text-xs bg-foreground-100 text-foreground-600 px-1.5 py-0.5 rounded-full">ENT</span>
                  )}
                </td>
                <td className="py-2.5 text-foreground-700">{client.planName}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColor[client.status]}`}>{client.status.replace('_', ' ')}</span>
                </td>
                <td className="py-2.5 text-right font-medium text-foreground-900">£{client.monthlyTotal.toLocaleString()}</td>
                <td className="py-2.5 text-right text-foreground-700">{client.activeDesks}</td>
                <td className="py-2.5 text-right text-foreground-700">{client.aiCreditsUsed.toLocaleString()}</td>
                <td className={`py-2.5 text-right font-medium capitalize ${paymentColor[client.paymentStatus]}`}>{client.paymentStatus}</td>
                <td className="py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button className="text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer whitespace-nowrap">View</button>
                    <button className="text-xs text-foreground-400 hover:text-foreground-600 cursor-pointer whitespace-nowrap">Override</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}