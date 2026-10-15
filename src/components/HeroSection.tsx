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
      className="relative min-h-screen flex flex-col items-center justify-start pt-[38vh] sm:pt-[40vh] md:justify-end md:pt-24 lg:pt-0 pb-12 sm:pb-16 lg:pb-5 xl:pb-6 bg-[#2C211C] overflow-hidden"
    >
      {/* Background Image with Dark Romantic Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={normalizeImageUrl(weddingData.photos[0]) || 'https://lh3.googleusercontent.com/d/1PRTL4depovq7oQTmrjOWOMZlZgDTL73X'}
          alt="Wedding Cover"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_20%] md:object-[center_16%] lg:object-[center_14%] filter brightness-[0.78] contrast-[1.05] animate-fade-in"
        />
        {/* Soft gradient masks for readability - lighter on top so faces shine, darker at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714] via-[#1F1714]/40 to-black/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,15,13,0.50)_100%)]" />
      </div>

      {/* Decorative Gold Border Frame */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-8 border border-[#E8D4C4]/25 pointer-events-none rounded-2xl z-10 hidden sm:block" />

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl lg:max-w-3xl mx-auto px-4 text-center text-white flex flex-col items-center">
        {/* Top Tagline - Lowered on mobile to avoid covering faces, compact on desktop */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 lg:px-3 py-1.5 lg:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 lg:mb-2 text-[10.5px] sm:text-sm lg:text-xs uppercase tracking-wider sm:tracking-[0.25em] lg:tracking-[0.18em] text-[#F3DFD2] whitespace-nowrap shadow-sm">
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-3 lg:h-3 fill-[#D48166] text-[#D48166] shrink-0" />
          <span>{t.hero.tagline}</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-3 lg:h-3 fill-[#D48166] text-[#D48166] shrink-0" />
        </div>

        {/* Personalized Guest Badge / Greeting Banner - Compact on desktop */}
        <div className="mb-3 sm:mb-4 lg:mb-2 animate-in fade-in slide-in-from-top-2 duration-700">
          {guestName ? (
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-3.5 py-1.5 sm:py-2 lg:py-1 rounded-full bg-gradient-to-r from-[#D48166]/90 via-[#B86B52]/90 to-[#D48166]/90 backdrop-blur-md border border-[#FADCD1]/50 shadow-xl text-white">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3 lg:h-3 text-yellow-200 animate-pulse" />
              <div className="text-xs sm:text-sm lg:text-xs tracking-wide">
                <span className="opacity-90 font-light">{t.hero.invitedPrefix} </span>
                <span className="font-bold text-yellow-100 font-serif-title text-sm sm:text-base lg:text-sm tracking-normal">
                  {guestName}
                </span>
                {language === 'ja' && <span className="opacity-90 font-light"> 様</span>}
              </div>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-3 lg:h-3 text-yellow-200 animate-pulse" />
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 lg:px-3 py-1.5 lg:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs lg:text-[11px] text-[#F5EDE6]/90 shadow-sm">
              <span className="italic">{t.hero.generalGreeting}</span>
            </div>
          )}
        </div>

        {/* Couple Names - Mobile: Short names on single line (Việt Hoàng & Thái Bình); Desktop: Full names */}
        {/* Mobile ONLY: "Việt Hoàng & Thái Bình" on a single row */}
        <div className="my-2 sm:my-3 max-w-full px-2 block md:hidden">
          <h1 className="font-script text-2xl xs:text-3xl text-[#FFF6EE] leading-normal drop-shadow-md text-center whitespace-nowrap flex items-center justify-center gap-1.5 xs:gap-2">
            <span>{weddingData.groom.shortName || 'Việt Hoàng'}</span>
            <span className="text-xl xs:text-2xl text-[#E8A598] font-normal leading-none">&amp;</span>
            <span>{weddingData.bride.shortName || 'Thái Bình'}</span>
          </h1>
        </div>

        {/* Desktop ONLY: Full names on single row - Slightly smaller & compact on desktop to not obscure faces */}
        <div className="my-3 sm:my-4 lg:my-2 max-w-full px-4 hidden md:block">
          <h1 className="flex flex-row items-center justify-center gap-3 lg:gap-3.5 font-script text-3xl md:text-3xl lg:text-[34px] xl:text-[38px] text-[#FFF6EE] leading-normal drop-shadow-md text-center">
            <span>{weddingData.groom.fullName}</span>
            <span className="text-2xl lg:text-3xl text-[#E8A598] font-normal leading-none">&amp;</span>
            <span>{weddingData.bride.fullName}</span>
          </h1>
        </div>

        {/* Wedding Date Display */}
        <div className="mt-3 sm:mt-5 lg:mt-2 flex items-center justify-center gap-3 lg:gap-2 text-sm sm:text-base lg:text-xs font-cinzel tracking-[0.2em] lg:tracking-[0.16em] text-[#EAD8CB]">
          <span className="w-8 sm:w-12 lg:w-8 h-px bg-[#EAD8CB]/40"></span>
          <div className="flex items-center gap-2 lg:gap-1.5">
            <Calendar className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-[#D48166]" />
            <span className="font-semibold">
              {language === 'ja' ? `${year}年 ${month}月 05日・06日` : `05 & 06 • ${month} • ${year}`}
            </span>
          </div>
          <span className="w-8 sm:w-12 lg:w-8 h-px bg-[#EAD8CB]/40"></span>
        </div>

        {/* Location Hint */}
        <p className="mt-2 lg:mt-1 text-xs sm:text-sm lg:text-xs text-white/90 flex items-center justify-center gap-1.5 font-light">
          <MapPin className="w-3.5 h-3.5 lg:w-3 lg:h-3 text-[#D48166] shrink-0" />
          <span>Tư gia Nhà Gái &amp; Tư gia Nhà Trai</span>
        </p>

        {/* Romantic Invitation Quote / Personalized message */}
        <div className="mt-4 sm:mt-6 lg:mt-2.5 max-w-xl lg:max-w-lg px-4">
          <p className="text-xs sm:text-base lg:text-xs text-[#F5EDE6]/95 italic font-serif-title leading-relaxed lg:leading-normal">
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
                &ldquo;Vì một vài lý do chưa thể gặp mặt để tự tay trao thiệp, chúng con/ em/ mình xin gửi lời mời trân trọng nhất tới <span className="font-semibold text-yellow-200 not-italic">{guestName}</span> qua tấm thiệp này. Rất mong cô chú/ anh chị/ bạn sẽ đến dự tiệc và chung vui cùng chúng con/ em/ mình trong ngày trọng đại.&rdquo;
              </>
            ) : (
              weddingData.sweetQuote || t.hero.defaultQuote
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 lg:mt-3 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#xac-nhan-tham-du"
            className="px-6 sm:px-7 lg:px-5 py-2.5 sm:py-3 lg:py-2 rounded-full text-xs sm:text-sm lg:text-xs font-semibold tracking-wide bg-[#D48166] text-white hover:bg-[#BF6F55] shadow-lg shadow-[#D48166]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.nav.rsvp}
          </a>
        </div>

        {/* Scroll down indicator */}
        <a
          href="#cap-doi"
          className="mt-8 sm:mt-12 lg:mt-3 flex flex-col items-center text-white/60 hover:text-white transition-colors group"
          aria-label="Cuộn xuống"
        >
          <span className="text-[10px] sm:text-xs lg:text-[10px] uppercase tracking-widest mb-0.5 opacity-75 group-hover:opacity-100">{t.hero.scrollHint}</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
