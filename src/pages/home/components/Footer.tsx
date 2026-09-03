import { useState, type FormEvent } from 'react';
import { footerLinks } from '@/mocks/homeData';

const FORM_SUBMIT_ADDR = 'https://readdy.ai/api/form/d97uvjfk7gok24d49uag';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get('phone_alt') as string || '').trim();
    if (honeypot) {
      setStatus('success');
      setStatusMsg('Thanks for subscribing!');
      setEmail('');
      return;
    }

    formData.delete('phone_alt');

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
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1.5fr] gap-10 md:gap-12">
            <div>
              <h2 className="font-heading text-2xl md:text-4xl font-light text-background-50 mb-3">
                Stay in the loop
              </h2>
              <p className="text-sm text-background-50/60 leading-relaxed mb-8 max-w-sm">
                Get the latest workspace trends, product updates, and tips for running a smarter office — straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} data-readdy-form="" className="flex flex-col gap-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="bg-transparent border-0 border-b border-background-50/30 text-background-50 text-sm py-2.5 px-1 placeholder:text-background-50/40 focus:outline-none focus:border-background-50/60 transition-colors"
                />
                <input
                  type="text"
                  name="phone_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="form-anti-hp"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 bg-background-50 text-foreground-900 font-semibold text-sm px-6 py-3 rounded-full hover:bg-background-100 transition-colors whitespace-nowrap disabled:opacity-60 w-fit cursor-pointer"
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  <i className={`ri-${status === 'loading' ? 'loader-4-line animate-spin' : 'arrow-right-line'}`}></i>
                </button>
                {status !== 'idle' && (
                  <p className={`text-xs ${status === 'success' ? 'text-accent-300' : 'text-red-300'}`}>
                    {statusMsg}
                  </p>
                )}
              </form>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-background-50/60 hover:text-background-50 underline transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4 mt-8">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-background-50/60 hover:text-background-50 underline transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Contact</h3>
              <p className="text-sm text-background-50/60 mb-1">+44 20 7946 0958</p>
              <p className="text-sm text-background-50/60 mb-8">hello@hotdesk-hub.uk</p>

              <h3 className="text-sm font-semibold text-background-50/80 mb-4">Office</h3>
              <p className="text-sm text-background-50/60">
                3rd Floor, WeWork<br />
                1 St Katharine&rsquo;s Way<br />
                London E1W 1UN
              </p>

              <h3 className="text-sm font-semibold text-background-50/80 mb-4 mt-8">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-background-50/60 hover:text-background-50 underline transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-background-50/15">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-background-50/60 hover:text-background-50 underline transition-colors" rel="nofollow">Twitter</a>
              <a href="#" className="text-sm text-background-50/60 hover:text-background-50 underline transition-colors" rel="nofollow">LinkedIn</a>
              <a href="#" className="text-sm text-background-50/60 hover:text-background-50 underline transition-colors" rel="nofollow">Instagram</a>
            </div>

            <p className="text-xs text-background-50/40 text-center">
              &copy; {new Date().getFullYear()} HotDesk-Hub.uk. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-background-50/40 hover:text-background-50/70 underline transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-background-50/40 hover:text-background-50/70 underline transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}