import React, { useState, useEffect } from "react";
import {
  Share2,
  Phone,
  Car,
  User,
  Navigation,
  Compass,
  CheckCircle2,
  RefreshCw,
  Copy,
  AlertCircle,
  Play,
  RotateCcw
} from "lucide-react";
import { RideSession } from "../types/tracking";

interface LocationExchangeControlsProps {
  ride: RideSession;
  activeRole: "booker" | "driver";
  onRoleChange: (role: "booker" | "driver") => void;
  onLocationUpdate: (
    role: "booker" | "driver",
    lat: number,
    lng: number,
    extra?: { speed?: number; heading?: number; accuracy?: number; address?: string; status?: RideSession["status"] }
  ) => void;
  onStatusChange: (status: RideSession["status"]) => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export const LocationExchangeControls: React.FC<LocationExchangeControlsProps> = ({
  ride,
  activeRole,
  onRoleChange,
  onLocationUpdate,
  onStatusChange,
  isSimulating,
  onToggleSimulation
}) => {
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  // Request browser GPS position and stream to ride session
  const startLiveGps = () => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser/device.");
      return;
    }

    setGpsError(null);
    setIsGpsActive(true);

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy, heading, speed } = position.coords;
        onLocationUpdate(activeRole, latitude, longitude, {
          accuracy: accuracy || 10,
          heading: heading || 0,
          speed: speed ? speed * 3.6 : 0, // convert m/s to km/h
          address: `Live GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        });
      },
      (error) => {
        console.warn("GPS watchPosition error:", error);
        setGpsError(error.message || "Unable to retrieve GPS coordinates");
        setIsGpsActive(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 2000
      }
    );

    setWatchId(id);
  };

  const stopLiveGps = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsGpsActive(false);
  };

  // Cleanup watcher on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const handleCopyShareLink = () => {
    const url = `${window.location.origin}/live-tracking?rideId=${ride.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const shareToWhatsApp = () => {
    const trackingUrl = `${window.location.origin}/live-tracking?rideId=${ride.id}`;
    const message = `🚕 *Live Taxi Tracking - Mahabaleshwar Tours*\n\nRide ID: ${ride.id}\nVehicle: ${ride.vehicleType} (${ride.taxiNumber})\nPickup: ${ride.pickupLocationName}\nDestination: ${ride.dropLocationName}\n\nTrack our live location in real-time on Google Maps:\n${trackingUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const currentRoleLocation =
    activeRole === "booker" ? ride.bookerLocation : ride.driverLocation;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 space-y-6">
      {/* Role Switcher Tabs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Current Device Role for Location Exchange:
          </label>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {activeRole === "booker" ? "Passenger Mode" : "Driver Mode"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              stopLiveGps();
              onRoleChange("booker");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              activeRole === "booker"
                ? "bg-white text-[#064E3B] shadow-md border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span>I am the Booker</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopLiveGps();
              onRoleChange("driver");
            }}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              activeRole === "driver"
                ? "bg-white text-slate-950 shadow-md border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Car className="w-4 h-4 text-amber-600" />
            <span>I am the Taxi Driver</span>
          </button>
        </div>
      </div>

      {/* Real-time Exchange Telemetry Card */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 p-4 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isGpsActive ? "bg-emerald-500 animate-ping" : "bg-amber-500"
              }`}
            />
            <h4 className="text-sm font-bold text-slate-900">
              {activeRole === "booker"
                ? `Booker: ${ride.bookerName}`
                : `Driver: ${ride.driverName} (${ride.taxiNumber})`}
            </h4>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-500">
              {currentRoleLocation?.updatedAt
                ? `Last Ping: ${Math.round((Date.now() - currentRoleLocation.updatedAt) / 1000)}s ago`
                : "Awaiting ping"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">
              Latitude / Longitude
            </span>
            <span className="font-mono font-bold text-slate-800 text-[11px]">
              {currentRoleLocation?.lat.toFixed(5)}, {currentRoleLocation?.lng.toFixed(5)}
            </span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">
              Accuracy / Proximity
            </span>
            <span className="font-bold text-slate-800">
              {currentRoleLocation?.accuracy
                ? `±${Math.round(currentRoleLocation.accuracy)} meters`
                : "High Precision"}
            </span>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">
              Movement Speed
            </span>
            <span className="font-bold text-emerald-700">
              {currentRoleLocation?.speed && currentRoleLocation.speed > 0
                ? `${Math.round(currentRoleLocation.speed)} km/h`
                : "Stationary / Waiting"}
            </span>
          </div>
        </div>

        {/* Live GPS Broadcast Button */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {!isGpsActive ? (
            <button
              type="button"
              onClick={startLiveGps}
              className="flex-1 px-4 py-2.5 bg-[#064E3B] hover:bg-[#04382A] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#D4A853]" />
              <span>Broadcast My Real-Time Device GPS</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopLiveGps}
              className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Stop GPS Broadcast (Broadcasting Active)</span>
            </button>
          )}

          {/* Simulate Movement Toggle */}
          <button
            type="button"
            onClick={onToggleSimulation}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl border shadow-sm flex items-center gap-1.5 transition-colors ${
              isSimulating
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
            title="Simulates realistic taxi en-route movement with real-time ETA updates"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? "fill-amber-600 text-amber-600" : ""}`} />
            <span>{isSimulating ? "Pause Simulation" : "Simulate Taxi En Route"}</span>
          </button>
        </div>

        {gpsError && (
          <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-2 border border-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{gpsError} (Simulated tracking continues to function seamlessly)</span>
          </div>
        )}
      </div>

      {/* Driver-Specific Controls */}
      {activeRole === "driver" && (
        <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <Car className="w-4 h-4 text-amber-700" />
              Driver Trip Status Controls
            </h5>
            <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-amber-200">
              Status: {ride.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                { id: "dispatched", label: "Dispatched" },
                { id: "en_route", label: "En Route" },
                { id: "arrived", label: "At Pickup" },
                { id: "in_progress", label: "On Trip" }
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onStatusChange(s.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                  ride.status === s.id
                    ? "bg-[#064E3B] text-white border-[#064E3B] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Turn-by-Turn Navigation to Booker */}
          {ride.bookerLocation && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${ride.bookerLocation.lat},${ride.bookerLocation.lng}&travelmode=driving`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors border border-amber-400"
            >
              <Navigation className="w-4 h-4 fill-slate-950" />
              <span>Launch Turn-by-Turn Navigation to Booker in Google Maps</span>
            </a>
          )}
        </div>
      )}

      {/* Booker-Specific Quick Actions */}
      {activeRole === "booker" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`tel:${ride.driverPhone.replace(/\s+/g, "")}`}
            className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] font-bold text-xs rounded-2xl border border-emerald-200 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Call Driver ({ride.driverName})</span>
          </a>

          <button
            type="button"
            onClick={shareToWhatsApp}
            className="py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs rounded-2xl border border-[#25D366]/30 flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4 text-[#25D366]" />
            <span>Share Live Taxi Tracking on WhatsApp</span>
          </button>
        </div>
      )}

      {/* Shareable Link Box */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
        <span className="truncate">
          Live Session ID: <strong className="text-slate-800">{ride.id}</strong>
        </span>

        <button
          type="button"
          onClick={handleCopyShareLink}
          className="shrink-0 text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          {copiedLink ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied Link!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Tracking Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
