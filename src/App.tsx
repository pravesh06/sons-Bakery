import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CakeMenu from './components/CakeMenu';
import DreamBuilder from './components/DreamBuilder';
import GallerySection from './components/GallerySection';
import Testimonials from './components/Testimonials';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import OrderSuccessModal from './components/OrderSuccessModal';
import Loader from './components/Loader';
import { OrderRequest } from './types';

export default function App() {
  // Loading & Intro State
  const [isLoading, setIsLoading] = useState(true);

  // Coordinated Theme State (Dark by default for luxury boutique branding)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Theme Sync effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Coordinated State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCakeType, setSelectedCakeType] = useState<string>('Red Velvet');
  const [selectedOptions, setSelectedOptions] = useState<{ weight: string; eggless: boolean; customText: string } | null>(null);
  
  // Checkout & Booking Ticket State
  const [submittedOrder, setSubmittedOrder] = useState<OrderRequest | null>(null);
  const [customDesignRecipe, setCustomDesignRecipe] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  // Smooth scroll helper
  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
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

  // 1. Navbar / Quick Order Call to Action
  const handleQuickOrder = () => {
    smoothScrollTo('custom-builder');
  };

  // 2. Hero Action buttons
  const handleExploreCakes = () => {
    smoothScrollTo('menu');
  };

  const handleOrderCustom = () => {
    smoothScrollTo('custom-builder');
  };

  // 3. Cake Menu selection
  const handleCakeSelect = (cakeName: string, options: { weight: string; eggless: boolean; customText: string }) => {
    setSelectedCakeType(cakeName);
    setSelectedOptions(options);
    setCustomDesignRecipe(''); // Reset custom designer specs if ordering a signature item
    smoothScrollTo('contact');
  };

  // 4. Custom Dream Cake Submit
  const handleCustomCakeSubmit = (summaryText: string) => {
    setSelectedCakeType('Custom Dream Cake Design');
    // Extract specs
    const weightMatch = summaryText.match(/Weight: ([^,]+)/);
    const egglessMatch = summaryText.includes('Eggless');
    const messageMatch = summaryText.match(/Message: "([^"]+)"/);

    setSelectedOptions({
      weight: weightMatch ? weightMatch[1] : '1.5kg',
      eggless: egglessMatch,
      customText: messageMatch ? messageMatch[1] : ''
    });

    setCustomDesignRecipe(summaryText);
    smoothScrollTo('contact');
  };

  // 5. Booking Form Submit (Success Modal presentation)
  const handleFormSuccessSubmit = (order: OrderRequest) => {
    // Generate an elite booking confirmation ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderId(`SONS-${randomNum}`);
    setSubmittedOrder(order);
    setIsSuccessModalOpen(true);
  };

  // Scroll Spy to track scroll position and update active navbar item
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      // Check if we are at the very bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15) {
        setActiveTab('contact');
        return;
      }

      const sectionIds = ['home', 'about', 'menu', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 120; // adding offset for active zone trigger

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-surface-deep text-on-surface select-none overflow-x-hidden antialiased transition-colors duration-300 flex flex-col justify-between"
          >
            <div>
              {/* 1. Header Navigation bar */}
              <Navbar
                onQuickOrderClick={handleQuickOrder}
                theme={theme}
                toggleTheme={toggleTheme}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Single Page Sections stacked vertically */}
              <div className="flex flex-col">
                <Hero
                  onExploreCakesClick={handleExploreCakes}
                  onOrderCustomClick={handleOrderCustom}
                />
                <About />
                <CakeMenu onOrderSelect={handleCakeSelect} />
                <DreamBuilder onCustomCakeSubmit={handleCustomCakeSubmit} />
                <GallerySection />
                <Testimonials />
                <OrderForm
                  initialCakeType={selectedCakeType}
                  initialOptions={selectedOptions}
                  onSubmitSuccess={handleFormSuccessSubmit}
                />
              </div>
            </div>

            <div>
              {/* 2. Elite informative Footer */}
              <Footer />
            </div>

            {/* 3. Confectionery Reservation Ticket modal overlay */}
            <OrderSuccessModal
              isOpen={isSuccessModalOpen}
              onClose={() => setIsSuccessModalOpen(false)}
              order={submittedOrder}
              customDesignDetails={customDesignRecipe}
              orderId={orderId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
