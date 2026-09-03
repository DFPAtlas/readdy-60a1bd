import { useState } from 'react';
import { Link } from 'react-router-dom';
import { privacyNoticeContent, workplaceMonitoringPolicyContent } from '@/mocks/complianceData';

export default function StaffPrivacyPage() {
  const [acknowledged, setAcknowledged] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [needsReAck] = useState(false);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    setShowConfirm(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      <Link to="/staff" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
        <i className="ri-arrow-left-line"></i> Back to Staff Portal
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-foreground-950">Privacy & Notices</h1>
        <p className="mt-1 text-sm text-foreground-500">Review how your workplace data is collected, used, and managed.</p>
      </div>

      {needsReAck && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <i className="ri-alert-line mr-1"></i>
          This notice has been updated. Please review and acknowledge the latest version.
        </div>
      )}

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">{privacyNoticeContent.title}</h3>
        <p className="mt-1 text-xs text-foreground-500">Version {privacyNoticeContent.version} &middot; Published {new Date(privacyNoticeContent.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="mt-4 space-y-4">
          {Object.entries(privacyNoticeContent.sections).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold text-foreground-800">{section.title}</h4>
              <p className="mt-1 whitespace-pre-line text-sm text-foreground-600">{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">Workplace Monitoring Policy Summary</h3>
        <p className="mt-1 text-xs text-foreground-500">Version {workplaceMonitoringPolicyContent.version} &middot; Published {new Date(workplaceMonitoringPolicyContent.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div className="mt-3 space-y-3">
          <div>
            <span className="text-xs font-medium text-foreground-500">Purpose</span>
            <p className="mt-0.5 text-sm text-foreground-600">{workplaceMonitoringPolicyContent.sections.purpose.content}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Named Tracking</span>
            <p className="mt-0.5 text-sm text-foreground-600">Named tracking is currently disabled. All occupancy reports use anonymous data by default.</p>
          </div>
          <div>
            <span className="text-xs font-medium text-foreground-500">Data Retention</span>
            <p className="mt-0.5 text-sm text-foreground-600">Check-in records are retained for 180 days before automatic deletion.</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">What Data Is Collected</h3>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2 text-sm text-foreground-600">
            <i className="ri-check-line mt-0.5 text-emerald-500"></i>
            Desk check-in and check-out records
          </li>
          <li className="flex items-start gap-2 text-sm text-foreground-600">
            <i className="ri-check-line mt-0.5 text-emerald-500"></i>
            Desk issue reports you submit
          </li>
          <li className="flex items-start gap-2 text-sm text-foreground-600">
            <i className="ri-check-line mt-0.5 text-emerald-500"></i>
            Floorplan desk activity
          </li>
          <li className="flex items-start gap-2 text-sm text-foreground-500">
            <i className="ri-close-line mt-0.5 text-foreground-400"></i>
            Location check-in — disabled
          </li>
          <li className="flex items-start gap-2 text-sm text-foreground-500">
            <i className="ri-close-line mt-0.5 text-foreground-400"></i>
            Probe/Wi-Fi analytics — disabled
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">Who Can Access My Data</h3>
        <p className="mt-2 text-sm text-foreground-600">
          You can always view your own check-in history via the My Data page. Site managers can view desk activity for their assigned sites. Floor managers can view activity for their assigned floors.
        </p>
        <p className="mt-2 text-sm text-foreground-600">
          Anonymous occupancy mode is enabled — staff names are hidden in reports and live occupancy views by default.
        </p>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <h3 className="text-base font-semibold text-foreground-950">Questions?</h3>
        <p className="mt-2 text-sm text-foreground-600">
          Contact your company administrator if you have questions about workplace data handling:
        </p>
        <p className="mt-1 text-sm font-medium text-foreground-800">Sarah Chen — sarah.chen@acmecorp.com</p>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        {showConfirm ? (
          <div>
            <p className="text-sm font-medium text-foreground-800">Acknowledge Privacy Notice v{privacyNoticeContent.version}?</p>
            <p className="mt-1 text-xs text-foreground-500">By acknowledging, you confirm you have read and understood the staff privacy notice.</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={handleAcknowledge} className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-primary-600">
                Yes, I Acknowledge
              </button>
              <button type="button" onClick={() => setShowConfirm(false)} className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
                Cancel
              </button>
            </div>
          </div>
        ) : acknowledged ? (
          <div className="flex items-center gap-3">
            <i className="ri-check-double-line text-xl text-emerald-500"></i>
            <div>
              <p className="text-sm font-medium text-emerald-800">Acknowledged on 20 June 2026</p>
              <p className="text-xs text-foreground-500">You have acknowledged the latest version of the Staff Privacy Notice.</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button type="button" onClick={() => setShowConfirm(true)} className="whitespace-nowrap rounded-md bg-primary-500 px-6 py-3 text-sm font-medium text-background-50 hover:bg-primary-600">
              Acknowledge Notice
            </button>
          </div>
        )}
      </div>
    </div>
  );
}