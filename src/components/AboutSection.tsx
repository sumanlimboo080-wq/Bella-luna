import React from 'react';
import { STYLISTS_DATA, SALON_INFO } from '../data/salonData';
import { Sparkles, Heart, Award, Star, Calendar, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  onBookWithStylist: (stylistId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookWithStylist }) => {
  return (
    <section id="about" className="py-20 bg-[#FAF2ED] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#F0E2D8] text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Our Sanctuary Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A2421] leading-tight">
              A Haven of Glamour, Artistry & Unmatched Elegance
            </h2>

            <p className="text-[#6E625B] text-base leading-relaxed font-light">
              Founded in 2018 in Austin’s artistic Riverside District, <strong className="text-[#2A2421] font-medium">Bella Luna Salon</strong> was born out of a passion to fuse high-fashion European hair design with warm Texan hospitality.
            </p>

            <p className="text-[#6E625B] text-base leading-relaxed font-light">
              We believe that true beauty is deeply personal. From the moment you step into our blush and gold sanctuary, enjoy a chilled glass of mimosa, relax under soft ambient lighting, and let our master artists curate a look that honors your unique essence.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E5C8B4]">
              <div>
                <span className="block font-serif text-3xl font-bold text-[#C59B27]">14+ Years</span>
                <span className="text-xs text-[#6E625B]">Master Color & Styling Expertise</span>
              </div>
              <div>
                <span className="block font-serif text-3xl font-bold text-[#C59B27]">15,000+</span>
                <span className="text-xs text-[#6E625B]">Successful Transformations</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/5] border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80"
                  alt="Stylist at work"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#F0E2D8] shadow-sm text-center">
                <Award className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
                <p className="text-xs font-serif font-bold text-[#2A2421]">Voted Top Salon 2025</p>
                <p className="text-[10px] text-[#6E625B]">Austin Chronicle Reader Poll</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-[#1E1B18] text-white p-5 rounded-2xl shadow-sm text-center">
                <ShieldCheck className="w-6 h-6 text-[#DFB15B] mx-auto mb-1" />
                <p className="text-xs font-serif font-bold text-[#F7E7CE]">100% Organic & Vegan</p>
                <p className="text-[10px] text-neutral-400">Cruelty-free formulations</p>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/5] border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                  alt="Beauty transformation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Master Stylists Team Introduction */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#F0E2D8] text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Meet Our Artists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2A2421]">
              The Master Artists Behind Your Transformation
            </h2>
            <p className="text-[#6E625B] text-sm sm:text-base font-light">
              Internationally trained specialists dedicated to precision, artistry, and tailored care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STYLISTS_DATA.map((stylist) => (
              <div
                key={stylist.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#F0E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-72 overflow-hidden bg-[#FAF2ED]">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-widest text-[#DFB15B] font-semibold">{stylist.role}</p>
                    <h3 className="text-xl font-serif font-bold text-white">{stylist.name}</h3>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#2A2421] shadow flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    <span>{stylist.rating}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {stylist.specialties.map((spec, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#FAF2ED] text-[#C59B27] text-[10px] font-medium border border-[#F0E2D8]">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#6E625B] leading-relaxed line-clamp-3">
                      {stylist.bio}
                    </p>

                    <blockquote className="text-[11px] italic text-[#2A2421] border-l-2 border-[#D4AF37] pl-3 py-0.5">
                      "{stylist.quote}"
                    </blockquote>
                  </div>

                  <div className="pt-3 border-t border-[#F0E2D8] flex items-center justify-between">
                    <span className="text-[11px] text-[#6E625B]">
                      {stylist.experienceYears} Years Exp.
                    </span>

                    <button
                      onClick={() => onBookWithStylist(stylist.id)}
                      id={`book_stylist_${stylist.id}`}
                      className="px-3.5 py-2 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Artist</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
