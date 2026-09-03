import { useState, useEffect } from 'react';
import { navLinks } from '@/mocks/homeData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-50/95 backdrop-blur-md border-b border-background-200/70'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-16 md:h-18 px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-foreground-900 whitespace-nowrap">
          <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-sm font-bold">H</span>
          HotDesk-Hub
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-sm font-medium text-foreground-700 hover:text-foreground-950 transition-colors whitespace-nowrap px-4 py-2"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="text-sm font-semibold bg-primary-500 text-background-50 hover:bg-primary-600 transition-colors whitespace-nowrap px-5 py-2.5 rounded-md"
          >
            Get Started
          </a>
        </div>

        <button
          className="md:hidden w-9 h-9 flex items-center justify-center text-foreground-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`}></i>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background-50 border-b border-background-200/70 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground-700 hover:text-foreground-950 py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-background-200/70">
            <a href="/login" className="flex-1 text-center text-sm font-medium text-foreground-700 hover:text-foreground-950 py-2.5 rounded-md border border-background-300/60 transition-colors">Sign In</a>
            <a href="/signup" className="flex-1 text-center text-sm font-semibold bg-primary-500 text-background-50 hover:bg-primary-600 py-2.5 rounded-md transition-colors">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}