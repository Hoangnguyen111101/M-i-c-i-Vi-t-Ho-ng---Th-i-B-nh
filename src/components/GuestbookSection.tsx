import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquareHeart, Send, Heart, User, Sparkles } from 'lucide-react';
import { GuestWish } from '../types';

interface GuestbookSectionProps {
  wishes: GuestWish[];
  onAddWish: (wish: Omit<GuestWish, 'id' | 'createdAt'>) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({ wishes, onAddWish }) => {
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState('Bạn bè');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !content.trim()) return;

    setIsSubmitting(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D48166', '#E8A598', '#F3DFD2', '#D4AF37'],
      });
    } catch {
      // Confetti fallback
    }

    onAddWish({
      senderName: senderName.trim(),
      relationship,
      content: content.trim(),
    });

    setSenderName('');
    setContent('');
    setIsSubmitting(false);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 4000);
  };

  const relationshipOptions = [
    'Bạn bè',
    'Bạn thân cô dâu',
    'Bạn thân chú rể',
    'Đồng nghiệp',
    'Người thân / Họ hàng',
    'Anh/Chị/Em',
  ];

  return (
    <section id="so-luu-but" className="py-20 sm:py-24 bg-[#FAF7F2] border-t border-[#EDE1D6] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8D6C9] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#B87A65]" />
            <span>Sổ Lưu Bút Online</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            Gửi Lời Chúc Phúc
          </h2>
          <p className="mt-3 text-[#6E5B4F] text-sm leading-relaxed">
            Mỗi lời chúc chân thành của bạn là nguồn động viên và niềm vui to lớn đối với vợ chồng mình.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form to submit wish */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE0D5] shadow-sm">
            <h3 className="font-serif-title text-xl text-[#3A2A23] font-bold mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-[#D48166] text-[#D48166]" />
              <span>Viết Lời Chúc Mừng</span>
            </h3>

            {successNotice && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#F0F8F3] border border-[#C6E7D2] text-green-800 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
                <Sparkles className="w-4 h-4 text-green-600 shrink-0" />
                <span>Cảm ơn bạn! Lời chúc ngọt ngào của bạn đã được gửi thành công!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                  Tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Anh, Nhóm bạn Đại học..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DECBC0] focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                  Mối quan hệ
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DECBC0] focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23] bg-white transition-all"
                >
                  {relationshipOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                  Lời chúc gửi đến Cô dâu &amp; Chú rể *
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Gửi gắm những lời chúc phúc tốt đẹp nhất..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DECBC0] focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl font-semibold text-sm bg-[#8A4F3D] text-white hover:bg-[#723F30] shadow-md shadow-[#8A4F3D]/20 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Lời Chúc Phúc</span>
              </button>
            </form>
          </div>

          {/* List of wishes */}
          <div className="lg:col-span-7 space-y-4 max-h-[560px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE0D6]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8A7264]">
                Tất cả lời chúc ({wishes.length})
              </span>
              <span className="text-xs text-[#9E8779]">Cập nhật liên tục</span>
            </div>

            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white p-5 rounded-2xl border border-[#EBE1D7] shadow-xs hover:border-[#DCC8BB] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FAF3EE] border border-[#ECD9CC] flex items-center justify-center text-[#8A4F3D] font-bold text-xs">
                      {wish.senderName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#3A2A23]">
                        {wish.senderName}
                      </h4>
                      <span className="text-[11px] text-[#B87A65] font-medium">
                        {wish.relationship}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#9E8A7E]">
                    {wish.createdAt}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#594940] leading-relaxed pl-10.5">
                  "{wish.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
