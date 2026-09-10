import React from "react";
import { Star, MessageSquare, Clock, MapPin } from "lucide-react";
import { FadeInStagger, FadeInItem } from "./FadeIn";

export const TrustBar: React.FC = () => {
  const trustMetrics = [
    {
      icon: Star,
      value: "5.0",
      label: "Google Rating",
      sublabel: "Verified ★★★★★ score",
      iconColor: "text-[#D4A853]"
    },
    {
      icon: MessageSquare,
      value: "13",
      label: "Google Reviews",
      sublabel: "Independent traveller feedback",
      iconColor: "text-[#D4A853]"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Travel Assistance",
      sublabel: "Google-listed round-the-clock",
      iconColor: "text-[#25D366]"
    },
    {
      icon: MapPin,
      value: "Local",
      label: "Mahabaleshwar Travel",
      sublabel: "Opposite Brightland, Nakinda",
      iconColor: "text-[#D4A853]"
    }
  ];

  return (
    <div className="bg-white border-y border-emerald-900/10 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 sm:divide-x divide-emerald-100">
          {trustMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeInItem
                key={idx}
                className={`flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-0 rounded-xl bg-emerald-50/50 sm:bg-transparent border border-emerald-100/60 sm:border-0 ${
                  idx > 0 ? "sm:pl-6" : ""
                }`}
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-900 text-[#D4A853] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A853]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-lg sm:text-2xl font-bold text-slate-900">
                      {item.value}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-wide truncate">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 hidden sm:block truncate font-medium">
                    {item.sublabel}
                  </div>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </div>
  );
};
