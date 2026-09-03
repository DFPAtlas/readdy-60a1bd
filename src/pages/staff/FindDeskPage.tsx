import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockDesks, mockSites, mockBuildings, mockFloors, mockAreas, allDeskTypes } from '@/mocks/workspaceData';

export default function StaffFindDeskPage() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [filters, setFilters] = useState({ site_id: '', building_id: '', floor_id: '', area_id: '', type: '', availableOnly: true, accessibility: false });

  const filteredBuildings = mockBuildings.filter(b => !filters.site_id || b.site_id === filters.site_id);
  const filteredFloors = mockFloors.filter(f => (!filters.site_id || f.site_id === filters.site_id) && (!filters.building_id || f.building_id === filters.building_id));
  const filteredAreas = mockAreas.filter(a => (!filters.site_id || a.site_id === filters.site_id) && (!filters.building_id || a.building_id === filters.building_id) && (!filters.floor_id || a.floor_id === filters.floor_id));

  const desks = useMemo(() => {
    let items = [...mockDesks];
    if (filters.availableOnly) items = items.filter(d => d.status === 'available');
    if (filters.site_id) items = items.filter(d => d.site_id === filters.site_id);
    if (filters.building_id) items = items.filter(d => d.building_id === filters.building_id);
    if (filters.floor_id) items = items.filter(d => d.floor_id === filters.floor_id);
    if (filters.area_id) items = items.filter(d => d.area_id === filters.area_id);
    if (filters.type) items = items.filter(d => d.type === filters.type);
    if (filters.accessibility) items = items.filter(d => d.type === 'accessible desk');
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(d => d.name.toLowerCase().includes(q) || d.area_name?.toLowerCase().includes(q));
    }
    return items;
  }, [filters, search]);

  const deskTypeIcon = (type: string) => {
    if (type.includes('standing')) return 'ri-body-scan-line';
    if (type.includes('quiet')) return 'ri-volume-mute-line';
    if (type.includes('accessible')) return 'ri-wheelchair-line';
    if (type.includes('dual')) return 'ri-tv-2-line';
    if (type.includes('visitor')) return 'ri-user-received-line';
    if (type.includes('team')) return 'ri-team-line';
    if (type.includes('manager')) return 'ri-vip-crown-line';
    return 'ri-computer-line';
  };

  return (
    <div className="min-h-screen bg-background-50 pb-20">
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
        <div className="max-w-[600px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/staff" className="flex items-center gap-1.5 cursor-pointer">
            <i className="ri-arrow-left-line text-foreground-600"></i>
            <span className="text-sm font-medium text-foreground-700">Back</span>
          </Link>
          <h1 className="font-heading text-sm font-bold text-foreground-900">Find Desk</h1>
          <div className="w-14"></div>
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-4 pt-4">
        <div className="relative mb-4">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search desks by name or area..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-background-50 border border-background-200/70 rounded-xl text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>

        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <select value={filters.site_id} onChange={e => setFilters({ ...filters, site_id: e.target.value, building_id: '', floor_id: '', area_id: '' })} className="bg-background-50 border border-background-200/70 rounded-full px-3 py-1.5 text-xs text-foreground-700 cursor-pointer whitespace-nowrap flex-shrink-0">
            <option value="">All Sites</option>
            {mockSites.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={filters.building_id} onChange={e => setFilters({ ...filters, building_id: e.target.value, floor_id: '', area_id: '' })} className="bg-background-50 border border-background-200/70 rounded-full px-3 py-1.5 text-xs text-foreground-700 cursor-pointer whitespace-nowrap flex-shrink-0">
            <option value="">All Buildings</option>
            {filteredBuildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })} className="bg-background-50 border border-background-200/70 rounded-full px-3 py-1.5 text-xs text-foreground-700 cursor-pointer whitespace-nowrap flex-shrink-0">
            <option value="">All Types</option>
            {allDeskTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={filters.availableOnly} onChange={e => setFilters({ ...filters, availableOnly: e.target.checked })} className="w-3.5 h-3.5 rounded accent-primary-500 cursor-pointer" />
              <span className="text-xs text-foreground-600">Available only</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={filters.accessibility} onChange={e => setFilters({ ...filters, accessibility: e.target.checked })} className="w-3.5 h-3.5 rounded accent-primary-500 cursor-pointer" />
              <span className="text-xs text-foreground-600">Accessible</span>
            </label>
          </div>
          <div className="flex items-center bg-background-100 rounded-full p-0.5">
            <button onClick={() => setViewMode('cards')} className={`px-2 py-1 rounded-full text-[10px] font-medium cursor-pointer ${viewMode === 'cards' ? 'bg-background-50 text-foreground-900' : 'text-foreground-500'}`}><i className="ri-layout-grid-line mr-0.5"></i>Cards</button>
            <button onClick={() => setViewMode('list')} className={`px-2 py-1 rounded-full text-[10px] font-medium cursor-pointer ${viewMode === 'list' ? 'bg-background-50 text-foreground-900' : 'text-foreground-500'}`}><i className="ri-list-check mr-0.5"></i>List</button>
          </div>
        </div>

        {desks.length === 0 && (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-3">
              <i className="ri-search-line text-2xl text-foreground-300"></i>
            </div>
            <p className="text-sm text-foreground-500">No desks match your filters.</p>
            <p className="text-xs text-foreground-400 mt-1">Try adjusting your filters or check back later.</p>
          </div>
        )}

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 gap-3">
            {desks.map(d => (
              <Link key={d.id} to={`/staff/check-in?desk=${d.code}`} className="bg-background-50 border border-background-200/70 rounded-xl p-4 hover:border-primary-300 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <i className={`${deskTypeIcon(d.type)} text-primary-500 text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground-900 text-sm">{d.name}</h3>
                      <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">Available</span>
                    </div>
                    <p className="text-xs text-foreground-500 capitalize mb-1">{d.type}</p>
                    <div className="flex items-center gap-2 text-[11px] text-foreground-400">
                      <span>{d.area_name}</span>
                      <span>·</span>
                      <span>{d.floor_name}</span>
                      <span>·</span>
                      <span>{d.site_name}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 flex-shrink-0 self-center">
                    <i className="ri-arrow-right-s-line text-primary-500"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {desks.map(d => (
              <Link key={d.id} to={`/staff/check-in?desk=${d.code}`} className="flex items-center gap-3 bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 hover:border-primary-300 transition-colors cursor-pointer">
                <i className={`${deskTypeIcon(d.type)} text-foreground-400 text-lg`}></i>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground-900">{d.name}</p>
                  <p className="text-xs text-foreground-500 capitalize">{d.type} · {d.area_name} · {d.floor_name}</p>
                </div>
                <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">Free</span>
                <i className="ri-arrow-right-s-line text-foreground-300"></i>
              </Link>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background-50 border-t border-background-200/70 z-30">
        <div className="max-w-[600px] mx-auto px-2 py-2 flex items-center justify-around">
          {[
            { label: 'Home', href: '/staff', icon: 'ri-home-4-line' },
            { label: 'Scan', href: '/staff/check-in', icon: 'ri-qr-scan-line' },
            { label: 'Find Desk', href: '/staff/find-desk', icon: 'ri-search-line' },
            { label: 'Current', href: '/staff/current-desk', icon: 'ri-computer-line' },
            { label: 'Issues', href: '/staff/issues', icon: 'ri-error-warning-line' },
            { label: 'My Data', href: '/staff/my-data', icon: 'ri-shield-user-line' },
          ].map(link => (
            <Link key={link.href} to={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-w-0 ${link.href === '/staff/find-desk' ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'}`}>
              <i className={`${link.icon} text-lg`}></i>
              <span className="text-[10px] font-medium whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}