import React from "react";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";
import { BusinessInfoCard } from "./BusinessInfoCard";
import { FadeIn } from "./FadeIn";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Brand Narrative */}
          <FadeIn className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <span>Local Roots &amp; Service</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Your Mahabaleshwar Travel Partner
            </h2>

            <div className="space-y-4 text-base text-slate-700 leading-relaxed font-normal">
              <p>
                Mahabaleshwar wala Tours and Travel is a local travel business based in Mahabaleshwar, Maharashtra, helping travellers plan convenient journeys around the region. Whether you’re exploring Mahabaleshwar, visiting Panchgani, heading towards Pratapgad or planning a customised trip, the goal is to make booking simple and travel comfortable.
              </p>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Verified Physical Location
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Located opposite Brightland Resort, Nakinda, Mahabaleshwar, Maharashtra 412806, India.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-slate-900 border border-slate-300 font-bold text-xs py-3 px-5 rounded-xl transition-colors active:scale-95"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>Call {businessConfig.phone}</span>
              </a>
            </div>
          </FadeIn>

          {/* Right Column: Business Info Card & Location Highlight */}
          <FadeIn delay={0.15} className="lg:col-span-5 space-y-6">
            <BusinessInfoCard theme="dark" />

            <div className="bg-emerald-900 rounded-2xl p-5 text-white flex items-center justify-between gap-4 border border-[#D4A853]/30 shadow-md">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#25D366] shrink-0" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#D4A853]">
                    Google Business Listing Status
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    Open 24 Hours
                  </div>
                </div>
              </div>
              <span className="text-[11px] bg-emerald-950 text-emerald-200 px-2.5 py-1 rounded-md border border-emerald-700/50">
                Active
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
