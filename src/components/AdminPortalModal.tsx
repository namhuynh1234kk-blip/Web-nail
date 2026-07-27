import React, { useState } from 'react';
import {
  X, Calendar, DollarSign, Users, Sparkles, Search, Filter, CheckCircle2,
  Clock3, AlertCircle, Play, UserCheck, PlusCircle, Edit3, Trash2, TrendingUp, BarChart3, ShieldCheck, Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EmailConfirmationModal } from './EmailConfirmationModal';
import { SERVICES_DATA as INITIAL_SERVICES } from '../data/servicesData';
import { SPECIALISTS_DATA as INITIAL_SPECIALISTS } from '../data/specialistsData';
import { ServiceItem, Specialist, Appointment } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, appointments, updateAppointmentStatus, assignSpecialist } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'staff' | 'analytics'>('bookings');
  
  // Bookings tab filter & search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Email Ticket Modal state
  const [selectedEmailApp, setSelectedEmailApp] = useState<Appointment | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Services management local state
  const [servicesList, setServicesList] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [showAddService, setShowAddService] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<'spa' | 'facial' | 'nail' | 'hair'>('spa');
  const [newServiceDuration, setNewServiceDuration] = useState('60');

  // Staff management local state
  const [specialistsList, setSpecialistsList] = useState<Specialist[]>(INITIAL_SPECIALISTS);

  if (!isOpen || !currentUser) return null;

  // Key KPI Calculations
  const completedApps = appointments.filter(a => a.status === 'completed');
  const totalRevenue = completedApps.reduce((sum, a) => sum + a.finalPrice, 0);
  const totalBookingsCount = appointments.length;
  const inProgressCount = appointments.filter(a => a.status === 'in_progress').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;

  // Filtered appointments for Bookings tab
  const filteredAppointments = appointments.filter(app => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.customerPhone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle || !newServicePrice) return;

    const newService: ServiceItem = {
      id: `srv_${Date.now()}`,
      category: newServiceCategory,
      title: newServiceTitle,
      price: parseInt(newServicePrice, 10),
      duration: parseInt(newServiceDuration, 10),
      icon: '✨',
      description: 'Dịch vụ cao cấp được quản trị viên cập nhật mới.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      popular: true
    };

    setServicesList(prev => [newService, ...prev]);
    setNewServiceTitle('');
    setNewServicePrice('');
    setShowAddService(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#ebe3d9] h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#1f1917] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#c9a86c]/20 text-[#c9a86c] rounded-2xl border border-[#c9a86c]/30">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#c9a86c] uppercase">
                  Bảng Quản Trị Hệ Thống Admin
                </span>
                <h2 className="font-serif text-2xl font-bold tracking-tight">
                  Lumé Spa & Nail Management
                </h2>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="text-[10px] text-white/60">Doanh thu thực nhận</div>
                <div className="font-bold text-[#c9a86c] text-sm">{totalRevenue.toLocaleString('vi-VN')}đ</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="text-[10px] text-white/60">Tổng lịch hẹn</div>
                <div className="font-bold text-white text-sm">{totalBookingsCount} lịch</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="text-[10px] text-white/60">Đang phục vụ</div>
                <div className="font-bold text-blue-400 text-sm">{inProgressCount} ca</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <div className="text-[10px] text-white/60">Lịch chờ xác nhận</div>
                <div className="font-bold text-amber-400 text-sm">{confirmedCount} ca</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#ebe3d9] bg-[#f7f1eb] px-6 shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-[#c9a86c] text-[#3a2f2a] bg-white'
                : 'border-transparent text-[#6b5c54] hover:text-[#3a2f2a]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#c9a86c]" />
            <span>Quản Lý Lịch Hẹn ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'services'
                ? 'border-[#c9a86c] text-[#3a2f2a] bg-white'
                : 'border-transparent text-[#6b5c54] hover:text-[#3a2f2a]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c9a86c]" />
            <span>Quản Lý Dịch Vụ ({servicesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'staff'
                ? 'border-[#c9a86c] text-[#3a2f2a] bg-white'
                : 'border-transparent text-[#6b5c54] hover:text-[#3a2f2a]'
            }`}
          >
            <Users className="w-4 h-4 text-[#c9a86c]" />
            <span>Đội Ngũ KTV Staff ({specialistsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'border-[#c9a86c] text-[#3a2f2a] bg-white'
                : 'border-transparent text-[#6b5c54] hover:text-[#3a2f2a]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#c9a86c]" />
            <span>Báo Cáo Doanh Thu</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#f7f1eb]/30">
          
          {/* TAB 1: BOOKINGS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {/* Search & Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#ebe3d9]">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#6b5c54]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm mã lịch (LUME-...), tên hoặc số điện thoại khách..."
                    className="w-full pl-10 pr-4 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#c9a86c]" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9] focus:outline-none focus:border-[#c9a86c] font-medium"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="confirmed">⏳ Chờ phục vụ (Confirmed)</option>
                    <option value="in_progress">⚡ Đang thực hiện (In Progress)</option>
                    <option value="completed">✅ Hoàn thành (Completed)</option>
                    <option value="cancelled">❌ Đã hủy (Cancelled)</option>
                  </select>
                </div>
              </div>

              {/* Bookings Table / Cards */}
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#ebe3d9]">
                    <p className="text-xs text-[#6b5c54]">Không tìm thấy lịch hẹn phù hợp.</p>
                  </div>
                ) : (
                  filteredAppointments.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white p-5 rounded-2xl border border-[#ebe3d9] shadow-xs hover:border-[#c9a86c]/50 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#f7f1eb]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#c9a86c]">#{app.id}</span>
                          <span className="text-xs font-bold text-[#3a2f2a]">{app.customerName}</span>
                          <span className="text-xs text-[#6b5c54]">({app.customerPhone})</span>
                        </div>

                        {/* Direct Status Switcher for Admin */}
                        <div className="flex items-center gap-2">
                          <select
                            value={app.status}
                            onChange={(e) => updateAppointmentStatus(app.id, e.target.value as Appointment['status'])}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#f7f1eb] border border-[#ebe3d9] text-[#3a2f2a] cursor-pointer"
                          >
                            <option value="confirmed">⏳ Chờ phục vụ</option>
                            <option value="in_progress">⚡ Đang làm ca</option>
                            <option value="completed">✅ Hoàn thành</option>
                            <option value="cancelled">❌ Đã hủy</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-[#6b5c54] block">Dịch vụ đã chọn:</span>
                          <span className="font-bold text-[#3a2f2a]">
                            {app.selectedServices.map(s => s.title).join(', ')}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-[#6b5c54] block">Thời gian & Chi nhánh:</span>
                          <span className="text-[#3a2f2a]">{app.date} lúc <strong>{app.timeSlot}</strong></span>
                        </div>

                        <div>
                          <span className="text-[10px] text-[#6b5c54] block">Phân công KTV:</span>
                          <select
                            value={app.specialistId || ''}
                            onChange={(e) => {
                              const spec = specialistsList.find(s => s.id === e.target.value);
                              if (spec) {
                                assignSpecialist(app.id, spec.id, spec.name);
                              }
                            }}
                            className="w-full px-2 py-1 text-xs bg-[#f7f1eb] rounded-lg border border-[#ebe3d9]"
                          >
                            <option value="">Chưa chọn KTV</option>
                            {specialistsList.map(s => (
                              <option key={s.id} value={s.id}>{s.name} ({s.specialty})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#f7f1eb] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-[#6b5c54]">Khuyến mãi: {app.promoCode || 'Không áp dụng'}</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedEmailApp(app);
                              setIsEmailModalOpen(true);
                            }}
                            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-600" />
                            <span>Gửi Mail Vé</span>
                          </button>
                          <span className="font-bold text-[#3a2f2a]">Thanh toán: {app.finalPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#ebe3d9]">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#3a2f2a]">Danh Mục Dịch Vụ Lumé</h3>
                  <p className="text-xs text-[#6b5c54]">Quản lý giá, thời lượng và thông tin dịch vụ spa/nail.</p>
                </div>

                <button
                  onClick={() => setShowAddService(true)}
                  className="px-4 py-2 rounded-full bg-[#c9a86c] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Thêm Dịch Vụ Mới</span>
                </button>
              </div>

              {/* Add Service Modal/Form */}
              {showAddService && (
                <form onSubmit={handleAddServiceSubmit} className="bg-white p-5 rounded-2xl border-2 border-[#c9a86c] space-y-3">
                  <h4 className="font-serif font-bold text-sm text-[#3a2f2a]">Tạo Dịch Vụ Spa / Nail Mới</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Tên dịch vụ (VD: Massage Cổ Vai Gáy Đá Nóng)"
                      value={newServiceTitle}
                      onChange={(e) => setNewServiceTitle(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9]"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Giá tiền (VNĐ) (VD: 550000)"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9]"
                    />
                    <select
                      value={newServiceCategory}
                      onChange={(e) => setNewServiceCategory(e.target.value as any)}
                      className="px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9]"
                    >
                      <option value="spa">Spa & Massage Body</option>
                      <option value="facial">Chăm Sóc Da Facial</option>
                      <option value="nail">Nail & Chăm Sóc Móng</option>
                      <option value="hair">Gội Đầu Dưỡng Sinh</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Thời lượng (Phút) (VD: 60)"
                      value={newServiceDuration}
                      onChange={(e) => setNewServiceDuration(e.target.value)}
                      className="px-3 py-2 text-xs bg-[#f7f1eb] rounded-xl border border-[#ebe3d9]"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddService(false)}
                      className="px-4 py-2 rounded-full text-xs text-[#6b5c54] hover:bg-[#f7f1eb]"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full bg-[#3a2f2a] text-white text-xs font-bold"
                    >
                      Lưu Dịch Vụ
                    </button>
                  </div>
                </form>
              )}

              {/* Services List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((s) => (
                  <div key={s.id} className="bg-white p-4 rounded-2xl border border-[#ebe3d9] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#f7f1eb] flex items-center justify-center text-lg">
                        {s.icon}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-xs text-[#3a2f2a]">{s.title}</div>
                        <div className="text-[11px] text-[#6b5c54]">
                          {s.duration} phút · <strong className="text-[#c9a86c]">{s.price.toLocaleString('vi-VN')}đ</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setServicesList(prev => prev.filter(item => item.id !== s.id))}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Xóa dịch vụ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STAFF MANAGEMENT */}
          {activeTab === 'staff' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-[#ebe3d9] flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#3a2f2a]">Đội Ngũ KTV Chuyên Viên Lumé</h3>
                  <p className="text-xs text-[#6b5c54]">Theo dõi tay nghề, đánh giá và phân công ca làm việc.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialistsList.map((spec) => (
                  <div key={spec.id} className="bg-white p-5 rounded-2xl border border-[#ebe3d9] flex items-center gap-4">
                    <img
                      src={spec.avatar}
                      alt={spec.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#ebe3d9]"
                    />
                    <div className="space-y-1">
                      <div className="font-serif font-bold text-sm text-[#3a2f2a]">{spec.name}</div>
                      <div className="text-xs text-[#c9a86c] font-medium">{spec.title}</div>
                      <div className="text-[11px] text-[#6b5c54]">
                        Kinh nghiệm: {spec.experienceYears} năm · Đánh giá: <strong>★ {spec.rating}</strong> ({spec.reviewsCount} lượt)
                      </div>
                      <div className="text-[10px] bg-[#f7f1eb] px-2 py-0.5 rounded-md inline-block text-[#6b5c54]">
                        Chuyên môn: {spec.specialty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVENUE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-[#ebe3d9] space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#3a2f2a]">Báo Cáo Tổng Quan Doanh Thu</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#f7f1eb] rounded-2xl border border-[#ebe3d9]">
                    <div className="text-xs text-[#6b5c54]">Doanh thu từ Spa & Facial</div>
                    <div className="font-serif text-xl font-bold text-[#3a2f2a] mt-1">
                      {Math.round(totalRevenue * 0.65).toLocaleString('vi-VN')}đ
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ Chiếm 65% tổng doanh thu</div>
                  </div>

                  <div className="p-4 bg-[#f7f1eb] rounded-2xl border border-[#ebe3d9]">
                    <div className="text-xs text-[#6b5c54]">Doanh thu từ Nail & Care</div>
                    <div className="font-serif text-xl font-bold text-[#3a2f2a] mt-1">
                      {Math.round(totalRevenue * 0.35).toLocaleString('vi-VN')}đ
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ Chiếm 35% tổng doanh thu</div>
                  </div>

                  <div className="p-4 bg-[#f7f1eb] rounded-2xl border border-[#ebe3d9]">
                    <div className="text-xs text-[#6b5c54]">Tỷ lệ hoàn thành lịch</div>
                    <div className="font-serif text-xl font-bold text-emerald-700 mt-1">
                      {appointments.length > 0 ? Math.round((completedApps.length / appointments.length) * 100) : 100}%
                    </div>
                    <div className="text-[10px] text-[#6b5c54] mt-1">Trên tổng {appointments.length} lịch hẹn</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <EmailConfirmationModal
        appointment={selectedEmailApp}
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
};
