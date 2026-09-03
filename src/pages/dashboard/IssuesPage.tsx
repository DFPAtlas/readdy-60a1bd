import { useState, useMemo } from 'react';
import { mockIssues, mockSites, issueStatuses } from '@/mocks/workspaceData';

export default function IssuesDashboardPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [siteFilter, setSiteFilter] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = useMemo(() => {
    let items = [...mockIssues];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(i => i.issue_type.toLowerCase().includes(q) || i.desk_name.toLowerCase().includes(q) || i.reporter_name.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(i => i.status === statusFilter);
    if (siteFilter) items = items.filter(i => i.site_id === siteFilter);
    return items;
  }, [search, statusFilter, siteFilter]);

  const issue = selectedIssue ? mockIssues.find(i => i.id === selectedIssue) : null;

  const priorityBadge = (p: string) => {
    const colors: Record<string, string> = { low: 'bg-foreground-100 text-foreground-500', medium: 'bg-amber-100 text-amber-700', high: 'bg-accent-100 text-accent-700', urgent: 'bg-red-100 text-red-600' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[p] || ''}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</span>;
  };

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = { open: 'bg-red-100 text-red-600', 'in progress': 'bg-amber-100 text-amber-700', resolved: 'bg-green-100 text-green-700', closed: 'bg-foreground-100 text-foreground-500' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[s] || ''}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Desk Issues</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Track and manage maintenance and issue reports</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search by issue type, desk, or reporter..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={siteFilter} onChange={e => setSiteFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="">All Sites</option>
          {mockSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {issueStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Issue</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Area</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Reported by</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Created</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(iss => (
                <tr key={iss.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground-900 text-xs capitalize">{iss.issue_type}</span>
                    <p className="text-[11px] text-foreground-400 line-clamp-1">{iss.description}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground-700 font-medium text-xs">{iss.desk_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{iss.site_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{iss.floor_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{iss.area_name}</td>
                  <td className="px-4 py-3 text-foreground-700 text-xs">{iss.reporter_name}</td>
                  <td className="px-4 py-3">{priorityBadge(iss.priority)}</td>
                  <td className="px-4 py-3">{statusBadge(iss.status)}</td>
                  <td className="px-4 py-3 text-foreground-500 text-xs">{new Date(iss.created_at).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedIssue(iss.id); setShowDrawer(true); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
                      {(iss.status === 'open' || iss.status === 'in progress') && (
                        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-green-50 text-foreground-400 hover:text-green-600 transition-colors cursor-pointer" title="Resolve"><i className="ri-check-line text-xs"></i></button>
                      )}
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-foreground-400 hover:text-red-500 transition-colors cursor-pointer" title="Archive"><i className="ri-archive-line text-xs"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrawer && issue && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDrawer(false)}></div>
          <div className="relative w-full max-w-md bg-background-50 h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-heading font-bold text-foreground-950 capitalize">{issue.issue_type}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">{priorityBadge(issue.priority)}{statusBadge(issue.status)}</div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Desk</p><p className="text-sm text-foreground-800">{issue.desk_name} · {issue.area_name} · {issue.floor_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Site</p><p className="text-sm text-foreground-800">{issue.site_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Reported By</p><p className="text-sm text-foreground-800">{issue.reporter_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Description</p><p className="text-sm text-foreground-800">{issue.description}</p></div>
              {issue.assigned_to_name && <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Assigned To</p><p className="text-sm text-foreground-800">{issue.assigned_to_name}</p></div>}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {issue.status !== 'resolved' && issue.status !== 'closed' && (
                  <>
                    <button className="bg-primary-500 text-background-50 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Mark In Progress</button>
                    <button className="bg-green-500 text-background-50 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap">Mark Resolved</button>
                  </>
                )}
                {issue.status === 'resolved' && (
                  <button className="bg-foreground-100 text-foreground-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-foreground-200 transition-colors cursor-pointer whitespace-nowrap">Close Issue</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}