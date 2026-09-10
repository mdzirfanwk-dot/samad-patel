export interface VehicleCategory {
  id: string;
  category: string;
  tagline: string;
  description: string;
  idealFor: string;
  capacityNote: string;
  image: string;
  status: string;
}

export const fleetCategories: VehicleCategory[] = [
  {
    id: "sedan",
    category: "Sedan",
    tagline: "Smooth & Comfortable",
    description: "Comfortable option for couples and small families looking for relaxed travel around local viewpoints.",
    idealFor: "Couples, solo travellers & small families (up to 4 passengers)",
    capacityNote: "Options available on request",
    image: "/assets/aistudio/sedan-maruti-dzire.jpg",
    status: "Available on request"
  },
  {
    id: "suv",
    category: "SUV",
    tagline: "Spacious & Mountain-Ready",
    description: "Suitable for families and groups needing extra space, high ground clearance, and scenic comfort on hill roads.",
    idealFor: "Families & groups with luggage (up to 6-7 passengers)",
    capacityNote: "Options available on request",
    image: "/assets/aistudio/suv-innova-crysta.jpg",
    status: "Available on request"
  },
  {
    id: "tempo-traveller",
    category: "Tempo Traveller",
    tagline: "Group Travel Together",
    description: "Ideal for larger family gatherings, wedding guests, and tour groups who prefer to journey together comfortably.",
    idealFor: "Extended families & tour groups (large capacity options)",
    capacityNote: "Options available on request",
    image: "/assets/aistudio/tempo-traveller.jpg",
    status: "Available on request"
  }
];
