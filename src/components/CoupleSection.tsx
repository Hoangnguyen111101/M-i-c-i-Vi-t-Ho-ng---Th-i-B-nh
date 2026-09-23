import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';
import { normalizeImageUrl } from '../utils/imageHelper';

interface CoupleSectionProps {
  weddingData: WeddingData;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ weddingData }) => {
  return (
    <section id="cap-doi" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-[#F5EBE6] blur-3xl" />
        <div className="absolute bottom-12 right-10 w-80 h-80 rounded-full bg-[#FAF0E6] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#ECD9CC] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B87A65]" />
            <span>Cô Dâu &amp; Chú Rể</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            Hai Nửa Yêu Thương
          </h2>
          <p className="mt-4 text-[#665449] text-sm sm:text-base leading-relaxed">
            {weddingData.invitationMessage}
          </p>
        </div>

        {/* Couple Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Groom Card */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#FAF7F4] border border-[#EFE5DC] transition-all hover:shadow-md">
            {/* Avatar with arch mask / decorative ring */}
            <div className="relative mb-6">
              <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-[38px] overflow-hidden border-4 border-white shadow-md">
                <img
                  src={normalizeImageUrl(weddingData.groom.avatar)}
                  alt={weddingData.groom.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8A4F3D] text-white text-xs font-medium tracking-wider uppercase shadow-sm">
                Chú Rể
              </div>
            </div>

            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#3A2A23] mb-1">
              {weddingData.groom.fullName}
            </h3>
            <span className="text-xs font-medium text-[#B87A65] tracking-widest uppercase mb-3">
              {weddingData.groom.origin}
            </span>

            {/* Parents info */}
            {(weddingData.groom.fatherName || weddingData.groom.motherName) && (
              <div className="text-xs sm:text-sm text-[#735F53] space-y-1 mb-4 py-2 px-4 rounded-xl bg-white/70 border border-[#ECE0D6] w-full max-w-xs">
                <div className="font-medium text-[#4D3A2F]">Nhà Trai</div>
                {weddingData.groom.fatherName && (
                  <div>Ông: <span className="font-semibold text-[#3A2A23]">{weddingData.groom.fatherName}</span></div>
                )}
                {weddingData.groom.motherName && (
                  <div>Bà: <span className="font-semibold text-[#3A2A23]">{weddingData.groom.motherName}</span></div>
                )}
              </div>
            )}
          </div>

          {/* Bride Card */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#FAF7F4] border border-[#EFE5DC] transition-all hover:shadow-md">
            {/* Avatar with arch mask / decorative ring */}
            <div className="relative mb-6">
              <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-[38px] overflow-hidden border-4 border-white shadow-md">
                <img
                  src={normalizeImageUrl(weddingData.bride.avatar)}
                  alt={weddingData.bride.fullName}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C8755D] text-white text-xs font-medium tracking-wider uppercase shadow-sm">
                Cô Dâu
              </div>
            </div>

            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#3A2A23] mb-1">
              {weddingData.bride.fullName}
            </h3>
            <span className="text-xs font-medium text-[#B87A65] tracking-widest uppercase mb-3">
              {weddingData.bride.origin}
            </span>

            {/* Parents info */}
            {(weddingData.bride.fatherName || weddingData.bride.motherName) && (
              <div className="text-xs sm:text-sm text-[#735F53] space-y-1 mb-4 py-2 px-4 rounded-xl bg-white/70 border border-[#ECE0D6] w-full max-w-xs">
                <div className="font-medium text-[#4D3A2F]">Nhà Gái</div>
                {weddingData.bride.fatherName && (
                  <div>Ông: <span className="font-semibold text-[#3A2A23]">{weddingData.bride.fatherName}</span></div>
                )}
                {weddingData.bride.motherName && (
                  <div>Bà: <span className="font-semibold text-[#3A2A23]">{weddingData.bride.motherName}</span></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
