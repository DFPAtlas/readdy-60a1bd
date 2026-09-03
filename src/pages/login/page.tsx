import { Link, useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { loginUser, routeUserByRole } from '@/services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const user = await loginUser(email, password);
      if (user) {
        const route = routeUserByRole(user.roles);
        navigate(route);
      } else {
        setStatus('error');
        setStatusMsg('Invalid email or password. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMsg('Authentication is not yet connected. This will be linked to Supabase Auth in the next phase.');
    }
  };

  return (
    <div className="min-h-screen bg-background-50 flex">
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=Warm%20minimalist%20modern%20office%20interior%20with%20soft%20natural%20light%20streaming%20through%20large%20windows%2C%20clean%20white%20desks%20with%20laptops%2C%20indoor%20plants%2C%20warm%20cream%20and%20beige%20tones%2C%20calm%20professional%20atmosphere%2C%20architectural%20photography%20with%20shallow%20depth%20of%20field%2C%20organic%20textures&width=900&height=1400&seq=login-brand-2026&orientation=portrait"
          alt="Modern workplace"
          title="HotDesk Hub — Login"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-white whitespace-nowrap">
            <span className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm font-bold">H</span>
            HotDesk Hub
          </Link>
          <div>
            <p className="font-heading text-3xl font-bold text-white mb-3 leading-tight">Smart Spaces.<br />Smarter Work.</p>
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Log in to manage your workplace, check desk availability, view analytics, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-foreground-900 whitespace-nowrap">
              <span className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-background-50 text-sm font-bold">H</span>
              HotDesk Hub
            </Link>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground-950 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-foreground-500 mb-8">
            Access your client dashboard, staff portal, admin portal, or setup workspace.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-foreground-800 mb-1.5">Work email</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-foreground-800 mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-background-50 border border-background-200/70 rounded-lg px-4 py-3 pr-10 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 hover:text-foreground-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-lg`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-background-300 text-primary-500 focus:ring-primary-400"
                />
                <span className="text-xs text-foreground-500">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary-500 text-background-50 font-semibold text-sm px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60"
            >
              {status === 'loading' ? 'Signing in...' : 'Login'}
            </button>

            {status === 'error' && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">{statusMsg}</p>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-background-200/70">
            <p className="text-sm text-foreground-500 text-center mb-4">
              Don&rsquo;t have an account?{' '}
              <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Create account</Link>
            </p>

            <div className="space-y-3">
              <p className="text-xs text-foreground-400 text-center">Available soon</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-background-200/70 bg-background-50 opacity-60 cursor-not-allowed">
                  <i className="ri-mail-send-line text-foreground-400"></i>
                  <span className="text-xs text-foreground-400">Magic Link</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-background-200/70 bg-background-50 opacity-60 cursor-not-allowed">
                  <i className="ri-shield-keyhole-line text-foreground-400"></i>
                  <span className="text-xs text-foreground-400">Enterprise SSO</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg border border-background-200/70 bg-background-50 opacity-60 cursor-not-allowed col-span-2">
                  <i className="ri-smartphone-line text-foreground-400"></i>
                  <span className="text-xs text-foreground-400">Two-Factor Authentication (2FA)</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-foreground-400 text-center mt-6">
            Need help?{' '}
            <Link to="/contact" className="text-primary-600 hover:text-primary-700 transition-colors">Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}