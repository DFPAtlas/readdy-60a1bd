import { useState } from 'react';
import { Link } from 'react-router-dom';
import { staffMyData } from '@/mocks/complianceData';

export default function StaffMyDataPage() {
  const [showDownloadMsg, setShowDownloadMsg] = useState(false);
  const [showRequestMsg, setShowRequestMsg] = useState(false);

  const data = staffMyData;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      <Link to="/staff" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
        <i className="ri-arrow-left-line"></i> Back to Staff Portal
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-foreground-950">My Data & Privacy</h1>
        <p className="mt-1 text-sm text-foreground-500">Access and manage your workplace data. Only you can see this page.</p>
      </div>

      {showDownloadMsg && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> Your data export request has been logged. Downloads will be available when Supabase is connected.
        </div>
      )}

      {showRequestMsg && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> Your request has been submitted. A company administrator will review it shortly.
        </div>
      )}

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">My Current Status</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="text-xs font-medium text-foreground-500">Current Desk</span>
            <p className="mt-0.5 text-sm font-medium text-foreground-900">{data.currentDesk.name} — {data.currentDesk.type}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Status</span>
            <p className="mt-0.5">
              <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Checked In</span>
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Checked In At</span>
            <p className="mt-0.5 text-sm text-foreground-800">{new Date(data.currentDesk.checkedInAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Location</span>
            <p className="mt-0.5 text-sm text-foreground-800">{data.currentDesk.site} — {data.currentDesk.building} — {data.currentDesk.floor}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Assigned Site</span>
            <p className="mt-0.5 text-sm text-foreground-800">{data.assignedSite}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Role</span>
            <p className="mt-0.5 text-sm capitalize text-foreground-800">{data.assignedRole.replace(/_/g, ' ')}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">My Check-In History</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-foreground-100">
              <tr>
                <th className="pb-2 text-left text-xs font-medium text-foreground-500">Desk</th>
                <th className="pb-2 text-left text-xs font-medium text-foreground-500">Site</th>
                <th className="pb-2 text-left text-xs font-medium text-foreground-500">Area</th>
                <th className="pb-2 text-left text-xs font-medium text-foreground-500">Checked In</th>
                <th className="pb-2 text-left text-xs font-medium text-foreground-500">Checked Out</th>
                <th className="pb-2 text-left text-xs font-medium text-foreground-500">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground-50">
              {data.checkInHistory.map((record) => (
                <tr key={record.id}>
                  <td className="py-2.5 text-xs font-medium text-foreground-800">{record.desk}</td>
                  <td className="py-2.5 text-xs text-foreground-500">{record.site}</td>
                  <td className="py-2.5 text-xs text-foreground-500">{record.area}</td>
                  <td className="py-2.5 text-xs text-foreground-600 whitespace-nowrap">{new Date(record.checkedInAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="py-2.5 text-xs text-foreground-600 whitespace-nowrap">{record.checkedOutAt ? new Date(record.checkedOutAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                  <td className="py-2.5 text-xs text-foreground-600">{record.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">My Issue Reports</h3>
        {data.issueReports.length === 0 ? (
          <p className="mt-3 text-sm text-foreground-500">No issues reported.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {data.issueReports.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between rounded-md border border-foreground-100/60 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground-800">{issue.type}</p>
                  <p className="mt-0.5 text-xs text-foreground-500">Desk {issue.desk} &middot; {new Date(issue.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${issue.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {issue.statusLabel}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">My Privacy Summary</h3>
        <div className="mt-4 space-y-3">
          <div>
            <span className="text-xs font-medium text-foreground-500">Privacy Notice</span>
            <p className="text-sm text-foreground-800">{data.privacySummary.noticeTitle}</p>
            <p className="text-xs text-emerald-600">Acknowledged {new Date('2026-06-20T09:00:00Z').toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Monitoring Policy</span>
            <p className="text-sm text-foreground-800">{data.privacySummary.monitoringPolicyTitle}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Data Retention</span>
            <p className="text-sm text-foreground-800">{data.privacySummary.retentionPeriod}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Data Collected</span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {data.privacySummary.dataCollected.map((item) => (
                <span key={item} className="inline-block rounded-full bg-secondary-100 px-2.5 py-0.5 text-xs font-medium text-secondary-800">{item}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Contact</span>
            <p className="text-sm text-foreground-800">{data.privacySummary.contactPerson}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => setShowDownloadMsg(true)} className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2.5 text-sm font-medium text-background-50 hover:bg-primary-600">
          <i className="ri-download-line mr-1.5"></i> Download My Data
        </button>
        <button type="button" onClick={() => setShowRequestMsg(true)} className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2.5 text-sm font-medium text-foreground-700 hover:bg-background-100">
          <i className="ri-question-line mr-1.5"></i> Ask a Question
        </button>
        <button type="button" onClick={() => setShowRequestMsg(true)} className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2.5 text-sm font-medium text-foreground-700 hover:bg-background-100">
          <i className="ri-edit-line mr-1.5"></i> Request Correction
        </button>
      </div>
    </div>
  );
}