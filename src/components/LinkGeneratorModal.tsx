import React, { useState } from 'react';
import { X, Link as LinkIcon, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';

interface LinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GeneratedItem {
  name: string;
  url: string;
}

export const LinkGeneratorModal: React.FC<LinkGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [namesInput, setNamesInput] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    // Current base URL without search parameters or hash
    const baseUrl = window.location.origin + window.location.pathname;

    const lines = namesInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const links: GeneratedItem[] = lines.map((name) => {
      // Create clean URL with encoded ?to= parameter
      const encoded = encodeURIComponent(name);
      return {
        name,
        url: `${baseUrl}?to=${encoded}`,
      };
    });

    setGeneratedLinks(links);
  };

  const handleCopyOne = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    if (generatedLinks.length === 0) return;
    const textToCopy = generatedLinks
      .map((item) => `${item.name}: ${item.url}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#EADBCE] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#F0E4D8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8A4F3D] text-white flex items-center justify-center shadow-sm">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#3D2C24]">
                Tạo Link Mời Đích Danh
              </h3>
              <p className="text-xs text-[#7A6154]">
                Tự động tạo link có đuôi <code className="bg-[#EFE5DC] px-1.5 py-0.5 rounded text-[#8A4F3D] font-mono">?to=Tên_Khách</code>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#7A6154] hover:text-[#3D2C24] hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-[#5A453A] uppercase tracking-wider mb-2">
              Dán danh sách tên khách mời (Mỗi tên 1 dòng):
            </label>
            <textarea
              rows={5}
              value={namesInput}
              onChange={(e) => setNamesInput(e.target.value)}
              placeholder="Ví dụ:&#10;Anh Khoa&#10;Cô Chú Ba&#10;Chị Linh & Gia Đình&#10;Bạn Tuấn (Bạn Cấp 3)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C4B5] focus:outline-none focus:ring-2 focus:ring-[#8A4F3D]/25 focus:border-[#8A4F3D] text-sm text-[#3D2C24] font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!namesInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#8A4F3D] text-white text-xs sm:text-sm font-semibold hover:bg-[#733F30] disabled:opacity-50 transition-all flex items-center gap-2 shadow-sm active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Tạo danh sách Link</span>
            </button>

            {generatedLinks.length > 0 && (
              <button
                type="button"
                onClick={handleCopyAll}
                className="px-4 py-2.5 rounded-xl bg-[#F4EDE5] text-[#8A4F3D] border border-[#D9C4B5] text-xs sm:text-sm font-medium hover:bg-[#EADBCE] transition-all flex items-center gap-1.5"
              >
                {copiedAll ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAll ? 'Đã sao chép tất cả' : 'Sao chép toàn bộ danh sách'}</span>
              </button>
            )}
          </div>

          {/* Results List */}
          {generatedLinks.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#F0E4D8]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#5A453A] uppercase tracking-wider">
                  Kết quả ({generatedLinks.length} khách mời):
                </span>
                <span className="text-[11px] text-[#8A7165]">Bấm nút để copy nhanh</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {generatedLinks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#3D2C24] truncate flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#EFE5DC] text-[#8A4F3D] flex items-center justify-center text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <p className="text-[11px] text-[#8A7165] font-mono truncate mt-0.5" title={item.url}>
                        {item.url}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-[#7A6154] hover:bg-white hover:text-[#3D2C24] transition-colors"
                        title="Mở thử link này"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyOne(item.url, idx)}
                        className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-all ${
                          copiedIndex === idx
                            ? 'bg-green-600 text-white'
                            : 'bg-[#8A4F3D] text-white hover:bg-[#733F30]'
                        }`}
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Đã copy</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-[#FAF7F2] border-t border-[#F0E4D8] flex items-center justify-between text-xs text-[#7A6154]">
          <span>Mẹo: Người nhận mở link sẽ thấy tên mình xuất hiện trang trọng trên thiệp.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#D9C4B5] text-[#3D2C24] hover:bg-[#F4EDE5] font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
