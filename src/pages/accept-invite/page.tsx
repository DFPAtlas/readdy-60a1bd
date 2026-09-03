import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { acceptStaffInvite } from '@/services/authService';

export default function AcceptInvite() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const inviteEmail = searchParams.get('email') || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(inviteEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptPrivacyNotice, setAcceptPrivacyNotice] = useState(false);
  const [acceptWorkplaceTerms, setAcceptWorkplaceTerms] = useState(false);
  const [acknowledgeData, setAcknowledgeData] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const allAccepted = acceptPrivacyNotice && acceptWorkplaceTerms && acknowledgeData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    if (!allAccepted) {
      setStatus('error');
      setStatusMsg('Please accept all required notices.');
      return;
    }

    setStatus('loading');
    try {
      const result = await acceptStaffInvite({ token, firstName, lastName, email, password });
      if (result.success) {
        navigate('/staff');
      } else {
        setStatus('error');
        setStatusMsg(result.message);
      }
    } catch {
      setStatus('error');
      setStatusMsg('Staff invite acceptance requires backend connection.');
    }
  };

  return (
    <div className="min-h-screen bg-background-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[500px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-heading font-bold text-lg text-foreground-900 whitespace-nowrap mb-8">
            <span className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-xs font-bold">H</span>
            HotDesk Hub
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
            You&rsquo;ve been invited to HotDesk Hub
          </h1>
          <p className="text-sm text-foreground-500 leading-relaxed">
            Join your workplace account to check into desks, find available spaces, and manage your hot desk activity.
          </p>
        </div>

        <div className="bg-background-50 border border-background-200/70 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="si-first" className="block text-sm font-medium text-foreground-800 mb-1.5">First name *</label>
                <input id="si-first" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
              </div>
              <div>
                <label htmlFor="si-last" className="block text-sm font-medium text-foreground-800 mb-1.5">Last name *</label>
                <input id="si-last" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="si-email" className="block text-sm font-medium text-foreground-800 mb-1.5">Work email</label>
              <input id="si-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required readOnly={!!inviteEmail} className={`w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 focus:outline-none focus:border-primary-400 transition-all ${inviteEmail ? 'bg-background-100 text-foreground-500' : ''}`} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="si-password" className="block text-sm font-medium text-foreground-800 mb-1.5">Password *</label>
                <input id="si-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="Min 8 characters" />
              </div>
              <div>
                <label htmlFor="si-confirm" className="block text-sm font-medium text-foreground-800 mb-1.5">Confirm password *</label>
                <input id="si-confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all" placeholder="Re-enter password" />
              </div>
            </div>

            <div className="border-t border-background-200/70 pt-4 space-y-3">
              <p className="text-sm font-semibold text-foreground-800">Required acceptance</p>
              {[
                { checked: acceptPrivacyNotice, set: setAcceptPrivacyNotice, label: 'I have read and accept the staff privacy notice.', key: 'privacy' },
                { checked: acceptWorkplaceTerms, set: setAcceptWorkplaceTerms, label: 'I accept the workplace usage terms.', key: 'terms' },
                { checked: acknowledgeData, set: setAcknowledgeData, label: 'I acknowledge the data collection notice for workplace check-ins.', key: 'data' },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={item.checked} onChange={(e) => item.set(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400" />
                  <span className="text-xs text-foreground-600 leading-relaxed">{item.label}</span>
                </label>
              ))}
            </div>

            {status === 'error' && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">{statusMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' ? 'Creating account...' : 'Create Staff Account'}
            </button>
          </form>
        </div>

        <p className="text-xs text-foreground-400 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Log in</Link>
        </p>
      </div>
    </div>
  );
}