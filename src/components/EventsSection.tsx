import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Check, Sparkles } from 'lucide-react';
import { WeddingData, WeddingEvent } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface EventsSectionProps {
  weddingData: WeddingData;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ weddingData }) => {
  const { t, language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (event: WeddingEvent) => {
    navigator.clipboard.writeText(event.address).then(() => {
      setCopiedId(event.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <section id="lich-trinh" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#ECD9CC] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B87A65]" />
            <span>{t.events.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            {t.events.title}
          </h2>
          <p className="mt-3 text-[#6E5B4F] text-sm leading-relaxed">
            {t.events.subtitle}
          </p>
        </div>

        {/* Events Cards - Responsive 2-column balanced layout for Vu Quy & Thanh Hon */}
        <div
          className={`grid grid-cols-1 ${
            weddingData.events.length <= 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto'
              : 'md:grid-cols-3'
          } gap-8 sm:gap-10`}
        >
          {weddingData.events.map((event, index) => {
            const dateObj = new Date(event.date);
            const formattedDate = dateObj.toLocaleDateString(language === 'ja' ? 'ja-JP' : 'vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            const isVuQuy = event.title.toLowerCase().includes('vu quy');
            const isThanhHon = event.title.toLowerCase().includes('thành hôn');
            const badgeLabel = isVuQuy
              ? t.events.brideHouseBadge
              : isThanhHon
              ? t.events.groomHouseBadge
              : t.events.weddingCeremonyBadge;

            // Retain Vietnamese proper ceremony title while providing polite Japanese subtitle when in Japanese mode
            const eventTitle =
              language === 'ja'
                ? isVuQuy
                  ? t.events.vuQuySubtitle
                  : isThanhHon
                  ? t.events.thanhHonSubtitle
                  : event.title
                : event.title;

            const eventNote =
              language === 'ja'
                ? isVuQuy
                  ? t.events.notes.dressCodeVuQuy
                  : isThanhHon
                  ? t.events.notes.ritualThanhHon
                  : event.note
                : event.note;

            const lunarDisplay =
              language === 'ja' && event.lunarDate
                ? event.lunarDate.replace('Ngày', '旧暦').replace('tháng', '月').replace('năm', '年')
                : event.lunarDate;

            return (
              <div
                key={event.id}
                className="bg-[#FAF7F4] rounded-3xl p-6 sm:p-8 border border-[#EDE1D6] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group hover:-translate-y-1"
              >
                {/* Event Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#8A4F3D] text-white flex items-center justify-center font-cinzel text-xs font-bold shadow-sm">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8A4F3D] bg-white px-3 py-1 rounded-full border border-[#E8D6C9] shadow-2xs">
                      {badgeLabel}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-2xl sm:text-3xl text-[#3A2A23] font-bold mb-3">
                    {eventTitle}
                  </h3>

                  {/* Date & Time */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2.5 text-sm text-[#54433A]">
                      <Clock className="w-4 h-4 text-[#B87A65] shrink-0" />
                      <span className="font-semibold text-[#8A4F3D] text-base">{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-[#54433A]">
                      <Calendar className="w-4 h-4 text-[#B87A65] shrink-0" />
                      <span className="capitalize">{formattedDate}</span>
                    </div>

                    {event.lunarDate && (
                      <div className="text-xs text-[#7A665A] italic pl-6.5">
                        ({lunarDisplay})
                      </div>
                    )}
                  </div>

                  {/* Venue Info - Vietnamese address and venue are strictly preserved */}
                  <div className="border-t border-[#EAE0D5] pt-4 mb-6 space-y-2">
                    <div className="font-semibold text-base text-[#3A2A23]">
                      {event.venueName}
                    </div>
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-[#6E5B4F]">
                      <MapPin className="w-4 h-4 text-[#B87A65] shrink-0 mt-0.5" />
                      <span>{event.address}</span>
                    </div>
                    {eventNote && (
                      <div className="text-xs text-[#8A5A48] bg-[#F4E9E0] px-3 py-1.5 rounded-xl mt-2 font-medium">
                        {eventNote}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-[#8A4F3D] text-white hover:bg-[#723F30] flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.events.openMap}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(event)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-medium text-[#6B574C] bg-white border border-[#DBC9BC] hover:bg-[#F2E8DF] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedId === event.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700 font-medium">{t.events.addressCopied}</span>
                      </>
                    ) : (
                      <span>{t.events.copyAddress}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
