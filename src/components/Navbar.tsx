import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, MapPin } from "lucide-react";
import { businessConfig } from "../data/businessConfig";
import { buildGeneralWhatsAppUrl } from "../utils/whatsapp";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Live Tracking", path: "/live-tracking", isLive: true },
    { label: "Tours", path: "/tours" },
    { label: "Destinations", path: "/destinations" },
    { label: "Gallery", path: "/gallery" },
    { label: "Services", path: "/services" },
    { label: "Fleet", path: "/fleet" },
    { label: "Reviews", path: "/reviews" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A3324]/95 backdrop-blur-md shadow-lg border-b border-emerald-700/40 py-2.5"
          : "bg-[#0A3324] border-b border-emerald-800/50 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={(e) => handleLinkClick("/", e)}
          className="flex items-center gap-2.5 sm:gap-3 group text-left min-w-0"
        >
          {/* Custom Mountain Geometry Logo */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-950 border border-[#D4A853]/50 flex items-center justify-center shadow-inner group-hover:border-[#D4A853] transition-colors shrink-0">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A853]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              <path d="M4.14 15.08 9 10" stroke="#F7F5F0" opacity="0.6" />
            </svg>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-wide text-white leading-none group-hover:text-[#D4A853] transition-colors truncate">
              MAHABALESHWAR WALA
            </span>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D4A853] font-semibold mt-1 truncate">
              Tours & Travels
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "text-[#D4A853] bg-emerald-950 font-semibold shadow-xs border border-emerald-700/50"
                    : "text-emerald-50/90 hover:text-white hover:bg-emerald-900/60"
                }`}
              >
                {link.isLive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            className="flex items-center gap-2 text-xs text-[#F7F5F0] hover:text-[#D4A853] px-3 py-2 rounded-xl transition-colors font-medium border border-[#D4A853]/20 hover:border-[#D4A853]/50"
            title="Call Verified Phone"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4A853]" />
            <span className="hidden xl:inline">{businessConfig.phone}</span>
            <span className="xl:hidden">Call Us</span>
          </a>

          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4A853] hover:bg-[#C29541] text-[#071C14] px-4 py-2 rounded-xl font-semibold text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#071C14]" />
            <span>Book Now</span>
          </a>
        </div>

        {/* Mobile menu and Quick Book buttons */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#D4A853] text-[#071C14] px-3 py-1.5 rounded-lg font-semibold text-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Book</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-[#F7F5F0] hover:bg-[#12372A] border border-[#D4A853]/20 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4A853]" /> : <Menu className="w-5 h-5 text-[#F7F5F0]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-[56px] sm:top-[64px] bg-black/70 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-40 lg:hidden bg-[#0A3324] border-t border-emerald-700/40 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-emerald-800/60">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleLinkClick(link.path, e)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between min-h-[44px] active:scale-95 ${
                      isActive
                        ? "text-[#071C14] bg-[#D4A853] shadow-md"
                        : "text-emerald-50 hover:text-white bg-emerald-950/70 border border-emerald-800/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isLive && (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                        LIVE
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-1 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-emerald-100/70 py-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4A853] shrink-0" />
                <span className="truncate">{businessConfig.addressShort}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${businessConfig.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-[#D4A853]/50 text-white text-xs font-bold bg-emerald-950 min-h-[44px] active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#D4A853]" />
                  <span>Call {businessConfig.phone}</span>
                </a>

                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md min-h-[44px] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
