import React from 'react';
import { X, CheckCircle2, Globe, Share2, Sparkles, Smartphone, ShieldCheck, Heart, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface GuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEditor: () => void;
}

export const GuidanceModal: React.FC<GuidanceModalProps> = ({
  isOpen,
  onClose,
  onOpenEditor,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#EBE1D6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#4A332B] to-[#784637] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F0D5C7] font-semibold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Góc Cố Vấn Kỹ Thuật • DEV 10 Năm Kinh Nghiệm</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-title font-bold mt-1 text-white">
              Cẩm Nang Tạo Web Thiệp Cưới Cho Người Mới Bắt Đầu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto text-sm text-[#4A3B32]">
          {/* Welcome note from Senior Dev */}
          <div className="bg-[#FAF4EF] border border-[#ECD9CC] p-4 sm:p-5 rounded-2xl flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#8A4F3D] text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-sm">
              DEV
            </div>
            <div>
              <p className="font-semibold text-base text-[#3A2A23]">
                Chào bạn! Đừng lo lắng nếu bạn hoàn toàn chưa từng biết lập trình.
              </p>
              <p className="text-xs sm:text-sm text-[#665449] mt-1 leading-relaxed">
                Với 10 năm kinh nghiệm làm web, mình đã thiết kế sẵn toàn bộ hệ thống landing page này theo chuẩn chỉnh nhất: giao diện chuẩn di động, tương tác mượt mà, đầy đủ đếm ngược, bản đồ chỉ đường, mã QR mừng cưới và sổ lưu bút. Dưới đây là lộ trình 4 bước đơn giản nhất để bạn hoàn thiện và gửi đi!
              </p>
            </div>
          </div>

          {/* Step 1: Preparation */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#3A2A23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8A4F3D] text-white flex items-center justify-center text-xs font-bold">1</span>
              <span>Cần chuẩn bị những gì trước?</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-8">
              <div className="p-3.5 rounded-xl bg-[#FAF7F4] border border-[#EFE5DB]">
                <div className="font-semibold text-[#3A2A23] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A4F3D]" />
                  <span>Hình ảnh chất lượng cao</span>
                </div>
                <p className="text-xs text-[#7A6458]">
                  1 ảnh bìa + 1 ảnh chú rể + 1 ảnh cô dâu + 6-8 ảnh album. <strong>Hỗ trợ tải ảnh trực tiếp từ máy</strong> hoặc <strong>dán link Google Drive</strong> (chọn quyền công khai ai có link đều xem được).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F4] border border-[#EFE5DB]">
                <div className="font-semibold text-[#3A2A23] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A4F3D]" />
                  <span>Thời gian &amp; Địa chỉ chính xác</span>
                </div>
                <p className="text-xs text-[#7A6458]">
                  Ngày giờ Dương lịch &amp; Âm lịch, tên sảnh tiệc, địa chỉ cụ thể và link Google Maps vị trí nhà hàng.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F4] border border-[#EFE5DB]">
                <div className="font-semibold text-[#3A2A23] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A4F3D]" />
                  <span>Số tài khoản mừng cưới</span>
                </div>
                <p className="text-xs text-[#7A6458]">
                  Tên ngân hàng (MB, VCB, Techcombank, ACB...) và số tài khoản để hệ thống tự động sinh mã VietQR chuẩn xác.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F4] border border-[#EFE5DB]">
                <div className="font-semibold text-[#3A2A23] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A4F3D]" />
                  <span>Thông tin hai bên gia đình</span>
                </div>
                <p className="text-xs text-[#7A6458]">
                  Họ tên đầy đủ của Cha Mẹ chú rể (Nhà Trai) và Cha Mẹ cô dâu (Nhà Gái) cùng thứ bậc (Trưởng nam, Ái nữ...).
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: How to edit */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#3A2A23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8A4F3D] text-white flex items-center justify-center text-xs font-bold">2</span>
              <span>Cách thay đổi thông tin của bạn (Không cần đụng vào code)</span>
            </h4>
            <div className="pl-8 text-xs sm:text-sm text-[#5C4C42] space-y-2 leading-relaxed">
              <p>
                Bạn không cần mở bất kỳ tệp mã nguồn nào! Mình đã tích hợp sẵn một <strong>Bảng điều khiển cài đặt</strong> ngay trên website:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6B574C]">
                <li>Bấm vào nút <strong>"Sửa thông tin"</strong> ở thanh menu trên cùng.</li>
                <li>Điền tên cô dâu, tên chú rể, chọn ngày giờ cưới, thay đổi thông tin ngân hàng...</li>
                <li>Bấm <strong>"Lưu thay đổi"</strong>, toàn bộ trang web sẽ cập nhật lại ngay tức khắc!</li>
              </ul>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEditor();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#8A4F3D] text-white hover:bg-[#723F30] transition-colors"
                >
                  Mở Bảng Sửa Thông Tin Ngay
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Deployment & Hosting */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#3A2A23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8A4F3D] text-white flex items-center justify-center text-xs font-bold">3</span>
              <span>Làm sao để đưa web lên mạng miễn phí để gửi link?</span>
            </h4>
            <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#F6FAF7] border border-[#CDE5D4]">
                <div className="font-semibold text-green-900 text-sm mb-1 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-green-700" />
                  <span>Cách 1: Dùng link trực tiếp từ AI Studio</span>
                </div>
                <p className="text-xs text-green-800 leading-relaxed">
                  Ở góc trên màn hình AI Studio, bạn có thể bấm nút <strong>Share</strong> hoặc <strong>Deploy</strong> để có ngay đường link công khai vĩnh viễn (dạng `https://...`) gửi cho mọi người mở bằng điện thoại hoặc máy tính.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6F4] border border-[#EBDCD2]">
                <div className="font-semibold text-[#8A4F3D] text-sm mb-1 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-[#8A4F3D]" />
                  <span>Cách 2: Đưa lên Vercel / Netlify (Miễn phí 100%)</span>
                </div>
                <p className="text-xs text-[#755D50] leading-relaxed">
                  Xuất file mã nguồn dạng ZIP, sau đó đăng nhập Vercel hoặc Netlify, kéo thả thư mục vào là có ngay tên miền riêng miễn phí (ví dụ: `damcuoinamlinh.vercel.app`).
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Golden Tips */}
          <div className="space-y-3">
            <h4 className="font-serif-title text-lg font-bold text-[#3A2A23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#8A4F3D] text-white flex items-center justify-center text-xs font-bold">4</span>
              <span>4 Lưu ý vàng từ DEV 10 năm kinh nghiệm</span>
            </h4>
            <div className="pl-8 space-y-2 text-xs sm:text-sm text-[#614F44]">
              <div className="flex items-start gap-2">
                <ImageIcon className="w-4 h-4 text-[#8A4F3D] shrink-0 mt-0.5" />
                <span>
                  <strong>Link ảnh từ Google Drive:</strong> Bạn hoàn toàn dùng được! Lưu ý duy nhất là mở quyền chia sẻ sang <em>"Bất kỳ ai có đường liên kết" (Công khai)</em>. Khi bạn dán link vào ô cài đặt, website đã được lập trình để tự động chuyển thành link ảnh trực tiếp. Ngoài ra, bạn cũng có thể bấm nút "Tải ảnh từ máy" để lấy trực tiếp từ thư viện điện thoại.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Smartphone className="w-4 h-4 text-[#8A4F3D] shrink-0 mt-0.5" />
                <span>
                  <strong>95% khách mời xem bằng điện thoại:</strong> Luôn kiểm tra thử link thiệp trên màn hình điện thoại xem ảnh có nét, chữ có dễ đọc không trước khi gửi đại trà.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8A4F3D] shrink-0 mt-0.5" />
                <span>
                  <strong>Quét thử mã QR tài khoản:</strong> Mở app ngân hàng quét thử mã QR trên web để chắc chắn số tài khoản và tên thụ hưởng hiển thị đúng 100%.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Share2 className="w-4 h-4 text-[#8A4F3D] shrink-0 mt-0.5" />
                <span>
                  <strong>Tận dụng tính năng xuất RSVP:</strong> Khi khách bấm xác nhận đi bao nhiêu người, bấm nút "Xem thống kê khách mời" để xuất file Excel giúp bạn chốt số lượng mâm cỗ với nhà hàng cực kỳ nhàn!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF7F4] px-6 py-4 border-t border-[#EAE0D5] flex items-center justify-between">
          <div className="text-xs text-[#8A7467]">
            Chúc hai bạn có một đám cưới trọn vẹn và trăm năm hạnh phúc!
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-[#8A4F3D] text-white hover:bg-[#723F30] transition-colors"
          >
            Đã hiểu, quay lại trang web
          </button>
        </div>
      </div>
    </div>
  );
};
