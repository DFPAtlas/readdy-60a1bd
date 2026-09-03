import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockFloorplans, allUnplacedDesks, mockDeskPositions } from '@/mocks/floorplanData';
import { mockDesks, mockFloors } from '@/mocks/workspaceData';
import type { FC, MouseEvent as ReactMouseEvent, DragEvent as ReactDragEvent } from 'react';

interface DeskCard {
  id: string;
  positionId: string;
  deskId: string;
  name: string;
  code: string;
  type: string;
  status: string;
  areaName: string;
  currentUser: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  showLabel: boolean;
  staffVisible: boolean;
}

const FloorplanEditorPage: FC = () => {
  const navigate = useNavigate();
  const { floorplanId } = useParams<{ floorplanId: string }>();
  const floorplan = mockFloorplans.find(fp => fp.id === floorplanId);
  const floor = floorplan ? mockFloors.find(f => f.id === floorplan.floor_id) : null;

  const savedPositions = mockDeskPositions[floorplanId || ''] || [];
  const initialCards: DeskCard[] = savedPositions.map(p => ({
    id: p.id,
    positionId: p.id,
    deskId: p.desk_id,
    name: p.desk_name,
    code: p.desk_code,
    type: p.desk_type,
    status: p.desk_status,
    areaName: p.area_name,
    currentUser: p.current_user,
    x: p.x_position,
    y: p.y_position,
    width: p.width,
    height: p.height,
    rotation: p.rotation,
    showLabel: p.show_label,
    staffVisible: p.staff_visible,
  }));

  const [deskCards, setDeskCards] = useState<DeskCard[]>(initialCards);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [leftPanelFilter, setLeftPanelFilter] = useState('');
  const [leftPanelShow, setLeftPanelShow] = useState<'unplaced' | 'placed' | 'all'>('unplaced');
  const canvasRef = useRef<HTMLDivElement>(null);

  const placedDeskIds = useMemo(() => new Set(deskCards.map(c => c.deskId)), [deskCards]);

  const unplacedDesks = useMemo(() => {
    const floorId = floorplan?.floor_id || '';
    const allForFloor = allUnplacedDesks.filter(d => d.floor_id === floorId && !placedDeskIds.has(d.id));
    let filtered = allForFloor;
    if (leftPanelFilter) {
      const q = leftPanelFilter.toLowerCase();
      filtered = filtered.filter(d => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || d.type.toLowerCase().includes(q));
    }
    return filtered;
  }, [floorplan?.floor_id, placedDeskIds, leftPanelFilter]);

  const placedDesksLeft = useMemo(() => {
    return deskCards.map(c => ({ id: c.deskId, name: c.name, code: c.code, type: c.type, areaName: c.areaName, status: c.status }));
  }, [deskCards]);

  const leftPanelItems = useMemo(() => {
    return leftPanelShow === 'placed' ? placedDesksLeft : leftPanelShow === 'all' ? [...unplacedDesks, ...placedDesksLeft.map(d => ({ ...d, tag_status: 'active' }))] : unplacedDesks;
  }, [leftPanelShow, unplacedDesks, placedDesksLeft]);

  const selectedCard = useMemo(() => deskCards.find(c => c.id === selectedCardId) || null, [deskCards, selectedCardId]);

  const handleCanvasClick = useCallback((e: ReactMouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).dataset.canvasBg === 'true') {
      setSelectedCardId(null);
    }
  }, []);

  const handleDropOnCanvas = useCallback((e: ReactDragEvent) => {
    e.preventDefault();
    const deskId = e.dataTransfer.getData('deskId');
    if (!deskId || !canvasRef.current) return;
    const existing = deskCards.find(c => c.deskId === deskId);
    if (existing) return;
    const desk = mockDesks.find(d => d.id === deskId);
    if (!desk) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = zoom / 100;
    const x = Math.round((e.clientX - rect.left) / scale);
    const y = Math.round((e.clientY - rect.top) / scale);
    const newCard: DeskCard = {
      id: `pos_${Date.now()}`,
      positionId: `pos_${Date.now()}`,
      deskId: desk.id,
      name: desk.name,
      code: desk.code,
      type: desk.type,
      status: desk.status,
      areaName: desk.area_name,
      currentUser: desk.current_user,
      x, y,
      width: 72, height: 56,
      rotation: 0,
      showLabel: true,
      staffVisible: true,
    };
    setDeskCards(prev => [...prev, newCard]);
    setSelectedCardId(newCard.id);
    setIsDirty(true);
  }, [deskCards, zoom]);

  const handleCardMouseDown = useCallback((e: ReactMouseEvent, cardId: string) => {
    e.stopPropagation();
    setSelectedCardId(cardId);
    setDraggingCard(cardId);
    const card = deskCards.find(c => c.id === cardId);
    if (card && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = zoom / 100;
      setDragOffset({ x: e.clientX - rect.left - card.x * scale, y: e.clientY - rect.top - card.y * scale });
    }
  }, [deskCards, zoom]);

  useEffect(() => {
    if (!draggingCard) return;
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const scale = zoom / 100;
      const newX = Math.round((e.clientX - rect.left - dragOffset.x) / scale);
      const newY = Math.round((e.clientY - rect.top - dragOffset.y) / scale);
      setDeskCards(prev => prev.map(c => c.id === draggingCard ? { ...c, x: Math.max(0, newX), y: Math.max(0, newY) } : c));
    };
    const handleMouseUp = () => {
      if (draggingCard) setIsDirty(true);
      setDraggingCard(null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingCard, dragOffset, zoom]);

  const handleRemoveCard = useCallback((cardId: string) => {
    setDeskCards(prev => prev.filter(c => c.id !== cardId));
    if (selectedCardId === cardId) setSelectedCardId(null);
    setIsDirty(true);
  }, [selectedCardId]);

  const handleUpdateCard = useCallback((cardId: string, updates: Partial<DeskCard>) => {
    setDeskCards(prev => prev.map(c => c.id === cardId ? { ...c, ...updates } : c));
    setIsDirty(true);
  }, []);

  const handleSave = useCallback(() => {
    setIsDirty(false);
    alert('Floorplan layout saved! (Placeholder — will connect to Supabase)');
  }, []);

  const deskStatusColor = (status: string): string => {
    switch (status) {
      case 'occupied': return 'bg-amber-100 border-amber-400 text-amber-900';
      case 'available': return 'bg-emerald-100 border-emerald-400 text-emerald-900';
      case 'booked': return 'bg-sky-100 border-sky-400 text-sky-900';
      case 'maintenance': return 'bg-rose-100 border-rose-300 text-rose-800';
      case 'inactive': return 'bg-foreground-100 border-foreground-300 text-foreground-600';
      case 'draft': return 'bg-foreground-50 border-foreground-200 text-foreground-500';
      default: return 'bg-foreground-50 border-foreground-300 text-foreground-700';
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

  if (!floorplan) {
    return (
      <div className="p-6 text-center py-20">
        <i className="ri-map-pin-line text-5xl text-foreground-300 block mb-4"></i>
        <h2 className="text-xl font-semibold text-foreground-800 mb-2">Floorplan Not Found</h2>
        <button onClick={() => navigate('/dashboard/floorplans')} className="px-4 py-2 bg-primary-500 text-background-50 rounded-lg text-sm font-medium cursor-pointer">Back to Floorplans</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-background-50 border-b border-background-200 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/floorplans')} className="text-sm text-foreground-500 hover:text-foreground-700 cursor-pointer flex items-center gap-1">
            <i className="ri-arrow-left-line"></i>
          </button>
          <span className="text-sm font-semibold text-foreground-900 whitespace-nowrap">{floorplan.name}</span>
          {isDirty && <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="px-3 py-1.5 bg-primary-500 text-background-50 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer hover:bg-primary-600 transition-colors">
            <i className="ri-check-line mr-1"></i>Save
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-100 text-foreground-500 cursor-pointer" title="Undo">
            <i className="ri-arrow-go-back-line text-sm"></i>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-100 text-foreground-500 cursor-pointer" title="Redo">
            <i className="ri-arrow-go-forward-line text-sm"></i>
          </button>
          <div className="w-px h-5 bg-background-200 mx-1"></div>
          <button onClick={() => setZoom(Math.max(25, zoom - 25))} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-100 text-foreground-500 cursor-pointer" title="Zoom Out">
            <i className="ri-zoom-out-line text-sm"></i>
          </button>
          <span className="text-xs text-foreground-600 w-10 text-center font-medium">{zoom}%</span>
          <button onClick={() => setZoom(Math.min(200, zoom + 25))} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-100 text-foreground-500 cursor-pointer" title="Zoom In">
            <i className="ri-zoom-in-line text-sm"></i>
          </button>
          <button onClick={() => setZoom(100)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-100 text-foreground-500 cursor-pointer" title="Fit to Screen">
            <i className="ri-aspect-ratio-line text-sm"></i>
          </button>
          <div className="w-px h-5 bg-background-200 mx-1"></div>
          <button onClick={() => setShowGrid(!showGrid)} className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${showGrid ? 'bg-background-200 text-foreground-800' : 'hover:bg-background-100 text-foreground-400'}`} title="Toggle Grid">
            <i className="ri-grid-line text-sm"></i>
          </button>
          <button onClick={() => setShowLabels(!showLabels)} className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${showLabels ? 'bg-background-200 text-foreground-800' : 'hover:bg-background-100 text-foreground-400'}`} title="Toggle Labels">
            <i className="ri-font-size text-sm"></i>
          </button>
          <div className="w-px h-5 bg-background-200 mx-1"></div>
          <button onClick={() => navigate(`/dashboard/floorplans/${floorplan.id}/live`)} className="px-3 py-1.5 bg-accent-500 text-background-50 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer hover:bg-accent-600 transition-colors">
            <i className="ri-eye-line mr-1"></i>Preview
          </button>
          <button onClick={() => navigate(`/dashboard/floorplans/${floorplan.id}`)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-rose-50 text-foreground-500 hover:text-rose-600 cursor-pointer" title="Exit Editor">
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Unplaced Desks */}
        <div className="w-64 shrink-0 border-r border-background-200 bg-background-50 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-background-200">
            <h4 className="text-xs font-semibold text-foreground-700 uppercase tracking-wide mb-2">Desk Palette</h4>
            <div className="relative mb-2">
              <i className="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-foreground-400 text-xs"></i>
              <input type="text" placeholder="Search desks..." value={leftPanelFilter} onChange={e => setLeftPanelFilter(e.target.value)} className="w-full pl-7 pr-2 py-1.5 bg-white border border-background-200 rounded-md text-xs text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300" />
            </div>
            <div className="flex bg-background-100 rounded-md p-0.5">
              {(['unplaced', 'placed', 'all'] as const).map(tab => (
                <button key={tab} onClick={() => setLeftPanelShow(tab)} className={`flex-1 px-2 py-1 rounded text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${leftPanelShow === tab ? 'bg-background-50 text-foreground-900 shadow-sm' : 'text-foreground-500 hover:text-foreground-700'}`}>
                  {tab === 'unplaced' ? 'Unplaced' : tab === 'placed' ? 'Placed' : 'All'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {leftPanelItems.length === 0 ? (
              <p className="text-xs text-foreground-400 text-center py-8">No desks found</p>
            ) : leftPanelItems.map(desk => (
              <div
                key={desk.id}
                draggable
                onDragStart={e => { e.dataTransfer.setData('deskId', desk.id); e.dataTransfer.effectAllowed = 'copy'; }}
                className={`p-2 rounded-md border cursor-grab active:cursor-grabbing transition-colors ${desk.status === 'occupied' ? 'border-amber-200 bg-amber-50/50 hover:bg-amber-50' : desk.status === 'available' ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50' : desk.status === 'maintenance' ? 'border-rose-200 bg-rose-50/50 hover:bg-rose-50' : 'border-background-200 bg-white hover:bg-background-50'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground-900">{desk.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${deskStatusDot(desk.status)}`}></span>
                </div>
                <p className="text-[10px] text-foreground-500 mt-0.5">{desk.type}</p>
                {'area_name' in desk && <p className="text-[10px] text-foreground-400">{desk.area_name || desk.areaName}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Centre Canvas */}
        <div className="flex-1 bg-background-100 overflow-auto relative" onDragOver={e => e.preventDefault()} onDrop={handleDropOnCanvas} onClick={handleCanvasClick}>
          <div
            ref={canvasRef}
            className="relative mx-auto my-4 bg-white border border-background-300 shadow-sm"
            style={{
              width: 960 * (zoom / 100),
              height: 640 * (zoom / 100),
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
            }}
            data-canvas-bg="true"
          >
            {/* Floorplan Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-background-50" data-canvas-bg="true">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20office%20floorplan%20layout%20with%20visible%20desk%20positions%20and%20walkways%2C%20top-down%20architectural%20view%2C%20clean%20minimal%20technical%20drawing%20style%20with%20light%20grey%20walls%20and%20warm%20wood%20floor%20texture%2C%20professional%20workspace%20design%20with%20open%20plan%20layout%20and%20natural%20light%20from%20windows&width=960&height=640&seq=floorplan-editor-kwh-gf&orientation=landscape"
                alt="Floorplan"
                className="w-full h-full object-cover"
                draggable={false}
                data-canvas-bg="true"
              />
            </div>

            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} data-canvas-bg="true"></div>
            )}

            {/* Desk Cards on Canvas */}
            {deskCards.map(card => (
              <div
                key={card.id}
                onMouseDown={e => handleCardMouseDown(e, card.id)}
                className={`absolute rounded-lg border-2 cursor-pointer transition-shadow ${selectedCardId === card.id ? 'ring-2 ring-primary-400 shadow-md z-10' : 'hover:shadow-sm z-0'} ${deskStatusColor(card.status)}`}
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.width,
                  height: card.height,
                  transform: card.rotation ? `rotate(${card.rotation}deg)` : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {showLabels && (
                  <span className="text-[10px] font-semibold leading-tight text-center truncate w-full px-1">{card.name}</span>
                )}
                <span className={`w-2 h-2 rounded-full mt-0.5 ${deskStatusDot(card.status)}`}></span>
                {card.currentUser && showLabels && (
                  <span className="text-[8px] text-foreground-500 truncate w-full px-1 text-center">{card.currentUser}</span>
                )}
              </div>
            ))}

            {/* Drop hint when no desks placed */}
            {deskCards.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-foreground-400">
                  <i className="ri-drag-drop-line text-3xl block mb-2"></i>
                  <p className="text-sm">Drag desks from the left panel onto the floorplan</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel — Properties */}
        <div className="w-72 shrink-0 border-l border-background-200 bg-background-50 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-background-200">
            <h4 className="text-xs font-semibold text-foreground-700 uppercase tracking-wide">Properties</h4>
          </div>
          {selectedCard ? (
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-medium text-foreground-500 block">Desk</label>
                <p className="text-sm font-semibold text-foreground-900">{selectedCard.name} <span className="text-xs text-foreground-500 font-normal">({selectedCard.code})</span></p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-foreground-500 block">Type</label>
                  <p className="text-xs text-foreground-700 mt-0.5">{selectedCard.type}</p>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-foreground-500 block">Status</label>
                  <span className={`inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${selectedCard.status === 'occupied' ? 'bg-amber-100 text-amber-800' : selectedCard.status === 'available' ? 'bg-emerald-100 text-emerald-800' : selectedCard.status === 'maintenance' ? 'bg-rose-100 text-rose-700' : 'bg-foreground-100 text-foreground-600'}`}>
                    <span className={`w-1 h-1 rounded-full ${deskStatusDot(selectedCard.status)}`}></span>{selectedCard.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-medium text-foreground-500 block">Area</label>
                <p className="text-xs text-foreground-700 mt-0.5">{selectedCard.areaName}</p>
              </div>
              <div>
                <label className="text-[11px] font-medium text-foreground-500 block">Current User</label>
                <p className="text-xs text-foreground-700 mt-0.5">{selectedCard.currentUser || 'None'}</p>
              </div>
              <hr className="border-background-200" />
              <div>
                <label className="text-[11px] font-medium text-foreground-500 block">Position & Size</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-foreground-400">X</span>
                    <input type="number" value={selectedCard.x} onChange={e => handleUpdateCard(selectedCard.id, { x: parseInt(e.target.value) || 0 })} className="w-full px-1.5 py-1 bg-white border border-background-200 rounded text-xs text-foreground-900 focus:outline-none focus:border-primary-300" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-foreground-400">Y</span>
                    <input type="number" value={selectedCard.y} onChange={e => handleUpdateCard(selectedCard.id, { y: parseInt(e.target.value) || 0 })} className="w-full px-1.5 py-1 bg-white border border-background-200 rounded text-xs text-foreground-900 focus:outline-none focus:border-primary-300" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-foreground-400">W</span>
                    <input type="number" value={selectedCard.width} onChange={e => handleUpdateCard(selectedCard.id, { width: Math.max(20, parseInt(e.target.value) || 0) })} className="w-full px-1.5 py-1 bg-white border border-background-200 rounded text-xs text-foreground-900 focus:outline-none focus:border-primary-300" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-foreground-400">H</span>
                    <input type="number" value={selectedCard.height} onChange={e => handleUpdateCard(selectedCard.id, { height: Math.max(20, parseInt(e.target.value) || 0) })} className="w-full px-1.5 py-1 bg-white border border-background-200 rounded text-xs text-foreground-900 focus:outline-none focus:border-primary-300" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-foreground-400">Rotate</span>
                  <input type="range" min={0} max={360} value={selectedCard.rotation} onChange={e => handleUpdateCard(selectedCard.id, { rotation: parseInt(e.target.value) })} className="flex-1 h-1 accent-primary-500 cursor-pointer" />
                  <span className="text-[10px] text-foreground-600 w-8 text-right">{selectedCard.rotation}°</span>
                </div>
              </div>
              <hr className="border-background-200" />
              <div className="space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-foreground-700">Show Label</span>
                  <input type="checkbox" checked={selectedCard.showLabel} onChange={e => handleUpdateCard(selectedCard.id, { showLabel: e.target.checked })} className="w-4 h-4 accent-primary-500 cursor-pointer" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-foreground-700">Staff Visible</span>
                  <input type="checkbox" checked={selectedCard.staffVisible} onChange={e => handleUpdateCard(selectedCard.id, { staffVisible: e.target.checked })} className="w-4 h-4 accent-primary-500 cursor-pointer" />
                </label>
              </div>
              <hr className="border-background-200" />
              <div className="space-y-2">
                <button onClick={() => navigate(`/dashboard/desks`)} className="w-full px-3 py-1.5 border border-background-200 rounded-md text-xs text-foreground-600 whitespace-nowrap cursor-pointer hover:bg-background-100 transition-colors text-left">
                  <i className="ri-external-link-line mr-1"></i> Open Desk Detail
                </button>
                <button onClick={() => handleUpdateCard(selectedCard.id, { status: 'maintenance' })} className="w-full px-3 py-1.5 border border-amber-200 rounded-md text-xs text-amber-700 whitespace-nowrap cursor-pointer hover:bg-amber-50 transition-colors text-left">
                  <i className="ri-tools-line mr-1"></i> Mark Maintenance
                </button>
                <button onClick={() => handleRemoveCard(selectedCard.id)} className="w-full px-3 py-1.5 border border-rose-200 rounded-md text-xs text-rose-600 whitespace-nowrap cursor-pointer hover:bg-rose-50 transition-colors text-left">
                  <i className="ri-delete-bin-line mr-1"></i> Remove from Floorplan
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-foreground-400">
              <div className="text-center px-4">
                <i className="ri-cursor-line text-2xl block mb-2"></i>
                <p className="text-xs">Select a desk card on the canvas to edit its properties</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-background-100 border-t border-background-200 text-xs text-foreground-500 shrink-0">
        <div className="flex items-center gap-4">
          <span>{isDirty ? 'Unsaved' : 'Saved'}</span>
          <span>Zoom: {zoom}%</span>
          <span>Selected: {selectedCard ? selectedCard.name : 'None'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Placed: {deskCards.length}</span>
          <span>Unplaced: {unplacedDesks.length}</span>
          <span>Total desks on floor: {deskCards.length + unplacedDesks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default FloorplanEditorPage;