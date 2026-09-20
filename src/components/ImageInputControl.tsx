import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Check, AlertCircle, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { extractGoogleDriveFileId, normalizeImageUrl } from '../utils/imageHelper';

interface ImageInputControlProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  placeholder?: string;
  helperText?: string;
}

export const ImageInputControl: React.FC<ImageInputControlProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://drive.google.com/... hoặc link ảnh bất kỳ',
  helperText,
}) => {
  const [imageError, setImageError] = useState(false);
  const [showDriveGuide, setShowDriveGuide] = useState(false);
  const [isDriveDetected, setIsDriveDetected] = useState(() => !!extractGoogleDriveFileId(value));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (rawInput: string) => {
    setImageError(false);
    const driveId = extractGoogleDriveFileId(rawInput);
    if (driveId) {
      setIsDriveDetected(true);
      const directUrl = `https://lh3.googleusercontent.com/d/${driveId}`;
      onChange(directUrl);
    } else {
      setIsDriveDetected(false);
      onChange(rawInput);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: warn if > 3MB for localStorage capacity
    if (file.size > 3 * 1024 * 1024) {
      alert('Ảnh có kích thước lớn (> 3MB). Bạn nên dùng link ảnh Google Drive hoặc ảnh dung lượng nhẹ hơn để trang tải nhanh nhất!');
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageError(false);
        setIsDriveDetected(false);
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold text-[#5A453A] uppercase">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowDriveGuide(!showDriveGuide)}
          className="text-[11px] text-[#8A4F3D] hover:text-[#5A2E20] flex items-center gap-1 font-medium underline underline-offset-2"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Dùng link Google Drive?</span>
        </button>
      </div>

      {/* Guide accordion if requested */}
      {showDriveGuide && (
        <div className="p-3 bg-[#F4EBE2] border border-[#E3D0C1] rounded-xl text-xs text-[#4A3B32] space-y-1.5 animate-in fade-in">
          <p className="font-semibold text-[#8A4F3D] flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-600" />
            3 bước lấy link Google Drive để web hiển thị được:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-[#5A453A] pl-1">
            <li>Mở Google Drive, nhấp chuột phải vào ảnh &gt; chọn <strong>Chia sẻ (Share)</strong>.</li>
            <li>Tại mục <em>Quyền truy cập chung</em>, chọn <strong>"Bất kỳ ai có đường liên kết" (Anyone with the link)</strong> thay vì "Hạn chế".</li>
            <li>Bấm <strong>"Sao chép đường liên kết"</strong> và dán vào ô bên dưới. Hệ thống sẽ <strong>tự động chuyển thành link ảnh trực tiếp</strong> cho bạn!</li>
          </ol>
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F] focus:border-[#8A4F3D] focus:outline-none"
          />
          <LinkIcon className="w-3.5 h-3.5 text-[#9E8779] absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Upload file directly button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Chọn ảnh trực tiếp từ máy tính / điện thoại"
          className="px-3 py-2 bg-[#F5ECE5] hover:bg-[#EBDDCF] text-[#6E4B3E] border border-[#DECBC0] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tải ảnh từ máy</span>
        </button>

        {/* Thumbnail preview */}
        <div className="w-9 h-9 rounded-lg border border-[#DECBC0] overflow-hidden bg-[#EFE9E4] flex items-center justify-center shrink-0 relative">
          {value ? (
            <img
              src={normalizeImageUrl(value)}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <ImageIcon className="w-4 h-4 text-[#A89689]" />
          )}
        </div>
      </div>

      {/* Status messages */}
      {isDriveDetected && !imageError && (
        <div className="text-[10px] text-green-700 flex items-center gap-1 font-medium">
          <Check className="w-3 h-3" />
          <span>✨ Đã tự động nhận diện và chuyển đổi link Google Drive thành công!</span>
        </div>
      )}

      {imageError && value && (
        <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-lg border border-red-200 flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            <strong>Chưa tải được ảnh:</strong> Nếu là Google Drive, hãy đảm bảo bạn đã chỉnh quyền chia sẻ sang <strong>"Bất kỳ ai có đường liên kết"</strong> (Công khai).
          </span>
        </div>
      )}

      {helperText && !imageError && (
        <p className="text-[10px] text-[#8C7A70]">{helperText}</p>
      )}
    </div>
  );
};
