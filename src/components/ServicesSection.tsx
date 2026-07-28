import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { Clock, DollarSign, Search, CheckCircle2, Sparkles, Plus, Calendar, Filter } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'color', label: 'Hair Color & Balayage' },
    { id: 'haircut', label: 'Cuts & Blowouts' },
    { id: 'facials', label: 'Facials & Skincare' },
    { id: 'nails', label: 'Nail Bar' },
    { id: 'lashes', label: 'Lashes & Brows' },
    { id: 'bridal', label: 'Bridal & Events' },
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-[#FDF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#F0E2D8] text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Couture Service Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A2421]">
            Tailored Beauty Treatments & Pricing
          </h2>
          <p className="text-[#6E625B] text-base sm:text-lg font-light leading-relaxed">
            Every service at Bella Luna includes a personalized consultation, organic luxury formulas, and our signature VIP hospitality.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#F0E2D8]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                id={`cat_tab_${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#1E1B18] text-[#F7E7CE] shadow-md font-semibold'
                    : 'bg-white text-[#6E625B] hover:text-[#2A2421] hover:bg-[#FAF2ED] border border-[#F0E2D8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6E625B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#E5C8B4] text-sm text-[#2A2421] placeholder-[#6E625B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6E625B] hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#F0E2D8] space-y-3">
            <Filter className="w-10 h-10 text-[#C59B27] mx-auto opacity-50" />
            <h3 className="text-xl font-serif text-[#2A2421]">No matching services found</h3>
            <p className="text-sm text-[#6E625B]">Try adjusting your search terms or selecting a different category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#FAF2ED] text-[#C59B27] font-medium text-xs rounded-full hover:bg-[#F0E2D8]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#F0E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badge */}
                <div className="relative h-56 overflow-hidden bg-[#FAF2ED]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {service.popular && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1E1B18] text-[#DFB15B] text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-[#DFB15B]" />
                      Signature Favorite
                    </span>
                  )}

                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#F0E2D8]">
                    <span className="font-serif text-lg font-bold text-[#2A2421]">
                      ${service.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6E625B]">
                      <span className="uppercase tracking-wider font-semibold text-[#C59B27]">
                        {service.category.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-[#6E625B]">
                        <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                        {service.durationMinutes} mins
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#2A2421] group-hover:text-[#C59B27] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs text-[#6E625B] leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-2 border-t border-[#F0E2D8] space-y-1.5">
                    {service.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#2A2421]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Booking Action */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedServiceForModal(service)}
                      className="text-xs text-[#C59B27] underline underline-offset-4 hover:text-[#2A2421] font-medium"
                    >
                      View Details & Add-ons
                    </button>

                    <button
                      onClick={() => onSelectServiceToBook(service.id)}
                      id={`book_service_${service.id}`}
                      className="px-4 py-2.5 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Service</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Service Details */}
        {selectedServiceForModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF2ED] flex items-center justify-center text-[#2A2421] hover:bg-[#F0E2D8]"
              >
                ✕
              </button>

              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img
                  src={selectedServiceForModal.image}
                  alt={selectedServiceForModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
                    {selectedServiceForModal.category}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#2A2421]">
                    ${selectedServiceForModal.price}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-[#2A2421]">{selectedServiceForModal.name}</h3>

                <p className="text-sm text-[#6E625B] leading-relaxed">{selectedServiceForModal.description}</p>

                <div className="pt-3 border-t border-[#F0E2D8] space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2A2421]">Key Benefits & Inclusions:</h4>
                  <ul className="space-y-1.5">
                    {selectedServiceForModal.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#2A2421]">
                        <CheckCircle2 className="w-4 h-4 text-[#C59B27]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const id = selectedServiceForModal.id;
                    setSelectedServiceForModal(null);
                    onSelectServiceToBook(id);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-white font-medium text-sm shadow-md hover:brightness-105"
                >
                  Proceed to Book (${selectedServiceForModal.price})
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
