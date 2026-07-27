import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, ShieldCheck, UserCheck, Sparkles, ArrowRight, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login, register, quickLogin } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('customer');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    login(loginEmail);
    if (onLoginSuccess) onLoginSuccess();
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) return;
    register(regName, regEmail, regPhone, regRole);
    if (onLoginSuccess) onLoginSuccess();
    onClose();
  };

  const handleQuickRoleLogin = (role: UserRole) => {
    quickLogin(role);
    if (onLoginSuccess) onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#ebe3d9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration banner */}
        <div className="bg-[#3a2f2a] text-white p-6 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a86c]/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block text-[10px] font-semibold tracking-[0.2em] text-[#c9a86c] uppercase mb-1">
            Hệ Thống Thành Viên & Phân Quyền
          </span>
          <h2 className="font-serif text-2xl font-bold tracking-tight">
            Tài Khoản Lumé Spa & Nail
          </h2>
          <p className="text-xs text-[#ebe3d9]/80 mt-1 max-w-xs mx-auto">
            Đăng nhập để theo dõi lịch hẹn, quản lý ca làm việc hoặc quản trị hệ thống.
          </p>
        </div>

        {/* Quick Demo Role Switcher Bar */}
        <div className="p-4 bg-[#f7f1eb] border-b border-[#ebe3d9]">
          <div className="text-[11px] font-bold text-[#3a2f2a] flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a86c]" />
            <span>Đăng nhập nhanh theo Vai Trò (Demo):</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickRoleLogin('customer')}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#c9a86c]/30 hover:border-[#c9a86c] hover:bg-[#ebe3d9]/40 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3a2f2a]">
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Khách Hàng</span>
              </div>
              <div className="text-[10px] text-[#6b5c54] truncate mt-0.5">Lịch hẹn & Ưu đãi</div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('staff')}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#c9a86c]/30 hover:border-[#c9a86c] hover:bg-[#ebe3d9]/40 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3a2f2a]">
                <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>KTV Staff</span>
              </div>
              <div className="text-[10px] text-[#6b5c54] truncate mt-0.5">Lịch phục vụ & Ca</div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('admin')}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#c9a86c]/30 hover:border-[#c9a86c] hover:bg-[#ebe3d9]/40 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3a2f2a]">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Quản Trị Admin</span>
              </div>
              <div className="text-[10px] text-[#6b5c54] truncate mt-0.5">Toàn bộ hệ thống</div>
            </button>
          </div>
        </div>

        {/* Form Tabs */}
        <div className="flex border-b border-[#ebe3d9] bg-white">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold text-center transition-colors border-b-2 ${
              activeTab === 'login'
                ? 'border-[#c9a86c] text-[#3a2f2a] bg-[#f7f1eb]/30'
                : 'border-transparent text-[#6b5c54] hover:text-[#3a2f2a]'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold text-center transition-colors border-b-2 ${
              activeTab === 'register'
                ? 'border-[#c9a86c] text-[#3a2f2a] bg-[#f7f1eb]/30'
                : 'border-transparent text-[#6b5c54] hover:text-[#3a2f2a]'
            }`}
          >
            Đăng Ký Tài Khoản Mới
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                  Email hoặc Số điện thoại
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-[#6b5c54]" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="lan.nguyen@gmail.com"
                    className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-[#6b5c54]" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#6b5c54]">
                  <input type="checkbox" defaultChecked className="rounded border-[#ebe3d9] text-[#c9a86c]" />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#c9a86c] hover:underline font-medium">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#c9a86c] hover:bg-[#b08d4f] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Xác Nhận Đăng Nhập</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                  Chọn Vai Trò Đăng Ký
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('customer')}
                    className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition-all ${
                      regRole === 'customer'
                        ? 'bg-[#c9a86c] text-white border-[#c9a86c]'
                        : 'bg-[#f7f1eb] text-[#6b5c54] border-[#ebe3d9]'
                    }`}
                  >
                    👤 Khách Hàng
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('staff')}
                    className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition-all ${
                      regRole === 'staff'
                        ? 'bg-[#c9a86c] text-white border-[#c9a86c]'
                        : 'bg-[#f7f1eb] text-[#6b5c54] border-[#ebe3d9]'
                    }`}
                  >
                    💆‍♀️ KTV Staff
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('admin')}
                    className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition-all ${
                      regRole === 'admin'
                        ? 'bg-[#c9a86c] text-white border-[#c9a86c]'
                        : 'bg-[#f7f1eb] text-[#6b5c54] border-[#ebe3d9]'
                    }`}
                  >
                    👑 Quản Trị Admin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                  Họ và Tên *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-2.5 w-4 h-4 text-[#6b5c54]" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0901234567"
                    className="w-full px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3a2f2a] mb-1">
                  Mật khẩu khởi tạo *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-full bg-[#3a2f2a] hover:bg-[#4a3c35] text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
              >
                Tạo Tài Khoản ({regRole === 'customer' ? 'Khách Hàng' : regRole === 'staff' ? 'KTV Staff' : 'Admin'})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
