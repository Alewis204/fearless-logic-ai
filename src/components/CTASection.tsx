import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-navy via-navy to-navy-dark">
      <div className="container-page">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] leading-[1.1]">
            Ready to launch your online business?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Join 2,000+ entrepreneurs who built their businesses with Fearless Logic AI.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="btn-cta btn-lg text-base"
            >
              Start Your Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing"
              className="btn-lg inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/40">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
