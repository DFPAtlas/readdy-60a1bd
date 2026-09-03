import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

const FORM_SUBMIT_ADDR = 'https://readdy.ai/api/form/d97uvjfk7gok24d49uag';

const footerColumns = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'QR/NFC Desk Check-In', href: '/features' },
    { label: 'AI Analytics', href: '/features' },
    { label: 'Floorplans', href: '/features' },
    { label: 'Enterprise', href: '/enterprise' },
  ],
  solutions: [
    { label: 'Hybrid Offices', href: '/solutions' },
    { label: 'Facilities Managers', href: '/solutions' },
    { label: 'Office Managers', href: '/solutions' },
    { label: 'Multi-Site Companies', href: '/solutions' },
    { label: 'Enterprise Workplaces', href: '/enterprise' },
  ],
  resources: [
    { label: 'Help Centre', href: '#' },
    { label: 'Security', href: '/security' },
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms', href: '/legal/terms' },
    { label: 'Workplace Monitoring Policy', href: '/legal/workplace-monitoring' },
    { label: 'Data Processing Agreement', href: '/legal/data-processing' },
    { label: 'DPIA Support', href: '/legal/dpia' },
  ],
  account: [
    { label: 'Login', href: '/login' },
    { label: 'Client Portal', href: '/login' },
    { label: 'Staff Portal', href: '/login' },
    { label: 'Admin Portal', href: '/login' },
    { label: 'Book Demo', href: '/book-demo' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get('company_alt') as string || '').trim();
    if (honeypot) {
      setStatus('success');
      setStatusMsg('Thanks for subscribing!');
      setEmail('');
      return;
    }

    formData.delete('company_alt');

    setStatus('loading');
    try {
      const res = await fetch(FORM_SUBMIT_ADDR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      const text = await res.text();
      let parsed: Record<string, unknown> = {};
      try { parsed = JSON.parse(text); } catch { /* ignore */ }

      const code = (parsed?.code as string) || '';
      const msg = (parsed?.meta as Record<string, unknown>)?.message as string || (parsed?.message as string) || '';

      if (res.ok && code === 'OK') {
        setStatus('success');
        setStatusMsg('Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setStatusMsg(msg || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Network error. Please try again.');
    }
  };

  return (
    <footer className="bg-background-50 pt-16 md:pt-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="bg-foreground-900 rounded-2xl px-6 md:px-12 py-12 md:py-16 text-background-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10">
            <div>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Product</h3>
              <ul className="space-y-3">
                {footerColumns.product.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-background-50/60 hover:text-background-50 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Solutions</h3>
              <ul className="space-y-3">
                {footerColumns.solutions.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-background-50/60 hover:text-background-50 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerColumns.resources.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href} className="text-sm text-background-50/60 hover:text-background-50 transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm text-background-50/60 hover:text-background-50 transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Account</h3>
              <ul className="space-y-3">
                {footerColumns.account.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-background-50/60 hover:text-background-50 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-background-50/15 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-background-50/80 mb-2">Stay in the loop</h3>
              <p className="text-xs text-background-50/50 mb-4 leading-relaxed">
                Product updates, workplace insights, and tips for running a smarter office — straight to your inbox.
              </p>
              <form onSubmit={handleSubmit} data-readdy-form="" className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border border-background-50/20 text-background-50 text-sm py-2.5 px-4 rounded-full placeholder:text-background-50/40 focus:outline-none focus:border-background-50/50 transition-colors"
                />
                <input
                  type="text"
                  name="company_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="form-anti-hp"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 bg-background-50 text-foreground-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-background-100 transition-colors whitespace-nowrap disabled:opacity-60 cursor-pointer"
                >
                  {status === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
              {status !== 'idle' && (
                <p className={`text-xs mt-2 ${status === 'success' ? 'text-accent-300' : 'text-red-300'}`}>
                  {statusMsg}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-background-50/15">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-primary-500 flex items-center justify-center text-background-50 text-xs font-bold">H</span>
              <span className="text-sm font-semibold text-background-50">HotDesk Hub</span>
            </div>

            <p className="text-xs text-background-50/30">Smart Spaces. Smarter Work.</p>

            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-background-50/50 hover:text-background-50 transition-colors" rel="nofollow">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="text-sm text-background-50/50 hover:text-background-50 transition-colors" rel="nofollow">
                <i className="ri-linkedin-line"></i>
              </a>
            </div>

            <p className="text-xs text-background-50/40">
              &copy; {new Date().getFullYear()} HotDesk Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}