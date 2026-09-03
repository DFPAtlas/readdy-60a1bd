import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockFloorplans, mockDeskPositions } from '@/mocks/floorplanData';
import { mockDesks, mockSites, mockFloors } from '@/mocks/workspaceData';
import type { FC } from 'react';

const StaffFindDeskMapPage: FC = () => {
  const navigate = useNavigate();
  const [selectedSiteId, setSelectedSiteId] = useState('site_001');
  const [selectedFloorId, setSelectedFloorId] = useState('flr_001');
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [selectedDesk, setSelectedDesk] = useState<{ name: string; code: string; type: string; areaName: string; status: string } | null>(null);

  const activeSites = useMemo(() => mockSites.filter(s => s.status === 'active'), []);

  const siteFloors = useMemo(() => {
    return mockFloors.filter(f => f.site_id === selectedSiteId && f.status === 'active');
  }, [selectedSiteId]);

  const floorFloorplans = useMemo(() => {
    return mockFloorplans.filter(fp =>
      fp.site_id === selectedSiteId &&
      fp.floor_id === selectedFloorId &&
      fp.status === 'active' &&
      (fp.view_permission === 'staff_can_view' || fp.view_permission === 'staff_available_only')
    );
  }, [selectedSiteId, selectedFloorId]);

  const currentFloorplan = floorFloorplans[0] || null;

  const positions = useMemo(() => {
    if (!currentFloorplan) return [];
    return (mockDeskPositions[currentFloorplan.id] || []).filter(p => p.staff_visible);
  }, [currentFloorplan]);

  const availableDesks = useMemo(() => {
    return positions.filter(p => {
      const desk = mockDesks.find(d => d.id === p.desk_id);
      return desk?.status === 'available';
    });
  }, [positions]);

  const displayPositions = showAvailableOnly ? availableDesks : positions;

  const deskStatusDot = (status: string): string => {
    switch (status) {
      case 'occupied': return 'bg-amber-500';
      case 'available': return 'bg-emerald-500';
      case 'maintenance': return 'bg-rose-400';
      default: return 'bg-foreground-400';
    }
  };

  const handleDeskClick = (pos: typeof positions[0]) => {
    const desk = mockDesks.find(d => d.id === pos.desk_id);
    setSelectedDesk({
      name: pos.desk_name,
      code: pos.desk_code,
      type: pos.desk_type,
      areaName: pos.area_name,
      status: desk?.status || 'unknown',
    });
  };

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-background-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/staff/find-desk')} className="text-sm text-foreground-500 cursor-pointer">
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-base font-semibold text-foreground-900">Find Desk — Map View</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-background-200 px-4 py-2.5 flex flex-wrap items-center gap-2">
        <select value={selectedSiteId} onChange={e => { setSelectedSiteId(e.target.value); setSelectedFloorId(''); }} className="px-3 py-1.5 bg-white border border-background-200 rounded-lg text-xs text-foreground-700 focus:outline-none cursor-pointer">
          {activeSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        {siteFloors.length > 1 && (
          <select value={selectedFloorId} onChange={e => setSelectedFloorId(e.target.value)} className="px-3 py-1.5 bg-white border border-background-200 rounded-lg text-xs text-foreground-700 focus:outline-none cursor-pointer">
            {siteFloors.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        )}
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={showAvailableOnly} onChange={e => setShowAvailableOnly(e.target.checked)} className="w-3.5 h-3.5 accent-primary-500 cursor-pointer" />
          <span className="text-xs text-foreground-600">Available only</span>
        </label>
        <span className="text-xs text-foreground-400 ml-auto">
          {availableDesks.length} available of {positions.length} desks
        </span>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-4 overflow-auto flex items-start justify-center">
        {currentFloorplan ? (
          <div className="relative bg-white border border-background-300 rounded-xl shadow-sm overflow-hidden" style={{ width: '100%', maxWidth: 960, aspectRatio: '960/640' }}>
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20office%20floorplan%20with%20highlighted%20desk%20positions%2C%20top-down%20view%2C%20clean%20architectural%20drawing%20style%2C%20warm%20wood%20floor%20and%20light%20grey%20walls%2C%20bright%20natural%20lighting%2C%20professional%20workspace%20layout&width=960&height=640&seq=floorplan-find-desk-map&orientation=landscape"
              alt="Floorplan"
              className="w-full h-full object-cover"
              draggable={false}
            />
            {displayPositions.map(pos => {
              return (
                <div
                  key={pos.id}
                  onClick={() => handleDeskClick(pos)}
                  className={`absolute rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-md bg-emerald-100/90 border-emerald-400 ${selectedDesk?.code === pos.desk_code ? 'ring-2 ring-primary-400 shadow-md' : ''}`}
                  style={{
                    left: `${(pos.x_position / 960) * 100}%`,
                    top: `${(pos.y_position / 640) * 100}%`,
                    width: `${(pos.width / 960) * 100}%`,
                    height: `${(pos.height / 640) * 100}%`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span className="text-[9px] font-semibold text-emerald-900">{pos.desk_name}</span>
                  <span className="text-[7px] text-emerald-700 font-medium">Free</span>
                </div>
              );
            })}
            {displayPositions.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-background-50/60">
                <div className="text-center">
                  <i className="ri-emotion-sad-line text-3xl text-foreground-400 block mb-2"></i>
                  <p className="text-sm text-foreground-500">No available desks on this floor</p>
                </div>
              </div>
            )}
            {/* Unavailable desk outlines if showing all */}
            {!showAvailableOnly && positions.filter(p => {
              const desk = mockDesks.find(d => d.id === p.desk_id);
              return desk?.status !== 'available';
            }).map(pos => {
              const desk = mockDesks.find(d => d.id === pos.desk_id);
              const status = desk?.status || 'unknown';
              return (
                <div
                  key={pos.id}
                  className="absolute rounded-lg border border-foreground-200 bg-foreground-100/60 cursor-not-allowed"
                  style={{
                    left: `${(pos.x_position / 960) * 100}%`,
                    top: `${(pos.y_position / 640) * 100}%`,
                    width: `${(pos.width / 960) * 100}%`,
                    height: `${(pos.height / 640) * 100}%`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span className="text-[8px] text-foreground-400">{pos.desk_name}</span>
                  <span className={`w-1 h-1 rounded-full mt-0.5 ${deskStatusDot(status)}`}></span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground-400">
            <i className="ri-map-pin-line text-3xl block mb-2"></i>
            <p className="text-sm">No floorplan map available for this floor.</p>
            <button onClick={() => navigate('/staff/find-desk')} className="mt-3 text-sm text-primary-500 cursor-pointer hover:text-primary-600">Go to list view</button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-background-200 px-4 py-2 flex items-center gap-4 text-xs text-foreground-600 shrink-0 justify-center">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-400 border border-emerald-400"></span> Available</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Occupied</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-foreground-300"></span> Unavailable</span>
      </div>

      {/* Desk Detail Panel */}
      {selectedDesk && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-background-200 rounded-t-2xl shadow-lg p-5 max-w-lg mx-auto z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground-900">{selectedDesk.name}</h3>
            <button onClick={() => setSelectedDesk(null)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-background-100 text-foreground-400 cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-foreground-600">
              <span className="flex items-center gap-1"><i className="ri-building-line"></i> {selectedDesk.areaName}</span>
              <span className="flex items-center gap-1"><i className="ri-computer-line"></i> {selectedDesk.type}</span>
            </div>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${selectedDesk.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-foreground-100 text-foreground-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${deskStatusDot(selectedDesk.status)}`}></span>
              {selectedDesk.status === 'available' ? 'Available — check in now' : 'Currently unavailable'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              disabled={selectedDesk.status !== 'available'}
              onClick={() => navigate(`/staff/check-in?desk=${selectedDesk.code}`)}
              className="flex-1 px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer hover:bg-primary-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <i className="ri-qr-scan-line mr-1"></i> Check In
            </button>
            <button onClick={() => navigate(`/staff/issues?desk=${selectedDesk.code}`)} className="px-4 py-2.5 border border-background-200 rounded-lg text-sm text-foreground-600 whitespace-nowrap cursor-pointer hover:bg-background-100 transition-colors">
              <i className="ri-alert-line mr-1"></i> Report Issue
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className="bg-white border-t border-background-200 px-2 py-2 flex items-center justify-around shrink-0 md:hidden">
        {[
          { icon: 'ri-home-line', label: 'Home', path: '/staff' },
          { icon: 'ri-qr-scan-line', label: 'Scan', path: '/staff/check-in' },
          { icon: 'ri-search-line', label: 'Find Desk', path: '/staff/find-desk' },
          { icon: 'ri-map-pin-line', label: 'Map', path: '/staff/find-desk-map', active: true },
          { icon: 'ri-alert-line', label: 'Issues', path: '/staff/issues' },
        ].map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg cursor-pointer transition-colors ${item.active ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'}`}>
            <i className={`${item.icon} text-lg`}></i>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffFindDeskMapPage;