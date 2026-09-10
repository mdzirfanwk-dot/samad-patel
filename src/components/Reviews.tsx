import React from "react";
import { Star, ShieldCheck, ExternalLink, CheckCircle2 } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { FadeIn } from "./FadeIn";

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
            <span>Verified Customer Feedback</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Loved by Our Travellers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Honest service and reliable mountain travel reflected through verified customer ratings on Google.
          </p>
        </FadeIn>

        {/* Rating Display Card */}
        <FadeIn delay={0.15} className="max-w-2xl mx-auto bg-gradient-to-b from-[#F8FAF8] to-[#EEF5F1] border border-emerald-900/15 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6">
          {/* Big Stars */}
          <div className="flex items-center justify-center gap-2 text-[#D4A853]">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} className="w-7 h-7 sm:w-9 sm:h-9 fill-[#D4A853] text-[#D4A853]" />
            ))}
          </div>

          <div>
            <div className="font-serif text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
              {businessConfig.googleRating.toFixed(1)}
              <span className="text-2xl sm:text-3xl text-emerald-800 font-normal"> / 5.0</span>
            </div>
            <div className="text-sm uppercase tracking-widest text-emerald-900 font-bold mt-1">
              Google Rating
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Based on {businessConfig.googleReviewCount} Google Reviews
            </div>
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700 font-medium shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#25D366]" />
            <span>Verified Google Business Listing • Car leasing service category</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Independent Ratings</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified 5-Star Average</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unbiased Traveler Scores</span>
            </div>
          </div>

          {/* Action to view Google reviews */}
          <div className="pt-2">
            <a
              href={businessConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs uppercase tracking-wider py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <span>View Google Reviews</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
