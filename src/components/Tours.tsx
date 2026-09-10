import React, { useState } from "react";
import { Clock, Tag, CheckCircle2, MessageCircle, ArrowRight, X, Sparkles, MapPin } from "lucide-react";
import { toursData, TourPackage } from "../data/tours";
import { buildTourEnquiryUrl } from "../utils/whatsapp";
import { Image } from "./Image";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

export const Tours: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  const handleEnquire = (tour: TourPackage) => {
    const url = buildTourEnquiryUrl(tour.name);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="tours" className="py-16 sm:py-24 bg-gradient-to-b from-[#F3F8F5] via-[#EBF5EF] to-[#F8FAF8] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Curated Sightseeing</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Popular Tour Packages
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Experience the best of the Sahyadri hills with our suggested tour circuits. All itineraries are fully customizable.
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="text-xs text-emerald-800 font-bold block">
              *Transparent Pricing on Request
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
              No hidden driver charges or advance booking fees
            </span>
          </div>
        </FadeIn>

        {/* Tour Package Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toursData.map((tour) => {
            const aliasMap: Record<string, string> = {
              "mahabaleshwar-classic": "mahabaleshwar-darshan",
              "panchgani-escape": "panchgani-tour",
              "pratapgad-fort-experience": "pratapgad-fort",
              "tapola-lakeside-tour": "tapola-lake"
            };
            const alias = aliasMap[tour.id];

            return (
              <FadeInItem
                key={tour.id}
                id={tour.id}
                className="scroll-mt-28 relative bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-600/40 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {alias && <span id={alias} className="absolute -top-28" aria-hidden="true" />}
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    containerClassName="w-full h-full absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-emerald-950/90 backdrop-blur-md text-[#D4A853] text-xs font-bold rounded-lg border border-[#D4A853]/40 shadow-md">
                      {tour.tag}
                    </span>
                  </div>

                  {/* Duration & Starting Price floating strip */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4A853]" />
                      <span>{tour.duration}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-emerald-950/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D4A853]/50 text-[#D4A853] font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{tour.priceDisplay}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold text-emerald-800 mb-1">
                    {tour.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Key Highlights:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tour.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedTour(tour)}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-300 hover:border-emerald-800 text-xs font-bold text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/50 transition-colors cursor-pointer"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEnquire(tour)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </FadeInItem>
          );
        })}
        </FadeInStagger>
      </div>

      {/* Itinerary Modal */}
      {selectedTour && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedTour(null)}
        >
          <div
            className="bg-white text-slate-900 border border-emerald-900/20 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-emerald-800 font-bold tracking-wider uppercase">
                  Suggested Itinerary
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {selectedTour.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Duration: {selectedTour.duration} • {selectedTour.priceDisplay}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTour(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTour.description}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-3">
                  Places Covered in this Circuit:
                </h4>
                <ol className="space-y-2.5 relative border-l-2 border-emerald-200 ml-2 pl-4">
                  {selectedTour.suggestedItinerary.map((stop, index) => (
                    <li key={index} className="relative">
                      <span className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-xs" />
                      <div className="text-sm font-semibold text-slate-800">{stop}</div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  All stops can be tailored to your hotel pickup location and family pace. Enquire on WhatsApp to confirm vehicle types and schedule.
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleEnquire(selectedTour);
                  setSelectedTour(null);
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white py-3 px-6 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire This Package on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
