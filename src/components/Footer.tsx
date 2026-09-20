import React from 'react';
import { Heart, Sparkles, BookOpen, Settings } from 'lucide-react';
import { WeddingData } from '../types';

interface FooterProps {
  weddingData: WeddingData;
  onOpenEditor: () => void;
  onOpenGuidance: () => void;
  onReplayDoor?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  weddingData,
  onOpenEditor,
  onOpenGuidance,
  onReplayDoor,
}) => {
  const weddingYear = new Date(weddingData.weddingDate).getFullYear();

  return (
    <footer className="bg-[#241A16] text-[#EFE3D8] py-16 border-t border-[#3D2C25] relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Monogram */}
        <div className="mb-4">
          <span className="font-script text-4xl sm:text-5xl text-[#F7EDE3]">
            {weddingData.groom.shortName} &amp; {weddingData.bride.shortName}
          </span>
        </div>

        <p className="font-serif-title italic text-sm sm:text-base text-[#D4BEB0] max-w-md mx-auto mb-6">
          "Cảm ơn bạn đã luôn là một phần đặc biệt trong thanh xuân và ngày hạnh phúc nhất của chúng mình."
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-[#9E8779] uppercase tracking-widest mb-8">
          <span>Hạnh Phúc Vĩnh Cửu</span>
          <span>•</span>
          <span>{weddingYear}</span>
        </div>

        {/* Action shortcuts for the couple */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/10 max-w-lg mx-auto">
          {onReplayDoor && (
            <>
              <button
                type="button"
                onClick={onReplayDoor}
                className="text-xs text-[#F472B6] hover:text-[#FB7185] flex items-center gap-1.5 transition-colors font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Xem lại hiệu ứng mở cửa thiệp</span>
              </button>
              <span className="text-white/20">•</span>
            </>
          )}
          <button
            type="button"
            onClick={onOpenGuidance}
            className="text-xs text-[#D8B4A6] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Xem cẩm nang hướng dẫn</span>
          </button>
          <span className="text-white/20">•</span>
          <button
            type="button"
            onClick={onOpenEditor}
            className="text-xs text-[#D8B4A6] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Tùy chỉnh nội dung thiệp</span>
          </button>
        </div>

        <p className="mt-8 text-[11px] text-[#7A6458]">
          Trang web thiệp cưới được tạo với sự đồng hành của DEV 10 năm kinh nghiệm.
        </p>
      </div>
    </footer>
  );
};
