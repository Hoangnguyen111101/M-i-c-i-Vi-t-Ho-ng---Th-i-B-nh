import React from 'react';
import { Heart, Calendar } from 'lucide-react';
import { WeddingData } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface StorySectionProps {
  weddingData: WeddingData;
}

export const StorySection: React.FC<StorySectionProps> = ({ weddingData }) => {
  const { t } = useLanguage();

  return (
    <section id="chuyen-tinh" className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-[#EDE1D6] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8D6C9] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#D48166] text-[#D48166]" />
            <span>{t.story.badge}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            {t.story.title}
          </h2>
          <p className="mt-3 text-[#6E5B4F] text-sm leading-relaxed">
            {t.story.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#E2D0C2] -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {weddingData.loveStories.map((story, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={story.id}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node / Heart Pin */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#D48166] items-center justify-center shadow-md z-10">
                    <Heart className="w-4 h-4 fill-[#D48166] text-[#D48166]" />
                  </div>

                  {/* Story Image / Visual */}
                  <div className="w-full md:w-1/2">
                    {story.imageUrl ? (
                      <div className="rounded-2xl overflow-hidden shadow-md border-4 border-white aspect-[4/3] max-h-72">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-white/60 border border-[#E5D5C8] aspect-[4/3] flex items-center justify-center text-[#9E8779]">
                        <Heart className="w-10 h-10 stroke-1" />
                      </div>
                    )}
                  </div>

                  {/* Story Text Card */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`bg-white p-6 sm:p-7 rounded-2xl border border-[#E8DCD1] shadow-sm hover:shadow-md transition-shadow ${
                        isEven ? 'md:text-left' : 'md:text-left'
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3EE] text-[#915442] text-xs font-semibold tracking-wider uppercase mb-2.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{story.yearOrDate}</span>
                      </div>
                      <h3 className="font-serif-title text-xl text-[#3A2A23] font-bold mb-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-[#665449] leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
