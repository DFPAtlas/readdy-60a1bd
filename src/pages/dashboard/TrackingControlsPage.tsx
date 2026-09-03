import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackingSettings, signageChecklist } from '@/mocks/complianceData';

export default function TrackingControlsPage() {
  const [settings, setSettings] = useState(trackingSettings);
  const [saved, setSaved] = useState(false);
  const [confirmNamedTracking, setConfirmNamedTracking] = useState(false);
  const [namedTrackingCheckbox, setNamedTrackingCheckbox] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<string | null>(null);

  const handleToggle = (key: string, currentValue: boolean) => {
    if (key === 'namedTrackingEnabled' && !currentValue) {
      setPendingToggle(key);
      setConfirmNamedTracking(true);
      return;
    }
    applyToggle(key, !currentValue);
  };

  const applyToggle = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value, lastUpdated: new Date().toISOString() }));
    setPendingToggle(null);
    setConfirmNamedTracking(false);
    setNamedTrackingCheckbox(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const confirmNamedChange = () => {
    if (pendingToggle && namedTrackingCheckbox) {
      applyToggle(pendingToggle, true);
    }
  };

  const cancelNamedChange = () => {
    setPendingToggle(null);
    setConfirmNamedTracking(false);
    setNamedTrackingCheckbox(false);
  };

  const toggleSignageItem = (id: string) => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/dashboard/compliance" className="flex items-center gap-1 text-sm text-foreground-500 hover:text-foreground-700">
            <i className="ri-arrow-left-line"></i> Back to Compliance
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-foreground-950">Tracking & Occupancy Controls</h1>
          <p className="mt-1 text-sm text-foreground-600">Control how workplace occupancy data is collected, displayed, and shared.</p>
        </div>
      </div>

      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <i className="ri-check-line mr-1"></i> Settings saved. Last updated {new Date(settings.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} by {settings.updatedBy}.
        </div>
      )}

      <div className="space-y-4">
        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground-950">Anonymous Occupancy Mode</h3>
              <p className="mt-1 text-sm text-foreground-500">Show occupancy without revealing staff names in reports and live views.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('anonymousOccupancyMode', settings.anonymousOccupancyMode)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.anonymousOccupancyMode ? 'bg-primary-500' : 'bg-foreground-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.anonymousOccupancyMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {settings.anonymousOccupancyMode && (
            <div className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              <i className="ri-check-line mr-1"></i> Staff names are hidden in reports and live occupancy views.
            </div>
          )}
        </div>

        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground-950">Named Tracking</h3>
              <p className="mt-1 text-sm text-foreground-500">Show which staff member is using a specific desk or area.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('namedTrackingEnabled', settings.namedTrackingEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.namedTrackingEnabled ? 'bg-red-500' : 'bg-foreground-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.namedTrackingEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {!settings.namedTrackingEnabled && (
            <div className="mt-3 rounded-md bg-foreground-50 px-3 py-2 text-xs text-foreground-600">
              <i className="ri-information-line mr-1"></i> Named tracking is disabled. Individual staff names are not shown in reports.
            </div>
          )}

          {confirmNamedTracking && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-900">
                <i className="ri-alert-line mr-1"></i> Enable Named Tracking?
              </p>
              <p className="mt-2 text-sm text-red-800">
                Named tracking can show which staff member used a desk or area. Make sure your organisation has clear policies, notices, and access controls in place before enabling this.
              </p>
              <label className="mt-3 flex items-center gap-2 text-sm text-red-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={namedTrackingCheckbox}
                  onChange={(e) => setNamedTrackingCheckbox(e.target.checked)}
                  className="h-4 w-4 rounded border-red-400 text-red-600 focus:ring-red-400"
                />
                I understand this setting affects staff data visibility.
              </label>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={confirmNamedChange} disabled={!namedTrackingCheckbox} className="whitespace-nowrap rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50">
                  Enable Named Tracking
                </button>
                <button type="button" onClick={cancelNamedChange} className="whitespace-nowrap rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-800 hover:bg-red-100">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground-950">Staff Data Access</h3>
              <p className="mt-1 text-sm text-foreground-500">Allow staff to view their own check-in history and workplace data via the My Data page.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('staffDataAccessEnabled', settings.staffDataAccessEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.staffDataAccessEnabled ? 'bg-primary-500' : 'bg-foreground-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.staffDataAccessEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {settings.staffDataAccessEnabled && (
            <div className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              <i className="ri-check-line mr-1"></i> Staff can access their own data via the My Data page in the staff portal.
            </div>
          )}
        </div>

        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground-950">Location Check-In</h3>
              <p className="mt-1 text-sm text-foreground-500">Enable location-based desk check-in features.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('locationCheckinEnabled', settings.locationCheckinEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.locationCheckinEnabled ? 'bg-primary-500' : 'bg-foreground-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.locationCheckinEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {settings.locationCheckinEnabled && (
            <div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <i className="ri-alert-line mr-1"></i> Location-based features should only be enabled when your organisation has reviewed privacy requirements and informed staff clearly.
            </div>
          )}
        </div>

        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground-950">Probe / Wi-Fi Analytics</h3>
              <p className="mt-1 text-sm text-foreground-500">Future placeholder for Wi-Fi and probe-based occupancy analytics.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('probeWifiEnabled', settings.probeWifiEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.probeWifiEnabled ? 'bg-red-500' : 'bg-foreground-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.probeWifiEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="mt-3 rounded-md bg-foreground-50 px-3 py-2 text-xs text-foreground-600">
            <i className="ri-information-line mr-1"></i> This feature is a future placeholder. Probe/Wi-Fi analytics may require clear signage, policy updates, DPIA review, and strict access controls.
          </div>
        </div>

        <div className="rounded-lg border border-foreground-200/60 bg-background-50 p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground-950">Signage Reminder</h3>
              <p className="mt-1 text-sm text-foreground-500">Reminders for physical signage when location or probe analytics are enabled.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('signageReminderEnabled', settings.signageReminderEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${settings.signageReminderEnabled ? 'bg-primary-500' : 'bg-foreground-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${settings.signageReminderEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="mt-4 border-t border-foreground-100 pt-4">
            <p className="text-sm font-medium text-foreground-700">Signage Checklist</p>
            <div className="mt-2 space-y-2">
              {signageChecklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleSignageItem(item.id)}
                  className="flex w-full items-center gap-3 text-sm text-left"
                >
                  <i className={`text-base ${item.done ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-blank-circle-line text-foreground-400'}`}></i>
                  <span className={item.done ? 'text-foreground-700 line-through' : 'text-foreground-600'}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}