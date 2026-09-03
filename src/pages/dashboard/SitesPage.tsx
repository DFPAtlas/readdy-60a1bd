import { useState, useMemo } from 'react';
import { mockSites, siteStatuses, countryOptions } from '@/mocks/workspaceData';
import { checkPlanLimit } from '@/services/entitlements';

export default function SitesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSite, setNewSite] = useState({ name: '', code: '', address: '', postcode: '', country: 'UK', timezone: 'Europe/London', contact_name: '', contact_email: '', contact_phone: '' });

  const filteredSites = useMemo(() => {
    let items = [...mockSites];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(s => s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(s => s.status === statusFilter);
    return items;
  }, [search, statusFilter]);

  const site = selectedSite ? mockSites.find(s => s.id === selectedSite) : null;

  const limitCheck = checkPlanLimit('professional', 'max_sites', mockSites.filter(s => s.status === 'active').length + 1);

  const handleAddSite = () => {
    if (!limitCheck.ok) { alert(limitCheck.message); return; }
    setShowAddModal(false);
    setNewSite({ name: '', code: '', address: '', postcode: '', country: 'UK', timezone: 'Europe/London', contact_name: '', contact_email: '', contact_phone: '' });
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = { active: 'bg-green-100 text-green-700', inactive: 'bg-foreground-100 text-foreground-500', draft: 'bg-amber-100 text-amber-700', archived: 'bg-foreground-200 text-foreground-400' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Sites</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Manage your workplace locations</p>
        </div>
        <button onClick={() => { if (!limitCheck.ok) { alert(limitCheck.message); } else { setShowAddModal(true); } }} className="inline-flex items-center gap-2 bg-primary-500 text-background-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-add-line"></i> Add Site
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search sites..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {siteStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <div className="flex items-center bg-background-100 rounded-lg p-0.5">
          <button onClick={() => setViewMode('table')} className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${viewMode === 'table' ? 'bg-background-50 text-foreground-900' : 'text-foreground-500'}`}><i className="ri-list-check mr-1"></i>Table</button>
          <button onClick={() => setViewMode('cards')} className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${viewMode === 'cards' ? 'bg-background-50 text-foreground-900' : 'text-foreground-500'}`}><i className="ri-layout-grid-line mr-1"></i>Cards</button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200/70 bg-background-100/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Address</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Buildings</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Floors</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Desks</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Checked In</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Manager</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSites.map(s => (
                  <tr key={s.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-foreground-900">{s.name}</span>
                      <span className="text-[11px] text-foreground-400 ml-1.5">{s.code}</span>
                    </td>
                    <td className="px-4 py-3 text-foreground-600 text-xs">{s.address}, {s.postcode}</td>
                    <td className="px-4 py-3 text-foreground-700">{s.buildings}</td>
                    <td className="px-4 py-3 text-foreground-700">{s.floors}</td>
                    <td className="px-4 py-3 text-foreground-700">{s.desk_count}</td>
                    <td className="px-4 py-3">
                      <span className="text-accent-600 font-semibold">{s.active_checkins}</span>
                    </td>
                    <td className="px-4 py-3 text-foreground-700 text-xs">{s.manager_name}</td>
                    <td className="px-4 py-3">{statusBadge(s.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelectedSite(s.id); setShowDrawer(true); }} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="View"><i className="ri-eye-line text-xs"></i></button>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSites.map(s => (
            <div key={s.id} className="bg-background-50 border border-background-200/70 rounded-xl p-4 hover:border-background-300/60 transition-colors cursor-pointer" onClick={() => { setSelectedSite(s.id); setShowDrawer(true); }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground-900 text-sm">{s.name}</h3>
                  <p className="text-[11px] text-foreground-400">{s.code}</p>
                </div>
                {statusBadge(s.status)}
              </div>
              <p className="text-xs text-foreground-500 mb-3">{s.address}, {s.postcode}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-background-100 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-foreground-900">{s.buildings}</p>
                  <p className="text-[10px] text-foreground-400">Bldgs</p>
                </div>
                <div className="bg-background-100 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-foreground-900">{s.desk_count}</p>
                  <p className="text-[10px] text-foreground-400">Desks</p>
                </div>
                <div className="bg-background-100 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-accent-600">{s.active_checkins}</p>
                  <p className="text-[10px] text-foreground-400">Checked In</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDrawer && site && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowDrawer(false)}></div>
          <div className="relative w-full max-w-md bg-background-50 h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-heading font-bold text-foreground-950">{site.name}</h2>
              <button onClick={() => setShowDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 text-foreground-500 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Site Code</p>
                <p className="text-sm text-foreground-800">{site.code}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Address</p>
                <p className="text-sm text-foreground-800">{site.address}, {site.postcode}, {site.country}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Contact</p>
                <p className="text-sm text-foreground-800">{site.contact_name}</p>
                <p className="text-xs text-foreground-500">{site.contact_email} / {site.contact_phone}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Manager</p>
                <p className="text-sm text-foreground-800">{site.manager_name}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide mb-1">Timezone</p>
                <p className="text-sm text-foreground-800">{site.timezone}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-semibold text-foreground-400 uppercase tracking-wide">Status</p>
                {statusBadge(site.status)}
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href="/dashboard/buildings" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Buildings</a>
                <a href="/dashboard/desks" className="text-center text-sm font-medium bg-background-100 hover:bg-background-200 text-foreground-700 py-2 px-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap">View Desks</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-background-50 rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-bold text-foreground-950">Add New Site</h2>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Site Name *</label>
                <input value={newSite.name} onChange={e => setNewSite({ ...newSite, name: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" placeholder="e.g. London HQ" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Site Code *</label>
                <input value={newSite.code} onChange={e => setNewSite({ ...newSite, code: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" placeholder="e.g. LON-HQ" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Address</label>
                <input value={newSite.address} onChange={e => setNewSite({ ...newSite, address: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" placeholder="Street address" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 mb-1">Postcode</label>
                  <input value={newSite.postcode} onChange={e => setNewSite({ ...newSite, postcode: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 mb-1">Country</label>
                  <select value={newSite.country} onChange={e => setNewSite({ ...newSite, country: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                    {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Timezone</label>
                <select value={newSite.timezone} onChange={e => setNewSite({ ...newSite, timezone: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {['Europe/London', 'Europe/Paris', 'America/New_York'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 mb-1">Contact Name</label>
                  <input value={newSite.contact_name} onChange={e => setNewSite({ ...newSite, contact_name: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 mb-1">Contact Email</label>
                  <input value={newSite.contact_email} onChange={e => setNewSite({ ...newSite, contact_email: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground-500 mb-1">Contact Phone</label>
                  <input value={newSite.contact_phone} onChange={e => setNewSite({ ...newSite, contact_phone: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleAddSite} className="flex-1 bg-primary-500 text-background-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Create Site</button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 bg-background-100 text-foreground-600 py-2.5 rounded-lg text-sm font-medium hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}