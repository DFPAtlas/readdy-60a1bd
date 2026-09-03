import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockIssues, issueTypes, issuePriorities, mockDesks } from '@/mocks/workspaceData';

export default function StaffIssuesPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ desk_code: '', issue_type: '', description: '', priority: 'medium' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.desk_code || !form.issue_type || !form.description) return;
    setSubmitted(true);
    setShowForm(false);
  };

  const priorityBadge = (p: string) => {
    const colors: Record<string, string> = { low: 'bg-foreground-100 text-foreground-500', medium: 'bg-amber-100 text-amber-700', high: 'bg-accent-100 text-accent-700', urgent: 'bg-red-100 text-red-600' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[p] || ''}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</span>;
  };

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = { open: 'bg-red-100 text-red-600', 'in progress': 'bg-amber-100 text-amber-700', resolved: 'bg-green-100 text-green-700', closed: 'bg-foreground-100 text-foreground-500' };
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${colors[s] || ''}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>;
  };

  return (
    <div className="min-h-screen bg-background-50 pb-20">
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
        <div className="max-w-[600px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/staff" className="flex items-center gap-1.5 cursor-pointer">
            <i className="ri-arrow-left-line text-foreground-600"></i>
            <span className="text-sm font-medium text-foreground-700">Back</span>
          </Link>
          <h1 className="font-heading text-sm font-bold text-foreground-900">Report Issue</h1>
          <div className="w-14"></div>
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-4 pt-4">
        {submitted && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Issue Reported</h2>
            <p className="text-sm text-foreground-500 mb-6">Thank you! Your report has been logged and the facilities team will review it.</p>
            <button onClick={() => { setSubmitted(false); setForm({ desk_code: '', issue_type: '', description: '', priority: 'medium' }); }} className="bg-primary-500 text-background-50 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              Report Another Issue
            </button>
          </div>
        )}

        {!submitted && !showForm && (
          <>
            <button onClick={() => setShowForm(true)} className="w-full bg-primary-500 text-background-50 py-3 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 mb-6">
              <i className="ri-add-line"></i> Report New Issue
            </button>

            <h2 className="font-heading text-sm font-bold text-foreground-900 mb-3">Your Reported Issues</h2>
            <div className="space-y-2">
              {mockIssues.map(iss => (
                <div key={iss.id} className="bg-background-50 border border-background-200/70 rounded-xl p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground-900 capitalize">{iss.issue_type}</p>
                      <p className="text-xs text-foreground-500">Desk {iss.desk_name} · {iss.site_name}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {priorityBadge(iss.priority)}
                      {statusBadge(iss.status)}
                    </div>
                  </div>
                  <p className="text-xs text-foreground-600 line-clamp-2">{iss.description}</p>
                  <p className="text-[11px] text-foreground-400 mt-2">{new Date(iss.created_at).toLocaleString('en-GB')}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {!submitted && showForm && (
          <div>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Desk Code *</label>
                <input value={form.desk_code} onChange={e => setForm({ ...form, desk_code: e.target.value })} placeholder="e.g. A-001" className="w-full px-3 py-2.5 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Issue Type *</label>
                <select value={form.issue_type} onChange={e => setForm({ ...form, issue_type: e.target.value })} className="w-full px-3 py-2.5 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  <option value="">Select type...</option>
                  {issueTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} maxLength={500} placeholder="Describe the issue..." className="w-full px-3 py-2.5 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400 resize-none" />
                <p className="text-[10px] text-foreground-400 text-right mt-0.5">{form.description.length}/500</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground-500 mb-1">Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="w-full px-3 py-2.5 bg-background-50 border border-background-200/70 rounded-lg text-sm cursor-pointer">
                  {issuePriorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <div className="pt-2 flex items-center gap-3">
                <button onClick={handleSubmit} className="flex-1 bg-primary-500 text-background-50 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Submit Report</button>
                <button onClick={() => setShowForm(false)} className="flex-1 bg-background-100 text-foreground-600 py-2.5 rounded-lg text-sm font-medium hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background-50 border-t border-background-200/70 z-30">
        <div className="max-w-[600px] mx-auto px-2 py-2 flex items-center justify-around">
          {[
            { label: 'Home', href: '/staff', icon: 'ri-home-4-line' },
            { label: 'Scan', href: '/staff/check-in', icon: 'ri-qr-scan-line' },
            { label: 'Find Desk', href: '/staff/find-desk', icon: 'ri-search-line' },
            { label: 'Current', href: '/staff/current-desk', icon: 'ri-computer-line' },
            { label: 'Issues', href: '/staff/issues', icon: 'ri-error-warning-line' },
            { label: 'My Data', href: '/staff/my-data', icon: 'ri-shield-user-line' },
          ].map(link => (
            <Link key={link.href} to={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-w-0 ${link.href === '/staff/issues' ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'}`}>
              <i className={`${link.icon} text-lg`}></i>
              <span className="text-[10px] font-medium whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}