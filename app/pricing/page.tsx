'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { pricingPlans } from '@/src/data/siteData';
import FAQAccordion from '@/src/components/FAQAccordion';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-offwhite to-white pt-16 pb-12">
        <div className="container-page text-center">
          <h1 className="section-title">Simple, transparent pricing</h1>
          <p className="section-subtitle">
            14-day free trial on all plans. No credit card required.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-offwhite p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                !isAnnual ? 'bg-white text-navy shadow-sm' : 'text-darkgray hover:text-navy'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                isAnnual ? 'bg-white text-navy shadow-sm' : 'text-darkgray hover:text-navy'
              }`}
            >
              Annual
              <span className="ml-1.5 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold-dark">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16">
        <div className="container-page">
          <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:max-w-[1100px] lg:mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-8 transition-all duration-200 hover:shadow-xl hover:shadow-navy/10 ${
                  plan.popular
                    ? 'border-teal bg-white shadow-lg shadow-teal/10 scale-[1.02] lg:scale-105'
                    : 'border-lightgray bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-teal px-4 py-1 text-xs font-semibold text-white shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-navy">{plan.name}</h3>
                  <p className="mt-1 text-sm text-darkgray/70">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-navy">
                      ${isAnnual ? plan.annualPrice : plan.price}
                    </span>
                    <span className="text-sm text-midgray">
                      /{isAnnual ? 'yr' : 'mo'}
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="mt-1 text-xs text-midgray">
                      ${plan.price}/mo billed annually
                    </p>
                  )}
                </div>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                      <span className="text-darkgray">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaLink}
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200 ${
                    plan.popular ? 'btn-cta' : 'btn-primary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />
    </div>
  );
}
