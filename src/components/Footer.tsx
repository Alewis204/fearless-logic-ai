import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Templates', href: '/#templates' },
        { label: 'Updates', href: '/#updates' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/#about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'API Docs', href: '/docs' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
  ];

  return (
    <footer className="border-t border-lightgray bg-white">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
                <Zap className="h-4 w-4 text-gold" />
              </div>
              <span className="text-lg font-bold text-navy">
                Fearless Logic AI
              </span>
            </Link>
            <p className="mt-4 text-sm text-darkgray/70 leading-relaxed max-w-xs">
              Your AI Co-Founder. Launch your online business in minutes — no code, no hassle.
            </p>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-darkgray/70 transition-colors hover:text-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-lightgray pt-8">
          <p className="text-center text-sm text-midgray">
            &copy; {new Date().getFullYear()} Fearless Logic AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
