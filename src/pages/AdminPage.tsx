import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  MapPin,
  Car,
  Edit,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Star,
  Search,
  Users,
  Calendar,
  DollarSign,
  Trash2,
  X,
  Save,
  Navigation,
  Sparkles
} from "lucide-react";
import { DestinationItem } from "../data/destinations";
import {
  getDestinations,
  saveDestination,
  resetDestinations,
  getBookings,
  updateBookingStatus,
  clearBookings,
  BookingLogEntry,
  getGoogleMapsPlaceUrl,
  getGoogleReviewsUrl
} from "../utils/destinationsManager";

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"destinations" | "bookings" | "diagnostics">("destinations");
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [editingDest, setEditingDest] = useState<DestinationItem | null>(null);
  const [bookings, setBookings] = useState<BookingLogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const loadData = () => {
    setDestinations(getDestinations());
    setBookings(getBookings());
  };

  useEffect(() => {
    loadData();

    const handleDestUpdate = () => setDestinations(getDestinations());
    const handleBookingsUpdate = () => setBookings(getBookings());

    window.addEventListener("mahabaleshwar_destinations_updated", handleDestUpdate);
    window.addEventListener("mahabaleshwar_bookings_updated", handleBookingsUpdate);

    return () => {
      window.removeEventListener("mahabaleshwar_destinations_updated", handleDestUpdate);
      window.removeEventListener("mahabaleshwar_bookings_updated", handleBookingsUpdate);
    };
  }, []);

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    saveDestination(editingDest);
    setSaveToast(`Destination "${editingDest.name}" updated successfully!`);
    setEditingDest(null);
    loadData();

    setTimeout(() => {
      setSaveToast(null);
    }, 4000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all destinations to verified factory defaults? Any custom edits will be reverted.")) {
      resetDestinations();
      loadData();
      setSaveToast("Destinations reset to verified factory defaults.");
      setTimeout(() => setSaveToast(null), 3500);
    }
  };

  const handleStatusChange = (id: string, status: BookingLogEntry["status"]) => {
    updateBookingStatus(id, status);
    loadData();
  };

  const handleClearBookings = () => {
    if (window.confirm("Clear all logged booking enquiries?")) {
      clearBookings();
      loadData();
    }
  };

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.googlePlaceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAF8] text-slate-900 min-h-screen pb-20">
      {/* Admin Top Header Banner */}
      <div className="bg-[#0A3324] text-white py-10 md:py-14 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/90 border border-[#D4A853]/40 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>Admin Operations &amp; Destination Management</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Destination &amp; Taxi Control Center
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-emerald-100/80 max-w-2xl">
                Manage official taxi destinations, Google Place IDs, custom pricing rules, and real-time customer trip enquiries.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 text-xs font-bold border border-emerald-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Factory Defaults</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 border-b border-emerald-800/80">
            <button
              type="button"
              onClick={() => setActiveTab("destinations")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "destinations"
                  ? "border-[#D4A853] text-[#D4A853]"
                  : "border-transparent text-emerald-200/70 hover:text-white"
              }`}
            >
              Destinations Management ({destinations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "bookings"
                  ? "border-[#D4A853] text-[#D4A853]"
                  : "border-transparent text-emerald-200/70 hover:text-white"
              }`}
            >
              <span>Booking Enquiries Log</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#D4A853] text-slate-900 font-extrabold">
                {bookings.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("diagnostics")}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "diagnostics"
                  ? "border-[#D4A853] text-[#D4A853]"
                  : "border-transparent text-emerald-200/70 hover:text-white"
              }`}
            >
              Google Place ID Diagnostics
            </button>
          </div>
        </div>
      </div>

      {/* Save Notification Toast */}
      {saveToast && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="p-4 rounded-2xl bg-[#064E3B] text-white flex items-center justify-between gap-3 shadow-lg border border-emerald-500/40">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
              <span>{saveToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setSaveToast(null)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* TAB 1: Destinations Management */}
        {activeTab === "destinations" && (
          <div className="space-y-6">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter destinations by name, place ID or locality..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="text-xs text-slate-500">
                Click <span className="font-bold text-slate-800">Edit</span> on any destination to modify Place ID, pricing, or SEO attributes.
              </div>
            </div>

            {/* Destinations Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      <th className="py-3.5 px-4">Destination</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Google Place ID</th>
                      <th className="py-3.5 px-4">Taxi Status</th>
                      <th className="py-3.5 px-4">Pricing Rules (Sedan)</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {filteredDestinations.map((dest) => (
                      <tr
                        key={dest.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          dest.id === "garden-ice-cream-restaurant" ? "bg-amber-50/30" : ""
                        }`}
                      >
                        <td className="py-4 px-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            {dest.id === "garden-ice-cream-restaurant" ? (
                              <span className="text-lg">🍓</span>
                            ) : (
                              <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                            )}
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{dest.name}</span>
                                {dest.featured && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#D4A853]/20 text-[#B45309] border border-[#D4A853]/40">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500">{dest.locality}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-600">
                          <span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-semibold text-slate-700">
                            {dest.category}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <code className="text-[11px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200 block truncate max-w-[200px]">
                            {dest.googlePlaceId}
                          </code>
                        </td>

                        <td className="py-4 px-4">
                          {dest.taxiAvailable ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                              Disabled
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-slate-600 font-medium">
                          {dest.pricingRules ? (
                            <div>
                              <span>1-Way: ₹{dest.pricingRules.oneWay.sedan}</span>
                              <span className="mx-1 text-slate-300">|</span>
                              <span>Return: ₹{dest.pricingRules.roundTrip.sedan}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400">Standard Union Rate</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingDest(dest)}
                              className="px-3 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#085a44] text-white text-xs font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <a
                              href={
                                dest.googlePlaceId
                                  ? getGoogleMapsPlaceUrl(dest.googlePlaceId, dest.name)
                                  : dest.googleMapsUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Test Google Maps"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Bookings Log */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Customer Trip Enquiries Register ({bookings.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged bookings submitted through the Fare Calculator, Booking Form, and Contact desk.
                </p>
              </div>

              {bookings.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearBookings}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors cursor-pointer border border-rose-200 self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Enquiries</span>
                </button>
              )}
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                <Car className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-serif text-base font-bold text-slate-800">
                  No Booking Enquiries Logged Yet
                </h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  When visitors use the Route Fare Calculator or WhatsApp Booking Widget to request a ride to Garden Ice Cream Restaurant or any destination, it will be logged here.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate("/destinations")}
                  className="px-4 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Go to Fare Calculator
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                        <th className="py-3.5 px-4">Booking ID &amp; Time</th>
                        <th className="py-3.5 px-4">Pickup Location</th>
                        <th className="py-3.5 px-4">Destination</th>
                        <th className="py-3.5 px-4">Vehicle &amp; Pax</th>
                        <th className="py-3.5 px-4">Est. Fare</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-slate-900">
                            <div>{b.id}</div>
                            <span className="text-[10px] font-sans text-slate-400 font-normal">
                              {b.timestamp}
                            </span>
                          </td>

                          <td className="py-4 px-4 font-semibold text-slate-800">
                            {b.pickup}
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-bold text-slate-900 flex items-center gap-1">
                              {b.destination.toLowerCase().includes("garden") && <span>🍓</span>}
                              <span>{b.destination}</span>
                            </span>
                            <span className="text-[10px] text-slate-500">{b.tripType}</span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-800 truncate max-w-[150px]">
                              {b.vehicleCategory}
                            </div>
                            <span className="text-[10px] text-slate-500">{b.passengers} Pax</span>
                          </td>

                          <td className="py-4 px-4">
                            {b.estimatedFare ? (
                              <span className="font-serif font-extrabold text-emerald-800 text-sm">
                                ₹{b.estimatedFare}
                              </span>
                            ) : (
                              <span className="text-slate-400">Custom Quote</span>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                b.status === "Confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : b.status === "Contacted"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleStatusChange(b.id, e.target.value as BookingLogEntry["status"])
                              }
                              className="px-2 py-1 rounded-lg border border-slate-200 text-[11px] font-bold bg-white text-slate-700 cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Google Place ID Diagnostics */}
        {activeTab === "diagnostics" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Google Business Integration</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Garden Ice Cream Restaurant Verification Status
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Confirms that the verified Place ID corresponds to the official Google Business location on Panchgani-Mahabaleshwar Road, Lingmala.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Verified Google Place ID
                  </span>
                  <div className="text-sm font-mono font-bold text-slate-900 bg-white p-3 rounded-xl border border-slate-200 select-all">
                    ChIJrRXc7G1lwjsReAWEkRK_1Zc
                  </div>
                  <p className="text-xs text-slate-500">
                    Officially identifies Garden Ice Cream Restaurant, Lingmala, Mahabaleshwar in the Google Places database.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Registered Physical Address
                  </span>
                  <div className="text-xs font-semibold text-slate-900 bg-white p-3 rounded-xl border border-slate-200">
                    Panchgani - Mahabaleshwar Road, Lingmala, Mahabaleshwar, Maharashtra 412806, India
                  </div>
                  <p className="text-xs text-slate-500">
                    Located near Lingmala Waterfall turnoff, directly accessible via taxi with dedicated roadside parking.
                  </p>
                </div>
              </div>

              {/* Endpoint Testing Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Garden+Ice+Cream+Restaurant+Mahabaleshwar&query_place_id=ChIJrRXc7G1lwjsReAWEkRK_1Zc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-[#D4A853]" />
                  <span>Test Google Maps Location</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://search.google.com/local/reviews?placeid=ChIJrRXc7G1lwjsReAWEkRK_1Zc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all"
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Test Google Reviews / Business Listing</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Destination Modal Form */}
      {editingDest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setEditingDest(null)}
        >
          <div
            className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold">
                  Admin Destination Editor
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-0.5">
                  Edit {editingDest.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingDest(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDestination} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    Destination Name
                  </label>
                  <input
                    type="text"
                    value={editingDest.name}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingDest.category}
                    onChange={(e) => setEditingDest({ ...editingDest, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    required
                  />
                </div>

                {/* Google Place ID */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    Google Place ID (Verified)
                  </label>
                  <input
                    type="text"
                    value={editingDest.googlePlaceId}
                    onChange={(e) => setEditingDest({ ...editingDest, googlePlaceId: e.target.value })}
                    className="w-full px-3 py-2 font-mono border border-slate-300 rounded-xl text-xs text-slate-900 bg-slate-50 focus:border-[#064E3B] focus:outline-none"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Used for official Google Maps and review endpoints. (Garden Ice Cream Restaurant: <code>ChIJrRXc7G1lwjsReAWEkRK_1Zc</code>)
                  </p>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    Full Physical Address
                  </label>
                  <input
                    type="text"
                    value={editingDest.address}
                    onChange={(e) => setEditingDest({ ...editingDest, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingDest.shortDesc}
                    onChange={(e) => setEditingDest({ ...editingDest, shortDesc: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    Display Image URL
                  </label>
                  <input
                    type="text"
                    value={editingDest.image}
                    onChange={(e) => setEditingDest({ ...editingDest, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    required
                  />
                </div>

                {/* One-Way Pricing Rules */}
                <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] uppercase font-bold text-slate-700 block mb-2">
                    One-Way Taxi Pricing Rules (₹)
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Sedan</label>
                      <input
                        type="number"
                        value={editingDest.pricingRules?.oneWay.sedan || 500}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            pricingRules: {
                              oneWay: {
                                sedan: Number(e.target.value),
                                suv: editingDest.pricingRules?.oneWay.suv || 800,
                                tempo: editingDest.pricingRules?.oneWay.tempo || 1500
                              },
                              roundTrip: editingDest.pricingRules?.roundTrip || {
                                sedan: 900,
                                suv: 1400,
                                tempo: 2500
                              }
                            }
                          })
                        }
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Prime SUV</label>
                      <input
                        type="number"
                        value={editingDest.pricingRules?.oneWay.suv || 800}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            pricingRules: {
                              oneWay: {
                                sedan: editingDest.pricingRules?.oneWay.sedan || 500,
                                suv: Number(e.target.value),
                                tempo: editingDest.pricingRules?.oneWay.tempo || 1500
                              },
                              roundTrip: editingDest.pricingRules?.roundTrip || {
                                sedan: 900,
                                suv: 1400,
                                tempo: 2500
                              }
                            }
                          })
                        }
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Tempo</label>
                      <input
                        type="number"
                        value={editingDest.pricingRules?.oneWay.tempo || 1500}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            pricingRules: {
                              oneWay: {
                                sedan: editingDest.pricingRules?.oneWay.sedan || 500,
                                suv: editingDest.pricingRules?.oneWay.suv || 800,
                                tempo: Number(e.target.value)
                              },
                              roundTrip: editingDest.pricingRules?.roundTrip || {
                                sedan: 900,
                                suv: 1400,
                                tempo: 2500
                              }
                            }
                          })
                        }
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Round-Trip Pricing Rules */}
                <div className="sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] uppercase font-bold text-slate-700 block mb-2">
                    Round-Trip Taxi Pricing Rules (₹)
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Sedan</label>
                      <input
                        type="number"
                        value={editingDest.pricingRules?.roundTrip.sedan || 900}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            pricingRules: {
                              oneWay: editingDest.pricingRules?.oneWay || {
                                sedan: 500,
                                suv: 800,
                                tempo: 1500
                              },
                              roundTrip: {
                                sedan: Number(e.target.value),
                                suv: editingDest.pricingRules?.roundTrip.suv || 1400,
                                tempo: editingDest.pricingRules?.roundTrip.tempo || 2500
                              }
                            }
                          })
                        }
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Prime SUV</label>
                      <input
                        type="number"
                        value={editingDest.pricingRules?.roundTrip.suv || 1400}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            pricingRules: {
                              oneWay: editingDest.pricingRules?.oneWay || {
                                sedan: 500,
                                suv: 800,
                                tempo: 1500
                              },
                              roundTrip: {
                                sedan: editingDest.pricingRules?.roundTrip.sedan || 900,
                                suv: Number(e.target.value),
                                tempo: editingDest.pricingRules?.roundTrip.tempo || 2500
                              }
                            }
                          })
                        }
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Tempo</label>
                      <input
                        type="number"
                        value={editingDest.pricingRules?.roundTrip.tempo || 2500}
                        onChange={(e) =>
                          setEditingDest({
                            ...editingDest,
                            pricingRules: {
                              oneWay: editingDest.pricingRules?.oneWay || {
                                sedan: 500,
                                suv: 800,
                                tempo: 1500
                              },
                              roundTrip: {
                                sedan: editingDest.pricingRules?.roundTrip.sedan || 900,
                                suv: editingDest.pricingRules?.roundTrip.suv || 1400,
                                tempo: Number(e.target.value)
                              }
                            }
                          })
                        }
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Title & Description */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={editingDest.seoTitle || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    placeholder="e.g. Taxi to Garden Ice Cream Restaurant Mahabaleshwar"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase font-bold text-slate-600 mb-1">
                    SEO Meta Description
                  </label>
                  <input
                    type="text"
                    value={editingDest.seoDescription || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 focus:border-[#064E3B] focus:outline-none"
                    placeholder="Description for search engines..."
                  />
                </div>

                {/* Toggles: Featured & Taxi Availability */}
                <div className="flex items-center gap-2">
                  <input
                    id="dest-active-toggle"
                    type="checkbox"
                    checked={editingDest.taxiAvailable}
                    onChange={(e) => setEditingDest({ ...editingDest, taxiAvailable: e.target.checked })}
                    className="rounded text-emerald-800 focus:ring-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="dest-active-toggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Taxi Booking Available
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="dest-featured-toggle"
                    type="checkbox"
                    checked={!!editingDest.featured}
                    onChange={(e) => setEditingDest({ ...editingDest, featured: e.target.checked })}
                    className="rounded text-emerald-800 focus:ring-emerald-600 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="dest-featured-toggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Featured Destination (Highlighted)
                  </label>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
