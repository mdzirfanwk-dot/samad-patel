export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Booking" | "Location & Contact" | "Vehicles & Services";
}

export const faqsData: FAQItem[] = [
  {
    id: "how-to-book",
    question: "How can I book a taxi in Mahabaleshwar?",
    answer: "You can contact Mahabaleshwar wala Tours and Travel directly by phone or WhatsApp to enquire about your journey, check availability, and receive price quotes.",
    category: "Booking"
  },
  {
    id: "how-to-contact",
    question: "How do I contact Mahabaleshwar wala Tours and Travel?",
    answer: "Call us directly at +91 89990 61316 or use WhatsApp for quick, direct enquiries. We are glad to help plan your travels.",
    category: "Location & Contact"
  },
  {
    id: "business-location",
    question: "Where is the business located?",
    answer: "The business is located opposite to Brightland Resort, Nakinda, Mahabaleshwar, Maharashtra 412806, India.",
    category: "Location & Contact"
  },
  {
    id: "hours-open",
    question: "Is the business open 24 hours?",
    answer: "The Google Business listing currently indicates 24-hour availability, helping you arrange timely pickups and tour advice.",
    category: "Location & Contact"
  },
  {
    id: "sightseeing-enquiry",
    question: "Can I enquire about Mahabaleshwar sightseeing?",
    answer: "Yes. Use our website WhatsApp enquiry form or contact us directly to request local sightseeing options, suggested itineraries, and pricing.",
    category: "Booking"
  },
  {
    id: "customised-trip",
    question: "Can I request a customised trip?",
    answer: "Yes, customised travel arrangements, multi-day tours, and special stopovers can be enquired about, subject to vehicle availability.",
    category: "Vehicles & Services"
  },
  {
    id: "airport-transfers",
    question: "Do you provide airport transfers?",
    answer: "Airport transfers between Mahabaleshwar and major transit hubs (Pune / Mumbai) can be enquired upon in advance. Contact us to confirm pickup details and timings.",
    category: "Vehicles & Services"
  },
  {
    id: "available-vehicles",
    question: "What vehicles are available?",
    answer: "Vehicle options (including sedans, SUVs, and tempo travellers) are confirmed based on current availability and group size requirements.",
    category: "Vehicles & Services"
  }
];
