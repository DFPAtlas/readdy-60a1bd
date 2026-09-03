import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { clientSidebarLinks } from '@/mocks/authData';

export default function DashboardShell() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCompany, setActiveCompany] = useState('Acme Corp');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href || (href !== '/dashboard' && location.pathname.startsWith(href));

  const user = { name: 'Alex Morgan', role: 'Company Owner', initials: 'AM' };

  return (
    <div className="min-h-screen bg-background-50 flex">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-background-50 border-r border-background-200/70 flex flex-col transition-all duration-300 sticky top-0 h-screen z-20`}>
        <div className="flex items-center gap-2 px-4 h-14 border-b border-background-200/70">
          <Link to="/dashboard" className="flex items-center gap-1.5 font-heading font-bold text-sm text-foreground-900 whitespace-nowrap">
            <span className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center text-background-50 text-[10px] font-bold flex-shrink-0">H</span>
            {sidebarOpen && 'HotDesk Hub'}
          </Link>
        </div>

        {sidebarOpen && (
          <div className="px-3 py-3 border-b border-background-200/70">
            <button
              onClick={() => setActiveCompany(activeCompany === 'Acme Corp' ? 'Beta Ltd' : 'Acme Corp')}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-background-100 transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded bg-accent-100 flex items-center justify-center text-accent-700 text-[10px] font-bold flex-shrink-0">
                {activeCompany.charAt(0)}
              </span>
              <span className="text-xs font-medium text-foreground-800 truncate">{activeCompany}</span>
              <i className="ri-arrow-down-s-line text-foreground-400 text-xs ml-auto"></i>
            </button>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {clientSidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-foreground-600 hover:bg-background-100'
              }`}
            >
              <i className={`${link.icon} text-base flex-shrink-0`}></i>
              {sidebarOpen && link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-background-200/70 px-3 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 text-xs text-foreground-400 hover:text-foreground-600 transition-colors py-1.5 cursor-pointer"
          >
            <i className={`${sidebarOpen ? 'ri-arrow-left-line' : 'ri-arrow-right-line'}`}></i>
            {sidebarOpen && 'Collapse'}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-10">
          <div className="flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm text-foreground-500">
              <Link to="/dashboard" className="hover:text-foreground-700 transition-colors">Dashboard</Link>
              {location.pathname !== '/dashboard' && (
                <>
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  <span className="text-foreground-800 font-medium capitalize">{location.pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors cursor-pointer relative"
                  aria-label="Notifications"
                >
                  <i className="ri-notification-3-line text-foreground-600"></i>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full"></span>
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-10 w-72 bg-background-50 border border-background-200/70 rounded-xl shadow-lg p-2 z-30">
                    <div className="px-3 py-2 border-b border-background-200/70">
                      <p className="text-sm font-semibold text-foreground-900">Notifications</p>
                    </div>
                    <div className="py-3 px-3">
                      <p className="text-xs text-foreground-500">3 new staff check-ins this morning</p>
                      <p className="text-[10px] text-foreground-400 mt-1">10 minutes ago</p>
                    </div>
                    <div className="py-3 px-3 border-t border-background-200/70">
                      <p className="text-xs text-foreground-500">Desk A-023 reported for maintenance</p>
                      <p className="text-[10px] text-foreground-400 mt-1">1 hour ago</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 cursor-pointer hover:bg-background-100 rounded-lg px-2 py-1 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                    {user.initials}
                  </span>
                  <span className="text-sm text-foreground-700 hidden sm:block">{user.name}</span>
                  <i className="ri-arrow-down-s-line text-foreground-400 text-xs hidden sm:block"></i>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-9 w-48 bg-background-50 border border-background-200/70 rounded-xl shadow-lg p-1 z-30">
                    <div className="px-3 py-2.5 border-b border-background-200/70">
                      <p className="text-sm font-semibold text-foreground-900">{user.name}</p>
                      <p className="text-xs text-foreground-500">{user.role}</p>
                    </div>
                    <button className="w-full text-left px-3 py-2 text-sm text-foreground-600 hover:bg-background-100 rounded-md transition-colors cursor-pointer">Settings</button>
                    <button onClick={() => { /* logout placeholder */ }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer">Logout</button>
                  </div>
                )}
              </div>

              <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors cursor-pointer" aria-label="Help">
                <i className="ri-question-line text-foreground-600"></i>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
          {location.pathname === '/dashboard' && (
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground-950 mb-1">Dashboard Overview</h1>
              <p className="text-sm text-foreground-500 mb-6">Welcome back! Here&rsquo;s what&rsquo;s happening across your workplace.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Active Desks', value: '47/60', icon: 'ri-computer-line', color: 'bg-primary-500' },
                  { label: 'Checked In', value: '32 staff', icon: 'ri-user-location-line', color: 'bg-accent-500' },
                  { label: 'Open Issues', value: '3', icon: 'ri-error-warning-line', color: 'bg-amber-500' },
                  { label: 'Sites Online', value: '2/2', icon: 'ri-building-line', color: 'bg-secondary-600' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background-50 border border-background-200/70 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <i className={`${stat.icon} text-background-50 text-sm`}></i>
                      </div>
                      <span className="text-xs text-foreground-500 font-medium">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-heading font-bold text-foreground-950">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-background-100 border border-background-200/70 rounded-xl p-6 text-center">
                <i className="ri-dashboard-line text-3xl text-foreground-300 mb-3 block"></i>
                <p className="text-sm text-foreground-500">
                  Full dashboard analytics, occupancy charts, and AI insights will be available after connecting to Supabase.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}