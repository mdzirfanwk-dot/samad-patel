import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API client to prevent startup crashes when API key is not configured
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// -------------------------------------------------------------
// Real-time Location Exchange Data Model & Store
// -------------------------------------------------------------
export interface LocationPoint {
  lat: number;
  lng: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
  updatedAt: number;
  address?: string;
}

export interface RideSession {
  id: string;
  bookerName: string;
  bookerPhone: string;
  pickupLocationName: string;
  dropLocationName: string;
  vehicleType: string;
  taxiNumber: string;
  driverName: string;
  driverPhone: string;
  status: "dispatched" | "en_route" | "arrived" | "in_progress" | "completed";
  bookerLocation?: LocationPoint;
  driverLocation?: LocationPoint;
  distanceKm?: number;
  etaMinutes?: number;
  createdAt: number;
  lastUpdated: number;
}

// Calculate Haversine distance in kilometers
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Estimate driving time in hilly ghat roads (avg ~25-30 km/h)
function estimateDrivingTime(distanceKm: number): number {
  const avgSpeedKmh = 25;
  const minutes = Math.round((distanceKm / avgSpeedKmh) * 60);
  return Math.max(1, minutes);
}

// In-memory active live ride tracking sessions
const ridesStore = new Map<string, RideSession>();

// Seed default active ride for Mahabaleshwar to Garden Ice Cream Restaurant
const defaultRideId = "RIDE-MB-701";
ridesStore.set(defaultRideId, {
  id: defaultRideId,
  bookerName: "Rahul Sharma",
  bookerPhone: "+91 98201 45678",
  pickupLocationName: "Mahabaleshwar Market (Near Bus Station)",
  dropLocationName: "Garden Ice Cream Restaurant, Lingmala",
  vehicleType: "Sedan (Maruti Dzire AC)",
  taxiNumber: "MH-11-BV-4821",
  driverName: "Santosh Kadam",
  driverPhone: "+91 89990 61316",
  status: "en_route",
  bookerLocation: {
    lat: 17.9237,
    lng: 73.6586,
    accuracy: 8,
    heading: 45,
    speed: 0,
    updatedAt: Date.now() - 15000,
    address: "Mahabaleshwar Central Market, Main Road"
  },
  driverLocation: {
    lat: 17.9312,
    lng: 73.6725,
    accuracy: 5,
    heading: 260,
    speed: 28,
    updatedAt: Date.now() - 5000,
    address: "Panchgani - Mahabaleshwar Road, approaching Lingmala"
  },
  distanceKm: 2.1,
  etaMinutes: 5,
  createdAt: Date.now() - 600000,
  lastUpdated: Date.now()
});

// Seed second demo ride for Table Land Panchgani to Mahabaleshwar
const secondRideId = "RIDE-MB-802";
ridesStore.set(secondRideId, {
  id: secondRideId,
  bookerName: "Pooja Deshmukh",
  bookerPhone: "+91 97654 32109",
  pickupLocationName: "Garden Ice Cream Restaurant, Lingmala",
  dropLocationName: "Arthur's Seat Vista Point",
  vehicleType: "SUV (Innova Crysta AC)",
  taxiNumber: "MH-11-CG-9944",
  driverName: "Vikas More",
  driverPhone: "+91 89990 61316",
  status: "in_progress",
  bookerLocation: {
    lat: 17.9333,
    lng: 73.6811,
    accuracy: 6,
    updatedAt: Date.now() - 10000,
    address: "Garden Ice Cream Restaurant, Lingmala Road"
  },
  driverLocation: {
    lat: 17.9341,
    lng: 73.6822,
    accuracy: 4,
    heading: 310,
    speed: 32,
    updatedAt: Date.now() - 2000,
    address: "Panchgani - Mahabaleshwar Rd, Lingmala"
  },
  distanceKm: 11.4,
  etaMinutes: 24,
  createdAt: Date.now() - 1200000,
  lastUpdated: Date.now()
});

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Mahabaleshwar Taxi Real-Time Location & Maps Service",
    timestamp: Date.now()
  });
});

// 2. List all active rides
app.get("/api/rides", (_req, res) => {
  const rides = Array.from(ridesStore.values()).sort(
    (a, b) => b.lastUpdated - a.lastUpdated
  );
  res.json({ rides });
});

// 3. Create a new live tracking ride session
app.post("/api/rides/create", (req, res) => {
  const {
    bookerName = "Guest Traveler",
    bookerPhone = "+91 89990 61316",
    pickupLocationName = "Current Location",
    dropLocationName = "Garden Ice Cream Restaurant, Lingmala",
    vehicleType = "Sedan (Maruti Dzire AC)",
    bookerLat,
    bookerLng
  } = req.body;

  const id = `RIDE-${Date.now().toString(36).toUpperCase()}`;
  const now = Date.now();

  const newRide: RideSession = {
    id,
    bookerName,
    bookerPhone,
    pickupLocationName,
    dropLocationName,
    vehicleType,
    taxiNumber: `MH-11-${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 8999)}`,
    driverName: "Sachin Shinde",
    driverPhone: "+91 89990 61316",
    status: "dispatched",
    bookerLocation:
      bookerLat && bookerLng
        ? {
            lat: Number(bookerLat),
            lng: Number(bookerLng),
            updatedAt: now,
            address: pickupLocationName
          }
        : {
            lat: 17.9237,
            lng: 73.6586,
            updatedAt: now,
            address: "Mahabaleshwar Market"
          },
    driverLocation: {
      lat: 17.9388,
      lng: 73.6881,
      accuracy: 10,
      heading: 240,
      speed: 30,
      updatedAt: now,
      address: "En route via Mahabaleshwar - Panchgani Road"
    },
    distanceKm: 3.5,
    etaMinutes: 8,
    createdAt: now,
    lastUpdated: now
  };

  ridesStore.set(id, newRide);
  res.status(201).json({ success: true, ride: newRide });
});

// 4. Get specific ride session by ID
app.get("/api/rides/:id", (req, res) => {
  const ride = ridesStore.get(req.params.id);
  if (!ride) {
    return res.status(404).json({ error: "Ride session not found" });
  }
  res.json({ ride });
});

// 5. Update real-time location (from Booker or Taxi Driver)
app.post("/api/rides/:id/location", (req, res) => {
  const ride = ridesStore.get(req.params.id);
  if (!ride) {
    return res.status(404).json({ error: "Ride session not found" });
  }

  const { role, lat, lng, accuracy, heading, speed, address, status } = req.body;

  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "Valid lat and lng numbers are required" });
  }

  const locationPoint: LocationPoint = {
    lat,
    lng,
    accuracy: typeof accuracy === "number" ? accuracy : undefined,
    heading: typeof heading === "number" ? heading : undefined,
    speed: typeof speed === "number" ? speed : undefined,
    address: address || undefined,
    updatedAt: Date.now()
  };

  if (role === "booker") {
    ride.bookerLocation = locationPoint;
  } else if (role === "driver") {
    ride.driverLocation = locationPoint;
  } else {
    return res.status(400).json({ error: "Role must be 'booker' or 'driver'" });
  }

  if (status) {
    ride.status = status;
  }

  // Recalculate distance and ETA if both positions exist
  if (ride.bookerLocation && ride.driverLocation) {
    const dist = calculateDistanceKm(
      ride.driverLocation.lat,
      ride.driverLocation.lng,
      ride.bookerLocation.lat,
      ride.bookerLocation.lng
    );
    ride.distanceKm = dist;
    ride.etaMinutes = estimateDrivingTime(dist);
    if (dist < 0.1 && ride.status === "en_route") {
      ride.status = "arrived";
    }
  }

  ride.lastUpdated = Date.now();
  ridesStore.set(ride.id, ride);

  res.json({
    success: true,
    ride,
    exchangeInfo: {
      senderRole: role,
      distanceKm: ride.distanceKm,
      etaMinutes: ride.etaMinutes,
      googleMapsNavigationUrl:
        ride.driverLocation && ride.bookerLocation
          ? `https://www.google.com/maps/dir/?api=1&origin=${ride.driverLocation.lat},${ride.driverLocation.lng}&destination=${ride.bookerLocation.lat},${ride.bookerLocation.lng}&travelmode=driving`
          : undefined
    }
  });
});

// 6. Gemini Google Maps Grounding Endpoint
// Access real-time geographical and place information on Google Maps using gemini-3.8-flash
app.post("/api/maps-grounding", async (req, res) => {
  const { query, lat, lng, destination } = req.body;

  const searchQuery =
    query ||
    (destination
      ? `Provide real-time location details, driving route conditions, live visitor tips, and verified Google Maps place info for ${destination} in Mahabaleshwar.`
      : "Provide real-time location, travel directions, traffic updates, and popular stops between Mahabaleshwar Market, Lingmala Garden Ice Cream Restaurant, and viewpoints.");

  const ai = getAiClient();

  if (!ai) {
    // If GEMINI_API_KEY is not configured, provide a rich, structured fallback response
    return res.json({
      text: `### Real-Time Location & Place Information for ${destination || "Mahabaleshwar"}\n\n` +
        `* **Verified Location**: Located along Panchgani - Mahabaleshwar Road, Satara District, Maharashtra.\n` +
        `* **Live Road & Traffic Status**: Winding hill roads are clear with smooth movement. Watch for morning and evening mist around high-altitude viewpoints.\n` +
        `* **Official Food & Tourist Stop**: Garden Ice Cream Restaurant in Lingmala is open with fresh strawberry desserts, pure vegetarian snacks, and ample customer taxi parking.\n` +
        `* **Navigation Tip**: Always keep headlights on low beam during fog and share live location with your driver for accurate pickup.`,
      groundingChunks: [
        {
          maps: {
            title: destination || "Garden Ice Cream Restaurant, Lingmala, Mahabaleshwar",
            uri: "https://www.google.com/maps/search/?api=1&query=Garden+Ice+Cream+Restaurant+Lingmala+Mahabaleshwar"
          }
        },
        {
          maps: {
            title: "Mahabaleshwar Taxi Stand & Viewpoints",
            uri: "https://www.google.com/maps/search/?api=1&query=Mahabaleshwar+Taxi+Stand+Maharashtra"
          }
        }
      ],
      isSimulated: true
    });
  }

  try {
    const config: any = {
      tools: [{ googleMaps: {} }]
    };

    // Pass user latitude & longitude to Google Maps retrieval tool if provided
    if (typeof lat === "number" && typeof lng === "number") {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `You are the AI Local Travel & Location Assistant for Mahabaleshwar Taxi Service.
Respond with up-to-date, accurate real-time location details, Google Maps directions, traffic tips, and place highlights for:
"${searchQuery}"
Keep your response concise, helpful for taxi passengers and drivers, highlighting exact landmarks, driving conditions, and opening hours where relevant.`,
      config
    });

    const text = response.text || "No response received from Google Maps grounding.";
    const chunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Format grounding links according to skill requirements:
    // "If Google Maps is used, you MUST ALWAYS extract the URLs from groundingChunks and list them on the web app as links."
    res.json({
      text,
      groundingChunks: chunks,
      isSimulated: false
    });
  } catch (error: any) {
    console.error("Gemini Maps Grounding Error:", error);
    // Graceful fallback with informative guidance
    res.json({
      text: `### Real-Time Location Update for ${destination || "Mahabaleshwar Sightseeing"}\n\n` +
        `* **Route Status**: Typical mountain ghat road driving time between Mahabaleshwar and Lingmala is 8-12 minutes.\n` +
        `* **Pickup Guidance**: Booker and driver live coordinates are actively synced on the live tracking map.\n` +
        `* **Key Landmark**: Garden Ice Cream Restaurant on Lingmala Road provides dedicated taxi waiting and passenger pickup.`,
      groundingChunks: [
        {
          maps: {
            title: destination || "Garden Ice Cream Restaurant Mahabaleshwar",
            uri: "https://www.google.com/maps/search/?api=1&query=Garden+Ice+Cream+Restaurant+Lingmala+Mahabaleshwar"
          }
        }
      ],
      error: error?.message || "Google Maps Grounding API currently unavailable",
      isSimulated: true
    });
  }
});

// -------------------------------------------------------------
// Vite Server Setup (Development) & Static Serving (Production)
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
