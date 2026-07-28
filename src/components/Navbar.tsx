import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Calendar, Menu, X, Clock, MapPin, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Before & After' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Location & Hours' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Banner Announcement */}
      <div className="bg-[#1E1B18] text-[#F7E7CE] text-xs py-2 px-4 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>First time guest? Enjoy <strong className="text-white font-medium">20% Off</strong> any color or facial with code <code className="bg-[#D4AF37]/20 px-1.5 py-0.5 rounded text-[#D4AF37] font-bold">LUNA20</code></span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-neutral-300 text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              Riverside District, Austin TX
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              Mon-Fri 9am-8pm | Sat 9am-7pm | Sun 10am-5pm
            </span>
            <a href={`tel:${SALON_INFO.phone}`} className="flex items-center gap-1.5 text-[#D4AF37] hover:underline font-medium">
              <Phone className="w-3 h-3" />
              {SALON_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FDF8F5]/95 backdrop-blur-md shadow-md py-3 border-b border-[#F0E2D8]' 
          : 'bg-[#FDF8F5]/80 backdrop-blur-sm py-4 border-b border-[#F0E2D8]/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="brand_logo_button"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F7E7CE] to-[#DFB15B] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#1E1B18] rounded-full flex items-center justify-center">
                <span className="text-lg font-serif text-[#DFB15B] font-bold">☽</span>
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl tracking-wide text-[#2A2421] font-semibold block leading-none">
                Bella Luna
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C59B27] font-medium block mt-1">
                Salon • Austin
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav_link_${item.id}`}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive
                      ? 'text-[#C59B27] bg-[#D4AF37]/10 font-semibold'
                      : 'text-[#6E625B] hover:text-[#2A2421] hover:bg-[#F0E2D8]/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Bella%20Luna%20Salon!%20I'd%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200"
              title="Chat on WhatsApp"
              id="header_whatsapp_quick_btn"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => onOpenBooking()}
              id="header_book_now_btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white text-sm font-medium shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              id="mobile_quick_book_btn"
              className="p-2 rounded-full bg-[#D4AF37] text-white shadow-sm"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2A2421] hover:bg-[#F0E2D8]"
              id="mobile_menu_toggle_btn"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDF8F5] border-b border-[#F0E2D8] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#D4AF37]/15 text-[#C59B27] font-semibold'
                    : 'text-[#6E625B] hover:bg-[#F0E2D8]/50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#F0E2D8] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-white font-medium shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Now</span>
              </button>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-medium shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
