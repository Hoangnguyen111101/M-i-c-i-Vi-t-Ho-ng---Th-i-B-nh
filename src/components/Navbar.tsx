import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, BookOpen, Settings, Menu, X } from 'lucide-react';
import { WeddingData } from '../types';

interface NavbarProps {
  weddingData: WeddingData;
  onOpenEditor: () => void;
  onOpenGuidance: () => void;
  onReplayDoor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  weddingData,
  onOpenEditor,
  onOpenGuidance,
  onReplayDoor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Cặp Đôi', href: '#cap-doi' },
    { name: 'Lịch Trình', href: '#lich-trinh' },
    { name: 'Album Ảnh', href: '#album-anh' },
    { name: 'Lời Chúc', href: '#so-luu-but' },
    { name: 'Xác Nhận (RSVP)', href: '#xac-nhan-tham-du' },
  ];

  const groomInitial = weddingData.groom.shortName.charAt(0) || 'N';
  const brideInitial = weddingData.bride.shortName.charAt(0) || 'L';

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EFE5DC] py-2.5'
          : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <span
            className={`font-script text-2xl sm:text-3xl tracking-wide font-normal transition-colors ${
              isScrolled ? 'text-[#8A4F3D]' : 'text-white drop-shadow-md'
            }`}
          >
            {weddingData.groom.shortName}
          </span>
          <Heart
            className={`w-3.5 h-3.5 fill-current animate-pulse ${
              isScrolled ? 'text-[#D48166]' : 'text-[#FDE2D8]'
            }`}
          />
          <span
            className={`font-script text-2xl sm:text-3xl tracking-wide font-normal transition-colors ${
              isScrolled ? 'text-[#8A4F3D]' : 'text-white drop-shadow-md'
            }`}
          >
            {weddingData.bride.shortName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-[#B87A65] ${
                isScrolled ? 'text-[#5C4D44]' : 'text-white/95 hover:text-white drop-shadow'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls for User */}
        <div className="flex items-center gap-2">
          {/* Replay Door Intro Button */}
          {onReplayDoor && (
            <button
              type="button"
              onClick={onReplayDoor}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 border ${
                isScrolled
                  ? 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
                  : 'bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm'
              }`}
              title="Xem lại hiệu ứng mở cánh cửa thiệp cưới"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Mở thiệp</span>
            </button>
          )}

          {/* Senior Dev Guidance Button */}
          <button
            type="button"
            onClick={onOpenGuidance}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#FAF7F2] text-[#8A4F3D] border border-[#E5D2C5] hover:bg-[#F2E7DC] transition-all shadow-sm active:scale-95"
            title="Cẩm nang hướng dẫn từ DEV 10 năm kinh nghiệm cho người mới"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#B87A65]" />
            <span className="hidden sm:inline">Cẩm nang</span> DEV
          </button>

          {/* Edit / Customize Data Button */}
          <button
            type="button"
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#8A4F3D] text-white hover:bg-[#723F30] transition-all shadow-md active:scale-95"
            title="Chỉnh sửa thông tin thiệp cưới của bạn"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sửa thông tin</span>
            <span className="sm:hidden">Sửa</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#4A3D36] hover:bg-black/5' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-[#EFE5DC] px-5 py-6 shadow-xl animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#4A3B32] hover:text-[#B87A65] py-1 border-b border-[#FAF3ED] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              {onReplayDoor && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayDoor();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-pink-50 text-pink-700 border border-pink-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  Xem lại hiệu ứng mở cửa thiệp (Nơ hồng)
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuidance();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-[#FAF7F2] text-[#8A4F3D] border border-[#E5D2C5] flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#B87A65]" />
                Xem cẩm nang hướng dẫn cho người mới
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditor();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-[#8A4F3D] text-white flex items-center justify-center gap-2 shadow-sm"
              >
                <Settings className="w-4 h-4" />
                Thay đổi thông tin & ảnh thiệp cưới
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
