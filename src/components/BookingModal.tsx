import React from "react";
import { X, Sparkles } from "lucide-react";
import { BookingWidget } from "./BookingWidget";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDestination
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#071C14] border border-[#D4A853]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#12372A] text-white/70 hover:text-white transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#D4A853] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Trip Enquiry</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Quick WhatsApp Booking
          </h2>
          <p className="text-xs text-white/70">
            Tell us your travel details and we will share available vehicles and accurate pricing on WhatsApp.
          </p>
        </div>

        <BookingWidget variant="contained" initialDestination={initialDestination} />

        <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200/80">
          <span>Already on a trip or waiting for pickup?</span>
          <a
            href="/live-tracking"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.history.pushState({}, "", "/live-tracking");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="text-[#D4A853] hover:text-[#C29541] font-bold flex items-center gap-1"
          >
            <span>Live GPS Taxi Tracking & Exchange ➔</span>
          </a>
        </div>
      </div>
    </div>
  );
};
