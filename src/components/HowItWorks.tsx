import { steps } from '../data/siteData';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center">
          <span className="section-label">Simple Process</span>
          <h2 className="section-title">From idea to launch in 3 simple steps</h2>
          <p className="section-subtitle">
            No complicated software, no learning curve. Just describe, let AI build, and launch.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[60%] hidden h-0.5 w-[80%] bg-gradient-to-r from-blue/30 to-transparent md:block" />
              )}

              {/* Step number */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue/10 to-teal/5 text-4xl">
                {step.icon}
              </div>

              {/* Content */}
              <div className="mt-6">
                <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
                  Step {step.number}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-darkgray/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
