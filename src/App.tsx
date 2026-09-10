import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { BookingModal } from "./components/BookingModal";
import { updatePageSeo } from "./utils/seo";

// Pages
import { Home } from "./pages/Home";
import { ToursPage } from "./pages/ToursPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { ServicesPage } from "./pages/ServicesPage";
import { FleetPage } from "./pages/FleetPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsConditions } from "./pages/TermsConditions";
import { AdminPage } from "./pages/AdminPage";
import { LiveTrackingPage } from "./pages/LiveTrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedDestination, setPreselectedDestination] = useState<string | undefined>(undefined);

  const handleOpenBooking = (destinationName?: string) => {
    setPreselectedDestination(destinationName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setPreselectedDestination(undefined);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle deep-link anchor hash on initial page load
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, []);

  // Synchronize dynamic SEO metadata, Open Graph tags, canonical link, and JSON-LD schema
  useEffect(() => {
    updatePageSeo(currentPath);
  }, [currentPath]);

  const navigate = (path: string) => {
    const [pathname, hash] = path.split("#");
    const targetPath = pathname || "/";

    window.history.pushState({}, "", path);
    setCurrentPath(targetPath);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case "/":
        return <Home onOpenBookingModal={handleOpenBooking} />;
      case "/tours":
        return <ToursPage onNavigate={navigate} />;
      case "/destinations":
        return <DestinationsPage onNavigate={navigate} />;
      case "/services":
        return <ServicesPage onNavigate={navigate} />;
      case "/fleet":
        return <FleetPage onNavigate={navigate} />;
      case "/reviews":
        return <ReviewsPage onNavigate={navigate} />;
      case "/about":
        return <AboutPage onNavigate={navigate} />;
      case "/contact":
        return <ContactPage onNavigate={navigate} />;
      case "/gallery":
        return <GalleryPage onNavigate={navigate} onOpenBookingModal={handleOpenBooking} />;
      case "/privacy-policy":
        return <PrivacyPolicy onNavigate={navigate} />;
      case "/terms":
      case "/terms-and-conditions":
        return <TermsConditions onNavigate={navigate} />;
      case "/admin":
        return <AdminPage onNavigate={navigate} />;
      case "/live-tracking":
      case "/track":
        return <LiveTrackingPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#D4A853]/30 selection:text-[#064E3B]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Primary Navbar */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Dynamic Page View */}
      <main className="flex-1 pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Floating Call & WhatsApp Actions */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Global Quick Booking Modal with optional pre-selected destination */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        initialDestination={preselectedDestination}
      />
    </div>
  );
}
