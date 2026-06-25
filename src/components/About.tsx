import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, X, Clock, Award, Star, Heart } from 'lucide-react';

export default function About() {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const milestones = [
    {
      year: '2019',
      title: 'The First Oven',
      description: 'Sons Bakery started in a small home kitchen, serving fresh-baked custom celebration cakes to neighborhood families.',
      icon: <Clock className="w-5 h-5 text-primary" />
    },
    {
      year: '2021',
      title: 'Gourmet District Boutique',
      description: 'Opened our flagship brick-and-mortar storefront on Baker Street, bringing premium ingredients and refined styling to the city.',
      icon: <Award className="w-5 h-5 text-primary" />
    },
    {
      year: '2023',
      title: 'Bespoke Artistry Studio',
      description: 'Established our custom-cake design laboratory, specializing in structural multi-tier wedding cakes and complex sugar sculptures.',
      icon: <Star className="w-5 h-5 text-primary" />
    },
    {
      year: '2025',
      title: 'Gold standard & Sustainability',
      description: 'Transitioned to 100% organic, locally sourced grains and dairy. Partnered with regional farming families to ensure elite quality.',
      icon: <Heart className="w-5 h-5 text-primary" />
    }
  ];

  return (
    <section id="about" className="py-20 bg-surface-alt relative overflow-hidden">
      {/* Decorative floral background element or subtle outline */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Chef Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 relative group"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
          <div className="aspect-square rounded-3xl overflow-hidden border-2 border-primary/10 relative shadow-xl z-10">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnMf-v8JhUiADACLdRZeZOuByfYHCb7ZSRnwBp1f9M-BjSJMEcJ0jCHN2WbyzY92eCwodFM_bIlETAgjNYAgeAq3GOd3Xum2VAupOFOE8lUgyps6h1mSqfDG4bw3hp3zrJpq5u68dQIlaKlMhoAejOm0wxsNdalTjPaKa9TiiMubRXpqI3x7OeFdGu1uH-GTvM89bgl2QYkWR2edLDXKzMC2ktcDNcMR-S7jAtjJo_a-0wTks2XSJOGXYT6yHS-jNcrlqEGjTtMXg"
              alt="Pastry chef dusting powdered sugar over fresh warm croissants"
            />
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 text-left"
        >
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-2.5 block">Our Story</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold mb-6 leading-tight">The Heritage of Sons Bakery</h2>
          <p className="text-on-surface-variant font-sans font-light leading-relaxed mb-6 text-sm md:text-base">
            Founded in 2019, Sons Bakery began as a small family passion in a modest kitchen. Over the years, we have evolved into a cornerstone of artisanal baking, blending time-honored techniques with contemporary design.
          </p>
          <p className="text-on-surface-variant font-sans font-light leading-relaxed mb-8 text-sm md:text-base">
            Every grain of flour is selected for its absolute purity, every berry harvested at peak ripeness, and every cake is a bespoke canvas crafted exclusively for our distinguished guests.
          </p>

          <button
            onClick={() => setIsTimelineOpen(true)}
            className="bg-primary-container text-on-surface hover:text-on-primary-container px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-muted-red transition-all flex items-center gap-2 group shadow-md"
          >
            <span>Our Journey & Milestones</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Interactive Milestones Timeline Drawer Modal */}
      <AnimatePresence>
        {isTimelineOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-sm">
            {/* Click outside backdrop */}
            <div className="absolute inset-0" onClick={() => setIsTimelineOpen(false)} />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-md h-full bg-surface-deep border-l border-primary/15 shadow-2xl p-6 overflow-y-auto flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-on-surface">Our Historical Timeline</h3>
                  <p className="text-xs text-on-surface-variant font-sans mt-1">Celebrating our journey of sweet milestones</p>
                </div>
                <button
                  onClick={() => setIsTimelineOpen(false)}
                  className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Timeline Items list */}
              <div className="flex-1 relative pl-4 border-l-2 border-primary/20 space-y-8">
                {milestones.map((milestone, idx) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative text-left"
                  >
                    {/* Circle icon placement */}
                    <div className="absolute -left-[31px] top-0.5 w-7 h-7 rounded-full bg-surface-deep border-2 border-primary flex items-center justify-center">
                      {milestone.icon}
                    </div>

                    <div className="bg-surface-alt p-4 rounded-2xl border border-primary/10 ml-3 shadow-sm hover:border-primary/25 transition-all">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span className="font-sans font-bold text-sm text-primary">{milestone.year}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-on-surface mb-1">{milestone.title}</h4>
                      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-outline-variant/10 pt-4 mt-8 text-center">
                <p className="text-xs text-on-surface-variant font-sans italic">
                  "Generations of family tradition, kneaded into every loaf."
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
