import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MapSection } from './components/MapSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BookingModal } from './components/BookingModal';
import { AIBeautyConsultant } from './components/AIBeautyConsultant';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [preSelectedStylistId, setPreSelectedStylistId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string, stylistId?: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedStylistId(stylistId);
    setIsBookingOpen(true);
  };

  const handleSelectServiceToBook = (serviceId: string) => {
    handleOpenBooking(serviceId, undefined);
  };

  const handleBookWithStylist = (stylistId: string) => {
    handleOpenBooking(undefined, stylistId);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#2A2421] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#1E1B18]">
      {/* Header Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onNavigateSection={handleNavigateSection}
        />

        {/* Services & Pricing Menu */}
        <ServicesSection onSelectServiceToBook={handleSelectServiceToBook} />

        {/* About Us & Master Stylists */}
        <AboutSection onBookWithStylist={handleBookWithStylist} />

        {/* Before & After Interactive Comparison Gallery */}
        <BeforeAfterGallery onOpenBooking={() => handleOpenBooking()} />

        {/* Client Reviews & Testimonials */}
        <TestimonialsSection />

        {/* Location, Google Map & Hours */}
        <MapSection />

        {/* Instagram Grid Feed */}
        <InstagramFeed />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Widgets */}
      <WhatsAppButton />
      <AIBeautyConsultant onSelectServiceToBook={handleSelectServiceToBook} />

      {/* Multi-Step Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
        preSelectedStylistId={preSelectedStylistId}
      />
    </div>
  );
}
