import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockFloorplans, mockDeskPositions, floorplanLiveStats } from '@/mocks/floorplanData';
import { mockDesks, mockFloors } from '@/mocks/workspaceData';
import type { FC } from 'react';

interface SidePanelData {
  deskName: string;
  deskCode: string;
  status: string;
  currentUser: string | null;
  checkInTime: string | null;
  areaName: string;
  type: string;
  equipmentNotes: string;
  hasIssue: boolean;
  deskId: string;
}

const LiveFloorplanPage: FC = () => {
  const navigate = useNavigate();
  const { floorplanId } = useParams<{ floorplanId: string }>();
  const floorplan = mockFloorplans.find(fp => fp.id === floorplanId);
  const stats = floorplanLiveStats[floorplanId as keyof typeof floorplanLiveStats];
  const positions = mockDeskPositions[floorplanId || ''] || [];

  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<SidePanelData | null>(null);
  const [anonymousMode, setAnonymousMode] = useState(true);

  const deskStatusColor = (status: string): string => {
    switch (status) {
      case 'occupied': return 'bg-amber-100 border-amber-400 text-amber-900';
      case 'available': return 'bg-emerald-100 border-emerald-400 text-emerald-900';
      case 'booked': return 'bg-sky-100 border-sky-400 text-sky-900';
      case 'maintenance': return 'bg-rose-100 border-rose-300 text-rose-800';
      default: return 'bg-foreground-100 border-foreground-300 text-foreground-600';
    }
  };

  const deskStatusDot = (status: string): string => {
    switch (status) {
      case 'occupied': return 'bg-amber-500';
      case 'available': return 'bg-emerald-500';
      case 'booked': return 'bg-sky-500';
      case 'maintenance': return 'bg-rose-400';
      default: return 'bg-foreground-400';
    }
  };

  const filteredPositions = useMemo(() => {
    if (statusFilter.length === 0) return positions;
    return positions.filter(p => {
      const desk = mockDesks.find(d => d.id === p.desk_id);
      return desk && statusFilter.includes(desk.status);
    });
  }, [positions, statusFilter]);

  const toggleStatus = (s: string) => {
    setStatusFilter(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleDeskClick = (pos: typeof positions[0]) => {
    const desk = mockDesks.find(d => d.id === pos.desk_id);
    const checkIn = desk?.last_checkin;
    setSelectedDesk({
      deskName: pos.desk_name,
      deskCode: pos.desk_code,
      status: desk?.status || 'unknown',
      currentUser: anonymousMode ? null : (desk?.current_user || null),
      checkInTime: checkIn || null,
      areaName: pos.area_name,
      type: pos.desk_type,
      equipmentNotes: 'Standard equipment',
      hasIssue: desk?.status === 'maintenance',
      deskId: pos.desk_id,
    });
  };

  if (!floorplan) {
    return (
      <div className="p-6 text-center py-20">
        <i className="ri-map-pin-line text-5xl text-foreground-300 block mb-4"></i>
        <h2 className="text-xl font-semibold text-foreground-800">Floorplan Not Found</h2>
        <button onClick={() => navigate('/dashboard/floorplans')} className="mt-4 px-4 py-2 bg-primary-500 text-background-50 rounded-lg text-sm cursor-pointer">Back to Floorplans</button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Left — Legend + Filters */}
      <div className="w-56 shrink-0 border-r border-background-200 bg-background-50 p-4 flex flex-col overflow-y-auto">
        <button onClick={() => navigate('/dashboard/floorplans')} className="text-xs text-foreground-500 hover:text-foreground-700 cursor-pointer flex items-center gap-1 mb-4">
          <i className="ri-arrow-left-line"></i> Back
        </button>

        <h2 className="text-sm font-semibold text-foreground-900 mb-1">{floorplan.name}</h2>
        <p className="text-xs text-foreground-500 mb-5">{floorplan.floor_name} — {floorplan.building_name}</p>

        {stats && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className="bg-emerald-50 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-emerald-700">{stats.available_desks}</p>
              <p className="text-[10px] text-foreground-500">Available</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-amber-700">{stats.occupied_desks}</p>
              <p className="text-[10px] text-foreground-500">Occupied</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-rose-700">{stats.maintenance_desks}</p>
              <p className="text-[10px] text-foreground-500">Maint.</p>
            </div>
            <div className="bg-foreground-100 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-foreground-600">{stats.total_desks}</p>
              <p className="text-[10px] text-foreground-500">Total</p>
            </div>
          </div>
        )}

        <div className="mb-5">
          <h4 className="text-[11px] font-semibold text-foreground-600 uppercase tracking-wide mb-2">Status Legend</h4>
          <div className="space-y-1.5">
            {[
              { status: 'available', label: 'Available', dot: 'bg-emerald-500' },
              { status: 'occupied', label: 'Occupied', dot: 'bg-amber-500' },
              { status: 'booked', label: 'Booked', dot: 'bg-sky-500' },
              { status: 'maintenance', label: 'Maintenance', dot: 'bg-rose-400' },
              { status: 'inactive', label: 'Inactive', dot: 'bg-foreground-400' },
            ].map(item => (
              <label key={item.status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={statusFilter.includes(item.status)}
                  onChange={() => toggleStatus(item.status)}
                  className="w-3.5 h-3.5 accent-primary-500 cursor-pointer"
                />
                <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                <span className="text-xs text-foreground-700">{item.label}</span>
              </label>
            ))}
          </div>
          <p className="text-[10px] text-foreground-400 mt-2">Filter: show/hide statuses</p>
        </div>

        <label className="flex items-center justify-between cursor-pointer mb-3">
          <span className="text-xs text-foreground-700">Anonymous Mode</span>
          <input type="checkbox" checked={anonymousMode} onChange={e => { setAnonymousMode(e.target.checked); setSelectedDesk(null); }} className="w-4 h-4 accent-primary-500 cursor-pointer" />
        </label>

        <div className="mt-auto">
          <button className="w-full px-3 py-2 border border-background-200 rounded-lg text-xs text-foreground-500 cursor-pointer hover:bg-background-100 transition-colors flex items-center justify-center gap-1">
            <i className="ri-refresh-line"></i> Refresh
          </button>
          <p className="text-[10px] text-foreground-400 text-center mt-2">Supabase Realtime placeholder</p>
        </div>
      </div>

      {/* Centre — Floorplan Canvas */}
      <div className="flex-1 bg-background-100 overflow-auto p-6 flex items-start justify-center">
        <div className="relative bg-white border border-background-300 shadow-sm" style={{ width: 960, height: 640 }}>
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20office%20floorplan%20layout%20with%20visible%20desk%20positions%20and%20walkways%2C%20top-down%20architectural%20view%2C%20clean%20minimal%20technical%20drawing%20style%20with%20light%20grey%20walls%20and%20warm%20wood%20floor%20texture%2C%20professional%20workspace%20design%20with%20open%20plan%20layout%20and%20natural%20light%20from%20windows&width=960&height=640&seq=floorplan-live-kwh-gf&orientation=landscape"
            alt="Floorplan"
            className="w-full h-full object-cover"
            draggable={false}
          />

          {filteredPositions.map(pos => {
            const desk = mockDesks.find(d => d.id === pos.desk_id);
            const status = desk?.status || 'unknown';
            const classes = status === 'occupied' ? 'bg-amber-100/90 border-amber-400' : status === 'available' ? 'bg-emerald-100/90 border-emerald-400' : status === 'maintenance' ? 'bg-rose-100/90 border-rose-300' : 'bg-foreground-100/90 border-foreground-300';

            return (
              <div
                key={pos.id}
                onClick={() => handleDeskClick(pos)}
                className={`absolute rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-md ${classes} ${selectedDesk?.deskCode === pos.desk_code ? 'ring-2 ring-primary-400 shadow-md' : ''}`}
                style={{ left: pos.x_position, top: pos.y_position, width: pos.width, height: pos.height, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                title={pos.desk_name}
              >
                <span className="text-[10px] font-semibold text-foreground-800">{pos.desk_name}</span>
                <span className={`w-2 h-2 rounded-full mt-0.5 ${deskStatusDot(status)}`}></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right — Side Panel */}
      <div className={`${selectedDesk ? 'w-72' : 'w-0'} shrink-0 border-l border-background-200 bg-background-50 transition-all duration-200 overflow-hidden`}>
        {selectedDesk && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground-900">{selectedDesk.deskName}</h3>
              <button onClick={() => setSelectedDesk(null)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-background-100 text-foreground-400 cursor-pointer">
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${selectedDesk.status === 'occupied' ? 'bg-amber-100 text-amber-800' : selectedDesk.status === 'available' ? 'bg-emerald-100 text-emerald-800' : selectedDesk.status === 'maintenance' ? 'bg-rose-100 text-rose-700' : 'bg-foreground-100 text-foreground-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${deskStatusDot(selectedDesk.status)}`}></span>
                  {selectedDesk.status}
                </span>
              </div>

              <div>
                <label className="text-[11px] font-medium text-foreground-500 block">Current User</label>
                <p className="text-sm text-foreground-900 mt-0.5">
                  {selectedDesk.status === 'occupied'
                    ? (anonymousMode ? 'Occupied — user hidden by privacy settings' : (selectedDesk.currentUser || 'Unknown'))
                    : 'None'}
                </p>
              </div>

              {selectedDesk.checkInTime && (
                <div>
                  <label className="text-[11px] font-medium text-foreground-500 block">Check-in Time</label>
                  <p className="text-sm text-foreground-700 mt-0.5">{new Date(selectedDesk.checkInTime).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-foreground-500 block">Area</label>
                  <p className="text-xs text-foreground-700 mt-0.5">{selectedDesk.areaName}</p>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-foreground-500 block">Type</label>
                  <p className="text-xs text-foreground-700 mt-0.5">{selectedDesk.type}</p>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-foreground-500 block">Equipment</label>
                <p className="text-xs text-foreground-700 mt-0.5">{selectedDesk.equipmentNotes}</p>
              </div>

              {selectedDesk.hasIssue && (
                <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700 flex items-start gap-1.5">
                  <i className="ri-error-warning-line mt-0.5"></i>
                  <span>This desk has an open maintenance issue.</span>
                </div>
              )}

              <hr className="border-background-200" />

              <div className="space-y-2">
                {selectedDesk.status === 'occupied' && (
                  <button className="w-full px-3 py-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium whitespace-nowrap cursor-pointer hover:bg-rose-100 transition-colors">
                    <i className="ri-logout-box-line mr-1"></i> Manual Check-Out
                  </button>
                )}
                <button className="w-full px-3 py-2 border border-amber-200 rounded-lg text-xs text-amber-700 whitespace-nowrap cursor-pointer hover:bg-amber-50 transition-colors">
                  <i className="ri-tools-line mr-1"></i> Mark Maintenance
                </button>
                <button className="w-full px-3 py-2 border border-background-200 rounded-lg text-xs text-foreground-600 whitespace-nowrap cursor-pointer hover:bg-background-100 transition-colors">
                  <i className="ri-alert-line mr-1"></i> Report Issue
                </button>
                <button onClick={() => navigate('/dashboard/desks')} className="w-full px-3 py-2 border border-background-200 rounded-lg text-xs text-foreground-600 whitespace-nowrap cursor-pointer hover:bg-background-100 transition-colors">
                  <i className="ri-external-link-line mr-1"></i> Open Desk Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveFloorplanPage;