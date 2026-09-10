import React, { useState, useId } from "react";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildWhatsAppUrl, buildGeneralWhatsAppUrl } from "../utils/whatsapp";
import { logBookingEnquiry } from "../utils/destinationsManager";
import { FadeIn } from "./FadeIn";

export const Contact: React.FC = () => {
  const cid = useId();
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    destination: "Mahabaleshwar Sightseeing",
    date: "",
    passengers: "2",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    logBookingEnquiry({
      customerName: formData.name || "Website Visitor",
      pickup: formData.pickup || "Mahabaleshwar / Hotel",
      destination: formData.destination,
      travelDate: formData.date || "To be confirmed",
      passengers: formData.passengers,
      vehicleCategory: "Standard / SUV",
      tripType: "Custom Enquiry",
      notes: formData.notes
    });

    const message = `Hello Mahabaleshwar Wala Tours & Travel,
I would like to enquire about a trip.
Name: ${formData.name || "Traveller"}
Pickup: ${formData.pickup || "Mahabaleshwar / Hotel"}
Destination: ${formData.destination}
Travel Date: ${formData.date || "To be confirmed"}
Passengers: ${formData.passengers}
${formData.notes ? `Special Notes: ${formData.notes}\n` : ""}Please share vehicle options and the best available price.
Thank you.`;

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Verified Business Info */}
          <FadeIn className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Direct Local Contact</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Let’s Plan Your Journey
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Connect with our local desk anytime. We assist with itinerary planning, vehicle recommendations, and local travel tips.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-900 text-[#D4A853] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Phone Call
                    </span>
                    <a
                      href={`tel:${businessConfig.phoneRaw}`}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors"
                    >
                      {businessConfig.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={`tel:${businessConfig.phoneRaw}`}
                  className="bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold py-2 px-4 rounded-xl transition-colors shrink-0"
                >
                  Call Now
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      WhatsApp Chat
                    </span>
                    <div className="text-sm font-bold text-slate-900">
                      Chat with us on WhatsApp
                    </div>
                  </div>
                </div>

                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20b859] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm transition-all shrink-0"
                >
                  WhatsApp Us
                </a>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                  <MapPin className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Verified Address
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 mt-0.5 leading-relaxed">
                    {businessConfig.address}
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 border border-emerald-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Operating Hours
                  </span>
                  <div className="text-sm font-bold text-[#25D366] flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>{businessConfig.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Quick Travel Enquiry Card */}
          <FadeIn delay={0.15} className="lg:col-span-7">
            <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-[#F8FAF8] rounded-3xl border border-[#D4A853]/40 p-7 sm:p-10 shadow-2xl space-y-6">
              <div className="space-y-1 pb-4 border-b border-emerald-800/60">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4A853]">
                  <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                  <span>Direct Quote via WhatsApp</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Send a Travel Request
                </h3>
                <p className="text-xs text-emerald-100/80">
                  Fill in your details below and hit send to generate an instant WhatsApp message with our team.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`${cid}-name`} className="block text-xs uppercase tracking-wider font-bold text-[#D4A853] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id={`${cid}-name`}
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853]"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${cid}-pickup`} className="block text-xs uppercase tracking-wider font-bold text-[#D4A853] mb-1.5">
                      Pickup Location
                    </label>
                    <input
                      id={`${cid}-pickup`}
                      type="text"
                      placeholder="e.g. Resort / Hotel in Mahabaleshwar"
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853]"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${cid}-dest`} className="block text-xs uppercase tracking-wider font-bold text-[#D4A853] mb-1.5">
                      Destination / Tour Circuit
                    </label>
                    <select
                      id={`${cid}-dest`}
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] cursor-pointer"
                    >
                      <option value="Garden Ice Cream Restaurant (Lingmala)" className="bg-emerald-950 text-white">🍓 Garden Ice Cream Restaurant (Lingmala)</option>
                      <option value="Mahabaleshwar Sightseeing" className="bg-emerald-950 text-white">Mahabaleshwar Sightseeing</option>
                      <option value="Panchgani Day Tour" className="bg-emerald-950 text-white">Panchgani Day Tour</option>
                      <option value="Pratapgad Fort Trip" className="bg-emerald-950 text-white">Pratapgad Fort Trip</option>
                      <option value="Tapola Lakeside Excursion" className="bg-emerald-950 text-white">Tapola Lakeside Excursion</option>
                      <option value="Airport Transfer (Pune/Mumbai)" className="bg-emerald-950 text-white">Airport Transfer (Pune/Mumbai)</option>
                      <option value="Outstation Journey" className="bg-emerald-950 text-white">Outstation Journey</option>
                      <option value="Custom Multi-day Tour" className="bg-emerald-950 text-white">Custom Multi-day Tour</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${cid}-date`} className="block text-xs uppercase tracking-wider font-bold text-[#D4A853] mb-1.5">
                      Travel Date
                    </label>
                    <input
                      id={`${cid}-date`}
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3.5 py-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] cursor-pointer"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#D4A853] mb-1.5">
                      Number of Passengers
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {["1-2", "3-4", "5", "6", "7", "8+"].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setFormData({ ...formData, passengers: cnt })}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            formData.passengers === cnt
                              ? "bg-[#D4A853] text-[#071C14] border-[#D4A853] shadow-sm"
                              : "bg-emerald-950/70 text-emerald-100/90 border-emerald-800/80 hover:border-emerald-500/50"
                          }`}
                        >
                          {cnt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor={`${cid}-notes`} className="block text-xs uppercase tracking-wider font-bold text-[#D4A853] mb-1.5">
                      Additional Requirements / Hotel Name
                    </label>
                    <textarea
                      id={`${cid}-notes`}
                      rows={2}
                      placeholder="Any specific viewpoints or questions you'd like to ask..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4A853]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20b859] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
