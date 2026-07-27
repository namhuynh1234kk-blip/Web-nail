import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Appointment, RedeemedVoucher, PointTransaction } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { RewardPackage } from '../data/rewardsData';

// Demo Preset Accounts for easy role testing
export const DEMO_USERS: Record<UserRole, User> = {
  customer: {
    id: 'usr_cust_1',
    name: 'Nguyễn Thị Lan',
    email: 'lan.nguyen@gmail.com',
    phone: '0901234567',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    rewardPoints: 320, // Initial balance for instant testing & redeeming!
    redeemedVouchers: [
      {
        id: 'v_welcome50',
        code: 'WELCOME-LUME-50K',
        title: 'Voucher Chào Mừng Khách Hàng Mới 50k',
        discountType: 'amount',
        discountValue: 50000,
        pointsSpent: 0,
        redeemedAt: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
        isUsed: false,
        validUntil: '2026-12-31',
      },
    ],
    pointTransactions: [
      {
        id: 'tx_init_1',
        date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
        points: 200,
        type: 'earn',
        description: 'Tích điểm dịch vụ Cấy Tinh Chất Collagen Vàng 24K',
      },
      {
        id: 'tx_init_2',
        date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
        points: 120,
        type: 'earn',
        description: 'Tích điểm dịch vụ Gội Đầu Dưỡng Sinh & Chăm Sóc Da',
      },
    ],
  },
  staff: {
    id: 'usr_staff_1',
    name: 'Mai Phương',
    email: 'mai.phuong@lumespa.vn',
    phone: '0902111222',
    role: 'staff',
    specialistId: 'sp1',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
  },
  admin: {
    id: 'usr_admin_1',
    name: 'Ban Quản Lý Lumé',
    email: 'admin@lumespa.vn',
    phone: '0909999888',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
  }
};

// Initial Sample Appointments for demonstration
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'LUME-8821',
    userId: 'usr_cust_1',
    customerName: 'Nguyễn Thị Lan',
    customerPhone: '0901234567',
    customerEmail: 'lan.nguyen@gmail.com',
    selectedServices: [SERVICES_DATA[0], SERVICES_DATA[2]],
    specialistId: 'sp1',
    specialistName: 'Mai Phương',
    date: new Date().toISOString().split('T')[0], // Today
    timeSlot: '14:00',
    totalPrice: 1040000,
    discountAmount: 100000,
    finalPrice: 940000,
    promoCode: 'LUMEVIP100',
    notes: 'Khách thích phòng yên tĩnh, da khô nhạy cảm.',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    branch: 'Chi nhánh 1 (123 Nguyễn Huệ, Q.1)'
  },
  {
    id: 'LUME-8822',
    customerName: 'Trần Minh Anh',
    customerPhone: '0988777666',
    customerEmail: 'minhanh@gmail.com',
    selectedServices: [SERVICES_DATA[1]],
    specialistId: 'sp1',
    specialistName: 'Mai Phương',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '15:30',
    totalPrice: 480000,
    discountAmount: 0,
    finalPrice: 480000,
    notes: 'Sơn gel màu pastel hồng nhẹ.',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    branch: 'Chi nhánh 1 (123 Nguyễn Huệ, Q.1)'
  },
  {
    id: 'LUME-8823',
    customerName: 'Lê Hoàng Nam',
    customerPhone: '0912345999',
    customerEmail: 'nam.le@gmail.com',
    selectedServices: [SERVICES_DATA[3]],
    specialistId: 'sp3',
    specialistName: 'Bảo Ngọc',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00',
    totalPrice: 450000,
    discountAmount: 50000,
    finalPrice: 400000,
    status: 'completed',
    createdAt: new Date().toISOString(),
    branch: 'Chi nhánh 2 (45 Thảo Điền, Q.2)'
  }
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, role?: UserRole) => void;
  register: (name: string, email: string, phone: string, role: UserRole) => void;
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  assignSpecialist: (appointmentId: string, specialistId: string, specialistName: string) => void;
  redeemRewardPackage: (pkg: RewardPackage) => { success: boolean; voucher?: RedeemedVoucher; error?: string };
  useVoucher: (voucherId: string) => void;
  addBonusPoints: (points: number, description: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lume_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('lume_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lume_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lume_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lume_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const quickLogin = (role: UserRole) => {
    setCurrentUser(DEMO_USERS[role]);
  };

  const login = (email: string, role: UserRole = 'customer') => {
    if (email.includes('admin')) {
      setCurrentUser(DEMO_USERS.admin);
    } else if (email.includes('mai.phuong') || email.includes('staff') || role === 'staff') {
      setCurrentUser(DEMO_USERS.staff);
    } else if (email.includes('lan.nguyen')) {
      setCurrentUser(DEMO_USERS.customer);
    } else {
      setCurrentUser({
        id: `usr_${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        phone: '0901234567',
        role: role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        rewardPoints: 100, // Welcome bonus points!
        redeemedVouchers: [],
        pointTransactions: [
          {
            id: `tx_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            points: 100,
            type: 'bonus',
            description: 'Tặng 100 điểm thưởng chào mừng thành viên mới Lumé Spa',
          },
        ],
      });
    }
  };

  const register = (name: string, email: string, phone: string, role: UserRole) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
      rewardPoints: 100,
      redeemedVouchers: [],
      pointTransactions: [
        {
          id: `tx_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          points: 100,
          type: 'bonus',
          description: 'Thưởng 100 điểm khởi tạo tài khoản thành viên',
        },
      ],
      ...(role === 'staff' ? { specialistId: 'sp1' } : {})
    };
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addAppointment = (newApp: Appointment) => {
    setAppointments(prev => [newApp, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => {
      const targetApp = prev.find(a => a.id === id);
      if (targetApp && status === 'completed' && targetApp.status !== 'completed') {
        // Automatically credit reward points: 1 point per 10,000 VND spent
        const pointsEarned = Math.floor(targetApp.finalPrice / 10000);

        if (pointsEarned > 0 && currentUser && (currentUser.id === targetApp.userId || currentUser.email === targetApp.customerEmail)) {
          const newTx: PointTransaction = {
            id: `tx_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            points: pointsEarned,
            type: 'earn',
            description: `Tích điểm hoàn thành lịch hẹn #${targetApp.id}`,
          };

          setCurrentUser(user => {
            if (!user) return user;
            const currentPoints = user.rewardPoints || 0;
            return {
              ...user,
              rewardPoints: currentPoints + pointsEarned,
              pointTransactions: [newTx, ...(user.pointTransactions || [])],
            };
          });
        }
      }

      return prev.map(app => (app.id === id ? { ...app, status } : app));
    });
  };

  const assignSpecialist = (appointmentId: string, specialistId: string, specialistName: string) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === appointmentId ? { ...app, specialistId, specialistName } : app
      )
    );
  };

  // Redeem Reward Package Logic
  const redeemRewardPackage = (pkg: RewardPackage): { success: boolean; voucher?: RedeemedVoucher; error?: string } => {
    if (!currentUser) {
      return { success: false, error: 'Vui lòng đăng nhập để đổi quà tích điểm!' };
    }

    const currentPoints = currentUser.rewardPoints || 0;
    if (currentPoints < pkg.pointsRequired) {
      return {
        success: false,
        error: `Bạn cần thêm ${pkg.pointsRequired - currentPoints} điểm nữa để đổi gói quà này!`,
      };
    }

    // Generate Voucher Code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `REW-${pkg.id.toUpperCase()}-${randomSuffix}`;

    const newVoucher: RedeemedVoucher = {
      id: `vouch_${Date.now()}`,
      code: voucherCode,
      title: pkg.title,
      discountType: pkg.category === 'free_service' ? 'free_service' : 'amount',
      discountValue: pkg.valueAmount,
      serviceTitle: pkg.serviceTitle,
      pointsSpent: pkg.pointsRequired,
      redeemedAt: new Date().toISOString().split('T')[0],
      isUsed: false,
      validUntil: '2026-12-31',
    };

    const newTx: PointTransaction = {
      id: `tx_red_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      points: -pkg.pointsRequired,
      type: 'redeem',
      description: `Đổi quà: ${pkg.title} (Mã: ${voucherCode})`,
    };

    setCurrentUser(user => {
      if (!user) return null;
      return {
        ...user,
        rewardPoints: (user.rewardPoints || 0) - pkg.pointsRequired,
        redeemedVouchers: [newVoucher, ...(user.redeemedVouchers || [])],
        pointTransactions: [newTx, ...(user.pointTransactions || [])],
      };
    });

    return { success: true, voucher: newVoucher };
  };

  // Mark a voucher as used after booking
  const useVoucher = (voucherId: string) => {
    setCurrentUser(user => {
      if (!user || !user.redeemedVouchers) return user;
      return {
        ...user,
        redeemedVouchers: user.redeemedVouchers.map(v =>
          v.id === voucherId ? { ...v, isUsed: true } : v
        ),
      };
    });
  };

  // Admin/Staff Add Bonus Points
  const addBonusPoints = (points: number, description: string) => {
    if (!currentUser) return;
    const newTx: PointTransaction = {
      id: `tx_bonus_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      points: points,
      type: 'bonus',
      description: description || 'Tặng điểm thưởng đặc biệt từ BQL Lumé Spa',
    };

    setCurrentUser(user => {
      if (!user) return user;
      return {
        ...user,
        rewardPoints: (user.rewardPoints || 0) + points,
        pointTransactions: [newTx, ...(user.pointTransactions || [])],
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        quickLogin,
        logout,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        assignSpecialist,
        redeemRewardPackage,
        useVoucher,
        addBonusPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

