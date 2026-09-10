export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
  iconName: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "local-sightseeing",
    title: "Local Sightseeing",
    description: "Explore Mahabaleshwar’s famous viewpoints, lakes, and scenic hilltop attractions at your own relaxed pace.",
    badge: "Most Popular",
    iconName: "Compass",
    image: "/assets/aistudio/needle-hole-point.jpg"
  },
  {
    id: "panchgani-trips",
    title: "Panchgani Trips",
    description: "Enjoy scenic Panchgani, table lands, panoramic viewpoints, and surrounding lush mountain attractions.",
    badge: "Scenic Excursion",
    iconName: "Mountain",
    image: "/assets/aistudio/table-land.jpg"
  },
  {
    id: "pratapgad-tours",
    title: "Pratapgad Tours",
    description: "Plan a comfortable visit to the historic Pratapgad Fort region with breathtaking Western Ghats views.",
    badge: "Heritage Tour",
    iconName: "Shield",
    image: "/assets/aistudio/pratapgad-fort.jpg"
  },
  {
    id: "tapola-trips",
    title: "Tapola Trips",
    description: "Discover peaceful lakeside landscapes, Shivsagar waters, and the serene countryside around Tapola.",
    badge: "Lakeside Escape",
    iconName: "Waves",
    image: "/assets/aistudio/shivasagar-tapola.jpg"
  },
  {
    id: "airport-transfers",
    title: "Airport Transfers",
    description: "Pre-book travel between Mahabaleshwar and your airport destination (Pune / Mumbai) with comfortable pickup.",
    badge: "On Request",
    iconName: "Plane",
    image: "/assets/aistudio/western-ghats-road.jpg"
  },
  {
    id: "outstation-travel",
    title: "Outstation Travel",
    description: "Comfortable travel beyond Mahabaleshwar to nearby cities, weekend getaways, and return journeys.",
    badge: "Custom Route",
    iconName: "Navigation",
    image: "/assets/aistudio/sydney-point.jpg"
  }
];
