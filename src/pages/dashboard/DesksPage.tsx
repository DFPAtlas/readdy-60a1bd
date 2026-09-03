import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockDesks, allDeskStatuses, allDeskTypes } from '@/mocks/workspaceData';

export default function DesksPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = useMemo(() => {
    let items = [...mockDesks];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(d => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || d.area_name?.toLowerCase().includes(q) || (d.current_user || '').toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(d => d.status === statusFilter);
    if (typeFilter !== 'all') items = items.filter(d => d.type === typeFilter);
    return items;
  }, [search, statusFilter, typeFilter]);

  const desk = selectedDesk ? mockDesks.find(d => d.id === selectedDesk) : null;

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700', available: 'bg-green-100 text-green-700',
      occupied: 'bg-accent-100 text-accent-700', booked: 'bg-amber-100 text-amber-700',
      maintenance: 'bg-foreground-200 text-foreground-600', draft: 'bg-foreground-100 text-foreground-500',
      inactive: 'bg-foreground-100 text-foreground-500', archived: 'bg-foreground-200 text-foreground-400',
    };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const tagBadge = (tagStatus: string) => {
    if (!tagStatus || tagStatus === 'unassigned') return <span className="text-[11px] text-foreground-400">—</span>;
    const colors: Record<string, string> = { active: 'bg-primary-50 text-primary-600', assigned: 'bg-secondary-50 text-secondary-600', disabled: 'bg-foreground-100 text-foreground-400', lost: 'bg-red-50 text-red-500' };
    return <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${colors[tagStatus] || ''}`}>{tagStatus}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Desks</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Manage all desks across your workplace</p>
        </div>
        <Link to="/dashboard/desks/new" className="inline-flex items-center gap-2 bg-primary-500 text-background-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-add-line"></i> Add Desk
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search desks by name, code, area, or user..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {allDeskStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Types</option>
          {allDeskTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floor</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Area</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Tag</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Current User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground-900">{d.name}</span>
                    <span className="text-[11px] text-foreground-400 ml-1">{d.code}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{d.site_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{d.floor_name}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{d.area_name}</td>
                  <td className="px-4 py-3 text-foreground-700 text-xs capitalize">{d.type}</td>
                  <td className="px-4 py-3">{tagBadge(d.tag_status)}</td>
                  <td className="px-4 py-3">{statusBadge(d.status)}</td>
                  <td className="px-4 py-3 text-foreground-700 text-xs font-medium">{d.current_user || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedDesk(d.id); setShowDrawer(true); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="Edit"><i className="ri-pencil-line text-xs"></i></button>
                      <Link to="/dashboard/tags" className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="Assign Tag"><i className="ri-price-tag-3-line text-xs"></i></Link>
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-foreground-400 hover:text-red-500 transition-colors cursor-pointer" title="Archive"><i className="ri-archive-line text-xs"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrawer && desk && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDrawer(false)}></div>
          <div className="relative w-full max-w-md bg-background-50 h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="font-heading font-bold text-foreground-950">{desk.name}</h2>
                <p className="text-xs text-foreground-400">{desk.code}</p>
              </div>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2">{statusBadge(desk.status)}{tagBadge(desk.tag_status)}</div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Location</p><p className="text-sm text-foreground-800">{desk.site_name} &rarr; {desk.floor_name} &rarr; {desk.area_name}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Type</p><p className="text-sm text-foreground-800 capitalize">{desk.type}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Current User</p><p className="text-sm text-foreground-800">{desk.current_user || '—'}</p></div>
              <div><p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Last Check-in</p><p className="text-sm text-foreground-800">{desk.last_checkin ? new Date(desk.last_checkin).toLocaleString('en-GB') : '—'}</p></div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="text-center text-sm font-medium bg-primary-100 text-primary-700 py-2 px-3 rounded-lg hover:bg-primary-200 transition-colors cursor-pointer whitespace-nowrap">Edit Desk</button>
                {desk.status === 'occupied' && <button className="text-center text-sm font-medium bg-accent-100 text-accent-700 py-2 px-3 rounded-lg hover:bg-accent-200 transition-colors cursor-pointer whitespace-nowrap">Manual Check-out</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}