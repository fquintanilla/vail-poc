export type BookingStep =
  | "booking-preferences"
  | "pickup-location"
  | "product-listing"
  | "checkout"
  | "renter-information";

export type Season = "winter" | "summer";

export type Activity = "skiing" | "snowboarding" | "both" | "cycling";

export type LocationCard = {
  id: string;
  name: string;
  priceText: string;
  distanceText: string;
};
