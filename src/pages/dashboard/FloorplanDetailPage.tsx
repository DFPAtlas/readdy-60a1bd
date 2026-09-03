import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockFloorplans, floorplanLiveStats } from '@/mocks/floorplanData';
import { mockDeskPositions } from '@/mocks/floorplanData';
import type { FC } from 'react';

const FloorplanDetailPage: FC = () => {
  const navigate = useNavigate();
  const { floorplanId } = useParams<{ floorplanId: string }>();
  const floorplan = mockFloorplans.find(fp => fp.id === floorplanId);
  const stats = floorplanLiveStats[floorplanId as keyof typeof floorplanLiveStats];
  const positions = mockDeskPositions[floorplanId || ''] || [];

  const [showArchive, setShowArchive] = useState(false);

  if (!floorplan) {
    return (
      <div className="p-6 text-center py-20">
        <i className="ri-map-pin-line text-5xl text-foreground-300 block mb-4"></i>
        <h2 className="text-xl font-semibold text-foreground-800 mb-2">Floorplan Not Found</h2>
        <p className="text-foreground-500 text-sm mb-4">This floorplan may have been archived or deleted.</p>
        <button onClick={() => navigate('/dashboard/floorplans')} className="px-4 py-2 bg-primary-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer">Back to Floorplans</button>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-800',
      draft: 'bg-amber-100 text-amber-800',
      inactive: 'bg-foreground-100 text-foreground-600',
      archived: 'bg-rose-100 text-rose-700',
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colors[status] || 'bg-foreground-100 text-foreground-600'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate('/dashboard/floorplans')} className="text-sm text-foreground-500 hover:text-foreground-700 flex items-center gap-1 cursor-pointer mb-4">
        <i className="ri-arrow-left-line"></i> Back to Floorplans
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-semibold text-foreground-950 font-sans">{floorplan.name}</h1>
            {statusBadge(floorplan.status)}
          </div>
          <p className="text-foreground-500 text-sm">{floorplan.site_name} · {floorplan.building_name} · {floorplan.floor_name}</p>
          {floorplan.description && <p className="text-foreground-600 text-sm mt-1.5">{floorplan.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/dashboard/floorplans/${floorplan.id}/editor`)} className="px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer hover:bg-primary-600 transition-colors flex items-center gap-2">
            <i className="ri-edit-line"></i> Open Editor
          </button>
          <button onClick={() => navigate(`/dashboard/floorplans/${floorplan.id}/live`)} className="px-4 py-2.5 bg-accent-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer hover:bg-accent-600 transition-colors flex items-center gap-2">
            <i className="ri-live-line"></i> Live View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          {stats && (
            <div className="bg-background-50 border border-background-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <p className="text-2xl font-bold text-foreground-900">{stats.total_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Total Desks</p>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <p className="text-2xl font-bold text-foreground-900">{stats.placed_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Placed</p>
                </div>
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-700">{stats.available_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Available</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-700">{stats.occupied_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Occupied</p>
                </div>
                <div className="text-center p-3 bg-sky-50 rounded-lg">
                  <p className="text-2xl font-bold text-sky-700">{stats.booked_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Booked</p>
                </div>
                <div className="text-center p-3 bg-rose-50 rounded-lg">
                  <p className="text-2xl font-bold text-rose-700">{stats.maintenance_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Maintenance</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-700">{stats.desks_with_issues}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">With Issues</p>
                </div>
                <div className="text-center p-3 bg-background-100 rounded-lg">
                  <p className="text-2xl font-bold text-foreground-400">{stats.total_desks - stats.placed_desks}</p>
                  <p className="text-xs text-foreground-500 mt-0.5">Unplaced</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-background-50 border border-background-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-background-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground-800">Placed Desks ({positions.length})</h3>
            </div>
            {positions.length === 0 ? (
              <div className="p-8 text-center text-foreground-500 text-sm">
                <i className="ri-computer-line text-2xl block mb-2"></i>
                No desks placed on this floorplan yet. Open the editor to start placing desks.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-background-100">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium text-foreground-600 whitespace-nowrap">Desk</th>
                      <th className="text-left px-4 py-2.5 font-medium text-foreground-600 whitespace-nowrap">Type</th>
                      <th className="text-left px-4 py-2.5 font-medium text-foreground-600 whitespace-nowrap">Area</th>
                      <th className="text-left px-4 py-2.5 font-medium text-foreground-600 whitespace-nowrap">Status</th>
                      <th className="text-left px-4 py-2.5 font-medium text-foreground-600 whitespace-nowrap">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background-200">
                    {positions.map(p => (
                      <tr key={p.id} className="hover:bg-background-50/70">
                        <td className="px-4 py-2.5 font-medium text-foreground-900 whitespace-nowrap">{p.desk_name}</td>
                        <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{p.desk_type}</td>
                        <td className="px-4 py-2.5 text-foreground-600 text-xs whitespace-nowrap">{p.area_name}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.desk_status === 'occupied' ? 'bg-amber-100 text-amber-800' : p.desk_status === 'available' ? 'bg-emerald-100 text-emerald-800' : p.desk_status === 'maintenance' ? 'bg-rose-100 text-rose-700' : 'bg-foreground-100 text-foreground-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.desk_status === 'occupied' ? 'bg-amber-500' : p.desk_status === 'available' ? 'bg-emerald-500' : p.desk_status === 'maintenance' ? 'bg-rose-500' : 'bg-foreground-400'}`}></span>
                            {p.desk_status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-foreground-500 text-xs whitespace-nowrap">({p.x_position}, {p.y_position})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-4 space-y-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground-800 mb-3">Floorplan Info</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-foreground-500">File</dt>
                <dd className="text-foreground-800 font-medium truncate max-w-[180px]">{floorplan.file_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-500">Type</dt>
                <dd className="text-foreground-800">{floorplan.file_type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-500">Version</dt>
                <dd className="text-foreground-800">v{floorplan.version}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-500">Uploaded by</dt>
                <dd className="text-foreground-800">{floorplan.uploaded_by_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-500">Created</dt>
                <dd className="text-foreground-800">{new Date(floorplan.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-foreground-500">Last Updated</dt>
                <dd className="text-foreground-800">{new Date(floorplan.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-background-50 border border-background-200 rounded-xl p-5 space-y-3">
            <button onClick={() => navigate(`/dashboard/floorplans/${floorplan.id}/live`)} className="w-full px-4 py-2.5 bg-accent-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer hover:bg-accent-600 transition-colors flex items-center justify-center gap-2">
              <i className="ri-live-line"></i> Open Live View
            </button>
            <button className="w-full px-4 py-2.5 border border-background-300 rounded-lg text-sm text-foreground-600 whitespace-nowrap cursor-pointer hover:bg-background-100 transition-colors flex items-center justify-center gap-2">
              <i className="ri-upload-cloud-line"></i> Upload New Version
            </button>
            <button onClick={() => setShowArchive(true)} className="w-full px-4 py-2.5 border border-rose-200 rounded-lg text-sm text-rose-600 whitespace-nowrap cursor-pointer hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
              <i className="ri-archive-line"></i> Archive Floorplan
            </button>
          </div>
        </div>
      </div>

      {showArchive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-background-50 rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-foreground-900 mb-2">Archive Floorplan?</h3>
            <p className="text-sm text-foreground-600 mb-5">This floorplan will be archived and removed from active view. Desk placements will be preserved if the floorplan is restored.</p>
            <div className="flex items-center gap-3 justify-end">
              <button onClick={() => setShowArchive(false)} className="px-4 py-2 border border-background-200 rounded-lg text-sm text-foreground-600 cursor-pointer hover:bg-background-100 transition-colors">Cancel</button>
              <button onClick={() => { setShowArchive(false); navigate('/dashboard/floorplans'); }} className="px-4 py-2 bg-rose-500 text-background-50 rounded-lg text-sm font-medium cursor-pointer hover:bg-rose-600 transition-colors">Archive</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorplanDetailPage;