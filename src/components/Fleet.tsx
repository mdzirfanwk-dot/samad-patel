import React from "react";
import { Users, Info, MessageCircle, ArrowRight } from "lucide-react";
import { fleetCategories, VehicleCategory } from "../data/fleet";
import { buildVehicleEnquiryUrl } from "../utils/whatsapp";
import { Image } from "./Image";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

export const Fleet: React.FC = () => {
  const handleAskVehicles = (category: VehicleCategory) => {
    const url = buildVehicleEnquiryUrl(category.category);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <span>Comfortable Rides</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Choose Your Travel Comfort
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Whether you are travelling as a couple or with extended family, choose the vehicle size that suits your journey.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
            <Info className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Vehicle options available on request. Exact models confirmed upon enquiry.</span>
          </div>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleetCategories.map((v) => (
            <FadeInItem
              key={v.id}
              id={v.id}
              className="scroll-mt-28 group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <Image
                  src={v.image}
                  alt={v.category}
                  containerClassName="w-full h-full absolute inset-0"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

                <div className="absolute top-3 right-3 bg-emerald-950/90 backdrop-blur-md text-[#D4A853] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border border-[#D4A853]/40 z-20">
                  {v.status}
                </div>

                <div className="absolute bottom-3 left-4 right-4 z-20">
                  <span className="text-xs text-[#D4A853] font-bold tracking-wider uppercase block">
                    {v.tagline}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {v.category}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {v.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                    <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{v.idealFor}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleAskVehicles(v)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Ask for Vehicle Options</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
};
