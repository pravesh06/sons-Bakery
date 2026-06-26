import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Cake, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onQuickOrderClick: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ onQuickOrderClick, theme, toggleTheme, activeTab, onTabChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onTabChange(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of the navbar
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

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Story' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'h-16 bg-surface-deep/90 border-b border-primary/10 shadow-lg' : 'h-20 bg-transparent'
        } glass-nav`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-full">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2 group tracking-tight font-serif text-xl md:text-2xl text-primary font-bold"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container/40 flex items-center justify-center border border-primary/25 group-hover:scale-105 transition-all">
              <Cake className="w-4.5 h-4.5 text-primary" />
            </div>
            <span>Sons Bakery</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-surface-container-high/40 border border-outline-variant/15 px-1.5 py-1.5 rounded-full shadow-inner relative">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  href={`#${item.id}`}
                  className={`relative px-4 py-1.5 text-xs tracking-wider uppercase font-sans font-semibold rounded-full cursor-pointer transition-colors duration-200 select-none z-10 ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant/80 hover:text-on-surface'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-primary-container/30 border border-primary/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
            <div className="w-px h-5 bg-outline-variant/20 mx-1" />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-primary-container/20 text-primary transition-all shadow-inner focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={onQuickOrderClick}
              className="bg-primary text-on-primary hover:scale-[1.02] font-sans font-bold text-[10px] uppercase tracking-wider px-5 py-2 rounded-full shadow-md hover:bg-muted-red hover:shadow-lg transition-all duration-300 flex items-center gap-1 cursor-pointer ml-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary hover:text-on-surface-variant p-2 transition-all focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/80 backdrop-blur-md md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-surface-alt border-l border-primary/15 z-40 p-6 shadow-2xl transition-transform duration-300 transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8 pt-4">
          <span className="font-serif text-xl text-primary font-bold tracking-tight">Sons Bakery</span>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface-deep text-primary border border-primary/15 hover:border-primary/30 hover:scale-105 transition-all shadow focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-primary hover:text-on-surface transition-all p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <a
            onClick={(e) => handleNavClick(e, 'home')}
            className={`${
              activeTab === 'home'
                ? 'text-primary font-semibold border-l-4 border-primary pl-3'
                : 'text-on-surface-variant'
            } text-lg tracking-wide uppercase border-b border-outline-variant/10 pb-2 cursor-pointer transition-all duration-200`}
            href="#home"
          >
            Home
          </a>
          <a
            onClick={(e) => handleNavClick(e, 'about')}
            className={`${
              activeTab === 'about'
                ? 'text-primary font-semibold border-l-4 border-primary pl-3'
                : 'text-on-surface-variant'
            } text-lg tracking-wide uppercase border-b border-outline-variant/10 pb-2 cursor-pointer transition-all duration-200`}
            href="#about"
          >
            Our Story
          </a>
          <a
            onClick={(e) => handleNavClick(e, 'menu')}
            className={`${
              activeTab === 'menu'
                ? 'text-primary font-semibold border-l-4 border-primary pl-3'
                : 'text-on-surface-variant'
            } text-lg tracking-wide uppercase border-b border-outline-variant/10 pb-2 cursor-pointer transition-all duration-200`}
            href="#menu"
          >
            Menu
          </a>
          <a
            onClick={(e) => handleNavClick(e, 'gallery')}
            className={`${
              activeTab === 'gallery'
                ? 'text-primary font-semibold border-l-4 border-primary pl-3'
                : 'text-on-surface-variant'
            } text-lg tracking-wide uppercase border-b border-outline-variant/10 pb-2 cursor-pointer transition-all duration-200`}
            href="#gallery"
          >
            Gallery
          </a>
          <a
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`${
              activeTab === 'contact'
                ? 'text-primary font-semibold border-l-4 border-primary pl-3'
                : 'text-on-surface-variant'
            } text-lg tracking-wide uppercase border-b border-outline-variant/10 pb-2 cursor-pointer transition-all duration-200`}
            href="#contact"
          >
            Contact
          </a>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onQuickOrderClick();
            }}
            className="bg-primary-container text-on-surface font-semibold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-muted-red transition-all shadow-lg text-center mt-4 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Order Custom Cake</span>
          </button>
        </div>
      </div>
    </>
  );
}
