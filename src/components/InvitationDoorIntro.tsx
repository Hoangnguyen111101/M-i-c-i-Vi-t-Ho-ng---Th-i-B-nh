import React, { useState } from 'react';
import { Sparkles, Heart, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData } from '../types';
import { RedVelvetBow } from './RedVelvetBow';

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

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 1. Fire celebratory confetti shower in romantic red velvet, rose gold, and champagne gold
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.55, x: 0.5 },
        colors: ['#C4122D', '#990017', '#E5C185', '#FDE047', '#FAF5EE', '#800010'],
        ticks: 220,
        gravity: 0.8,
        scalar: 1.15,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 65,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#C4122D', '#E5C185', '#FDE047', '#800010'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#C4122D', '#E5C185', '#FDE047', '#800010'],
        });
      }, 300);
    } catch {
      // ignore
    }

    // 2. Notify parent (e.g. to start playing wedding music)
    if (onOpen) {
      onOpen();
    }

    // 3. Remove overlay from DOM after animation completes (1.4s)
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
      {/* Background shadow/lighting layer */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-1000 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* ==================== CÁNH CỬA BÊN TRÁI (LEFT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#FAF6F0] border-r border-[#E2D1C3] shadow-2xl flex flex-col justify-between p-6 sm:p-12 transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset -8px 0 20px rgba(0,0,0,0.06), 10px 0 30px rgba(0,0,0,0.25)',
        }}
      >
        {/* Subtle vintage texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#E8DACF_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Outer decorative golden border */}
        <div className="absolute inset-4 sm:inset-8 border-2 border-[#D9C4B5] pointer-events-none rounded-l-2xl">
          <div className="absolute inset-1 border border-[#EADBCE] rounded-l-xl" />
        </div>

        {/* Center content on Left Door: Groom Initial Crest */}
        <div className="relative z-10 text-center sm:text-right sm:pr-8 space-y-3 my-auto">
          {/* Circular Gold Crest with Groom's Short Name */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-[#CBB3A2] bg-[#F4EDE5] shadow-inner">
            <span className="font-script text-3xl sm:text-5xl text-[#7E4B3D] font-bold">
              {weddingData.groom.shortName || 'CR'}
            </span>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9C8476] font-medium">
              Chú Rể
            </p>
            <h3 className="font-serif-title text-base sm:text-2xl text-[#3D2C24] font-bold truncate">
              {weddingData.groom.fullName}
            </h3>
          </div>
        </div>

        {/* Ribbon band running horizontally on Left Door */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 sm:h-20 bg-gradient-to-r from-[#66000D] via-[#A80D25] to-[#D61836] shadow-lg border-y-2 border-[#E5C185]/80 pointer-events-none flex items-center justify-end pr-3">
          {/* Ribbon woven stitch lines with luxury golden dashes */}
          <div className="w-full h-full flex flex-col justify-between py-1.5 opacity-70">
            <div className="border-b-2 border-dashed border-[#FFF3D6]" />
            <div className="border-t-2 border-dashed border-[#FFF3D6]" />
          </div>
        </div>
      </div>

      {/* ==================== CÁNH CỬA BÊN PHẢI (RIGHT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#FAF6F0] border-l border-[#E2D1C3] shadow-2xl flex flex-col justify-between p-6 sm:p-12 transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset 8px 0 20px rgba(0,0,0,0.06), -10px 0 30px rgba(0,0,0,0.25)',
        }}
      >
        {/* Subtle vintage texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#E8DACF_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Outer decorative golden border */}
        <div className="absolute inset-4 sm:inset-8 border-2 border-[#D9C4B5] pointer-events-none rounded-r-2xl">
          <div className="absolute inset-1 border border-[#EADBCE] rounded-r-xl" />
        </div>

        {/* Center content on Right Door: Bride Initial Crest */}
        <div className="relative z-10 text-center sm:text-left sm:pl-8 space-y-3 my-auto">
          {/* Circular Gold Crest with Bride's Short Name */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 border-[#CBB3A2] bg-[#F4EDE5] shadow-inner">
            <span className="font-script text-3xl sm:text-5xl text-[#7E4B3D] font-bold">
              {weddingData.bride.shortName || 'CD'}
            </span>
          </div>

          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9C8476] font-medium">
              Cô Dâu
            </p>
            <h3 className="font-serif-title text-base sm:text-2xl text-[#3D2C24] font-bold truncate">
              {weddingData.bride.fullName}
            </h3>
          </div>
        </div>

        {/* Ribbon band running horizontally on Right Door */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 sm:h-20 bg-gradient-to-r from-[#D61836] via-[#A80D25] to-[#66000D] shadow-lg border-y-2 border-[#E5C185]/80 pointer-events-none flex items-center justify-start pl-3">
          {/* Ribbon woven stitch lines with luxury golden dashes */}
          <div className="w-full h-full flex flex-col justify-between py-1.5 opacity-70">
            <div className="border-b-2 border-dashed border-[#FFF3D6]" />
            <div className="border-t-2 border-dashed border-[#FFF3D6]" />
          </div>
        </div>
      </div>

      {/* ==================== Ở GIỮA: CHIẾC NƠ NHUNG ĐỎ SANG TRỌNG & HOÀNG GIA ==================== */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? 'opacity-0 scale-125 pointer-events-none -translate-y-2/3'
            : 'opacity-100 scale-100 cursor-pointer'
        }`}
        onClick={handleOpenDoors}
      >
        {/* Soft Dreamy Crimson & Gold Glow Halo behind Red Velvet Bow */}
        <div className="absolute -inset-12 sm:-inset-20 bg-gradient-to-r from-red-600/35 via-rose-600/30 to-amber-400/25 rounded-full blur-3xl animate-cute-glow pointer-events-none" />

        {/* Interactive Bow Container with gentle floating & hover bounce */}
        <div className="relative group flex flex-col items-center p-2 sm:p-4">
          {/* THE LUXURIOUS RED VELVET BOW */}
          <div className="relative animate-cute-float">
            <RedVelvetBow isOpen={isOpen} />

            {/* Sparkle star accents on bow */}
            <div className="absolute top-3 right-5 text-yellow-300 animate-spin-slow pointer-events-none">
              <Sparkles className="w-7 h-7 drop-shadow-md" />
            </div>
            <div className="absolute top-6 left-5 text-amber-200 animate-pulse pointer-events-none">
              <Sparkles className="w-5 h-5 drop-shadow" />
            </div>
          </div>

          {/* CALL TO ACTION BUTTON (Mở Thiệp - Phong cách nơ đỏ hoàng gia sang trọng) */}
          <div className="mt-1 sm:mt-2 text-center flex flex-col items-center">
            {guestName && (
              <div className="mb-2.5 px-4 py-1.5 rounded-full bg-white/95 text-[#7E0013] border border-red-200 shadow-md flex items-center gap-1.5 text-xs sm:text-sm font-medium animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-[#C4122D]" />
                <span>Thân mời: <strong className="font-serif-title font-bold text-[#C4122D] text-sm sm:text-base">{guestName}</strong></span>
              </div>
            )}
            <button
              type="button"
              className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-[#8B0014] via-[#C4122D] to-[#7A0010] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(139,0,20,0.45)] hover:shadow-[0_14px_32px_rgba(139,0,20,0.65)] border-2 border-[#F5D59A]/85 flex items-center gap-2 transform active:scale-95 transition-all group-hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-[#FDE047] text-[#FDE047] animate-bounce" />
              <span className="font-bold whitespace-nowrap">Chạm vào nơ đỏ để mở thiệp nha ❤️</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            </button>

            <p className="mt-2 text-[11px] sm:text-xs text-[#6B3224] font-semibold flex items-center justify-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1 rounded-full border border-[#EADBCE] shadow-xs mx-auto w-fit">
              <Music className="w-3 h-3 text-[#C4122D]" />
              <span>Nhạc cưới tự động phát khi mở</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
