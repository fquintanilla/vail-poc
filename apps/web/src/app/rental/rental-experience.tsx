"use client";

import Link from "next/link";
import { useState } from "react";
import { LOCATIONS, getActivitiesForSeason } from "./data";
import { BookingPreferencesStep } from "./steps/booking-preferences-step";
import { CheckoutStep } from "./steps/checkout-step";
import { PickupLocationStep } from "./steps/pickup-location-step";
import { ProductListingStep } from "./steps/product-listing-step";
import { RenterInformationStep } from "./steps/renter-information-step";
import type { Activity, BookingStep, Season } from "./types";

export function RentalExperience() {
  const [currentStep, setCurrentStep] =
    useState<BookingStep>("booking-preferences");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [season, setSeason] = useState<Season>("winter");
  const [activity, setActivity] = useState<Activity>("skiing");
  const [showMap, setShowMap] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    LOCATIONS[0]?.id ?? "",
  );

  const handleSeasonChange = (nextSeason: Season) => {
    setSeason(nextSeason);
    const nextActivities = getActivitiesForSeason(nextSeason);
    const defaultActivity = nextActivities[0];
    if (defaultActivity) {
      setActivity(defaultActivity);
    }
  };

  const handleGoToPickupLocation = () => {
    setCurrentStep("pickup-location");
  };

  const handleBackToBookingPreferences = () => {
    setCurrentStep("booking-preferences");
    setShowMap(false);
  };

  const handleGoToProductListing = () => {
    setCurrentStep("product-listing");
  };

  const handleBackToPickupLocation = () => {
    setCurrentStep("pickup-location");
  };

  const handleGoToCheckout = () => {
    setCurrentStep("checkout");
  };

  const handleHeaderCartClick = () => {
    setCurrentStep("checkout");
  };

  const handleAddToCart = () => {
    setCartItemCount((prev) => prev + 1);
  };

  const handleBackToProductListing = () => {
    setCurrentStep("product-listing");
  };

  const handleGoToRenterInformation = () => {
    setCurrentStep("renter-information");
  };

  const handleBackToCheckout = () => {
    setCurrentStep("checkout");
  };

  return (
    <div className="rental-experience-root min-h-screen bg-white text-neutral-950">
      <style jsx global>{`
        body:has(.rental-experience-root) [role="region"],
        body:has(.rental-experience-root) header[role="banner"] {
          display: none !important;
        }

        body:has(.rental-experience-root) main.mainClass {
          margin: 0;
          max-width: none;
          padding: 0;
        }
      `}</style>

      <header className="border-neutral-200 border-b">
        <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6">
          <Link
            href="/"
            className="font-black text-3xl leading-none tracking-tight text-blue-950"
          >
            MY EPIC GEAR
          </Link>
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="inline-flex items-center gap-2 font-medium text-neutral-700 text-sm hover:text-neutral-900"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 1 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={handleHeaderCartClick}
              className="relative inline-flex items-center justify-center text-neutral-700 hover:text-neutral-900"
              aria-label="Open cart and go to checkout"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="17" cy="20" r="1.5" />
                <path d="M3 4h2l2.4 10h10.8L21 7H7.2" />
              </svg>
              {cartItemCount > 0 ? (
                <span className="-right-2 -top-2 absolute flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-950 px-1 font-bold text-[10px] text-white">
                  {cartItemCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className="font-medium text-neutral-700 text-sm uppercase tracking-wide hover:text-neutral-900"
            >
              Exit Booking
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 py-8">
        {currentStep === "booking-preferences" ? (
          <BookingPreferencesStep
            season={season}
            activity={activity}
            onSeasonChange={handleSeasonChange}
            onActivityChange={setActivity}
            onContinue={handleGoToPickupLocation}
          />
        ) : null}

        {currentStep === "pickup-location" ? (
          <PickupLocationStep
            selectedLocationId={selectedLocationId}
            showMap={showMap}
            onBack={handleBackToBookingPreferences}
            onContinue={handleGoToProductListing}
            onLocationSelect={setSelectedLocationId}
            onToggleMap={() => setShowMap((prev) => !prev)}
          />
        ) : null}

        {currentStep === "product-listing" ? (
          <ProductListingStep
            onBack={handleBackToPickupLocation}
            onContinue={handleGoToCheckout}
            onAddToCart={handleAddToCart}
          />
        ) : null}

        {currentStep === "checkout" ? (
          <CheckoutStep
            onBack={handleBackToProductListing}
            onCheckout={handleGoToRenterInformation}
          />
        ) : null}

        {currentStep === "renter-information" ? (
          <RenterInformationStep onBack={handleBackToCheckout} />
        ) : null}
      </main>
    </div>
  );
}
