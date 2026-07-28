import React from 'react';
import { Calendar, Star, Sparkles, ChevronRight, Award, ShieldCheck, HeartHandshake, Phone } from 'lucide-react';
import { SALON_INFO, HERO_BANNER_IMAGE } from '../data/salonData';

interface HeroProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF2ED]">
      {/* Decorative Gold Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8A2A8]/20 via-[#F7E7CE]/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#F0E2D8] shadow-sm text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bespoke Hair & Luxury Beauty Sanctum</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2A2421] tracking-tight leading-[1.15]">
              Where Glamour Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#997415] italic font-normal">Elegance</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#6E625B] max-w-2xl mx-auto lg:mx-0 font-sans font-light leading-relaxed">
              Experience Austin’s premier sanctuary for dimensional balayage, couture precision cuts, 24K gold facial treatments, and bespoke bridal transformations.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenBooking()}
                id="hero_book_now_main_btn"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-base shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <Calendar className="w-5 h-5 text-white/90" />
                <span>Book Your Experience</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateSection('services')}
                id="hero_explore_services_btn"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white text-[#2A2421] border border-[#E5C8B4] hover:bg-[#FDF8F5] font-medium text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>View Menu & Pricing</span>
              </button>
            </div>

            {/* Social Trust Badges */}
            <div className="pt-6 border-t border-[#E5C8B4]/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-sm text-[#6E625B]">
              <div className="flex items-center gap-2">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#2A2421]">4.9 / 5.0</span>
                <span className="text-xs text-[#6E625B]">(486+ Reviews)</span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C59B27]" />
                <span>Austin’s Best Salon 2025</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                <span>100% Organic & Cruelty-Free</span>
              </div>
            </div>
          </div>

          {/* Right Column Image Banner & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame with Gold Accent Border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-[#D4AF37]/30 aspect-[4/5]">
                <img
                  src={HERO_BANNER_IMAGE}
                  alt="Bella Luna Salon Luxury Interior"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/60 via-transparent to-transparent" />

                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-[#1E1B18]/70 backdrop-blur-md border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#F7E7CE] font-semibold">Riverside District</p>
                      <p className="font-serif text-lg font-medium text-white">482 Magnolia Ave, Austin TX</p>
                    </div>
                    <a
                      href={`tel:${SALON_INFO.phone}`}
                      className="p-2.5 rounded-full bg-[#D4AF37] text-white hover:brightness-110 transition-all"
                      title="Call Salon"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Privilege Card */}
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#F0E2D8] hidden sm:flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-[#E8A2A8]/20 flex items-center justify-center text-[#D4AF37]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#2A2421]">VIP Hospitality</p>
                  <p className="text-[11px] text-[#6E625B]">Complimentary Champagne & Mimosa</p>
                </div>
              </div>

              {/* Floating Rating Pill */}
              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[#F0E2D8] hidden sm:flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Client 1" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Client 2" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Client 3" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span className="text-xs font-bold text-[#2A2421]">480+ Happy Guests</span>
                  </div>
                  <span className="text-[10px] text-[#6E625B]">This Month</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
