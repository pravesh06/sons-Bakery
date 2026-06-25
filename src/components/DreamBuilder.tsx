import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CustomCake } from '../types';
import { Sparkles, Check, Flame, Trophy, Coins, Cake as CakeIcon, Info } from 'lucide-react';

interface DreamBuilderProps {
  onCustomCakeSubmit: (summaryText: string) => void;
}

export default function DreamBuilder({ onCustomCakeSubmit }: DreamBuilderProps) {
  const [tiers, setTiers] = useState<number>(1);
  const [sponge, setSponge] = useState<string>('Red Velvet');
  const [frosting, setFrosting] = useState<string>('Cream Cheese');
  const [toppings, setToppings] = useState<string[]>(['Fresh Berries']);
  const [eggless, setEggless] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>('1.5kg');
  const [message, setMessage] = useState<string>('');

  const spongeOptions = [
    { name: 'Red Velvet', color: '#8B0000', price: 100 },
    { name: 'Rich Dark Chocolate', color: '#3d2314', price: 100 },
    { name: 'Madagascar Vanilla', color: '#fbf6e3', price: 80 },
    { name: 'Spiced Carrot Cake', color: '#d97d41', price: 120 }
  ];

  const frostingOptions = [
    { name: 'Cream Cheese', color: '#fffbfa', price: 50 },
    { name: 'Belgian Dark Ganache', color: '#27160c', price: 80 },
    { name: 'Fluffy Vanilla Whip', color: '#fdfcf7', price: 40 },
    { name: 'Salted Buttercream Caramel', color: '#c29767', price: 70 }
  ];

  const toppingOptions = [
    { name: 'Fresh Berries', icon: '🍓', price: 60 },
    { name: 'Belgian Shards', icon: '🍫', price: 60 },
    { name: '24K Gold Leaf', icon: '✨', price: 150 },
    { name: 'Pastel Macarons', icon: '🍪', price: 90 },
    { name: 'Roasted Pralines', icon: '🌰', price: 50 }
  ];

  const handleToppingToggle = (top: string) => {
    if (toppings.includes(top)) {
      setToppings(toppings.filter((t) => t !== top));
    } else {
      setToppings([...toppings, top]);
    }
  };

  const estimatedPrice = useMemo(() => {
    let price = 400; // Base cake price
    const spongePrice = spongeOptions.find((s) => s.name === sponge)?.price || 0;
    const frostingPrice = frostingOptions.find((f) => f.name === frosting)?.price || 0;
    const toppingsPrice = toppings.reduce((total, t) => {
      const topOpt = toppingOptions.find((to) => to.name === t);
      return total + (topOpt?.price || 0);
    }, 0);

    price += spongePrice + frostingPrice + toppingsPrice;
    price *= tiers; // Tier multiplier

    if (weight === '2.5kg') price += 350;
    if (weight === '4.0kg') price += 700;
    if (eggless) price += 50; // Eggless tax

    return price;
  }, [tiers, sponge, frosting, toppings, eggless, weight]);

  const handleStartOrder = () => {
    const summary = `Custom ${tiers}-Tier Dream Cake: Sponge: ${sponge}, Frosting: ${frosting}, Toppings: ${toppings.join(', ')}, Weight: ${weight}, ${eggless ? 'Eggless' : 'Classic'}${message ? `, Message: "${message}"` : ''}. (Estimated Price: ₹${estimatedPrice})`;
    onCustomCakeSubmit(summary);
  };

  // Dynamic colors for simulated preview
  const currentSpongeColor = spongeOptions.find((s) => s.name === sponge)?.color || '#8B0000';
  const currentFrostingColor = frostingOptions.find((f) => f.name === frosting)?.color || '#fffbfa';

  return (
    <section id="custom-builder" className="py-20 bg-surface-alt relative border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-2.5 block">Interactive Studio</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold mb-4">Design Your Dream Cake</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-on-surface-variant max-w-2xl mx-auto font-sans font-light text-sm md:text-base leading-relaxed">
            Have a unique vision for your celebration? Experiment with our virtual cake designer to customize layers, frosting, and exquisite decorations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT COLUMN: Dynamic Interactive Preview (3D-like stack) */}
          <div className="lg:col-span-5 bg-surface-deep border border-primary/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            {/* Soft decorative glow behind preview */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

            <div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-primary mb-1 block">Live Virtual Preview</span>
              <h4 className="font-serif text-lg font-bold text-on-surface">The {tiers}-Tier {sponge} Creation</h4>
              <p className="text-xs text-on-surface-variant mt-1">Updates live with every option choice</p>
            </div>

            {/* Dynamic Cake Visualizer Stack */}
            <div className="my-10 flex flex-col justify-end items-center relative h-64 select-none">
              {/* Stand / Plate base */}
              <div className="w-48 h-3.5 bg-outline-variant/40 rounded-full border border-outline-variant/30 shadow-lg relative z-10" />
              <div className="w-32 h-6 bg-outline-variant/25 rounded-b-xl border-t-0 border border-outline-variant/20 shadow-md relative z-0 -mt-1" />

              {/* Dynamic Tiers Container */}
              <div className="absolute bottom-[23px] flex flex-col items-center justify-end w-full space-y-1 z-20">
                {/* TIER 3 (Top tier - rendered if tiers >= 3) */}
                {tiers >= 3 && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-20 h-12 rounded-t-lg relative shadow-md"
                    style={{ backgroundColor: currentFrostingColor, borderLeft: `5px solid ${currentSpongeColor}` }}
                  >
                    {/* Top toppings rendering */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-0.5 z-30">
                      {toppings.map((t, idx) => {
                        const icon = toppingOptions.find((to) => to.name === t)?.icon || '✨';
                        return <span key={`${t}-${idx}`} className="text-xs filter drop-shadow-sm animate-bounce" style={{ animationDelay: `${idx * 150}ms` }}>{icon}</span>;
                      })}
                    </div>
                    {/* Frosting drips */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 opacity-80" style={{ backgroundColor: currentSpongeColor, borderBottom: `2px solid ${currentFrostingColor}` }} />
                  </motion.div>
                )}

                {/* TIER 2 (Middle tier - rendered if tiers >= 2) */}
                {tiers >= 2 && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-32 h-14 rounded-t-lg relative shadow-md"
                    style={{ backgroundColor: currentFrostingColor, borderLeft: `7px solid ${currentSpongeColor}` }}
                  >
                    {/* Intermediate decoration layer */}
                    <div className="absolute -top-1 left-0 w-full h-1 border-t border-dashed border-primary/30" />
                    {/* Frosting drips */}
                    <div className="absolute bottom-0 left-0 w-full h-2 opacity-80" style={{ backgroundColor: currentSpongeColor, borderBottom: `2px solid ${currentFrostingColor}` }} />
                  </motion.div>
                )}

                {/* TIER 1 (Base tier - always rendered) */}
                <motion.div
                  className="w-44 h-16 rounded-t-xl relative shadow-lg"
                  style={{ backgroundColor: currentFrostingColor, borderLeft: `10px solid ${currentSpongeColor}` }}
                >
                  {/* Intermediate decoration layer */}
                  <div className="absolute -top-1 left-0 w-full h-1 border-t border-dashed border-primary/30" />
                  {/* Frosting drips */}
                  <div className="absolute bottom-0 left-0 w-full h-2.5 opacity-80" style={{ backgroundColor: currentSpongeColor, borderBottom: `2.5px solid ${currentFrostingColor}` }} />
                </motion.div>
              </div>

              {/* Message writing simulated overlay */}
              {message && (
                <div className="absolute bottom-1 bg-surface-alt/90 border border-primary/10 px-3 py-1 rounded-full text-[10px] text-primary max-w-[200px] font-sans font-medium truncate shadow-lg z-30">
                  🖋️ "{message}"
                </div>
              )}
            </div>

            {/* Estimated Price & Submit block */}
            <div className="border-t border-outline-variant/15 pt-4">
              <div className="flex justify-between items-center mb-4 bg-surface-alt/40 p-3 rounded-2xl border border-outline-variant/5">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans">Estimated Cost</p>
                  <p className="text-xl md:text-2xl font-serif font-bold text-primary">₹{estimatedPrice}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant uppercase font-mono bg-primary-container/15 border border-primary/10 py-1 px-2.5 rounded-full">
                  <Coins className="w-3.5 h-3.5 text-primary" />
                  <span>Premium Estimate</span>
                </div>
              </div>

              <button
                onClick={handleStartOrder}
                className="w-full bg-primary-container text-on-surface hover:text-on-primary-container py-3.5 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-muted-red hover:shadow-lg hover:shadow-primary/10 transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-all" />
                <span>Start Custom Order</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Selection Customizer Controls */}
          <div className="lg:col-span-7 bg-surface-deep border border-primary/10 rounded-3xl p-6 md:p-8 text-left space-y-6">
            {/* Tiers choosing */}
            <div>
              <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-3">1. Cake Scale (Tiers)</h5>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTiers(t)}
                    className={`py-3 rounded-xl text-xs font-sans font-bold border transition-all flex flex-col items-center gap-1 ${
                      tiers === t
                        ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                        : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
                    }`}
                  >
                    <CakeIcon className="w-4 h-4" />
                    <span>{t} Tier{t > 1 ? 's' : ''}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Base Sponge choosing */}
            <div>
              <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-3">2. Base Sponge Recipe</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {spongeOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSponge(opt.name)}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between h-20 ${
                      sponge === opt.name
                        ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                        : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-sans truncate leading-tight w-full">{opt.name}</span>
                    <div className="flex justify-between items-center w-full mt-2">
                      <div className="w-4.5 h-4.5 rounded-full border border-on-surface/10 shadow-inner" style={{ backgroundColor: opt.color }} />
                      <span className="text-[10px] text-on-surface-variant font-mono">+₹{opt.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cream Frosting choosing */}
            <div>
              <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-3">3. Frosting Velvet Layer</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {frostingOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setFrosting(opt.name)}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between h-20 ${
                      frosting === opt.name
                        ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                        : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
                    }`}
                  >
                    <span className="text-[11px] font-bold font-sans truncate leading-tight w-full">{opt.name}</span>
                    <div className="flex justify-between items-center w-full mt-2">
                      <div className="w-4.5 h-4.5 rounded-full border border-on-surface/10 shadow-inner" style={{ backgroundColor: opt.color }} />
                      <span className="text-[10px] text-on-surface-variant font-mono">+₹{opt.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Toppings choosing (Multi-select) */}
            <div>
              <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-3">4. Exquisite Garnishes (Multi-Select)</h5>
              <div className="flex flex-wrap gap-2">
                {toppingOptions.map((opt) => {
                  const isSelected = toppings.includes(opt.name);
                  return (
                    <button
                      key={opt.name}
                      onClick={() => handleToppingToggle(opt.name)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                          : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
                      }`}
                    >
                      <span className="text-sm shrink-0">{opt.icon}</span>
                      <span>{opt.name}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono ml-1">(+₹{opt.price})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scale weight selection */}
            <div className="grid md:grid-cols-2 gap-6 border-t border-outline-variant/10 pt-5">
              <div>
                <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-2.5">5. Cake Mass / Weight</h5>
                <div className="grid grid-cols-3 gap-2">
                  {['1.5kg', '2.5kg', '4.0kg'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`py-2 rounded-xl text-xs font-sans font-semibold border transition-all ${
                        weight === w
                          ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                          : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-2.5">6. Dietary Tolerance</h5>
                <button
                  onClick={() => setEggless(!eggless)}
                  className={`w-full py-2 px-4 rounded-xl text-xs font-sans font-semibold border transition-all flex justify-between items-center ${
                    eggless
                      ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                      : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-1">🌱 100% Eggless (Pure Veg)</span>
                  <span className="text-[10px] font-mono">(+₹50)</span>
                </button>
              </div>
            </div>

            {/* Custom writing text */}
            <div className="border-t border-outline-variant/10 pt-5">
              <h5 className="text-xs uppercase tracking-wider font-sans font-bold text-primary mb-2.5">7. Greeting Signature (Message on Cake)</h5>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Joyous 50th Anniversary, Mom & Dad!"
                maxLength={45}
                className="w-full bg-surface-alt border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
