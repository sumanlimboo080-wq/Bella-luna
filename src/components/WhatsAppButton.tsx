import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Check } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickQuestions = [
    'Hi! Do you have any openings available today?',
    'I’d like to inquire about Balayage pricing and availability.',
    'Could you send me information on your Bridal & Special Events package?',
    'What is your cancellation or booking policy?',
  ];

  const handleLaunchWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Inquiry Popup Drawer */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-3xl p-5 shadow-2xl border border-[#F0E2D8] max-w-sm w-80 sm:w-96 space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E2D8]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-sm shadow">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#2A2421]">Bella Luna Salon</h4>
                <p className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                  <span>● Online</span> • Typically replies instantly
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#6E625B] hover:bg-[#FAF2ED]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Choice Buttons */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C59B27]">
              Select a quick inquiry:
            </p>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleLaunchWhatsApp(q)}
                className="w-full text-left p-2.5 rounded-xl bg-[#FAF2ED] hover:bg-[#F0E2D8] text-xs text-[#2A2421] transition-colors flex items-center justify-between group"
              >
                <span className="line-clamp-1">{q}</span>
                <Send className="w-3.5 h-3.5 text-[#25D366] group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
              </button>
            ))}
          </div>

          {/* Custom Message Input */}
          <div className="pt-2 border-t border-[#F0E2D8] space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or type custom message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customMsg.trim()) {
                    handleLaunchWhatsApp(customMsg);
                  }
                }}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E5C8B4] text-xs text-[#2A2421] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
              />
              <button
                onClick={() => {
                  if (customMsg.trim()) handleLaunchWhatsApp(customMsg);
                }}
                disabled={!customMsg.trim()}
                className="p-2 rounded-xl bg-[#25D366] text-white hover:brightness-105 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#6E625B] text-center">
              Direct line: {SALON_INFO.phone}
            </p>
          </div>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="whatsapp_floating_launcher"
        className="group flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current animate-bounce-slow" />
        <span className="text-xs font-semibold hidden sm:inline-block">WhatsApp Salon Chat</span>
      </button>

    </div>
  );
};
