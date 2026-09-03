import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockFloorplans, mockDeskPositions } from '@/mocks/floorplanData';
import { mockDesks, mockSites } from '@/mocks/workspaceData';
import type { FC } from 'react';

const StaffFloorplanPage: FC = () => {
  const navigate = useNavigate();
  const [selectedSiteId, setSelectedSiteId] = useState('site_001');
  const [selectedFloorId, setSelectedFloorId] = useState('flr_001');
  const [selectedDesk, setSelectedDesk] = useState<{ name: string; code: string; type: string; areaName: string; status: string; equipmentNotes: string } | null>(null);

  const activeSites = useMemo(() => mockSites.filter(s => s.status === 'active'), []);

  const viewableFloorplans = useMemo(() => {
    return mockFloorplans.filter(fp =>
      fp.site_id === selectedSiteId &&
      fp.status === 'active' &&
      (fp.view_permission === 'staff_can_view' || fp.view_permission === 'staff_available_only')
    );
  }, [selectedSiteId]);

  const currentFloorplan = useMemo(() => {
    return viewableFloorplans.find(fp => fp.floor_id === selectedFloorId) || viewableFloorplans[0] || null;
  }, [viewableFloorplans, selectedFloorId]);

  const positions = useMemo(() => {
    if (!currentFloorplan) return [];
    return (mockDeskPositions[currentFloorplan.id] || []).filter(p => p.staff_visible);
  }, [currentFloorplan]);

  const isAvailableOnly = currentFloorplan?.view_permission === 'staff_available_only';

  const visiblePositions = useMemo(() => {
    if (isAvailableOnly) {
      return positions.filter(p => {
        const desk = mockDesks.find(d => d.id === p.desk_id);
        return desk?.status === 'available';
      });
    }
    return positions;
  }, [positions, isAvailableOnly]);

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
      equipmentNotes: desk?.type === 'standing desk' ? 'Standing desk, anti-fatigue mat' : desk?.type === 'dual monitor desk' ? 'Dual 27" monitors, dock' : 'Standard desk setup',
    });
  };

  if (viewableFloorplans.length === 0) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-foreground-100 flex items-center justify-center">
            <i className="ri-map-pin-line text-2xl text-foreground-400"></i>
          </div>
          <h2 className="text-lg font-semibold text-foreground-900 mb-2">Floorplan Not Available</h2>
          <p className="text-sm text-foreground-500 mb-4">Floorplan view is not enabled for your workplace. Use the desk list to find an available desk.</p>
          <button onClick={() => navigate('/staff/find-desk')} className="px-4 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
            Find a Desk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-background-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/staff')} className="text-sm text-foreground-500 cursor-pointer">
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="text-base font-semibold text-foreground-900">Floorplan View</h1>
        </div>
        <select value={selectedSiteId} onChange={e => { setSelectedSiteId(e.target.value); setSelectedFloorId(''); }} className="px-3 py-1.5 bg-white border border-background-200 rounded-lg text-xs text-foreground-700 focus:outline-none cursor-pointer">
          {activeSites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* Floor Selector */}
      {viewableFloorplans.length > 1 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          {viewableFloorplans.map(fp => (
            <button
              key={fp.id}
              onClick={() => setSelectedFloorId(fp.floor_id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${currentFloorplan?.id === fp.id ? 'bg-primary-500 text-background-50' : 'bg-white border border-background-200 text-foreground-600 hover:bg-background-100'}`}
            >
              {fp.floor_name}
            </button>
          ))}
        </div>
      )}

      {/* Canvas */}
      <div className="flex-1 p-4 overflow-auto flex items-start justify-center">
        {currentFloorplan ? (
          <div className="relative bg-white border border-background-300 rounded-xl shadow-sm overflow-hidden" style={{ width: '100%', maxWidth: 960, aspectRatio: '960/640' }}>
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20office%20floorplan%20layout%20with%20desk%20positions%2C%20top-down%20architectural%20view%2C%20clean%20minimal%20technical%20drawing%20style%20with%20warm%20wood%20tones%2C%20well%20lit%20workspace%20with%20open%20plan%20and%20natural%20light%2C%20professional%20corporate%20interior&width=960&height=640&seq=floorplan-staff-view&orientation=landscape"
              alt="Floorplan"
              className="w-full h-full object-cover"
              draggable={false}
            />
            {visiblePositions.map(pos => {
              const desk = mockDesks.find(d => d.id === pos.desk_id);
              const status = desk?.status || 'unknown';
              const bg = status === 'available' ? 'bg-emerald-100/90 border-emerald-400' : status === 'maintenance' ? 'bg-foreground-100/80 border-foreground-300' : 'bg-foreground-100/60 border-foreground-200';

              return (
                <div
                  key={pos.id}
                  onClick={() => handleDeskClick(pos)}
                  className={`absolute rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-md ${bg} ${selectedDesk?.code === pos.desk_code ? 'ring-2 ring-primary-400' : ''}`}
                  style={{
                    left: `${(pos.x_position / 960) * 100}%`,
                    top: `${(pos.y_position / 640) * 100}%`,
                    width: `${(pos.width / 960) * 100}%`,
                    height: `${(pos.height / 640) * 100}%`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <span className="text-[9px] font-semibold text-foreground-800">{pos.desk_name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${deskStatusDot(status)}`}></span>
                  {status === 'available' && (
                    <span className="text-[7px] text-emerald-700 font-medium mt-0.5">Free</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-foreground-400 py-20">
            <i className="ri-map-pin-line text-3xl block mb-2"></i>
            <p className="text-sm">No floorplan available for this floor.</p>
          </div>
        )}
      </div>

      {/* Desk Detail Panel */}
      {selectedDesk && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-background-200 rounded-t-2xl shadow-lg p-5 max-w-lg mx-auto">
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
            <p className="text-xs text-foreground-500">{selectedDesk.equipmentNotes}</p>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${selectedDesk.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-foreground-100 text-foreground-600'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${deskStatusDot(selectedDesk.status)}`}></span>
              {selectedDesk.status === 'available' ? 'Available' : 'Unavailable'}
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
          { icon: 'ri-map-pin-line', label: 'Map', path: '/staff/floorplan', active: true },
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

export default StaffFloorplanPage;