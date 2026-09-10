import React from "react";
import { Compass, Mountain, Shield, Waves, Plane, Navigation, ArrowRight, MessageCircle } from "lucide-react";
import { servicesData, ServiceItem } from "../data/services";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { Image } from "./Image";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Mountain,
  Shield,
  Waves,
  Plane,
  Navigation
};

interface ServicesProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = () => {
  const handleServiceEnquire = (service: ServiceItem) => {
    const message = `Hello Mahabaleshwar wala Tours and Travel,
I would like to enquire about your "${service.title}" service.
Pickup Location: Mahabaleshwar / Hotel
Travel Date: To be confirmed
Please share current vehicle options and availability details.
Thank you.`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="max-w-2xl text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <span>Tailored Mountain Travel</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Travel Services Made Simple
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From local sightseeing to longer journeys, plan your travel around Mahabaleshwar with ease.
          </p>

          <div className="mt-3 inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-md">
            Services Available — Please Confirm Availability
          </div>
        </FadeIn>

        {/* 6 Services Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Compass;

            return (
              <FadeInItem
                key={service.id}
                id={service.id}
                className="scroll-mt-28 relative group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {service.id === "airport-transfers" && (
                  <span id="airport-drops" className="absolute -top-28" aria-hidden="true" />
                )}
                {/* Image & Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    containerClassName="w-full h-full absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 pointer-events-none" />
                  
                  {/* Badge */}
                  {service.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-950/90 backdrop-blur-sm text-[#D4A853] text-[10px] font-semibold uppercase tracking-wider rounded-md border border-[#D4A853]/40 z-20">
                      {service.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-[#D4A853] text-[#071C14] flex items-center justify-center shadow-md z-20">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                      Enquire for Availability
                    </span>

                    <button
                      type="button"
                      onClick={() => handleServiceEnquire(service)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-[#B45309] group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
};
