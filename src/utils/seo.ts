/**
 * SEO metadata definitions and dynamic meta tag updater.
 * Tailored for Mahabaleshwar wala Tours and Travel with local keyword optimization.
 */

export interface PageSeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType?: string;
  breadcrumbName: string;
}

export const SEO_METADATA: Record<string, PageSeoMetadata> = {
  "/": {
    title: "Mahabaleshwar Wala Tours & Travel | Taxi & Sightseeing in Mahabaleshwar",
    description:
      "Mahabaleshwar wala Tours and Travel — local taxi, sightseeing and travel enquiries in Mahabaleshwar, Maharashtra. Call or WhatsApp +91 89990 61316.",
    keywords:
      "Mahabaleshwar taxi, taxi in Mahabaleshwar, Mahabaleshwar sightseeing taxi, Mahabaleshwar tour and travel, Mahabaleshwar car rental, Mahabaleshwar cab, Mahabaleshwar sightseeing, Panchgani taxi, Mahabaleshwar to Panchgani taxi, Mahabaleshwar to Pratapgad taxi, Mahabaleshwar to Tapola taxi, Mahabaleshwar travel service",
    canonicalPath: "/",
    ogType: "website",
    breadcrumbName: "Home"
  },
  "/tours": {
    title: "Mahabaleshwar Tour Packages & Sightseeing Circuits | Mahabaleshwar Wala Tours & Travel",
    description:
      "Explore top Mahabaleshwar tour packages, Panchgani day tours, historic Pratapgad Fort trips & serene Tapola lakeside excursions. Verified drivers, comfortable cabs & custom itineraries.",
    keywords:
      "Mahabaleshwar tour packages, Mahabaleshwar sightseeing package, Panchgani day tour, Pratapgad fort taxi tour, Tapola tour, Mahabaleshwar itinerary, Mahabaleshwar 1 day tour, Mahabaleshwar 2 day tour, local sightseeing cab Mahabaleshwar",
    canonicalPath: "/tours",
    ogType: "website",
    breadcrumbName: "Tour Packages"
  },
  "/destinations": {
    title: "Explore Mahabaleshwar, Panchgani, Pratapgad & Tapola | Destinations Guide",
    description:
      "Detailed guide to popular destinations in the Sahyadri mountains: Arthur's Seat, Table Land, Pratapgad Fort, Tapola Mini Kashmir, strawberry farms and breathtaking viewpoints.",
    keywords:
      "places to visit in Mahabaleshwar, Garden Ice Cream Restaurant taxi, Lingmala restaurant cab, Panchgani sightseeing spots, Pratapgad fort history, Tapola mini Kashmir, Mahabaleshwar viewpoints, Arthur's seat, Elephant head point, Wilson point, Venna lake",
    canonicalPath: "/destinations",
    ogType: "website",
    breadcrumbName: "Destinations"
  },
  "/admin": {
    title: "Admin Console & Destination Management | Mahabaleshwar Wala Tours & Travel",
    description: "Administrative console to manage official taxi destinations, Google Place IDs, pricing rules and view logged trip bookings.",
    keywords: "admin destination management Mahabaleshwar taxi",
    canonicalPath: "/admin",
    ogType: "website",
    breadcrumbName: "Admin Console"
  },
  "/live-tracking": {
    title: "Real-Time Taxi Tracking & Google Maps Location Exchange | Mahabaleshwar Wala Tours",
    description: "Exchange real-time GPS location between booker and taxi driver on Google Maps. Live distance, estimated arrival time, and grounded route intelligence for Mahabaleshwar cabs.",
    keywords: "Mahabaleshwar taxi tracking, real time taxi location, google maps location exchange, booker driver live location, cab ETA Mahabaleshwar",
    canonicalPath: "/live-tracking",
    ogType: "website",
    breadcrumbName: "Live Tracking"
  },
  "/services": {
    title: "Taxi & Travel Services in Mahabaleshwar - Local Cabs & Outstation Travel",
    description:
      "24/7 taxi service in Mahabaleshwar: local sightseeing cabs, outstation travel to Pune & Mumbai, airport and railway transfers, and flexible custom family itineraries.",
    keywords:
      "Mahabaleshwar taxi service, Mahabaleshwar cab booking, Pune to Mahabaleshwar taxi, Mumbai to Mahabaleshwar cab, Mahabaleshwar outstation taxi, local sightseeing cab Mahabaleshwar, hotel pickup cab Mahabaleshwar",
    canonicalPath: "/services",
    ogType: "website",
    breadcrumbName: "Services"
  },
  "/fleet": {
    title: "Vehicle Fleet & Cab Options in Mahabaleshwar | Sedan, SUV & Tempo Traveller",
    description:
      "Choose clean, reliable vehicles for your mountain holiday in Mahabaleshwar. Available sedans (Dzire, Etios), SUVs (Innova, Ertiga), and tempo travellers for family groups.",
    keywords:
      "Mahabaleshwar taxi fleet, Innova taxi Mahabaleshwar, Ertiga cab Mahabaleshwar, tempo traveller Mahabaleshwar, 7 seater taxi Mahabaleshwar, sedan cab Mahabaleshwar",
    canonicalPath: "/fleet",
    ogType: "website",
    breadcrumbName: "Vehicle Fleet"
  },
  "/reviews": {
    title: "Customer Reviews & 5.0 Rating | Mahabaleshwar Wala Tours & Travel",
    description:
      "Rated 5.0 out of 5 across 13 verified Google Reviews. Read honest feedback on our dependable mountain driving, punctual hotel pickups, and transparent travel guidance.",
    keywords:
      "Mahabaleshwar tours and travels reviews, best taxi service Mahabaleshwar, trusted cab service Mahabaleshwar, Google reviews Mahabaleshwar travel, customer ratings",
    canonicalPath: "/reviews",
    ogType: "website",
    breadcrumbName: "Reviews"
  },
  "/about": {
    title: "About Us | Mahabaleshwar Wala Tours & Travel - Local Travel Partner",
    description:
      "Learn about Mahabaleshwar wala Tours and Travel. Located opposite Brightland Resort, Nakinda in Mahabaleshwar. Dedicated local travel coordination and 24/7 service.",
    keywords:
      "about Mahabaleshwar tours, local travel partner Mahabaleshwar, taxi office Nakinda Mahabaleshwar, Brightland resort taxi, Mahabaleshwar car rental history",
    canonicalPath: "/about",
    ogType: "website",
    breadcrumbName: "About Us"
  },
  "/contact": {
    title: "Contact & Booking Desk | 24/7 Taxi Service in Mahabaleshwar",
    description:
      "Contact Mahabaleshwar wala Tours and Travel. Call or WhatsApp +91 89990 61316 anytime for instant quotes, sightseeing bookings, and prompt hotel pickups in Mahabaleshwar.",
    keywords:
      "contact Mahabaleshwar taxi, Mahabaleshwar cab contact number, WhatsApp taxi booking Mahabaleshwar, hire cab Mahabaleshwar, book taxi opposite Brightland",
    canonicalPath: "/contact",
    ogType: "website",
    breadcrumbName: "Contact & Booking"
  },
  "/gallery": {
    title: "Mahabaleshwar Gallery | Tourist Spots & Scenic Destinations Photo Showcase",
    description:
      "Scroll through high-resolution authentic photographs of Mahabaleshwar, Panchgani, Pratapgad, and Tapola tourist spots. Browse destinations and book private cabs or sightseeing packages.",
    keywords:
      "Mahabaleshwar gallery, Mahabaleshwar tourist spots photos, Arthur's seat pictures, Table land photos, Pratapgad fort pictures, Tapola lake photos, strawberry farm photos, Mahabaleshwar viewpoints gallery",
    canonicalPath: "/gallery",
    ogType: "website",
    breadcrumbName: "Mahabaleshwar Gallery"
  },
  "/privacy-policy": {
    title: "Privacy Policy | Mahabaleshwar Wala Tours & Travel",
    description:
      "Privacy policy for Mahabaleshwar wala Tours and Travel. Transparent information handling for WhatsApp inquiries, phone coordination, and travel bookings.",
    keywords: "privacy policy Mahabaleshwar wala tours",
    canonicalPath: "/privacy-policy",
    ogType: "website",
    breadcrumbName: "Privacy Policy"
  },
  "/terms": {
    title: "Terms & Conditions | Mahabaleshwar Wala Tours & Travel",
    description:
      "Terms and conditions for travel bookings, vehicle reservations, sightseeing schedules, and weather advisory with Mahabaleshwar wala Tours and Travel.",
    keywords: "terms and conditions Mahabaleshwar tours and travel",
    canonicalPath: "/terms",
    ogType: "website",
    breadcrumbName: "Terms & Conditions"
  }
};

/**
 * Updates or creates a <meta> tag with the specified attribute and content
 */
function setMetaTag(attributeName: "name" | "property", attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

/**
 * Updates or creates a <link> tag with the specified rel
 */
function setLinkTag(rel: string, href: string, id?: string) {
  let element: HTMLLinkElement | null = id ? (document.getElementById(id) as HTMLLinkElement) : null;
  if (!element) {
    element = document.querySelector(`link[rel="${rel}"]`);
  }
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (id) element.id = id;
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

/**
 * Dynamically updates document title, standard meta tags, social Open Graph & Twitter tags,
 * canonical URL, and JSON-LD schema for breadcrumbs and WebPage.
 */
export function updatePageSeo(path: string) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  // Handle alias for terms
  const lookupPath = normalizedPath === "/terms-and-conditions" ? "/terms" : normalizedPath;
  const seo = SEO_METADATA[lookupPath] || SEO_METADATA["/"];

  const origin = window.location.origin || "https://mahabaleshwarwalatours.com";
  const fullUrl = `${origin}${seo.canonicalPath === "/" ? "" : seo.canonicalPath}`;

  // 1. Update Title
  document.title = seo.title;

  // 2. Standard Meta Tags
  setMetaTag("name", "description", seo.description);
  setMetaTag("name", "keywords", seo.keywords);

  // 3. Open Graph Tags
  setMetaTag("property", "og:title", seo.title);
  setMetaTag("property", "og:description", seo.description);
  setMetaTag("property", "og:url", fullUrl);
  setMetaTag("property", "og:type", seo.ogType || "website");

  // 4. Twitter Tags
  setMetaTag("name", "twitter:title", seo.title);
  setMetaTag("name", "twitter:description", seo.description);
  setMetaTag("name", "twitter:url", fullUrl);

  // 5. Canonical Link
  setLinkTag("canonical", fullUrl, "canonical-url");

  // 6. Dynamic JSON-LD Structured Data for WebPage & Breadcrumbs
  let schemaScript = document.getElementById("json-ld-dynamic-seo") as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.id = "json-ld-dynamic-seo";
    document.head.appendChild(schemaScript);
  }

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: origin
    }
  ];

  if (seo.canonicalPath !== "/") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: seo.breadcrumbName,
      item: fullUrl
    });
  }

  const dynamicSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${fullUrl}#webpage`,
        url: fullUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${origin}/#website`,
          url: origin,
          name: "Mahabaleshwar wala Tours and Travel"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumb`,
        itemListElement: breadcrumbItems
      }
    ]
  };

  schemaScript.textContent = JSON.stringify(dynamicSchema, null, 2);
}
