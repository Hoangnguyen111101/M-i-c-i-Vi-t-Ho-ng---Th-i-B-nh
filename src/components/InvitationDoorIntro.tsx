import React, { useState } from 'react';
import { Sparkles, Heart, Music, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData } from '../types';
import bowIvoryPng from '../assets/bow-ivory.png';
import { defaultBowBase64 } from '../assets/bowBase64';
import { useLanguage, LanguageToggle } from '../i18n/LanguageContext';

interface InvitationDoorIntroProps {
  weddingData: WeddingData;
  guestName?: string | null;
  onOpen?: () => void;
  onUpdateBowImage?: (image: string) => void;
}

export const InvitationDoorIntro: React.FC<InvitationDoorIntroProps> = ({
  weddingData,
  guestName,
  onOpen,
  onUpdateBowImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [bowLoadFailed, setBowLoadFailed] = useState(false);
  const { t } = useLanguage();

  const rawBow = weddingData.doorBowImage;
  const isCustomUserUpload = !!(rawBow && (rawBow.startsWith('data:image/') || rawBow.startsWith('blob:') || rawBow.startsWith('http')));
  
  // Use user's uploaded custom image if valid; otherwise use bundled zero-latency inlined satin bow
  const effectiveBowImage = bowLoadFailed
    ? defaultBowBase64
    : (isCustomUserUpload
        ? rawBow
        : (defaultBowBase64 || bowIvoryPng));

  const handleOpenDoors = () => {
    if (isOpen) return;
    setIsOpen(true);

    // 1. Celebratory confetti shower in champagne gold, ivory pearl, rose gold & warm bronze
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.55, x: 0.5 },
        colors: ['#D4AF37', '#F5EFEB', '#E6CDB5', '#B87A65', '#FFFFFF', '#C59B6D'],
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
          colors: ['#D4AF37', '#E6CDB5', '#FFFFFF', '#B87A65'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 65,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#D4AF37', '#E6CDB5', '#FFFFFF', '#B87A65'],
        });
      }, 300);
    } catch {
      // ignore
    }

    // 2. Notify parent & trigger music playback synchronously within user click gesture
    try {
      window.dispatchEvent(new CustomEvent('wedding:play-music'));
    } catch {
      // ignore
    }
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

      {/* Floating Language Switcher at Top Right of Door */}
      <div
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <LanguageToggle variant="glass" />
      </div>

      {/* ==================== CÁNH CỬA BÊN TRÁI (LEFT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#FAF7F2] border-r border-[#E2D1C3] shadow-2xl flex flex-col justify-between p-4 xs:p-6 sm:p-12 transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset -8px 0 20px rgba(0,0,0,0.06), 10px 0 30px rgba(0,0,0,0.25)',
        }}
      >
        {/* Laid paper texture with delicate vertical lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#E8DACF_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />

        {/* Outer decorative golden border */}
        <div className="absolute inset-3 sm:inset-8 border-2 border-[#D9C4B5] pointer-events-none rounded-l-2xl">
          <div className="absolute inset-1 border border-[#EADBCE] rounded-l-xl" />
        </div>

        {/* Outer content on Left Door: Groom Initial Crest (Đưa hẳn ra phía ngoài bên trái để không bị nơ che) */}
        <div className="relative z-10 flex flex-col items-start text-left pl-3 xs:pl-6 sm:pl-10 md:pl-14 lg:pl-18 pr-1 sm:pr-24 lg:pr-32 my-auto space-y-2 xs:space-y-3 max-w-[92%] sm:max-w-[76%]">
          {/* Circular Gold Crest with Groom's Short Name */}
          <div className="self-start inline-flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full border-2 border-[#CBB3A2] bg-[#F4EDE5] shadow-inner transition-transform hover:scale-105">
            <span className="font-script text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#7E4B3D] font-normal leading-none">
              {weddingData.groom.shortName || 'CR'}
            </span>
          </div>

          <div>
            <p className="font-serif-title text-[9.5px] xs:text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9C8476] font-semibold text-left">
              {t.door.groomLabel}
            </p>
          </div>
        </div>

      </div>

      {/* ==================== CÁNH CỬA BÊN PHẢI (RIGHT DOOR) ==================== */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#FAF7F2] border-l border-[#E2D1C3] shadow-2xl flex flex-col justify-between p-4 xs:p-6 sm:p-12 transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpen
            ? 'none'
            : 'inset 8px 0 20px rgba(0,0,0,0.06), -10px 0 30px rgba(0,0,0,0.25)',
        }}
      >
        {/* Laid paper texture with delicate vertical lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#E8DACF_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />

        {/* Outer decorative golden border */}
        <div className="absolute inset-3 sm:inset-8 border-2 border-[#D9C4B5] pointer-events-none rounded-r-2xl">
          <div className="absolute inset-1 border border-[#EADBCE] rounded-r-xl" />
        </div>

        {/* Outer content on Right Door: Bride Initial Crest (Đưa hẳn ra phía ngoài bên phải để không bị nơ che) */}
        <div className="relative z-10 flex flex-col items-end text-right pr-3 xs:pr-6 sm:pr-10 md:pr-14 lg:pr-18 pl-1 sm:pl-24 lg:pl-32 my-auto space-y-2 xs:space-y-3 max-w-[92%] sm:max-w-[76%] self-end">
          {/* Circular Gold Crest with Bride's Short Name */}
          <div className="self-end inline-flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full border-2 border-[#CBB3A2] bg-[#F4EDE5] shadow-inner transition-transform hover:scale-105">
            <span className="font-script text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#7E4B3D] font-normal leading-none">
              {weddingData.bride.shortName || 'CD'}
            </span>
          </div>

          <div>
            <p className="font-serif-title text-[9.5px] xs:text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#9C8476] font-semibold text-right">
              {t.door.brideLabel}
            </p>
          </div>
        </div>

      </div>

      {/* ==================== Ở GIỮA: CHIẾC NƠ LỤA SATIN KEM & 3 HẠT NGỌC TRAI THEO HÌNH ==================== */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? 'opacity-0 scale-125 pointer-events-none -translate-y-2/3'
            : 'opacity-100 scale-100 cursor-pointer'
        }`}
        onClick={handleOpenDoors}
      >
        {/* Interactive Bow Container with gentle floating & hover response */}
        <div className="relative group flex flex-col items-center p-2 sm:p-4">
          {/* THE REAL IVORY SATIN RIBBON BOW IMAGE (Shadow-free, pure clean satin) */}
          <div className="relative transition-transform duration-300 group-hover:scale-105 active:scale-95 flex flex-col items-center">
            <img
              src={effectiveBowImage}
              alt="Chiếc nơ lụa satin"
              onError={() => {
                if (!bowLoadFailed) {
                  setBowLoadFailed(true);
                }
              }}
              className="w-56 xs:w-64 sm:w-80 md:w-92 lg:w-[410px] max-w-[84vw] max-h-[48vh] object-contain pointer-events-none select-none transition-transform duration-300"
              draggable={false}
            />
          </div>

          {/* CALL TO ACTION BUTTON */}
          <div className="mt-0 sm:mt-1 text-center flex flex-col items-center">
            {guestName && (
              <div className="mb-2 px-3.5 py-1.5 rounded-full bg-white/95 text-[#63493C] border border-[#DECDBB] shadow-md flex items-center gap-1.5 text-xs sm:text-sm font-medium animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-[#B87A65]" />
                <span>{t.door.dearGuest} <strong className="font-script text-base sm:text-lg font-normal text-[#7E4B3D]">{guestName}</strong></span>
              </div>
            )}
            <button
              type="button"
              className="px-6 py-2 sm:px-8 sm:py-2.5 rounded-full bg-gradient-to-r from-[#8C5D4B] via-[#A8725E] to-[#7A4E3E] hover:from-[#7A4E3E] hover:to-[#6B4233] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(100,60,40,0.35)] hover:shadow-[0_14px_32px_rgba(100,60,40,0.5)] border-2 border-[#F7EFE6]/90 flex items-center gap-2 transform active:scale-95 transition-all group-hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
              <span className="font-bold whitespace-nowrap">{t.door.touchBowToOpen}</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            </button>

            <p className="mt-2 text-[11px] sm:text-xs text-[#7A5B4C] font-semibold flex items-center justify-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full border border-[#E8DCCF] shadow-xs mx-auto w-fit">
              <Music className="w-3 h-3 text-[#B87A65]" />
              <span>{t.door.musicNote}</span>
            </p>

            {onUpdateBowImage && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="mt-2 text-[10px] sm:text-[11px] text-[#8C6D5B] hover:text-[#5B392B] cursor-pointer flex items-center justify-center gap-1 opacity-75 hover:opacity-100 transition-opacity bg-white/70 hover:bg-white px-2.5 py-0.5 rounded-full border border-[#DFD0BF] mx-auto w-fit"
                title="Tải ảnh nơ thật của bạn (.png hoặc .jpg)"
              >
                <ImageIcon className="w-3 h-3 text-[#A8725E]" />
                <span>Đổi ảnh nơ khác</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          onUpdateBowImage(reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
