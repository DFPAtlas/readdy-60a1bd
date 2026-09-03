import { Link } from 'react-router-dom';
import { staffPortalCards, staffNavLinks } from '@/mocks/authData';
import { useState } from 'react';

export default function StaffPortal() {
  const [activeNav, setActiveNav] = useState('Home');
  const name = 'Sarah';

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background-50 pb-20">
      <header className="bg-background-50 border-b border-background-200/70 sticky top-0 z-30">
        <div className="max-w-[600px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 font-heading font-bold text-sm text-foreground-900 whitespace-nowrap">
            <span className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center text-background-50 text-[10px] font-bold">H</span>
            HotDesk Hub
          </Link>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-background-100 text-foreground-600 hover:bg-background-200 transition-colors cursor-pointer" aria-label="Notifications">
              <i className="ri-notification-3-line"></i>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
              {name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-4 pt-6">
        <div className="mb-6">
          <h1 className="font-heading text-xl font-bold text-foreground-950">
            {greeting()}, {name} <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-foreground-500 mt-1">Ready to find your desk for today?</p>
        </div>

        <div className="mb-6">
          <Link
            to="/staff/check-in"
            className="block bg-primary-500 text-background-50 rounded-xl p-5 hover:bg-primary-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <i className="ri-qr-scan-line text-2xl"></i>
              </div>
              <div>
                <p className="font-heading font-bold text-base">Quick Check-In</p>
                <p className="text-xs text-white/80 mt-0.5">Scan a QR code or tap NFC to check into a desk</p>
              </div>
              <i className="ri-arrow-right-s-line text-xl ml-auto"></i>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {staffPortalCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="bg-background-50 border border-background-200/70 rounded-xl p-4 hover:border-background-300/60 transition-colors cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                <i className={`${card.icon} text-lg text-background-50`}></i>
              </div>
              <h3 className="text-sm font-semibold text-foreground-900 mb-1 group-hover:text-primary-600 transition-colors">{card.title}</h3>
              <p className="text-xs text-foreground-500 leading-relaxed">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-background-100 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-100 flex items-center justify-center">
              <i className="ri-information-line text-accent-600"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground-800">You&rsquo;re not checked in</p>
              <p className="text-xs text-foreground-500">Scan a desk tag or find an available desk to get started.</p>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background-50 border-t border-background-200/70 z-30">
        <div className="max-w-[600px] mx-auto px-2 py-2 flex items-center justify-around">
          {staffNavLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => setActiveNav(link.label)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-w-0 ${
                activeNav === link.label ? 'text-primary-600' : 'text-foreground-400 hover:text-foreground-600'
              }`}
            >
              <i className={`${link.icon} text-lg`}></i>
              <span className="text-[10px] font-medium whitespace-nowrap">{link.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}