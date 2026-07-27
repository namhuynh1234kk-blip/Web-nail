import React, { useState, useEffect } from 'react';
import { Calendar, Search, Menu, X, User, LogOut, ShieldCheck, UserCheck, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenLookup: () => void;
  onOpenAuth: () => void;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenLookup,
  onOpenAuth,
  onOpenPortal,
}) => {
  const { currentUser, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section based on scroll
      const sections = ['home', 'services', 'pricing', 'promotions', 'booking', 'reviews', 'facility', 'contact'];
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Trang chủ', href: '#home' },
    { id: 'services', label: 'Dịch vụ', href: '#services' },
    { id: 'pricing', label: 'Bảng giá', href: '#pricing' },
    { id: 'promotions', label: 'Ưu đãi', href: '#promotions' },
    { id: 'reviews', label: 'Đánh giá', href: '#reviews' },
    { id: 'facility', label: 'Không gian', href: '#facility' },
    { id: 'contact', label: 'Liên hệ', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-purple-100 text-purple-800 rounded-md border border-purple-200">Admin</span>;
      case 'staff':
        return <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-blue-100 text-blue-800 rounded-md border border-blue-200">KTV Staff</span>;
      default:
        return <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200">Khách Hàng</span>;
    }
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f7f1eb]/95 backdrop-blur-md shadow-md border-b border-[#c9a86c]/20 py-3'
          : 'bg-[#f7f1eb]/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="group flex flex-col items-start"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3a2f2a] group-hover:text-[#b08d4f] transition-colors">
              Lumé
            </span>
            <span className="text-[10px] font-sans font-medium tracking-[0.25em] text-[#c9a86c] -mt-1 uppercase">
              Spa & Nail
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  activeSection === link.id
                    ? 'text-[#3a2f2a] font-semibold'
                    : 'text-[#6b5c54] hover:text-[#3a2f2a]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c9a86c] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons & Auth Account */}
          <div className="flex items-center space-x-2.5">
            
            {/* USER LOGIN / ACCOUNT BADGE */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#c9a86c]/40 hover:border-[#c9a86c] transition-all shadow-xs cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-[#3a2f2a] leading-none flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      {currentUser.role === 'customer' && (
                        <span className="px-1.5 py-0.2 text-[10px] bg-amber-100 text-amber-800 font-extrabold rounded-full border border-amber-300">
                          💎 {currentUser.rewardPoints || 0} đ
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5">{getRoleBadge(currentUser.role)}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6b5c54]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#ebe3d9] py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-[#f7f1eb] bg-[#f7f1eb]/50">
                      <div className="text-xs font-bold text-[#3a2f2a]">{currentUser.name}</div>
                      <div className="text-[10px] text-[#6b5c54] truncate">{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenPortal();
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-[#3a2f2a] hover:bg-[#f7f1eb] flex items-center gap-2 cursor-pointer"
                    >
                      {currentUser.role === 'admin' && <ShieldCheck className="w-4 h-4 text-purple-600" />}
                      {currentUser.role === 'staff' && <UserCheck className="w-4 h-4 text-blue-600" />}
                      {currentUser.role === 'customer' && <Sparkles className="w-4 h-4 text-emerald-600" />}
                      <span>
                        {currentUser.role === 'admin' && 'Bảng Quản Trị Admin'}
                        {currentUser.role === 'staff' && 'Cổng Ca Làm Việc KTV'}
                        {currentUser.role === 'customer' && 'Trang Lịch Hẹn Của Tôi'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenLookup();
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-[#6b5c54] hover:bg-[#f7f1eb] flex items-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-[#c9a86c]" />
                      <span>Tra cứu theo Mã Lịch</span>
                    </button>

                    <div className="border-t border-[#f7f1eb] my-1" />

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất tài khoản</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#3a2f2a] hover:text-[#b08d4f] bg-white hover:bg-[#f7f1eb] rounded-full border border-[#c9a86c]/40 transition-all shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#c9a86c]" />
                <span>Đăng nhập / Đăng ký</span>
              </button>
            )}

            {/* Tra cứu lịch button */}
            <button
              onClick={onOpenLookup}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#6b5c54] hover:text-[#3a2f2a] bg-white/60 hover:bg-white rounded-full border border-[#ebe3d9] transition-all shadow-xs cursor-pointer"
              title="Tra cứu lịch hẹn"
            >
              <Search className="w-3.5 h-3.5 text-[#c9a86c]" />
              <span>Tra cứu</span>
            </button>

            {/* Đặt lịch ngay button */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#c9a86c] hover:bg-[#b08d4f] text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt lịch</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3a2f2a] hover:bg-[#ebe3d9] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f7f1eb] border-b border-[#c9a86c]/20 px-6 py-5 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#f3e6e0] text-[#3a2f2a] font-semibold border-l-4 border-[#c9a86c]'
                    : 'text-[#6b5c54] hover:bg-white/50'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#ebe3d9] flex flex-col space-y-2.5">
              {!currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-[#3a2f2a] bg-white rounded-full border border-[#c9a86c]"
                >
                  <User className="w-4 h-4 text-[#c9a86c]" />
                  <span>Đăng Nhập / Đăng Ký Tài Khoản</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-white bg-[#3a2f2a] rounded-full shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#c9a86c]" />
                  <span>Mở Bảng Điều Hành ({currentUser.role.toUpperCase()})</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium bg-[#c9a86c] text-white rounded-full shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Đặt Lịch Ngay</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
