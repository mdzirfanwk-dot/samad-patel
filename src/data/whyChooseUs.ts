export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "local-knowledge",
    title: "Local Knowledge",
    description: "Designed around the Mahabaleshwar region, ensuring tailored travel advice and scenic routing.",
    badge: "Regional Insight",
    iconName: "Compass"
  },
  {
    id: "easy-booking",
    title: "Easy Booking",
    description: "Simple phone and WhatsApp enquiry without complex apps, long forms, or hidden steps.",
    badge: "Direct Contact",
    iconName: "PhoneCall"
  },
  {
    id: "flexible-travel",
    title: "Flexible Travel",
    description: "Plan sightseeing and customised journeys around your timetable, hotel location, and preferences.",
    badge: "Custom Trips",
    iconName: "CalendarRange"
  },
  {
    id: "24-7-availability",
    title: "24/7 Availability",
    description: "Google-listed availability is 24 hours to assist with your early morning sunrise or evening queries.",
    badge: "Round-the-Clock",
    iconName: "Clock"
  },
  {
    id: "5-star-rating",
    title: "5-Star Google Rating",
    description: "Currently displayed at 5.0 on Google with 13 reviews from verified travellers.",
    badge: "5.0 / 5 Rating",
    iconName: "Star"
  },
  {
    id: "convenient-location",
    title: "Convenient Location",
    description: "Business location is situated opposite Brightland Resort, Nakinda, central to premier stays.",
    badge: "Nakinda, Mahabaleshwar",
    iconName: "MapPin"
  }
];
