import { useState, useMemo } from 'react';
import { mockFloors, floorStatuses } from '@/mocks/workspaceData';

export default function FloorsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = useMemo(() => {
    let items = [...mockFloors];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(f => f.name.toLowerCase().includes(q) || f.code.toLowerCase().includes(q) || f.building_name.toLowerCase().includes(q) || f.site_name.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(f => f.status === statusFilter);
    return items;
  }, [search, statusFilter]);

  const floor = selectedFloor ? mockFloors.find(f => f.id === selectedFloor) : null;

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-foreground-100 text-foreground-500', draft: 'bg-amber-100 text-amber-700', archived: 'bg-foreground-200 text-foreground-400' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Floors</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Configure floors within your buildings</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary-500 text-background-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-add-line"></i> Add Floor
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search floors..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {floorStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floor Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Building</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Areas</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desks</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Checked In</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground-900">{f.name}</span>
                    <span className="text-[11px] text-foreground-400 ml-1.5">{f.code}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{f.building_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{f.site_name}</td>
                  <td className="px-4 py-3 text-foreground-700">{f.hot_desk_areas}</td>
                  <td className="px-4 py-3 text-foreground-700">{f.desk_count}</td>
                  <td className="px-4 py-3"><span className="text-accent-600 font-semibold">{f.active_checkins}</span></td>
                  <td className="px-4 py-3">{statusBadge(f.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedFloor(f.id); setShowDrawer(true); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
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

      {showDrawer && floor && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDrawer(false)}></div>
          <div className="relative w-full max-w-md bg-background-50 h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-heading font-bold text-foreground-950">{floor.name}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="p-5 space-y-4">
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Code</p><p className="text-sm text-foreground-800">{floor.code}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Building</p><p className="text-sm text-foreground-800">{floor.building_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Site</p><p className="text-sm text-foreground-800">{floor.site_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Description</p><p className="text-sm text-foreground-800">{floor.description}</p></div>
              <div className="flex items-center gap-2"><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide">Status</p>{statusBadge(floor.status)}</div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="/dashboard/areas" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Areas</a>
                <a href="/dashboard/desks" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Desks</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}