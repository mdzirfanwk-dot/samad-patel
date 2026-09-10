export interface PricingRules {
  oneWay: {
    sedan: number;
    suv: number;
    tempo: number;
  };
  roundTrip: {
    sedan: number;
    suv: number;
    tempo: number;
  };
}

export interface DestinationItem {
  id: string;
  name: string;
  category: string;
  address: string;
  locality: string;
  tagline?: string;
  shortDesc: string;
  fullDesc: string;
  googlePlaceId: string;
  googleMapsUrl: string;
  googleBusinessUrl: string;
  googleMapsEnabled: boolean;
  taxiDestination: boolean;
  taxiAvailable: boolean;
  active: boolean;
  featured?: boolean;
  keyPoints: string[];
  image: string;
  elevation?: string;
  bestTime?: string;
  searchKeywords: string[];
  pricingRules?: PricingRules;
  seoTitle?: string;
  seoDescription?: string;
}

export const destinationsData: DestinationItem[] = [
  {
    id: "garden-ice-cream-restaurant",
    name: "Garden Ice Cream Restaurant",
    category: "Restaurant / Tourist Destination / Food Stop",
    address: "Panchgani - Mahabaleshwar Road, Lingmala, Mahabaleshwar, Maharashtra 412806, India",
    locality: "Lingmala, Mahabaleshwar",
    tagline: "Famous Mahabaleshwar food & strawberry stop",
    shortDesc: "Famous Mahabaleshwar food & strawberry stop in Lingmala. Renowned for fresh farm strawberries with whipped cream, artisanal ice cream, juices, and hot vegetarian food.",
    fullDesc: "Located along the scenic Panchgani - Mahabaleshwar Road in Lingmala, Garden Ice Cream Restaurant is an iconic culinary landmark and beloved food stop for travellers. Famous across Maharashtra for farm-fresh strawberries paired with generous whipped cream, handcrafted fruit ice creams, refreshing milkshakes, and delicious vegetarian cuisine, it is a favourite rest stop between sightseeing points and waterfall visits. Our taxi service provides convenient hotel pickup & drops, round trips with waiting, and customized sightseeing stops directly to the restaurant entrance.",
    googlePlaceId: "ChIJrRXc7G1lwjsReAWEkRK_1Zc",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Garden+Ice+Cream+Restaurant+Mahabaleshwar&query_place_id=ChIJrRXc7G1lwjsReAWEkRK_1Zc",
    googleBusinessUrl: "https://search.google.com/local/reviews?placeid=ChIJrRXc7G1lwjsReAWEkRK_1Zc",
    googleMapsEnabled: true,
    taxiDestination: true,
    taxiAvailable: true,
    active: true,
    featured: true,
    keyPoints: [
      "Famous Farm-Fresh Strawberries with Whipped Cream",
      "Hand-crafted Artisanal Fruit Ice Creams",
      "Pure Vegetarian Restaurant, Snacks & Meals",
      "Prime Lingmala Road Location with Ample Parking",
      "Convenient Taxi Drop-off, Pickup & Sightseeing Waiting"
    ],
    image: "/images/gallery/garden-icecream-restaurant.jpg",
    elevation: "1,280 m",
    bestTime: "Year-Round (Best Strawberry Season Nov - May)",
    searchKeywords: [
      "Garden",
      "Garden Ice Cream",
      "Garden Ice Cream Restaurant",
      "Lingmala",
      "Garden Mahabaleshwar",
      "Strawberry with Cream",
      "Lingmala food stop",
      "Garden restaurant"
    ],
    pricingRules: {
      oneWay: {
        sedan: 500,
        suv: 800,
        tempo: 1500
      },
      roundTrip: {
        sedan: 900,
        suv: 1400,
        tempo: 2500
      }
    },
    seoTitle: "Taxi to Garden Ice Cream Restaurant Mahabaleshwar | Cab Booking & Fare",
    seoDescription: "Book private taxi to Garden Ice Cream Restaurant in Lingmala, Mahabaleshwar. Affordable one-way and round-trip cab service, verified local drivers, instant WhatsApp quote."
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar",
    category: "Hill Station / Nature & Viewpoints",
    address: "Mahabaleshwar Town & Viewpoints, Satara District, Maharashtra 412806, India",
    locality: "Mahabaleshwar Central",
    tagline: "Queen of Maharashtra Hill Stations",
    shortDesc: "Hill station, dramatic viewpoints, evergreen forests and scenic mountain drives.",
    fullDesc: "Perched at an elevation of 1,353 meters in the Sahyadri mountain range, Mahabaleshwar is the crowning jewel of Maharashtra's hill stations. Famed for its misty mornings, panoramic cliff lookouts like Arthur's Seat and Kate's Point, serene Venna Lake, and fresh strawberry farms, it provides an idyllic mountain retreat.",
    googlePlaceId: "ChIJJXk9vLBlwjsRYvX4sH8j6gY",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mahabaleshwar+Maharashtra",
    googleBusinessUrl: "https://www.google.com/maps/search/?api=1&query=Mahabaleshwar+Sightseeing",
    googleMapsEnabled: true,
    taxiDestination: true,
    taxiAvailable: true,
    active: true,
    featured: true,
    keyPoints: [
      "Arthur's Seat & Kate's Point",
      "Venna Lake boating",
      "Garden Ice Cream Restaurant & strawberry stops",
      "Lingmala Waterfall & Wilson Point"
    ],
    image: "/images/gallery/arthurs-seat-deck.jpg",
    elevation: "1,353 m",
    bestTime: "Year-Round / Monsoon & Winter",
    searchKeywords: [
      "Mahabaleshwar",
      "Mahabaleshwar Sightseeing",
      "Arthur's Seat",
      "Venna Lake",
      "Kate's Point",
      "Wilson Point"
    ],
    pricingRules: {
      oneWay: { sedan: 600, suv: 900, tempo: 1800 },
      roundTrip: { sedan: 1200, suv: 1800, tempo: 3200 }
    }
  },
  {
    id: "panchgani",
    name: "Panchgani",
    category: "Hill Station & Volcanic Plateaus",
    address: "Panchgani Town & Table Land, Satara District, Maharashtra 412805, India",
    locality: "Panchgani",
    tagline: "Five Hills, Vast Table Land & Krishna Valley",
    shortDesc: "Beautiful valley viewpoints, Asia's 2nd longest volcanic plateau and mountain landscapes.",
    fullDesc: "Named after the five majestic hills that surround it, Panchgani is renowned for the vast volcanic Table Land plateau, colonial architecture, and striking panoramas over the Krishna River valley and Dhom Dam waters. It is an essential stop for families and nature lovers.",
    googlePlaceId: "ChIJh0Nl_iVlwjsRE5V2jZkE72g",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Panchgani+Table+Land",
    googleBusinessUrl: "https://www.google.com/maps/search/?api=1&query=Panchgani+Sightseeing",
    googleMapsEnabled: true,
    taxiDestination: true,
    taxiAvailable: true,
    active: true,
    featured: true,
    keyPoints: [
      "Table Land volcanic plateau",
      "Sydney Point & Parsi Point",
      "Bhilar book village",
      "Fresh strawberry juice & fruit stalls"
    ],
    image: "/images/gallery/table-land-plateau.jpg",
    elevation: "1,293 m",
    bestTime: "Pleasant October to June",
    searchKeywords: [
      "Panchgani",
      "Table Land",
      "Sydney Point",
      "Parsi Point",
      "Bhilar",
      "Harrison's Folly"
    ],
    pricingRules: {
      oneWay: { sedan: 800, suv: 1200, tempo: 2200 },
      roundTrip: { sedan: 1500, suv: 2200, tempo: 3800 }
    }
  },
  {
    id: "pratapgad",
    name: "Pratapgad",
    category: "Historic Fort & Mountain Citadel",
    address: "Pratapgad Fort, Poladpur - Mahabaleshwar Road, Satara District, Maharashtra 412806, India",
    locality: "Pratapgad",
    tagline: "Historic 1656 Maratha Bastion of Valour",
    shortDesc: "Historic hill fort, Bhavani Mata temple and dramatic Western Ghats scenery.",
    fullDesc: "Situated approximately 24 km from Mahabaleshwar, Pratapgad stands as a legendary bastion of Maratha history. Towering over mountain passes with sheer drop-offs into the Konkan valley, the fort features formidable battlements, historic temples, and unforgettable 360-degree Sahyadri horizon views.",
    googlePlaceId: "ChIJ40i9UoRqwjsR47n_oDkM3G4",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pratapgad+Fort+Mahabaleshwar",
    googleBusinessUrl: "https://www.google.com/maps/search/?api=1&query=Pratapgad+Fort",
    googleMapsEnabled: true,
    taxiDestination: true,
    taxiAvailable: true,
    active: true,
    featured: true,
    keyPoints: [
      "Historic 1656 mountain citadel",
      "Bhavani Mata Temple",
      "Breathtaking Western Ghats panoramas",
      "Scenic mountain pass descent"
    ],
    image: "/images/gallery/pratapgad-fort-citadel.jpg",
    elevation: "1,080 m",
    bestTime: "Post-monsoon & Winter",
    searchKeywords: [
      "Pratapgad",
      "Pratapgad Fort",
      "Shivaji Maharaj Fort",
      "Bhavani Temple",
      "Heritage Fort"
    ],
    pricingRules: {
      oneWay: { sedan: 1200, suv: 1800, tempo: 3200 },
      roundTrip: { sedan: 1800, suv: 2600, tempo: 4600 }
    }
  },
  {
    id: "tapola",
    name: "Tapola",
    category: "Lakeside Eco-Tourism & Watersports",
    address: "Tapola, Shivsagar Lake Reservoir, Satara District, Maharashtra 412806, India",
    locality: "Tapola",
    tagline: "Mini Kashmir of Maharashtra & Shivsagar Lake",
    shortDesc: "Lakeside landscapes, speed boating, kayaking and peaceful countryside.",
    fullDesc: "Often affectionately described as the 'Mini Kashmir of Maharashtra', Tapola lies nestled where the Koyna and Solshi rivers meet, forming the grand Shivsagar Lake reservoir. Surrounded by lush hills and quiet rural villages, it offers boating, water scooter rides, and peaceful nature walks away from the crowds.",
    googlePlaceId: "ChIJW9xH_jxlwjsRJ_t_D7rJ0C8",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tapola+Mini+Kashmir+Mahabaleshwar",
    googleBusinessUrl: "https://www.google.com/maps/search/?api=1&query=Tapola+Lakeside",
    googleMapsEnabled: true,
    taxiDestination: true,
    taxiAvailable: true,
    active: true,
    featured: true,
    keyPoints: [
      "Shivsagar Lake waters",
      "Boating, water scooters & kayaking",
      "Tranquil rural agro-tourism",
      "Dense Sahyadri forest tracks"
    ],
    image: "/images/gallery/kates-point-reservoir.jpg",
    elevation: "800 m",
    bestTime: "October to May",
    searchKeywords: [
      "Tapola",
      "Mini Kashmir",
      "Shivsagar Lake",
      "Tapola Boating",
      "Koyna Reservoir"
    ],
    pricingRules: {
      oneWay: { sedan: 1400, suv: 2000, tempo: 3600 },
      roundTrip: { sedan: 2200, suv: 3000, tempo: 5200 }
    }
  }
];
