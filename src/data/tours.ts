export interface TourPackage {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  suggestedItinerary: string[];
  duration: string;
  priceDisplay: string;
  highlights: string[];
  image: string;
  tag: string;
}

export const toursData: TourPackage[] = [
  {
    id: "mahabaleshwar-classic",
    name: "Mahabaleshwar Classic",
    subtitle: "Complete Hill Station Sightseeing",
    description: "Explore the major attractions and iconic viewpoints around Mahabaleshwar in total comfort.",
    suggestedItinerary: [
      "Garden Ice Cream Restaurant & Mapro Garden (Farm-fresh strawberry ice cream & treats)",
      "Venna Lake (Boating & lakeside breeze)",
      "Elephant’s Head Point (Needle hole rock)",
      "Kate’s Point (Scenic valley panorama)",
      "Arthur’s Seat (Queen of all points)",
      "Elphinstone Point (Koyna & Savitri valleys)"
    ],
    duration: "Full Day / Custom",
    priceDisplay: "Contact for Price",
    highlights: [
      "Iconic cliff viewpoints",
      "Venna Lake visit",
      "Strawberry farm stop",
      "Flexible stop durations"
    ],
    image: "/images/gallery/arthurs-seat-deck.jpg",
    tag: "Top Recommended"
  },
  {
    id: "panchgani-escape",
    name: "Panchgani Escape",
    subtitle: "Valley Views & Table Land Tour",
    description: "A scenic day trip covering Panchgani, table lands, strawberry orchards and nearby mountain attractions.",
    suggestedItinerary: [
      "Table Land Plateau (Asia's 2nd longest plateau)",
      "Sydney Point (Krishna Valley overlook)",
      "Parsi Point (Dhom Dam water views)",
      "Bhilar (India's Village of Books)",
      "Harrison’s Folly (Dramatic valley vista)"
    ],
    duration: "Half Day / Full Day",
    priceDisplay: "Contact for Price",
    highlights: [
      "Table Land exploration",
      "Parsi Point valley views",
      "Orchard walks & cafes",
      "Comfortable mountain drive"
    ],
    image: "/images/gallery/table-land-plateau.jpg",
    tag: "Family Favorite"
  },
  {
    id: "pratapgad-fort-experience",
    name: "Pratapgad Fort Experience",
    subtitle: "Historic Hill Fort & Ghats Expedition",
    description: "Explore the historic Pratapgad region, Chhatrapati Shivaji Maharaj's famed bastion with dramatic Western Ghats scenery.",
    suggestedItinerary: [
      "Scenic Ghat road descent towards Pratapgad",
      "Pratapgad Fort upper & lower ramparts",
      "Bhavani Temple & Mahadev Temple",
      "Afzal Khan burial site & heritage points",
      "Panoramic vistas over the Konkan horizon"
    ],
    duration: "Half Day / Excursion",
    priceDisplay: "Contact for Price",
    highlights: [
      "17th-century heritage architecture",
      "Dramatic mountain horizon",
      "Historical landmark experience",
      "Safe mountain driving"
    ],
    image: "/images/gallery/pratapgad-fort-citadel.jpg",
    tag: "Heritage Special"
  },
  {
    id: "tapola-lakeside-tour",
    name: "Tapola Lakeside Tour",
    subtitle: "Mini Kashmir of Maharashtra",
    description: "A tranquil scenic trip towards Tapola, known for the vast Shivsagar Lake reservoir and peaceful countryside.",
    suggestedItinerary: [
      "Scenic drive through dense Sahyadri forests",
      "Shivsagar Lake waterfront & jetty",
      "Boating, kayaking & water scooter area",
      "Rural agro-tourism & strawberry gardens",
      "Quiet sunset viewpoint over the reservoir"
    ],
    duration: "Full Day Trip",
    priceDisplay: "Contact for Price",
    highlights: [
      "Serene Shivsagar lake waters",
      "Lakeside water sports & boating",
      "Lush forest landscapes",
      "Off-the-beaten-path tranquility"
    ],
    image: "/images/gallery/kates-point-reservoir.jpg",
    tag: "Nature & Adventure"
  }
];
