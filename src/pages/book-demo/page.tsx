import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useState, type FormEvent } from 'react';

const FORM_SUBMIT_ADDR = 'https://readdy.ai/api/form/d97vhm2g3iubr452i8n0';

export default function BookDemo() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get('website_alt') as string || '').trim();
    if (honeypot) {
      setStatus('success');
      setStatusMsg('Demo request submitted! We will be in touch soon.');
      return;
    }
    formData.delete('website_alt');

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
        setStatusMsg('Demo request submitted! We will be in touch soon.');
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
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background-50">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
              <div>
                <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Book Demo</span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground-950 mb-4">
                  Book a HotDesk Hub demo
                </h1>
                <p className="text-base text-foreground-600 leading-relaxed mb-8">
                  Tell us about your workplace and we will show you how HotDesk Hub can support your desk management, occupancy analytics, and workplace intelligence goals.
                </p>

                <form onSubmit={handleSubmit} data-readdy-form="" className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">First name *</label>
                      <input type="text" name="first_name" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Last name *</label>
                      <input type="text" name="last_name" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Work email *</label>
                      <input type="email" name="email" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Phone number</label>
                      <input type="tel" name="phone" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Company name *</label>
                      <input type="text" name="company" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Job title</label>
                      <input type="text" name="job_title" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of desks</label>
                      <input type="number" name="desks" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of staff</label>
                      <input type="number" name="staff" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of sites</label>
                      <input type="number" name="sites" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">Interested plan</label>
                    <select name="plan" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors">
                      <option value="">Select a plan</option>
                      <option value="Basic">Basic</option>
                      <option value="Professional">Professional</option>
                      <option value="Intelligence">Intelligence</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">What do you need help with?</label>
                    <textarea name="message" rows={4} maxLength={500} className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors resize-none" placeholder="Tell us about your workplace and what you would like to see in the demo..."></textarea>
                    <p className="text-xs text-foreground-400 mt-1">Max 500 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">Preferred demo date/time</label>
                    <input type="text" name="preferred_time" placeholder="e.g. Tuesday afternoon, next week" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" name="consent" id="demo-consent" required className="mt-1 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                    <label htmlFor="demo-consent" className="text-xs text-foreground-500 leading-relaxed">
                      I agree to HotDesk Hub processing my data to arrange a demo. I understand I can opt out at any time.
                    </label>
                  </div>

                  <input type="text" name="website_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly className="form-anti-hp" />

                  <button type="submit" disabled={status === 'loading'} className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap disabled:opacity-60 cursor-pointer">
                    {status === 'loading' ? 'Submitting...' : 'Request Demo'}
                    <i className="ri-arrow-right-line"></i>
                  </button>

                  {status !== 'idle' && (
                    <p className={`text-sm ${status === 'success' ? 'text-accent-600' : 'text-red-500'}`}>{statusMsg}</p>
                  )}
                </form>
              </div>

              <div className="lg:pt-8">
                <div className="bg-background-100 border border-background-200/70 rounded-xl p-6 sticky top-24">
                  <h3 className="font-heading font-bold text-foreground-900 mb-4">In your demo, see:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-foreground-700">
                      <i className="ri-qr-scan-2-line text-accent-600"></i> QR/NFC check-in in action
                    </li>
                    <li className="flex items-center gap-3 text-sm text-foreground-700">
                      <i className="ri-dashboard-line text-accent-600"></i> Live dashboard walkthrough
                    </li>
                    <li className="flex items-center gap-3 text-sm text-foreground-700">
                      <i className="ri-money-pound-circle-line text-accent-600"></i> Pricing and plan options
                    </li>
                    <li className="flex items-center gap-3 text-sm text-foreground-700">
                      <i className="ri-shield-check-line text-accent-600"></i> Privacy controls overview
                    </li>
                    <li className="flex items-center gap-3 text-sm text-foreground-700">
                      <i className="ri-road-map-line text-accent-600"></i> Rollout planning discussion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}