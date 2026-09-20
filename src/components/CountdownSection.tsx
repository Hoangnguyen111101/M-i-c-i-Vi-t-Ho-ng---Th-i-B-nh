import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Plus } from 'lucide-react';
import { WeddingData } from '../types';

interface CountdownSectionProps {
  weddingData: WeddingData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ weddingData }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(weddingData.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [weddingData.weddingDate]);

  // Google Calendar Event Link
  const getGoogleCalendarUrl = () => {
    const startDate = new Date(weddingData.weddingDate);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

    const formatDateForGCal = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const title = encodeURIComponent(`Lễ Thành Hôn: ${weddingData.groom.shortName} & ${weddingData.bride.shortName}`);
    const details = encodeURIComponent(weddingData.invitationMessage);
    const location = encodeURIComponent(
      weddingData.events.length > 0 ? weddingData.events[weddingData.events.length - 1].address : 'Việt Nam'
    );
    const dates = `${formatDateForGCal(startDate)}/${formatDateForGCal(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const timeCards = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <section id="dem-nguoc" className="relative py-14 bg-[#FAF7F2] border-b border-[#EDE2D8]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-[#B87A65]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C7063] font-medium">
            Đếm Ngược Tới Khoảnh Khắc Hạnh Phúc
          </span>
        </div>

        <h2 className="font-serif-title text-2xl sm:text-3xl text-[#3A2D27] font-bold mb-8">
          {timeLeft.isPast ? 'Ngày Trọng Đại Đã Diễn Ra!' : 'Cùng Đếm Ngược Ngày Chung Đôi'}
        </h2>

        {/* Timer Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-6 max-w-xl mx-auto mb-8">
          {timeCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-3 sm:p-5 shadow-sm border border-[#EBE1D7] flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1"
            >
              <div className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-[#8A4F3D] tabular-nums">
                {card.value.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-[#7A6458] font-medium uppercase tracking-wider mt-1 sm:mt-2">
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-white text-[#4A3B32] border border-[#D8C5B7] hover:bg-[#F9F4EE] hover:border-[#B87A65] shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4 text-[#B87A65]" />
            <span>Thêm sự kiện vào Google Calendar</span>
          </a>
        </div>
      </div>
    </section>
  );
};
