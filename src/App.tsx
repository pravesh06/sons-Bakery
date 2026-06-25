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
  const [selectedCakeType, setSelectedCakeType] = useState<string>('Red Velvet');
  const [selectedOptions, setSelectedOptions] = useState<{ weight: string; eggless: boolean; customText: string } | null>(null);
  
  // Checkout & Booking Ticket State
  const [submittedOrder, setSubmittedOrder] = useState<OrderRequest | null>(null);
  const [customDesignRecipe, setCustomDesignRecipe] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  // Smooth scroll handler
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
            className="min-h-screen bg-surface-deep text-on-surface select-none overflow-x-hidden antialiased transition-colors duration-300"
          >
            {/* 1. Header Navigation bar */}
            <Navbar
              onQuickOrderClick={handleQuickOrder}
              theme={theme}
              toggleTheme={toggleTheme}
            />

            {/* 2. Hero presentation section */}
            <Hero
              onExploreCakesClick={handleExploreCakes}
              onOrderCustomClick={handleOrderCustom}
            />

            {/* 3. About us presentation & milestones history */}
            <About />

            {/* 4. Curated Cakes menu grid with inspection customization details */}
            <CakeMenu onOrderSelect={handleCakeSelect} />

            {/* 5. Custom cake virtual interactive 3D stack designer */}
            <DreamBuilder onCustomCakeSubmit={handleCustomCakeSubmit} />

            {/* 6. High resolution image gallery with navigatable lightbox */}
            <GallerySection />

            {/* 7. Client testimonials star reviews cards */}
            <Testimonials />

            {/* 8. Booking Contact Form & Quick Action details columns */}
            <OrderForm
              initialCakeType={selectedCakeType}
              initialOptions={selectedOptions}
              onSubmitSuccess={handleFormSuccessSubmit}
            />

            {/* 9. Elite informative Footer */}
            <Footer />

            {/* 10. Confectionery Reservation Ticket modal overlay */}
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
