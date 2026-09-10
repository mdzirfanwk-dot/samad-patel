import React from "react";
import { Destinations } from "../components/Destinations";
import { MapPin } from "lucide-react";
import { FinalCTA } from "../components/FinalCTA";

interface DestinationsPageProps {
  onNavigate: (path: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8FAF8] text-slate-900 min-h-screen">
      <div className="bg-gradient-to-b from-[#0A3324] to-[#0D4431] text-white py-12 md:py-16 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Website Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-emerald-200/80 mb-5 font-medium">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              className="hover:text-[#D4A853] transition-colors"
            >
              Home
            </a>
            <span className="text-white/40">/</span>
            <span className="text-[#D4A853] font-bold">Destinations Guide</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Guides</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Popular Destinations in the Sahyadri Range
          </h1>
          <p className="mt-3 text-base text-emerald-100/90 max-w-2xl leading-relaxed">
            Detailed guides to Mahabaleshwar viewpoints, Panchgani tablelands, the historic Pratapgad fort, and serene Tapola lakeside retreats.
          </p>
        </div>
      </div>

      <Destinations />
      <FinalCTA />
    </div>
  );
};
