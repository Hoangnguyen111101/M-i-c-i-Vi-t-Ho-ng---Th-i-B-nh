import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, MoveRight } from 'lucide-react';
import { WeddingData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';
import { useLanguage } from '../i18n/LanguageContext';

interface GallerySectionProps {
  weddingData: WeddingData;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ weddingData }) => {
  const { t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Monitor scroll position for button states
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [weddingData.photos.length]);

  const slideLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.8, 380);
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.clientWidth * 0.8, 380);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, weddingData.photos.length]);

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % weddingData.photos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + weddingData.photos.length) % weddingData.photos.length);
  };

  return (
    <section id="album-anh" className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-[#EDE1D6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="text-center sm:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8D6C9] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-[#B87A65]" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
              {t.gallery.title}
            </h2>
            <p className="mt-2 text-[#6E5B4F] text-xs sm:text-sm leading-relaxed">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Slider Buttons (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={slideLeft}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-[#D9C4B5] bg-white text-[#5C4236] flex items-center justify-center hover:bg-[#F3EBE3] transition-all shadow-xs disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label={t.gallery.slideLeftAria}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={slideRight}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-[#D9C4B5] bg-white text-[#5C4236] flex items-center justify-center hover:bg-[#F3EBE3] transition-all shadow-xs disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label={t.gallery.slideRightAria}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Container with Scroll Snap and Hidden Scrollbar */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1 -mx-4 sm:-mx-6 px-4 sm:px-6"
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {weddingData.photos.map((photoUrl, index) => (
            <div
              key={index}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative cursor-pointer overflow-hidden shrink-0 snap-center w-[78vw] xs:w-[70vw] sm:w-[320px] md:w-[350px] aspect-[3/4] transition-all duration-500 transform hover:-translate-y-2 p-2 sm:p-2.5"
              style={{
                scrollSnapAlign: 'center',
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Inner Photo Frame */}
              <div className="w-full h-full relative overflow-hidden rounded-[14px]">
                <img
                  src={normalizeImageUrl(photoUrl)}
                  alt={t.gallery.photoAlt(index)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                
                {/* Photo Index Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-medium tracking-wide">
                  {index + 1} / {weddingData.photos.length}
                </div>

                {/* Overlay on hover / tap */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-white text-xs font-serif-title italic">{t.gallery.viewHint}</span>
                  <span className="p-2 rounded-full bg-white/90 text-[#43302B] shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs text-[#8F7668] mt-4 font-medium">
          <span>{t.gallery.viewHint}</span>
          <MoveRight className="w-4 h-4 animate-pulse text-[#B87A65]" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label={t.gallery.closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Photo Counter */}
          <div className="absolute top-6 left-6 text-white/80 text-xs sm:text-sm font-medium tracking-wider">
            Ảnh {activePhotoIndex + 1} / {weddingData.photos.length}
          </div>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 text-white p-2.5 rounded-full bg-white/15 hover:bg-white/30 transition-all z-50"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image display */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={normalizeImageUrl(weddingData.photos[activePhotoIndex])}
              alt={`Ảnh cưới chi tiết ${activePhotoIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 text-white p-2.5 rounded-full bg-white/15 hover:bg-white/30 transition-all z-50"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
