import { useState } from 'react';
import { Link } from 'react-router-dom';
import { clientAuditLogs, eventTypeOptions, severityOptions } from '@/mocks/complianceData';

const severityBadgeClasses: Record<string, string> = {
  info: 'bg-secondary-100 text-secondary-800',
  warning: 'bg-amber-100 text-amber-800',
  critical: 'bg-red-100 text-red-800',
};

export default function ClientAuditLogsPage() {
  const [logs] = useState(clientAuditLogs);
  const [filters, setFilters] = useState({ eventType: '', user: '', severity: '', site: '', dateFrom: '', dateTo: '' });
  const [showDetail, setShowDetail] = useState<typeof clientAuditLogs[0] | null>(null);

  const filteredLogs = logs.filter((log) => {
    if (filters.eventType && log.eventType !== filters.eventType) return false;
    if (filters.user && log.user && !log.user.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (filters.severity && log.severity !== filters.severity) return false;
    if (filters.site && log.site && !log.site.toLowerCase().includes(filters.site.toLowerCase())) return false;
    if (filters.dateFrom && new Date(log.timestamp) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(log.timestamp) > new Date(filters.dateTo + 'T23:59:59')) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Audit Logs</h1>
          <p className="mt-1 text-sm text-foreground-600">Review all sensitive actions across your workplace. Audit logs are read-only.</p>
        </div>
        <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
          Export CSV
        </button>
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
          placeholder="Search user..."
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.user}
          onChange={(e) => setFilters({ ...filters, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search site..."
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.site}
          onChange={(e) => setFilters({ ...filters, site: e.target.value })}
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
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Event Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Site</th>
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
                <td className="px-4 py-3 text-xs text-foreground-700 whitespace-nowrap">{log.eventType.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3 text-xs font-medium text-foreground-800 whitespace-nowrap">{log.user || '—'}</td>
                <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{log.site || '—'}</td>
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

      <p className="text-xs text-foreground-400">Showing {filteredLogs.length} of {logs.length} audit log entries.</p>

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
                <div>
                  <span className="text-xs font-medium text-foreground-500">User</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.user || '—'}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Role</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.role || '—'}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Company</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.company || '—'}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Site</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.site || '—'}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Target Type</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.targetType}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Target ID</span>
                  <p className="mt-0.5 text-sm font-mono text-foreground-600">{showDetail.targetId}</p>
                </div>
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