import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

interface FloatingActionsProps {
  onOpenBooking?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <>
      {/* Desktop Floating Action Buttons (Pill badges at bottom right) */}
      <aside
        aria-label="Quick contact"
        className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          {/* Call Button */}
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="flex items-center gap-2.5 bg-[#12372A] hover:bg-[#071C14] text-white py-2.5 px-4 rounded-full border border-[#D4A853]/40 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group"
            title={`Call ${businessConfig.phone}`}
            aria-label="Call Mahabaleshwar wala Tours and Travel"
          >
            <div className="w-7 h-7 rounded-full bg-[#0B2118] flex items-center justify-center text-[#D4A853]">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left pr-1">
              <span className="text-[10px] text-[#D4A853] font-semibold uppercase tracking-wider block leading-none">
                Direct Desk
              </span>
              <span className="text-xs font-bold text-white leading-tight">
                {businessConfig.phone}
              </span>
            </div>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20b859] text-white py-2.5 px-4.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group"
            title="Chat with us on WhatsApp"
            aria-label="Chat on WhatsApp with Mahabaleshwar wala Tours and Travel"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="text-left pr-1">
              <span className="text-[10px] text-white/90 font-semibold uppercase tracking-wider block leading-none">
                Instant Reply
              </span>
              <span className="text-xs font-bold text-white leading-tight">
                WhatsApp Us
              </span>
            </div>
          </a>
        </div>
      </aside>

      {/* Mobile Sticky Action Bar (Ergonomic bottom dock for phones) */}
      <nav
        aria-label="Mobile quick actions"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071C14]/95 backdrop-blur-lg border-t border-[#D4A853]/30 px-3 pt-2.5 shadow-2xl pb-[max(0.65rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Call Taxi */}
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#12372A] border border-[#D4A853]/30 text-white active:scale-95 transition-all text-center min-h-[48px] shadow-sm"
            aria-label={`Call ${businessConfig.phone}`}
          >
            <Phone className="w-4 h-4 text-[#D4A853] mb-1" />
            <span className="text-[11px] font-bold text-white leading-none">Call Taxi</span>
          </a>

          {/* WhatsApp Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] active:bg-[#20b859] text-white active:scale-95 transition-all text-center min-h-[48px] shadow-md"
            aria-label="Chat with Mahabaleshwar Wala on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-white mb-1" />
            <span className="text-[11px] font-bold text-white leading-none">WhatsApp</span>
          </a>

          {/* Plan Trip Modal */}
          <button
            type="button"
            onClick={() => onOpenBooking && onOpenBooking()}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#D4A853] active:bg-[#C29541] text-[#071C14] font-bold active:scale-95 transition-all text-center min-h-[48px] shadow-md cursor-pointer"
            aria-label="Open Trip Booking Widget"
          >
            <Calendar className="w-4 h-4 text-[#071C14] mb-1" />
            <span className="text-[11px] font-bold text-[#071C14] leading-none">Plan Trip</span>
          </button>
        </div>
      </nav>
    </>
  );
};
