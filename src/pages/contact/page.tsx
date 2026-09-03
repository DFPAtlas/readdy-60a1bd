import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { useState, type FormEvent } from 'react';

const FORM_SUBMIT_ADDR = 'https://readdy.ai/api/form/d97vhm2g3iubr452i8ng';

const contactCards = [
  { title: 'Sales', email: 'sales@hotdesk-hub.uk', phone: '+44 20 7946 0958', icon: 'ri-store-2-line' },
  { title: 'Support', email: 'support@hotdesk-hub.uk', phone: '+44 20 7946 0959', icon: 'ri-customer-service-2-line' },
  { title: 'Enterprise', email: 'enterprise@hotdesk-hub.uk', phone: '+44 20 7946 0960', icon: 'ri-building-2-line' },
  { title: 'Billing', email: 'billing@hotdesk-hub.uk', phone: '+44 20 7946 0961', icon: 'ri-bank-card-line' },
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = (formData.get('mobile_alt') as string || '').trim();
    if (honeypot) {
      setStatus('success');
      setStatusMsg('Message sent! We will get back to you soon.');
      return;
    }
    formData.delete('mobile_alt');

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
        setStatusMsg('Message sent! We will get back to you soon.');
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
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold text-accent-600 bg-accent-100 px-3 py-1 rounded-full mb-4">Contact</span>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground-950 mb-4">Get in touch</h1>
              <p className="text-base text-foreground-600 max-w-xl mx-auto leading-relaxed">
                Have a question about HotDesk Hub, pricing, setup, or enterprise integrations? Send us a message.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">
              <form onSubmit={handleSubmit} data-readdy-form="" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">Name *</label>
                    <input type="text" name="name" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">Email *</label>
                    <input type="email" name="email" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">Company</label>
                    <input type="text" name="company" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-800 mb-1.5">Phone</label>
                    <input type="tel" name="phone" className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-800 mb-1.5">Enquiry type *</label>
                  <select name="enquiry_type" required className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors">
                    <option value="">Select enquiry type</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground-800 mb-1.5">Message *</label>
                  <textarea name="message" required rows={5} maxLength={500} className="w-full bg-background-50 border border-background-200/70 rounded-md px-4 py-2.5 text-sm text-foreground-900 focus:outline-none focus:border-primary-300 transition-colors resize-none" placeholder="How can we help you?"></textarea>
                  <p className="text-xs text-foreground-400 mt-1">Max 500 characters</p>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" name="consent" id="contact-consent" required className="mt-1 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                  <label htmlFor="contact-consent" className="text-xs text-foreground-500 leading-relaxed">
                    I agree to HotDesk Hub processing my data to respond to my enquiry. I understand I can opt out at any time.
                  </label>
                </div>

                <input type="text" name="mobile_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly className="form-anti-hp" />

                <button type="submit" disabled={status === 'loading'} className="inline-flex items-center gap-2 bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap disabled:opacity-60 cursor-pointer">
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  <i className="ri-send-plane-line"></i>
                </button>

                {status !== 'idle' && (
                  <p className={`text-sm ${status === 'success' ? 'text-accent-600' : 'text-red-500'}`}>{statusMsg}</p>
                )}
              </form>

              <div className="space-y-4">
                {contactCards.map((card) => (
                  <div key={card.title} className="bg-background-100 border border-background-200/70 rounded-xl p-5 flex items-start gap-4 hover:border-accent-200 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${card.icon} text-accent-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground-900 mb-1">{card.title}</h4>
                      <p className="text-xs text-foreground-500">{card.email}</p>
                      <p className="text-xs text-foreground-500">{card.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}