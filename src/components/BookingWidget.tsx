import React, { useState, useEffect, useId, useMemo } from "react";
import { Calendar, MapPin, Users, Navigation, MessageCircle, Sparkles, ExternalLink, Calculator } from "lucide-react";
import { buildBookingEnquiryUrl } from "../utils/whatsapp";
import {
  getDestinations,
  calculateTaxiRoute,
  logBookingEnquiry,
  getGoogleMapsPlaceUrl
} from "../utils/destinationsManager";

interface BookingWidgetProps {
  className?: string;
  variant?: "floating" | "compact" | "contained";
  initialDestination?: string;
  initialTravelType?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  className = "",
  variant = "floating",
  initialDestination = "Garden Ice Cream Restaurant",
  initialTravelType = "Local Sightseeing"
}) => {
  const uid = useId();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState(initialDestination);
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [travelType, setTravelType] = useState(initialTravelType);
  const [showFarePreview, setShowFarePreview] = useState(true);

  const destinationsList = useMemo(() => getDestinations(), []);

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  // Match destination item
  const matchedDest = useMemo(() => {
    const dLower = destination.toLowerCase();
    return destinationsList.find(
      (d) =>
        d.name.toLowerCase().includes(dLower) ||
        dLower.includes(d.name.toLowerCase()) ||
        d.id.toLowerCase().includes(dLower)
    ) || destinationsList[0];
  }, [destination, destinationsList]);

  // Live route fare estimate
  const routeEstimate = useMemo(() => {
    return calculateTaxiRoute({
      pickup: pickup.trim() || "Mahabaleshwar Market",
      destinationId: matchedDest.id,
      tripType: travelType === "Round Trip" ? "round-trip" : "one-way",
      vehicleCategory: Number(passengers) > 4 ? "suv" : "sedan"
    });
  }, [pickup, matchedDest, travelType, passengers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log enquiry to Admin log
    logBookingEnquiry({
      pickup: pickup.trim() || "Mahabaleshwar / Hotel / Resort",
      destination,
      travelDate: travelDate || "Today / Flexible",
      passengers,
      vehicleCategory: routeEstimate.vehicleName,
      tripType: travelType,
      estimatedFare: routeEstimate.estimatedFare,
      distanceKm: routeEstimate.distanceKm,
      notes: `Estimated Time: ${routeEstimate.estimatedTime}`
    });

    const url = buildBookingEnquiryUrl({
      pickup: pickup.trim() || "Mahabaleshwar / Hotel / Resort",
      destination,
      travelDate: travelDate || "Today / Flexible",
      passengers,
      travelType,
      notes: `Distance: ~${routeEstimate.distanceKm} km (Est. ₹${routeEstimate.estimatedFare})`
    });

    // Mobile-safe link trigger
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const quickDestinations = [
    { label: "🍓 Garden Ice Cream Restaurant", value: "Garden Ice Cream Restaurant" },
    { label: "Mahabaleshwar Sightseeing", value: "Mahabaleshwar" },
    { label: "Panchgani Tour", value: "Panchgani" },
    { label: "Pratapgad Fort", value: "Pratapgad" },
    { label: "Tapola Lakeside", value: "Tapola" }
  ];

  return (
    <div
      className={`bg-[#0A3324]/95 backdrop-blur-xl text-white rounded-3xl border border-emerald-500/30 shadow-2xl p-5 md:p-6 transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-emerald-800/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#D4A853]/20 flex items-center justify-center text-[#D4A853]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-white">
              Plan Your Taxi Journey &amp; Food Stop
            </h3>
            <p className="text-xs text-[#D4A853]">
              Direct quote via WhatsApp • Instant route calculation • No hidden charges
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-emerald-100 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700/50 self-start sm:self-auto">
          Fast WhatsApp Dispatch
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Pickup Location */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-1">
            <label htmlFor={`${uid}-pickup`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#D4A853] absolute left-3 top-3 pointer-events-none" />
              <input
                id={`${uid}-pickup`}
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Hotel / Resort / Market"
                className="w-full pl-9 pr-3 py-2.5 min-h-[44px] bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs text-white placeholder-emerald-100/50 focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all"
              />
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-1">
            <label htmlFor={`${uid}-destination`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Destination
            </label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-[#D4A853] absolute left-3 top-3.5 pointer-events-none" />
              <select
                id={`${uid}-destination`}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 min-h-[44px] bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all appearance-none cursor-pointer"
              >
                <option value="Garden Ice Cream Restaurant" className="bg-[#0A3324]">
                  🍓 Garden Ice Cream Restaurant (Lingmala)
                </option>
                <option value="Mahabaleshwar" className="bg-[#0A3324]">Mahabaleshwar Sightseeing</option>
                <option value="Panchgani" className="bg-[#0A3324]">Panchgani Tour</option>
                <option value="Pratapgad" className="bg-[#0A3324]">Pratapgad Fort</option>
                <option value="Tapola" className="bg-[#0A3324]">Tapola Lakeside</option>
                <option value="Other / Custom" className="bg-[#0A3324]">Other / Custom Route</option>
              </select>
            </div>
          </div>

          {/* Travel Date */}
          <div className="space-y-1">
            <label htmlFor={`${uid}-date`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Travel Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#D4A853] absolute left-3 top-3.5 pointer-events-none" />
              <input
                id={`${uid}-date`}
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-9 pr-3 py-2.5 min-h-[44px] bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="space-y-1">
            <label htmlFor={`${uid}-passengers`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Passengers
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-[#D4A853] absolute left-3 top-3.5 pointer-events-none" />
              <select
                id={`${uid}-passengers`}
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 min-h-[44px] bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all appearance-none cursor-pointer"
              >
                <option value="1" className="bg-[#0A3324]">1 Person</option>
                <option value="2" className="bg-[#0A3324]">2 People (Couple)</option>
                <option value="3" className="bg-[#0A3324]">3 People</option>
                <option value="4" className="bg-[#0A3324]">4 People (Small Family)</option>
                <option value="5" className="bg-[#0A3324]">5 People</option>
                <option value="6" className="bg-[#0A3324]">6 People (Family/SUV)</option>
                <option value="7" className="bg-[#0A3324]">7 People</option>
                <option value="8+" className="bg-[#0A3324]">8+ (Group / Tempo)</option>
              </select>
            </div>
          </div>

          {/* Travel Type */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-1">
            <label htmlFor={`${uid}-type`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Travel Type
            </label>
            <select
              id={`${uid}-type`}
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full px-3 py-2.5 min-h-[44px] bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all appearance-none cursor-pointer"
            >
              <option value="Local Sightseeing" className="bg-[#0A3324]">Local Sightseeing</option>
              <option value="One Way" className="bg-[#0A3324]">One Way Transfer</option>
              <option value="Round Trip" className="bg-[#0A3324]">Round Trip</option>
              <option value="Airport Transfer" className="bg-[#0A3324]">Airport Transfer</option>
              <option value="Outstation" className="bg-[#0A3324]">Outstation Travel</option>
              <option value="Custom Tour" className="bg-[#0A3324]">Custom Tour</option>
            </select>
          </div>
        </div>

        {/* Quick destination shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mr-1">
            Quick Destinations:
          </span>
          {quickDestinations.map((qd) => (
            <button
              key={qd.value}
              type="button"
              onClick={() => setDestination(qd.value)}
              className={`text-[10px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                destination.includes(qd.value) || qd.value.includes(destination)
                  ? "bg-[#D4A853] text-slate-900 font-bold shadow-xs"
                  : "bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800"
              }`}
            >
              {qd.label}
            </button>
          ))}
        </div>

        {/* Dynamic Route & Fare Preview Strip */}
        {showFarePreview && (
          <div className="bg-emerald-950/90 border border-[#D4A853]/40 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#D4A853]/20 text-[#D4A853]">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                  Route Estimate ({routeEstimate.distanceKm} km • {routeEstimate.estimatedTime})
                </span>
                <span className="text-white font-semibold">
                  {matchedDest.name} from {pickup.trim() || "Mahabaleshwar Market"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-right">
                <span className="text-[10px] text-emerald-300 block">Est. Fare:</span>
                <span className="font-serif font-extrabold text-base text-[#D4A853]">
                  ₹{routeEstimate.estimatedFare}
                </span>
              </div>

              {matchedDest.googlePlaceId && (
                <a
                  href={getGoogleMapsPlaceUrl(matchedDest.googlePlaceId, matchedDest.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-900 text-emerald-200 hover:bg-[#D4A853] hover:text-slate-900 font-bold text-[10px] inline-flex items-center gap-1 transition-colors"
                  title="View on Google Maps"
                >
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-emerald-100/70 text-center sm:text-left">
            *Includes verified driver, mountain toll guidance &amp; door-to-door hotel pickup.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform active:scale-95 shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#071C14]" />
            <span>Book Taxi via WhatsApp (Est. ₹{routeEstimate.estimatedFare})</span>
          </button>
        </div>
      </form>
    </div>
  );
};
