import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onExploreCakesClick: () => void;
  onOrderCustomClick: () => void;
}

export default function Hero({ onExploreCakesClick, onOrderCustomClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-surface-deep"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-container/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left"
        >
          {/* Tagline / Subtitle */}
          <div className="flex items-center gap-2 mb-4 self-start bg-primary-container/15 border border-primary/20 px-3 py-1 rounded-full text-xs text-primary font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-sans tracking-widest uppercase text-[10px]">Artisanal Excellence Since 2019</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-on-surface font-bold leading-[1.12] mb-6 tracking-tight">
            Crafted with Love,<br />
            <span className="text-primary relative inline-block">
              Baked to Perfection
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-primary-container/50 rounded-full" />
            </span>
          </h1>

          <p className="text-on-surface-variant text-base md:text-lg font-sans font-light leading-relaxed mb-8 max-w-lg">
            Experience the symphony of artisanal flavors. From heritage recipes to modern cake artistry, we bring luxury to your table one slice at a time.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onExploreCakesClick}
              className="bg-primary-container text-on-surface hover:text-on-primary-container px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-widest hover:scale-[1.03] transition-all flex items-center gap-2 group shadow-xl hover:shadow-primary-container/10"
            >
              <span>Explore Our Cakes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOrderCustomClick}
              className="border border-primary/30 text-primary px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-primary/10 hover:border-primary/50 transition-all shadow-md"
            >
              Order Custom
            </button>
          </div>

          {/* Quick Stats/Props below action buttons */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-outline-variant/15 pt-6 max-w-md">
            <div>
              <p className="font-serif text-2xl font-bold text-primary">7+</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans">Years of Craft</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-primary">100%</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans">Preservative Free</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-bold text-primary">50k+</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans">Happy Occasions</p>
            </div>
          </div>
        </motion.div>

        {/* Right Cake Image Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative lg:pl-10"
        >
          {/* Main Hero Image Container */}
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-outline-variant/30 shadow-2xl bg-surface-alt group">
            {/* Soft decorative back glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/90 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity" />

            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCqd8u0dR2Brt-OFfvGLB15Sho1CWwvmZi109cuMJjJ046_nzyBueJ2H2w9HlKQZgpFANMEv5CGse3kecNQzLzjEYVcl2hlqvoWwZoUaNULltKI4P5j9vccnmzUH0746pa-d1mcNubddVrAhtkiHFvuADrZdVtGBxHrgmGGEYft51852eZfV_lvKSxKa9RJva0MtdYHQh3N72wgHWXr3cUGcafGpHkdXH7YEX7pJG_qm5x7bR0p7wLgJVTt95T9Bxub89VruVcaa4"
              alt="A macro photograph of a decadent three-tier chocolate truffle cake with smooth velvet frosting and gold leaf accents"
            />
          </div>

          {/* Organic Floating Badge Widget */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 md:-left-10 bg-surface-container p-4 rounded-2xl border border-primary/20 shadow-2xl flex items-center gap-3 max-w-[240px] hover:scale-[1.02] transition-transform pointer-events-auto z-20"
          >
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-surface shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-primary text-xs font-bold font-sans uppercase tracking-wider">100% Organic</p>
              <p className="text-on-surface-variant text-[11px] font-sans mt-0.5">Farm-fresh premium ingredients only</p>
            </div>
          </motion.div>

          {/* Sweetness Floating Hearts Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -top-6 -right-4 bg-surface-alt py-2 px-3.5 rounded-full border border-primary/10 shadow-xl flex items-center gap-1.5 text-xs text-primary z-20"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-primary" />
            <span className="font-sans font-medium text-[11px]">Bespoke Recipe Book</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
