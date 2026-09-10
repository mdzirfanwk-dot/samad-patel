/**
 * Central Business Configuration
 * Source of Truth for Mahabaleshwar wala Tours and Travel
 * Strict adherence to verified business details.
 */

export interface BusinessConfig {
  name: string;
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  coreMessage: string;
  supportingLine: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  address: string;
  addressShort: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  category: string;
  googleRating: number;
  googleReviewCount: number;
  availability: string;
  googleMapsUrl: string;
  googleReviewsUrl: string;
  // Editable placeholders for unverified fields
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  youtube: string;
  currency: string;
}

export const businessConfig: BusinessConfig = {
  name: "Mahabaleshwar wala Tours and Travel",
  brandName: "MAHABALESHWAR WALA",
  brandSubtitle: "Tours & Travels",
  tagline: "Your Local Travel Partner in Mahabaleshwar",
  coreMessage: "Explore Mahabaleshwar Comfortably. Travel with Local Experts.",
  supportingLine: "Comfortable local travel, sightseeing and customised journeys around Mahabaleshwar and beyond.",
  phone: "+91 89990 61316",
  phoneRaw: "+918999061316",
  whatsapp: "918999061316",
  address: "Opposite to Brightland Resort, Nakinda, Mahabaleshwar, Maharashtra 412806, India",
  addressShort: "Opposite to Brightland Resort, Nakinda, Mahabaleshwar",
  city: "Mahabaleshwar",
  state: "Maharashtra",
  country: "India",
  pincode: "412806",
  category: "Car leasing service",
  googleRating: 5.0,
  googleReviewCount: 13,
  availability: "Open 24 Hours",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Opposite+to+Brightland+Resort+Nakinda+Mahabaleshwar+Maharashtra+412806",
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Mahabaleshwar+wala+Tours+and+Travel+Nakinda",
  // Editable placeholders
  email: "",
  website: "",
  instagram: "",
  facebook: "",
  youtube: "",
  currency: "INR"
};
