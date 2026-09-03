import { useState, useMemo } from 'react';
import { mockCheckIns, mockSites, mockBuildings, mockFloors, mockAreas } from '@/mocks/workspaceData';

export default function CheckInsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [siteFilter, setSiteFilter] = useState('');
  const [showAnonymous, setShowAnonymous] = useState(false);

  const filteredBldgs = mockBuildings.filter(b => !siteFilter || b.site_id === siteFilter);
  const filteredFlrs = mockFloors.filter(f => (!siteFilter || f.site_id === siteFilter));

  const filtered = useMemo(() => {
    let items = [...mockCheckIns];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(c => c.user_name.toLowerCase().includes(q) || c.desk_name.toLowerCase().includes(q) || c.site_name.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(c => c.status === statusFilter);
    if (siteFilter) items = items.filter(c => c.site_id === siteFilter);
    return items;
  }, [search, statusFilter, siteFilter]);

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = { active: 'bg-green-100 text-green-700', completed: 'bg-foreground-100 text-foreground-500', cancelled: 'bg-red-100 text-red-600' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[s] || ''}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
  };

  const formatDuration = (mins: number | null) => {
    if (!mins) return '—';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const formatTime = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Check-Ins</h1>
          <p className="text-sm text-foreground-500 mt-0.5">View desk check-in history across your workplace</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-foreground-500 cursor-pointer">
            <input type="checkbox" checked={showAnonymous} onChange={e => setShowAnonymous(e.target.checked)} className="w-3.5 h-3.5 rounded accent-primary-500 cursor-pointer" />
            Anonymous mode
          </label>
          <button className="text-xs font-medium text-foreground-500 bg-background-100 px-3 py-1.5 rounded-lg hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-download-line mr-1"></i> Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search by staff, desk, or site..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={siteFilter} onChange={e => setSiteFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="">All Sites</option>
          {mockSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Staff</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Area</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Check-in</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Check-out</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3 text-foreground-700 font-medium text-xs">
                    {showAnonymous && c.status === 'completed' ? 'Anonymous user' : c.user_name}
                  </td>
                  <td className="px-4 py-3 text-foreground-900 font-semibold text-xs">{c.desk_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{c.site_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{c.floor_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{c.area_name}</td>
                  <td className="px-4 py-3 text-foreground-700 text-xs">{formatTime(c.checked_in_at)}</td>
                  <td className="px-4 py-3 text-foreground-700 text-xs">{formatTime(c.checked_out_at)}</td>
                  <td className="px-4 py-3 text-foreground-700 text-xs">{formatDuration(c.duration_minutes)}</td>
                  <td className="px-4 py-3">{statusBadge(c.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {c.status === 'active' && (
                        <button className="text-[11px] font-medium bg-accent-50 text-accent-600 px-2 py-1 rounded-md hover:bg-accent-100 transition-colors cursor-pointer whitespace-nowrap">Check Out</button>
                      )}
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-3 bg-background-100 rounded-lg text-xs text-foreground-500">
        <i className="ri-information-line mr-1"></i>
        Named check-in data is visible to authorised managers and admins. Enable anonymous mode to hide staff names when named tracking is restricted. Check-in records respect your data retention settings.
      </div>
    </div>
  );
}