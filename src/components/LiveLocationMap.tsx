import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Navigation, Compass, ExternalLink, MapPin, Car, Crosshair, Layers } from "lucide-react";
import { LocationPoint, RideSession } from "../types/tracking";

interface LiveLocationMapProps {
  ride: RideSession;
  activeRole: "booker" | "driver";
  onRecenter?: () => void;
}

export const LiveLocationMap: React.FC<LiveLocationMapProps> = ({
  ride,
  activeRole
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const bookerMarkerRef = useRef<L.Marker | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const [mapType, setMapType] = useState<"streets" | "terrain">("streets");

  // Create SVG custom icon for Booker (Passenger)
  const createBookerIcon = (label: string) => {
    return L.divIcon({
      className: "custom-booker-pin",
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="absolute w-12 h-12 rounded-full bg-emerald-500/20 animate-ping"></div>
          <div class="absolute w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-400"></div>
          <div class="relative w-7 h-7 rounded-full bg-[#064E3B] text-[#D4A853] flex items-center justify-center shadow-lg border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="absolute top-8 px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-bold whitespace-nowrap shadow-md border border-slate-700 pointer-events-none">
            📍 Booker: ${label}
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  };

  // Create SVG custom icon for Taxi (Driver)
  const createDriverIcon = (taxiNumber: string, heading: number = 0) => {
    return L.divIcon({
      className: "custom-driver-pin",
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div class="absolute w-14 h-14 rounded-full bg-[#D4A853]/25 animate-pulse"></div>
          <div class="relative w-8 h-8 rounded-xl bg-[#D4A853] text-slate-950 flex items-center justify-center shadow-xl border-2 border-slate-900 transition-transform duration-500" style="transform: rotate(${heading}deg);">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <path d="M9 17h6"></path>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
          </div>
          <div class="absolute top-9 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-extrabold whitespace-nowrap shadow-md border border-slate-900 pointer-events-none">
            🚕 ${taxiNumber}
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const defaultCenter: [number, number] = [
        ride.driverLocation?.lat || 17.9312,
        ride.driverLocation?.lng || 73.6725
      ];

      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 14,
        zoomControl: false
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Tile layer: High-quality OpenStreetMap carto
      const tileUrl =
        mapType === "terrain"
          ? "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & Google Maps navigation',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep instance alive during re-renders to prevent flickering
    };
  }, [mapType]);

  // Update Markers & Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const bLoc = ride.bookerLocation;
    const dLoc = ride.driverLocation;

    // 1. Booker Marker
    if (bLoc) {
      const bLatLng: [number, number] = [bLoc.lat, bLoc.lng];
      if (!bookerMarkerRef.current) {
        bookerMarkerRef.current = L.marker(bLatLng, {
          icon: createBookerIcon(ride.bookerName.split(" ")[0])
        })
          .addTo(map)
          .bindPopup(`
            <div class="p-2 text-xs">
              <strong class="text-emerald-800 text-sm block mb-1">📍 Passenger Pickup</strong>
              <p class="font-medium">${ride.bookerName}</p>
              <p class="text-slate-500">${bLoc.address || ride.pickupLocationName}</p>
              <p class="text-[10px] text-slate-400 mt-1">GPS: ${bLoc.lat.toFixed(5)}, ${bLoc.lng.toFixed(5)}</p>
            </div>
          `);
      } else {
        bookerMarkerRef.current.setLatLng(bLatLng);
        bookerMarkerRef.current.setIcon(createBookerIcon(ride.bookerName.split(" ")[0]));
      }
    }

    // 2. Driver Marker
    if (dLoc) {
      const dLatLng: [number, number] = [dLoc.lat, dLoc.lng];
      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker(dLatLng, {
          icon: createDriverIcon(ride.taxiNumber, dLoc.heading || 0)
        })
          .addTo(map)
          .bindPopup(`
            <div class="p-2 text-xs">
              <strong class="text-amber-800 text-sm block mb-1">🚕 Assigned Taxi</strong>
              <p class="font-medium">${ride.driverName} (${ride.vehicleType})</p>
              <p class="text-slate-600 font-bold">${ride.taxiNumber}</p>
              <p class="text-slate-500">${dLoc.address || "En route"}</p>
              <p class="text-[10px] text-slate-400 mt-1">Speed: ${dLoc.speed ? `${Math.round(dLoc.speed)} km/h` : "Live"}</p>
            </div>
          `);
      } else {
        driverMarkerRef.current.setLatLng(dLatLng);
        driverMarkerRef.current.setIcon(createDriverIcon(ride.taxiNumber, dLoc.heading || 0));
      }
    }

    // 3. Polyline between Booker and Driver
    if (bLoc && dLoc) {
      const latlngs: [number, number][] = [
        [dLoc.lat, dLoc.lng],
        [bLoc.lat, bLoc.lng]
      ];

      if (!routeLineRef.current) {
        routeLineRef.current = L.polyline(latlngs, {
          color: "#064E3B",
          weight: 4,
          opacity: 0.85,
          dashArray: "8, 8",
          lineCap: "round"
        }).addTo(map);
      } else {
        routeLineRef.current.setLatLngs(latlngs);
      }
    }
  }, [ride]);

  // Fit bounds to show both locations
  const handleFitBounds = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const points: [number, number][] = [];
    if (ride.bookerLocation) {
      points.push([ride.bookerLocation.lat, ride.bookerLocation.lng]);
    }
    if (ride.driverLocation) {
      points.push([ride.driverLocation.lat, ride.driverLocation.lng]);
    }

    if (points.length >= 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    } else if (points.length === 1) {
      map.setView(points[0], 15);
    }
  };

  const googleMapsDirectionsUrl =
    ride.driverLocation && ride.bookerLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${ride.driverLocation.lat},${ride.driverLocation.lng}&destination=${ride.bookerLocation.lat},${ride.bookerLocation.lng}&travelmode=driving`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ride.pickupLocationName || "Mahabaleshwar")}`;

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
      {/* The Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Telemetry Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Distance & ETA Live Pill */}
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-[#D4A853] flex items-center justify-center font-bold">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Live Ride Proximity
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-sm font-bold flex items-center gap-2 text-white">
              <span>{ride.distanceKm !== undefined ? `${ride.distanceKm} km away` : "Calculating..."}</span>
              <span className="text-white/40">•</span>
              <span className="text-[#D4A853]">
                {ride.etaMinutes !== undefined ? `~${ride.etaMinutes} mins ETA` : "Estimating..."}
              </span>
            </div>
          </div>
        </div>

        {/* Controls & Quick Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Fit Bounds Button */}
          <button
            type="button"
            onClick={handleFitBounds}
            title="Fit Both Locations on Screen"
            className="px-3.5 py-2 bg-white/95 backdrop-blur-md text-slate-800 hover:text-emerald-800 hover:bg-white text-xs font-bold rounded-xl shadow-lg border border-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Crosshair className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Fit Route</span>
          </button>

          {/* Open Turn-by-Turn in Google Maps */}
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition-colors border border-emerald-600"
          >
            <Navigation className="w-4 h-4 text-[#D4A853]" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 text-white/70" />
          </a>
        </div>
      </div>

      {/* Bottom Floating Legend & Exchange Status */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs flex items-center gap-4 text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#064E3B] border-2 border-white shadow-sm inline-block" />
            <span>Booker: <strong className="text-slate-900">{ride.bookerName}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#D4A853] border-2 border-slate-900 shadow-sm inline-block" />
            <span>Taxi: <strong className="text-slate-900">{ride.taxiNumber}</strong></span>
          </div>
        </div>

        <div className="pointer-events-auto bg-slate-900/90 text-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-medium shadow-md border border-slate-700 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Syncing real-time exchange every 3s</span>
        </div>
      </div>
    </div>
  );
};
