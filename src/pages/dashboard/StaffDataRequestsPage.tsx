import { useState } from 'react';
import { Link } from 'react-router-dom';
import { staffDataRequests, requestTypeOptions, requestStatusOptions } from '@/mocks/complianceData';

const statusBadgeClasses: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  in_review: 'bg-amber-100 text-amber-800',
  waiting_for_staff: 'bg-secondary-100 text-secondary-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  closed: 'bg-foreground-100 text-foreground-600',
};

const typeIconMap: Record<string, string> = {
  access_my_data: 'ri-file-search-line',
  correct_data: 'ri-edit-line',
  delete_data: 'ri-delete-bin-line',
  question_monitoring: 'ri-question-line',
  privacy_concern: 'ri-shield-flash-line',
};

export default function StaffDataRequestsPage() {
  const [requests] = useState(staffDataRequests);
  const [filters, setFilters] = useState({ requestType: '', status: '' });
  const [showDetail, setShowDetail] = useState<typeof staffDataRequests[0] | null>(null);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Record<string, string[]>>({});

  const filtered = requests.filter((r) => {
    if (filters.requestType && r.requestType !== filters.requestType) return false;
    if (filters.status && r.status !== filters.status) return false;
    return true;
  });

  const addNote = (requestId: string) => {
    if (!newNote.trim()) return;
    setNotes((prev) => ({
      ...prev,
      [requestId]: [...(prev[requestId] || []), newNote],
    }));
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Staff Data Requests</h1>
          <p className="mt-1 text-sm text-foreground-600">Manage staff requests for data access, corrections, and privacy enquiries.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 rounded-lg border border-foreground-200/60 bg-background-50 p-4">
        <select
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.requestType}
          onChange={(e) => setFilters({ ...filters, requestType: e.target.value })}
        >
          <option value="">All Request Types</option>
          {requestTypeOptions.map((rt) => (
            <option key={rt.value} value={rt.value}>{rt.label}</option>
          ))}
        </select>
        <select
          className="rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          {requestStatusOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-foreground-200/60 bg-background-50">
        <table className="w-full">
          <thead className="border-b border-foreground-200/60 bg-background-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Staff Member</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Request Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Created</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Assigned To</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-100/60">
            {filtered.map((req) => (
              <tr key={req.id} className="hover:bg-background-50/80">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground-900">{req.staffName}</p>
                  <p className="text-xs text-foreground-500">{req.staffEmail}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <i className={`${typeIconMap[req.requestType] || 'ri-file-line'} text-base text-foreground-400`}></i>
                    <span className="text-xs text-foreground-700">{req.requestTypeLabel}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClasses[req.status]}`}>{req.statusLabel}</span>
                </td>
                <td className="px-4 py-3 text-xs text-foreground-500 whitespace-nowrap">{new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="px-4 py-3 text-xs text-foreground-600">{req.assignedTo || '—'}</td>
                <td className="px-4 py-3">
                  <button type="button" onClick={() => setShowDetail(req)} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                    View <i className="ri-arrow-right-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-end" onClick={() => setShowDetail(null)}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full w-full max-w-lg overflow-y-auto border-l border-foreground-200/60 bg-background-50 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground-950">Request Detail</h3>
              <button type="button" onClick={() => setShowDetail(null)} className="text-foreground-400 hover:text-foreground-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <span className="text-xs font-medium text-foreground-500">Staff Member</span>
                <p className="mt-0.5 text-sm font-medium text-foreground-900">{showDetail.staffName}</p>
                <p className="text-xs text-foreground-500">{showDetail.staffEmail}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-medium text-foreground-500">Request Type</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.requestTypeLabel}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Status</span>
                  <p className="mt-0.5">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClasses[showDetail.status]}`}>{showDetail.statusLabel}</span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Created</span>
                  <p className="mt-0.5 text-sm text-foreground-600">{new Date(showDetail.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground-500">Assigned To</span>
                  <p className="mt-0.5 text-sm text-foreground-800">{showDetail.assignedTo || 'Unassigned'}</p>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-foreground-500">Message</span>
                <p className="mt-1 rounded-md bg-foreground-50 p-3 text-sm text-foreground-700">{showDetail.message}</p>
              </div>

              <div>
                <span className="text-xs font-medium text-foreground-500">Notes</span>
                <div className="mt-2 space-y-2">
                  {(showDetail.notes || []).concat(notes[showDetail.id] || []).map((note, i) => (
                    <div key={i} className="rounded-md bg-secondary-50 px-3 py-2 text-xs text-secondary-800">{note}</div>
                  ))}
                  {(!showDetail.notes || showDetail.notes.length === 0) && (!notes[showDetail.id] || notes[showDetail.id].length === 0) && (
                    <p className="text-xs text-foreground-400">No notes yet.</p>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border border-foreground-200/60 bg-background-50 px-3 py-1.5 text-sm text-foreground-800 placeholder:text-foreground-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') addNote(showDetail.id); }}
                  />
                  <button type="button" onClick={() => addNote(showDetail.id)} className="whitespace-nowrap rounded-md bg-primary-500 px-3 py-1.5 text-xs font-medium text-background-50 hover:bg-primary-600">
                    Add Note
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-foreground-100 pt-4">
                <button type="button" className="whitespace-nowrap rounded-md bg-primary-500 px-3 py-1.5 text-xs font-medium text-background-50 hover:bg-primary-600">Mark In Review</button>
                <button type="button" className="whitespace-nowrap rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600">Mark Resolved</button>
                <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-3 py-1.5 text-xs font-medium text-foreground-700 hover:bg-background-100">Close Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}