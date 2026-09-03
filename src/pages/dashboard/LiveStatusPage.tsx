import { useState } from 'react';
import { mockSites, mockBuildings, mockFloors, mockAreas, mockDesks, liveStatusStats } from '@/mocks/workspaceData';

export default function LiveStatusPage() {
  const [filters, setFilters] = useState({ site_id: '', building_id: '', floor_id: '', area_id: '', type: '', status: '' });
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'grid'>('cards');

  const filteredBldgs = mockBuildings.filter(b => !filters.site_id || b.site_id === filters.site_id);
  const filteredFlrs = mockFloors.filter(f => (!filters.site_id || f.site_id === filters.site_id) && (!filters.building_id || f.building_id === filters.building_id));
  const filteredArs = mockAreas.filter(a => (!filters.site_id || a.site_id === filters.site_id) && (!filters.building_id || a.building_id === filters.building_id) && (!filters.floor_id || a.floor_id === filters.floor_id));

  const filteredDesks = mockDesks.filter(d => {
    if (filters.site_id && d.site_id !== filters.site_id) return false;
    if (filters.building_id && d.building_id !== filters.building_id) return false;
    if (filters.floor_id && d.floor_id !== filters.floor_id) return false;
    if (filters.area_id && d.area_id !== filters.area_id) return false;
    if (filters.type && d.type !== filters.type) return false;
    if (filters.status && d.status !== filters.status) return false;
    return true;
  });

  const stats = {
    total: filteredDesks.length,
    occupied: filteredDesks.filter(d => d.status === 'occupied').length,
    available: filteredDesks.filter(d => d.status === 'available').length,
    maintenance: filteredDesks.filter(d => d.status === 'maintenance').length,
    booked: filteredDesks.filter(d => d.status === 'booked').length,
  };

  const statusColor = (status: string) => {
    const c: Record<string, string> = { occupied: 'bg-accent-500', available: 'bg-green-500', booked: 'bg-amber-500', maintenance: 'bg-foreground-400', draft: 'bg-foreground-300', inactive: 'bg-foreground-200', archived: 'bg-foreground-200' };
    return c[status] || 'bg-foreground-300';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Live Desk Status</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Real-time overview of desk occupancy across your workplace</p>
        </div>
        <div className="flex items-center bg-background-100 rounded-full p-0.5 w-fit">
          {(['cards', 'table', 'grid'] as const).map(v => (
            <button key={v} onClick={() => setViewMode(v)} className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors capitalize ${viewMode === v ? 'bg-background-50 text-foreground-900' : 'text-foreground-500'}`}>{v}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total Active', value: liveStatusStats.total_active_desks, icon: 'ri-computer-line', color: 'bg-primary-100 text-primary-600' },
          { label: 'Available', value: liveStatusStats.available_desks, icon: 'ri-check-line', color: 'bg-green-100 text-green-600' },
          { label: 'Occupied', value: liveStatusStats.occupied_desks, icon: 'ri-user-location-line', color: 'bg-accent-100 text-accent-600' },
          { label: 'Maintenance', value: liveStatusStats.maintenance_desks, icon: 'ri-tools-line', color: 'bg-foreground-100 text-foreground-600' },
          { label: 'Checked In', value: liveStatusStats.active_checkins, icon: 'ri-qr-scan-line', color: 'bg-secondary-100 text-secondary-600' },
        ].map(s => (
          <div key={s.label} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
              <i className={`${s.icon} text-sm`}></i>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground-950">{s.value}</p>
            <p className="text-xs text-foreground-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4 flex-wrap">
        <select value={filters.site_id} onChange={e => setFilters({ ...filters, site_id: e.target.value, building_id: '', floor_id: '', area_id: '' })} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-1.5 text-xs text-foreground-700 cursor-pointer">
          <option value="">All Sites</option>
          {mockSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={filters.building_id} onChange={e => setFilters({ ...filters, building_id: e.target.value, floor_id: '', area_id: '' })} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-1.5 text-xs text-foreground-700 cursor-pointer">
          <option value="">All Buildings</option>
          {filteredBldgs.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select value={filters.floor_id} onChange={e => setFilters({ ...filters, floor_id: e.target.value, area_id: '' })} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-1.5 text-xs text-foreground-700 cursor-pointer">
          <option value="">All Floors</option>
          {filteredFlrs.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        <select value={filters.area_id} onChange={e => setFilters({ ...filters, area_id: e.target.value })} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-1.5 text-xs text-foreground-700 cursor-pointer">
          <option value="">All Areas</option>
          {filteredArs.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-1.5 text-xs text-foreground-700 cursor-pointer">
          <option value="">All Statuses</option>
          {['available', 'occupied', 'booked', 'maintenance'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-4 text-xs text-foreground-500 flex-wrap">
          <span>Showing {stats.total} desks</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> {stats.available} Available</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span> {stats.occupied} Occupied</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-foreground-400"></span> {stats.maintenance} Maint.</span>
        </div>
      </div>

      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredDesks.map(d => (
            <div key={d.id} className={`bg-background-50 border border-background-200/70 rounded-xl p-4 border-l-4 ${statusColor(d.status).replace('bg-', 'border-l-')}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-foreground-900 text-sm">{d.name}</p>
                  <p className="text-[11px] text-foreground-400">{d.area_name} · {d.floor_name}</p>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${statusColor(d.status)}`}></span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground-600 capitalize">{d.type}</span>
                <span className={`font-medium ${d.status === 'occupied' ? 'text-accent-600' : d.status === 'available' ? 'text-green-600' : 'text-foreground-500'}`}>
                  {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                </span>
              </div>
              {d.current_user && <p className="text-[11px] text-foreground-500 mt-1">{d.current_user}</p>}
            </div>
          ))}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 bg-background-100/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Desk</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Area</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500">Current User</th>
                </tr>
              </thead>
              <tbody>
                {filteredDesks.map(d => (
                  <tr key={d.id} className="border-b border-background-200/70 hover:bg-background-100/50">
                    <td className="px-4 py-2.5 font-semibold text-foreground-900 text-xs">{d.name}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs">{d.area_name} · {d.floor_name}</td>
                    <td className="px-4 py-2.5 text-foreground-600 text-xs capitalize">{d.type}</td>
                    <td className="px-4 py-2.5"><span className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${statusColor(d.status)}`}></span><span className="text-xs capitalize">{d.status}</span></span></td>
                    <td className="px-4 py-2.5 text-foreground-700 text-xs">{d.current_user || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {filteredDesks.map(d => (
            <div key={d.id} className={`aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${d.status === 'available' ? 'bg-green-50 border border-green-200/50 hover:bg-green-100' : d.status === 'occupied' ? 'bg-accent-50 border border-accent-200/50' : 'bg-foreground-50 border border-foreground-200/50'}`}>
              <span className={`w-2 h-2 rounded-full mb-1 ${statusColor(d.status)}`}></span>
              <span className="text-[10px] font-semibold text-foreground-700">{d.name.split('-').pop()}</span>
              <span className="text-[9px] text-foreground-400">{d.status.charAt(0).toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}