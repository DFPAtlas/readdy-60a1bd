import { useState, useMemo } from 'react';
import { mockAreas, areaStatuses } from '@/mocks/workspaceData';

export default function HotDeskAreasPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = useMemo(() => {
    let items = [...mockAreas];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(a => a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q) || a.floor_name.toLowerCase().includes(q) || a.building_name.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(a => a.status === statusFilter);
    return items;
  }, [search, statusFilter]);

  const area = selectedArea ? mockAreas.find(a => a.id === selectedArea) : null;

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-foreground-100 text-foreground-500', draft: 'bg-amber-100 text-amber-700', archived: 'bg-foreground-200 text-foreground-400' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Hot Desk Areas</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Create and manage desk zones and sections</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary-500 text-background-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-add-line"></i> Add Area
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search areas..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {areaStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Area Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Building</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desks</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Available</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Occupied</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Manager</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground-900">{a.name}</span>
                    <span className="text-[11px] text-foreground-400 ml-1.5">{a.code}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{a.site_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{a.building_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{a.floor_name}</td>
                  <td className="px-4 py-3 text-foreground-700">{a.desk_count}</td>
                  <td className="px-4 py-3"><span className="text-green-600 font-semibold">{a.available_desks}</span></td>
                  <td className="px-4 py-3"><span className="text-accent-600 font-semibold">{a.occupied_desks}</span></td>
                  <td className="px-4 py-3 text-foreground-700 text-xs">{a.manager_name}</td>
                  <td className="px-4 py-3">{statusBadge(a.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedArea(a.id); setShowDrawer(true); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
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

      {showDrawer && area && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDrawer(false)}></div>
          <div className="relative w-full max-w-md bg-background-50 h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-heading font-bold text-foreground-950">{area.name}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="p-5 space-y-4">
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Code</p><p className="text-sm text-foreground-800">{area.code}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Location</p><p className="text-sm text-foreground-800">{area.site_name} &rarr; {area.building_name} &rarr; {area.floor_name}</p></div>
              <div className="flex items-center gap-2"><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide">Status</p>{statusBadge(area.status)}</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background-100 rounded-lg p-3 text-center"><p className="text-lg font-bold text-foreground-900">{area.desk_count}</p><p className="text-[10px] text-foreground-400">Total</p></div>
                <div className="bg-green-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-green-600">{area.available_desks}</p><p className="text-[10px] text-foreground-400">Available</p></div>
                <div className="bg-accent-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-accent-600">{area.occupied_desks}</p><p className="text-[10px] text-foreground-400">Occupied</p></div>
              </div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Description</p><p className="text-sm text-foreground-800">{area.description}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Access Rules</p><p className="text-sm text-foreground-800">{area.access_rules}</p></div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="/dashboard/desks" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Desks</a>
                <a href="/dashboard/live-status" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">Live Status</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}