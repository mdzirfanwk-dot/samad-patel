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

export interface GroundingChunkMaps {
  maps?: {
    title?: string;
    uri?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        snippet?: string;
      }>;
    };
  };
  web?: {
    title?: string;
    uri?: string;
  };
}

export interface MapsGroundingResponse {
  text: string;
  groundingChunks?: GroundingChunkMaps[];
  isSimulated?: boolean;
  error?: string;
}
