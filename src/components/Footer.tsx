import React, { useState } from 'react';
import { Cake, Mail, ArrowRight, Instagram, Facebook, Flame, Sparkles } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-surface-alt border-t border-primary/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 text-left relative z-10">
        {/* Brand column */}
        <div className="md:col-span-4 space-y-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2 font-serif text-xl text-primary font-bold tracking-tight"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center border border-primary/15">
              <Cake className="w-4 h-4 text-primary" />
            </div>
            <span>Sons Bakery</span>
          </a>
          <p className="text-xs md:text-sm text-on-surface-variant font-sans font-light leading-relaxed max-w-sm">
            Handcrafting high-fidelity celebration cakes and heritage breads since 2019. Bringing luxury, safety, and gourmet flavor to your most precious moments.
          </p>

          <div className="flex gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 bg-surface-deep text-primary hover:bg-primary-container hover:text-on-surface border border-primary/5 rounded-xl transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 bg-surface-deep text-primary hover:bg-primary-container hover:text-on-surface border border-primary/5 rounded-xl transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 bg-surface-deep text-primary hover:bg-primary-container hover:text-on-surface border border-primary/5 rounded-xl transition-all"
            >
              <Flame className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="font-serif text-sm font-bold text-on-surface uppercase tracking-wider">Quick Navigation</h5>
          <ul className="space-y-2 text-xs md:text-sm font-sans font-light">
            <li>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Top / Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, 'menu')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Signature Menu
              </a>
            </li>
            <li>
              <a
                href="#custom-builder"
                onClick={(e) => handleNavClick(e, 'custom-builder')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Dream Cake Studio
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, 'gallery')}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Visual Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Business hours column */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="font-serif text-sm font-bold text-on-surface uppercase tracking-wider">Boutique Hours</h5>
          <ul className="space-y-2 text-xs md:text-sm font-sans font-light text-on-surface-variant">
            <li className="flex justify-between border-b border-outline-variant/10 pb-1.5">
              <span>Monday - Saturday</span>
              <span className="font-medium text-on-surface">9 AM - 9 PM</span>
            </li>
            <li className="flex justify-between border-b border-outline-variant/10 pb-1.5">
              <span>Sunday</span>
              <span className="font-medium text-on-surface">10 AM - 6 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Custom Consultation</span>
              <span className="font-medium text-on-surface">By Appointment</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="font-serif text-sm font-bold text-on-surface uppercase tracking-wider">Join The Connoisseurs</h5>
          <p className="text-xs text-on-surface-variant font-sans font-light leading-relaxed">
            Subscribe to receive exclusive recipes, seasonal flavor announcements, and private baking showcase invitations.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="space-y-2 relative">
            <div className="flex gap-1.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full bg-surface-deep border border-outline-variant/40 rounded-xl pl-3 pr-2 py-2.5 text-xs focus:border-primary outline-none text-on-surface"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary-container text-on-surface hover:text-on-primary-container p-2.5 rounded-xl hover:bg-muted-red transition-all shrink-0 flex items-center justify-center"
                title="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {newsletterSuccess && (
              <div className="absolute top-full left-0 mt-1.5 flex items-center gap-1 text-[11px] text-primary bg-primary-container/10 border border-primary/20 p-2 rounded-lg w-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 border-t border-outline-variant/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-on-surface-variant gap-4 relative z-10 font-mono">
        <p>© {new Date().getFullYear()} Sons Bakery. Crafted with Artisanal Precision.</p>
        <div className="flex gap-4">
          <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#sitemap" className="hover:text-primary transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
