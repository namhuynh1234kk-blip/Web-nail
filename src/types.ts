export type UserRole = 'customer' | 'staff' | 'admin';

export interface RedeemedVoucher {
  id: string;
  code: string;
  title: string;
  discountType: 'amount' | 'percentage' | 'free_service';
  discountValue: number; // Discount amount in VND or 100%
  serviceTitle?: string;
  pointsSpent: number;
  redeemedAt: string;
  isUsed: boolean;
  validUntil: string;
}

export interface PointTransaction {
  id: string;
  date: string;
  points: number;
  type: 'earn' | 'redeem' | 'bonus';
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  specialistId?: string; // Links to specialist ID if role is 'staff'
  rewardPoints?: number;
  redeemedVouchers?: RedeemedVoucher[];
  pointTransactions?: PointTransaction[];
}

export type ServiceCategory = 'all' | 'spa' | 'facial' | 'nail' | 'hair';

export interface ServiceItem {
  id: string;
  category: 'spa' | 'facial' | 'nail' | 'hair';
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  duration: number; // minutes
  icon: string;
  description: string;
  image: string;
  popular?: boolean;
  protocolSteps?: string[];
  targetSkinOrBody?: string;
  benefits?: string[];
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  experienceYears: number;
}

export interface Promotion {
  id: string;
  title: string;
  code: string;
  discount: string;
  description: string;
  image: string;
  validUntil: string;
  originalPrice?: number;
  discountedPrice?: number;
  servicesIncluded?: string[];
}

export interface Appointment {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  selectedServices: ServiceItem[];
  specialistId?: string;
  specialistName?: string;
  date: string;
  timeSlot: string;
  totalPrice: number;
  discountAmount: number;
  finalPrice: number;
  promoCode?: string;
  notes?: string;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  branch: string;
}

export interface Review {
  id: string;
  customerName: string;
  avatar?: string;
  rating: number;
  serviceName: string;
  date: string;
  comment: string;
  verified: boolean;
}
