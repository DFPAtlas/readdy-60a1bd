import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockFloorplans, floorplanStatuses } from '@/mocks/floorplanData';
import { checkFloorplanEntitlement } from '@/services/floorplanService';
import type { FC } from 'react';

const FloorplansPage: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [siteFilter, setSiteFilter] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');
  const [floorFilter, setFloorFilter] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [entitlementMsg, setEntitlementMsg] = useState<string | null>(null);

  const sites = useMemo(() => [...new Set(mockFloorplans.map(fp => fp.site_name))], []);
  const buildings = useMemo(() => [...new Set(mockFloorplans.map(fp => fp.building_name))], []);
  const floors = useMemo(() => [...new Set(mockFloorplans.map(fp => fp.floor_name))], []);

  const filteredFloorplans = useMemo(() => {
    return mockFloorplans.filter(fp => {
      if (search && !fp.name.toLowerCase().includes(search.toLowerCase()) && !fp.floor_name.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && fp.status !== statusFilter) return false;
      if (siteFilter && fp.site_name !== siteFilter) return false;
      if (buildingFilter && fp.building_name !== buildingFilter) return false;
      if (floorFilter && fp.floor_name !== floorFilter) return false;
      return true;
    });
  }, [search, statusFilter, siteFilter, buildingFilter, floorFilter]);

  const handleNewFloorplan = async () => {
    const result = await checkFloorplanEntitlement('professional');
    if (!result.allowed) {
      setEntitlementMsg(result.message);
      return;
    }
    navigate('/dashboard/floorplans/new');
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-800',
      draft: 'bg-amber-100 text-amber-800',
      inactive: 'bg-foreground-100 text-foreground-600',
      archived: 'bg-rose-100 text-rose-700',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colors[status] || 'bg-foreground-100 text-foreground-600'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const permLabel = (permission: string) => {
    const map: Record<string, string> = { admin_only: 'Admin only', managers_only: 'Managers only', staff_can_view: 'Staff can view', staff_available_only: 'Available only' };
    return map[permission] || permission;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground-950 font-sans">Floorplans</h1>
          <p className="text-foreground-600 text-sm mt-1">Upload and manage workspace floorplans with desk mapping.</p>
        </div>
        <button onClick={handleNewFloorplan} className="px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-primary-600 transition-colors cursor-pointer flex items-center gap-2">
          <i className="ri-add-line"></i>
          Upload Floorplan
        </button>
      </div>

      {entitlementMsg && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 flex items-start gap-2">
          <i className="ri-alert-line mt-0.5 flex-shrink-0"></i>
          <span>{entitlementMsg} <button onClick={() => setEntitlementMsg(null)} className="underline ml-1 cursor-pointer">Dismiss</button></span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search floorplans..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 transition-colors"
          />
        </div>
        <select value={siteFilter} onChange={e => setSiteFilter(e.target.value)} className="px-3 py-2 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer">
          <option value="">All Sites</option>
          {sites.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={buildingFilter} onChange={e => setBuildingFilter(e.target.value)} className="px-3 py-2 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer">
          <option value="">All Buildings</option>
          {buildings.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={floorFilter} onChange={e => setFloorFilter(e.target.value)} className="px-3 py-2 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer">
          <option value="">All Floors</option>
          {floors.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-background-50 border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer">
          <option value="">All Statuses</option>
          {floorplanStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <div className="flex bg-background-100 rounded-lg p-0.5">
          <button onClick={() => setViewMode('table')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${viewMode === 'table' ? 'bg-background-50 text-foreground-900 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
            <i className="ri-list-check mr-1"></i>Table
          </button>
          <button onClick={() => setViewMode('cards')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${viewMode === 'cards' ? 'bg-background-50 text-foreground-900 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
            <i className="ri-layout-grid-line mr-1"></i>Cards
          </button>
        </div>
      </div>

      {filteredFloorplans.length === 0 ? (
        <div className="text-center py-16 text-foreground-500">
          <i className="ri-map-line text-4xl block mb-3"></i>
          <p className="text-sm">No floorplans found matching your filters.</p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-background-200">
          <table className="w-full text-sm">
            <thead className="bg-background-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Floorplan</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Building</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Floor</th>
                <th className="text-center px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Placed Desks</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">View Permission</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Last Updated</th>
                <th className="text-right px-4 py-3 font-medium text-foreground-600 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-background-200">
              {filteredFloorplans.map(fp => (
                <tr key={fp.id} className="hover:bg-background-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground-900 whitespace-nowrap">{fp.name}</span>
                    <p className="text-xs text-foreground-500 mt-0.5">{fp.file_name}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground-700 whitespace-nowrap">{fp.site_name}</td>
                  <td className="px-4 py-3 text-foreground-700 whitespace-nowrap">{fp.building_name}</td>
                  <td className="px-4 py-3 text-foreground-700 whitespace-nowrap">{fp.floor_name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${fp.placed_desks > 0 ? 'text-primary-600' : 'text-foreground-400'}`}>{fp.placed_desks}</span>
                  </td>
                  <td className="px-4 py-3 text-foreground-600 text-xs whitespace-nowrap">{permLabel(fp.view_permission)}</td>
                  <td className="px-4 py-3">{statusBadge(fp.status)}</td>
                  <td className="px-4 py-3 text-foreground-600 text-xs whitespace-nowrap">{new Date(fp.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => navigate(`/dashboard/floorplans/${fp.id}`)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-background-100 text-foreground-500 hover:text-foreground-800 transition-colors cursor-pointer" title="View Floorplan">
                        <i className="ri-eye-line text-sm"></i>
                      </button>
                      <button onClick={() => navigate(`/dashboard/floorplans/${fp.id}/editor`)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary-50 text-foreground-500 hover:text-primary-600 transition-colors cursor-pointer" title="Edit Map">
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <button onClick={() => navigate(`/dashboard/floorplans/${fp.id}/live`)} className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent-50 text-foreground-500 hover:text-accent-600 transition-colors cursor-pointer" title="Live View">
                        <i className="ri-live-line text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFloorplans.map(fp => (
            <div key={fp.id} className="bg-background-50 border border-background-200 rounded-xl p-5 hover:border-background-300 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/floorplans/${fp.id}`)}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <i className="ri-map-pin-line text-amber-600 text-lg"></i>
                </div>
                {statusBadge(fp.status)}
              </div>
              <h3 className="font-semibold text-foreground-900 mb-1">{fp.name}</h3>
              <p className="text-xs text-foreground-500 mb-3">{fp.site_name} — {fp.building_name} — {fp.floor_name}</p>
              <div className="flex items-center gap-4 text-xs text-foreground-600">
                <span className="flex items-center gap-1"><i className="ri-computer-line"></i> {fp.placed_desks} desks</span>
                <span className="flex items-center gap-1"><i className="ri-eye-line"></i> {permLabel(fp.view_permission)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloorplansPage;