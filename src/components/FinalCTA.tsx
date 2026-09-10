import React from "react";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";
import { Image } from "./Image";

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-[#0A3324] via-[#0D4431] to-[#06261A] text-white">
      {/* Background with Mountain Horizon */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Image
          src="/images/gallery/sunset-dhom-lake.jpg"
          alt="Golden evening light over Mahabaleshwar and Dhom Lake hills"
          containerClassName="w-full h-full absolute inset-0"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3324] via-[#0D4431]/80 to-[#0A3324]/85 z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Local Travel Desk Open 24/7</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Ready to Explore Mahabaleshwar?
        </h2>

        <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
          Tell us where you want to go. We’ll help you plan the journey with comfort, punctuality, and local expertise.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b859] text-white font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#071C14]" />
            <span>Call Now ({businessConfig.phone})</span>
          </a>
        </div>

        <div className="pt-2 text-xs text-emerald-200/70 font-medium">
          <span>Google Rating ★★★★★ 5.0 • 13 Reviews • Open 24 Hours</span>
        </div>
      </div>
    </section>
  );
};
