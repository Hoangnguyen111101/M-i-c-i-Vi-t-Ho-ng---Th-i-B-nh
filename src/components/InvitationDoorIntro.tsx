import React, { useState } from 'react';
import { Sparkles, Heart, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData } from '../types';

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

  // Format wedding date for display on the door
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

    // 1. Fire celebratory confetti shower in romantic rose gold and pastel tones
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

        {/* Top Ornate Filigree Corner */}
        <div className="relative z-10 text-left pt-2 sm:pt-4">
          <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#A68877] uppercase font-bold">
            Thư Mời Đám Cưới
          </span>
          <div className="w-12 h-0.5 bg-[#D9C4B5] mt-1.5" />
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

        {/* Bottom text */}
        <div className="relative z-10 text-left pb-2 sm:pb-4">
          <p className="font-serif-title italic text-xs sm:text-sm text-[#8A5E4F] font-medium">
            Trân trọng kính mời
          </p>
        </div>

        {/* Ribbon band running horizontally on Left Door */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 sm:h-20 bg-gradient-to-r from-[#FCE7F3] via-[#F472B6] to-[#FB7185] shadow-lg border-y-2 border-white/70 pointer-events-none flex items-center justify-end pr-3">
          {/* Ribbon woven stitch lines with cute dashes */}
          <div className="w-full h-full flex flex-col justify-between py-1.5 opacity-60">
            <div className="border-b-2 border-dashed border-white" />
            <div className="border-t-2 border-dashed border-white" />
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

        {/* Top Ornate Corner */}
        <div className="relative z-10 text-right pt-2 sm:pt-4">
          <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.25em] text-[#A68877] uppercase font-bold">
            Ngày Chung Đôi
          </span>
          <div className="w-12 h-0.5 bg-[#D9C4B5] mt-1.5 ml-auto" />
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

        {/* Bottom text */}
        <div className="relative z-10 text-right pb-2 sm:pb-4">
          <p className="font-serif-title text-xs sm:text-sm text-[#7A6154] font-semibold">
            {formattedDate}
          </p>
        </div>

        {/* Ribbon band running horizontally on Right Door */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16 sm:h-20 bg-gradient-to-r from-[#FB7185] via-[#F472B6] to-[#FCE7F3] shadow-lg border-y-2 border-white/70 pointer-events-none flex items-center justify-start pl-3">
          {/* Ribbon woven stitch lines with cute dashes */}
          <div className="w-full h-full flex flex-col justify-between py-1.5 opacity-60">
            <div className="border-b-2 border-dashed border-white" />
            <div className="border-t-2 border-dashed border-white" />
          </div>
        </div>
      </div>

      {/* ==================== Ở GIỮA: HÌNH CÁI NƠ MÀU HỒNG SIÊU TO KHỔNG LỒ & DỄ THƯƠNG ==================== */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen
            ? 'opacity-0 scale-125 pointer-events-none -translate-y-2/3'
            : 'opacity-100 scale-100 cursor-pointer'
        }`}
        onClick={handleOpenDoors}
      >
        {/* Soft Dreamy Pastel Glow Halo behind pink bow */}
        <div className="absolute -inset-12 sm:-inset-20 bg-gradient-to-r from-pink-300/35 via-rose-400/30 to-pink-200/40 rounded-full blur-3xl animate-cute-glow pointer-events-none" />

        {/* Interactive Bow Container with gentle floating & hover bounce */}
        <div className="relative group flex flex-col items-center p-2 sm:p-4">
          {/* THE GIANT CUTE KAWAII PINK SATIN BOW SVG */}
          <div className="relative animate-cute-float transform group-hover:scale-105 group-active:scale-95 transition-transform duration-300 filter drop-shadow-[0_20px_35px_rgba(244,63,94,0.38)]">
            <svg
              className="w-72 h-60 sm:w-96 sm:h-80 md:w-[440px] md:h-[360px] max-w-[92vw]"
              viewBox="0 0 380 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Left Puffy Loop Strawberry-Milk Gradient */}
                <radialGradient id="kawaiiLeftLoop" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#FFF2F6" />
                  <stop offset="22%" stopColor="#FFB8D2" />
                  <stop offset="55%" stopColor="#FF6B9D" />
                  <stop offset="85%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </radialGradient>

                {/* Right Puffy Loop Strawberry-Milk Gradient */}
                <radialGradient id="kawaiiRightLoop" cx="65%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#FFF2F6" />
                  <stop offset="22%" stopColor="#FFB8D2" />
                  <stop offset="55%" stopColor="#FF6B9D" />
                  <stop offset="85%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#BE123C" />
                </radialGradient>

                {/* Inner 3D Crevice Shadow Gradient */}
                <linearGradient id="kawaiiInnerShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9F1239" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>

                {/* Center Knot Plump Gradient */}
                <radialGradient id="kawaiiKnotGrad" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFCCD8" />
                  <stop offset="55%" stopColor="#FF6599" />
                  <stop offset="85%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </radialGradient>

                {/* Left Ribbon Tail Gradient */}
                <linearGradient id="kawaiiTailLeft" x1="0%" y1="0%" x2="40%" y2="100%">
                  <stop offset="0%" stopColor="#FF85B2" />
                  <stop offset="60%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>

                {/* Right Ribbon Tail Gradient */}
                <linearGradient id="kawaiiTailRight" x1="100%" y1="0%" x2="60%" y2="100%">
                  <stop offset="0%" stopColor="#FF85B2" />
                  <stop offset="60%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>

                {/* Golden Heart Badge Gradient in Center */}
                <linearGradient id="goldHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="45%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
              </defs>

              {/* ---------------- 1. CUTE WAVY RIBBON TAILS (2 Dải ruy băng rủ xoè bồng bềnh) ---------------- */}
              {/* Left Tail */}
              <g id="left-ribbon-tail">
                <path
                  d="M165 145 C145 185 125 225 96 272 L134 256 L158 276 C174 228 178 185 184 150 Z"
                  fill="url(#kawaiiTailLeft)"
                  stroke="#FFE4E6"
                  strokeWidth="2"
                />
                {/* Cute White Dashed Stitch on Left Tail */}
                <path
                  d="M160 152 C142 188 124 225 104 263"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M174 158 C168 195 162 230 152 265"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </g>

              {/* Right Tail */}
              <g id="right-ribbon-tail">
                <path
                  d="M215 145 C235 185 255 225 284 272 L246 256 L222 276 C206 228 202 185 196 150 Z"
                  fill="url(#kawaiiTailRight)"
                  stroke="#FFE4E6"
                  strokeWidth="2"
                />
                {/* Cute White Dashed Stitch on Right Tail */}
                <path
                  d="M220 152 C238 188 256 225 276 263"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M206 158 C212 195 218 230 228 265"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </g>

              {/* ---------------- 2. LEFT CHUBBY PUFFY BOW LOOP (Cánh nơ trái siêu phúng phính) ---------------- */}
              <g id="left-chubby-loop">
                {/* Outer plump body */}
                <path
                  d="M176 118 C140 48 68 28 32 72 C2 110 16 174 72 196 C124 212 160 176 178 142 Z"
                  fill="url(#kawaiiLeftLoop)"
                  stroke="#FFE4E6"
                  strokeWidth="3.5"
                />

                {/* Outer Cute White Stitched Embroidery Line */}
                <path
                  d="M166 116 C134 56 74 40 44 76 C18 108 30 164 76 184 C122 198 154 168 170 142"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeDasharray="7 5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"
                />

                {/* 3D Depth Crevice (Lỗ bồng 3D của nơ) */}
                <path
                  d="M162 125 C125 105 82 114 68 134 C85 152 130 150 164 138 Z"
                  fill="url(#kawaiiInnerShadow)"
                  stroke="#881337"
                  strokeWidth="1.5"
                  opacity="0.85"
                />

                {/* Kawaii Glossy Jelly Highlights (Vệt sáng bóng dễ thương phong cách hoạt hình) */}
                <ellipse
                  cx="65"
                  cy="72"
                  rx="22"
                  ry="9"
                  transform="rotate(-32 65 72)"
                  fill="#FFFFFF"
                  opacity="0.75"
                />
                <circle cx="95" cy="56" r="4.5" fill="#FFFFFF" opacity="0.85" />
                <circle cx="42" cy="115" r="3.5" fill="#FFFFFF" opacity="0.6" />
              </g>

              {/* ---------------- 3. RIGHT CHUBBY PUFFY BOW LOOP (Cánh nơ phải siêu phúng phính) ---------------- */}
              <g id="right-chubby-loop">
                {/* Outer plump body */}
                <path
                  d="M204 118 C240 48 312 28 348 72 C378 110 364 174 308 196 C256 212 220 176 202 142 Z"
                  fill="url(#kawaiiRightLoop)"
                  stroke="#FFE4E6"
                  strokeWidth="3.5"
                />

                {/* Outer Cute White Stitched Embroidery Line */}
                <path
                  d="M214 116 C246 56 306 40 336 76 C362 108 350 164 304 184 C258 198 226 168 210 142"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeDasharray="7 5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"
                />

                {/* 3D Depth Crevice (Lỗ bồng 3D của nơ) */}
                <path
                  d="M218 125 C255 105 298 114 312 134 C295 152 250 150 216 138 Z"
                  fill="url(#kawaiiInnerShadow)"
                  stroke="#881337"
                  strokeWidth="1.5"
                  opacity="0.85"
                />

                {/* Kawaii Glossy Jelly Highlights */}
                <ellipse
                  cx="315"
                  cy="72"
                  rx="22"
                  ry="9"
                  transform="rotate(32 315 72)"
                  fill="#FFFFFF"
                  opacity="0.75"
                />
                <circle cx="285" cy="56" r="4.5" fill="#FFFFFF" opacity="0.85" />
                <circle cx="338" cy="115" r="3.5" fill="#FFFFFF" opacity="0.6" />
              </g>

              {/* ---------------- 4. CENTER PLUMP KNOT WITH GOLDEN HEART BADGE (Nút thắt tròn xoe & Huy hiệu trái tim) ---------------- */}
              <g id="center-knot">
                {/* Big Round Pill Knot */}
                <ellipse
                  cx="190"
                  cy="130"
                  rx="34"
                  ry="38"
                  fill="url(#kawaiiKnotGrad)"
                  stroke="#FFF1F2"
                  strokeWidth="3.5"
                />

                {/* Cute Silk Crease folds */}
                <path
                  d="M172 116 C180 123 180 137 173 146"
                  stroke="#FFE4E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />
                <path
                  d="M208 116 C200 123 200 137 207 146"
                  stroke="#FFE4E6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />

                {/* Top glossy gleam on knot */}
                <ellipse
                  cx="190"
                  cy="104"
                  rx="14"
                  ry="5"
                  fill="#FFFFFF"
                  opacity="0.65"
                />

                {/* Sweet Golden Heart Emblem right in the middle */}
                <g transform="translate(190, 130) scale(1.15)">
                  {/* Heart Shadow */}
                  <path
                    d="M0 10 C0 10 -11 0 -11 -7 C-11 -12 -7 -15 -2 -15 C0 -15 0 -13 0 -13 C0 -13 0 -15 2 -15 C7 -15 11 -12 11 -7 C11 0 0 10 0 10 Z"
                    fill="#BE123C"
                    transform="translate(0, 1.5)"
                    opacity="0.4"
                  />
                  {/* Gold Border */}
                  <path
                    d="M0 10 C0 10 -11 0 -11 -7 C-11 -12 -7 -15 -2 -15 C0 -15 0 -13 0 -13 C0 -13 0 -15 2 -15 C7 -15 11 -12 11 -7 C11 0 0 10 0 10 Z"
                    fill="url(#goldHeartGrad)"
                    stroke="#FEF9C3"
                    strokeWidth="1.2"
                  />
                  {/* Inner Sparkling Pink Core */}
                  <path
                    d="M0 8 C0 8 -8 0 -8 -5.5 C-8 -9.5 -5 -12 -1.5 -12 C0 -12 0 -10.5 0 -10.5 C0 -10.5 0 -12 1.5 -12 C5 -12 8 -9.5 8 -5.5 C8 0 0 8 0 8 Z"
                    fill="#FFF1F2"
                  />
                  {/* Tiny Cute Glimmer */}
                  <circle cx="-2.5" cy="-7" r="1.5" fill="#FFFFFF" />
                </g>
              </g>

              {/* ---------------- 5. CUTE TWINKLING DECORATIONS (Ngôi sao & Trái tim lấp lánh) ---------------- */}
              {/* Star top-left */}
              <g transform="translate(38, 48) scale(0.9)">
                <path
                  d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z"
                  fill="#FDE047"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
              </g>
              {/* Star top-right */}
              <g transform="translate(340, 48) scale(0.9)">
                <path
                  d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z"
                  fill="#FDE047"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                />
              </g>
              {/* Mini pastel heart bottom-left */}
              <path
                d="M48 205 C48 205 40 197 40 191 C40 187 43 185 46 185 C48 185 48 186 48 186 C48 186 48 185 50 185 C53 185 56 187 56 191 C56 197 48 205 48 205 Z"
                fill="#FDA4AF"
                opacity="0.85"
              />
              {/* Mini pastel heart bottom-right */}
              <path
                d="M332 205 C332 205 324 197 324 191 C324 187 327 185 330 185 C332 185 332 186 332 186 C332 186 332 185 334 185 C337 185 340 187 340 191 C340 197 332 205 332 205 Z"
                fill="#FDA4AF"
                opacity="0.85"
              />
            </svg>

            {/* Sparkle star on bow */}
            <div className="absolute top-2 right-4 text-yellow-300 animate-spin-slow">
              <Sparkles className="w-7 h-7 drop-shadow-md" />
            </div>
            <div className="absolute top-4 left-4 text-pink-300 animate-pulse">
              <Sparkles className="w-5 h-5 drop-shadow" />
            </div>
          </div>

          {/* CALL TO ACTION BUTTON (Mở Thiệp - Phong cách dễ thương ngọt ngào) */}
          <div className="mt-1 sm:mt-2 text-center flex flex-col items-center">
            {guestName && (
              <div className="mb-2.5 px-4 py-1.5 rounded-full bg-white/95 text-[#8A4F3D] border border-pink-200 shadow-md flex items-center gap-1.5 text-xs sm:text-sm font-medium animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Thân mời: <strong className="font-serif-title font-bold text-[#E11D48] text-sm sm:text-base">{guestName}</strong></span>
              </div>
            )}
            <button
              type="button"
              className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-[#FF6599] via-[#FB7185] to-[#E11D48] text-white font-medium text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_rgba(244,63,94,0.4)] hover:shadow-[0_12px_28px_rgba(244,63,94,0.6)] border-2 border-white/70 flex items-center gap-2 transform active:scale-95 transition-all group-hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
              <span className="font-bold whitespace-nowrap">Chạm vào nơ để mở thiệp nha 💕</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            </button>

            <p className="mt-2 text-[11px] sm:text-xs text-[#8C6D5F] font-semibold flex items-center justify-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-[#EADBCE] shadow-xs mx-auto w-fit">
              <Music className="w-3 h-3 text-[#E11D48]" />
              <span>Nhạc cưới tự động phát khi mở</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
