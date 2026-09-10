import React, { useState, useEffect } from "react";
import { Star, Phone, MessageCircle, ShieldCheck, Camera } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";
import { BookingWidget } from "./BookingWidget";
import { Image } from "./Image";

const HERO_BACKGROUNDS = [
  {
    id: "kates",
    name: "Kate's Point",
    url: "/images/gallery/kates-point.jpg",
    caption: "Krishna Valley Panorama",
    alt: "Breathtaking panoramic view from Kate's Point overlooking Krishna valley in Mahabaleshwar"
  },
  {
    id: "wilson",
    name: "Wilson Point",
    url: "/images/gallery/wilson-point-clouds.jpg",
    caption: "Sea of Clouds Sunrise",
    alt: "Wilson Point sunrise view overlooking sea of clouds in Mahabaleshwar"
  },
  {
    id: "arthur",
    name: "Arthur's Seat",
    url: "/images/gallery/arthurs-seat.jpg",
    caption: "Savitri Valley Canyon",
    alt: "Arthur's Seat Queen of Points overlooking deep canyon in Mahabaleshwar"
  },
  {
    id: "lingmala",
    name: "Lingmala Falls",
    url: "/images/gallery/lingmala-waterfall.jpg",
    caption: "Cascading Greenery",
    alt: "Lingmala Waterfalls cascading down lush Western Ghats cliffs in Mahabaleshwar"
  },
  {
    id: "sunset",
    name: "Table Land",
    url: "/images/gallery/sunset-dhom-lake.jpg",
    caption: "Golden Sunset Horizon",
    alt: "Golden sunset over Panchgani Table Land and Dhom Lake"
  }
];

export const Hero: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Optional subtle auto-cycle every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const activeBg = HERO_BACKGROUNDS[currentBgIndex];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0A3324]">
      {/* Background Image with High-Clarity Scenic Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000">
        <Image
          key={activeBg.id}
          src={activeBg.url}
          alt={activeBg.alt}
          priority={true}
          containerClassName="w-full h-full absolute inset-0"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000"
        />
        {/* Fresh, High-Clarity Atmospheric Gradients: scenery remains vivid, text stays 100% crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A3324] via-[#0A3324]/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A3324]/90 via-[#0A3324]/40 to-transparent" />
      </div>

      {/* Scenic Background View Selector Pill */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 w-full flex justify-start sm:justify-end overflow-x-auto scrollbar-none">
        <div className="inline-flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-[11px] text-white/90 shadow-lg shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 pl-2.5 pr-1 text-[#D4A853] font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Scenic View:</span>
          </span>
          {HERO_BACKGROUNDS.map((bg, idx) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => setCurrentBgIndex(idx)}
              className={`px-3 py-1.5 sm:py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer shrink-0 min-h-[32px] flex items-center active:scale-95 ${
                currentBgIndex === idx
                  ? "bg-[#D4A853] text-[#071C14] font-bold shadow-md"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
              title={bg.caption}
            >
              {bg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-5 text-left">
          {/* Small Top Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#D4A853]/40 text-[#D4A853] text-[11px] sm:text-xs tracking-[0.2em] font-semibold uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853]" />
            MAHABALESHWAR • PANCHGANI • WESTERN GHATS
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-sm">
            Explore Mahabaleshwar. <br />
            <span className="text-[#D4A853] italic font-normal">Travel Your Way.</span>
          </h1>

          {/* Supporting Line */}
          <p className="text-base sm:text-lg md:text-xl text-emerald-50/95 leading-relaxed font-normal max-w-2xl drop-shadow-xs">
            {businessConfig.supportingLine}
          </p>

          {/* Social Proof Strip (Strictly Verified Only) */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/85 backdrop-blur-md border border-[#D4A853]/35 text-xs text-white shadow-sm">
              <div className="flex text-[#D4A853]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
                ))}
              </div>
              <span className="font-bold text-[#D4A853]">5.0</span>
              <span className="text-white/40">•</span>
              <span className="text-white/90 font-medium">13 Google Reviews</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-white/90 bg-emerald-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Verified Local Business</span>
            </div>
          </div>

          {/* Primary & Secondary Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#071C14]" />
              <span>Book on WhatsApp</span>
            </a>

            <a
              href={`tel:${businessConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-950/80 hover:bg-emerald-950 text-white border border-[#D4A853]/40 hover:border-[#D4A853] font-medium text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4A853]" />
              <span>Call {businessConfig.phone}</span>
            </a>
          </div>
        </div>

        {/* Floating Hero Booking Card */}
        <div className="mt-8 md:mt-12 w-full">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};

