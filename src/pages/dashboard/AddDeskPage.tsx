import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allDeskTypes, allDeskStatuses, mockSites, mockBuildings, mockFloors, mockAreas } from '@/mocks/workspaceData';

type Tab = 'manual' | 'bulk' | 'csv';

export default function AddDeskPage() {
  const [tab, setTab] = useState<Tab>('manual');
  const [manualForm, setManualForm] = useState({ name: '', code: '', site_id: '', building_id: '', floor_id: '', area_id: '', type: 'standard desk', status: 'active', equipment_notes: '', accessibility_notes: '' });
  const [bulkForm, setBulkForm] = useState({ prefix: 'D', startNumber: 1, count: 10, digitFormat: 3, site_id: '', building_id: '', floor_id: '', area_id: '', type: 'standard desk', initialStatus: 'draft' });
  const [preview, setPreview] = useState<string[]>([]);

  const selectedSite = mockSites.find(s => s.id === manualForm.site_id);
  const filteredBuildings = mockBuildings.filter(b => b.site_id === manualForm.site_id);
  const filteredFloors = mockFloors.filter(f => f.building_id === manualForm.building_id);
  const filteredAreas = mockAreas.filter(a => a.floor_id === manualForm.floor_id);

  const bulkSite = mockSites.find(s => s.id === bulkForm.site_id);
  const bulkBuildings = mockBuildings.filter(b => b.site_id === bulkForm.site_id);
  const bulkFloors = mockFloors.filter(f => f.building_id === bulkForm.building_id);
  const bulkAreas = mockAreas.filter(a => a.floor_id === bulkForm.floor_id);

  const generatePreview = () => {
    const { prefix, startNumber, count, digitFormat } = bulkForm;
    const items: string[] = [];
    for (let i = 0; i < count; i++) {
      const num = String(startNumber + i).padStart(digitFormat, '0');
      items.push(`${prefix}-${num}`);
    }
    setPreview(items);
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-foreground-500 mb-4">
        <Link to="/dashboard/desks" className="hover:text-foreground-700 transition-colors">Desks</Link>
        <i className="ri-arrow-right-s-line text-xs"></i>
        <span className="text-foreground-800 font-medium">Add Desk</span>
      </div>

      <h1 className="font-heading text-xl font-bold text-foreground-950 mb-2">Add New Desk</h1>
      <p className="text-sm text-foreground-500 mb-6">Create desks individually, in bulk, or import via CSV.</p>

      <div className="flex items-center bg-background-100 rounded-full p-0.5 w-fit mb-6">
        {[
          { key: 'manual' as Tab, label: 'Manual', icon: 'ri-add-circle-line' },
          { key: 'bulk' as Tab, label: 'Bulk Create', icon: 'ri-stack-line' },
          { key: 'csv' as Tab, label: 'CSV Upload', icon: 'ri-file-excel-2-line' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${tab === t.key ? 'bg-background-50 text-foreground-900' : 'text-foreground-500 hover:text-foreground-700'}`}
          >
            <i className={`${t.icon} text-sm`}></i> {t.label}
          </button>
        ))}
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
        {tab === 'manual' && (
          <div className="max-w-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Desk Name *</label>
                <input value={manualForm.name} onChange={e => setManualForm({ ...manualForm, name: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" placeholder="e.g. A-001" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Desk Code *</label>
                <input value={manualForm.code} onChange={e => setManualForm({ ...manualForm, code: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" placeholder="e.g. A-001" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Site *</label>
                <select value={manualForm.site_id} onChange={e => setManualForm({ ...manualForm, site_id: e.target.value, building_id: '', floor_id: '', area_id: '' })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select site</option>
                  {mockSites.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Building *</label>
                <select value={manualForm.building_id} onChange={e => setManualForm({ ...manualForm, building_id: e.target.value, floor_id: '', area_id: '' })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select building</option>
                  {filteredBuildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Floor *</label>
                <select value={manualForm.floor_id} onChange={e => setManualForm({ ...manualForm, floor_id: e.target.value, area_id: '' })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select floor</option>
                  {filteredFloors.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Hot Desk Area *</label>
                <select value={manualForm.area_id} onChange={e => setManualForm({ ...manualForm, area_id: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select area</option>
                  {filteredAreas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Desk Type</label>
                <select value={manualForm.type} onChange={e => setManualForm({ ...manualForm, type: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {allDeskTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Status</label>
                <select value={manualForm.status} onChange={e => setManualForm({ ...manualForm, status: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {allDeskStatuses.filter(s => !['occupied', 'booked'].includes(s)).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-500 mb-1">Equipment Notes</label>
              <input value={manualForm.equipment_notes} onChange={e => setManualForm({ ...manualForm, equipment_notes: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" placeholder="e.g. Dual monitors, ergonomic chair" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground-500 mb-1">Accessibility Notes</label>
              <input value={manualForm.accessibility_notes} onChange={e => setManualForm({ ...manualForm, accessibility_notes: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" placeholder="e.g. Wheelchair accessible, height-adjustable" />
            </div>
            <div className="pt-2">
              <button className="bg-primary-500 text-background-50 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Create Desk</button>
            </div>
          </div>
        )}

        {tab === 'bulk' && (
          <div className="max-w-2xl space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Prefix</label>
                <input value={bulkForm.prefix} onChange={e => setBulkForm({ ...bulkForm, prefix: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Start #</label>
                <input type="number" value={bulkForm.startNumber} onChange={e => setBulkForm({ ...bulkForm, startNumber: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Count</label>
                <input type="number" value={bulkForm.count} onChange={e => setBulkForm({ ...bulkForm, count: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Digits</label>
                <select value={bulkForm.digitFormat} onChange={e => setBulkForm({ ...bulkForm, digitFormat: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {[1, 2, 3, 4].map(d => <option key={d} value={d}>{d} digits</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Site</label>
                <select value={bulkForm.site_id} onChange={e => setBulkForm({ ...bulkForm, site_id: e.target.value, building_id: '', floor_id: '', area_id: '' })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select site</option>
                  {mockSites.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Building</label>
                <select value={bulkForm.building_id} onChange={e => setBulkForm({ ...bulkForm, building_id: e.target.value, floor_id: '', area_id: '' })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select building</option>
                  {bulkBuildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Floor</label>
                <select value={bulkForm.floor_id} onChange={e => setBulkForm({ ...bulkForm, floor_id: e.target.value, area_id: '' })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select floor</option>
                  {bulkFloors.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Area</label>
                <select value={bulkForm.area_id} onChange={e => setBulkForm({ ...bulkForm, area_id: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select area</option>
                  {bulkAreas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Desk Type</label>
                <select value={bulkForm.type} onChange={e => setBulkForm({ ...bulkForm, type: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {allDeskTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Initial Status</label>
                <select value={bulkForm.initialStatus} onChange={e => setBulkForm({ ...bulkForm, initialStatus: e.target.value })} className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {['draft', 'active', 'inactive'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={generatePreview} className="text-sm font-medium bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg hover:bg-secondary-200 transition-colors cursor-pointer whitespace-nowrap">Generate Preview</button>
              <span className="text-xs text-foreground-500">Creates: {bulkForm.prefix}-{String(bulkForm.startNumber).padStart(bulkForm.digitFormat, '0')} to {bulkForm.prefix}-{String(bulkForm.startNumber + bulkForm.count - 1).padStart(bulkForm.digitFormat, '0')}</span>
            </div>

            {preview.length > 0 && (
              <div className="bg-background-100 rounded-lg p-4">
                <p className="text-xs font-semibold text-foreground-500 mb-2">Preview ({preview.length} desks)</p>
                <div className="flex flex-wrap gap-1.5">
                  {preview.map((d, i) => (
                    <span key={i} className="text-[11px] bg-background-50 border border-background-200/70 px-2 py-1 rounded-md text-foreground-700 font-mono">{d}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button className="bg-primary-500 text-background-50 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Create Desk Batch</button>
            </div>
          </div>
        )}

        {tab === 'csv' && (
          <div className="max-w-xl">
            <div className="border-2 border-dashed border-background-300/60 rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-xl bg-background-100 flex items-center justify-center mx-auto mb-3">
                <i className="ri-upload-cloud-2-line text-2xl text-foreground-400"></i>
              </div>
              <h3 className="font-semibold text-foreground-800 mb-1">Upload CSV file</h3>
              <p className="text-xs text-foreground-500 mb-4">Drag and drop or click to browse. CSV import will be available when the backend is connected.</p>
              <button className="bg-background-100 text-foreground-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">Select File</button>
            </div>
            <div className="mt-4 bg-background-100 rounded-lg p-4">
              <p className="text-xs font-semibold text-foreground-500 mb-2">Required CSV columns:</p>
              <div className="flex flex-wrap gap-1.5">
                {['desk_name', 'desk_code', 'site', 'building', 'floor', 'area', 'desk_type', 'status'].map(c => (
                  <span key={c} className="text-[11px] bg-background-50 border border-background-200/70 px-2 py-1 rounded-md text-foreground-600 font-mono">{c}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}