import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake } from '../types';
import { cakesData } from '../data';
import { Filter, Eye, ShoppingBag, X, Check, ShieldAlert, Sparkles } from 'lucide-react';

interface CakeMenuProps {
  onOrderSelect: (cakeName: string, options: { weight: string; eggless: boolean; customText: string }) => void;
}

export default function CakeMenu({ onOrderSelect }: CakeMenuProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'bestseller' | 'chocolate' | 'fruit'>('all');
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);

  // Customization state in Modal
  const [customWeight, setCustomWeight] = useState<string>('1.0kg');
  const [customEggless, setCustomEggless] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');

  // Filtering cakes
  const filteredCakes = cakesData.filter((cake) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'bestseller') return cake.badge === 'Bestseller' || cake.badge === 'Seasonal';
    if (activeFilter === 'chocolate') {
      return cake.name.toLowerCase().includes('chocolate') || cake.name.toLowerCase().includes('forest');
    }
    if (activeFilter === 'fruit') {
      return cake.name.toLowerCase().includes('mango') || cake.name.toLowerCase().includes('strawberry');
    }
    return true;
  });

  const handleOpenDetail = (cake: Cake) => {
    setSelectedCake(cake);
    setCustomWeight('1.0kg');
    setCustomEggless(false);
    setCustomText('');
  };

  const getDynamicPrice = (basePrice: number, weight: string) => {
    if (weight === '0.5kg') return Math.round(basePrice * 0.65);
    if (weight === '2.0kg') return Math.round(basePrice * 1.8);
    return basePrice; // 1.0kg
  };

  const handleConfirmOrder = () => {
    if (selectedCake) {
      onOrderSelect(selectedCake.name, {
        weight: customWeight,
        eggless: customEggless,
        customText: customText
      });
      setSelectedCake(null);
    }
  };

  return (
    <section id="menu" className="py-20 bg-surface-deep relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-2.5 block">Our Menu</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold mb-4">Our Signature Creations</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-on-surface-variant max-w-2xl mx-auto font-sans font-light text-sm md:text-base leading-relaxed">
            Discover our most beloved cakes, each handcrafted daily using premium ingredients sourced from around the globe.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all border ${
              activeFilter === 'all'
                ? 'bg-primary-container text-on-surface border-primary/20 shadow-md'
                : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:text-primary hover:border-primary/20'
            }`}
          >
            All Creations
          </button>
          <button
            onClick={() => setActiveFilter('bestseller')}
            className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all border ${
              activeFilter === 'bestseller'
                ? 'bg-primary-container text-on-surface border-primary/20 shadow-md'
                : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:text-primary hover:border-primary/20'
            }`}
          >
            Curated Highlights
          </button>
          <button
            onClick={() => setActiveFilter('chocolate')}
            className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all border ${
              activeFilter === 'chocolate'
                ? 'bg-primary-container text-on-surface border-primary/20 shadow-md'
                : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:text-primary hover:border-primary/20'
            }`}
          >
            Chocolatier
          </button>
          <button
            onClick={() => setActiveFilter('fruit')}
            className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all border ${
              activeFilter === 'fruit'
                ? 'bg-primary-container text-on-surface border-primary/20 shadow-md'
                : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:text-primary hover:border-primary/20'
            }`}
          >
            Fruits & Seasonal
          </button>
        </div>

        {/* Cakes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCakes.map((cake, idx) => (
              <motion.div
                key={cake.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-surface-alt rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col text-left"
              >
                {/* Cake Image Box */}
                <div className="h-64 relative overflow-hidden bg-surface-deep cursor-pointer" onClick={() => handleOpenDetail(cake)}>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={cake.image}
                    alt={cake.name}
                  />
                  {/* Subtle dark gradient overlay over image bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-alt/70 via-transparent to-transparent opacity-85" />

                  {/* Badge */}
                  {cake.badge && (
                    <span className="absolute top-4 left-4 bg-primary-container border border-primary/25 text-on-surface text-[9px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 rounded-full shadow-lg">
                      {cake.badge}
                    </span>
                  )}

                  {/* Quick inspect overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-surface-alt text-primary rounded-full p-3 shadow-xl border border-primary/20 hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="font-serif text-lg md:text-xl text-on-surface font-bold hover:text-primary transition-colors cursor-pointer" onClick={() => handleOpenDetail(cake)}>
                      {cake.name}
                    </h3>
                    <span className="text-primary font-serif font-bold text-lg">
                      ₹{cake.price}
                    </span>
                  </div>

                  <p className="text-on-surface-variant text-xs md:text-sm font-sans font-light leading-relaxed mb-6 flex-1">
                    {cake.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenDetail(cake)}
                      className="flex-1 py-3 border border-primary/30 text-primary rounded-xl font-semibold text-[11px] uppercase tracking-widest hover:bg-primary/10 transition-all text-center"
                    >
                      Recipe Details
                    </button>
                    <button
                      onClick={() => {
                        onOrderSelect(cake.name, { weight: '1.0kg', eggless: false, customText: '' });
                      }}
                      className="bg-primary-container border border-primary/20 text-on-surface px-4 py-3 rounded-xl hover:bg-muted-red hover:text-on-surface transition-all shrink-0 flex items-center justify-center gap-1.5"
                      title="Quick Order 1kg Classic"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="font-sans font-semibold text-[11px] uppercase tracking-wider hidden sm:inline">Order Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cake Detail & Customization Modal Sheet */}
      <AnimatePresence>
        {selectedCake && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            {/* Backdrop close */}
            <div className="absolute inset-0" onClick={() => setSelectedCake(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-surface-alt border border-primary/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10"
            >
              {/* Left Image Section */}
              <div className="w-full md:w-1/2 relative bg-surface-deep h-48 md:h-auto min-h-[250px]">
                <img
                  className="w-full h-full object-cover"
                  src={selectedCake.image}
                  alt={selectedCake.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

                {/* Cake Badge in Modal */}
                {selectedCake.badge && (
                  <span className="absolute top-4 left-4 bg-primary-container text-on-surface border border-primary/20 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                    {selectedCake.badge}
                  </span>
                )}
              </div>

              {/* Right Customizer Panel */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar text-left flex flex-col justify-between">
                {/* Header block */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-on-surface leading-tight">
                      {selectedCake.name}
                    </h3>
                    <button
                      onClick={() => setSelectedCake(null)}
                      className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-primary font-serif text-xl font-bold mb-4">
                    ₹{getDynamicPrice(selectedCake.price, customWeight)}
                  </p>

                  <p className="text-on-surface-variant text-sm font-sans font-light leading-relaxed mb-6">
                    {selectedCake.description}
                  </p>

                  {/* Recipe Specs (Ingredients & Allergens) */}
                  <div className="mb-6 space-y-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-sans font-bold text-primary mb-2">Artisanal Ingredients</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCake.ingredients.map((ing) => (
                          <span key={ing} className="bg-surface-deep text-on-surface-variant text-[11px] px-2.5 py-1 rounded-md border border-primary/5">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 border-t border-outline-variant/10 pt-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-sans font-bold text-primary mb-1">Allergen Advice</p>
                        <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                          <ShieldAlert className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Contains: {selectedCake.allergens.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Customizer controls */}
                  <div className="border-t border-outline-variant/15 pt-5 mb-6 space-y-5">
                    {/* Weight Selection */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-sans font-bold text-primary mb-2.5">Select Weight / Size</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['0.5kg', '1.0kg', '2.0kg'].map((w) => (
                          <button
                            key={w}
                            onClick={() => setCustomWeight(w)}
                            className={`py-2 rounded-xl text-xs font-sans font-semibold border transition-all ${
                              customWeight === w
                                ? 'bg-primary-container text-on-surface border-primary/20 shadow-md'
                                : 'bg-surface-deep text-on-surface-variant border-primary/5 hover:border-primary/25 hover:text-primary'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Eggless Option Checkbox */}
                    <div className="flex items-center justify-between bg-surface-deep p-3.5 rounded-2xl border border-primary/5">
                      <div>
                        <p className="text-xs font-bold text-on-surface">100% Vegetarian (Eggless)</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5 font-sans">Crafted using premium vegetarian substitutes</p>
                      </div>
                      <button
                        onClick={() => setCustomEggless(!customEggless)}
                        className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 shrink-0 ${
                          customEggless ? 'bg-primary-container' : 'bg-surface-container-highest'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            customEggless ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Custom Text Field */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-sans font-bold text-primary mb-2">
                        Custom Text / Message on Cake (Optional)
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="e.g. Happy Birthday Rahul!"
                        maxLength={35}
                        className="w-full bg-surface-deep border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions Footer in Modal */}
                <div className="border-t border-outline-variant/10 pt-4 flex gap-3">
                  <button
                    onClick={() => setSelectedCake(null)}
                    className="flex-1 py-3.5 border border-primary/10 text-on-surface-variant rounded-xl font-semibold text-xs uppercase tracking-widest hover:text-primary transition-all text-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-2 bg-primary-container text-on-surface hover:text-on-primary-container py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-muted-red hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Confirm & Book</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
