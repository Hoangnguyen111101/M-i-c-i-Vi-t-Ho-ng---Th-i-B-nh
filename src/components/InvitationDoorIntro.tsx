import React, { useState } from 'react';
import { Heart, Sparkles, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData } from '../types';
import { FloralEmbossPattern } from './FloralEmbossPattern';
import { LaceHeartBow } from './LaceHeartBow';

interface InvitationDoorIntroProps {
  weddingData: WeddingData;
  guestName?: string | null;
  onOpen?: () => void;
}

export const InvitationDoorIntro: React.FC<InvitationDoorIntroProps> = ({
  weddingData,
  guestName,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Format wedding date for display (e.g. 06/12/2026)
  const dateObj = new Date(weddingData.weddingDate);
  const formattedDate = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : weddingData.weddingDate;

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Celebratory confetti shower in romantic rose gold, ruby pink and pastel tones
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.52, x: 0.5 },
        colors: ['#F43F5E', '#FB7185', '#FDE047', '#FDA4AF', '#FFF1F2'],
        ticks: 220,
        gravity: 0.85,
        scalar: 1.15,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 65,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#F43F5E', '#FBCFE8', '#FACC15'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#F43F5E', '#FBCFE8', '#FACC15'],
        });
      }, 300);
    } catch {
      // ignore
    }

    if (onOpen) {
      onOpen();
    }

    // Dismiss overlay from DOM after slide animation completes
    setTimeout(() => {
      setIsDismissed(true);
    }, 1400);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      id="invitation-door-intro"
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-700 ${
        isOpen ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Background Dimmer */}
      <div
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-1000 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* ==================== CÁNH CỬA BÊN TRÁI (LEFT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#FAF7F2] border-r border-[#DECFC0] shadow-2xl flex flex-col justify-between p-4 sm:p-8 md:p-12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset -14px 0 30px rgba(0,0,0,0.06), 14px 0 36px rgba(0,0,0,0.22)',
        }}
      >
        {/* Embossed Floral Botanical Pattern on Card Surface */}
        <FloralEmbossPattern side="left" />

        {/* Top Left Header */}
        <div className="relative z-10 text-left pt-2 sm:pt-4 pl-1 sm:pl-2">
          <span className="font-serif tracking-[0.16em] sm:tracking-[0.2em] text-[#2C1E18] text-[11px] xs:text-xs sm:text-sm font-semibold uppercase block whitespace-nowrap">
            Thư Mời Đám Cưới
          </span>
        </div>

        {/* Center Content: Groom Title & Calligraphy Name */}
        <div className="relative z-10 text-center sm:text-right sm:pr-8 md:pr-12 my-auto space-y-1 sm:space-y-2.5">
          <p className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#2C1E18] font-normal uppercase">
            CHU RỂ
          </p>
          <h2 className="font-script text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#1C120C] font-normal leading-normal whitespace-nowrap filter drop-shadow-2xs">
            {weddingData.groom.fullName}
          </h2>
        </div>

        {/* Bottom Left Greeting */}
        <div className="relative z-10 text-left pb-2 sm:pb-4 pl-1 sm:pl-2">
          <p className="font-serif italic text-xs sm:text-sm text-[#453429]">
            {guestName ? (
              <span>
                Thân mời: <strong className="font-bold text-[#8A4F3D]">{guestName}</strong>
              </span>
            ) : (
              'Trân trọng kính mời'
            )}
          </p>
        </div>
      </div>

      {/* ==================== CÁNH CỬA BÊN PHẢI (RIGHT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#FAF7F2] border-l border-[#DECFC0] shadow-2xl flex flex-col justify-between p-4 sm:p-8 md:p-12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset 14px 0 30px rgba(0,0,0,0.06), -14px 0 36px rgba(0,0,0,0.22)',
        }}
      >
        {/* Embossed Floral Botanical Pattern on Card Surface */}
        <FloralEmbossPattern side="right" />

        {/* Top Right Header */}
        <div className="relative z-10 text-right pt-2 sm:pt-4 pr-1 sm:pr-2">
          <span className="font-serif tracking-[0.16em] sm:tracking-[0.2em] text-[#2C1E18] text-[11px] xs:text-xs sm:text-sm font-semibold uppercase block whitespace-nowrap">
            Ngày Chung Đôi
          </span>
        </div>

        {/* Center Content: Bride Title & Calligraphy Name */}
        <div className="relative z-10 text-center sm:text-left sm:pl-8 md:pl-12 my-auto space-y-1 sm:space-y-2.5">
          <p className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#2C1E18] font-normal uppercase">
            CÔ DÂU
          </p>
          <h2 className="font-script text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#1C120C] font-normal leading-normal whitespace-nowrap filter drop-shadow-2xs">
            {weddingData.bride.fullName}
          </h2>
        </div>

        {/* Bottom Right Date */}
        <div className="relative z-10 text-right pb-2 sm:pb-4 pr-1 sm:pr-2">
          <p className="font-serif text-xs sm:text-sm text-[#453429] font-medium">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* ==================== Ở GIỮA: TRÁI TIM REN & NƠ LỤA TRẮNG ==================== */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? 'opacity-0 scale-125 pointer-events-none -translate-y-2/3'
            : 'opacity-100 scale-100'
        }`}
      >
        {/* Center Scalloped Lace Heart with White Satin Silk Ribbon Bow */}
        <LaceHeartBow onClick={handleOpenDoors} />
      </div>

      {/* ==================== NÚT BẤM MỞ THIỆP & DÒNG ÂM NHẠC ==================== */}
      <div
        className={`absolute top-[71%] sm:top-[72%] md:top-[74%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? 'opacity-0 pointer-events-none scale-95 translate-y-4'
            : 'opacity-100 scale-100'
        }`}
      >
        <button
          type="button"
          onClick={handleOpenDoors}
          className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-[#FF3377] via-[#F43F5E] to-[#FB7185] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_8px_25px_rgba(244,63,94,0.48)] hover:shadow-[0_12px_32px_rgba(244,63,94,0.65)] border border-white/70 flex items-center gap-2 transform active:scale-95 hover:scale-105 transition-all cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
          <span className="font-bold whitespace-nowrap">Chạm vào nơ để mở thiệp nha</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin-slow" />
        </button>

        <p className="mt-2 text-xs sm:text-sm text-[#2C1E18] font-medium flex items-center justify-center gap-1.5 opacity-90">
          <Music className="w-3.5 h-3.5 text-[#2C1E18]" />
          <span>Nhạc cưới tự động phát khi mở</span>
        </p>
      </div>
    </div>
  );
};
