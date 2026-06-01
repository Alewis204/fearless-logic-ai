import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { navLinks } from '../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (!isHome) {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-lightgray/80 bg-white/95 backdrop-blur-sm">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between lg:h-[64px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
              <Zap className="h-4 w-4 text-gold" />
            </div>
            <span className="hidden text-lg font-bold text-navy sm:block">
              Fearless Logic AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="btn-ghost text-sm font-medium"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="btn-ghost text-sm font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="btn-ghost text-sm font-medium">
              Log in
            </Link>
            <Link to="/signup" className="btn-cta btn-sm">
              Start Free Trial →
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-darkgray hover:bg-offwhite md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-lightgray bg-white md:hidden">
          <div className="container-page space-y-1 py-4">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-darkgray hover:bg-offwhite"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-darkgray hover:bg-offwhite"
                >
                  {link.label}
                </Link>
              )
            ))}
            <hr className="my-3 border-lightgray" />
            <Link
              to="/login"
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-darkgray hover:bg-offwhite"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="btn-cta w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
