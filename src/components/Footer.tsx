import React from 'react';
import { Sparkles, Link as LinkIcon, Settings } from 'lucide-react';
import { WeddingData } from '../types';

interface FooterProps {
  weddingData: WeddingData;
  onOpenLinkGenerator: () => void;
  onOpenEditor?: () => void;
  onReplayDoor?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  weddingData,
  onOpenLinkGenerator,
  onOpenEditor,
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
                className="text-xs text-[#E05364] hover:text-[#FF8595] flex items-center gap-1.5 transition-colors font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Xem lại hiệu ứng mở cửa thiệp</span>
              </button>
              <span className="text-white/20">•</span>
            </>
          )}

          {/* Hidden Link Generator Tool for the couple */}
          <button
            type="button"
            onClick={onOpenLinkGenerator}
            className="text-xs text-[#EAD8CB]/70 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
            title="Tạo link mời riêng có tên từng khách"
          >
            <LinkIcon className="w-3.5 h-3.5 text-[#D48166]" />
            <span className="font-medium">Tạo Link Mời</span>
          </button>

          {onOpenEditor && (
            <>
              <span className="text-white/20">•</span>
              <button
                type="button"
                onClick={onOpenEditor}
                className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
                title="Sửa nội dung"
              >
                <Settings className="w-3 h-3" />
                <span>Cài đặt</span>
              </button>
            </>
          )}
        </div>

        <p className="mt-8 text-[11px] text-[#7A6458]">
          Trang web thiệp cưới lãng mạn &amp; tinh tế dành riêng cho ngày trọng đại.
        </p>
      </div>
    </footer>
  );
};
