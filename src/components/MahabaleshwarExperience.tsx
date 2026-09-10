import React from "react";
import { MessageCircle, Mountain, Compass } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";
import { Image } from "./Image";
import { FadeIn } from "./FadeIn";

export const MahabaleshwarExperience: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#071C14] text-white">
      {/* Immersive Scenic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/arthurs-seat.jpg"
          alt="Iconic Arthur's Seat cliff view overlooking Savitri river valley in Mahabaleshwar"
          containerClassName="w-full h-full absolute inset-0"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071C14] via-[#071C14]/85 to-[#071C14]/75 z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12372A]/80 border border-[#D4A853]/30 text-[#D4A853] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Mountain className="w-3.5 h-3.5" />
            <span>Sahyadri Mountain Heritage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            The Hills Are Calling
          </h2>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
            Mist-covered valleys. Winding mountain roads. Strawberry farms. Historic forts. Sunset viewpoints. Quiet lakeside escapes.
          </p>

          <p className="text-sm sm:text-base text-[#D4A853] font-serif italic">
            Mahabaleshwar is more than a destination — it is a journey through the Western Ghats.
          </p>

          <div className="pt-2">
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-[#071C14]" />
              <span>Plan My Mahabaleshwar Trip</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
