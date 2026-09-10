import React, { useState, useEffect, useRef } from "react";
import {
  Navigation,
  Compass,
  MapPin,
  Car,
  User,
  Share2,
  Clock,
  ShieldCheck,
  Phone,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { LiveLocationMap } from "../components/LiveLocationMap";
import { LocationExchangeControls } from "../components/LocationExchangeControls";
import { GoogleMapsGroundingPanel } from "../components/GoogleMapsGroundingPanel";
import { RideSession } from "../types/tracking";

interface LiveTrackingPageProps {
  onNavigate: (path: string) => void;
}

export const LiveTrackingPage: React.FC<LiveTrackingPageProps> = ({ onNavigate }) => {
  const [rides, setRides] = useState<RideSession[]>([]);
  const [selectedRideId, setSelectedRideId] = useState<string>("RIDE-MB-701");
  const [currentRide, setCurrentRide] = useState<RideSession | null>(null);
  const [activeRole, setActiveRole] = useState<"booker" | "driver">("booker");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form for new ride creation
  const [newBookerName, setNewBookerName] = useState("");
  const [newPickup, setNewPickup] = useState("Mahabaleshwar Market");
  const [newDrop, setNewDrop] = useState("Garden Ice Cream Restaurant, Lingmala");
  const [newVehicle, setNewVehicle] = useState("Sedan (Maruti Dzire AC)");

  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Read URL search params on mount (e.g., ?rideId=...&role=driver)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rideIdParam = params.get("rideId");
    const roleParam = params.get("role");

    if (rideIdParam) {
      setSelectedRideId(rideIdParam);
    }
    if (roleParam === "driver" || roleParam === "booker") {
      setActiveRole(roleParam);
    }
  }, []);

  // Fetch all active rides
  const fetchRides = async () => {
    try {
      const res = await fetch("/api/rides");
      if (res.ok) {
        const data = await res.json();
        setRides(data.rides || []);
        const found = (data.rides || []).find((r: RideSession) => r.id === selectedRideId);
        if (found) {
          setCurrentRide(found);
        } else if (data.rides && data.rides.length > 0) {
          setCurrentRide(data.rides[0]);
          setSelectedRideId(data.rides[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching rides:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [selectedRideId]);

  // Polling sync interval for real-time location exchange (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!selectedRideId) return;
      try {
        const res = await fetch(`/api/rides/${selectedRideId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.ride) {
            setCurrentRide(data.ride);
          }
        }
      } catch (e) {
        // Silently tolerate transient network glitches
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedRideId]);

  // Handle Location Update from Booker or Driver
  const handleLocationUpdate = async (
    role: "booker" | "driver",
    lat: number,
    lng: number,
    extra?: {
      speed?: number;
      heading?: number;
      accuracy?: number;
      address?: string;
      status?: RideSession["status"];
    }
  ) => {
    if (!currentRide) return;

    try {
      const res = await fetch(`/api/rides/${currentRide.id}/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          lat,
          lng,
          ...extra
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ride) {
          setCurrentRide(data.ride);
        }
      }
    } catch (err) {
      console.error("Failed to push location update:", err);
    }
  };

  // Handle Driver Status Change
  const handleStatusChange = async (status: RideSession["status"]) => {
    if (!currentRide || !currentRide.driverLocation) return;
    handleLocationUpdate(
      "driver",
      currentRide.driverLocation.lat,
      currentRide.driverLocation.lng,
      {
        speed: currentRide.driverLocation.speed,
        heading: currentRide.driverLocation.heading,
        status
      }
    );
  };

  // Toggle Live Simulation of Taxi Driving Toward Booker
  const handleToggleSimulation = () => {
    if (isSimulating) {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
        simulationTimerRef.current = null;
      }
      setIsSimulating(false);
    } else {
      setIsSimulating(true);
      let step = 0;
      const totalSteps = 20;

      // Start taxi from near Lingmala / Panchgani road and move towards booker in Mahabaleshwar
      const startLat = currentRide?.driverLocation?.lat || 17.9388;
      const startLng = currentRide?.driverLocation?.lng || 73.6881;
      const targetLat = currentRide?.bookerLocation?.lat || 17.9237;
      const targetLng = currentRide?.bookerLocation?.lng || 73.6586;

      simulationTimerRef.current = setInterval(() => {
        step++;
        const progress = Math.min(step / totalSteps, 1);
        const currentLat = startLat + (targetLat - startLat) * progress;
        const currentLng = startLng + (targetLng - startLng) * progress;
        const currentSpeed = progress < 1 ? 28 + Math.random() * 6 : 0;
        const currentHeading = 240 + (Math.random() * 10 - 5);

        handleLocationUpdate("driver", currentLat, currentLng, {
          speed: currentSpeed,
          heading: currentHeading,
          accuracy: 5,
          address:
            progress < 1
              ? "En route via Mahabaleshwar - Panchgani Ghat Road"
              : "Arrived at Passenger Pickup Point",
          status: progress >= 1 ? "arrived" : "en_route"
        });

        if (progress >= 1) {
          if (simulationTimerRef.current) {
            clearInterval(simulationTimerRef.current);
            simulationTimerRef.current = null;
          }
          setIsSimulating(false);
        }
      }, 2500);
    }
  };

  // Clean up simulation timer on unmount
  useEffect(() => {
    return () => {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
      }
    };
  }, []);

  // Create new Ride Tracking Session
  const handleCreateRide = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/rides/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookerName: newBookerName || "Guest Traveler",
          pickupLocationName: newPickup,
          dropLocationName: newDrop,
          vehicleType: newVehicle
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ride) {
          setRides((prev) => [data.ride, ...prev]);
          setSelectedRideId(data.ride.id);
          setCurrentRide(data.ride);
          setShowCreateModal(false);
        }
      }
    } catch (err) {
      console.error("Failed to create ride:", err);
    }
  };

  const statusBadges: Record<
    RideSession["status"],
    { bg: string; label: string }
  > = {
    dispatched: {
      bg: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Taxi Dispatched"
    },
    en_route: {
      bg: "bg-amber-100 text-amber-900 border-amber-300",
      label: "Driver En Route to Pickup"
    },
    arrived: {
      bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
      label: "Driver Arrived at Pickup"
    },
    in_progress: {
      bg: "bg-purple-100 text-purple-900 border-purple-300",
      label: "Trip in Progress"
    },
    completed: {
      bg: "bg-slate-100 text-slate-800 border-slate-300",
      label: "Trip Completed"
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#064E3B] to-[#04382A] p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#D4A853]">
              Real-Time Location Exchange
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Live Google Maps Taxi Tracking & Exchange
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
            Exchange live GPS coordinates in real-time between booker and taxi driver.
            View live route distance, estimated time of arrival, and grounded Google Maps intelligence for Mahabaleshwar.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-[#D4A853] hover:bg-[#C29541] text-slate-950 text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Live Ride</span>
          </button>
        </div>
      </div>

      {/* Ride Session Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-500">Active Live Rides:</span>
          <div className="flex flex-wrap gap-2">
            {rides.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRideId(r.id)}
                className={`text-xs font-bold py-1.5 px-3 rounded-xl transition-all border ${
                  selectedRideId === r.id
                    ? "bg-[#064E3B] text-white border-[#064E3B] shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                🚕 {r.id} ({r.bookerName.split(" ")[0]} ➔ {r.taxiNumber})
              </button>
            ))}
          </div>
        </div>

        {currentRide && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                statusBadges[currentRide.status]?.bg || "bg-slate-100 text-slate-800"
              }`}
            >
              {statusBadges[currentRide.status]?.label || currentRide.status}
            </span>
          </div>
        )}
      </div>

      {/* Main Interactive Workspace Grid */}
      {currentRide && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Interactive Live Map */}
          <div className="lg:col-span-7 space-y-6">
            <LiveLocationMap
              ride={currentRide}
              activeRole={activeRole}
            />

            {/* Ride Details Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Active Ride Itinerary & Vehicle Assignment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Pickup */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    Pickup Location
                  </span>
                  <p className="font-bold text-slate-900 text-sm">{currentRide.pickupLocationName}</p>
                  <p className="text-slate-500">
                    {currentRide.bookerLocation?.address || "Live coordinates shared"}
                  </p>
                </div>

                {/* Drop */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-amber-700" />
                    Drop Destination
                  </span>
                  <p className="font-bold text-slate-900 text-sm">{currentRide.dropLocationName}</p>
                  <p className="text-slate-500">Mahabaleshwar Sightseeing Route</p>
                </div>

                {/* Passenger Info */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-600" />
                    Passenger / Booker
                  </span>
                  <p className="font-bold text-slate-900">{currentRide.bookerName}</p>
                  <p className="text-slate-600">{currentRide.bookerPhone}</p>
                </div>

                {/* Driver Info */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-slate-600" />
                    Assigned Taxi & Driver
                  </span>
                  <p className="font-bold text-slate-900">
                    {currentRide.driverName} • <span className="text-amber-700">{currentRide.taxiNumber}</span>
                  </p>
                  <p className="text-slate-600">{currentRide.vehicleType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Location Exchange Controls & Grounding */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Location Exchange Controls */}
            <LocationExchangeControls
              ride={currentRide}
              activeRole={activeRole}
              onRoleChange={setActiveRole}
              onLocationUpdate={handleLocationUpdate}
              onStatusChange={handleStatusChange}
              isSimulating={isSimulating}
              onToggleSimulation={handleToggleSimulation}
            />

            {/* Google Maps Real-Time Grounding Panel */}
            <GoogleMapsGroundingPanel
              currentLocationName={currentRide.pickupLocationName}
              destinationName={currentRide.dropLocationName}
              lat={currentRide.driverLocation?.lat}
              lng={currentRide.driverLocation?.lng}
            />
          </div>
        </div>
      )}

      {/* Modal for Creating a New Live Ride Session */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Create Live Tracking Session
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRide} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Booker / Passenger Name</label>
                <input
                  type="text"
                  required
                  value={newBookerName}
                  onChange={(e) => setNewBookerName(e.target.value)}
                  placeholder="e.g. Aniket Sawant"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pickup Point</label>
                <input
                  type="text"
                  required
                  value={newPickup}
                  onChange={(e) => setNewPickup(e.target.value)}
                  placeholder="e.g. Mahabaleshwar Bus Stand"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Drop Destination</label>
                <input
                  type="text"
                  required
                  value={newDrop}
                  onChange={(e) => setNewDrop(e.target.value)}
                  placeholder="e.g. Garden Ice Cream Restaurant, Lingmala"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vehicle Category</label>
                <select
                  value={newVehicle}
                  onChange={(e) => setNewVehicle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                >
                  <option value="Sedan (Maruti Dzire AC)">Sedan (Maruti Dzire AC)</option>
                  <option value="SUV (Innova Crysta AC)">SUV (Innova Crysta AC)</option>
                  <option value="Hatchback (WagonR AC)">Hatchback (WagonR AC)</option>
                  <option value="Tempo Traveler (17 Seater)">Tempo Traveler (17 Seater)</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#064E3B] hover:bg-[#04382A] text-white font-bold rounded-xl shadow-md"
                >
                  Launch Live Tracking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
