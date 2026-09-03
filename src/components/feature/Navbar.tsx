import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavDropdown {
  label: string;
  items: { label: string; href: string; description?: string }[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: 'Product',
    items: [
      { label: 'Features', href: '/features', description: 'Everything HotDesk Hub can do' },
      { label: 'How It Works', href: '/how-it-works', description: 'A tour of the platform' },
      { label: 'Security', href: '/security', description: 'How we protect your workplace data' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'Solutions', href: '/solutions', description: 'Built for every workplace' },
      { label: 'Enterprise', href: '/enterprise', description: 'Scale with integrations & SLA support' },
    ],
  },
  {
    label: 'Pricing',
    items: [
      { label: 'Plans', href: '/pricing', description: 'Simple desk-based pricing' },
      { label: 'AI Credits', href: '/pricing#ai-credits', description: 'Add intelligence to your workplace' },
      { label: 'Add-ons', href: '/pricing#add-ons', description: 'Extend your platform' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'Contact', href: '/contact', description: 'Get in touch with our team' },
      { label: 'Book a Demo', href: '/book-demo', description: 'See HotDesk Hub in action' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (dropdown: NavDropdown) =>
    dropdown.items.some((item) => {
      if (item.href.includes('#')) return location.pathname === item.href.split('#')[0];
      return location.pathname === item.href;
    });

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/'
          ? 'bg-background-50/95 backdrop-blur-md border-b border-background-200/70 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-foreground-900 whitespace-nowrap flex-shrink-0">
          <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-sm font-bold">H</span>
          HotDesk Hub
        </Link>

        {/* Desktop nav links with dropdowns */}
        <div className="hidden lg:flex items-center gap-1">
          {navDropdowns.map((dropdown) => (
            <div
              key={dropdown.label}
              ref={(el) => { dropdownRefs.current[dropdown.label] = el; }}
              className="relative"
              onMouseEnter={() => handleMouseEnter(dropdown.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === dropdown.label ? null : dropdown.label)}
                className={`group flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isDropdownActive(dropdown)
                    ? 'text-foreground-950'
                    : 'text-foreground-600 hover:text-foreground-900 hover:bg-background-100'
                }`}
              >
                {dropdown.label}
                <i className={`ri-arrow-down-s-line text-xs transition-transform duration-200 ${openDropdown === dropdown.label ? 'rotate-180' : 'group-hover:translate-y-[1px]'}`}></i>
              </button>

              {openDropdown === dropdown.label && (
                <div
                  className="absolute top-full left-0 mt-1 w-60 bg-background-50 border border-background-200/70 rounded-lg shadow-lg py-2 z-50 animate-[dropdownIn_0.18s_ease-out] origin-top"
                  onMouseEnter={() => handleMouseEnter(dropdown.label)}
                >
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`group/item block px-4 py-2.5 mx-1 rounded-md transition-all duration-150 ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-700 translate-x-1'
                          : 'text-foreground-700 hover:bg-background-100 hover:text-foreground-950 hover:translate-x-1'
                      }`}
                    >
                      <div className="text-sm font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-foreground-500 mt-0.5 transition-colors duration-150 group-hover/item:text-foreground-600">{item.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          <Link
            to="/login"
            className="text-sm font-medium text-foreground-600 hover:text-foreground-900 transition-all duration-200 whitespace-nowrap px-3 py-2 rounded-md hover:bg-background-100 cursor-pointer"
          >
            Login
          </Link>
          <Link
            to="/book-demo"
            className="text-sm font-semibold border border-primary-500 text-primary-600 hover:bg-primary-50 hover:scale-[1.02] transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-md cursor-pointer"
          >
            Book Demo
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold bg-primary-500 text-background-50 hover:bg-primary-600 hover:scale-[1.02] transition-all duration-200 whitespace-nowrap px-4 py-2 rounded-md cursor-pointer"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center text-foreground-900 flex-shrink-0 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`}></i>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background-50 border-b border-background-200/70 px-4 py-2 flex flex-col max-h-[80vh] overflow-y-auto">
          {navDropdowns.map((dropdown) => (
            <div key={dropdown.label} className="border-b border-background-100/70 last:border-0">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === dropdown.label ? null : dropdown.label)}
                className="w-full flex items-center justify-between py-3 px-2 text-sm font-medium text-foreground-800 cursor-pointer"
              >
                {dropdown.label}
                <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileExpanded === dropdown.label ? 'rotate-180' : ''}`}></i>
              </button>
              {mobileExpanded === dropdown.label && (
                <div className="pb-2 space-y-0.5">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`block py-2.5 px-4 text-sm rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-900'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2 pt-3 mt-1">
            <Link to="/login" className="text-sm font-medium text-foreground-700 hover:text-foreground-950 py-2.5 px-3 rounded-md border border-background-300/60 text-center transition-colors cursor-pointer">Login</Link>
            <Link to="/book-demo" className="text-sm font-semibold text-primary-600 hover:bg-primary-50 py-2.5 px-3 rounded-md border border-primary-300 text-center transition-colors cursor-pointer">Book Demo</Link>
            <Link to="/signup" className="text-sm font-semibold bg-primary-500 text-background-50 hover:bg-primary-600 py-2.5 px-3 rounded-md text-center transition-colors cursor-pointer">Get Started</Link>
          </div>
        </div>
      )}

      {/* CSS keyframe for dropdownIn */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: scaleY(0.95) translateY(-6px); }
          to { opacity: 1; transform: scaleY(1) translateY(0); }
        }
      `}</style>
    </nav>
  );
}