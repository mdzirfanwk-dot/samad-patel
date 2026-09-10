import React from "react";
import { Phone, MessageCircle, MapPin, Clock, Star, ShieldCheck } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Tours", path: "/tours" },
    { label: "Destinations", path: "/destinations" },
    { label: "Mahabaleshwar Gallery", path: "/gallery" },
    { label: "Services", path: "/services" },
    { label: "Fleet", path: "/fleet" },
    { label: "Reviews", path: "/reviews" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Admin Console", path: "/admin" }
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#0A3324] text-[#F8FAF8] border-t border-emerald-800/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/40">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-[#D4A853]/40 flex items-center justify-center shadow-inner">
                <svg
                  className="w-6 h-6 text-[#D4A853]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg tracking-wider text-white">
                  {businessConfig.brandName}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A853] font-semibold block">
                  {businessConfig.brandSubtitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed max-w-sm">
              {businessConfig.tagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-[#D4A853]/30 text-xs">
              <div className="flex text-[#D4A853]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#D4A853] text-[#D4A853]" />
                ))}
              </div>
              <span className="font-bold text-[#D4A853]">5.0</span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-100/70">13 Google Reviews</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#D4A853]">
              Navigation
            </div>
            <ul className="grid grid-cols-2 gap-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className="text-emerald-100/75 hover:text-[#D4A853] transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#D4A853]">
              Contact Details
            </div>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{businessConfig.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A853] shrink-0" />
                <a
                  href={`tel:${businessConfig.phoneRaw}`}
                  className="hover:text-[#D4A853] font-medium"
                >
                  {businessConfig.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="text-[#25D366] font-medium">
                  {businessConfig.availability}
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b859] text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-md transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="inline-flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-950 border border-[#D4A853]/40 text-[#D4A853] px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-100/50">
          <div>
            © 2026 Mahabaleshwar wala Tours and Travel. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className="hover:text-[#D4A853] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
