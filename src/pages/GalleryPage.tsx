import React from "react";
import { MahabaleshwarGallery } from "../components/MahabaleshwarGallery";
import { BookingWidget } from "../components/BookingWidget";
import { Camera, CheckCircle2 } from "lucide-react";
import { FinalCTA } from "../components/FinalCTA";
import { Image } from "../components/Image";
import { galleryData } from "../data/gallery";

interface GalleryPageProps {
  onNavigate: (path: string) => void;
  onOpenBookingModal?: (destinationName?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate,
  onOpenBookingModal
}) => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen">
      {/* Page Header with Atmospheric Photo Background */}
      <div className="relative bg-gradient-to-b from-[#0A3324] via-[#0D4431] to-[#0A3324] text-white border-b border-emerald-800/40 py-14 md:py-20 overflow-hidden shadow-md">
        {/* Background Image from Uploaded Photos */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Image
            src="/images/gallery/kates-point.jpg"
            alt="Kate's Point Krishna Valley"
            priority={true}
            containerClassName="w-full h-full absolute inset-0"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A3324] via-[#0D4431]/80 to-[#0A3324]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A3324] via-transparent to-[#0A3324]/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Website Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-emerald-200/80 mb-5 font-medium">
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
            <span className="text-white/40">/</span>
            <span className="text-[#D4A853] font-bold">Mahabaleshwar Gallery</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs backdrop-blur-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>Authentic Photo Showcase</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Mahabaleshwar Gallery
          </h1>
          <p className="mt-3 text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed font-normal">
            Scroll through high-resolution authentic photographs of Mahabaleshwar, Panchgani, waterfalls, and Maratha hill forts. Inspect viewpoints, cliff walks, and calm lake waters before reserving your cab.
          </p>

          {/* Quick Highlight Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/95">
            <div className="flex items-center gap-1.5 bg-emerald-950/70 px-3 py-1.5 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              <span>{galleryData.length} Verified Destinations</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-950/70 px-3 py-1.5 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              <span>Interactive Fullscreen Lightbox</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-950/70 px-3 py-1.5 rounded-lg border border-emerald-500/20 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
              <span>Direct WhatsApp Tour Quotation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Booking Bar Floating Over Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <BookingWidget />
      </div>

      {/* The Mahabaleshwar Gallery Component */}
      <MahabaleshwarGallery onOpenBookingModal={onOpenBookingModal} />

      {/* Final Call to Action */}
      <FinalCTA />
    </div>
  );
};
