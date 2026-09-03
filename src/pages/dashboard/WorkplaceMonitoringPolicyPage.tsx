import { useState } from 'react';
import { Link } from 'react-router-dom';
import { workplaceMonitoringPolicyContent } from '@/mocks/complianceData';

const sectionKeys = ['purpose', 'systemsUsed', 'dataCollected', 'whoCanAccessReports', 'namedTracking', 'anonymousMode', 'retention', 'questions', 'reviewDate'];

const statusBadgeClasses: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  draft: 'bg-amber-100 text-amber-800',
  needs_review: 'bg-amber-100 text-amber-800',
};

export default function WorkplaceMonitoringPolicyPage() {
  const [policy, setPolicy] = useState(workplaceMonitoringPolicyContent);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);

  const startEditing = (key: string) => {
    setEditingSection(key);
    setEditContent(policy.sections[key as keyof typeof policy.sections].content);
  };

  const saveSection = () => {
    if (!editingSection) return;
    const updated = { ...policy };
    updated.sections[editingSection as keyof typeof policy.sections] = {
      ...updated.sections[editingSection as keyof typeof policy.sections],
      content: editContent,
    };
    setPolicy(updated);
    setEditingSection(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Workplace Monitoring Policy</h1>
          <p className="mt-1 text-sm text-foreground-600">
            Version {policy.version} &middot; <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClasses[policy.status]}`}>{policy.status === 'active' ? 'Active' : policy.status === 'needs_review' ? 'Needs Review' : 'Draft'}</span>
            &middot; Published {new Date(policy.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by {policy.publishedBy}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Preview
          </button>
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Download PDF
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-primary-600"
          >
            Publish Policy
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <i className="ri-information-line mr-1"></i>
        This policy template should be reviewed by your organisation before use. HotDesk Hub provides editable placeholders — your organisation is responsible for final policy content.
      </div>

      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> Changes saved.
        </div>
      )}

      {published && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-double-line mr-1"></i> Workplace Monitoring Policy v{policy.version} has been published.
        </div>
      )}

      <div className="space-y-4">
        {sectionKeys.map((key) => {
          const section = policy.sections[key as keyof typeof policy.sections];
          const isEditing = editingSection === key;
          return (
            <div key={key} className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-semibold text-foreground-950">{section.title}</h3>
                <button
                  type="button"
                  onClick={() => (isEditing ? saveSection() : startEditing(key))}
                  className="whitespace-nowrap text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditing ? (
                <textarea
                  className="mt-3 w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                <div className="mt-3">
                  <p className="whitespace-pre-line text-sm text-foreground-600">{section.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}