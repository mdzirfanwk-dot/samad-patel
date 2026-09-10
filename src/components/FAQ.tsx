import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { faqsData } from "../data/faqs";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";
import { FadeIn } from "./FadeIn";

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("how-to-book");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#0A3324] text-[#F8FAF8] border-t border-emerald-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Clear, honest information to help you plan your journey in Mahabaleshwar and surrounding destinations.
          </p>
        </FadeIn>

        {/* Accordion list */}
        <FadeIn delay={0.1} className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#0D4431] border-[#D4A853]/60 shadow-lg"
                    : "bg-[#0D4431]/60 border-emerald-800/80 hover:border-emerald-600/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#D4A853] text-[#071C14] rotate-180 font-bold"
                        : "bg-emerald-900 text-emerald-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-emerald-50 leading-relaxed border-t border-emerald-800/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </FadeIn>

        {/* Bottom Helper Bar */}
        <FadeIn delay={0.2} className="mt-10 p-6 rounded-2xl bg-emerald-900/80 border border-[#D4A853]/40 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-serif text-lg font-bold text-white">
              Have another question about your trip?
            </div>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Speak directly with local travel experts in Mahabaleshwar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${businessConfig.phoneRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950 border border-[#D4A853]/40 hover:border-[#D4A853] text-xs font-bold text-white transition-colors active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>Call Us</span>
            </a>

            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20b859] text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
