import { useState } from 'react';
import { Link } from 'react-router-dom';
import { retentionCategories, retentionPeriodOptions } from '@/mocks/complianceData';

export default function DataRetentionSettingsPage() {
  const [categories, setCategories] = useState(retentionCategories);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [pendingPeriod, setPendingPeriod] = useState('');
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmKey, setConfirmKey] = useState<string | null>(null);

  const startChange = (key: string) => {
    setEditingKey(key);
    const cat = categories.find((c) => c.key === key);
    setPendingPeriod(cat ? cat.currentPeriod : '180');
    setShowConfirm(false);
  };

  const confirmChange = () => {
    setShowConfirm(true);
  };

  const applyChange = () => {
    if (!editingKey) return;
    const updated = categories.map((c) => {
      if (c.key === editingKey) {
        const opt = retentionPeriodOptions.find((o) => o.value === pendingPeriod);
        return { ...c, currentPeriod: pendingPeriod, currentLabel: opt ? opt.label : pendingPeriod };
      }
      return c;
    });
    setCategories(updated);
    setEditingKey(null);
    setShowConfirm(false);
    setConfirmKey(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const cancelChange = () => {
    setEditingKey(null);
    setShowConfirm(false);
    setConfirmKey(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Data Retention Settings</h1>
          <p className="mt-1 text-sm text-foreground-600">Define how long workplace data is stored before automatic deletion.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Preview Deletion Schedule
          </button>
          <button type="button" className="whitespace-nowrap rounded-md border border-foreground-200/60 bg-background-50 px-4 py-2 text-sm font-medium text-foreground-700 hover:bg-background-100">
            Export Retention Policy
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <i className="ri-information-line mr-1"></i>
        Shorter retention periods can reduce privacy risk. Longer retention periods should have a clear business reason. Changing retention settings will create an audit log entry.
      </div>

      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> Retention settings saved. Audit log entry created.
        </div>
      )}

      {showConfirm && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-900">
            <i className="ri-alert-line mr-1"></i> Confirm Retention Change
          </p>
          <p className="mt-1 text-sm text-amber-800">
            You are about to change the retention period for this data category. This will apply to both existing and future records. Are you sure?
          </p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={applyChange} className="whitespace-nowrap rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700">
              Confirm Change
            </button>
            <button type="button" onClick={cancelChange} className="whitespace-nowrap rounded-md border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-foreground-200/60 bg-background-50">
        <table className="w-full">
          <thead className="border-b border-foreground-200/60 bg-background-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Data Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Current Retention</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground-100/60">
            {categories.map((cat) => (
              <tr key={cat.key} className="hover:bg-background-50/80">
                <td className="px-4 py-3 text-sm font-medium text-foreground-900">{cat.label}</td>
                <td className="px-4 py-3 text-sm text-foreground-500">{cat.description}</td>
                <td className="px-4 py-3">
                  {editingKey === cat.key ? (
                    <select
                      className="rounded-md border border-foreground-200/60 bg-background-50 px-2 py-1.5 text-sm text-foreground-800 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                      value={pendingPeriod}
                      onChange={(e) => setPendingPeriod(e.target.value)}
                    >
                      {retentionPeriodOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="inline-block rounded-full bg-secondary-100 px-2.5 py-0.5 text-xs font-medium text-secondary-800">
                      {cat.currentLabel}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingKey === cat.key ? (
                    <div className="flex gap-2">
                      <button type="button" onClick={confirmChange} className="text-xs font-medium text-primary-600 hover:text-primary-700">Save</button>
                      <button type="button" onClick={cancelChange} className="text-xs font-medium text-foreground-500 hover:text-foreground-700">Cancel</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => startChange(cat.key)} className="text-xs font-medium text-primary-600 hover:text-primary-700">
                      Change <i className="ri-arrow-right-line"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-4">
        <p className="text-xs text-foreground-500">
          Deletion automation is currently a placeholder. When Supabase is connected, records beyond their retention period will be automatically purged. Records marked "Keep until deleted" require manual deletion.
        </p>
      </div>
    </div>
  );
}