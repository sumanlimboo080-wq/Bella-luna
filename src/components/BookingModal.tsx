import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, STYLISTS_DATA, SALON_INFO } from '../data/salonData';
import { BookingDetails, ServiceItem } from '../types';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
  FileText,
  DollarSign,
  MessageCircle,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedStylistId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedStylistId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    SERVICES_DATA.find((s) => s.id === preSelectedServiceId) || SERVICES_DATA[0]
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<string>(
    preSelectedStylistId || 'any'
  );

  // Generate upcoming 10 days
  const today = new Date();
  const availableDates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      fullDate: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '11:45 AM',
    '01:15 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '06:45 PM',
  ];

  const [selectedDate, setSelectedDate] = useState(availableDates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (preSelectedServiceId) {
      const found = SERVICES_DATA.find((s) => s.id === preSelectedServiceId);
      if (found) setSelectedService(found);
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (preSelectedStylistId) {
      setSelectedStylist(preSelectedStylistId);
    }
  }, [preSelectedStylistId]);

  if (!isOpen) return null;

  const addonsList = [
    { id: 'olaplex', name: 'Olaplex Bond Protection Elixir', price: 35 },
    { id: 'scalp_detox', name: 'Organic Botanical Scalp Detox', price: 25 },
    { id: 'gel_upgrade', name: 'High Shine Gel Gloss Upgrade', price: 20 },
    { id: 'eye_mask', name: '24K Gold Collagen Eye Treatment', price: 15 },
  ];

  const calculateTotal = () => {
    let total = selectedService.price;
    selectedAddons.forEach((addonId) => {
      const addon = addonsList.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

  const handleToggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) return;

    const ref = 'BL-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(ref);
    setStep(5);

    // Confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#DFB15B', '#F7E7CE', '#E8A2A8'],
      });
    } catch (err) {
      console.log('Confetti triggered');
    }
  };

  const getStylistName = () => {
    if (selectedStylist === 'any') return 'First Available Master Artist';
    const found = STYLISTS_DATA.find((s) => s.id === selectedStylist);
    return found ? found.name : 'Master Artist';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close_booking_modal_btn"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF2ED] flex items-center justify-center text-[#2A2421] hover:bg-[#F0E2D8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Step Header */}
        {step < 5 && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#6E625B]">
              <span className="uppercase tracking-widest text-[#C59B27]">
                Appointment Reservation • Step {step} of 4
              </span>
              <span>Total: ${calculateTotal()}</span>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-gradient-to-r from-[#D4AF37] to-[#C59B27]' : 'bg-[#F0E2D8]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: SELECT SERVICE & ADDONS */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif text-[#2A2421]">Select Your Beauty Service</h3>
              <p className="text-xs text-[#6E625B]">Choose a primary service and optional luxury add-on treatments.</p>
            </div>

            {/* Service Select List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {SERVICES_DATA.map((service) => {
                const isSelected = selectedService.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#FAF2ED] shadow-sm'
                        : 'border-[#F0E2D8] hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-12 h-12 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-[#2A2421]">{service.name}</h4>
                        <span className="text-[11px] text-[#6E625B]">{service.durationMinutes} mins • {service.category}</span>
                      </div>
                    </div>
                    <span className="font-serif text-base font-bold text-[#2A2421]">${service.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Add-ons Checklist */}
            <div className="space-y-2 pt-2 border-t border-[#F0E2D8]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2A2421]">
                Enhance Experience (Optional Add-ons)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addonsList.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        checked
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#2A2421] font-medium'
                          : 'border-[#F0E2D8] text-[#6E625B]'
                      }`}
                    >
                      <span>{addon.name}</span>
                      <span className="font-semibold text-[#C59B27]">+${addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              id="step1_next_btn"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Select Artist</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: SELECT STYLIST */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif text-[#2A2421]">Choose Your Master Artist</h3>
              <p className="text-xs text-[#6E625B]">Select a preferred specialist or opt for first available availability.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              <div
                onClick={() => setSelectedStylist('any')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                  selectedStylist === 'any'
                    ? 'border-[#D4AF37] bg-[#FAF2ED] shadow-sm'
                    : 'border-[#F0E2D8] hover:bg-neutral-50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#1E1B18] text-[#F7E7CE] flex items-center justify-center font-bold text-sm shrink-0">
                  ☽
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#2A2421]">First Available Master</h4>
                  <p className="text-[11px] text-[#6E625B]">Best for quick scheduling</p>
                </div>
              </div>

              {STYLISTS_DATA.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStylist(st.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedStylist === st.id
                      ? 'border-[#D4AF37] bg-[#FAF2ED] shadow-sm'
                      : 'border-[#F0E2D8] hover:bg-neutral-50'
                  }`}
                >
                  <img
                    src={st.image}
                    alt={st.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#2A2421]">{st.name}</h4>
                    <p className="text-[11px] text-[#C59B27] font-medium">{st.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-full border border-[#E5C8B4] text-xs font-medium text-[#2A2421] hover:bg-[#FAF2ED]"
              >
                Back
              </button>

              <button
                onClick={() => setStep(3)}
                id="step2_next_btn"
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Select Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME SLOT */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif text-[#2A2421]">Pick Date & Preferred Slot</h3>
              <p className="text-xs text-[#6E625B]">Choose a convenient date and arrival time.</p>
            </div>

            {/* Dates Slider / Row */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2A2421]">
                Available Dates
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableDates.map((d) => {
                  const isSel = selectedDate === d.fullDate;
                  return (
                    <button
                      key={d.fullDate}
                      type="button"
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border min-w-[72px] shrink-0 transition-all ${
                        isSel
                          ? 'border-[#D4AF37] bg-[#1E1B18] text-[#F7E7CE] shadow'
                          : 'border-[#F0E2D8] bg-white text-[#2A2421] hover:bg-[#FAF2ED]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold text-[#C59B27]">{d.dayName}</span>
                      <span className="font-serif text-lg font-bold">{d.dayNumber}</span>
                      <span className="text-[10px] text-neutral-400">{d.monthName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2A2421]">
                Available Time Slots
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const isSel = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                        isSel
                          ? 'border-[#D4AF37] bg-[#D4AF37] text-white shadow-sm'
                          : 'border-[#F0E2D8] text-[#2A2421] hover:bg-[#FAF2ED]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-full border border-[#E5C8B4] text-xs font-medium text-[#2A2421] hover:bg-[#FAF2ED]"
              >
                Back
              </button>

              <button
                onClick={() => setStep(4)}
                id="step3_next_btn"
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Guest Information</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GUEST DETAILS FORM */}
        {step === 4 && (
          <form onSubmit={handleConfirmBooking} className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif text-[#2A2421]">Guest Contact & Requests</h3>
              <p className="text-xs text-[#6E625B]">Provide your details for instant SMS & email confirmation.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6E625B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Sterling"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5C8B4] text-sm text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#6E625B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5C8B4] text-sm text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6E625B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="victoria@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5C8B4] text-sm text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2421] mb-1">
                  Special Requests / Hair Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Previous color history, hair length, dietary preferences for drink bar..."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5C8B4] text-sm text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="p-4 rounded-2xl bg-[#FAF2ED] border border-[#F0E2D8] text-xs space-y-1.5">
              <div className="flex justify-between font-semibold text-[#2A2421]">
                <span>{selectedService.name}</span>
                <span>${selectedService.price}</span>
              </div>
              <div className="flex justify-between text-[#6E625B]">
                <span>Artist: {getStylistName()}</span>
                <span>{selectedDate} @ {selectedTime}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="text-[11px] text-[#C59B27]">
                  Includes {selectedAddons.length} luxury add-on(s)
                </div>
              )}
              <div className="pt-2 border-t border-[#E5C8B4] flex justify-between font-serif text-sm font-bold text-[#2A2421]">
                <span>Total Due at Salon</span>
                <span className="text-[#C59B27]">${calculateTotal()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-3 rounded-full border border-[#E5C8B4] text-xs font-medium text-[#2A2421] hover:bg-[#FAF2ED]"
              >
                Back
              </button>

              <button
                type="submit"
                id="confirm_booking_submit_btn"
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-sm shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Reserve Appointment</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: CONFIRMATION SUCCESS */}
        {step === 5 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#DFB15B] to-[#F7E7CE] p-1 mx-auto shadow-xl">
              <div className="w-full h-full bg-[#1E1B18] rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-[#DFB15B] animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27] bg-[#FAF2ED] px-3 py-1 rounded-full">
                Booking Reference: {bookingRef}
              </span>
              <h3 className="text-3xl font-serif text-[#2A2421]">Your Appointment is Confirmed!</h3>
              <p className="text-sm text-[#6E625B] max-w-md mx-auto">
                We are delighted to welcome you to Bella Luna Salon. A confirmation SMS & email have been dispatched to {clientEmail}.
              </p>
            </div>

            {/* Appointment Summary Card */}
            <div className="p-6 rounded-3xl bg-[#FAF2ED] border border-[#F0E2D8] text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between items-center border-b border-[#F0E2D8] pb-3">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2A2421]">{selectedService.name}</h4>
                  <p className="text-xs text-[#C59B27] font-medium">{getStylistName()}</p>
                </div>
                <span className="font-serif text-xl font-bold text-[#2A2421]">${calculateTotal()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#6E625B]">
                <div>
                  <span className="block font-semibold text-[#2A2421]">Date & Time</span>
                  <span>{selectedDate} at {selectedTime}</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#2A2421]">Guest Name</span>
                  <span>{clientName}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#6E625B] pt-2 border-t border-[#F0E2D8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>482 Magnolia Avenue, Riverside District, Austin TX</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Bella%20Luna!%20I%20just%20booked%20an%20appointment%20(Ref:%20${bookingRef})%20for%20${selectedService.name}%20on%20${selectedDate}%20at%20${selectedTime}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-medium text-xs shadow hover:brightness-105 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Details via WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1E1B18] text-white font-medium text-xs shadow hover:bg-black"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
