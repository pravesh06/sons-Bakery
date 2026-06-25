import { testimonialsData } from '../data';
import { Star, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-20 bg-surface-alt relative border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-2.5 block">Guest Reviews</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold mb-4">What Our Guests Say</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-surface-deep p-8 md:p-10 rounded-3xl border border-primary/10 relative hover:border-primary/30 hover:scale-[1.01] transition-all flex flex-col justify-between text-left shadow-lg"
            >
              {/* Star Rating Row */}
              <div className="flex gap-1 text-primary mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-primary" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-on-surface font-sans font-light italic leading-relaxed text-sm md:text-base mb-8">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-outline-variant/10 pt-5 mt-auto">
                {/* Avatar Initials block */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-inner ${testimonial.avatarColor}`}>
                  {testimonial.initials}
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold text-on-surface">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant text-xs font-sans font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Verified Guest</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
