import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X } from 'lucide-react';
import { WeddingData } from '../types';

interface NavbarProps {
  weddingData: WeddingData;
  onReplayDoor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  weddingData,
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
    { name: 'Xác Nhận (RSVP)', href: '#xac-nhan-tham-du' },
  ];

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
          className="flex items-center gap-1.5 sm:gap-2 group transition-transform active:scale-95 whitespace-nowrap shrink min-w-0"
        >
          <span
            className={`font-script text-lg sm:text-2xl md:text-3xl tracking-normal font-normal leading-none transition-colors ${
              isScrolled ? 'text-[#8A4F3D]' : 'text-white drop-shadow-md'
            }`}
          >
            {weddingData.groom.shortName}
          </span>
          <Heart
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 fill-current animate-pulse ${
              isScrolled ? 'text-[#D48166]' : 'text-[#FDE2D8]'
            }`}
          />
          <span
            className={`font-script text-lg sm:text-2xl md:text-3xl tracking-normal font-normal leading-none transition-colors ${
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Replay Door Intro Button */}
          {onReplayDoor && (
            <button
              type="button"
              onClick={onReplayDoor}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 border shrink-0 ${
                isScrolled
                  ? 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
                  : 'bg-white/20 text-white border-white/40 hover:bg-white/30 backdrop-blur-sm'
              }`}
              title="Xem lại hiệu ứng mở cánh cửa thiệp cưới"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="whitespace-nowrap">Mở lại thiệp</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 sm:p-2 rounded-lg transition-colors shrink-0 ${
              isScrolled ? 'text-[#4A3D36] hover:bg-black/5' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
            {onReplayDoor && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayDoor();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-pink-50 text-pink-700 border border-pink-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  Xem lại hiệu ứng mở cửa thiệp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
