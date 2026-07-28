import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { Mail, Phone, MapPin, Sparkles, Send, Instagram, Facebook, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#1E1B18] text-[#F7E7CE] pt-16 pb-12 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top VIP Club Newsletter Banner */}
        <div className="bg-gradient-to-r from-[#2A2421] via-[#1E1B18] to-[#2A2421] p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#DFB15B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Bella Luna VIP Club</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">Receive 15% Off Your First Visit</h3>
            <p className="text-xs text-neutral-300 max-w-md font-light">
              Subscribe to our private guest list for exclusive seasonal specials, bridal style guides, and birthday pamper rewards.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-white text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're Subscribed! Welcome to VIP Club</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37] min-w-[260px]"
                />
                <button
                  type="submit"
                  id="newsletter_submit_btn"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-xs shadow hover:brightness-110 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F7E7CE] to-[#DFB15B] p-0.5">
                <div className="w-full h-full bg-[#1E1B18] rounded-full flex items-center justify-center">
                  <span className="text-lg font-serif text-[#DFB15B] font-bold">☽</span>
                </div>
              </div>
              <div>
                <span className="font-serif text-xl tracking-wide text-white font-semibold block leading-none">
                  Bella Luna
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#DFB15B] font-medium block mt-1">
                  Salon • Austin
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Where glamour meets elegance. Austin's premier destination for dimensional balayage, couture cuts, and 24K gold facial transformations.
            </p>

            <div className="flex items-center space-x-3 text-neutral-300 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#DFB15B]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-light">
              <li><a href="#home" className="hover:text-[#DFB15B] transition-colors">Home & Sanctuary</a></li>
              <li><a href="#services" className="hover:text-[#DFB15B] transition-colors">Couture Menu & Pricing</a></li>
              <li><a href="#about" className="hover:text-[#DFB15B] transition-colors">About Us & Master Artists</a></li>
              <li><a href="#gallery" className="hover:text-[#DFB15B] transition-colors">Before & After Metamorphosis</a></li>
              <li><a href="#testimonials" className="hover:text-[#DFB15B] transition-colors">Verified Guest Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#DFB15B] transition-colors">Location & Hours</a></li>
            </ul>
          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#DFB15B]">
              Business Hours
            </h4>
            <div className="space-y-2 text-xs text-neutral-300 font-light">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Monday – Friday:</span>
                <span>9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Saturday:</span>
                <span>9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Sunday:</span>
                <span>10:00 AM – 5:00 PM</span>
              </div>
              <p className="text-[10px] text-neutral-400 pt-1">Complimentary guest valet available Fri - Sun.</p>
            </div>
          </div>

          {/* Col 4: Location Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#DFB15B]">
              Austin Studio
            </h4>
            <div className="space-y-2 text-xs text-neutral-300 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFB15B] shrink-0 mt-0.5" />
                <span>482 Magnolia Avenue, Riverside District, Austin, TX 78701</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:underline">{SALON_INFO.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DFB15B] shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:underline">{SALON_INFO.email}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Bella Luna Salon. All Rights Reserved. Crafted with elegance in Austin, TX.</p>
          <div className="flex items-center space-x-6">
            <a href="#services" className="hover:text-white">Privacy Policy</a>
            <a href="#services" className="hover:text-white">Terms of Service</a>
            <a href="#contact" className="hover:text-white">Guest Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
