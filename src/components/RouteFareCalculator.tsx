import React, { useState, useId, useMemo } from "react";
import { Navigation, MapPin, Car, Clock, ShieldCheck, ExternalLink, Star, MessageCircle, ArrowRight } from "lucide-react";
import {
  getDestinations,
  calculateTaxiRoute,
  logBookingEnquiry,
  getGoogleMapsPlaceUrl,
  getGoogleReviewsUrl
} from "../utils/destinationsManager";
import { buildWhatsAppUrl } from "../utils/whatsapp";

interface RouteFareCalculatorProps {
  initialDestinationId?: string;
  initialPickup?: string;
  className?: string;
  onBookSuccess?: () => void;
}

export const RouteFareCalculator: React.FC<RouteFareCalculatorProps> = ({
  initialDestinationId = "garden-ice-cream-restaurant",
  initialPickup = "Mahabaleshwar Market",
  className = "",
  onBookSuccess
}) => {
  const uid = useId();
  const destinations = useMemo(() => getDestinations().filter((d) => d.taxiDestination), []);

  const [pickup, setPickup] = useState(initialPickup);
  const [destinationId, setDestinationId] = useState(initialDestinationId);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [vehicleCategory, setVehicleCategory] = useState<"sedan" | "suv" | "tempo">("sedan");
  const [passengers, setPassengers] = useState("2");
  const [travelDate, setTravelDate] = useState("");
  const [isCalculated, setIsCalculated] = useState(true);

  // Calculate live route & fare
  const routeData = useMemo(() => {
    return calculateTaxiRoute({
      pickup: pickup.trim() || "Mahabaleshwar Market",
      destinationId,
      tripType,
      vehicleCategory
    });
  }, [pickup, destinationId, tripType, vehicleCategory]);

  const selectedDestination = routeData.destination;

  // Pre-configured pickup shortcuts
  const pickupShortcuts = [
    { label: "Market / ST Stand", value: "Mahabaleshwar Market" },
    { label: "Brightland / Nakinda", value: "Brightland Resort, Nakinda" },
    { label: "Venna Lake", value: "Venna Lake" },
    { label: "Panchgani", value: "Panchgani Market" },
    { label: "Pune Airport", value: "Pune Airport" }
  ];

  const handleBookTaxi = (e: React.FormEvent) => {
    e.preventDefault();

    // Log to admin booking register
    logBookingEnquiry({
      pickup: pickup.trim() || "Mahabaleshwar",
      destination: selectedDestination.name,
      travelDate: travelDate || "Flexible / Today",
      passengers,
      vehicleCategory: routeData.vehicleName,
      tripType: tripType === "round-trip" ? "Round Trip" : "One Way",
      estimatedFare: routeData.estimatedFare,
      distanceKm: routeData.distanceKm,
      notes: `Estimated Time: ${routeData.estimatedTime} • ${routeData.routeHighlights}`
    });

    // Build WhatsApp booking enquiry message
    const message = `Hello Mahabaleshwar Wala Tours & Travel,
I would like to book a taxi.
Pickup: ${pickup.trim() || "Mahabaleshwar"}
Destination: ${selectedDestination.name} (${selectedDestination.locality})
Trip Type: ${tripType === "round-trip" ? "Round Trip (with waiting)" : "One-Way Drop"}
Vehicle: ${routeData.vehicleName}
Passengers: ${passengers}
Travel Date: ${travelDate || "Today / Flexible"}
Calculated Distance: ${routeData.distanceKm} km
Estimated Fare: ₹${routeData.estimatedFare}
Please confirm availability and dispatch driver.
Thank you.`;

    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (onBookSuccess) {
      onBookSuccess();
    }
  };

  const googleMapsUrl = selectedDestination.googlePlaceId
    ? getGoogleMapsPlaceUrl(selectedDestination.googlePlaceId, selectedDestination.name)
    : selectedDestination.googleMapsUrl;

  const googleReviewsUrl = selectedDestination.googlePlaceId
    ? getGoogleReviewsUrl(selectedDestination.googlePlaceId)
    : selectedDestination.googleBusinessUrl;

  return (
    <div
      id="route-fare-calculator"
      className={`bg-[#064E3B] text-white rounded-3xl border border-emerald-500/30 shadow-2xl p-6 sm:p-8 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-emerald-700/60">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4A853]/50 text-[#D4A853] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5 text-[#D4A853]" />
            <span>Official Route &amp; Fare Estimator</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Taxi Fare to {selectedDestination.name}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
            Real mountain road distance, transparent tariffs, and verified Google destination coordinates.
          </p>
        </div>

        {selectedDestination.id === "garden-ice-cream-restaurant" && (
          <div className="bg-[#D4A853]/15 border border-[#D4A853]/40 rounded-2xl p-3 flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="text-2xl">🍓</div>
            <div className="text-left">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#D4A853] block">
                Food &amp; Dessert Stop
              </span>
              <span className="text-xs font-semibold text-white">
                Lingmala, Panchgani-M’war Rd
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Form Controls */}
      <form onSubmit={handleBookTaxi} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pickup Input */}
          <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
            <label htmlFor={`${uid}-pickup`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#D4A853] absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id={`${uid}-pickup`}
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Hotel / Resort / Market"
                className="w-full pl-10 pr-3 py-2.5 min-h-[44px] bg-[#022c22] border border-emerald-700/80 rounded-xl text-xs text-white placeholder-emerald-200/40 focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all"
              />
            </div>
            {/* Quick shortcuts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pickupShortcuts.map((sc) => (
                <button
                  key={sc.value}
                  type="button"
                  onClick={() => setPickup(sc.value)}
                  className={`text-[10px] px-2 py-1 rounded-md transition-all cursor-pointer ${
                    pickup === sc.value
                      ? "bg-[#D4A853] text-slate-900 font-bold"
                      : "bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800"
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor={`${uid}-dest`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Destination
            </label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-[#D4A853] absolute left-3.5 top-3.5 pointer-events-none" />
              <select
                id={`${uid}-dest`}
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 min-h-[44px] bg-[#022c22] border border-emerald-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all appearance-none cursor-pointer"
              >
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id} className="bg-[#064E3B] text-white">
                    {dest.name} ({dest.locality})
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[10px] text-emerald-200/70 truncate">
              {selectedDestination.address}
            </p>
          </div>

          {/* Trip Type */}
          <div className="space-y-1.5">
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Trip Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  tripType === "one-way"
                    ? "bg-[#D4A853] text-slate-900 border-[#D4A853] shadow-md"
                    : "bg-[#022c22] text-emerald-200 border-emerald-700/80 hover:bg-emerald-900"
                }`}
              >
                One-Way Drop
              </button>
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  tripType === "round-trip"
                    ? "bg-[#D4A853] text-slate-900 border-[#D4A853] shadow-md"
                    : "bg-[#022c22] text-emerald-200 border-emerald-700/80 hover:bg-emerald-900"
                }`}
              >
                Round Trip
              </button>
            </div>
            <p className="text-[10px] text-emerald-200/70">
              {tripType === "round-trip" ? "Includes waiting time & return" : "Direct point-to-point drop"}
            </p>
          </div>

          {/* Vehicle Category */}
          <div className="space-y-1.5">
            <label htmlFor={`${uid}-vehicle`} className="block text-[11px] uppercase tracking-wider font-semibold text-[#D4A853]">
              Vehicle Category
            </label>
            <div className="relative">
              <Car className="w-4 h-4 text-[#D4A853] absolute left-3.5 top-3.5 pointer-events-none" />
              <select
                id={`${uid}-vehicle`}
                value={vehicleCategory}
                onChange={(e) => setVehicleCategory(e.target.value as "sedan" | "suv" | "tempo")}
                className="w-full pl-10 pr-3 py-2.5 min-h-[44px] bg-[#022c22] border border-emerald-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-all appearance-none cursor-pointer"
              >
                <option value="sedan" className="bg-[#064E3B]">Sedan (Dzire/Etios • 4 Seats)</option>
                <option value="suv" className="bg-[#064E3B]">Prime SUV (Ertiga/Innova • 6-7 Seats)</option>
                <option value="tempo" className="bg-[#064E3B]">Tempo Traveller (12-17 Seats)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-[#022c22] rounded-2xl border border-emerald-500/40 p-5 md:p-6 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Distance & Travel Time */}
            <div className="space-y-2 md:border-r border-emerald-800/80 md:pr-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4A853] font-bold">
                <Clock className="w-4 h-4" />
                <span>Road Distance &amp; Time</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
                  {routeData.distanceKm}
                </span>
                <span className="text-emerald-300 text-sm font-semibold">km</span>
                <span className="text-white/40">|</span>
                <span className="text-sm font-semibold text-emerald-100">
                  {routeData.estimatedTime}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70">
                {routeData.routeHighlights}
              </p>
            </div>

            {/* Fare Breakdown */}
            <div className="space-y-2 md:border-r border-emerald-800/80 md:pr-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4A853] font-bold">
                <Car className="w-4 h-4" />
                <span>Estimated Taxi Tariff</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#D4A853]">
                  ₹{routeData.estimatedFare}
                </span>
                <span className="text-xs text-emerald-300 font-medium">
                  ({tripType === "round-trip" ? "Round Trip" : "One Way"})
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-100/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Transparent rate • Verified driver • Fuel included</span>
              </div>
            </div>

            {/* Destination Verification Badge */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block">
                Verified Google Place Destination
              </span>
              <div className="text-xs text-white font-semibold flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <span className="leading-snug">{selectedDestination.address}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 text-emerald-200 hover:bg-[#D4A853] hover:text-slate-900 font-bold text-[11px] transition-all"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 text-[#D4A853] hover:bg-emerald-800 font-semibold text-[11px] transition-all"
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>Google Reviews</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-emerald-200/80">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Taxi dispatched directly to your hotel or pickup spot</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Navigation className="w-4 h-4 text-[#D4A853]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b859] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Taxi on WhatsApp (₹{routeData.estimatedFare})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
