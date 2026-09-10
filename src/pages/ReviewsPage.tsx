import React from "react";
import { Reviews } from "../components/Reviews";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Star } from "lucide-react";
import { FinalCTA } from "../components/FinalCTA";

interface ReviewsPageProps {
  onNavigate: (path: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen text-slate-900">
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
            <span className="text-[#D4A853] font-bold">Customer Reviews</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
            <span>Traveller Ratings</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Verified Customer Ratings &amp; Trust
          </h1>
          <p className="mt-3 text-base text-emerald-100/90 max-w-2xl leading-relaxed">
            Rated 5.0 out of 5 across 13 Google Reviews. Honest, dependable mountain transport for families and tourists.
          </p>
        </div>
      </div>

      <Reviews />
      <WhyChooseUs />
      <FinalCTA />
    </div>
  );
};
