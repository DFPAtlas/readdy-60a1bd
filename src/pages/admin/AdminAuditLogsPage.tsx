import { useState } from 'react';
import { clientAuditLogs, eventTypeOptions, severityOptions } from '@/mocks/complianceData';

const severityBadgeClasses: Record<string, string> = {
  info: 'bg-secondary-100 text-secondary-800',
  warning: 'bg-amber-100 text-amber-800',
  critical: 'bg-red-100 text-red-800',
};

const adminExtraLogs = [
  { id: 'admin-audit-1', eventType: 'entitlement_changed', user: 'Platform Admin', role: 'platform_admin', company: 'Beta Ltd', site: null, action: 'Overrode plan entitlement: added floorplan_uploads for Beta Ltd', targetType: 'entitlement', targetId: 'ent_beta', severity: 'critical', timestamp: '2026-07-08T10:00:00Z', metadata: { company: 'Beta Ltd', entitlement: 'floorplan_uploads', oldValue: '0', newValue: '3' } },
  { id: 'admin-audit-2', eventType: 'billing_changed', user: 'Platform Admin', role: 'platform_admin', company: 'StartupPrime', site: null, action: 'Applied manual credit of 500 AI credits to StartupPrime account', targetType: 'billing', targetId: 'bill_sp', severity: 'warning', timestamp: '2026-07-07T16:00:00Z', metadata: { company: 'StartupPrime', credits: 500, reason: 'Customer support goodwill' } },
  { id: 'admin-audit-3', eventType: 'entitlement_changed', user: 'Platform Admin', role: 'platform_admin', company: 'Acme Corp', site: null, action: 'Granted temporary Intelligence trial upgrade', targetType: 'entitlement', targetId: 'ent_acme', severity: 'critical', timestamp: '2026-07-06T09:00:00Z', metadata: { company: 'Acme Corp', trialDays: 14 } },
  { id: 'admin-audit-4', eventType: 'support_access', user: 'Platform Admin', role: 'platform_admin', company: 'Beta Ltd', site: 'Beta HQ', action: 'Accessed Beta Ltd workspace for support investigation', targetType: 'company', targetId: 'comp_beta', severity: 'warning', timestamp: '2026-07-05T14:30:00Z', metadata: { reason: 'Check-in sync issue reported', accessedPages: ['/dashboard/check-ins', '/dashboard/desks'] } },
];

const allLogs = [...adminExtraLogs, ...clientAuditLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

export default function AdminAuditLogsPage() {
  const [filters, setFilters] = useState({ eventType: '', user: '', company: '', severity: '', dateFrom: '', dateTo: '' });
  const [showDetail, setShowDetail] = useState<typeof allLogs[0] | null>(null);

  const filteredLogs = allLogs.filter((log) => {
    if (filters.eventType && log.eventType !== filters.eventType) return false;
    if (filters.user && log.user && !log.user.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (filters.company && log.company && !log.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
    if (filters.severity && log.severity !== filters.severity) return false;
    if (filters.dateFrom && new Date(log.timestamp) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(log.timestamp) > new Date(filters.dateTo + 'T23:59:59')) return false;
    return true;
  });

  const criticalCount = allLogs.filter((l) => l.severity === 'critical').length;
  const warningCount = allLogs.filter((l) => l.severity === 'warning').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground-950">Platform Audit Logs</h1>
          <p className="mt-1 text-sm text-foreground-600">Cross-company audit trail for all platform activity. Entries are immutable and read-only.</p>
        </div>
        <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
          Export All Logs
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-4">
          <span className="text-xs font-medium text-foreground-500">Total Entries</span>
          <p className="mt-1 text-2xl font-semibold text-foreground-950">{allLogs.length}</p>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <span className="text-xs font-medium text-amber-700">Warnings</span>
          <p className="mt-1 text-2xl font-semibold text-amber-900">{warningCount}</p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <span className="text-xs font-medium text-red-700">Critical</span>
          <p className="mt-1 text-2xl font-semibold text-red-900">{criticalCount}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 rounded-lg border border-foreground-200/60 bg-background-50 p-4">
        <select
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.eventType}
          onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
        >
          <option value="">All Event Types</option>
          {eventTypeOptions.map((et) => (
            <option key={et} value={et}>{et.replace(/_/g, ' ')}</option>
          ))}
          <option value="support_access">Support Access</option>
        </select>
        <select
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.severity}
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
        >
          <option value="">All Severities</option>
          {severityOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search company..."
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search user..."
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.user}
          onChange={(e) => setFilters({ ...filters, user: e.target.value })}
        />
        <input
          type="date"
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        />
        <input
          type="date"
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-foreground-200/60 bg-background-50">
        <table className="w-full">
          <thead className="border-b border-foreground-200/60 bg-background-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Timestamp</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Company</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Action</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Severity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-100/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-background-50/80">
                <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="px-4 py-3 text-xs font-medium text-foreground-800 whitespace-nowrap">{log.company || '—'}</td>
                <td className="px-4 py-3 text-xs text-foreground-700 whitespace-nowrap">{log.user || '—'}</td>
                <td className="px-4 py-3 text-xs text-foreground-600 max-w-xs truncate">{log.action}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${severityBadgeClasses[log.severity]}`}>{log.severity}</span>
                </td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => setShowDetail(log)} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                    View <i className="ri-arrow-right-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-end" onClick={() => setShowDetail(null)}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-foreground-200/60 bg-background-50 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground-950">Audit Entry Detail</h3>
              <button type="button" onClick={() => setShowDetail(null)} className="text-foreground-400 hover:text-foreground-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <span className="text-xs font-medium text-foreground-500">Event Type</span>
                <p className="mt-0.5 text-sm text-foreground-800 capitalize">{showDetail.eventType.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-foreground-500">Action</span>
                <p className="mt-0.5 text-sm text-foreground-800">{showDetail.action}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs font-medium text-foreground-500">User</span><p className="mt-0.5 text-sm text-foreground-800">{showDetail.user || '—'}</p></div>
                <div><span className="text-xs font-medium text-foreground-500">Role</span><p className="mt-0.5 text-sm text-foreground-800">{showDetail.role || '—'}</p></div>
                <div><span className="text-xs font-medium text-foreground-500">Company</span><p className="mt-0.5 text-sm text-foreground-800">{showDetail.company || '—'}</p></div>
                <div><span className="text-xs font-medium text-foreground-500">Site</span><p className="mt-0.5 text-sm text-foreground-800">{showDetail.site || '—'}</p></div>
                <div><span className="text-xs font-medium text-foreground-500">Target ID</span><p className="mt-0.5 text-sm font-mono text-foreground-600">{showDetail.targetId}</p></div>
              </div>
              <div>
                <span className="text-xs font-medium text-foreground-500">Timestamp</span>
                <p className="mt-0.5 text-sm text-foreground-800">{new Date(showDetail.timestamp).toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-foreground-500">Metadata</span>
                <pre className="mt-1 rounded-md bg-foreground-50 p-3 text-xs text-foreground-600 overflow-x-auto">{JSON.stringify(showDetail.metadata, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}