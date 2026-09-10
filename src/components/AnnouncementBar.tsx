import React from "react";
import { Phone, MessageCircle, Clock } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-[#0A3324] text-emerald-50 text-xs py-2 px-4 border-b border-emerald-800/40 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <Clock className="w-3.5 h-3.5 text-[#D4A853]" />
          <span>Official Website • 24/7 Mahabaleshwar Taxi &amp; Sightseeing</span>
          <span className="hidden md:inline text-white/40">•</span>
          <span className="hidden md:inline text-white/80">Opp. Brightland Resort, Nakinda</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="flex items-center gap-1.5 text-white/90 hover:text-[#D4A853] transition-colors"
            title={`Call ${businessConfig.phone}`}
          >
            <Phone className="w-3 h-3 text-[#D4A853]" />
            <span>{businessConfig.phone}</span>
          </a>
          <span className="text-white/30">|</span>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:text-[#25D366]/80 font-medium transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
