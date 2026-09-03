import { Link, useNavigate } from 'react-router-dom';
import { installerChecklist } from '@/mocks/authData';
import { useState } from 'react';

export default function InstallerSetup() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(installerChecklist);
  const [activeSite, setActiveSite] = useState('London HQ');
  const [activeView, setActiveView] = useState<'checklist' | 'sites' | 'tags' | 'floorplan'>('checklist');

  const toggleItem = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const progress = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-background-50">
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
        <div className="max-w-[700px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1.5 font-heading font-bold text-sm text-foreground-900 whitespace-nowrap">
              <span className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center text-background-50 text-[10px] font-bold">H</span>
              HotDesk Hub
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600 bg-accent-100 px-2 py-0.5 rounded-full">Setup Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-500">{progress}% complete</span>
            <div className="w-20 h-2 bg-background-200 rounded-full overflow-hidden">
              <div className="h-full bg-accent-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[700px] mx-auto px-4 pt-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
            <i className="ri-tools-line text-lg text-accent-600"></i>
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground-950">Installer Setup</h1>
            <p className="text-xs text-foreground-500">Assigned site: {activeSite}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { key: 'checklist', label: 'Checklist', icon: 'ri-list-check-3' },
            { key: 'sites', label: 'Sites', icon: 'ri-building-line' },
            { key: 'tags', label: 'Tag Assignment', icon: 'ri-qr-scan-line' },
            { key: 'floorplan', label: 'Floorplan', icon: 'ri-image-line' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as typeof activeView)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeView === tab.key
                  ? 'bg-primary-500 text-background-50'
                  : 'bg-background-100 text-foreground-600 hover:bg-background-200'
              }`}
            >
              <i className={`${tab.icon} text-sm`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {activeView === 'checklist' && (
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950 mb-4">Setup Checklist</h2>
            <div className="space-y-2">
              {checklist.map((item) => (
                <label key={item.id} className="flex items-start gap-3 py-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleItem(item.id)}
                    className="mt-0.5 w-4 h-4 rounded border-background-300 text-accent-500 focus:ring-accent-400"
                  />
                  <span className={`text-sm ${item.done ? 'text-foreground-400 line-through' : 'text-foreground-800'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeView === 'sites' && (
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950 mb-4">Assigned Sites</h2>
            <div className="space-y-3">
              {['London HQ', 'Manchester Office'].map((site) => (
                <div key={site} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  activeSite === site ? 'border-accent-500 bg-accent-50' : 'border-background-200/70 hover:bg-background-50'
                }`} onClick={() => setActiveSite(site)}>
                  <i className="ri-building-line text-foreground-600"></i>
                  <div>
                    <p className="text-sm font-medium text-foreground-800">{site}</p>
                    <p className="text-xs text-foreground-500">30 desks · 2 floors · 3 areas</p>
                  </div>
                  {activeSite === site && <i className="ri-check-line text-accent-500 ml-auto"></i>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'tags' && (
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950 mb-4">QR/NFC Tag Assignment</h2>
            <p className="text-sm text-foreground-500 mb-4">Scan or enter a tag ID and assign it to a desk.</p>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Tag ID (e.g. TAG-001)" className="flex-1 bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
              <button className="bg-primary-500 text-background-50 font-semibold text-sm px-4 py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">Assign</button>
            </div>
            <div className="space-y-2">
              {[
                { tag: 'TAG-001', desk: 'A-001', area: 'Engineering Zone', assigned: true },
                { tag: 'TAG-002', desk: 'A-002', area: 'Engineering Zone', assigned: true },
                { tag: 'TAG-003', desk: '—', area: '—', assigned: false },
              ].map((t) => (
                <div key={t.tag} className="flex items-center gap-3 p-3 rounded-lg border border-background-200/70">
                  <span className="text-xs font-mono font-bold text-foreground-800 bg-background-100 px-2 py-1 rounded">{t.tag}</span>
                  {t.assigned ? (
                    <>
                      <i className="ri-arrow-right-line text-foreground-400 text-xs"></i>
                      <span className="text-sm text-foreground-800">{t.desk}</span>
                      <span className="text-xs text-foreground-500">· {t.area}</span>
                      <i className="ri-checkbox-circle-fill text-accent-500 ml-auto"></i>
                    </>
                  ) : (
                    <span className="text-xs text-foreground-400 ml-auto">Unassigned</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'floorplan' && (
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
            <h2 className="font-heading text-base font-bold text-foreground-950 mb-4">Floorplan Placement</h2>
            <div className="border-2 border-dashed border-background-300 rounded-xl p-10 text-center">
              <i className="ri-image-add-line text-3xl text-foreground-300 mb-3 block"></i>
              <p className="text-sm text-foreground-500 mb-1">Upload a floorplan image</p>
              <p className="text-xs text-foreground-400 mb-4">Then drag desk cards onto the floorplan to map positions.</p>
              <button onClick={() => navigate('/dashboard/floorplans')} className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-upload-line"></i>
                Go to Floorplans
              </button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background-50 border-t border-background-200/70 z-30">
        <div className="max-w-[700px] mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-foreground-500">Installer · {activeSite}</span>
          <button className="bg-accent-500 text-background-50 font-semibold text-xs px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors whitespace-nowrap cursor-pointer">
            Submit Completion
          </button>
        </div>
      </nav>
    </div>
  );
}