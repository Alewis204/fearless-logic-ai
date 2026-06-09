'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Zap } from 'lucide-react';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
  };

  return (
    <div className="flex min-h-screen bg-offwhite">
      {/* Left - Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <Link href="/" className="mb-10 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
              <Zap className="h-4 w-4 text-gold" />
            </div>
            <span className="text-lg font-bold text-navy">Fearless Logic AI</span>
          </Link>

          <h1 className="text-2xl font-bold text-navy">Welcome back</h1>
          <p className="mt-2 text-sm text-darkgray/70">
            Log in to your account to continue building.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                  placeholder="Enter your password"
                  className="input-field pr-10"
                  required
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-lightgray text-blue focus:ring-blue/30"
                />
                <span className="text-sm text-darkgray">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm font-medium text-blue hover:text-blue-light">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Log in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-darkgray/70">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-teal hover:text-teal-dark">
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Branding */}
      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-navy to-navy-dark p-12 lg:flex">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
            <Zap className="h-10 w-10 text-gold" />
          </div>
          <h2 className="mt-8 text-2xl font-bold text-white">
            Your AI Co-Founder
          </h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Log in to continue building your online business. Your projects, templates, and AI tools are waiting.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {[
              'Access all your projects in one place',
              'Continue editing with AI assistance',
              'Track analytics and grow your business',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
