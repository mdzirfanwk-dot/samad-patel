import { businessConfig } from "../data/businessConfig";

export interface BookingEnquiryParams {
  pickup?: string;
  destination?: string;
  travelDate?: string;
  passengers?: string | number;
  travelType?: string;
  notes?: string;
}

export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = businessConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message.trim())}`;
}

export function buildGeneralWhatsAppUrl(): string {
  const message = `Hello ${businessConfig.brandName} ${businessConfig.brandSubtitle},
I would like to enquire about taxi and travel services in Mahabaleshwar.
Please share availability and details.
Thank you.`;
  return buildWhatsAppUrl(message);
}

export function buildBookingEnquiryUrl(params: BookingEnquiryParams): string {
  const pickup = params.pickup?.trim() || "Mahabaleshwar / Hotel";
  const destination = params.destination?.trim() || "Mahabaleshwar Sightseeing";
  const date = params.travelDate?.trim() || "To be confirmed";
  const passengers = params.passengers ? String(params.passengers) : "To be confirmed";
  const travelType = params.travelType?.trim() || "Local Sightseeing";

  const message = `Hello Mahabaleshwar Wala Tours & Travel,
I would like to enquire about a trip.
Pickup: ${pickup}
Destination: ${destination}
Travel Date: ${date}
Passengers: ${passengers}
Travel Type: ${travelType}
Please share vehicle options and the best available price.
Thank you.`;

  return buildWhatsAppUrl(message);
}

export function buildTourEnquiryUrl(tourName: string, params?: Partial<BookingEnquiryParams>): string {
  const date = params?.travelDate || "To be confirmed";
  const passengers = params?.passengers ? String(params?.passengers) : "To be confirmed";
  const pickup = params?.pickup || "To be confirmed";

  const message = `Hello Mahabaleshwar wala Tours and Travel,
I am interested in the ${tourName} tour.
Travel date: ${date}
Number of people: ${passengers}
Pickup location: ${pickup}
Please share available vehicle options and pricing.
Thank you.`;

  return buildWhatsAppUrl(message);
}

export function buildDestinationEnquiryUrl(destinationName: string): string {
  const message = `Hello Mahabaleshwar wala Tours and Travel,
I am interested in a ${destinationName} trip.
Travel date: To be confirmed
Number of people: To be confirmed
Pickup location: To be confirmed
Please share vehicle options and pricing.
Thank you.`;

  return buildWhatsAppUrl(message);
}

export function buildVehicleEnquiryUrl(categoryName: string): string {
  const message = `Hello Mahabaleshwar wala Tours and Travel,
I am interested in vehicle options for ${categoryName}.
Please share available options, capacity and pricing details for our upcoming travel.
Thank you.`;

  return buildWhatsAppUrl(message);
}
