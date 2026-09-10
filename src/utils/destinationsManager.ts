import { DestinationItem, destinationsData } from "../data/destinations";

const DESTINATIONS_STORAGE_KEY = "mahabaleshwar_destinations_v2";
const BOOKINGS_STORAGE_KEY = "mahabaleshwar_bookings_log";

export interface RouteFareCalculation {
  pickup: string;
  destination: DestinationItem;
  tripType: "one-way" | "round-trip";
  vehicleCategory: "sedan" | "suv" | "tempo";
  vehicleName: string;
  distanceKm: number;
  estimatedTime: string;
  estimatedFare: number;
  oneWayFare: number;
  roundTripFare: number;
  routeHighlights: string;
  googleMapsDirectionsUrl: string;
}

export interface BookingLogEntry {
  id: string;
  timestamp: string;
  customerName?: string;
  pickup: string;
  destination: string;
  travelDate: string;
  passengers: string;
  vehicleCategory: string;
  tripType: string;
  estimatedFare?: number;
  distanceKm?: number;
  notes?: string;
  status: "New" | "Contacted" | "Confirmed" | "Completed";
}

/**
 * Retrieves all destinations, merging localStorage overrides with defaults.
 */
export function getDestinations(): DestinationItem[] {
  if (typeof window === "undefined") return destinationsData;

  try {
    const raw = localStorage.getItem(DESTINATIONS_STORAGE_KEY);
    if (!raw) return destinationsData;

    const parsed: DestinationItem[] = JSON.parse(raw);
    // Ensure verified destinations like Garden Ice Cream Restaurant are always present
    const idMap = new Map<string, DestinationItem>();
    
    // First load defaults
    for (const d of destinationsData) {
      idMap.set(d.id, d);
    }
    
    // Then overlay user/admin edits
    for (const d of parsed) {
      if (idMap.has(d.id)) {
        idMap.set(d.id, { ...idMap.get(d.id)!, ...d });
      } else {
        idMap.set(d.id, d);
      }
    }

    return Array.from(idMap.values());
  } catch (err) {
    console.warn("Error reading stored destinations:", err);
    return destinationsData;
  }
}

/**
 * Find single destination by id.
 */
export function getDestinationById(id: string): DestinationItem | undefined {
  const all = getDestinations();
  return all.find((d) => d.id === id);
}

/**
 * Save or update a destination in localStorage.
 */
export function saveDestination(updated: DestinationItem): void {
  if (typeof window === "undefined") return;

  try {
    const current = getDestinations();
    const index = current.findIndex((d) => d.id === updated.id);
    let nextList: DestinationItem[];

    if (index >= 0) {
      nextList = [...current];
      nextList[index] = updated;
    } else {
      nextList = [...current, updated];
    }

    localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(nextList));
    window.dispatchEvent(new Event("mahabaleshwar_destinations_updated"));
  } catch (err) {
    console.error("Error saving destination:", err);
  }
}

/**
 * Reset all destinations back to factory defaults.
 */
export function resetDestinations(): DestinationItem[] {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DESTINATIONS_STORAGE_KEY);
    window.dispatchEvent(new Event("mahabaleshwar_destinations_updated"));
  }
  return destinationsData;
}

/**
 * Search destinations with precision handling for "Garden", "Lingmala", etc.
 * Never returns unrelated garden businesses.
 */
export function searchDestinations(query: string, categoryFilter?: string): DestinationItem[] {
  const all = getDestinations().filter((d) => d.active);
  const q = query.trim().toLowerCase();

  return all.filter((dest) => {
    // Category filter check
    if (categoryFilter && categoryFilter !== "All") {
      if (categoryFilter === "Food & Strawberries" && !dest.category.toLowerCase().includes("restaurant") && !dest.category.toLowerCase().includes("food")) {
        return false;
      }
      if (categoryFilter === "Viewpoints" && !dest.category.toLowerCase().includes("viewpoint") && !dest.category.toLowerCase().includes("nature")) {
        return false;
      }
      if (categoryFilter === "Heritage" && !dest.category.toLowerCase().includes("fort")) {
        return false;
      }
      if (categoryFilter === "Lakes" && !dest.category.toLowerCase().includes("lake")) {
        return false;
      }
    }

    if (!q) return true;

    // Direct match against Place ID or ID
    if (dest.id.toLowerCase().includes(q) || dest.googlePlaceId.toLowerCase() === q) {
      return true;
    }

    // Name match
    if (dest.name.toLowerCase().includes(q)) {
      return true;
    }

    // Locality or Address match
    if (dest.locality.toLowerCase().includes(q) || dest.address.toLowerCase().includes(q)) {
      return true;
    }

    // Keyword match
    if (dest.searchKeywords?.some((kw) => kw.toLowerCase().includes(q) || q.includes(kw.toLowerCase()))) {
      return true;
    }

    return false;
  });
}

/**
 * Builds standard Google Maps URL from Place ID and Name
 */
export function getGoogleMapsPlaceUrl(placeId: string, name?: string): string {
  const queryParam = encodeURIComponent(name || "Garden Ice Cream Restaurant Mahabaleshwar");
  return `https://www.google.com/maps/search/?api=1&query=${queryParam}&query_place_id=${placeId}`;
}

/**
 * Builds verified Google Reviews URL for Place ID
 */
export function getGoogleReviewsUrl(placeId: string): string {
  return `https://search.google.com/local/reviews?placeid=${placeId}`;
}

/**
 * Real road distances and elevation-adjusted routes for Mahabaleshwar region.
 */
interface RoadMetrics {
  distanceKm: number;
  timeMinutes: number;
  roadName: string;
}

const DISTANCE_MATRIX: Record<string, Record<string, RoadMetrics>> = {
  "garden-ice-cream-restaurant": {
    "mahabaleshwar-market": { distanceKm: 6.2, timeMinutes: 18, roadName: "Panchgani - Mahabaleshwar Rd" },
    "brightland-nakinda": { distanceKm: 2.8, timeMinutes: 10, roadName: "Nakinda - Lingmala Link Rd" },
    "venna-lake": { distanceKm: 4.1, timeMinutes: 12, roadName: "Mahabaleshwar Road" },
    "old-mahabaleshwar": { distanceKm: 9.5, timeMinutes: 25, roadName: "Kshetra - Mahabaleshwar Rd" },
    "panchgani-tableland": { distanceKm: 13.8, timeMinutes: 30, roadName: "SH 72 (Panchgani-Mahabaleshwar Rd)" },
    "pratapgad-fort": { distanceKm: 28.5, timeMinutes: 65, roadName: "Poladpur - Mahabaleshwar Ghat Rd" },
    "tapola-lake": { distanceKm: 34.0, timeMinutes: 80, roadName: "Tapola Ghat Valley Rd" },
    "pune-airport": { distanceKm: 118.0, timeMinutes: 210, roadName: "NH 48 & Wai-Panchgani Ghat" },
    "mumbai-airport": { distanceKm: 252.0, timeMinutes: 340, roadName: "Mumbai-Pune Expressway & Surur Ghat" }
  },
  "mahabaleshwar": {
    "mahabaleshwar-market": { distanceKm: 1.5, timeMinutes: 5, roadName: "Town Central" },
    "brightland-nakinda": { distanceKm: 4.5, timeMinutes: 12, roadName: "Nakinda Road" },
    "venna-lake": { distanceKm: 2.5, timeMinutes: 8, roadName: "Mahabaleshwar Road" },
    "old-mahabaleshwar": { distanceKm: 6.0, timeMinutes: 15, roadName: "Kshetra Road" },
    "panchgani-tableland": { distanceKm: 19.0, timeMinutes: 40, roadName: "SH 72" },
    "pratapgad-fort": { distanceKm: 24.0, timeMinutes: 55, roadName: "Ghat Road" },
    "tapola-lake": { distanceKm: 28.0, timeMinutes: 65, roadName: "Tapola Road" },
    "pune-airport": { distanceKm: 124.0, timeMinutes: 220, roadName: "NH 48" },
    "mumbai-airport": { distanceKm: 258.0, timeMinutes: 350, roadName: "Expressway" }
  },
  "panchgani": {
    "mahabaleshwar-market": { distanceKm: 19.0, timeMinutes: 40, roadName: "SH 72" },
    "brightland-nakinda": { distanceKm: 15.5, timeMinutes: 32, roadName: "SH 72" },
    "venna-lake": { distanceKm: 16.5, timeMinutes: 35, roadName: "SH 72" },
    "old-mahabaleshwar": { distanceKm: 23.0, timeMinutes: 50, roadName: "SH 72" },
    "panchgani-tableland": { distanceKm: 1.8, timeMinutes: 6, roadName: "Table Land Rd" },
    "pratapgad-fort": { distanceKm: 43.0, timeMinutes: 90, roadName: "SH 72 & Pratapgad Ghat" },
    "tapola-lake": { distanceKm: 47.0, timeMinutes: 105, roadName: "Tapola Rd" },
    "pune-airport": { distanceKm: 105.0, timeMinutes: 180, roadName: "Wai Ghat & NH 48" },
    "mumbai-airport": { distanceKm: 240.0, timeMinutes: 320, roadName: "Expressway" }
  },
  "pratapgad": {
    "mahabaleshwar-market": { distanceKm: 24.0, timeMinutes: 55, roadName: "Poladpur Ghat" },
    "brightland-nakinda": { distanceKm: 26.5, timeMinutes: 60, roadName: "Poladpur Ghat" },
    "venna-lake": { distanceKm: 25.5, timeMinutes: 58, roadName: "Poladpur Ghat" },
    "old-mahabaleshwar": { distanceKm: 29.0, timeMinutes: 70, roadName: "Poladpur Ghat" },
    "panchgani-tableland": { distanceKm: 43.0, timeMinutes: 90, roadName: "SH 72 & Ghat" },
    "pratapgad-fort": { distanceKm: 1.0, timeMinutes: 5, roadName: "Fort Gate" },
    "tapola-lake": { distanceKm: 52.0, timeMinutes: 120, roadName: "Western Ghats" },
    "pune-airport": { distanceKm: 148.0, timeMinutes: 260, roadName: "NH 48" },
    "mumbai-airport": { distanceKm: 230.0, timeMinutes: 310, roadName: "Mahad - Poladpur route" }
  },
  "tapola": {
    "mahabaleshwar-market": { distanceKm: 28.0, timeMinutes: 65, roadName: "Tapola Ghat Rd" },
    "brightland-nakinda": { distanceKm: 31.0, timeMinutes: 72, roadName: "Tapola Ghat Rd" },
    "venna-lake": { distanceKm: 29.5, timeMinutes: 68, roadName: "Tapola Ghat Rd" },
    "old-mahabaleshwar": { distanceKm: 33.0, timeMinutes: 78, roadName: "Tapola Ghat Rd" },
    "panchgani-tableland": { distanceKm: 47.0, timeMinutes: 105, roadName: "Tapola & SH 72" },
    "pratapgad-fort": { distanceKm: 52.0, timeMinutes: 120, roadName: "Western Ghats" },
    "tapola-lake": { distanceKm: 1.0, timeMinutes: 5, roadName: "Shivsagar Jetty" },
    "pune-airport": { distanceKm: 152.0, timeMinutes: 270, roadName: "NH 48" },
    "mumbai-airport": { distanceKm: 285.0, timeMinutes: 400, roadName: "Expressway" }
  }
};

/**
 * Standard pickup hub identifier normalization
 */
export function normalizePickupKey(pickup: string): string {
  const p = pickup.toLowerCase().trim();
  if (p.includes("brightland") || p.includes("nakinda")) return "brightland-nakinda";
  if (p.includes("venna")) return "venna-lake";
  if (p.includes("old") || p.includes("kshetra") || p.includes("temple")) return "old-mahabaleshwar";
  if (p.includes("panchgani") || p.includes("table")) return "panchgani-tableland";
  if (p.includes("pratapgad")) return "pratapgad-fort";
  if (p.includes("tapola")) return "tapola-lake";
  if (p.includes("pune")) return "pune-airport";
  if (p.includes("mumbai")) return "mumbai-airport";
  return "mahabaleshwar-market";
}

/**
 * Calculates taxi route, distance, travel time, and fare
 */
export function calculateTaxiRoute(params: {
  pickup: string;
  destinationId: string;
  tripType?: "one-way" | "round-trip";
  vehicleCategory?: "sedan" | "suv" | "tempo";
}): RouteFareCalculation {
  const destination = getDestinationById(params.destinationId) || getDestinationById("garden-ice-cream-restaurant")!;
  const pickupNormalized = normalizePickupKey(params.pickup || "Mahabaleshwar Market");
  const tripType = params.tripType || "one-way";
  const vehicleCategory = params.vehicleCategory || "sedan";

  // Look up distance matrix
  const destMetrics = DISTANCE_MATRIX[destination.id] || DISTANCE_MATRIX["garden-ice-cream-restaurant"];
  const metrics = destMetrics[pickupNormalized] || {
    distanceKm: 7.5,
    timeMinutes: 20,
    roadName: "Scenic Mountain Road"
  };

  const distanceKm = metrics.distanceKm;
  const timeMinutes = metrics.timeMinutes;

  // Time format
  let estimatedTime = `${timeMinutes} - ${timeMinutes + 8} mins`;
  if (timeMinutes >= 120) {
    const hrs = (timeMinutes / 60).toFixed(1);
    estimatedTime = `Approx ${hrs} hours`;
  }

  // Calculate realistic taxi fares
  const pricingRules = destination.pricingRules || {
    oneWay: { sedan: 500, suv: 800, tempo: 1500 },
    roundTrip: { sedan: 900, suv: 1400, tempo: 2500 }
  };

  let oneWayBase = pricingRules.oneWay[vehicleCategory];
  let roundTripBase = pricingRules.roundTrip[vehicleCategory];

  // If long distance (outstation like Pune or Mumbai), calculate based on mountain per-km rates
  if (distanceKm > 50) {
    const perKmRate = vehicleCategory === "sedan" ? 14 : vehicleCategory === "suv" ? 19 : 32;
    oneWayBase = Math.round(distanceKm * perKmRate);
    roundTripBase = Math.round(distanceKm * 1.8 * perKmRate);
  }

  const estimatedFare = tripType === "round-trip" ? roundTripBase : oneWayBase;

  const vehicleNameMap = {
    sedan: "Sedan (Maruti Dzire / Toyota Etios • 4 Seats)",
    suv: "Prime SUV (Maruti Ertiga / Toyota Innova • 6-7 Seats)",
    tempo: "Tempo Traveller (Luxury AC • 12-17 Seats)"
  };

  const directionsQuery = encodeURIComponent(destination.address);
  const pickupQuery = encodeURIComponent(params.pickup.trim() || "Mahabaleshwar");
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pickupQuery}&destination=${directionsQuery}&destination_place_id=${destination.googlePlaceId}`;

  return {
    pickup: params.pickup.trim() || "Mahabaleshwar Market / Hotel",
    destination,
    tripType,
    vehicleCategory,
    vehicleName: vehicleNameMap[vehicleCategory],
    distanceKm,
    estimatedTime,
    estimatedFare,
    oneWayFare: oneWayBase,
    roundTripFare: roundTripBase,
    routeHighlights: `Via ${metrics.roadName}. Real mountain driving conditions calculated.`,
    googleMapsDirectionsUrl
  };
}

/**
 * Log new booking enquiry for admin audit
 */
export function logBookingEnquiry(booking: Omit<BookingLogEntry, "id" | "timestamp" | "status">): BookingLogEntry {
  const newEntry: BookingLogEntry = {
    ...booking,
    id: `BK-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    status: "New"
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getBookings();
      const updated = [newEntry, ...existing.slice(0, 49)];
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("mahabaleshwar_bookings_updated"));
    } catch (err) {
      console.warn("Could not write booking log:", err);
    }
  }

  return newEntry;
}

/**
 * Retrieve all booking log entries
 */
export function getBookings(): BookingLogEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Could not parse bookings log:", err);
    return [];
  }
}

/**
 * Update booking status in admin log
 */
export function updateBookingStatus(id: string, status: BookingLogEntry["status"]): void {
  if (typeof window === "undefined") return;

  try {
    const bookings = getBookings();
    const idx = bookings.findIndex((b) => b.id === id);
    if (idx >= 0) {
      bookings[idx].status = status;
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
      window.dispatchEvent(new Event("mahabaleshwar_bookings_updated"));
    }
  } catch (err) {
    console.warn("Error updating booking status:", err);
  }
}

/**
 * Clear bookings log
 */
export function clearBookings(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    window.dispatchEvent(new Event("mahabaleshwar_bookings_updated"));
  }
}
