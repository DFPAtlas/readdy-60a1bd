import { useState } from 'react';
import { Link } from 'react-router-dom';
import { privacyNoticeContent } from '@/mocks/complianceData';

const sectionKeys = ['whatIsCollected', 'whyCollected', 'whoCanAccess', 'howLongKept', 'staffRights', 'contact', 'lastUpdatedInfo'];

export default function StaffPrivacyNoticePage() {
  const [notice, setNotice] = useState(privacyNoticeContent);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);

  const startEditing = (key: string) => {
    setEditingSection(key);
    setEditContent(notice.sections[key as keyof typeof notice.sections].content);
  };

  const saveSection = () => {
    if (!editingSection) return;
    const updated = { ...notice };
    updated.sections[editingSection as keyof typeof notice.sections] = {
      ...updated.sections[editingSection as keyof typeof notice.sections],
      content: editContent,
    };
    updated.lastUpdated = new Date().toISOString();
    setNotice(updated);
    setEditingSection(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const handleToggleDataOption = (optionKey: string) => {
    const updated = { ...notice };
    const section = updated.sections.whatIsCollected;
    const opts = section.dataCollectionOptions.map((o) =>
      o.key === optionKey ? { ...o, enabled: !o.enabled } : o
    );
    updated.sections.whatIsCollected = { ...section, dataCollectionOptions: opts };
    updated.lastUpdated = new Date().toISOString();
    setNotice(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Staff Privacy Notice</h1>
          <p className="mt-1 text-sm text-foreground-600">
            Version {notice.version} &middot; Published {new Date(notice.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by {notice.publishedBy}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Preview as Staff
          </button>
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Send Update Notification
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-background-50 hover:bg-primary-600"
          >
            Publish Notice
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-4">
        <p className="text-sm text-foreground-600">
          Explain to staff what workplace data is collected, why it is collected, who can see it, and how long it is kept. Your privacy notice should be clear, honest, and easy to understand.
        </p>
      </div>

      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> Changes saved.
        </div>
      )}

      {published && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-double-line mr-1"></i> Staff Privacy Notice v{notice.version} has been published. All staff will be notified.
        </div>
      )}

      <div className="space-y-4">
        {sectionKeys.map((key) => {
          const section = notice.sections[key as keyof typeof notice.sections];
          const isEditing = editingSection === key;

          if (key === 'whatIsCollected') {
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
                  <div className="mt-3">
                    <textarea
                      className="w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                      rows={6}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <p className="mt-3 text-sm font-medium text-foreground-700">Data Collection Options</p>
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {section.dataCollectionOptions.map((opt) => (
                        <label key={opt.key} className="flex items-center gap-2 text-sm text-foreground-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={opt.enabled}
                            onChange={() => handleToggleDataOption(opt.key)}
                            className="h-4 w-4 rounded border-foreground-300 text-primary-500 focus:ring-primary-400"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <p className="whitespace-pre-line text-sm text-foreground-600">{section.content}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {section.dataCollectionOptions.map((opt) => (
                        <span key={opt.key} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${opt.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-foreground-100 text-foreground-500'}`}>
                          {opt.enabled ? <i className="ri-check-line mr-1"></i> : <i className="ri-close-line mr-1"></i>}
                          {opt.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

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
                <div className="mt-3">
                  <textarea
                    className="w-full rounded-md border border-foreground-200/60 bg-background-50 p-3 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                    rows={6}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                </div>
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