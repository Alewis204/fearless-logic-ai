import { features } from '../data/siteData';

export default function FeaturesGrid() {
  return (
    <section id="features" className="section-padding bg-offwhite">
      <div className="container-page">
        <div className="text-center">
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything you need to launch your online business</h2>
          <p className="section-subtitle">
            From AI-powered building to publishing to analytics — all in one platform.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card-hover group"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue/10 to-teal/5 text-2xl transition-transform duration-200 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-navy">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-darkgray/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
