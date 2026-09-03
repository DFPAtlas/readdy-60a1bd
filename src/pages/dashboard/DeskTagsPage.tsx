import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockDeskTags, tagTypes, tagStatuses } from '@/mocks/workspaceData';

export default function DeskTagsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = [...mockDeskTags];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(t => t.tag_code.toLowerCase().includes(q) || (t.desk_name || '').toLowerCase().includes(q) || (t.site_name || '').toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') items = items.filter(t => t.status === statusFilter);
    return items;
  }, [search, statusFilter]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700', assigned: 'bg-secondary-100 text-secondary-700',
      unassigned: 'bg-foreground-100 text-foreground-500', disabled: 'bg-foreground-200 text-foreground-500',
      lost: 'bg-red-100 text-red-600', replaced: 'bg-amber-100 text-amber-700',
    };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const tag = selectedTag ? mockDeskTags.find(t => t.id === selectedTag) : null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-foreground-950">Desk Tags</h1>
          <p className="text-sm text-foreground-500 mt-0.5">Manage QR and NFC tags linked to desks</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary-500 text-background-50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-add-line"></i> Create Tag
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input type="text" placeholder="Search tags by code, desk, or site..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2 text-sm text-foreground-700 cursor-pointer">
          <option value="all">All Statuses</option>
          {tagStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-background-200/70 bg-background-100/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Tag Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Linked Desk</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Site</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Last Scan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-background-200/70 hover:bg-background-100/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold text-foreground-900">{t.tag_code}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-background-100 text-foreground-600 px-2 py-0.5 rounded-full">{t.tag_type}</span>
                  </td>
                  <td className="px-4 py-3">
                    {t.desk_name ? (
                      <Link to={`/dashboard/desks/${t.desk_id}`} className="text-primary-600 font-medium hover:underline text-xs">{t.desk_name}</Link>
                    ) : <span className="text-foreground-400 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3 text-foreground-600 text-xs">{t.site_name}</td>
                  <td className="px-4 py-3">{statusBadge(t.status)}</td>
                  <td className="px-4 py-3 text-foreground-500 text-xs">{t.last_scanned_at ? new Date(t.last_scanned_at).toLocaleString('en-GB') : '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {t.status === 'unassigned' && (
                        <button onClick={() => { setSelectedTag(t.id); setShowAssignModal(true); }} className="text-[11px] font-medium bg-primary-50 text-primary-600 px-2 py-1 rounded-md hover:bg-primary-100 transition-colors cursor-pointer whitespace-nowrap">Assign</button>
                      )}
                      {t.status === 'active' && (
                        <>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="Copy URL"><i className="ri-file-copy-line text-xs"></i></button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="Print QR"><i className="ri-printer-line text-xs"></i></button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-foreground-400 hover:text-red-500 transition-colors cursor-pointer" title="Disable"><i className="ri-close-circle-line text-xs"></i></button>
                        </>
                      )}
                      {t.status === 'lost' && (
                        <button className="text-[11px] font-medium bg-amber-50 text-amber-600 px-2 py-1 rounded-md hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap">Replace</button>
                      )}
                      {(t.status === 'disabled' || t.status === 'assigned') && (
                        <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background-200 text-foreground-500 transition-colors cursor-pointer" title="Edit"><i className="ri-pencil-line text-xs"></i></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAssignModal && tag && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowAssignModal(false)}></div>
          <div className="relative bg-background-50 rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-foreground-950">Assign Tag</h2>
              <button onClick={() => setShowAssignModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 cursor-pointer"><i className="ri-close-line"></i></button>
            </div>
            <p className="text-sm text-foreground-600 mb-1">Tag: <span className="font-mono font-semibold text-foreground-900">{tag.tag_code}</span></p>
            <p className="text-xs text-foreground-400 mb-4">Type: {tag.tag_type} &middot; Site: {tag.site_name}</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Select Desk</label>
                <select className="w-full px-3 py-2 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Choose a desk...</option>
                  <option value="dsk_016">D-003 (Sales Zone)</option>
                  <option value="dsk_020">F-002 (Finance & Legal)</option>
                </select>
              </div>
              <button onClick={() => setShowAssignModal(false)} className="w-full bg-primary-500 text-background-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Assign to Desk</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}