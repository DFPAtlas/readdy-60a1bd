import { complianceOverviewCards, complianceChecklistItems } from '@/mocks/complianceData';

const statusBadgeClasses: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  enabled: 'bg-emerald-100 text-emerald-800',
  needs_review: 'bg-amber-100 text-amber-800',
  draft: 'bg-secondary-100 text-secondary-800',
  disabled: 'bg-foreground-100 text-foreground-600',
  not_started: 'bg-foreground-100 text-foreground-600',
};

const companies = [
  { name: 'Acme Corp', plan: 'Intelligence', score: 7, total: 10, status: 'active' },
  { name: 'Beta Ltd', plan: 'Professional', score: 5, total: 10, status: 'needs_review' },
  { name: 'StartupPrime', plan: 'Basic', score: 3, total: 10, status: 'draft' },
];

export default function AdminCompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground-950">Compliance Overview</h1>
        <p className="mt-1 text-sm text-foreground-600">Monitor privacy and compliance readiness across all companies on the platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <span className="text-xs font-medium text-foreground-500">Total Companies</span>
          <p className="mt-1 text-2xl font-semibold text-foreground-950">3</p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <span className="text-xs font-medium text-emerald-700">Fully Compliant</span>
          <p className="mt-1 text-2xl font-semibold text-emerald-900">1</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <span className="text-xs font-medium text-amber-700">Needs Attention</span>
          <p className="mt-1 text-2xl font-semibold text-amber-900">2</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-foreground-200/60 bg-background-50">
        <table className="w-full">
          <thead className="border-b border-foreground-200/60 bg-background-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Privacy Readiness</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-100/60">
            {companies.map((c) => (
              <tr key={c.name} className="hover:bg-background-50/80">
                <td className="px-4 py-3 text-sm font-medium text-foreground-900">{c.name}</td>
                <td className="px-4 py-3 text-sm text-foreground-600">{c.plan}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-foreground-100">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${(c.score / c.total) * 100}%` }} />
                    </div>
                    <span className="text-xs text-foreground-500">{c.score}/{c.total}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClasses[c.status]}`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">Platform Privacy Features</h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {complianceOverviewCards.slice(0, 6).map((card) => (
            <div key={card.id} className="flex items-center gap-3 rounded-md border border-foreground-100/60 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-100">
                <i className={`${card.icon} text-sm text-primary-600`}></i>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground-800">{card.title}</p>
                <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClasses[card.status]}`}>
                  {card.statusLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-4">
        <p className="text-xs text-foreground-500">
          Platform admin support access to company data is audit logged. View detailed logs on the <a href="/admin/audit-logs" className="text-primary-600 hover:text-primary-700 underline">Audit Logs</a> page.
        </p>
      </div>
    </div>
  );
}