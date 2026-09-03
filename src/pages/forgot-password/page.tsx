import { Link } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { sendPasswordReset } from '@/services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await sendPasswordReset(email);
      if (result.success) {
        setStatus('success');
        setStatusMsg('Password reset instructions have been sent if an account exists for this email.');
      } else {
        setStatus('error');
        setStatusMsg(result.message);
      }
    } catch {
      setStatus('error');
      setStatusMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-heading font-bold text-xl text-foreground-900 whitespace-nowrap mb-8">
            <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-sm font-bold">H</span>
            HotDesk Hub
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-2">
            Forgot your password?
          </h1>
          <p className="text-sm text-foreground-500">
            Enter your work email and we&rsquo;ll send you a reset link.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-background-50 border border-background-200/70 rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-mail-check-line text-2xl text-accent-600"></i>
            </div>
            <h2 className="font-heading text-lg font-bold text-foreground-950 mb-2">Check your inbox</h2>
            <p className="text-sm text-foreground-500 mb-6 leading-relaxed">{statusMsg}</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              <i className="ri-arrow-left-line"></i>
              Return to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-background-50 border border-background-200/70 rounded-xl p-6 md:p-8 space-y-5" noValidate>
            <div>
              <label htmlFor="fp-email" className="block text-sm font-medium text-foreground-800 mb-1.5">Work email</label>
              <input
                id="fp-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="you@company.com"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending...' : 'Send reset link'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">{statusMsg}</p>
            )}
          </form>
        )}

        <p className="text-xs text-foreground-400 text-center mt-6">
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            <i className="ri-arrow-left-line mr-1"></i>Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}