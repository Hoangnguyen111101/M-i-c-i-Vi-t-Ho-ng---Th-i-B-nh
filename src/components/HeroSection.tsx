import React from 'react';
import { Heart, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WeddingData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';

interface HeroSectionProps {
  weddingData: WeddingData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ weddingData }) => {
  const weddingDateObj = new Date(weddingData.weddingDate);
  const day = weddingDateObj.getDate().toString().padStart(2, '0');
  const month = (weddingDateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = weddingDateObj.getFullYear();

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#2C211C]"
    >
      {/* Background Image with Dark Romantic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={normalizeImageUrl(weddingData.photos[0]) || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80'}
          alt="Wedding Cover"
          className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.05] scale-105 animate-fade-in"
        />
        {/* Soft gradient masks for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714] via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,15,13,0.7)_100%)]" />
      </div>

      {/* Decorative Gold Border Frame */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 border border-[#E8D4C4]/25 pointer-events-none rounded-2xl z-10 hidden sm:block" />

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white flex flex-col items-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#F3DFD2]">
          <Heart className="w-3.5 h-3.5 fill-[#D48166] text-[#D48166]" />
          <span>Save The Date • Thư Mời Thành Hôn</span>
          <Heart className="w-3.5 h-3.5 fill-[#D48166] text-[#D48166]" />
        </div>

        {/* Couple Names - Horizontal layout, elegant smaller font, never vertical */}
        <div className="my-2 sm:my-4 max-w-full px-2">
          <h1 className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 font-script text-2xl sm:text-4xl md:text-5xl text-[#FFF6EE] leading-normal drop-shadow-md text-center">
            <span className="whitespace-nowrap">{weddingData.groom.fullName}</span>
            <span className="text-xl sm:text-3xl md:text-4xl text-[#E8A598] font-normal">&amp;</span>
            <span className="whitespace-nowrap">{weddingData.bride.fullName}</span>
          </h1>
        </div>

        {/* Wedding Date Display */}
        <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 text-sm sm:text-base font-cinzel tracking-[0.2em] text-[#EAD8CB]">
          <span className="w-8 sm:w-12 h-px bg-[#EAD8CB]/40"></span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D48166]" />
            <span className="font-semibold">{`${day} • ${month} • ${year}`}</span>
          </div>
          <span className="w-8 sm:w-12 h-px bg-[#EAD8CB]/40"></span>
        </div>

        {/* Location Hint */}
        {weddingData.events.length > 0 && (
          <p className="mt-2 text-xs sm:text-sm text-white/80 flex items-center justify-center gap-1.5 font-light">
            <MapPin className="w-3.5 h-3.5 text-[#D48166]" />
            <span>{weddingData.events[weddingData.events.length - 1].venueName}</span>
          </p>
        )}

        {/* Romantic Quote */}
        <p className="mt-6 max-w-xl text-sm sm:text-base text-[#F5EDE6]/90 italic font-serif-title leading-relaxed px-4">
          {weddingData.sweetQuote}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#xac-nhan-tham-du"
            className="px-7 py-3 rounded-full text-sm font-semibold tracking-wide bg-[#D48166] text-white hover:bg-[#BF6F55] shadow-lg shadow-[#D48166]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Xác Nhận Tham Dự (RSVP)
          </a>
          <a
            href="#hop-mung-cuoi"
            className="px-7 py-3 rounded-full text-sm font-semibold tracking-wide bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Hộp Mừng Cưới
          </a>
        </div>

        {/* Scroll down indicator */}
        <a
          href="#cap-doi"
          className="mt-12 sm:mt-16 flex flex-col items-center text-white/60 hover:text-white transition-colors group"
          aria-label="Cuộn xuống"
        >
          <span className="text-xs uppercase tracking-widest mb-1 opacity-75 group-hover:opacity-100">Khám phá</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
