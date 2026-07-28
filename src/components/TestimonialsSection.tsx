import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/salonData';
import { Testimonial } from '../types';
import { ReviewModal } from './ReviewModal';
import { Star, Sparkles, CheckCircle, MessageSquarePlus, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReview = (newReview: Testimonial) => {
    setTestimonials([newReview, ...testimonials]);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#FAF2ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Overall Rating Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#F0E2D8] shadow-sm">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2ED] border border-[#F0E2D8] text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verified Guest Love</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2A2421]">
              Stories of Radiance & Elegance
            </h2>
            <p className="text-[#6E625B] text-sm sm:text-base font-light max-w-xl">
              Over 480+ five-star reviews from guests across Austin who trust Bella Luna for their hair and skincare transformations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end text-[#D4AF37] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-serif text-3xl font-bold text-[#2A2421]">4.9 / 5.0</span>
              <p className="text-xs text-[#6E625B]">Based on Google & Fresha reviews</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              id="write_review_btn"
              className="px-6 py-3 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl border border-[#F0E2D8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#F0E2D8]" />
                </div>

                <p className="text-xs text-[#2A2421] leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E2D8] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-[#2A2421]">{item.clientName}</h4>
                  {item.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#C59B27] font-medium bg-[#FAF2ED] px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-[#C59B27]" />
                      Verified Guest
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#6E625B]">
                  <span>{item.serviceName}</span> • <span className="text-[#C59B27]">{item.stylistName}</span>
                </div>
                <div className="text-[10px] text-neutral-400">{item.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal */}
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmitReview={handleAddReview}
        />

      </div>
    </section>
  );
};
