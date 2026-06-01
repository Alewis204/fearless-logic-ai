import { Star } from 'lucide-react';
import { testimonials } from '../data/siteData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-offwhite">
      <div className="container-page">
        <div className="text-center">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">Loved by entrepreneurs everywhere</h2>
          <p className="section-subtitle">
            Join 2,000+ founders who have launched their businesses with Fearless Logic AI.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="card-hover">
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-darkgray/80 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-lightgray pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy to-blue text-sm font-semibold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-midgray">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
