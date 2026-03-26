"use client";

import { useState } from "react";

type PackageCard = {
  id: string;
  title: string;
  description: string;
};

type ProductCard = {
  id: string;
  name: string;
  description: string;
  price: string;
  retail: string;
};

const PRODUCT_IMAGE_BY_ID: Record<string, string> = {
  "demo-skis":
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
  "performance-skis":
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
  "sport-skis":
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
};

const PACKAGE_CARDS: PackageCard[] = [
  {
    id: "demo",
    title: "Demo",
    description:
      "Looking for a custom setup for the day's conditions? Our demo line is a great way to try the latest gear.",
  },
  {
    id: "performance",
    title: "Performance",
    description:
      "Our performance line is designed to give improving skier greater confidence and control.",
  },
  {
    id: "sport",
    title: "Sport",
    description:
      "From bunny hills to blue runs, sport ski package is a great way to continue learning while having fun.",
  },
];

const PRODUCT_CARDS: ProductCard[] = [
  {
    id: "demo-skis",
    name: "Demo Skis",
    description:
      "Best for skiers interested in latest skis and boots. Choose your own gear, or have our team choose for you.",
    price: "$98 / DAY",
    retail: "$120 / DAY",
  },
  {
    id: "performance-skis",
    name: "Performance Skis",
    description:
      "For skiers comfortably skiing intermediate terrain and ready to dabble in black diamond marked runs.",
    price: "$98 / DAY",
    retail: "$120 / DAY",
  },
  {
    id: "sport-skis",
    name: "Sport Skis",
    description:
      "Great for skiers continuing to learn the sport. Spending most of their time on greens and blues.",
    price: "$98 / DAY",
    retail: "$120 / DAY",
  },
];

type ProductListingStepProps = {
  onBack: () => void;
  onContinue: () => void;
  onAddToCart: () => void;
};

function ProductImage({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  return (
    <img
      src={PRODUCT_IMAGE_BY_ID[productId]}
      alt={productName}
      className="mt-3 h-14 w-full rounded-full border border-neutral-200 bg-neutral-100 object-cover"
      loading="lazy"
    />
  );
}

export function ProductListingStep({
  onBack,
  onContinue,
  onAddToCart,
}: ProductListingStepProps) {
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [lastAddedProductName, setLastAddedProductName] =
    useState("Performance Skis");

  const handleAddToCart = (productName: string) => {
    setLastAddedProductName(productName);
    setShowAddedModal(true);
    onAddToCart();
  };

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="font-medium text-neutral-600 text-sm hover:text-neutral-900"
      >
        ← Back to locations
      </button>

      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-black text-4xl tracking-tight uppercase md:text-5xl">
          Gear & Packages Available at Beaver Creek
        </h2>
        <p className="font-medium text-xl text-neutral-700">
          03/13/2026 - 03/17/2026
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
        <div className="rounded-xl border border-neutral-300 bg-white p-4">
          <div className="grid h-44 place-content-center rounded border border-neutral-200 bg-neutral-50 text-center">
            <p className="font-serif text-4xl text-neutral-500">Beaver Creek</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PACKAGE_CARDS.map((card) => (
            <article
              key={card.id}
              className="rounded-xl border border-neutral-300 bg-white"
            >
              <div className="h-32 rounded-t-xl border-neutral-200 border-b bg-neutral-100" />
              <div className="space-y-1 p-3">
                <h3 className="font-black text-xl uppercase">{card.title}</h3>
                <p className="text-neutral-700 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
        <aside className="space-y-5 rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-lg text-neutral-700">
            Filter - Select All That Apply
          </p>

          <div>
            <h4 className="mb-2 font-bold uppercase">Age Group</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>Adult</span>
            </label>
            <label className="mt-1 flex items-center gap-2">
              <input type="checkbox" />
              <span>Kids</span>
            </label>
          </div>

          <div>
            <h4 className="mb-2 font-bold uppercase">Sport</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>Ski</span>
            </label>
            <label className="mt-1 flex items-center gap-2">
              <input type="checkbox" />
              <span>Snowboard</span>
            </label>
          </div>

          <div>
            <h4 className="mb-2 font-bold uppercase">Category</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <span>Demo</span>
            </label>
            <label className="mt-1 flex items-center gap-2">
              <input type="checkbox" />
              <span>Performance</span>
            </label>
            <label className="mt-1 flex items-center gap-2">
              <input type="checkbox" />
              <span>Sport</span>
            </label>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {PRODUCT_CARDS.slice(0, 2).map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-neutral-300 bg-white p-4"
              >
                <h3 className="font-black text-4xl uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-1 text-neutral-700 text-sm leading-relaxed">
                  {product.description}
                </p>
                <ProductImage
                  productId={product.id}
                  productName={product.name}
                />
                <div className="mt-4 space-y-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Add helmet to reservation ($14.00 / day)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>I&apos;ll bring my own boots</span>
                  </label>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <button
                      type="button"
                      className="flex size-5 items-center justify-center rounded-full border border-neutral-500"
                    >
                      -
                    </button>
                    <span>1</span>
                    <button
                      type="button"
                      className="flex size-5 items-center justify-center rounded-full border border-neutral-500"
                    >
                      +
                    </button>
                    <span className="ml-1">Quantity</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product.name)}
                  className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 font-black text-white uppercase hover:bg-neutral-700"
                >
                  Add to Cart
                </button>
                <div className="mt-4 text-sm">
                  <p className="font-black uppercase text-orange-500">
                    Epic Rewards
                  </p>
                  <p>
                    Walk-In{" "}
                    <span className="font-black text-orange-500">
                      {product.price}
                    </span>
                  </p>
                  <p className="text-neutral-500 line-through">
                    {product.retail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <article className="max-w-[560px] rounded-xl border border-neutral-300 bg-white p-4">
            <h3 className="font-black text-4xl uppercase tracking-tight">
              {PRODUCT_CARDS[2]?.name}
            </h3>
            <p className="mt-1 text-neutral-700 text-sm leading-relaxed">
              {PRODUCT_CARDS[2]?.description}
            </p>
            <ProductImage
              productId={PRODUCT_CARDS[2]?.id ?? "sport-skis"}
              productName={PRODUCT_CARDS[2]?.name ?? "Sport Skis"}
            />
            <div className="mt-4 space-y-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Add helmet to reservation ($14.00 / day)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>I&apos;ll bring my own boots</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() =>
                handleAddToCart(PRODUCT_CARDS[2]?.name ?? "Sport Skis")
              }
              className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 font-black text-white uppercase hover:bg-neutral-700"
            >
              Add to Cart
            </button>
            <div className="mt-4 text-sm">
              <p className="font-black uppercase text-orange-500">
                Epic Rewards
              </p>
              <p>
                Walk-In{" "}
                <span className="font-black text-orange-500">
                  {PRODUCT_CARDS[2]?.price}
                </span>
              </p>
              <p className="text-neutral-500 line-through">
                {PRODUCT_CARDS[2]?.retail}
              </p>
            </div>
          </article>
        </div>
      </div>

      {showAddedModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="relative w-full max-w-[560px] rounded-xl border border-neutral-300 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowAddedModal(false)}
              className="absolute top-4 right-4 text-3xl text-neutral-500 hover:text-neutral-900"
              aria-label="Close modal"
            >
              ×
            </button>

            <p className="font-black text-4xl uppercase">Added to Cart</p>
            <p className="mt-3 text-sm uppercase">{lastAddedProductName}</p>
            <p className="text-sm uppercase">Pick Up on: 3/13/2026</p>
            <p className="text-sm uppercase">Return on: 3/17/2026</p>
            <p className="text-sm uppercase">Duration: 5 Days</p>

            <p className="mt-4 text-neutral-700 text-sm">
              If you have more than one person in your reservation, click add
              more to cart below to select additional gear and services.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddedModal(false);
                  onContinue();
                }}
                className="rounded-lg bg-neutral-900 px-6 py-2.5 font-black text-white uppercase hover:bg-neutral-700"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setShowAddedModal(false)}
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
