import type { Activity, LocationCard, Season } from "./types";

export const LOCATIONS: LocationCard[] = [
  {
    id: "plaza",
    name: "Beaver Creek Sports - Plaza Rentals",
    priceText: "PACKAGE PRICE: $94.00/DAY",
    distanceText: ".9 miles away",
  },
  {
    id: "ritz",
    name: "Beaver Creek Sports - Ritz Carlton",
    priceText: "PACKAGES STARTING AT $103.00/DAY",
    distanceText: "1.2 miles away",
  },
  {
    id: "epic",
    name: "Epic Mountain Rentals",
    priceText: "PACKAGES STARTING AT $113.00/DAY",
    distanceText: "1.2 miles away",
  },
  {
    id: "arrowhead",
    name: "Beaver Creek Sports - Arrowhead",
    priceText: "PACKAGES STARTING AT $113.00/DAY",
    distanceText: "2 miles away",
  },
];

export function getActivitiesForSeason(season: Season): Activity[] {
  if (season === "summer") {
    return ["cycling"];
  }

  return ["skiing", "snowboarding", "both"];
}

export function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
