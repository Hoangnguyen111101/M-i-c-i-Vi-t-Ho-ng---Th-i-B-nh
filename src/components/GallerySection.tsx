import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { WeddingData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';

interface GallerySectionProps {
  weddingData: WeddingData;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ weddingData }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

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
    <section id="album-anh" className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-[#EDE1D6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8D6C9] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#B87A65]" />
            <span>Khoảnh Khắc Hạnh Phúc</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            Album Ảnh Cưới
          </h2>
          <p className="mt-3 text-[#6E5B4F] text-sm leading-relaxed">
            Những thước hình lưu giữ từng nụ cười, cái ôm và tình yêu trọn vẹn của chúng mình.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {weddingData.photos.map((photoUrl, index) => (
            <div
              key={index}
              onClick={() => setActivePhotoIndex(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-black/5 aspect-[3/4] ${
                index === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : ''
              }`}
            >
              <img
                src={normalizeImageUrl(photoUrl)}
                alt={`Ảnh cưới ${index + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-white/90 text-[#43302B] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
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
            aria-label="Đóng xem ảnh"
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
