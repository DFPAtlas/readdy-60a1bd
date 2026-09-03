import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSites, mockBuildings, mockFloors } from '@/mocks/workspaceData';
import { viewPermissionOptions, acceptedFileTypes } from '@/mocks/floorplanData';
import { createFloorplan } from '@/services/floorplanService';
import type { FC } from 'react';

const UploadFloorplanPage: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [siteId, setSiteId] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [floorId, setFloorId] = useState('');
  const [description, setDescription] = useState('');
  const [scaleNote, setScaleNote] = useState('');
  const [viewPermission, setViewPermission] = useState('managers_only');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const filteredBuildings = useMemo(() => {
    if (!siteId) return mockBuildings;
    return mockBuildings.filter(b => b.site_id === siteId);
  }, [siteId]);

  const filteredFloors = useMemo(() => {
    if (!buildingId) return mockFloors;
    return mockFloors.filter(f => f.building_id === buildingId);
  }, [buildingId]);

  const selectedSite = useMemo(() => mockSites.find(s => s.id === siteId), [siteId]);
  const selectedBuilding = useMemo(() => mockBuildings.find(b => b.id === buildingId), [buildingId]);
  const selectedFloor = useMemo(() => mockFloors.find(f => f.id === floorId), [floorId]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    setFileName(file.name);
    if (ext === 'PNG' || ext === 'JPG' || ext === 'JPEG') {
      setFileType(`image/${ext.toLowerCase() === 'jpg' ? 'jpeg' : ext.toLowerCase()}`);
    } else if (ext === 'PDF' || ext === 'SVG' || ext === 'DWG') {
      setFileType(`application/${ext.toLowerCase()}`);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Please enter a floorplan name.'); return; }
    if (!siteId) { setError('Please select a site.'); return; }
    if (!buildingId) { setError('Please select a building.'); return; }
    if (!floorId) { setError('Please select a floor.'); return; }
    if (!fileName) { setError('Please upload a floorplan file.'); return; }
    setError('');
    setUploading(true);
    try {
      const result = await createFloorplan({
        name: name.trim(),
        site_id: siteId,
        site_name: selectedSite?.name || '',
        building_id: buildingId,
        building_name: selectedBuilding?.name || '',
        floor_id: floorId,
        floor_name: selectedFloor?.name || '',
        description: description.trim() || undefined,
        file_name: fileName,
        file_type: fileType,
        view_permission: viewPermission,
      });
      navigate(`/dashboard/floorplans/${result.id}/editor`);
    } catch {
      setError('Failed to create floorplan. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <button onClick={() => navigate('/dashboard/floorplans')} className="text-sm text-foreground-500 hover:text-foreground-700 flex items-center gap-1 cursor-pointer mb-2">
          <i className="ri-arrow-left-line"></i> Back to Floorplans
        </button>
        <h1 className="text-2xl font-semibold text-foreground-950 font-sans">Upload Floorplan</h1>
        <p className="text-foreground-600 text-sm mt-1">Upload an image or CAD file and map it to a floor.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700 flex items-start gap-2">
          <i className="ri-error-warning-line mt-0.5 flex-shrink-0"></i>
          <span>{error}</span>
        </div>
      )}

      <div className="bg-background-50 border border-background-200 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-1.5">Floorplan Name <span className="text-rose-500">*</span></label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., KWH Ground Floor Plan" className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground-800 mb-1.5">Site <span className="text-rose-500">*</span></label>
            <select value={siteId} onChange={e => { setSiteId(e.target.value); setBuildingId(''); setFloorId(''); }} className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer">
              <option value="">Select site...</option>
              {mockSites.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground-800 mb-1.5">Building <span className="text-rose-500">*</span></label>
            <select value={buildingId} onChange={e => { setBuildingId(e.target.value); setFloorId(''); }} className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer" disabled={!siteId}>
              <option value="">Select building...</option>
              {filteredBuildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground-800 mb-1.5">Floor <span className="text-rose-500">*</span></label>
            <select value={floorId} onChange={e => setFloorId(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer" disabled={!buildingId}>
              <option value="">Select floor...</option>
              {filteredFloors.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground-800 mb-1.5">Default View Permission</label>
            <select value={viewPermission} onChange={e => setViewPermission(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-700 focus:outline-none focus:border-primary-400 cursor-pointer">
              {viewPermissionOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-1.5">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} placeholder="Brief description of this floorplan layout..." className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-1.5">Scale Note (optional)</label>
          <input type="text" value={scaleNote} onChange={e => setScaleNote(e.target.value)} placeholder="e.g., 1:100, or 'each grid square = 1m'" className="w-full px-3 py-2.5 bg-white border border-background-200 rounded-lg text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-800 mb-1.5">Upload File <span className="text-rose-500">*</span></label>
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragOver ? 'border-primary-400 bg-primary-50/30' : fileName ? 'border-emerald-300 bg-emerald-50/20' : 'border-background-300 hover:border-primary-300'}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById('floorplan-file-input')?.click()}
          >
            {fileName ? (
              <div>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
                  <i className="ri-file-image-line text-emerald-600 text-xl"></i>
                </div>
                <p className="text-sm font-medium text-foreground-900">{fileName}</p>
                <p className="text-xs text-foreground-500 mt-1">{fileType}</p>
                <button onClick={(e) => { e.stopPropagation(); setFileName(''); setFileType(''); }} className="mt-2 text-xs text-rose-600 hover:text-rose-700 cursor-pointer underline">Remove</button>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                  <i className="ri-upload-cloud-2-line text-amber-600 text-xl"></i>
                </div>
                <p className="text-sm font-medium text-foreground-700">Drag and drop your floorplan file here</p>
                <p className="text-xs text-foreground-500 mt-1">or click to browse</p>
              </div>
            )}
            <input id="floorplan-file-input" type="file" accept="image/png,image/jpeg,application/pdf,image/svg+xml,.dwg" onChange={handleFileSelect} className="hidden" />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {acceptedFileTypes.map(t => (
              <span key={t} className="px-2 py-0.5 bg-background-100 rounded-md text-xs text-foreground-500">{t}</span>
            ))}
          </div>
          <p className="mt-2 text-xs text-foreground-400 italic">CAD/DWG processing will be connected in a later module.</p>
        </div>

        <div className="flex items-center gap-3 pt-3">
          <button onClick={handleSubmit} disabled={uploading} className="px-5 py-2.5 bg-primary-500 text-background-50 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {uploading ? (
              <><i className="ri-loader-4-line animate-spin"></i> Uploading...</>
            ) : (
              <><i className="ri-check-line"></i> Upload Floorplan</>
            )}
          </button>
          <button onClick={() => navigate('/dashboard/floorplans')} className="px-4 py-2.5 border border-background-200 rounded-lg text-sm text-foreground-600 whitespace-nowrap hover:bg-background-100 transition-colors cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFloorplanPage;