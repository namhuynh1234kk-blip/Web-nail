import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { PromotionsSection } from './components/PromotionsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FacilitySection } from './components/FacilitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BookingModal } from './components/BookingModal';
import { AppointmentLookupModal } from './components/AppointmentLookupModal';
import { AuthModal } from './components/AuthModal';
import { CustomerPortalModal } from './components/CustomerPortalModal';
import { StaffPortalModal } from './components/StaffPortalModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { ServiceItem, Appointment } from './types';

function AppContent() {
  const { currentUser } = useAuth();

  // Modal states
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialServiceId, setBookingInitialServiceId] = useState<string | undefined>(undefined);
  const [bookingInitialPromoCode, setBookingInitialPromoCode] = useState<string | undefined>(undefined);

  const [lookupModalOpen, setLookupModalOpen] = useState(false);

  // Role Auth & Portal Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [customerPortalOpen, setCustomerPortalOpen] = useState(false);
  const [staffPortalOpen, setStaffPortalOpen] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);

  // Filter category state for Pricing Section
  const [selectedPricingCategory, setSelectedPricingCategory] = useState<string>('all');

  // Open appropriate portal according to logged in user role
  const handleOpenPortal = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    if (currentUser.role === 'admin') {
      setAdminPortalOpen(true);
    } else if (currentUser.role === 'staff') {
      setStaffPortalOpen(true);
    } else {
      setCustomerPortalOpen(true);
    }
  };

  // Open booking modal helper
  const handleOpenBooking = (serviceId?: string, promoCode?: string) => {
    setBookingInitialServiceId(serviceId);
    setBookingInitialPromoCode(promoCode);
    setBookingModalOpen(true);
  };

  // Service selected from Pricing / Services section
  const handleBookServiceDirectly = (service: ServiceItem) => {
    handleOpenBooking(service.id);
  };

  // Promo code selected from Promotions section
  const handleApplyPromoCode = (code: string) => {
    handleOpenBooking(undefined, code);
  };

  // Handle category filter from Services section
  const handleFilterCategoryFromServices = (category: string) => {
    setSelectedPricingCategory(category);
    const pricingElem = document.getElementById('pricing');
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toast notice on successful booking
  const handleBookingSuccess = (appointment: Appointment) => {
    console.log('New appointment created:', appointment);
  };

  return (
    <div className="min-h-screen bg-[#f7f1eb] text-[#3a2f2a] font-sans selection:bg-[#c9a86c]/30">
      {/* Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookup={() => setLookupModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenPortal={handleOpenPortal}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onViewServices={() => {
            const servicesElem = document.getElementById('services');
            if (servicesElem) servicesElem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Services Highlighting Section */}
        <ServicesSection
          onSelectService={(service) => setSelectedServiceDetail(service)}
          onFilterCategory={handleFilterCategoryFromServices}
        />

        {/* Complete Filterable Pricing Menu */}
        <PricingSection
          selectedCategory={selectedPricingCategory}
          onSelectCategory={(cat) => setSelectedPricingCategory(cat)}
          onViewDetail={(service) => setSelectedServiceDetail(service)}
          onBookService={handleBookServiceDirectly}
        />

        {/* Promotions & Combo Packages */}
        <PromotionsSection onApplyPromo={handleApplyPromoCode} />

        {/* Facility & Atmosphere Gallery */}
        <FacilitySection />

        {/* Customer Reviews & Form */}
        <ReviewsSection />

        {/* Contact, Locations & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Modals */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onSelectBooking={(service) => {
          setSelectedServiceDetail(null);
          handleOpenBooking(service.id);
        }}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        initialServiceId={bookingInitialServiceId}
        initialPromoCode={bookingInitialPromoCode}
        onClose={() => {
          setBookingModalOpen(false);
          setBookingInitialServiceId(undefined);
          setBookingInitialPromoCode(undefined);
        }}
        onBookingSuccess={handleBookingSuccess}
      />

      <AppointmentLookupModal
        isOpen={lookupModalOpen}
        onClose={() => setLookupModalOpen(false)}
      />

      {/* Role Auth & Portal Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={() => handleOpenPortal()}
      />

      <CustomerPortalModal
        isOpen={customerPortalOpen}
        onClose={() => setCustomerPortalOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      <StaffPortalModal
        isOpen={staffPortalOpen}
        onClose={() => setStaffPortalOpen(false)}
      />

      <AdminPortalModal
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
