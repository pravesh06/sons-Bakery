import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryItems } from '../data';
import { Eye, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Extract all unique categories
  const categories = ['All', 'Wedding Cakes', 'Cupcakes', 'Artisan Breads', 'Modern Design', 'French Macarons', 'Sons Boutique'];

  // Filter items based on selected category
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleOpenLightbox = (index: number) => {
    // Find item's original index in the main list so Next/Prev work relative to filtered or unfiltered
    const itemInFiltered = filteredItems[index];
    const originalIndex = galleryItems.findIndex((it) => it.id === itemInFiltered.id);
    setLightboxIndex(originalIndex);
    setZoomScale(1);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        return (prevIndex + 1) % galleryItems.length;
      });
      setZoomScale(1);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => {
        if (prevIndex === null) return 0;
        return prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1;
      });
      setZoomScale(1);
    }
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 1));
  };

  return (
    <section id="gallery" className="py-20 bg-surface-deep relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-sans font-bold text-xs uppercase tracking-[0.2em] mb-2.5 block">Our Portfolio</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-on-surface font-bold mb-4">Our Visual Journey</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
        </div>

        {/* Categories checklist tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-primary-container text-on-surface border-primary/25 shadow-md'
                  : 'bg-surface-alt text-on-surface-variant border-primary/5 hover:border-primary/20 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="gallery-item relative aspect-square group overflow-hidden rounded-2xl bg-surface-alt border border-outline-variant/10 cursor-pointer"
                onClick={() => handleOpenLightbox(idx)}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                  src={item.image}
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 text-left" id={`gallery-item-desc-${item.id}`}>
                  <span className="text-primary text-[10px] uppercase tracking-widest font-sans font-bold mb-1">{item.category}</span>
                  <h4 className="text-on-surface font-serif text-base font-bold leading-tight mb-1.5">{item.title}</h4>
                  <p className="text-on-surface-variant text-[11px] font-sans font-light leading-relaxed truncate">{item.description}</p>
                  <div className="mt-3.5 flex items-center gap-1 text-[10px] text-primary font-semibold uppercase tracking-wider">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Masterpiece</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />

            {/* Navigation Left */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-10 p-3 rounded-full bg-surface-alt/80 border border-primary/10 text-primary hover:text-on-surface hover:bg-primary-container transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Navigation Right */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-10 p-3 rounded-full bg-surface-alt/80 border border-primary/10 text-primary hover:text-on-surface hover:bg-primary-container transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content Area */}
            <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center z-10">
              {/* Toolbar */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-surface-deep/80 border border-primary/10 text-primary hover:text-on-surface transition-all"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-surface-deep/80 border border-primary/10 text-primary hover:text-on-surface transition-all"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-surface-deep/80 border border-primary/10 text-primary hover:text-on-surface transition-all"
                  title="Close Lightbox"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Image Frame */}
              <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-primary/10 bg-surface-deep relative flex items-center justify-center aspect-video md:aspect-[4/3]">
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: zoomScale }}
                  transition={{ type: 'spring', damping: 25 }}
                  src={galleryItems[lightboxIndex].image}
                  alt={galleryItems[lightboxIndex].title}
                  className="max-h-[70vh] object-contain transition-transform duration-200 pointer-events-none"
                />
              </div>

              {/* Meta details below image */}
              <div className="w-full max-w-3xl mt-4 text-left px-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary text-xs uppercase tracking-widest font-sans font-bold">
                    {galleryItems[lightboxIndex].category}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-on-surface">
                  {galleryItems[lightboxIndex].title}
                </h3>
                <p className="text-on-surface-variant text-sm font-sans font-light mt-1.5 leading-relaxed">
                  {galleryItems[lightboxIndex].description}
                </p>
                <p className="text-[10px] text-on-surface-variant font-mono mt-2 uppercase tracking-wide">
                  Image {lightboxIndex + 1} of {galleryItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
