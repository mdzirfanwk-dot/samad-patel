import React from "react";
import { Compass, Home, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8FAFC] min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-emerald-900/10 shadow-xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-950 text-[#D4A853] shadow-md mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4A853] block">
            404 • Destination Route Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Looks Like You Took a Detour
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The road or page you are looking for does not exist or has been relocated. Let’s get you back on the right scenic route.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <Home className="w-4 h-4 text-[#D4A853]" />
            <span>Return to Homepage</span>
          </button>

          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-xs hover:shadow-sm transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#D4A853]" />
            <span>Call Driver Desk</span>
          </a>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium block mb-3 uppercase tracking-wider">
            Popular Sightseeing Pages
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-emerald-900">
            {[
              { label: "Tour Packages", path: "/tours" },
              { label: "Destinations", path: "/destinations" },
              { label: "Photo Gallery", path: "/gallery" },
              { label: "Taxi Services", path: "/services" },
              { label: "Vehicle Fleet", path: "/fleet" },
              { label: "Contact & Location", path: "/contact" }
            ].map((route) => (
              <button
                key={route.path}
                type="button"
                onClick={() => onNavigate(route.path)}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{route.label}</span>
                <ArrowRight className="w-3 h-3 text-emerald-700" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
