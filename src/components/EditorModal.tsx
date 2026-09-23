import React, { useState } from 'react';
import { X, Save, RotateCcw, User, Calendar, MapPin, CreditCard, Image, Check, AlertCircle, Info } from 'lucide-react';
import { WeddingData } from '../types';
import { ImageInputControl } from './ImageInputControl';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onSave: (newData: WeddingData) => void;
  onReset: () => void;
}

export const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'couple' | 'date' | 'events'>('couple');
  const [formData, setFormData] = useState<WeddingData>(JSON.parse(JSON.stringify(data)));
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync formData when data prop changes or modal opens
  React.useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(data)));
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  const handleResetConfirm = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục về nội dung mẫu ban đầu?')) {
      onReset();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#EBE1D6] overflow-hidden my-auto flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF7F4] border-b border-[#EAE0D6] px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif-title text-xl font-bold text-[#3A2A23]">
              Bảng Tùy Chỉnh Thông Tin Thiệp Cưới
            </h3>
            <p className="text-xs text-[#7A6458]">
              Thay đổi thông tin thật của bạn tại đây - không cần chạm vào một dòng code nào!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#7A6458] hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EAE0D6] bg-white px-6 overflow-x-auto gap-2">
          {[
            { id: 'couple', label: 'Cô Dâu & Chú Rể', icon: User },
            { id: 'date', label: 'Ngày Giờ & Lời Dẫn', icon: Calendar },
            { id: 'events', label: 'Lịch Trình Hôn Lễ', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'border-[#8A4F3D] text-[#8A4F3D]'
                    : 'border-transparent text-[#7A6458] hover:text-[#4A3B32]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {savedNotice && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-green-600" />
              <span>Đã lưu thành công! Toàn bộ website đã cập nhật nội dung mới.</span>
            </div>
          )}

          {/* TAB 1: COUPLE */}
          {activeTab === 'couple' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Groom info */}
              <div className="bg-[#FAF7F4] p-5 rounded-2xl border border-[#EDE1D6] space-y-3">
                <h4 className="font-semibold text-sm text-[#8A4F3D] uppercase tracking-wider">
                  Thông tin Chú Rể
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                    Họ và tên đầy đủ
                  </label>
                  <input
                    type="text"
                    value={formData.groom.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groom: { ...formData.groom, fullName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                    Tên gọi ngắn gọn (cho thiệp &amp; logo)
                  </label>
                  <input
                    type="text"
                    value={formData.groom.shortName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groom: { ...formData.groom, shortName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                  />
                </div>
                <ImageInputControl
                  label="Ảnh đại diện chú rể (Google Drive / Tải từ máy)"
                  value={formData.groom.avatar}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      groom: { ...formData.groom, avatar: url },
                    })
                  }
                  helperText="Dán link Google Drive hoặc bấm 'Tải ảnh từ máy' để chọn ảnh từ thiết bị của bạn"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                      Họ tên Bố (Ông)
                    </label>
                    <input
                      type="text"
                      value={formData.groom.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, fatherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                      Họ tên Mẹ (Bà)
                    </label>
                    <input
                      type="text"
                      value={formData.groom.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, motherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                    Thứ bậc (Ví dụ: Trưởng nam, Thứ nam...)
                  </label>
                  <input
                    type="text"
                    value={formData.groom.origin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groom: { ...formData.groom, origin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                  />
                </div>
              </div>

              {/* Bride info */}
              <div className="bg-[#FAF7F4] p-5 rounded-2xl border border-[#EDE1D6] space-y-3">
                <h4 className="font-semibold text-sm text-[#C8755D] uppercase tracking-wider">
                  Thông tin Cô Dâu
                </h4>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                    Họ và tên đầy đủ
                  </label>
                  <input
                    type="text"
                    value={formData.bride.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bride: { ...formData.bride, fullName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                    Tên gọi ngắn gọn (cho thiệp &amp; logo)
                  </label>
                  <input
                    type="text"
                    value={formData.bride.shortName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bride: { ...formData.bride, shortName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                  />
                </div>
                <ImageInputControl
                  label="Ảnh đại diện cô dâu (Google Drive / Tải từ máy)"
                  value={formData.bride.avatar}
                  onChange={(url) =>
                    setFormData({
                      ...formData,
                      bride: { ...formData.bride, avatar: url },
                    })
                  }
                  helperText="Dán link Google Drive hoặc bấm 'Tải ảnh từ máy' để chọn ảnh từ thiết bị của bạn"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                      Họ tên Bố (Ông)
                    </label>
                    <input
                      type="text"
                      value={formData.bride.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, fatherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                      Họ tên Mẹ (Bà)
                    </label>
                    <input
                      type="text"
                      value={formData.bride.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, motherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                    Thứ bậc (Ví dụ: Ái nữ, Trưởng nữ...)
                  </label>
                  <input
                    type="text"
                    value={formData.bride.origin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bride: { ...formData.bride, origin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs text-[#33251F]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATE & QUOTES */}
          {activeTab === 'date' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-[#5A453A] uppercase mb-1.5">
                  Thời gian diễn ra hôn lễ (Dùng cho đồng hồ đếm ngược)
                </label>
                <input
                  type="datetime-local"
                  value={formData.weddingDate.slice(0, 16)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weddingDate: `${e.target.value}:00`,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DECBC0] bg-white text-sm text-[#33251F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A453A] uppercase mb-1.5">
                  Câu nói yêu thích / Châm ngôn tình yêu
                </label>
                <input
                  type="text"
                  value={formData.sweetQuote}
                  onChange={(e) =>
                    setFormData({ ...formData, sweetQuote: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DECBC0] bg-white text-sm text-[#33251F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A453A] uppercase mb-1.5">
                  Lời ngỏ / Thông điệp mời cưới
                </label>
                <textarea
                  rows={3}
                  value={formData.invitationMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, invitationMessage: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-[#DECBC0] bg-white text-sm text-[#33251F] resize-none"
                />
              </div>

              {/* Bow image upload control */}
              <div className="pt-4 border-t border-[#EDE1D6]">
                <label className="block text-xs font-semibold text-[#8A4F3D] uppercase mb-1">
                  Hình ảnh nơ mở đầu (Cánh cửa thiệp)
                </label>
                <p className="text-[11px] text-[#7A6458] mb-2">
                  Tải bức ảnh nơ thật của bạn (.png hoặc .jpg). Hệ thống sẽ tự động hiển thị nơ với nền trong suốt mềm mại trên cánh cửa thiệp.
                </p>
                <ImageInputControl
                  value={formData.doorBowImage || ''}
                  onChange={(val) => setFormData({ ...formData, doorBowImage: val })}
                  label="Tải ảnh nơ thật từ máy của bạn"
                />
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {formData.events.map((ev, index) => (
                <div
                  key={ev.id}
                  className="bg-[#FAF7F4] p-5 rounded-2xl border border-[#EDE1D6] space-y-3"
                >
                  <div className="font-semibold text-sm text-[#8A4F3D]">
                    Sự kiện 0{index + 1}: {ev.title}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Tên sự kiện
                      </label>
                      <input
                        type="text"
                        value={ev.title}
                        onChange={(e) => {
                          const updated = [...formData.events];
                          updated[index].title = e.target.value;
                          setFormData({ ...formData, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Giờ đón khách (Ví dụ: 11:00)
                      </label>
                      <input
                        type="text"
                        value={ev.time}
                        onChange={(e) => {
                          const updated = [...formData.events];
                          updated[index].time = e.target.value;
                          setFormData({ ...formData, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Ngày Âm Lịch
                      </label>
                      <input
                        type="text"
                        value={ev.lunarDate}
                        onChange={(e) => {
                          const updated = [...formData.events];
                          updated[index].lunarDate = e.target.value;
                          setFormData({ ...formData, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Tên địa điểm / Sảnh tiệc
                      </label>
                      <input
                        type="text"
                        value={ev.venueName}
                        onChange={(e) => {
                          const updated = [...formData.events];
                          updated[index].venueName = e.target.value;
                          setFormData({ ...formData, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Link Google Maps chỉ đường
                      </label>
                      <input
                        type="url"
                        value={ev.mapUrl}
                        onChange={(e) => {
                          const updated = [...formData.events];
                          updated[index].mapUrl = e.target.value;
                          setFormData({ ...formData, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                      Địa chỉ chi tiết
                    </label>
                    <input
                      type="text"
                      value={ev.address}
                      onChange={(e) => {
                        const updated = [...formData.events];
                        updated[index].address = e.target.value;
                        setFormData({ ...formData, events: updated });
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: BANK ACCOUNTS */}
          {activeTab === 'bank' && (
            <div className="space-y-6">
              {formData.bankAccounts.map((acc, index) => (
                <div
                  key={acc.id}
                  className="bg-[#FAF7F4] p-5 rounded-2xl border border-[#EDE1D6] space-y-3"
                >
                  <div className="font-semibold text-sm text-[#8A4F3D]">
                    {acc.ownerType === 'groom' ? 'Tài khoản Chú Rể' : 'Tài khoản Cô Dâu'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Tên chủ tài khoản (In hoa không dấu)
                      </label>
                      <input
                        type="text"
                        value={acc.ownerName}
                        onChange={(e) => {
                          const updated = [...formData.bankAccounts];
                          updated[index].ownerName = e.target.value.toUpperCase();
                          setFormData({ ...formData, bankAccounts: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Số tài khoản
                      </label>
                      <input
                        type="text"
                        value={acc.accountNumber}
                        onChange={(e) => {
                          const updated = [...formData.bankAccounts];
                          updated[index].accountNumber = e.target.value.replace(/\s+/g, '');
                          setFormData({ ...formData, bankAccounts: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Tên ngân hàng hiển thị
                      </label>
                      <input
                        type="text"
                        value={acc.bankName}
                        onChange={(e) => {
                          const updated = [...formData.bankAccounts];
                          updated[index].bankName = e.target.value;
                          setFormData({ ...formData, bankAccounts: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A453A] uppercase mb-1">
                        Mã ngân hàng (cho mã VietQR, ví dụ: MB, VCB, TCB, ACB, VPB, ICB...)
                      </label>
                      <input
                        type="text"
                        value={acc.bankCode}
                        onChange={(e) => {
                          const updated = [...formData.bankAccounts];
                          updated[index].bankCode = e.target.value.toUpperCase();
                          setFormData({ ...formData, bankAccounts: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-[#DECBC0] bg-white text-xs uppercase"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8F2EC] border border-[#E7D6C8] rounded-2xl flex items-start gap-3 text-xs text-[#523F34]">
                <Info className="w-4 h-4 text-[#8A4F3D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-[#8A4F3D]">
                    Hỗ trợ tải ảnh từ máy tính / điện thoại HOẶC dán link Google Drive:
                  </p>
                  <p className="text-[11px] text-[#6B5548] leading-relaxed">
                    - <strong>Link Google Drive:</strong> Hãy mở quyền <em>"Bất kỳ ai có đường liên kết" (Công khai)</em> trên Drive trước khi copy link. Hệ thống sẽ tự động chuyển đổi thành link ảnh trực tiếp.<br />
                    - <strong>Tải ảnh từ máy:</strong> Bấm nút <em>"Tải ảnh từ máy"</em> để chọn ảnh trực tiếp từ bộ nhớ thiết bị của bạn.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="p-3.5 bg-[#FAF7F4] rounded-2xl border border-[#EDE1D6] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8A4F3D]">
                        Ảnh #{index + 1} {index === 0 ? '• (Ảnh Bìa Chính / Hero Banner)' : '• Ảnh Album Cưới'}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#8A4F3D]/10 text-[#8A4F3D] font-semibold uppercase">
                          Ảnh bìa thiệp
                        </span>
                      )}
                    </div>
                    <ImageInputControl
                      label=""
                      value={photo}
                      onChange={(url) => {
                        const updated = [...formData.photos];
                        updated[index] = url;
                        setFormData({ ...formData, photos: updated });
                      }}
                      placeholder="Dán link Google Drive hoặc link ảnh..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#EAE0D6] flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetConfirm}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8A4F3D] hover:bg-[#FAF4EF] transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khôi phục mẫu gốc</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A6458] hover:bg-black/5 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#8A4F3D] text-white hover:bg-[#723F30] shadow-md transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
