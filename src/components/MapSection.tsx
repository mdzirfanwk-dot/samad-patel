import React from "react";
import { MapPin, Navigation, ExternalLink, ShieldCheck } from "lucide-react";
import { businessConfig } from "../data/businessConfig";

export const MapSection: React.FC = () => {
  // Configurable Google Maps search / location URL
  const mapSearchUrl = businessConfig.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(businessConfig.address)}`;
  
  // Clean embed query for Nakinda, Mahabaleshwar opposite Brightland Resort
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent("Brightland Resort, Nakinda, Mahabaleshwar, Maharashtra 412806")}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-16 bg-[#0A3324] text-[#F8FAF8] border-t border-emerald-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>Physical Location</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Find Us in Mahabaleshwar
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100/80">
              Conveniently located in Nakinda, directly opposite to Brightland Resort.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#071C14]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-800/80 shadow-2xl bg-emerald-950 h-[380px] sm:h-[450px]">
          <iframe
            title="Mahabaleshwar wala Tours and Travel Location"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />

          {/* Floating Address Overlay Card */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-[#0A3324]/95 backdrop-blur-md p-5 rounded-2xl border border-[#D4A853]/40 shadow-2xl text-white space-y-2">
            <div className="flex items-center gap-2 text-[#D4A853] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" />
              <span>{businessConfig.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-50 leading-snug">
              {businessConfig.address}
            </p>
            <div className="pt-2 flex items-center justify-between text-xs border-t border-emerald-800">
              <span className="text-[#25D366] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                {businessConfig.availability}
              </span>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A853] hover:underline font-semibold text-xs flex items-center gap-1"
              >
                Get Directions &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
