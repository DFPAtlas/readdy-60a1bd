import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dpiaAssessments, dpiaDecisionOptions } from '@/mocks/complianceData';

const riskBadgeClasses: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high: 'bg-red-100 text-red-800',
};

const statusBadgeClasses: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-800',
  not_started: 'bg-foreground-100 text-foreground-600',
  not_required: 'bg-secondary-100 text-secondary-800',
  in_progress: 'bg-primary-100 text-primary-800',
  needs_review: 'bg-amber-100 text-amber-800',
};

export default function DpiaSupportPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [formData, setFormData] = useState({
    purpose: '',
    dataCollected: '',
    usersAffected: '',
    risks: '',
    controls: '',
    retention: '180',
    accessControls: '',
    staffComms: '',
    decision: '',
    reviewDate: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const openForm = (featureKey: string) => {
    setSelectedFeature(featureKey);
    setShowForm(true);
    setFormData({ purpose: '', dataCollected: '', usersAffected: '', risks: '', controls: '', retention: '180', accessControls: '', staffComms: '', decision: '', reviewDate: '' });
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">DPIA Support</h1>
          <p className="mt-1 text-sm text-foreground-600">Assess privacy risks before enabling advanced workplace monitoring features.</p>
        </div>
        <button
          type="button"
          onClick={() => openForm('new')}
          className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-primary-600"
        >
          Start DPIA Assessment
        </button>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-4">
        <p className="text-sm text-foreground-600">
          A Data Protection Impact Assessment helps your organisation identify and minimise privacy risks before introducing new data processing activities. Complete a DPIA for each feature that involves personal data.
        </p>
      </div>

      {submitted && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> DPIA assessment submitted. It will be reviewed by your compliance team.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dpiaAssessments.map((item) => (
          <div key={item.id} className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground-100">
                <i className="ri-shield-check-line text-lg text-foreground-600"></i>
              </div>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClasses[item.status]}`}>
                {item.statusLabel}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground-950">{item.featureName}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${riskBadgeClasses[item.riskLevel]}`}>
                {item.riskLabel}
              </span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${item.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-foreground-100 text-foreground-600'}`}>
                {item.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            {item.assessmentDate && (
              <p className="mt-2 text-xs text-foreground-500">Assessed {new Date(item.assessmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            )}
            <button
              type="button"
              onClick={() => openForm(item.featureKey)}
              className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              {item.status === 'not_started' ? 'Start Assessment' : item.status === 'completed' ? 'Review Assessment' : 'Continue Assessment'} <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-6">
          <h3 className="text-lg font-semibold text-foreground-950">DPIA Assessment Form</h3>
          <p className="mt-1 text-sm text-foreground-500">
            {selectedFeature !== 'new' ? `Assessing: ${dpiaAssessments.find((a) => a.featureKey === selectedFeature)?.featureName || selectedFeature}` : 'New Assessment'}
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground-700">Purpose</label>
                <textarea className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" rows={2} value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Data Collected</label>
                <textarea className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" rows={2} value={formData.dataCollected} onChange={(e) => setFormData({ ...formData, dataCollected: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Users Affected</label>
                <input type="text" className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" value={formData.usersAffected} onChange={(e) => setFormData({ ...formData, usersAffected: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Risks Identified</label>
                <textarea className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" rows={2} value={formData.risks} onChange={(e) => setFormData({ ...formData, risks: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Controls in Place</label>
                <textarea className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" rows={2} value={formData.controls} onChange={(e) => setFormData({ ...formData, controls: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Retention Period</label>
                <select className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" value={formData.retention} onChange={(e) => setFormData({ ...formData, retention: e.target.value })}>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Access Controls</label>
                <input type="text" className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" value={formData.accessControls} onChange={(e) => setFormData({ ...formData, accessControls: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Staff Communication Plan</label>
                <input type="text" className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" value={formData.staffComms} onChange={(e) => setFormData({ ...formData, staffComms: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Decision</label>
                <select className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" value={formData.decision} onChange={(e) => setFormData({ ...formData, decision: e.target.value })}>
                  <option value="">Select decision...</option>
                  {dpiaDecisionOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700">Review Date</label>
                <input type="date" className="mt-1 w-full rounded-md border border-foreground-200/60 bg-background-50 px-3 py-2 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400" value={formData.reviewDate} onChange={(e) => setFormData({ ...formData, reviewDate: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-primary-600">
                Submit Assessment
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}