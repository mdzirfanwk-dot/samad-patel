import React from "react";
import { Shield } from "lucide-react";
import { businessConfig } from "../data/businessConfig";

interface PrivacyPolicyProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
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
          <span className="text-[#071C14] font-semibold">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#12372A]/10 shadow-sm space-y-6 text-[#1C1C1C]">
          <div className="flex items-center gap-3 pb-4 border-b border-[#12372A]/10">
            <div className="w-10 h-10 rounded-xl bg-[#12372A] text-[#D4A853] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#071C14]">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#6B7280] mt-0.5">
                {businessConfig.name} • Effective 2026
              </p>
            </div>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-[#1C1C1C]/80">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                1. Overview &amp; Website Enquiries
              </h2>
              <p>
                This privacy policy describes how {businessConfig.name} handles information when you browse our website, make enquiries, or contact us. We prioritize your privacy and do not collect or store personal data unless explicitly submitted by you to coordinate your travel.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                2. Communication via WhatsApp &amp; Phone
              </h2>
              <p>
                When you initiate communication via WhatsApp or phone call (+91 89990 61316), the contact information and trip details you provide (such as pickup hotel, dates, passenger count) are used exclusively to answer your travel query, provide a quotation, and coordinate taxi service. We do not sell or rent your phone number or information to third-party marketing companies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                3. No Payment Card Storage
              </h2>
              <p>
                We do not collect or store credit card, debit card, or banking credentials on this website. Any fare arrangements or advance confirmations are handled directly between the traveller and the business owner in a transparent manner.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                4. Analytics &amp; Cookies
              </h2>
              <p>
                Our website may utilize standard, non-invasive server logs or basic web analytics to understand traffic patterns and optimize page loading performance. No sensitive personal profiles are built.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#071C14]">
                5. Contact &amp; Questions
              </h2>
              <p>
                If you have questions regarding this policy or wish to update any details regarding a travel booking, please reach out to us at {businessConfig.address} or call {businessConfig.phone}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
