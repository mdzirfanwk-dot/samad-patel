import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Navigation,
  MessageCircle,
  Maximize2,
  X,
  Compass,
  ArrowRight,
  SlidersHorizontal,
  Grid3X3,
  Columns3
} from "lucide-react";
import { galleryData, GalleryImage } from "../data/gallery";
import { Image } from "./Image";
import { buildBookingEnquiryUrl } from "../utils/whatsapp";
import { FadeIn } from "./FadeIn";

interface MahabaleshwarGalleryProps {
  onOpenBookingModal?: (destinationName?: string) => void;
  className?: string;
  initialCategory?: string;
}

type CategoryFilter =
  | "All"
  | "New Uploads"
  | "Mahabaleshwar"
  | "Panchgani"
  | "Pratapgad"
  | "Tapola"
  | "Waterfalls"
  | "Heritage & Temples"
  | "Local Experiences"
  | "Scenic Roads";

export const MahabaleshwarGallery: React.FC<MahabaleshwarGalleryProps> = ({
  onOpenBookingModal,
  className = "",
  initialCategory = "All"
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    (initialCategory as CategoryFilter) || "All"
  );
  const [viewMode, setViewMode] = useState<"scroll" | "grid">("scroll");
  const [selectedSpot, setSelectedSpot] = useState<GalleryImage | null>(null);
  const [activeSpotIndex, setActiveSpotIndex] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: { label: CategoryFilter; displayName: string }[] = [
    { label: "All", displayName: `All Spots (${galleryData.length})` },
    { label: "New Uploads", displayName: `⭐ User Uploads (${galleryData.filter(g => g.isUserPhoto).length})` },
    { label: "Mahabaleshwar", displayName: `Mahabaleshwar Points (${galleryData.filter(g => g.category === "Mahabaleshwar").length})` },
    { label: "Waterfalls", displayName: `Waterfalls (${galleryData.filter(g => g.category === "Waterfalls").length})` },
    { label: "Tapola", displayName: `Tapola Waters (${galleryData.filter(g => g.category === "Tapola").length})` },
    { label: "Heritage & Temples", displayName: `Temples & Forts (${galleryData.filter(g => g.category === "Heritage & Temples" || g.category === "Pratapgad").length})` },
    { label: "Panchgani", displayName: `Panchgani (${galleryData.filter(g => g.category === "Panchgani").length})` },
    { label: "Local Experiences", displayName: "Farms & Strawberries" },
    { label: "Scenic Roads", displayName: "Scenic Ghats & Fleet" }
  ];

  const filteredSpots =
    activeCategory === "All"
      ? galleryData
      : activeCategory === "New Uploads"
      ? galleryData.filter((img) => img.isUserPhoto)
      : activeCategory === "Heritage & Temples"
      ? galleryData.filter((img) => img.category === "Heritage & Temples" || img.category === "Pratapgad")
      : galleryData.filter((img) => img.category === activeCategory);

  // Check scroll positions to enable/disable arrow buttons
  const checkScrollBounds = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollBounds();
    const handleResize = () => checkScrollBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filteredSpots, viewMode]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380; // card width + gap
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
    setTimeout(checkScrollBounds, 350);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedSpot) return;
      if (e.key === "Escape") {
        setSelectedSpot(null);
      } else if (e.key === "ArrowLeft") {
        navigateSpot(-1);
      } else if (e.key === "ArrowRight") {
        navigateSpot(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSpot, activeSpotIndex, filteredSpots]);

  const openLightbox = (spot: GalleryImage, index: number) => {
    setSelectedSpot(spot);
    setActiveSpotIndex(index);
  };

  const navigateSpot = (direction: number) => {
    if (!filteredSpots.length) return;
    let nextIndex = activeSpotIndex + direction;
    if (nextIndex < 0) nextIndex = filteredSpots.length - 1;
    if (nextIndex >= filteredSpots.length) nextIndex = 0;
    setActiveSpotIndex(nextIndex);
    setSelectedSpot(filteredSpots[nextIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> next spot
      navigateSpot(1);
    } else if (diff < -45) {
      // Swiped right -> prev spot
      navigateSpot(-1);
    }
    setTouchStartX(null);
  };

  const handleBookSpot = (spot: GalleryImage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOpenBookingModal) {
      onOpenBookingModal(spot.spotName);
    } else {
      // Direct WhatsApp enquiry
      const messageUrl = buildBookingEnquiryUrl({
        pickup: "Mahabaleshwar / Hotel / Resort",
        destination: `${spot.spotName} (${spot.tourCircuit})`,
        travelDate: "Flexible / Today",
        passengers: "2-4",
        travelType: "Sightseeing Taxi Tour"
      });
      const link = document.createElement("a");
      link.href = messageUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="gallery" className={`py-16 sm:py-24 bg-[#F8FAF8] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
              <Camera className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Explore Tourist Spots Before Booking</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Mahabaleshwar Gallery
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Scroll through authentic high-resolution photographs of iconic viewpoints, lakes, forts, and local strawberry spots. Choose your preferred destinations and book your private cab or tour in one click.
            </p>
          </div>

          {/* Controls: Mode Toggle & Scroll Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("scroll")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "scroll"
                    ? "bg-emerald-900 text-[#D4A853] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Scroll carousel view"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scroll View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-emerald-900 text-[#D4A853] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Grid visual view"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid View</span>
              </button>
            </div>

            {/* Scroll Navigation Arrows (visible in scroll mode) */}
            {viewMode === "scroll" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    canScrollLeft
                      ? "bg-white text-slate-900 border-slate-300 hover:bg-emerald-900 hover:text-[#D4A853] shadow-sm"
                      : "bg-white/60 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    canScrollRight
                      ? "bg-emerald-900 text-[#D4A853] border-emerald-900 hover:bg-emerald-950 shadow-sm"
                      : "bg-white/60 text-slate-300 border-slate-200 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Category Filters Bar */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer min-h-[40px] flex items-center active:scale-95 shrink-0 ${
                  activeCategory === cat.label
                    ? "bg-emerald-900 text-[#D4A853] shadow-md border border-[#D4A853]/40"
                    : "bg-white text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 border border-slate-200"
                }`}
              >
                {cat.displayName}
              </button>
            ))}
          </div>

          {/* Scroll Helper / Instruction Hint */}
          {viewMode === "scroll" && (
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-medium">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Scroll horizontally to browse destinations. Click any card to zoom or book.</span>
              </div>
              <span className="hidden sm:inline font-bold text-emerald-900">
                {filteredSpots.length} destinations available
              </span>
            </div>
          )}
        </FadeIn>

        {/* SCROLL CAROUSEL MODE */}
        {viewMode === "scroll" ? (
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollBounds}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-emerald-700/30 scrollbar-track-transparent"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredSpots.map((spot, index) => (
              <div
                key={spot.id}
                className="flex-none w-[82vw] max-w-[340px] sm:w-[350px] md:w-[370px] snap-center sm:snap-start group"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  {/* Card Image Container */}
                  <div
                    onClick={() => openLightbox(spot, index)}
                    className="relative h-56 bg-slate-900 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={spot.url}
                      alt={spot.spotName}
                      containerClassName="w-full h-full absolute inset-0"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-950/90 backdrop-blur-md text-[#D4A853] border border-[#D4A853]/40 shadow-sm">
                          {spot.highlightBadge}
                        </span>
                        {spot.isUserPhoto && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#D4A853] text-[#0A3324] shadow-xs flex items-center gap-1">
                            ⭐ User Photo
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(spot, index);
                        }}
                        className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/80 flex items-center justify-center transition-colors pointer-events-auto"
                        title="View Full Resolution"
                        aria-label={`View full photo of ${spot.spotName}`}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#D4A853]" />
                        <span>{spot.category}</span>
                        <span className="text-white/40">•</span>
                        <span>{spot.distanceFromCenter}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        onClick={() => openLightbox(spot, index)}
                        className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors cursor-pointer line-clamp-1"
                      >
                        {spot.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {spot.caption}
                      </p>

                      {/* Travel Quick Info */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-semibold border border-emerald-100">
                          <Clock className="w-3 h-3 text-emerald-700" />
                          {spot.approxTime}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium truncate max-w-[190px]">
                          <Compass className="w-3 h-3 text-emerald-700" />
                          {spot.tourCircuit}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openLightbox(spot, index)}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-white hover:border-slate-300 transition-colors cursor-pointer text-center"
                      >
                        View Photo
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleBookSpot(spot, e)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-900 text-[#D4A853] hover:bg-emerald-950 text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book Cab</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* GRID VIEW MODE */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot, index) => (
              <div
                key={spot.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div
                  onClick={() => openLightbox(spot, index)}
                  className="relative h-56 bg-slate-900 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={spot.url}
                    alt={spot.spotName}
                    containerClassName="w-full h-full absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-950/90 backdrop-blur-md text-[#D4A853] border border-[#D4A853]/40 shadow-sm">
                        {spot.highlightBadge}
                      </span>
                      {spot.isUserPhoto && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#D4A853] text-[#0A3324] shadow-xs flex items-center gap-1">
                          ⭐ User Photo
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(spot, index);
                      }}
                      className="w-8 h-8 rounded-lg bg-black/60 text-white/90 hover:text-white flex items-center justify-center transition-colors"
                      title="View Full Resolution"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#D4A853]" />
                      <span>{spot.category}</span>
                      <span className="text-white/40">•</span>
                      <span>{spot.distanceFromCenter}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      onClick={() => openLightbox(spot, index)}
                      className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors cursor-pointer"
                    >
                      {spot.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {spot.caption}
                    </p>

                    <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2 text-[11px] text-[#6B7280]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F7F5F0] text-[#12372A] font-medium">
                        <Clock className="w-3 h-3 text-[#D4A853]" />
                        {spot.approxTime}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#12372A]/5 text-[#12372A] font-medium truncate max-w-[190px]">
                        <Compass className="w-3 h-3 text-[#D4A853]" />
                        {spot.tourCircuit}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openLightbox(spot, index)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold hover:bg-white hover:border-slate-300 transition-colors cursor-pointer text-center"
                    >
                      View Photo
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleBookSpot(spot, e)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-900 text-[#D4A853] hover:bg-emerald-950 text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Book Cab</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Booking Assurance Strip */}
        <FadeIn className="mt-12 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D4A853]/40 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs text-[#D4A853] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Route Flexibility</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Want to visit multiple spots in a single day?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl">
              We customize point-to-point itineraries across Mahabaleshwar, Panchgani, Pratapgad, and Tapola. Clean sedan &amp; SUV cabs with local mountain drivers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                if (onOpenBookingModal) {
                  onOpenBookingModal("Custom Multi-Point Itinerary");
                } else {
                  const url = buildBookingEnquiryUrl({
                    pickup: "Mahabaleshwar / Hotel / Resort",
                    destination: "Custom Multi-Point Tour",
                    travelDate: "Flexible",
                    passengers: "2-4",
                    travelType: "Custom Sightseeing Tour"
                  });
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Book Custom Tour Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeIn>
      </div>

      {/* FULLSCREEN LIGHTBOX & DESTINATION INSPECTOR MODAL */}
      {selectedSpot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedSpot(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#071C14] border border-[#D4A853]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 px-4 sm:px-6 border-b border-[#12372A] bg-[#071C14]/95 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="text-[11px] sm:text-xs font-bold text-[#D4A853] uppercase tracking-wider px-2.5 py-1 rounded bg-[#12372A] border border-[#D4A853]/30">
                  {selectedSpot.category}
                </span>
                <span className="text-[11px] sm:text-xs text-white/60">
                  {activeSpotIndex + 1} of {filteredSpots.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSpot(null)}
                className="p-2.5 rounded-xl bg-[#12372A] text-white/80 hover:text-white hover:bg-[#12372A]/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display with Slide Controls & Mobile Touch Swipe */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative bg-black flex items-center justify-center overflow-hidden flex-1 min-h-[260px] sm:min-h-[420px] max-h-[58vh] touch-pan-y"
            >
              <Image
                src={selectedSpot.url}
                alt={selectedSpot.title}
                priority={true}
                containerClassName="w-full h-full flex items-center justify-center"
                className="w-full h-full max-h-[58vh] object-contain"
              />

              {/* Prev / Next Arrows in Modal */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateSpot(-1);
                }}
                className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Previous destination"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateSpot(1);
                }}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Next destination"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Bottom Details & Direct Booking Action */}
            <div className="p-4 sm:p-6 bg-[#0B2118] text-white border-t border-[#12372A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 shrink-0">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#D4A853]">
                  <span className="font-semibold">{selectedSpot.highlightBadge}</span>
                  {selectedSpot.isUserPhoto && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#D4A853] text-[#0A3324] shadow-xs flex items-center gap-1">
                      ⭐ Customer Verified Photo
                    </span>
                  )}
                  <span className="text-white/40">•</span>
                  <span className="text-white/80">{selectedSpot.distanceFromCenter}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80">{selectedSpot.approxTime}</span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl font-bold">
                  {selectedSpot.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {selectedSpot.caption}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <p className="text-[#D4A853]/90">
                    Included in: <strong className="text-white">{selectedSpot.tourCircuit}</strong>
                  </p>
                  {selectedSpot.originalFileName && (
                    <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      File: {selectedSpot.originalFileName}
                    </span>
                  )}
                </div>
              </div>

              {/* Direct Booking Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleBookSpot(selectedSpot)}
                  className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 sm:py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Book Cab for this Spot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Export Gallery alias as well for seamless compatibility
export const Gallery = MahabaleshwarGallery;
