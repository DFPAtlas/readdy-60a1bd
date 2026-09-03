import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { completeOnboarding, inviteStaff, updatePrivacySettings } from '@/services/authService';
import { onboardingSteps, companySizes, industries, deskTypes, deskStatuses, dataRetentionPeriods } from '@/mocks/authData';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const [cpName, setCpName] = useState('');
  const [cpTradingName, setCpTradingName] = useState('');
  const [cpAddress, setCpAddress] = useState('');
  const [cpMainContact, setCpMainContact] = useState('');
  const [cpBillingContact, setCpBillingContact] = useState('');
  const [cpSupportContact, setCpSupportContact] = useState('');
  const [cpTimezone, setCpTimezone] = useState('Europe/London');
  const [cpLanguage, setCpLanguage] = useState('English');

  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [sitePostcode, setSitePostcode] = useState('');
  const [siteContact, setSiteContact] = useState('');
  const [siteManager, setSiteManager] = useState('');
  const [sitePhone, setSitePhone] = useState('');
  const [siteEmail, setSiteEmail] = useState('');
  const [siteType, setSiteType] = useState('single');

  const [buildings, setBuildings] = useState([{ name: '', floors: [{ name: '', label: '' }] }]);

  const [areas, setAreas] = useState([{ name: '', floor: '', description: '', capacity: 10, manager: '', accessRules: '' }]);

  const [deskSetupMethod, setDeskSetupMethod] = useState<'manual' | 'bulk' | 'csv' | null>(null);
  const [manualDesks, setManualDesks] = useState([{ name: '', area: '', floor: '', type: 'standard desk', status: 'draft' }]);
  const [bulkPrefix, setBulkPrefix] = useState('');
  const [bulkCount, setBulkCount] = useState(10);
  const [bulkStart, setBulkStart] = useState(1);
  const [bulkArea, setBulkArea] = useState('');
  const [bulkFloor, setBulkFloor] = useState('');

  const [staffList, setStaffList] = useState([{ name: '', email: '', role: 'staff_user', site: '', area: '' }]);
  const [skipInvites, setSkipInvites] = useState(false);

  const [privacySettings, setPrivacySettings] = useState({
    staffPrivacyNotice: true,
    workplaceMonitoringPolicy: true,
    dataRetention: '90',
    anonymousOccupancyMode: false,
    namedTracking: false,
    staffDataAccess: true,
    auditLogs: true,
    locationCheckin: false,
    probeWifiData: false,
    showSignageReminder: true,
  });

  const handleContinue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('idle');
    setStatusMsg('');

    if (step === 6 && !skipInvites) {
      setStatus('loading');
      try {
        const validInvites = staffList.filter((s) => s.name && s.email);
        await inviteStaff(validInvites);
      } catch { /* placeholder */ }
      setStatus('idle');
    }

    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLaunch = async () => {
    setStatus('loading');
    try {
      await updatePrivacySettings(privacySettings);
      await completeOnboarding('demo-company');
      navigate('/dashboard');
    } catch {
      setStatus('error');
      setStatusMsg('Onboarding completion requires backend connection.');
    }
  };

  const updateBuilding = (i: number, field: string, value: string) => {
    const updated = [...buildings];
    (updated[i] as Record<string, unknown>)[field] = value;
    setBuildings(updated);
  };

  const updateFloor = (bi: number, fi: number, field: string, value: string) => {
    const updated = [...buildings];
    (updated[bi].floors[fi] as Record<string, unknown>)[field] = value;
    setBuildings(updated);
  };

  const addBuilding = () => setBuildings([...buildings, { name: '', floors: [{ name: '', label: '' }] }]);
  const addFloor = (bi: number) => {
    const updated = [...buildings];
    updated[bi].floors.push({ name: '', label: '' });
    setBuildings(updated);
  };

  const updateArea = (i: number, field: string, value: string | number) => {
    const updated = [...areas];
    (updated[i] as Record<string, unknown>)[field] = value;
    setAreas(updated);
  };

  const addArea = () => setAreas([...areas, { name: '', floor: '', description: '', capacity: 10, manager: '', accessRules: '' }]);

  const updateStaff = (i: number, field: string, value: string) => {
    const updated = [...staffList];
    (updated[i] as Record<string, unknown>)[field] = value;
    setStaffList(updated);
  };

  const addStaff = () => setStaffList([...staffList, { name: '', email: '', role: 'staff_user', site: '', area: '' }]);

  const progressPct = Math.round((step / totalSteps) * 100);

  const stepTitle = onboardingSteps[step - 1];

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <section className="pt-16 pb-16 md:pt-24 md:pb-24 bg-background-50 min-h-screen">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-2 font-heading font-bold text-lg text-foreground-900 whitespace-nowrap mb-6">
                <span className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-xs font-bold">H</span>
                HotDesk Hub
              </Link>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="font-heading text-xl md:text-2xl font-bold text-foreground-950">
                    Set up your first workplace
                  </h1>
                  <span className="text-xs font-medium text-foreground-500">{progressPct}% complete</span>
                </div>
                <div className="w-full h-2 bg-background-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  {onboardingSteps.map((s) => (
                    <div
                      key={s.step}
                      className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                        s.step === step ? 'text-primary-700' : s.step < step ? 'text-accent-600' : 'text-foreground-400'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        s.step < step ? 'bg-accent-500 text-background-50' : s.step === step ? 'bg-primary-500 text-background-50' : 'bg-background-200 text-foreground-500'
                      }`}>
                        {s.step < step ? <i className="ri-check-line"></i> : s.step}
                      </span>
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-background-50 border border-background-200/70 rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <i className={`${stepTitle.icon} text-lg text-primary-600`}></i>
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground-950">{stepTitle.label}</h2>
                  <p className="text-xs text-foreground-500">Step {step} of {totalSteps}</p>
                </div>
              </div>

              <form onSubmit={step === totalSteps ? (e) => { e.preventDefault(); handleLaunch(); } : handleContinue} className="space-y-5" noValidate>
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Company name *</label>
                        <input type="text" value={cpName} onChange={(e) => setCpName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Trading name</label>
                        <input type="text" value={cpTradingName} onChange={(e) => setCpTradingName(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Company address</label>
                      <input type="text" value={cpAddress} onChange={(e) => setCpAddress(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Main contact</label>
                        <input type="text" value={cpMainContact} onChange={(e) => setCpMainContact(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Billing contact</label>
                        <input type="text" value={cpBillingContact} onChange={(e) => setCpBillingContact(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Support contact</label>
                        <input type="text" value={cpSupportContact} onChange={(e) => setCpSupportContact(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Timezone</label>
                        <select value={cpTimezone} onChange={(e) => setCpTimezone(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all">
                          <option>Europe/London</option>
                          <option>Europe/Paris</option>
                          <option>America/New_York</option>
                          <option>America/Chicago</option>
                          <option>America/Los_Angeles</option>
                          <option>Asia/Singapore</option>
                          <option>Australia/Sydney</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Default language</label>
                        <select value={cpLanguage} onChange={(e) => setCpLanguage(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all">
                          <option>English</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Spanish</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Site name *</label>
                        <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Postcode</label>
                        <input type="text" value={sitePostcode} onChange={(e) => setSitePostcode(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Site address</label>
                      <input type="text" value={siteAddress} onChange={(e) => setSiteAddress(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Site contact</label>
                        <input type="text" value={siteContact} onChange={(e) => setSiteContact(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Site manager</label>
                        <input type="text" value={siteManager} onChange={(e) => setSiteManager(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-2">Site type</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: 'single', label: 'Single building' },
                          { value: 'multiple', label: 'Multiple buildings' },
                          { value: 'remote', label: 'Remote / Hybrid' },
                        ].map((opt) => (
                          <label key={opt.value} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                            siteType === opt.value ? 'border-primary-500 bg-primary-50/50' : 'border-background-200/70 hover:border-background-300/60'
                          }`}>
                            <input type="radio" name="site_type" value={opt.value} checked={siteType === opt.value} onChange={() => setSiteType(opt.value)} className="sr-only" />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    {buildings.map((b, bi) => (
                      <div key={bi} className="border border-background-200/70 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground-800">Building {bi + 1}</p>
                          {buildings.length > 1 && (
                            <button type="button" onClick={() => setBuildings(buildings.filter((_, i) => i !== bi))} className="text-xs text-red-500 hover:text-red-600 cursor-pointer">Remove</button>
                          )}
                        </div>
                        <input type="text" value={b.name} onChange={(e) => updateBuilding(bi, 'name', e.target.value)} placeholder="Building name" className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                        {b.floors.map((f, fi) => (
                          <div key={fi} className="flex gap-3 items-center">
                            <input type="text" value={f.name} onChange={(e) => updateFloor(bi, fi, 'name', e.target.value)} placeholder={`Floor ${fi + 1} name`} className="flex-1 bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                            <input type="text" value={f.label} onChange={(e) => updateFloor(bi, fi, 'label', e.target.value)} placeholder="Label" className="w-32 bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                            {b.floors.length > 1 && (
                              <button type="button" onClick={() => { const upd = [...buildings]; upd[bi].floors = upd[bi].floors.filter((_, j) => j !== fi); setBuildings(upd); }} className="text-xs text-red-500 hover:text-red-600 cursor-pointer whitespace-nowrap">Remove</button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => addFloor(bi)} className="text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                          <i className="ri-add-line mr-1"></i>Add floor
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={addBuilding} className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                      <i className="ri-add-line mr-1"></i>Add another building
                    </button>
                  </>
                )}

                {step === 4 && (
                  <>
                    {areas.map((a, i) => (
                      <div key={i} className="border border-background-200/70 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground-800">Area {i + 1}</p>
                          {areas.length > 1 && (
                            <button type="button" onClick={() => setAreas(areas.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600 cursor-pointer">Remove</button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input type="text" value={a.name} onChange={(e) => updateArea(i, 'name', e.target.value)} placeholder="Area name (e.g. Sales Zone)" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                          <input type="text" value={a.floor} onChange={(e) => updateArea(i, 'floor', e.target.value)} placeholder="Floor" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input type="text" value={a.description} onChange={(e) => updateArea(i, 'description', e.target.value)} placeholder="Description" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                          <input type="number" value={a.capacity} onChange={(e) => updateArea(i, 'capacity', Number(e.target.value))} placeholder="Capacity" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                          <input type="text" value={a.manager} onChange={(e) => updateArea(i, 'manager', e.target.value)} placeholder="Manager" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                        </div>
                        <input type="text" value={a.accessRules} onChange={(e) => updateArea(i, 'accessRules', e.target.value)} placeholder="Access rules (e.g. Engineering team only)" className="w-full bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                      </div>
                    ))}
                    <button type="button" onClick={addArea} className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                      <i className="ri-add-line mr-1"></i>Add area
                    </button>
                  </>
                )}

                {step === 5 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-2">Setup method</label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { value: 'manual', label: 'Create manually', icon: 'ri-edit-line' },
                          { value: 'bulk', label: 'Bulk create', icon: 'ri-stack-line' },
                          { value: 'csv', label: 'Upload CSV', icon: 'ri-file-excel-2-line' },
                        ].map((opt) => (
                          <label key={opt.value} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                            deskSetupMethod === opt.value ? 'border-primary-500 bg-primary-50/50' : 'border-background-200/70 hover:border-background-300/60'
                          }`}>
                            <input type="radio" name="desk_method" value={opt.value} checked={deskSetupMethod === opt.value} onChange={() => setDeskSetupMethod(opt.value as 'manual' | 'bulk' | 'csv')} className="sr-only" />
                            <i className={`${opt.icon} text-foreground-600`}></i>
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {deskSetupMethod === 'manual' && (
                      <div className="space-y-3">
                        {manualDesks.map((d, i) => (
                          <div key={i} className="flex flex-wrap gap-2 items-center">
                            <input type="text" value={d.name} onChange={(e) => { const upd = [...manualDesks]; upd[i].name = e.target.value; setManualDesks(upd); }} placeholder="Desk name" className="flex-1 min-w-[120px] bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                            <input type="text" value={d.area} onChange={(e) => { const upd = [...manualDesks]; upd[i].area = e.target.value; setManualDesks(upd); }} placeholder="Area" className="w-28 bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                            <select value={d.type} onChange={(e) => { const upd = [...manualDesks]; upd[i].type = e.target.value; setManualDesks(upd); }} className="w-36 bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all">
                              {deskTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            {manualDesks.length > 1 && (
                              <button type="button" onClick={() => setManualDesks(manualDesks.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600 cursor-pointer">Remove</button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => setManualDesks([...manualDesks, { name: '', area: '', floor: '', type: 'standard desk', status: 'draft' }])} className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                          <i className="ri-add-line mr-1"></i>Add desk
                        </button>
                      </div>
                    )}

                    {deskSetupMethod === 'bulk' && (
                      <div className="bg-background-100 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-foreground-600 mb-1">Desk prefix</label>
                            <input type="text" value={bulkPrefix} onChange={(e) => setBulkPrefix(e.target.value)} placeholder="e.g. A" className="w-full bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground-600 mb-1">Number of desks</label>
                            <input type="number" value={bulkCount} onChange={(e) => setBulkCount(Number(e.target.value))} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground-600 mb-1">Starting number</label>
                            <input type="number" value={bulkStart} onChange={(e) => setBulkStart(Number(e.target.value))} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground-600 mb-1">Area</label>
                            <input type="text" value={bulkArea} onChange={(e) => setBulkArea(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary-400 transition-all" />
                          </div>
                        </div>
                        <p className="text-xs text-foreground-500">
                          Preview: {bulkPrefix}-{String(bulkStart).padStart(3, '0')} to {bulkPrefix}-{String(bulkStart + bulkCount - 1).padStart(3, '0')}
                        </p>
                      </div>
                    )}

                    {deskSetupMethod === 'csv' && (
                      <div className="border-2 border-dashed border-background-300 rounded-lg p-8 text-center">
                        <i className="ri-upload-cloud-2-line text-3xl text-foreground-400 mb-2 block"></i>
                        <p className="text-sm text-foreground-500 mb-1">CSV upload placeholder</p>
                        <p className="text-xs text-foreground-400">Upload a CSV with desk names, areas, floors, and types. Available after Supabase connection.</p>
                      </div>
                    )}
                  </>
                )}

                {step === 6 && (
                  <>
                    <div className="flex items-start gap-3 mb-4">
                      <input type="checkbox" checked={skipInvites} onChange={(e) => setSkipInvites(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                      <label className="text-sm text-foreground-700">I&rsquo;ll invite staff later</label>
                    </div>

                    {!skipInvites && (
                      <div className="space-y-3">
                        {staffList.map((s, i) => (
                          <div key={i} className="border border-background-200/70 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-foreground-800">Staff {i + 1}</p>
                              {staffList.length > 1 && (
                                <button type="button" onClick={() => setStaffList(staffList.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600 cursor-pointer">Remove</button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input type="text" value={s.name} onChange={(e) => updateStaff(i, 'name', e.target.value)} placeholder="Name" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                              <input type="email" value={s.email} onChange={(e) => updateStaff(i, 'email', e.target.value)} placeholder="Email" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <select value={s.role} onChange={(e) => updateStaff(i, 'role', e.target.value)} className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all">
                                <option value="staff_user">Staff User</option>
                                <option value="site_manager">Site Manager</option>
                                <option value="floor_manager">Floor Manager</option>
                                <option value="company_admin">Company Admin</option>
                                <option value="billing_admin">Billing Admin</option>
                                <option value="auditor">Auditor</option>
                                <option value="installer">Installer</option>
                              </select>
                              <input type="text" value={s.site} onChange={(e) => updateStaff(i, 'site', e.target.value)} placeholder="Assigned site" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                              <input type="text" value={s.area} onChange={(e) => updateStaff(i, 'area', e.target.value)} placeholder="Assigned area/team" className="bg-background-50 border border-background-200/70 rounded-lg px-3 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all" />
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={addStaff} className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                          <i className="ri-add-line mr-1"></i>Add staff member
                        </button>
                      </div>
                    )}
                  </>
                )}

                {step === 7 && (
                  <>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
                      <p className="text-sm text-amber-800 leading-relaxed">
                        <i className="ri-information-line mr-1.5"></i>
                        HotDesk Hub is designed as a privacy-first workplace platform. Before staff begin using the system, set your workplace data and monitoring controls.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'staffPrivacyNotice', label: 'Enable staff privacy notice', desc: 'Provide clear notices explaining what data is collected and why.' },
                        { key: 'workplaceMonitoringPolicy', label: 'Enable workplace monitoring policy', desc: 'Support with policy tools and clear internal communication.' },
                        { key: 'staffDataAccess', label: 'Allow staff access to their own data', desc: 'Staff can view, export, and manage their personal workplace data.' },
                        { key: 'auditLogs', label: 'Enable audit logs', desc: 'Track key actions across admin, staff, privacy, data, and billing workflows.' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={(privacySettings as Record<string, unknown>)[item.key] as boolean}
                            onChange={(e) => setPrivacySettings({ ...privacySettings, [item.key]: e.target.checked })}
                            className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400"
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground-800">{item.label}</p>
                            <p className="text-xs text-foreground-500">{item.desc}</p>
                          </div>
                        </label>
                      ))}

                      <div className="border-t border-background-200/70 pt-4">
                        <p className="text-sm font-semibold text-foreground-800 mb-3">Tracking & Analytics Controls</p>

                        {[
                          { key: 'anonymousOccupancyMode', label: 'Allow anonymous occupancy mode', desc: 'View usage data without named staff tracking. Recommended for privacy-first workplaces.', warn: false },
                          { key: 'namedTracking', label: 'Enable named tracking', desc: 'Track individual check-ins by name. Disabled by default.', warn: true, warnMsg: 'Named tracking identifies individual staff. Ensure your workplace monitoring policy is in place and staff have been notified.' },
                          { key: 'locationCheckin', label: 'Enable location check-in', desc: 'Optional location confirmation for check-ins. Disabled by default unless your plan includes it.', warn: true, warnMsg: 'Location tracking requires clear staff communication and policy controls.' },
                          { key: 'probeWifiData', label: 'Enable probe/Wi-Fi data', desc: 'Advanced occupancy analytics via network data. Disabled by default.', warn: true, warnMsg: 'Wi-Fi/location analytics require clear signage and policy controls. Ensure compliance with local regulations before enabling.' },
                        ].map((item) => (
                          <label key={item.key} className="flex items-start gap-3 cursor-pointer mb-3">
                            <input
                              type="checkbox"
                              checked={(privacySettings as Record<string, unknown>)[item.key] as boolean}
                              onChange={(e) => setPrivacySettings({ ...privacySettings, [item.key]: e.target.checked })}
                              className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400"
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground-800">{item.label}</p>
                              <p className="text-xs text-foreground-500">{item.desc}</p>
                              {item.warn && (privacySettings as Record<string, unknown>)[item.key] && (
                                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-1.5 mt-1.5">
                                  <i className="ri-error-warning-line mr-1"></i>{item.warnMsg}
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="border-t border-background-200/70 pt-4">
                        <label className="block text-sm font-medium text-foreground-800 mb-2">Data retention period</label>
                        <select
                          value={privacySettings.dataRetention}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, dataRetention: e.target.value })}
                          className="w-full sm:w-64 bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all"
                        >
                          {dataRetentionPeriods.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacySettings.showSignageReminder}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, showSignageReminder: e.target.checked })}
                          className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground-800">Show signage reminder</p>
                          <p className="text-xs text-foreground-500">Remind admins that clear physical signage is recommended when Wi-Fi or location analytics are active.</p>
                        </div>
                      </label>
                    </div>
                  </>
                )}

                {step === 8 && (
                  <>
                    <h3 className="font-heading text-lg font-bold text-foreground-950 mb-1">Ready to launch</h3>
                    <p className="text-sm text-foreground-500 mb-5">Review your setup before launching your HotDesk Hub workplace.</p>

                    <div className="space-y-2 mb-6">
                      {[
                        { label: 'Company profile', status: cpName ? 'complete' : 'incomplete' },
                        { label: 'First site added', status: siteName ? 'complete' : 'incomplete' },
                        { label: 'Buildings & floors created', status: buildings.some((b) => b.name) ? 'complete' : 'incomplete' },
                        { label: 'Hot desk areas created', status: areas.some((a) => a.name) ? 'complete' : 'incomplete' },
                        { label: 'Desks configured', status: deskSetupMethod ? 'complete' : 'incomplete' },
                        { label: 'Staff invited', status: skipInvites ? 'skipped' : staffList.some((s) => s.email) ? 'complete' : 'incomplete' },
                        { label: 'Privacy settings configured', status: 'complete' },
                        { label: 'Billing active', status: 'complete' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 py-2">
                          <i className={`${
                            item.status === 'complete' ? 'ri-checkbox-circle-fill text-accent-500' : item.status === 'skipped' ? 'ri-indeterminate-circle-line text-foreground-400' : 'ri-checkbox-blank-circle-line text-foreground-300'
                          } text-lg`}></i>
                          <span className={`text-sm ${item.status === 'complete' ? 'text-foreground-800' : 'text-foreground-500'}`}>
                            {item.label}
                          </span>
                          {item.status === 'skipped' && <span className="text-[10px] text-foreground-400 bg-background-100 px-2 py-0.5 rounded-full">SKIPPED</span>}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {status === 'error' && (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">{statusMsg}</p>
                )}

                <div className="flex gap-3 pt-2">
                  {step > 1 && (
                    <button type="button" onClick={() => { setStep(step - 1); setStatus('idle'); }} className="flex-1 border border-background-300/60 text-foreground-800 font-semibold text-sm py-3 rounded-lg hover:bg-background-100 transition-colors whitespace-nowrap cursor-pointer">
                      Back
                    </button>
                  )}
                  {step === totalSteps ? (
                    <button type="submit" disabled={status === 'loading'} className="flex-1 bg-primary-500 text-background-50 font-semibold text-sm py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60">
                      {status === 'loading' ? 'Launching...' : 'Launch Dashboard'}
                      <i className="ri-rocket-line ml-2"></i>
                    </button>
                  ) : (
                    <button type="submit" className="flex-1 bg-primary-500 text-background-50 font-semibold text-sm py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer">
                      {step === 6 && !skipInvites && staffList.some((s) => s.email) ? 'Send Invites & Continue' : 'Continue'}
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}