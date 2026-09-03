import { useState, useMemo } from 'react';
import { mockBuildings, buildingStatuses } from '@/mocks/workspaceData';

export default function BuildingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBld, setSelectedBld] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = useMemo(() => {
    let items = [...mockBuildings];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(b => b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q) || b.site_name.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(b => b.status === statusFilter);
    return items;
  }, [search, statusFilter]);

  const building = selectedBld ? mockBuildings.find(b => b.id === selectedBld) : null;

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-foreground-100 text-foreground-500', draft: 'bg-amber-100 text-amber-700', archived: 'bg-foreground-200 text-foreground-400' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Buildings</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Manage buildings across your sites</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary-500 text-background-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-add-line"></i> Add Building
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search buildings..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {buildingStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Building Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floors</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desks</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Checked In</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Manager</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground-900">{b.name}</span>
                    <span className="text-[11px] text-foreground-400 ml-1.5">{b.code}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{b.site_name}</td>
                  <td className="px-4 py-3 text-foreground-700">{b.floors}</td>
                  <td className="px-4 py-3 text-foreground-700">{b.desk_count}</td>
                  <td className="px-4 py-3"><span className="text-accent-600 font-semibold">{b.active_checkins}</span></td>
                  <td className="px-4 py-3 text-foreground-700 text-xs">{b.manager_name}</td>
                  <td className="px-4 py-3">{statusBadge(b.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedBld(b.id); setShowDrawer(true); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="Edit"><i className="ri-pencil-line text-xs"></i></button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-foreground-400 hover:text-red-500 transition-colors cursor-pointer" title="Archive"><i className="ri-archive-line text-xs"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrawer && building && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDrawer(false)}></div>
          <div className="relative w-full max-w-md bg-background-50 h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-heading font-bold text-foreground-950">{building.name}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="p-5 space-y-4">
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Code</p><p className="text-sm text-foreground-800">{building.code}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Site</p><p className="text-sm text-foreground-800">{building.site_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Floors</p><p className="text-sm text-foreground-800">{building.floors}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Manager</p><p className="text-sm text-foreground-800">{building.manager_name}</p></div>
              <div className="flex items-center gap-2"><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide">Status</p>{statusBadge(building.status)}</div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="/dashboard/floors" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Floors</a>
                <a href="/dashboard/desks" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Desks</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}