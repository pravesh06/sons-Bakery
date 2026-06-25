import { motion } from 'motion/react';
import { X, Check, Calendar, Cake as CakeIcon, Phone, User, FileText, Sparkles, Receipt } from 'lucide-react';
import { OrderRequest } from '../types';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRequest | null;
  customDesignDetails?: string;
  orderId: string;
}

export default function OrderSuccessModal({ isOpen, onClose, order, customDesignDetails, orderId }: OrderSuccessModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-primary/20 bg-surface-alt shadow-2xl"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative flex justify-between items-center px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-sans">Artisanal Booking</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 pt-2 overflow-y-auto max-h-[80vh] custom-scrollbar">
          {/* Circular Success Check */}
          <div className="mx-auto w-16 h-16 bg-primary-container/30 border border-primary/40 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-center font-serif text-2xl md:text-3xl text-on-surface mb-2 font-bold">
            Order Request Placed
          </h3>
          <p className="text-center text-sm text-on-surface-variant mb-6 max-w-sm mx-auto">
            Our head artisan and concierge will review your design requirements and call you within 24 hours.
          </p>

          {/* Ticket Body */}
          <div className="relative border border-outline-variant/30 rounded-2xl bg-surface-deep overflow-hidden">
            {/* Header / Brand of the ticket */}
            <div className="bg-primary-container/20 border-b border-outline-variant/20 px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg font-bold text-on-surface leading-tight">Sons Bakery</h4>
                <p className="text-[10px] tracking-widest text-primary font-sans uppercase">Since 2019 • Estd.</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] bg-primary/25 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-mono font-medium">
                  {orderId}
                </span>
                <p className="text-[10px] text-on-surface-variant mt-1">Order Code</p>
              </div>
            </div>

            {/* Ticket Contents */}
            <div className="p-6 space-y-4 text-sm relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <User className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Guest Name</p>
                    <p className="font-semibold text-on-surface">{order.fullName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Contact</p>
                    <p className="font-semibold text-on-surface">{order.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CakeIcon className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Creation Selected</p>
                    <p className="font-semibold text-on-surface">{order.cakeType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4.5 h-4.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Delivery Date</p>
                    <p className="font-semibold text-on-surface">
                      {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString(undefined, {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'Pending confirmation'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Extra specifications */}
              <div className="border-t border-outline-variant/15 pt-3 mt-1 grid grid-cols-3 gap-2 bg-surface-alt/40 p-3 rounded-lg text-center text-xs">
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-wider">Weight</p>
                  <p className="font-semibold text-primary mt-0.5">{order.weight}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-wider">Dietary</p>
                  <p className="font-semibold text-primary mt-0.5">{order.eggless ? 'Eggless (100% Veg)' : 'Classic'}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-wider">Custom Text</p>
                  <p className="font-semibold text-primary mt-0.5 truncate max-w-[120px]">{order.customText ? `"${order.customText}"` : 'None'}</p>
                </div>
              </div>

              {/* Custom Design Specifications (if custom dream builder is used) */}
              {customDesignDetails && (
                <div className="border-t border-outline-variant/15 pt-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Dream Cake Recipe</p>
                      <p className="text-xs text-on-surface/90 italic leading-relaxed mt-0.5">
                        {customDesignDetails}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              {order.instructions && (
                <div className="border-t border-outline-variant/15 pt-3">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-on-surface-variant uppercase tracking-wider">Special Instructions</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                        {order.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Receipt Note */}
              <div className="border-t border-dashed border-outline-variant/30 pt-3 flex items-center justify-between text-xs text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Est. Price: ₹499 - ₹1,499</span>
                </div>
                <span className="italic">Subject to custom details</span>
              </div>

              {/* Beautiful ticket cutout circles on the sides */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-surface-alt border border-r-0 border-outline-variant/30 shrink-0" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-surface-alt border border-l-0 border-outline-variant/30 shrink-0" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full bg-primary-container text-on-primary py-3 rounded-xl font-medium hover:bg-muted-red transition-all shadow-lg hover:shadow-primary/10 text-sm font-sans flex items-center justify-center gap-2"
            >
              <span>Perfect, I'll await your call</span>
            </button>
            <p className="text-center text-[11px] text-on-surface-variant font-mono">
              Reservation Reference ID: SEC-{orderId}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
