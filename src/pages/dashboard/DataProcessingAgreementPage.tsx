import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dataProcessingAgreement } from '@/mocks/complianceData';
import { markDpaReviewed } from '@/services/complianceService';

const sectionKeys = ['controller', 'processor', 'purpose', 'categories', 'users', 'subprocessors', 'security', 'retention', 'contact'];

export default function DataProcessingAgreementPage() {
  const [dpa, setDpa] = useState(dataProcessingAgreement);
  const [reviewed, setReviewed] = useState(false);

  const handleMarkReviewed = async () => {
    await markDpaReviewed('comp_01');
    setReviewed(true);
    setTimeout(() => setReviewed(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Data Processing Agreement</h1>
          <p className="mt-1 text-sm text-foreground-600">
            Manage your data processing information for HotDesk Hub. This page helps you document controller details, processing purposes, and data categories.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            View DPA Template
          </button>
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Download DPA
          </button>
          <button
            type="button"
            onClick={handleMarkReviewed}
            className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-primary-600"
          >
            Mark as Reviewed
          </button>
        </div>
      </div>

      <div className={`rounded-lg border px-4 py-3 text-sm ${dpa.status === 'needs_review' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
        <i className={`mr-1 ${dpa.status === 'needs_review' ? 'ri-alert-line' : 'ri-check-double-line'}`}></i>
        Status: {dpa.statusLabel}
        {dpa.reviewedAt && <> &middot; Reviewed {new Date(dpa.reviewedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by {dpa.reviewedBy}</>}
      </div>

      {reviewed && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> DPA has been marked as reviewed.
        </div>
      )}

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
        <p className="text-sm text-foreground-500 italic">
          This page provides structured placeholders for your Data Processing Agreement. Review each section and consult your legal team before finalising.
        </p>
      </div>

      <div className="space-y-4">
        {sectionKeys.map((key) => {
          const section = dpa.sections[key as keyof typeof dpa.sections];
          return (
            <div key={key} className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
              <h3 className="text-base font-semibold text-foreground-950">{section.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-foreground-600">{section.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}