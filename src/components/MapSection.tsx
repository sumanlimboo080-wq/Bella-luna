import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';

export const MapSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);

  const apiKey =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const hasValidKey = Boolean(apiKey) && apiKey !== 'YOUR_API_KEY' && apiKey.length > 5;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SALON_INFO.address
  )}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SALON_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF2ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#F0E2D8] text-xs font-semibold uppercase tracking-widest text-[#C59B27]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Visit Our Sanctuary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2A2421]">
            Location, Hours & Directions
          </h2>
          <p className="text-[#6E625B] text-base font-light">
            Conveniently nestled in Austin's Riverside District with complimentary valet and guest parking.
          </p>
        </div>

        {/* Grid Layout: Location Details Left, Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Card Column */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#F0E2D8] shadow-sm flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              
              {/* Address Box */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Salon Location</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2A2421]">
                  482 Magnolia Avenue
                </h3>
                <p className="text-sm text-[#6E625B]">
                  Riverside District, Austin, TX 78701
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#1E1B18] text-[#F7E7CE] hover:bg-[#D4AF37] hover:text-white font-medium text-xs shadow transition-colors inline-flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={handleCopyAddress}
                    className="p-2 rounded-full border border-[#E5C8B4] text-[#2A2421] hover:bg-[#FAF2ED] text-xs transition-colors"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Hours Box */}
              <div className="pt-6 border-t border-[#F0E2D8] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>Business Hours</span>
                </div>
                <div className="space-y-2 text-xs">
                  {SALON_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-[#FAF2ED] text-[#2A2421]">
                      <span className="font-medium">{h.days}</span>
                      <span className="text-[#6E625B]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Direct */}
              <div className="pt-6 border-t border-[#F0E2D8] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Direct Inquiries</span>
                </div>
                <div className="space-y-2 text-xs">
                  <a href={`tel:${SALON_INFO.phone}`} className="flex items-center gap-2 text-[#2A2421] hover:text-[#C59B27] font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{SALON_INFO.phone}</span>
                  </a>
                  <a href={`mailto:${SALON_INFO.email}`} className="flex items-center gap-2 text-[#2A2421] hover:text-[#C59B27] font-medium">
                    <Mail className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>{SALON_INFO.email}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Parking Badge */}
            <div className="p-4 rounded-2xl bg-[#FAF2ED] border border-[#F0E2D8] text-xs text-[#6E625B]">
              <strong className="text-[#2A2421] font-medium block mb-0.5">Complimentary Guest Parking</strong>
              Valet service is available at the salon front entrance Friday through Sunday.
            </div>

          </div>

          {/* Interactive Map Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-[#F0E2D8] shadow-sm relative min-h-[420px] flex flex-col">
            {hasValidKey ? (
              <APIProvider apiKey={apiKey} version="weekly">
                <Map
                  defaultCenter={{ lat: SALON_INFO.lat, lng: SALON_INFO.lng }}
                  defaultZoom={15}
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%', minHeight: '420px' }}
                >
                  <AdvancedMarker
                    position={{ lat: SALON_INFO.lat, lng: SALON_INFO.lng }}
                    onClick={() => setInfoOpen(!infoOpen)}
                  >
                    <Pin background="#D4AF37" glyphColor="#1E1B18" borderColor="#ffffff" />
                  </AdvancedMarker>

                  {infoOpen && (
                    <InfoWindow
                      position={{ lat: SALON_INFO.lat, lng: SALON_INFO.lng }}
                      onCloseClick={() => setInfoOpen(false)}
                    >
                      <div className="p-2 space-y-1 text-center font-sans">
                        <span className="font-serif font-bold text-sm text-[#2A2421] block">Bella Luna Salon</span>
                        <p className="text-[11px] text-[#6E625B]">482 Magnolia Ave, Austin TX</p>
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[#C59B27] underline font-medium block pt-1"
                        >
                          Open in Google Maps ↗
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              /* High-Quality Interactive Custom Map Fallback Card */
              <div className="w-full h-full min-h-[420px] bg-[#1E1B18] text-white p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-xs font-semibold text-[#DFB15B]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Austin Location Preview</span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-white">
                    Bella Luna Salon
                  </h3>

                  <p className="text-neutral-300 text-sm max-w-md">
                    {SALON_INFO.address}
                  </p>
                </div>

                <div className="relative z-10 space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 my-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F7E7CE]">Status</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      Open Today until 8:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F7E7CE]">District</span>
                    <span className="text-white">Riverside Arts District</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F7E7CE]">Coordinates</span>
                    <span className="text-neutral-300 font-mono">30.2505° N, 97.7380° W</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-4">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB15B] to-[#C59B27] text-white font-medium text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open Interactive Google Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
