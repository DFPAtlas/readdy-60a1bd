import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockDesks } from '@/mocks/workspaceData';

export default function StaffCheckInPage() {
  const [searchParams] = useSearchParams();
  const deskParam = searchParams.get('desk') || searchParams.get('tag');
  const [desk, setDesk] = useState<typeof mockDesks[0] | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'found' | 'occupied' | 'maintenance' | 'no_access' | 'logged_out'>('idle');
  const [scanInput, setScanInput] = useState('');

  useEffect(() => {
    if (deskParam) {
      const found = mockDesks.find(d => d.code === deskParam || d.name === deskParam || d.id === deskParam);
      if (found) {
        setDesk(found);
        if (found.status === 'occupied') setStatus('occupied');
        else if (found.status === 'maintenance') setStatus('maintenance');
        else setStatus('found');
      }
    }
  }, [deskParam]);

  const handleManualScan = () => {
    if (!scanInput.trim()) return;
    const found = mockDesks.find(d => d.code === scanInput.trim() || d.name === scanInput.trim());
    if (found) {
      setDesk(found);
      if (found.status === 'occupied') setStatus('occupied');
      else if (found.status === 'maintenance') setStatus('maintenance');
      else setStatus('found');
    }
  };

  const handleCheckIn = () => {
    if (!desk) return;
    setCheckedIn(true);
    setCheckInTime(new Date().toISOString());
    setStatus('idle');
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
    setDesk(null);
    setStatus('idle');
  };

  const deskTypeIcon = (type: string) => {
    if (type.includes('standing')) return 'ri-body-scan-line';
    if (type.includes('quiet')) return 'ri-volume-mute-line';
    if (type.includes('accessible')) return 'ri-wheelchair-line';
    if (type.includes('dual')) return 'ri-tv-2-line';
    if (type.includes('visitor')) return 'ri-user-received-line';
    if (type.includes('team')) return 'ri-team-line';
    if (type.includes('manager')) return 'ri-vip-crown-line';
    return 'ri-computer-line';
  };

  return (
    <div className="min-h-screen bg-background-50 pb-20">
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
        <div className="max-w-[600px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/staff" className="flex items-center gap-1.5 cursor-pointer">
            <i className="ri-arrow-left-line text-foreground-600"></i>
            <span className="text-sm font-medium text-foreground-700">Back</span>
          </Link>
          <h1 className="font-heading text-sm font-bold text-foreground-900">Desk Check-In</h1>
          <div className="w-14"></div>
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-4 pt-6">
        {checkedIn && desk && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Checked In!</h2>
            <p className="text-sm text-foreground-500 mb-6">You&rsquo;re now at <strong className="text-foreground-800">{desk.name}</strong></p>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-4 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center`}>
                  <i className={`${deskTypeIcon(desk.type)} text-primary-600 text-lg`}></i>
                </div>
                <div>
                  <p className="font-semibold text-foreground-900 text-sm">{desk.name}</p>
                  <p className="text-xs text-foreground-500 capitalize">{desk.type} &middot; {desk.area_name}</p>
                </div>
              </div>
              <div className="text-xs text-foreground-500 space-y-1">
                <p>Site: {desk.site_name}</p>
                <p>Floor: {desk.floor_name}</p>
                {checkInTime && <p>Checked in: {new Date(checkInTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>}
              </div>
            </div>
            <p className="text-[11px] text-foreground-400 mb-4">Your desk check-in is recorded so your workplace can manage desk availability and occupancy. You can view your own data in My Data.</p>
            <button onClick={handleCheckOut} className="w-full bg-accent-500 text-background-50 py-3 rounded-xl text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap">
              Check Out
            </button>
            <Link to="/staff/issues" className="block w-full mt-3 text-sm font-medium text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer text-center py-2">Report an issue with this desk</Link>
          </div>
        )}

        {!checkedIn && status === 'idle' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <i className="ri-qr-scan-line text-3xl text-primary-500"></i>
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Scan Desk Tag</h2>
              <p className="text-sm text-foreground-500">Point your camera at the QR code or tap the NFC tag on the desk.</p>
            </div>

            <div className="bg-background-50 border-2 border-dashed border-background-300/60 rounded-xl p-8 text-center mb-4">
              <div className="w-40 h-40 mx-auto bg-background-100 rounded-xl flex items-center justify-center mb-3">
                <i className="ri-qr-code-line text-5xl text-foreground-300"></i>
              </div>
              <p className="text-xs text-foreground-400">Camera preview will appear here when connected to Supabase.</p>
            </div>

            <div className="bg-background-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-foreground-500 mb-2">Or enter desk code manually</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={scanInput}
                  onChange={e => setScanInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleManualScan(); }}
                  placeholder="e.g. A-001"
                  className="flex-1 px-3 py-2.5 bg-background-50 border border-background-200/70 rounded-lg text-sm text-foreground-800 focus:outline-none focus:border-primary-400"
                />
                <button onClick={handleManualScan} className="bg-primary-500 text-background-50 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
                  Look Up
                </button>
              </div>
            </div>
          </div>
        )}

        {!checkedIn && status === 'found' && desk && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-double-line text-3xl text-green-500"></i>
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Desk Found</h2>
              <p className="text-sm text-foreground-500">This desk is available. Ready to check in?</p>
            </div>

            <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center`}>
                  <i className={`${deskTypeIcon(desk.type)} text-primary-600 text-lg`}></i>
                </div>
                <div>
                  <p className="font-semibold text-foreground-900 text-sm">{desk.name}</p>
                  <p className="text-xs text-foreground-500 capitalize">{desk.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Available</span>
              </div>
              <div className="mt-3 text-xs text-foreground-500 space-y-1">
                <p>Site: {desk.site_name}</p>
                <p>Building: {desk.building_id ? '—' : '—'} Floor: {desk.floor_name}</p>
                <p>Area: {desk.area_name}</p>
              </div>
            </div>

            <button onClick={handleCheckIn} className="w-full bg-primary-500 text-background-50 py-3 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              Check In to {desk.name}
            </button>

            <Link to="/staff/issues" className="block w-full mt-3 text-sm font-medium text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer text-center py-2">Report an issue</Link>
          </div>
        )}

        {status === 'occupied' && desk && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-location-line text-3xl text-accent-500"></i>
            </div>
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Desk Occupied</h2>
            <p className="text-sm text-foreground-500 mb-6">This desk is currently occupied. Please choose another desk.</p>
            <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-4">
              <p className="font-semibold text-foreground-900 text-sm">{desk.name}</p>
              <p className="text-xs text-foreground-500">{desk.current_user || 'Someone'} is currently using this desk</p>
            </div>
            <Link to="/staff/find-desk" className="w-full inline-block bg-primary-500 text-background-50 py-3 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              Find Another Desk
            </Link>
          </div>
        )}

        {status === 'maintenance' && desk && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-foreground-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-tools-line text-3xl text-foreground-400"></i>
            </div>
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">Unavailable</h2>
            <p className="text-sm text-foreground-500 mb-6">This desk is currently unavailable due to maintenance.</p>
            <Link to="/staff/find-desk" className="w-full inline-block bg-primary-500 text-background-50 py-3 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">
              Find Another Desk
            </Link>
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
            <Link key={link.href} to={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-w-0 ${link.href === '/staff/check-in' ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'}`}>
              <i className={`${link.icon} text-lg`}></i>
              <span className="text-[10px] font-medium whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}