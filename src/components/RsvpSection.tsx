import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserCheck, Users, Phone, CheckCircle2, XCircle, Download, Eye, EyeOff, Sparkles, Heart } from 'lucide-react';
import { RsvpEntry, WeddingData } from '../types';

interface RsvpSectionProps {
  weddingData: WeddingData;
  rsvpList: RsvpEntry[];
  onAddRsvp: (entry: Omit<RsvpEntry, 'id' | 'createdAt'>) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  weddingData,
  rsvpList,
  onAddRsvp,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [attendingEvent, setAttendingEvent] = useState(
    weddingData.events.length > 0 ? weddingData.events[weddingData.events.length - 1].title : 'Tiệc Cưới'
  );
  const [guestCount, setGuestCount] = useState(1);
  const [dietaryNote, setDietaryNote] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdminList, setShowAdminList] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (attending === 'yes') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D48166', '#E8A598', '#8A4F3D', '#D4AF37'],
        });
      } catch {
        // Fallback
      }
    }

    onAddRsvp({
      fullName: fullName.trim(),
      phone: phone.trim(),
      attending,
      attendingEvent,
      guestCount: attending === 'yes' ? guestCount : 0,
      dietaryNote: dietaryNote.trim(),
      message: message.trim(),
    });

    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setAttending('yes');
    setGuestCount(1);
    setDietaryNote('');
    setMessage('');
    setIsSubmitted(false);
  };

  // Export RSVP list to CSV for the bride and groom
  const handleExportCsv = () => {
    if (rsvpList.length === 0) {
      alert('Chưa có khách mời nào xác nhận!');
      return;
    }

    const headers = ['Họ và Tên', 'Số Điện Thoại', 'Tham Dự', 'Sự Kiện', 'Số Lượng Khách', 'Ghi Chú Ăn Uống', 'Lời Nhắn', 'Thời Gian Gửi'];
    const rows = rsvpList.map((item) => [
      `"${item.fullName}"`,
      `"${item.phone}"`,
      `"${item.attending === 'yes' ? 'Có' : 'Không'}"`,
      `"${item.attendingEvent}"`,
      `"${item.guestCount}"`,
      `"${item.dietaryNote || ''}"`,
      `"${item.message || ''}"`,
      `"${item.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Danh_Sach_Khach_Moi_${weddingData.groom.shortName}_${weddingData.bride.shortName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalAttendingGuests = rsvpList
    .filter((item) => item.attending === 'yes')
    .reduce((sum, item) => sum + item.guestCount, 0);

  return (
    <section id="xac-nhan-tham-du" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#ECD9CC] text-[#915442] text-xs font-semibold uppercase tracking-widest mb-3">
            <UserCheck className="w-3.5 h-3.5 text-[#B87A65]" />
            <span>Xác Nhận Tham Dự (RSVP)</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#332620] font-bold">
            Bạn Sẽ Đến Chung Vui Chứ?
          </h2>
          <p className="mt-3 text-[#6E5B4F] text-sm leading-relaxed">
            Để giúp cô dâu và chú rể chuẩn bị đón tiếp chu đáo nhất, xin vui lòng gửi phản hồi trước ngày hôn lễ.
          </p>
        </div>

        {/* RSVP Form Card */}
        <div className="bg-[#FAF7F4] border border-[#EFE4DA] rounded-3xl p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-title text-2xl text-[#3A2A23] font-bold">
                Xác Nhận Thành Công!
              </h3>
              <p className="text-sm text-[#665449] max-w-md mx-auto leading-relaxed">
                {attending === 'yes'
                  ? `Cảm ơn ${fullName}! Vợ chồng mình rất háo hức và mong chờ được đón tiếp bạn trong ngày vui!`
                  : `Cảm ơn ${fullName} đã phản hồi. Thật tiếc khi bạn không thể tham dự, nhưng chúng mình luôn trân trọng tình cảm của bạn!`}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white border border-[#DBC8BB] text-[#705A4D] hover:bg-[#F2E7DC] transition-colors"
                >
                  Gửi phản hồi khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full px-4 py-3 rounded-xl border border-[#DECBC0] bg-white focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23] transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                  Số điện thoại
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Để chúng mình tiện liên hệ và gửi nhắc lịch..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DECBC0] bg-white focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23] transition-all"
                  />
                  <Phone className="w-4 h-4 text-[#A89083] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-2">
                  Bạn có thể tham dự không? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                      attending === 'yes'
                        ? 'bg-white border-[#8A4F3D] shadow-sm ring-1 ring-[#8A4F3D]'
                        : 'bg-white/60 border-[#E5D7CC] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={() => setAttending('yes')}
                      className="sr-only"
                    />
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        attending === 'yes' ? 'text-[#8A4F3D]' : 'text-neutral-400'
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-sm text-[#3A2A23]">
                        Có, tôi chắc chắn sẽ đến!
                      </div>
                      <div className="text-[11px] text-[#7A6458]">Sẵn sàng nâng ly chúc mừng</div>
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center gap-3 ${
                      attending === 'no'
                        ? 'bg-white border-[#8A4F3D] shadow-sm ring-1 ring-[#8A4F3D]'
                        : 'bg-white/60 border-[#E5D7CC] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === 'no'}
                      onChange={() => setAttending('no')}
                      className="sr-only"
                    />
                    <XCircle
                      className={`w-5 h-5 ${
                        attending === 'no' ? 'text-[#8A4F3D]' : 'text-neutral-400'
                      }`}
                    />
                    <div>
                      <div className="font-semibold text-sm text-[#3A2A23]">
                        Rất tiếc, tôi bận mất rồi
                      </div>
                      <div className="text-[11px] text-[#7A6458]">Xin gửi lời chúc từ xa</div>
                    </div>
                  </label>
                </div>
              </div>

              {attending === 'yes' && (
                <>
                  {/* Event Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                      Bạn sẽ tham dự buổi nào? *
                    </label>
                    <select
                      value={attendingEvent}
                      onChange={(e) => setAttendingEvent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DECBC0] bg-white focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23]"
                    >
                      {weddingData.events.map((ev) => (
                        <option key={ev.id} value={ev.title}>
                          {ev.title} ({ev.time} • {ev.venueName})
                        </option>
                      ))}
                      <option value="Tất cả các buổi">Tất cả các buổi</option>
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                      Số lượng người tham dự (bao gồm bạn)
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                            guestCount === num
                              ? 'bg-[#8A4F3D] text-white border-[#8A4F3D] shadow-xs'
                              : 'bg-white text-[#57443A] border-[#DCC7BA] hover:bg-[#FAF4EE]'
                          }`}
                        >
                          {num} {num === 1 ? 'người' : 'người'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B574C] mb-1.5">
                  Lời nhắn gửi hoặc yêu cầu đặc biệt (chay, dị ứng...)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ghi chú thêm cho cô dâu và chú rể..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DECBC0] bg-white focus:border-[#8A4F3D] focus:ring-1 focus:ring-[#8A4F3D] outline-none text-sm text-[#3A2A23] resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm bg-[#8A4F3D] text-white hover:bg-[#723F30] shadow-md shadow-[#8A4F3D]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Gửi Xác Nhận Tham Dự
              </button>
            </form>
          )}
        </div>

        {/* Organizer Dashboard Drawer / Toggle for Bride & Groom */}
        <div className="mt-10 pt-6 border-t border-[#EDE1D6] text-center">
          <button
            type="button"
            onClick={() => setShowAdminList(!showAdminList)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A4F3D] hover:text-[#5E3224] transition-colors"
          >
            {showAdminList ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>Dành cho Cô Dâu &amp; Chú Rể: Xem Thống Kê Khách Mời ({rsvpList.length})</span>
          </button>

          {showAdminList && (
            <div className="mt-6 bg-[#FAF7F4] border border-[#E9DDD1] rounded-2xl p-6 text-left animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DDD2]">
                <div>
                  <h4 className="font-semibold text-base text-[#3A2A23]">
                    Danh Sách Khách Đã Phản Hồi
                  </h4>
                  <p className="text-xs text-[#7A6458] mt-0.5">
                    Tổng số khách dự kiến tham dự: <strong className="text-[#8A4F3D] font-bold">{totalAttendingGuests}</strong> người
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#D5C1B2] text-[#4A3B32] hover:bg-[#F2E7DC] transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-[#8A4F3D]" />
                  <span>Xuất file Excel / CSV</span>
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                {rsvpList.length === 0 ? (
                  <p className="text-xs text-[#8A7467] py-4 text-center">Chưa có khách mời nào gửi xác nhận.</p>
                ) : (
                  <table className="w-full text-xs text-left text-[#4A3B32]">
                    <thead className="bg-[#EFE5DC] text-[#4A3B32] uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-3 rounded-l-lg">Họ Tên</th>
                        <th className="py-2.5 px-3">SĐT</th>
                        <th className="py-2.5 px-3">Tham Dự</th>
                        <th className="py-2.5 px-3">Sự Kiện</th>
                        <th className="py-2.5 px-3">Số Người</th>
                        <th className="py-2.5 px-3 rounded-r-lg">Lời Nhắn</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE5DC]">
                      {rsvpList.map((item) => (
                        <tr key={item.id} className="hover:bg-white/60">
                          <td className="py-2 px-3 font-semibold">{item.fullName}</td>
                          <td className="py-2 px-3">{item.phone || '—'}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                item.attending === 'yes'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {item.attending === 'yes' ? 'Tham gia' : 'Bận'}
                            </span>
                          </td>
                          <td className="py-2 px-3">{item.attendingEvent}</td>
                          <td className="py-2 px-3 font-bold text-center">{item.guestCount}</td>
                          <td className="py-2 px-3 truncate max-w-xs">{item.message || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
