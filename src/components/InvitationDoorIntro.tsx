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
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Celebratory confetti shower in pastel & rose tones
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.55, x: 0.5 },
        colors: ['#F472B6', '#FB7185', '#FDE047', '#E2D1C3', '#FBCFE8'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
      });

      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#F472B6', '#FBCFE8', '#D4AF37'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#F472B6', '#FBCFE8', '#D4AF37'],
        });
      }, 300);
    } catch {
      // ignore
    }

    // Trigger parent callback (music playback etc.)
    if (onOpen) {
      onOpen();
    }

    // Dismiss overlay from DOM after 1.4s animation
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
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#FAF7F2] border-r border-[#DECFC0] shadow-2xl flex flex-col justify-center p-4 sm:p-8 md:p-12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset -10px 0 25px rgba(0,0,0,0.07), 12px 0 32px rgba(0,0,0,0.22)',
        }}
      >
        {/* Embossed Floral Botanical Wallpaper Pattern */}
        <FloralEmbossPattern side="left" />

        {/* Center Content: Groom Title & Name */}
        <div className="relative z-10 text-center sm:text-right sm:pr-6 md:pr-10 space-y-1 sm:space-y-2">
          <p className="font-serif text-xs sm:text-sm md:text-base tracking-[0.22em] text-[#3A2A22] font-medium uppercase">
            Chú Rể
          </p>
          <h2 className="font-script text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#221610] font-normal leading-normal whitespace-nowrap filter drop-shadow-2xs">
            {weddingData.groom.fullName}
          </h2>
        </div>
      </div>

      {/* ==================== CÁNH CỬA BÊN PHẢI (RIGHT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#FAF7F2] border-l border-[#DECFC0] shadow-2xl flex flex-col justify-center p-4 sm:p-8 md:p-12 transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset 10px 0 25px rgba(0,0,0,0.07), -12px 0 32px rgba(0,0,0,0.22)',
        }}
      >
        {/* Embossed Floral Botanical Wallpaper Pattern */}
        <FloralEmbossPattern side="right" />

        {/* Center Content: Bride Title & Name */}
        <div className="relative z-10 text-center sm:text-left sm:pl-6 md:pl-10 space-y-1 sm:space-y-2">
          <p className="font-serif text-xs sm:text-sm md:text-base tracking-[0.22em] text-[#3A2A22] font-medium uppercase">
            Cô Dâu
          </p>
          <h2 className="font-script text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#221610] font-normal leading-normal whitespace-nowrap filter drop-shadow-2xs">
            {weddingData.bride.fullName}
          </h2>
        </div>
      </div>

      {/* ==================== Ở GIỮA: NƠ REN HÌNH TRÁI TIM & NÚT MỞ THIỆP ==================== */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? 'opacity-0 scale-125 pointer-events-none -translate-y-2/3'
            : 'opacity-100 scale-100'
        }`}
      >
        {/* Center Heart Lace & White Satin Ribbon Bow */}
        <LaceHeartBow onClick={handleOpenDoors} />

        {/* Call-to-action Button & Notes */}
        <div className="mt-2 sm:mt-3 text-center flex flex-col items-center">
          <button
            type="button"
            onClick={handleOpenDoors}
            className="px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-[#FF5083] via-[#F43F5E] to-[#FB7185] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_8px_25px_rgba(244,63,94,0.42)] hover:shadow-[0_12px_32px_rgba(244,63,94,0.6)] border border-white/60 flex items-center gap-2 transform active:scale-95 hover:scale-105 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
            <span className="font-bold whitespace-nowrap">Chạm vào nơ để mở thiệp nha</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin-slow" />
          </button>

          <p className="mt-2 text-[11px] sm:text-xs text-[#3E3029] font-medium flex items-center justify-center gap-1.5 opacity-90">
            <Music className="w-3 h-3 text-[#3E3029]" />
            <span>Nhạc cưới tự động phát khi mở</span>
          </p>
        </div>
      </div>
    </div>
  );
};
