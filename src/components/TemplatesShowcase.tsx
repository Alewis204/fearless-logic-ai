export default function TemplatesShowcase() {
  const templates = [
    { name: 'Landing Page', icon: '📄', description: 'High-converting landing pages for your offers' },
    { name: 'Coming Soon', icon: '⏳', description: 'Build anticipation with a coming soon page' },
    { name: 'Mini Site', icon: '🏠', description: 'A complete multi-page site in minutes' },
    { name: 'Sales Page', icon: '💰', description: 'Persuasive sales pages that convert' },
    { name: 'Portfolio', icon: '🎨', description: 'Showcase your work with style' },
  ];

  return (
    <section id="templates" className="section-padding bg-white">
      <div className="container-page">
        <div className="text-center">
          <span className="section-label">Templates</span>
          <h2 className="section-title">Professional templates for every business</h2>
          <p className="section-subtitle">
            Start with a beautiful template designed for your industry, then customize to make it yours.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {templates.map((template) => (
            <div
              key={template.name}
              className="card-hover group cursor-pointer text-center"
            >
              <div className="mb-3 text-4xl transition-transform duration-200 group-hover:scale-110">
                {template.icon}
              </div>
              <h3 className="text-base font-semibold text-navy">
                {template.name}
              </h3>
              <p className="mt-1.5 text-xs text-darkgray/70">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
