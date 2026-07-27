import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ebe3d9] text-[#3a2f2a] pt-14 pb-8 border-t border-[#c9a86c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Logo */}
        <div className="inline-flex flex-col items-center mb-4">
          <span className="font-serif text-2xl font-bold tracking-tight">
            Lumé
          </span>
          <span className="text-[9px] font-sans font-medium tracking-[0.25em] text-[#c9a86c] uppercase -mt-1">
            SPA & NAIL
          </span>
        </div>

        {/* Address */}
        <p className="text-xs sm:text-sm text-[#6b5c54] max-w-md mx-auto leading-relaxed">
          123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh<br />
          Hotline: 0901 234 567 · Email: hello@lumespa.vn
        </p>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 my-6 text-xs sm:text-sm font-medium text-[#6b5c54]">
          <a href="#home" className="hover:text-[#3a2f2a] transition-colors">Trang chủ</a>
          <a href="#services" className="hover:text-[#3a2f2a] transition-colors">Dịch vụ</a>
          <a href="#pricing" className="hover:text-[#3a2f2a] transition-colors">Bảng giá</a>
          <a href="#promotions" className="hover:text-[#3a2f2a] transition-colors">Khuyến mãi</a>
          <a href="#reviews" className="hover:text-[#3a2f2a] transition-colors">Đánh giá</a>
          <a href="#facility" className="hover:text-[#3a2f2a] transition-colors">Không gian</a>
          <a href="#contact" className="hover:text-[#3a2f2a] transition-colors">Liên hệ</a>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#3a2f2a]/10 text-xs text-[#6b5c54]/80">
          © {new Date().getFullYear()} Lumé Spa & Nail. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
