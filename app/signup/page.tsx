'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Zap, Loader2 } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      router.push('/login?success=true');
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-offwhite">
      {/* Left - Branding */}
      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-teal to-navy-dark p-12 lg:flex">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
            <Zap className="h-10 w-10 text-gold" />
          </div>
          <h2 className="mt-8 text-2xl font-bold text-white">
            Start building for free
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Join 2,000+ entrepreneurs who have launched their online businesses with Fearless Logic AI.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {[
              'AI-powered website & funnel builder',
              'Beautiful templates for any business',
              'Free hosting & custom domains',
              '14-day free trial, no credit card',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">
          <Link href="/" className="mb-10 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
              <Zap className="h-4 w-4 text-gold" />
            </div>
            <span className="text-lg font-bold text-navy">Fearless Logic AI</span>
          </Link>

          <h1 className="text-2xl font-bold text-navy">Create your free account</h1>
          <p className="mt-2 text-sm text-darkgray/70">
            No credit card required. Start your 14-day free trial.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-error/30 bg-error/5 p-3 text-sm text-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Chen"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="input-field pr-10"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-midgray hover:text-darkgray"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-midgray">At least 8 characters</p>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-lightgray text-blue focus:ring-blue/30"
                required
              />
              <label htmlFor="terms" className="text-sm text-darkgray/70">
                I agree to the{' '}
                <Link href="/terms" className="text-blue hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-cta flex w-full items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? 'Creating your account...' : 'Start Free Trial'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-darkgray/70">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue hover:text-blue-light">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
