import React from "react";
import { Star, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

interface BusinessInfoCardProps {
  className?: string;
  theme?: "dark" | "light";
}

export const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({
  className = "",
  theme = "dark"
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl p-6 border transition-all ${
        isDark
          ? "bg-[#071C14]/90 border-[#D4A853]/20 text-[#F7F5F0] shadow-xl backdrop-blur-md"
          : "bg-white border-[#12372A]/10 text-[#1C1C1C] shadow-lg"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D4A853] block mb-1">
            Verified Travel Business
          </span>
          <h3 className="font-serif text-lg md:text-xl font-bold tracking-tight">
            {businessConfig.name}
          </h3>
          <p className="text-xs text-muted-gray mt-0.5">{businessConfig.tagline}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-[#D4A853] font-bold text-sm">
            <div className="flex text-[#D4A853]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
              ))}
            </div>
            <span>5.0</span>
          </div>
          <span className="text-[11px] text-muted-gray mt-0.5">
            {businessConfig.googleReviewCount} Google Reviews
          </span>
        </div>
      </div>

      <div className="space-y-2.5 text-xs border-t border-b py-3.5 my-3 border-current/10">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
          <span className="leading-snug">{businessConfig.addressShort}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="w-4 h-4 text-[#D4A853] shrink-0" />
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="hover:text-[#D4A853] transition-colors font-medium"
          >
            {businessConfig.phone}
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-[#25D366] shrink-0" />
          <span className="text-[#25D366] font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            {businessConfig.availability}
          </span>
        </div>
      </div>

      <div className="pt-1 flex gap-2">
        <a
          href={buildGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white py-2.5 px-4 rounded-xl font-medium text-xs shadow-md hover:shadow-lg transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Us</span>
        </a>
        <a
          href={`tel:${businessConfig.phoneRaw}`}
          className={`inline-flex items-center justify-center p-2.5 rounded-xl border transition-colors ${
            isDark
              ? "border-[#D4A853]/40 text-[#D4A853] hover:bg-[#D4A853]/10"
              : "border-[#12372A]/20 text-[#12372A] hover:bg-[#12372A]/5"
          }`}
          title="Call Now"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
