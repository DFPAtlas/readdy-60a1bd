import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockDesks, mockCheckIns } from '@/mocks/workspaceData';

export default function StaffCurrentDeskPage() {
  const [hasActiveCheckIn] = useState(true);
  const activeCheckIn = hasActiveCheckIn ? mockCheckIns.find(c => c.status === 'active' && c.user_id === 'user_stf_01') : null;
  const desk = activeCheckIn ? mockDesks.find(d => d.id === activeCheckIn.desk_id) : null;
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckOut = () => { setCheckedOut(true); };

  const formatDuration = (start: string) => {
    const mins = Math.floor((Date.now() - new Date(start).getTime()) / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  if (checkedOut || !hasActiveCheckIn || !desk) {
    return (
      <div className="min-h-screen bg-background-50 pb-20">
        <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
          <div className="max-w-[600px] mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/staff" className="flex items-center gap-1.5 cursor-pointer">
              <i className="ri-arrow-left-line text-foreground-600"></i>
              <span className="text-sm font-medium text-foreground-700">Back</span>
            </Link>
            <h1 className="font-heading text-sm font-bold text-foreground-900">Current Desk</h1>
            <div className="w-14"></div>
          </div>
        </header>
        <main className="max-w-[600px] mx-auto px-4 pt-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-4">
            <i className="ri-computer-line text-3xl text-foreground-300"></i>
          </div>
          <h2 className="font-heading text-lg font-bold text-foreground-950 mb-1">{checkedOut ? 'Checked Out' : 'Not checked in'}</h2>
          <p className="text-sm text-foreground-500 mb-6">{checkedOut ? 'You have successfully checked out.' : 'You are not currently checked into a desk.'}</p>
          <div className="flex items-center gap-3 justify-center">
            <Link to="/staff/find-desk" className="bg-primary-500 text-background-50 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap">Find Desk</Link>
            <Link to="/staff/check-in" className="bg-background-100 text-foreground-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">Scan Desk</Link>
          </div>
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
              <Link key={link.href} to={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-w-0 ${link.href === '/staff/current-desk' ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'}`}>
                <i className={`${link.icon} text-lg`}></i>
                <span className="text-[10px] font-medium whitespace-nowrap">{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50 pb-20">
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
        <div className="max-w-[600px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/staff" className="flex items-center gap-1.5 cursor-pointer">
            <i className="ri-arrow-left-line text-foreground-600"></i>
            <span className="text-sm font-medium text-foreground-700">Back</span>
          </Link>
          <h1 className="font-heading text-sm font-bold text-foreground-900">Current Desk</h1>
          <div className="w-14"></div>
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-4 pt-4">
        <div className="bg-primary-50 border border-primary-200/50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-1 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs font-medium text-green-700">Checked in</span>
          </div>
          <p className="text-xs text-primary-600">{formatDuration(activeCheckIn!.checked_in_at)} so far</p>
        </div>

        <div className="bg-background-50 border border-background-200/70 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <i className="ri-computer-line text-primary-600 text-lg"></i>
            </div>
            <div>
              <p className="font-semibold text-foreground-900 text-sm">{desk.name}</p>
              <p className="text-xs text-foreground-500 capitalize">{desk.type}</p>
            </div>
          </div>
          <div className="text-xs text-foreground-500 space-y-1">
            <p>Site: {desk.site_name}</p>
            <p>Building: — Floor: {desk.floor_name}</p>
            <p>Area: {desk.area_name}</p>
            <p>Checked in: {new Date(activeCheckIn!.checked_in_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        <button onClick={handleCheckOut} className="w-full bg-accent-500 text-background-50 py-3 rounded-xl text-sm font-semibold hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap mb-3">
          Check Out
        </button>

        <Link to={`/staff/issues?desk=${desk.code}`} className="w-full block text-center text-sm font-medium bg-background-100 text-foreground-600 py-3 rounded-xl hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap">
          <i className="ri-error-warning-line mr-1"></i> Report an Issue
        </Link>
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
            <Link key={link.href} to={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-w-0 ${link.href === '/staff/current-desk' ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'}`}>
              <i className={`${link.icon} text-lg`}></i>
              <span className="text-[10px] font-medium whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}