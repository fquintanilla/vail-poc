"use client";

import { useState } from "react";

type CheckoutStepProps = {
  onBack: () => void;
  onCheckout: () => void;
};

export function CheckoutStep({ onBack, onCheckout }: CheckoutStepProps) {
  const [showPromoModal, setShowPromoModal] = useState(false);

  return (
    <section className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="font-medium text-neutral-600 text-sm hover:text-neutral-900"
      >
        ← Back to packages
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-2">
          <h2 className="font-black text-5xl tracking-tight uppercase">
            Reservation Details & Checkout
          </h2>
          <p className="font-black text-3xl uppercase">Performance Skis, Boots and Helmet</p>
          <p className="font-semibold text-3xl uppercase">Pick Up on: 3/13/2026</p>
          <p className="font-semibold text-3xl uppercase">Pick Up Time: Before 3PM</p>
          <p className="font-semibold text-3xl uppercase">Return on: 3/17/2026</p>
          <p className="font-semibold text-3xl uppercase">Duration: 5 days</p>
          <p className="font-semibold text-3xl uppercase">
            Pick Up Location: Beaver Creek Sports - Plaza Rentals
          </p>

          <label className="mt-4 flex items-start gap-3">
            <input type="checkbox" defaultChecked className="mt-1" />
            <span className="text-3xl leading-snug">
              Include Damage Waiver $6 USD (Optional)
              <br />
              <span className="text-neutral-700">
                Your waiver covers all damage that can be repaired.
                <br />
                It doesn&apos;t cover loss, theft or negligence.
              </span>
            </span>
          </label>
        </div>

        <div className="space-y-5">
          <h3 className="font-black text-4xl uppercase">Pricing Details</h3>
          <div className="space-y-2 text-3xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase">Subtotal</span>
              <span className="font-semibold">$382.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase">Taxes & Fees</span>
              <span className="font-semibold">$38.68</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-neutral-200 border-t pt-4">
              <span className="font-black uppercase">Total:</span>
              <span className="font-black">$420.68</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-sm uppercase">Add Promo Code</label>
            <div className="flex gap-2">
              <input className="w-full rounded-lg border border-neutral-300 px-3 py-2.5" />
              <button
                type="button"
                className="rounded-lg bg-neutral-300 px-5 font-bold text-sm text-white uppercase"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-neutral-300 p-8">
          <h3 className="font-black text-5xl uppercase">Check Out as Guest</h3>
          <p className="mt-4 text-3xl text-neutral-700">
            Create an account at the end of checkout to save information for future
            purchases.
          </p>
          <button
            type="button"
            onClick={onCheckout}
            className="mt-8 rounded-lg bg-neutral-900 px-6 py-3 font-black text-white uppercase"
          >
            Check Out
          </button>
        </article>

        <article className="rounded-xl border border-neutral-300 p-8">
          <h3 className="font-black text-5xl uppercase">Sign In to Your Epic Account</h3>
          <p className="mt-4 text-3xl text-neutral-700">
            As an Epic Pass Holder, get 20% off rentals. See Terms and Conditions for
            additional information on eligible Passes and a list of all participating
            locations.
          </p>
          <div className="mt-6 space-y-3">
            <div>
              <label className="font-bold text-xs uppercase">Email address or username</label>
              <input className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5" />
            </div>
            <div>
              <div className="flex items-end justify-between">
                <label className="font-bold text-xs uppercase">Password</label>
                <button type="button" className="text-neutral-600 text-sm underline">
                  Forgot Password?
                </button>
              </div>
              <div className="mt-1 flex gap-2">
                <input
                  type="password"
                  className="w-full rounded-lg border border-neutral-400 px-3 py-2.5"
                />
                <button
                  type="button"
                  className="rounded-lg border border-neutral-300 px-4 font-bold text-xs uppercase"
                >
                  Show
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-6 rounded-lg bg-neutral-300 px-6 py-3 font-black text-white uppercase"
          >
            Sign In
          </button>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[0, 1].map((promo) => (
          <button
            key={`promo-${promo}`}
            type="button"
            onClick={() => setShowPromoModal(true)}
            className={`rounded-xl border p-6 text-left ${
              promo === 1 ? "border-orange-400 bg-white" : "border-neutral-200 bg-neutral-100"
            }`}
          >
            <p className="font-black text-4xl uppercase">Add on or Promo Block Headline Here</p>
            <p className="mt-3 text-3xl">
              <span className="font-black">Epic Pass holders save an additional 20%</span> -
              sign in to your account to apply your discount.
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-lg bg-neutral-900 px-5 py-2 font-black text-white uppercase">
                Add to Cart
              </span>
              <span className="rounded bg-white px-4 py-2 text-sm text-neutral-500">icon</span>
            </div>
          </button>
        ))}
      </div>

      {showPromoModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="relative w-full max-w-[560px] rounded-xl border border-neutral-300 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPromoModal(false)}
              className="absolute top-4 right-4 text-3xl text-neutral-500 hover:text-neutral-900"
              aria-label="Close modal"
            >
              ×
            </button>
            <p className="font-black text-4xl uppercase">Added to Cart</p>
            <p className="mt-3 text-sm uppercase">Epic Pass Holder Promo</p>
            <p className="text-sm uppercase">Applied to this reservation</p>
            <p className="mt-4 text-neutral-700 text-sm">
              Your promo item was added to cart. Continue checkout or add more items.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPromoModal(false)}
                className="rounded-lg bg-neutral-900 px-6 py-2.5 font-black text-white uppercase hover:bg-neutral-700"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setShowPromoModal(false)}
                className="font-semibold text-neutral-700 text-sm uppercase underline underline-offset-4"
              >
                Add More to Cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
