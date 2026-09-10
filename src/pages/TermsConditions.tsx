import React from "react";
import { FileText } from "lucide-react";
import { businessConfig } from "../data/businessConfig";

interface TermsConditionsProps {
  onNavigate: (path: string) => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Website Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#071C14]/70 mb-6">
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
          <span className="text-[#071C14]/40">/</span>
          <span className="text-[#071C14] font-semibold">Terms &amp; Conditions</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#12372A]/10 shadow-sm space-y-6 text-[#1C1C1C]">
          <div className="flex items-center gap-3 pb-4 border-b border-[#12372A]/10">
            <div className="w-10 h-10 rounded-xl bg-[#12372A] text-[#D4A853] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#071C14]">
                Terms &amp; Conditions
              </h1>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {businessConfig.name} • Effective 2026
              </p>
            </div>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-[#1C1C1C]/80">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                1. Booking &amp; Pricing Confirmation
              </h2>
              <p>
                All website forms and enquiries generate direct quotation requests via WhatsApp or telephone. A booking is only confirmed once dates, pickup time, vehicle model, and agreed price are explicitly verified and confirmed with our dispatch desk. Final pricing and availability are confirmed directly with {businessConfig.name}.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                2. Vehicle Availability &amp; Substitution
              </h2>
              <p>
                Vehicle categories (sedan, SUV, tempo traveller) are subject to actual availability at the time of confirmed booking. While we endeavor to provide the exact category requested, in rare cases of mechanical maintenance or scheduling demands, an equivalent or upgraded category will be provided with advance notification.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                3. Pickup Timing &amp; Sightseeing Schedules
              </h2>
              <p>
                Sightseeing tours operate according to agreed itinerary timings. Travellers are requested to be ready at the designated hotel lobby or pickup spot. Delays exceeding reasonable waiting periods may necessitate adjustments to remaining sightseeing stops to maintain daylight safety on mountain roads.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                4. Weather, Ghat Roads &amp; Force Majeure
              </h2>
              <p>
                Mountain travel in the Western Ghats is subject to seasonal weather (such as heavy monsoon fog, landslides, or road closures by local authorities). In events where certain viewpoints (e.g. Arthur’s Seat, Pratapgad pass) are closed for public safety, alternate accessible destinations will be suggested. {businessConfig.name} is not liable for weather-induced disruptions beyond reasonable control.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                5. Cancellations &amp; Rescheduling
              </h2>
              <p>
                If you need to adjust your trip timing or cancel, please inform us as early as possible via phone or WhatsApp (+91 89990 61316) so we may reallocate vehicle schedules without penalty.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                6. Customer Responsibility
              </h2>
              <p>
                Passengers are responsible for their personal belongings, luggage, and ensuring compliance with local sanctuary, fort, and municipal guidelines across Mahabaleshwar and Panchgani.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
