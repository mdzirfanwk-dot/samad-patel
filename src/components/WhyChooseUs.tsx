import React from "react";
import { Compass, PhoneCall, CalendarRange, Clock, Star, MapPin, CheckCircle } from "lucide-react";
import { whyChooseUsData } from "../data/whyChooseUs";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  PhoneCall,
  CalendarRange,
  Clock,
  Star,
  MapPin
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#0A3324] via-[#0D4431] to-[#072419] text-white border-t border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verified Local Travel Partner</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Travel Mahabaleshwar With Confidence
          </h2>
          <p className="mt-3 text-base text-emerald-100/85 leading-relaxed">
            Authentic regional knowledge, direct coordination with local drivers, and clear communication from start to finish.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((item) => {
            const Icon = iconMap[item.iconName] || Star;

            return (
              <FadeInItem
                key={item.id}
                className="bg-emerald-950/60 backdrop-blur-md rounded-2xl border border-emerald-700/40 p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-[#D4A853]/60 transition-all duration-300 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4A853]/15 border border-[#D4A853]/40 flex items-center justify-center text-[#D4A853] shadow-inner">
                      <Icon className="w-6 h-6 text-[#D4A853]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#D4A853] uppercase tracking-wider bg-emerald-900/90 border border-[#D4A853]/30 px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-100/75 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
};
