import type { Metadata } from "next";
import { RentalExperience } from "./rental-experience";

export const metadata: Metadata = {
  title: "Rental Experience",
  description: "Book rental gear and select pickup location.",
};

export default function RentalPage() {
  return <RentalExperience />;
}
