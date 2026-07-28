import React, { useState } from 'react';
import { TRANSFORMATIONS_DATA } from '../data/salonData';
import { ServiceCategory } from '../types';
import { Sparkles, SlidersHorizontal, Clock, User, CheckCircle2, Calendar } from 'lucide-react';

interface BeforeAfterGalleryProps {
  onOpenBooking: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({
    t1: 50,
    t2: 50,
    t3: 50,
    t4: 50,
  });

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Transformations' },
    { id: 'color', label: 'Color & Balayage' },
    { id: 'haircut', label: 'Cuts & Extensions' },
    { id: 'facials', label: 'Facials & Glow' },
    { id: 'nails', label: 'Russian Nails' },
  ];

  const filteredTransformations = TRANSFORMATIONS_DATA.filter(
    (item) => activeCategory === 'all' || item.serviceCategory === activeCategory
  );

  const handleSliderMove = (id: string, value: number) => {
    setSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id="gallery" className="py-20 bg-[#FDF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#F0E2D8] text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Interactive Transformation Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A2421]">
            Witness The Bella Luna Metamorphosis
          </h2>
          <p className="text-[#6E625B] text-base sm:text-lg font-light leading-relaxed">
            Drag the slider handle left or right on any image below to reveal the before and after transformation created by our master stylists.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              id={`gallery_tab_${cat.id}`}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredTransformations.map((item) => {
            const pos = sliderPositions[item.id] ?? 50;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#F0E2D8] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Comparison Image Container */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden select-none touch-none bg-neutral-900">
                  {/* Before Image (Base Background) */}
                  <img
                    src={item.beforeImage}
                    alt={`${item.title} Before`}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                    BEFORE
                  </div>

                  {/* After Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${pos}%` }}
                  >
                    <img
                      src={item.afterImage}
                      alt={`${item.title} After`}
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', height: '100%' }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      AFTER ✨
                    </div>
                  </div>

                  {/* Divider Line & Drag Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center z-20"
                    style={{ left: `${pos}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-2xl border-2 border-[#D4AF37] flex items-center justify-center text-[#2A2421]">
                      <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Invisible Range Slider Input for Accessibility & Touch */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={pos}
                    onChange={(e) => handleSliderMove(item.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    aria-label={`Compare Before and After for ${item.title}`}
                  />
                </div>

                {/* Info Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6E625B]">
                      <span className="flex items-center gap-1 font-semibold text-[#C59B27]">
                        <User className="w-3.5 h-3.5" />
                        Artist: {item.stylistName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                        {item.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#2A2421]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#6E625B] leading-relaxed">
                      {item.clientStory}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0E2D8] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#FAF2ED] text-[#C59B27] text-[10px] rounded-full font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={onOpenBooking}
                      className="px-4 py-2 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Look</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
