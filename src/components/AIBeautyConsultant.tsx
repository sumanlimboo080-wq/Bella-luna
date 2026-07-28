import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, MessageSquare, X, Send, Bot, CheckCircle2, Calendar } from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';

interface AIBeautyConsultantProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const AIBeautyConsultant: React.FC<AIBeautyConsultantProps> = ({ onSelectServiceToBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setRecommendation(null);

    const apiKey =
      process.env.GEMINI_API_KEY ||
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      '';

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are Luna, the lead AI Beauty & Hair Consultant at Bella Luna Salon in Austin, TX.
          A guest is asking for recommendations based on their query: "${prompt}".
          
          Here are our primary services:
          ${SERVICES_DATA.map((s) => `- ${s.name} ($${s.price}): ${s.description}`).join('\n')}
          
          Provide a warm, glamorous, 3-4 sentence recommendation explaining which 1 or 2 specific services suit them best and why.`,
        });

        if (response.text) {
          setRecommendation(response.text);
        } else {
          setRecommendation(getFallbackRecommendation(prompt));
        }
      } catch (err) {
        console.error('Gemini error:', err);
        setRecommendation(getFallbackRecommendation(prompt));
      }
    } else {
      setRecommendation(getFallbackRecommendation(prompt));
    }

    setLoading(false);
  };

  const getFallbackRecommendation = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes('blonde') || lower.includes('color') || lower.includes('highlight') || lower.includes('balayage')) {
      return "For your hair coloring desires, our **Signature Dimensional Balayage** ($245) or **Full Platinum Blonde Transformation** ($320) with Isabella Luna is ideal. It incorporates Olaplex bond protection to keep your locks silky while delivering radiant dimension.";
    } else if (lower.includes('skin') || lower.includes('glow') || lower.includes('facial') || lower.includes('acne') || lower.includes('wedding')) {
      return "To achieve porcelain, glass-skin texture, we highly recommend our **24K Gold Velvet Facial & Glow** ($185) with Sophia Chen. It deeply hydrates with hyaluronic acid peptides and 24K gold foil for an immediate red-carpet radiance!";
    } else if (lower.includes('nail') || lower.includes('manicure') || lower.includes('pedicure')) {
      return "For long-lasting flawless nails, try our **Bella Deluxe Russian Gel Manicure** ($85) with Elena Rostova. It ensures 4+ weeks of chip-free elegance and precision cuticle care.";
    }
    return "Based on your needs, our **Couture Precision Haircut & Styling** ($95) paired with a **24K Gold Velvet Facial** ($185) offers the ultimate head-to-toe pampering experience at Bella Luna Salon!";
  };

  return (
    <>
      {/* Trigger Button floating on left or embedded in page */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="ai_beauty_consultant_launcher"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1E1B18] text-[#DFB15B] shadow-2xl hover:bg-black transition-all border border-[#D4AF37]/40 group"
        >
          <Sparkles className="w-5 h-5 text-[#DFB15B] animate-spin-slow" />
          <span className="text-xs font-serif font-bold text-white hidden sm:inline-block">Luna AI Stylist</span>
        </button>
      </div>

      {/* Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF2ED] flex items-center justify-center text-[#2A2421] hover:bg-[#F0E2D8]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1E1B18] text-[#DFB15B] flex items-center justify-center font-bold shadow">
                <Bot className="w-6 h-6 text-[#DFB15B]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C59B27] bg-[#FAF2ED] px-2.5 py-0.5 rounded-full">
                  AI Consultation Assistant
                </span>
                <h3 className="text-xl font-serif text-[#2A2421]">Meet Luna AI Beauty Stylist</h3>
              </div>
            </div>

            <form onSubmit={handleConsult} className="space-y-3">
              <label className="block text-xs text-[#6E625B]">
                Tell Luna about your hair type, skin goals, or upcoming event (e.g., "I have fine wavy hair and want low maintenance blonde balayage"):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Need a facial for glowing skin before my wedding..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5C8B4] text-xs text-[#2A2421] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-white font-medium text-xs shadow hover:brightness-105 disabled:opacity-50"
                >
                  {loading ? 'Consulting...' : 'Ask Luna'}
                </button>
              </div>
            </form>

            {/* Response Box */}
            {recommendation && (
              <div className="p-4 rounded-2xl bg-[#FAF2ED] border border-[#F0E2D8] space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C59B27]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Luna's Recommendation:</span>
                </div>
                <p className="text-xs text-[#2A2421] leading-relaxed font-sans">{recommendation}</p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onSelectServiceToBook(SERVICES_DATA[0].id);
                    }}
                    className="px-4 py-2 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Recommended Service</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
