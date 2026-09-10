import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  MapPin,
  Sparkles,
  MessageCircle,
  X,
  Search,
  ExternalLink,
  Star,
  Navigation,
  Car,
  CheckCircle2
} from "lucide-react";
import { DestinationItem } from "../data/destinations";
import {
  getDestinations,
  searchDestinations,
  getGoogleMapsPlaceUrl,
  getGoogleReviewsUrl
} from "../utils/destinationsManager";
import { buildDestinationEnquiryUrl } from "../utils/whatsapp";
import { Image } from "./Image";
import { RouteFareCalculator } from "./RouteFareCalculator";
import { BookingModal } from "./BookingModal";
import { FadeIn, FadeInStagger, FadeInItem } from "./FadeIn";

export const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationItem[]>(() => getDestinations());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDestination, setActiveDestination] = useState<DestinationItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDestination, setBookingDestination] = useState<string>("Garden Ice Cream Restaurant");
  const [calculatorDestinationId, setCalculatorDestinationId] = useState<string>("garden-ice-cream-restaurant");

  // Re-sync if destinations are updated by admin in localStorage
  useEffect(() => {
    const handleUpdate = () => {
      setDestinations(getDestinations());
    };
    window.addEventListener("mahabaleshwar_destinations_updated", handleUpdate);
    return () => window.removeEventListener("mahabaleshwar_destinations_updated", handleUpdate);
  }, []);

  // Filtered destinations list
  const filteredDestinations = useMemo(() => {
    return searchDestinations(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, destinations]);

  const handleOpenBooking = (dest: DestinationItem) => {
    setBookingDestination(dest.name);
    setIsBookingModalOpen(true);
  };

  const handleOpenCalculator = (dest: DestinationItem) => {
    setCalculatorDestinationId(dest.id);
    const calcElement = document.getElementById("route-fare-calculator");
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = ["All", "Food & Strawberries", "Viewpoints", "Heritage", "Lakes"];

  const quickSearchTags = [
    { label: "🍓 Garden Ice Cream Restaurant", query: "Garden Ice Cream Restaurant" },
    { label: "📍 Lingmala Food Stop", query: "Lingmala" },
    { label: "Arthur's Seat", query: "Arthur's Seat" },
    { label: "Table Land", query: "Table Land" },
    { label: "Pratapgad Fort", query: "Pratapgad" },
    { label: "Tapola Lake", query: "Tapola" }
  ];

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Verified Destinations &amp; Stops</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Destinations &amp; Food Stops in Mahabaleshwar
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Book private cabs to iconic tourist viewpoints, historical citadels, and famous culinary halts like Garden Ice Cream Restaurant in Lingmala.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs shrink-0 self-start md:self-auto">
            <Car className="w-4 h-4 text-[#064E3B]" />
            <span className="text-xs font-bold text-slate-800">
              {destinations.length} Verified Taxi Destinations
            </span>
          </div>
        </FadeIn>

        {/* Search & Category Filter Bar */}
        <FadeIn delay={0.1} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="destination-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination, restaurant or stop (e.g. Garden Ice Cream, Lingmala, Arthur's Seat)..."
                className="w-full pl-10 pr-10 py-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#064E3B] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">
              Popular searches:
            </span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => {
                  setSearchQuery(tag.query);
                  setSelectedCategory("All");
                }}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium text-[11px] transition-colors cursor-pointer border border-emerald-100"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Destination Cards Grid */}
        {filteredDestinations.length === 0 ? (
          <FadeIn className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-slate-800">
              No destination found for &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try searching for &ldquo;Garden Ice Cream&rdquo;, &ldquo;Lingmala&rdquo;, or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Show All Destinations
            </button>
          </FadeIn>
        ) : (
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => {
              const googleMapsUrl = dest.googlePlaceId
                ? getGoogleMapsPlaceUrl(dest.googlePlaceId, dest.name)
                : dest.googleMapsUrl;

              const googleReviewsUrl = dest.googlePlaceId
                ? getGoogleReviewsUrl(dest.googlePlaceId)
                : dest.googleBusinessUrl;

              const isGardenRestaurant = dest.id === "garden-ice-cream-restaurant";

              return (
                <FadeInItem
                  key={dest.id}
                  id={dest.id}
                  className={`scroll-mt-28 group bg-white rounded-3xl border ${
                    isGardenRestaurant
                      ? "border-[#D4A853] shadow-lg ring-2 ring-[#D4A853]/20"
                      : "border-slate-200/90 shadow-sm"
                  } hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1`}
                >
                  {/* Card Image Banner */}
                  <div className="relative h-60 overflow-hidden bg-slate-900">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      containerClassName="w-full h-full absolute inset-0"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 pointer-events-none" />

                    {/* Category / Locality Badge */}
                    <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D4A853]" />
                        <span>{dest.locality}</span>
                      </span>

                      {dest.taxiAvailable && (
                        <span className="bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1">
                          <Car className="w-3 h-3 text-[#25D366]" />
                          <span>Taxi available</span>
                        </span>
                      )}
                    </div>

                    {/* Featured / Special Tag */}
                    {isGardenRestaurant && (
                      <span className="absolute top-3 right-3 bg-[#D4A853] text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md z-20">
                        Top Food Stop
                      </span>
                    )}

                    {/* Destination Title on Image */}
                    <div className="absolute bottom-3 left-4 right-4 z-20">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D4A853] transition-colors leading-tight">
                        {dest.name}
                      </h3>
                      {dest.tagline && (
                        <p className="text-[11px] text-emerald-200/90 font-medium mt-0.5">
                          {dest.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {dest.shortDesc}
                      </p>

                      {/* Key highlights pills */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                          Highlights &amp; Stop Details:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {dest.keyPoints.slice(0, 3).map((point, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      {/* Primary Actions: Book Taxi & Route Calculator */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenBooking(dest)}
                          className="min-h-[44px] py-2 px-3 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                        >
                          <Car className="w-3.5 h-3.5 text-[#D4A853]" />
                          <span>Book Taxi</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenCalculator(dest)}
                          className="min-h-[44px] py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Get Fare</span>
                        </button>
                      </div>

                      {/* Google Maps & Google Reviews buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[38px] py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                          title={`View ${dest.name} on Google Maps`}
                        >
                          <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                          <span className="truncate">View on Google Maps</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        </a>

                        <a
                          href={googleReviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[38px] py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all border border-amber-200/50"
                          title={`Read Google reviews for ${dest.name}`}
                        >
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                          <span className="truncate">Google Reviews</span>
                          <ExternalLink className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                        </a>
                      </div>

                      {/* Explore details trigger */}
                      <div className="pt-1 text-center">
                        <button
                          type="button"
                          onClick={() => setActiveDestination(dest)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-[#B45309] transition-colors cursor-pointer"
                        >
                          <span>Read Full Destination &amp; Sightseeing Guide</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        )}

        {/* Live Taxi Route & Fare Calculator */}
        <FadeIn className="mt-16">
          <RouteFareCalculator
            initialDestinationId={calculatorDestinationId}
            onBookSuccess={() => {
              setIsBookingModalOpen(false);
            }}
          />
        </FadeIn>
      </div>

      {/* Destination Modal */}
      {activeDestination && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActiveDestination(null)}
        >
          <div
            className="bg-white text-slate-900 border border-emerald-900/20 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-800 font-bold">
                  {activeDestination.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {activeDestination.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>{activeDestination.address}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveDestination(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  containerClassName="w-full h-full absolute inset-0"
                  className="w-full h-full object-cover"
                />
                {activeDestination.elevation && (
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    Elevation: {activeDestination.elevation}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeDestination.fullDesc}
              </p>

              <div>
                <div className="text-xs uppercase tracking-wider font-bold text-emerald-900 mb-2">
                  Key Sights &amp; Stop Features:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeDestination.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 font-medium">
                      <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Google Place Details */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  Verified Google Place ID:
                </span>
                <code className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 select-all block">
                  {activeDestination.googlePlaceId}
                </code>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleOpenBooking(activeDestination);
                    setActiveDestination(null);
                  }}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#064E3B] hover:bg-[#085a44] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Car className="w-4 h-4 text-[#D4A853]" />
                  <span>Book Taxi for {activeDestination.name}</span>
                </button>

                <a
                  href={
                    activeDestination.googlePlaceId
                      ? getGoogleMapsPlaceUrl(activeDestination.googlePlaceId, activeDestination.name)
                      : activeDestination.googleMapsUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  <MapPin className="w-4 h-4 text-[#D4A853]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex gap-2">
                <a
                  href={
                    activeDestination.googlePlaceId
                      ? getGoogleReviewsUrl(activeDestination.googlePlaceId)
                      : activeDestination.googleBusinessUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[40px] inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 py-2 px-4 rounded-xl font-semibold text-xs transition-all"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>View Verified Google Reviews &amp; Business Listing</span>
                  <ExternalLink className="w-3 h-3 text-amber-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDestination={bookingDestination}
      />
    </section>
  );
};
