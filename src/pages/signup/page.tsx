import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { createAccount, createCompany, selectPlan, startStripeCheckout } from '@/services/authService';
import { companySizes, industries } from '@/mocks/authData';

const plans = [
  {
    slug: 'basic',
    name: 'Basic',
    price: '£49/month',
    perDesk: '£1.50/desk',
    basePrice: 49,
    deskRate: 1.5,
    desc: 'QR/NFC check-ins for small offices.',
    features: ['1 site', '50 staff', 'QR/NFC check-in', 'Basic dashboard', '5,000 AI credits'],
    badge: null,
  },
  {
    slug: 'professional',
    name: 'Professional',
    price: '£149/month',
    perDesk: '£2.50/desk',
    basePrice: 149,
    deskRate: 2.5,
    desc: 'Multi-site tools and reporting.',
    features: ['3 sites', '250 staff', 'Occupancy trends', 'Floorplan upload', '50,000 AI credits'],
    badge: 'Most popular',
  },
  {
    slug: 'intelligence',
    name: 'Intelligence',
    price: '£399/month',
    perDesk: '£4.00/desk',
    basePrice: 399,
    deskRate: 4,
    desc: 'AI analytics and advanced insights.',
    features: ['10 sites', '1,000 staff', 'AI analytics', 'Heatmaps', '250,000 AI credits'],
    badge: 'AI powered',
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: 'From £999/month',
    perDesk: 'Custom',
    basePrice: 999,
    deskRate: 0,
    desc: 'Large organisations and estates.',
    features: ['Unlimited sites', 'Custom staff', 'Local gateway', 'SLA support', 'Custom AI credits'],
    badge: 'Custom',
  },
];

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [postcode, setPostcode] = useState('');
  const [contactRole, setContactRole] = useState('');

  const [numDesks, setNumDesks] = useState(20);
  const [numStaff, setNumStaff] = useState(30);
  const [numSites, setNumSites] = useState(1);
  const [numBuildings, setNumBuildings] = useState(1);
  const [numFloors, setNumFloors] = useState(2);
  const [numAreas, setNumAreas] = useState(2);
  const [needFloorplans, setNeedFloorplans] = useState(false);
  const [needAiAnalytics, setNeedAiAnalytics] = useState(false);
  const [needLocationIntel, setNeedLocationIntel] = useState(false);
  const [needProbeWifi, setNeedProbeWifi] = useState(false);
  const [needAdvanced, setNeedAdvanced] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState('');

  const getRecommendedPlan = () => {
    if (numSites > 3 || numStaff > 250 || needProbeWifi || needAdvanced) return 'enterprise';
    if (numSites > 1 || numStaff > 50 || needLocationIntel || needAiAnalytics) return 'intelligence';
    if (numStaff > 25 || needFloorplans) return 'professional';
    return 'basic';
  };

  const getEstimatedTotal = (planSlug: string) => {
    const plan = plans.find((p) => p.slug === planSlug);
    if (!plan) return 0;
    return plan.basePrice + plan.deskRate * numDesks;
  };

  const handleContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      if (password !== confirmPassword) {
        setStatus('error');
        setStatusMsg('Passwords do not match.');
        return;
      }
      if (password.length < 8) {
        setStatus('error');
        setStatusMsg('Password must be at least 8 characters.');
        return;
      }
      if (!acceptTerms || !acceptPrivacy) {
        setStatus('error');
        setStatusMsg('Please accept the Terms of Use and Privacy Policy.');
        return;
      }
    }

    if (step === 3) {
      const recommended = getRecommendedPlan();
      setSelectedPlan(recommended);
    }

    setStatus('idle');
    setStatusMsg('');
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedPlan === 'enterprise') {
      navigate('/contact');
      return;
    }

    setStatus('loading');
    try {
      await createAccount({ firstName, lastName, email, password, phone, companyName, companySize, industry, country, postcode, role: contactRole });
      await createCompany({ name: companyName, website: companyWebsite, size: companySize, industry, country, postcode, contactRole });
      await selectPlan(selectedPlan, numDesks);
      const checkout = await startStripeCheckout(selectedPlan, numDesks);
      if (checkout.success) {
        navigate('/onboarding');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Account creation is not yet connected. This will link to Supabase Auth and Stripe Checkout in the next phase.');
    }
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <div className="min-h-screen bg-background-50">
      <main>
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-background-50 min-h-screen">
          <div className="max-w-[700px] mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <Link to="/" className="inline-flex items-center gap-2 font-heading font-bold text-xl text-foreground-900 whitespace-nowrap mb-8">
                <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-sm font-bold">H</span>
                HotDesk Hub
              </Link>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
                Start building your smarter workplace
              </h1>
              <p className="text-sm text-foreground-500">
                Create your HotDesk Hub account, choose a plan, and begin setting up your first workplace.
              </p>

              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      i + 1 === step
                        ? 'bg-primary-500 text-background-50'
                        : i + 1 < step
                          ? 'bg-accent-500 text-background-50'
                          : 'bg-background-200 text-foreground-400'
                    }`}>
                      {i + 1 < step ? <i className="ri-check-line"></i> : i + 1}
                    </span>
                    {i < totalSteps - 1 && <span className="w-6 h-0.5 bg-background-200"></span>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-foreground-400 mt-2">
                Step {step} of {totalSteps}:{' '}
                <span className="font-medium text-foreground-600">
                  {step === 1 ? 'Your Details' : step === 2 ? 'Company Details' : step === 3 ? 'Workplace Estimate' : step === 4 ? 'Plan Selection' : 'Checkout Review'}
                </span>
              </p>
            </div>

            <div className="bg-background-50 border border-background-200/70 rounded-xl p-6 md:p-8">
              <form onSubmit={step === totalSteps ? handleSubmit : handleContinue} className="space-y-5" noValidate>
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="su-first-name" className="block text-sm font-medium text-foreground-800 mb-1.5">First name *</label>
                        <input id="su-first-name" type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label htmlFor="su-last-name" className="block text-sm font-medium text-foreground-800 mb-1.5">Last name *</label>
                        <input id="su-last-name" type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="su-email" className="block text-sm font-medium text-foreground-800 mb-1.5">Work email *</label>
                      <input id="su-email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label htmlFor="su-phone" className="block text-sm font-medium text-foreground-800 mb-1.5">Phone number</label>
                      <input id="su-phone" type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="+44 20 1234 5678" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="su-password" className="block text-sm font-medium text-foreground-800 mb-1.5">Password *</label>
                        <input id="su-password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="Min 8 characters" />
                      </div>
                      <div>
                        <label htmlFor="su-confirm" className="block text-sm font-medium text-foreground-800 mb-1.5">Confirm password *</label>
                        <input id="su-confirm" type="password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="Re-enter password" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                        <span className="text-xs text-foreground-600 leading-relaxed">
                          I accept the{' '}
                          <Link to="/legal/terms" className="text-primary-600 hover:text-primary-700 underline">Terms of Use</Link>
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                        <span className="text-xs text-foreground-600 leading-relaxed">
                          I accept the{' '}
                          <Link to="/legal/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</Link>
                        </span>
                      </label>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="su-company" className="block text-sm font-medium text-foreground-800 mb-1.5">Company name *</label>
                        <input id="su-company" type="text" name="company_name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label htmlFor="su-website" className="block text-sm font-medium text-foreground-800 mb-1.5">Company website</label>
                        <input id="su-website" type="url" name="website" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="https://company.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="su-size" className="block text-sm font-medium text-foreground-800 mb-1.5">Company size *</label>
                        <select id="su-size" name="company_size" value={companySize} onChange={(e) => setCompanySize(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all">
                          <option value="">Select company size</option>
                          {companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="su-industry" className="block text-sm font-medium text-foreground-800 mb-1.5">Industry *</label>
                        <select id="su-industry" name="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all">
                          <option value="">Select industry</option>
                          {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="su-country" className="block text-sm font-medium text-foreground-800 mb-1.5">Country</label>
                        <input id="su-country" type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="United Kingdom" />
                      </div>
                      <div>
                        <label htmlFor="su-postcode" className="block text-sm font-medium text-foreground-800 mb-1.5">Postcode</label>
                        <input id="su-postcode" type="text" name="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="su-role" className="block text-sm font-medium text-foreground-800 mb-1.5">Main contact role</label>
                      <input id="su-role" type="text" name="contact_role" value={contactRole} onChange={(e) => setContactRole(e.target.value)} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="e.g. Office Manager, Facilities Director" />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <p className="text-sm text-foreground-500 mb-1">Tell us about your workplace so we can recommend the right plan.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of desks</label>
                        <input type="number" name="desks" value={numDesks} onChange={(e) => setNumDesks(Number(e.target.value))} min={1} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of staff</label>
                        <input type="number" name="staff" value={numStaff} onChange={(e) => setNumStaff(Number(e.target.value))} min={1} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of sites</label>
                        <input type="number" name="sites" value={numSites} onChange={(e) => setNumSites(Number(e.target.value))} min={1} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of buildings</label>
                        <input type="number" name="buildings" value={numBuildings} onChange={(e) => setNumBuildings(Number(e.target.value))} min={1} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of floors</label>
                        <input type="number" name="floors" value={numFloors} onChange={(e) => setNumFloors(Number(e.target.value))} min={1} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground-800 mb-1.5">Number of hot desk areas</label>
                        <input type="number" name="areas" value={numAreas} onChange={(e) => setNumAreas(Number(e.target.value))} min={1} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <p className="text-xs font-medium text-foreground-600 uppercase tracking-wide">Additional needs</p>
                      {[
                        { label: 'Need floorplans?', value: needFloorplans, set: setNeedFloorplans },
                        { label: 'Need AI analytics?', value: needAiAnalytics, set: setNeedAiAnalytics },
                        { label: 'Need location intelligence?', value: needLocationIntel, set: setNeedLocationIntel },
                        { label: 'Need probe/Wi-Fi analytics?', value: needProbeWifi, set: setNeedProbeWifi },
                        { label: 'Need access control, CCTV, sensors, or local gateway?', value: needAdvanced, set: setNeedAdvanced },
                      ].map((item) => (
                        <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" checked={item.value} onChange={(e) => item.set(e.target.checked)} className="w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                          <span className="text-sm text-foreground-700">{item.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-primary-800 mb-1">
                        <i className="ri-lightbulb-line mr-1.5"></i>
                        Recommended plan: <span className="uppercase">{recommendedPlan}</span>
                      </p>
                      <p className="text-xs text-primary-600">
                        Based on {numDesks} desks, {numStaff} staff, and {numSites} site(s).
                      </p>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <p className="text-sm text-foreground-500 mb-1">Choose the plan that fits your workplace.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {plans.map((plan) => (
                        <label
                          key={plan.slug}
                          className={`relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedPlan === plan.slug
                              ? 'border-primary-500 bg-primary-50/50'
                              : 'border-background-200/70 hover:border-background-300/60'
                          }`}
                        >
                          {plan.badge && (
                            <span className={`absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                              plan.badge === 'Most popular'
                                ? 'bg-primary-500 text-background-50'
                                : plan.badge === 'AI powered'
                                  ? 'bg-accent-500 text-background-50'
                                  : 'bg-foreground-800 text-background-50'
                            }`}>
                              {plan.badge}
                            </span>
                          )}
                          <input
                            type="radio"
                            name="plan"
                            value={plan.slug}
                            checked={selectedPlan === plan.slug}
                            onChange={() => setSelectedPlan(plan.slug)}
                            className="sr-only"
                          />
                          <p className="text-sm font-bold text-foreground-950">{plan.name}</p>
                          <p className="text-lg font-heading font-bold text-foreground-950 mt-1">
                            {plan.price}
                            <span className="text-xs font-normal text-foreground-500 ml-1">{plan.perDesk}</span>
                          </p>
                          <p className="text-xs text-foreground-500 mt-1">{plan.desc}</p>
                          <ul className="mt-3 space-y-1">
                            {plan.features.map((f) => (
                              <li key={f} className="text-xs text-foreground-600 flex items-start gap-1.5">
                                <i className="ri-check-line text-primary-500 mt-0.5 flex-shrink-0"></i>
                                {f}
                              </li>
                            ))}
                          </ul>
                          {selectedPlan === plan.slug && (
                            <p className="text-xs font-semibold text-primary-700 mt-2">
                              Estimated: ~£{getEstimatedTotal(plan.slug).toFixed(0)}/month
                            </p>
                          )}
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {step === 5 && (
                  <>
                    {selectedPlan === 'enterprise' ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                          <i className="ri-building-line text-2xl text-amber-600"></i>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-foreground-950 mb-2">Enterprise Plan</h3>
                        <p className="text-sm text-foreground-500 mb-4">
                          Our team will create a custom proposal for your organisation. Complete this form and we&rsquo;ll be in touch.
                        </p>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-heading text-lg font-bold text-foreground-950 mb-4">Checkout Summary</h3>
                        <div className="bg-background-100 rounded-lg p-5 space-y-3">
                          {[
                            { label: 'Selected plan', value: selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1) },
                            { label: 'Base monthly price', value: `£${plans.find((p) => p.slug === selectedPlan)?.basePrice || 0}/month` },
                            { label: 'Per-desk price', value: plans.find((p) => p.slug === selectedPlan)?.perDesk || '' },
                            { label: 'Desk estimate', value: `${numDesks} desks` },
                            { label: 'Estimated monthly total', value: `£${getEstimatedTotal(selectedPlan).toFixed(0)}/month`, bold: true },
                            { label: 'Included staff users', value: selectedPlan === 'basic' ? '50' : selectedPlan === 'professional' ? '250' : '1,000' },
                            { label: 'Included sites', value: selectedPlan === 'basic' ? '1' : selectedPlan === 'professional' ? '3' : '10' },
                            { label: 'Included AI credits', value: selectedPlan === 'basic' ? '5,000' : selectedPlan === 'professional' ? '50,000' : '250,000' },
                          ].map((row) => (
                            <div key={row.label} className="flex justify-between items-center">
                              <span className="text-sm text-foreground-500">{row.label}</span>
                              <span className={`text-sm ${row.bold ? 'font-bold text-foreground-950' : 'text-foreground-800'}`}>
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}

                {status === 'error' && (
                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">{statusMsg}</p>
                )}

                <div className="flex gap-3 pt-2">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => { setStep(step - 1); setStatus('idle'); }}
                      className="flex-1 border border-background-300/60 text-foreground-800 font-semibold text-sm py-3 rounded-lg hover:bg-background-100 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`${step > 1 ? 'flex-1' : 'w-full'} bg-primary-500 text-background-50 font-semibold text-sm py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60`}
                  >
                    {status === 'loading' ? 'Please wait...' : step === 5 ? (selectedPlan === 'enterprise' ? 'Contact Sales' : 'Continue to Stripe Checkout') : 'Continue'}
                    {step !== 5 && <i className="ri-arrow-right-line ml-2"></i>}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-background-200/70 text-center">
                <p className="text-sm text-foreground-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}