import React from 'react';
import { Heart, Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  weddingData: WeddingData;
  guestName?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ weddingData, guestName }) => {
  const { t, language } = useLanguage();
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
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 text-[10.5px] sm:text-sm uppercase tracking-wider sm:tracking-[0.25em] text-[#F3DFD2] whitespace-nowrap">
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D48166] text-[#D48166] shrink-0" />
          <span>{t.hero.tagline}</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D48166] text-[#D48166] shrink-0" />
        </div>

        {/* Personalized Guest Badge / Greeting Banner */}
        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-700">
          {guestName ? (
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D48166]/90 via-[#B86B52]/90 to-[#D48166]/90 backdrop-blur-md border border-[#FADCD1]/50 shadow-xl text-white">
              <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
              <div className="text-xs sm:text-sm tracking-wide">
                <span className="opacity-90 font-light">{t.hero.invitedPrefix} </span>
                <span className="font-bold text-yellow-100 font-serif-title text-sm sm:text-base tracking-normal">
                  {guestName}
                </span>
                {language === 'ja' && <span className="opacity-90 font-light"> 様</span>}
              </div>
              <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#F5EDE6]/90">
              <span className="italic">{t.hero.generalGreeting}</span>
            </div>
          )}
        </div>

        {/* Couple Names - Responsive layout: column on mobile (<768px) and row on desktop */}
        <div className="my-3 sm:my-4 max-w-full px-4">
          <h1 className="flex flex-col md:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4 font-script text-3xl sm:text-4xl md:text-5xl text-[#FFF6EE] leading-snug sm:leading-normal drop-shadow-md text-center">
            <span className="text-center">{weddingData.groom.fullName}</span>
            <span className="text-xl sm:text-2xl md:text-4xl text-[#E8A598] font-normal leading-none my-0.5 md:my-0">&amp;</span>
            <span className="text-center">{weddingData.bride.fullName}</span>
          </h1>
        </div>

        {/* Wedding Date Display */}
        <div className="mt-3 sm:mt-5 flex items-center justify-center gap-3 text-sm sm:text-base font-cinzel tracking-[0.2em] text-[#EAD8CB]">
          <span className="w-8 sm:w-12 h-px bg-[#EAD8CB]/40"></span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D48166]" />
            <span className="font-semibold">
              {language === 'ja' ? `${year}年 ${month}月 ${day}日` : `${day} • ${month} • ${year}`}
            </span>
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

        {/* Romantic Invitation Quote / Personalized message */}
        <div className="mt-6 max-w-xl px-4">
          <p className="text-sm sm:text-base text-[#F5EDE6]/95 italic font-serif-title leading-relaxed">
            {language === 'ja' ? (
              guestName ? (
                <>
                  &ldquo;{t.hero.personalizedQuotePrefix} <span className="font-semibold text-yellow-200 not-italic">{guestName}</span>{t.hero.personalizedQuoteSuffix}&rdquo;
                </>
              ) : (
                `“${t.hero.defaultQuote}”`
              )
            ) : guestName ? (
              <>
                &ldquo;Đây là lời mời chân thành của chúng em/con gửi tới <span className="font-semibold text-yellow-200 not-italic">{guestName}</span>. Vì một vài lý do mà chúng con chưa thể gửi thiệp tận tay, chúng con rất mong tấm thiệp chân tình này sẽ được đón chào quý khách đến chung vui ngày hạnh phúc nhất của tụi con!&rdquo;
              </>
            ) : (
              weddingData.sweetQuote || t.hero.defaultQuote
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#xac-nhan-tham-du"
            className="px-7 py-3 rounded-full text-sm font-semibold tracking-wide bg-[#D48166] text-white hover:bg-[#BF6F55] shadow-lg shadow-[#D48166]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.nav.rsvp}
          </a>
        </div>

        {/* Scroll down indicator */}
        <a
          href="#cap-doi"
          className="mt-12 sm:mt-16 flex flex-col items-center text-white/60 hover:text-white transition-colors group"
          aria-label="Cuộn xuống"
        >
          <span className="text-xs uppercase tracking-widest mb-1 opacity-75 group-hover:opacity-100">{t.hero.scrollHint}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
