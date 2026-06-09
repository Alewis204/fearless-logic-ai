"use client";
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [idea, setIdea] = useState('');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-offwhite to-white pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-teal/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue/5 blur-3xl" />
      </div>

      <div className="container-page">
        <div className="mx-auto max-w-[720px] text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue/10 px-4 py-1.5 text-sm font-medium text-blue">
            <Sparkles className="h-4 w-4" />
            AI-Powered Business Builder
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
            Your AI Co-Founder.
            <br />
            <span className="bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              Build In Minutes.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-darkgray/80 leading-relaxed sm:text-xl">
            Describe your idea. Get a website, funnel, or entire business launched — powered by AI.
            No coding, no designers, no delays.
          </p>

          {/* Input + CTA */}
          <div className="mx-auto mt-10 max-w-[560px]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your business idea..."
                  className="input-field h-12 pr-4"
                />
              </div>
              <Link
                href="/signup"
                className="btn-cta h-12 shrink-0 text-base"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-midgray">
              No credit card required • 14-day free trial
            </p>
          </div>

          {/* Social proof */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-1.5 text-sm text-gold-dark font-medium">
              <span className="text-gold">★★★★★</span>
              <span className="text-darkgray">"Built my entire coaching site in 5 minutes. Mind-blowing."</span>
            </div>
            <p className="mt-1 text-xs text-midgray">— Sarah Chen, Career Coach</p>
          </div>

          {/* Hero mockup */}
          <div className="mt-12">
            <div className="mx-auto max-w-[900px] overflow-hidden rounded-xl border border-lightgray bg-white shadow-xl shadow-navy/10">
              <div className="flex items-center gap-2 border-b border-lightgray bg-offwhite px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-error/70" />
                  <div className="h-3 w-3 rounded-full bg-warning/70" />
                  <div className="h-3 w-3 rounded-full bg-success/70" />
                </div>
                <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-midgray text-center">
                  claritycareer.fearlesslogic.app
                </div>
              </div>
              <div className="bg-gradient-to-br from-navy to-navy-light p-8 md:p-12">
                <div className="space-y-4 text-left">
                  <div className="h-4 w-48 rounded bg-white/20" />
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-3/4 rounded bg-white/10" />
                  <div className="flex gap-4 pt-4">
                    <div className="h-10 w-32 rounded-lg bg-teal" />
                    <div className="h-10 w-32 rounded-lg border border-white/30" />
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="h-3 w-16 rounded bg-white/20" />
                    <div className="mt-2 h-2 w-full rounded bg-white/10" />
                    <div className="mt-1 h-2 w-3/4 rounded bg-white/10" />
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="h-3 w-16 rounded bg-white/20" />
                    <div className="mt-2 h-2 w-full rounded bg-white/10" />
                    <div className="mt-1 h-2 w-3/4 rounded bg-white/10" />
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="h-3 w-16 rounded bg-white/20" />
                    <div className="mt-2 h-2 w-full rounded bg-white/10" />
                    <div className="mt-1 h-2 w-3/4 rounded bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
