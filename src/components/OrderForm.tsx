import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { OrderRequest } from '../types';
import { Phone, Mail, MapPin, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

interface OrderFormProps {
  initialCakeType: string;
  initialOptions: { weight: string; eggless: boolean; customText: string } | null;
  onSubmitSuccess: (order: OrderRequest) => void;
}

export default function OrderForm({ initialCakeType, initialOptions, onSubmitSuccess }: OrderFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cakeType, setCakeType] = useState('Red Velvet');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [instructions, setInstructions] = useState('');

  // Customized specs
  const [weight, setWeight] = useState('1.0kg');
  const [eggless, setEggless] = useState(false);
  const [customText, setCustomText] = useState('');

  // Copy status indicators
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // Pre-fill fields whenever props change (e.g. from menu click or dream cake builder)
  useEffect(() => {
    if (initialCakeType) {
      setCakeType(initialCakeType);
    }
    if (initialOptions) {
      setWeight(initialOptions.weight);
      setEggless(initialOptions.eggless);
      setCustomText(initialOptions.customText);
    }
  }, [initialCakeType, initialOptions]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!fullName.trim()) newErrors.push('Please enter your full name.');
    if (!phone.trim() || phone.length < 8) newErrors.push('Please enter a valid phone number.');
    if (!deliveryDate) newErrors.push('Please select a delivery or pickup date.');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      // Scroll to errors list
      const errorEl = document.getElementById('form-error-anchor');
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setErrors([]);
    const orderData: OrderRequest = {
      fullName,
      phone,
      cakeType,
      deliveryDate,
      instructions,
      weight,
      eggless,
      customText
    };

    onSubmitSuccess(orderData);
  };

  return (
    <section id="contact" className="py-20 bg-surface-deep relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-stretch">
        {/* Left Column: Get in touch details */}
        <div className="md:col-span-5 text-left flex flex-col justify-between">
          <div>
            <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-2.5 block">Reservation Desk</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold mb-6">Get in Touch</h2>
            <p className="text-on-surface-variant font-sans font-light leading-relaxed mb-10 text-sm md:text-base">
              Ready to place an order or have questions about a custom design? Fill out the booking form, and our confectionery concierge will contact you within 24 hours.
            </p>

            <div className="space-y-6">
              {/* Phone item */}
              <div className="flex items-center gap-4 bg-surface-alt/40 p-4 rounded-2xl border border-primary/5 group hover:border-primary/25 transition-all">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans font-bold">Direct Line</p>
                  <p className="font-semibold text-on-surface truncate text-sm md:text-base">+91 98765 43210</p>
                </div>
                <button
                  onClick={() => handleCopy('+91 98765 43210', 'phone')}
                  className="p-2 rounded-xl bg-surface-deep text-on-surface-variant hover:text-primary transition-colors shrink-0"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-4 bg-surface-alt/40 p-4 rounded-2xl border border-primary/5 group hover:border-primary/25 transition-all">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans font-bold">Inquiries & Orders</p>
                  <p className="font-semibold text-on-surface truncate text-sm md:text-base">orders@sonsbakery.com</p>
                </div>
                <button
                  onClick={() => handleCopy('orders@sonsbakery.com', 'email')}
                  className="p-2 rounded-xl bg-surface-deep text-on-surface-variant hover:text-primary transition-colors shrink-0"
                  title="Copy Email Address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Address item */}
              <div className="flex items-center gap-4 bg-surface-alt/40 p-4 rounded-2xl border border-primary/5 group hover:border-primary/25 transition-all">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-sans font-bold">The Boutique</p>
                  <p className="font-semibold text-on-surface truncate text-sm md:text-base">12 Baker Street, Gourmet District</p>
                </div>
                <button
                  onClick={() => handleCopy('12 Baker Street, Gourmet District', 'address')}
                  className="p-2 rounded-xl bg-surface-deep text-on-surface-variant hover:text-primary transition-colors shrink-0"
                  title="Copy Store Address"
                >
                  {copiedField === 'address' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant font-sans font-light mt-10 md:mt-0 italic bg-surface-alt/25 p-4 rounded-xl border border-primary/5">
            📌 **Note:** For multi-tier custom wedding inquiries, we recommend scheduling an appointment at least 14 days prior to your celebration.
          </p>
        </div>

        {/* Right Column: Order Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleFormSubmit}
            className="bg-surface-alt p-6 md:p-10 rounded-3xl border border-outline-variant/30 space-y-6 shadow-2xl relative text-left"
          >
            {/* Form decorative background glows */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h4 className="font-serif text-xl font-bold text-on-surface">Artisanal Order Reservation</h4>
            </div>

            {/* Error anchor */}
            <div id="form-error-anchor" />

            {/* Error notifications */}
            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/25 p-4 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>Validation Warning</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-on-surface-variant font-sans space-y-0.5">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Live customizer indicators to help guide user inputs */}
            {(weight !== '1.0kg' || eggless || customText) && (
              <div className="bg-primary-container/10 border border-primary/20 p-3.5 rounded-xl flex flex-wrap gap-2 items-center text-xs text-on-surface">
                <span className="font-bold text-primary font-sans uppercase text-[10px] tracking-wider shrink-0">Selected Options:</span>
                {weight !== '1.0kg' && (
                  <span className="bg-surface-deep px-2 py-0.5 rounded border border-primary/10 font-medium">Size: {weight}</span>
                )}
                {eggless && (
                  <span className="bg-surface-deep px-2 py-0.5 rounded border border-primary/10 text-green-400 font-medium">🌱 Eggless (Pure Veg)</span>
                )}
                {customText && (
                  <span className="bg-surface-deep px-2 py-0.5 rounded border border-primary/10 max-w-[150px] truncate font-medium">Text: "{customText}"</span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setWeight('1.0kg');
                    setEggless(false);
                    setCustomText('');
                  }}
                  className="text-primary hover:underline text-[10px] uppercase ml-auto font-bold tracking-wider"
                >
                  Reset Customizations
                </button>
              </div>
            )}

            {/* Full Name & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-surface-deep border border-outline-variant/40 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-surface-deep border border-outline-variant/40 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
                  required
                />
              </div>
            </div>

            {/* Cake Type & Delivery Date */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Cake Choice *</label>
                <select
                  value={cakeType}
                  onChange={(e) => setCakeType(e.target.value)}
                  className="w-full bg-surface-deep border border-outline-variant/40 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
                >
                  <option value="Red Velvet">Red Velvet</option>
                  <option value="Chocolate Truffle">Chocolate Truffle</option>
                  <option value="Mango Delight">Mango Delight</option>
                  <option value="Black Forest">Black Forest</option>
                  <option value="Butterscotch Dream">Butterscotch Dream</option>
                  <option value="Strawberry Bliss">Strawberry Bliss</option>
                  <option value="Custom Dream Cake Design">Custom Dream Designer Recipe</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Delivery/Pickup Date *</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-surface-deep border border-outline-variant/40 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
                  required
                />
              </div>
            </div>

            {/* Weight, Eggless & Custom Writing Form Toggles (synchronizes changes too) */}
            <div className="grid md:grid-cols-3 gap-4 border-t border-dashed border-outline-variant/30 pt-5">
              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Cake Mass / Weight</label>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-surface-deep border border-outline-variant/45 rounded-xl px-3 py-2.5 text-xs focus:border-primary outline-none text-on-surface"
                >
                  <option value="0.5kg">0.5 kg (Small)</option>
                  <option value="1.0kg">1.0 kg (Classic)</option>
                  <option value="1.5kg">1.5 kg (Standard)</option>
                  <option value="2.0kg">2.0 kg (Large)</option>
                  <option value="2.5kg">2.5 kg (Grand)</option>
                  <option value="4.0kg">4.0 kg (Banquet)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Dietary Preference</label>
                <button
                  type="button"
                  onClick={() => setEggless(!eggless)}
                  className={`w-full py-2 px-3 border rounded-xl text-xs font-sans font-semibold transition-all flex items-center justify-between ${
                    eggless
                      ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                      : 'bg-surface-deep text-on-surface-variant border-outline-variant/40 hover:border-primary/20'
                  }`}
                >
                  <span>🌱 Eggless (Pure Veg)</span>
                  <div className={`w-3.5 h-3.5 rounded-full border border-on-surface/20 shrink-0 ${eggless ? 'bg-white' : 'bg-transparent'}`} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant font-serif">Greeting on Cake</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Happy 30th!"
                  maxLength={30}
                  className="w-full bg-surface-deep border border-outline-variant/45 rounded-xl px-3 py-2.5 text-xs focus:border-primary outline-none text-on-surface"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="border-t border-outline-variant/10 pt-4">
              <label className="block text-xs font-sans font-semibold mb-2 text-on-surface-variant">Message / Design Specifications</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Describe customized frosting designs, structural requests, or any food allergy requirements here..."
                rows={4}
                className="w-full bg-surface-deep border border-outline-variant/40 rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-container text-on-surface hover:text-on-primary-container py-4 rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-muted-red transition-all shadow-lg hover:shadow-primary/10 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <span>Place Order Reservation Request</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
