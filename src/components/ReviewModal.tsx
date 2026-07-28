import React, { useState } from 'react';
import { Star, X, CheckCircle, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';
import { SERVICES_DATA, STYLISTS_DATA } from '../data/salonData';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Testimonial) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [serviceName, setServiceName] = useState(SERVICES_DATA[0].name);
  const [stylistName, setStylistName] = useState(STYLISTS_DATA[0].name);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: Testimonial = {
      id: 'rev_' + Date.now(),
      clientName: name.trim(),
      rating,
      serviceName,
      stylistName,
      date: 'Just now',
      comment: comment.trim(),
      verified: true,
    };

    onSubmitReview(newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setComment('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF2ED] flex items-center justify-center text-[#2A2421] hover:bg-[#F0E2D8]"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF2ED] text-[#D4AF37] mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-serif text-[#2A2421]">Thank You For Your Review!</h3>
            <p className="text-sm text-[#6E625B]">
              Your feedback helps us maintain our sanctuary of glamour and elegance.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2ED] text-xs font-semibold text-[#C59B27] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Share Your Experience</span>
              </div>
              <h3 className="text-2xl font-serif text-[#2A2421]">Leave a Review</h3>
              <p className="text-xs text-[#6E625B]">Tell us about your transformation at Bella Luna Salon.</p>
            </div>

            {/* Star Rating Selector */}
            <div className="flex flex-col items-center justify-center space-y-1 py-2 bg-[#FAF2ED] rounded-2xl border border-[#F0E2D8]">
              <span className="text-xs text-[#6E625B] font-medium">Your Overall Satisfaction</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-[#D4AF37] text-[#D4AF37]'
                          : 'text-neutral-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Victoria Sterling"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5C8B4] text-sm text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Service & Stylist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                  Service Received
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E5C8B4] text-xs text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                  Master Artist
                </label>
                <select
                  value={stylistName}
                  onChange={(e) => setStylistName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E5C8B4] text-xs text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  {STYLISTS_DATA.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                Your Review / Feedback
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your hair or beauty experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5C8B4] text-sm text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-sm shadow-md hover:brightness-105 transition-all"
            >
              Submit Review
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
