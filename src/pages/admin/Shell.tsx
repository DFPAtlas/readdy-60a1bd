import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { adminSidebarLinks } from '@/mocks/authData';

export default function AdminShell() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href || (href !== '/admin' && location.pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-background-50 flex">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-foreground-900 border-r border-foreground-800 flex flex-col transition-all duration-300 sticky top-0 h-screen z-20`}>
        <div className="flex items-center gap-2 px-4 h-14 border-b border-foreground-800">
          <Link to="/admin" className="flex items-center gap-1.5 font-heading font-bold text-sm text-background-50 whitespace-nowrap">
            <span className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center text-background-50 text-[10px] font-bold flex-shrink-0">H</span>
            {sidebarOpen && 'HotDesk Hub'}
          </Link>
          {sidebarOpen && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400 bg-primary-900/30 px-2 py-0.5 rounded-full ml-auto">Admin</span>
          )}
        </div>

        {sidebarOpen && (
          <div className="px-3 py-3 border-b border-foreground-800">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-600 text-xs"></i>
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full bg-foreground-800 border border-foreground-700 rounded-lg pl-8 pr-3 py-2 text-xs text-background-50 placeholder:text-foreground-600 focus:outline-none focus:border-foreground-600 transition-colors"
              />
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {adminSidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? 'bg-primary-900/20 text-primary-400 font-semibold'
                  : 'text-foreground-500 hover:text-foreground-400 hover:bg-foreground-800'
              }`}
            >
              <i className={`${link.icon} text-base flex-shrink-0`}></i>
              {sidebarOpen && link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-foreground-800 px-3 py-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            {sidebarOpen && <span className="text-xs text-foreground-500">System Healthy</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 text-xs text-foreground-600 hover:text-foreground-400 transition-colors py-1.5 cursor-pointer"
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
              <Link to="/admin" className="hover:text-foreground-700 transition-colors">Admin</Link>
              {location.pathname !== '/admin' && (
                <>
                  <i className="ri-arrow-right-s-line text-xs"></i>
                  <span className="text-foreground-800 font-medium capitalize">{location.pathname.split('/').pop()?.replace(/-/g, ' ')}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 cursor-pointer hover:bg-background-100 rounded-lg px-2 py-1 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">PA</span>
                  <span className="text-sm text-foreground-700 hidden sm:block">Platform Admin</span>
                  <i className="ri-arrow-down-s-line text-foreground-400 text-xs hidden sm:block"></i>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-9 w-48 bg-background-50 border border-background-200/70 rounded-xl shadow-lg p-1 z-30">
                    <div className="px-3 py-2.5 border-b border-background-200/70">
                      <p className="text-sm font-semibold text-foreground-900">Platform Admin</p>
                      <p className="text-xs text-foreground-500">Super Admin</p>
                    </div>
                    <button className="w-full text-left px-3 py-2 text-sm text-foreground-600 hover:bg-background-100 rounded-md transition-colors cursor-pointer">Settings</button>
                    <button onClick={() => {}} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer">Logout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
          {location.pathname === '/admin' && (
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground-950 mb-1">Platform Overview</h1>
              <p className="text-sm text-foreground-500 mb-6">System-wide metrics and management.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Companies', value: '24', icon: 'ri-building-line', color: 'bg-primary-500' },
                  { label: 'Active Subscriptions', value: '18', icon: 'ri-bank-card-line', color: 'bg-accent-500' },
                  { label: 'Total Users', value: '1,247', icon: 'ri-team-line', color: 'bg-secondary-600' },
                  { label: 'Failed Payments', value: '2', icon: 'ri-error-warning-line', color: 'bg-amber-500' },
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
                <i className="ri-admin-line text-3xl text-foreground-300 mb-3 block"></i>
                <p className="text-sm text-foreground-500">
                  Full platform admin features will be available after connecting to Supabase.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}