import { LOCATIONS } from "../data";

type PickupLocationStepProps = {
  selectedLocationId: string;
  showMap: boolean;
  onBack: () => void;
  onContinue: () => void;
  onLocationSelect: (locationId: string) => void;
  onToggleMap: () => void;
};

export function PickupLocationStep({
  selectedLocationId,
  showMap,
  onBack,
  onContinue,
  onLocationSelect,
  onToggleMap,
}: PickupLocationStepProps) {
  const selectedLocation = LOCATIONS.find(
    (location) => location.id === selectedLocationId,
  );

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="font-medium text-neutral-600 text-sm hover:text-neutral-900"
      >
        ← Back to booking preferences
      </button>

      <div>
        <h2 className="font-black text-5xl tracking-tight uppercase">
          Select a Pick Up Location
        </h2>
        <label className="mt-4 flex items-center gap-2 text-lg">
          <input type="checkbox" />
          <span>Switch from pickup to delivery</span>
        </label>
      </div>

      <div className="max-w-xl space-y-3">
        <p className="font-semibold text-neutral-700 text-sm uppercase">
          Sort by proximity
        </p>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-neutral-300 px-4 py-2.5"
            placeholder="Enter lodging name, address or base area"
          />
          <button
            type="button"
            className="rounded-xl bg-neutral-200 px-6 font-semibold text-neutral-700 uppercase"
          >
            Enter
          </button>
        </div>
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Nearest to ski school(s)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Slopeside</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Closest to gondola (x)</span>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {LOCATIONS.map((location) => {
          const isSelected = selectedLocationId === location.id;
          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onLocationSelect(location.id)}
              className={`min-h-36 rounded-xl border-2 p-4 text-left ${
                isSelected
                  ? "border-orange-400 bg-orange-50"
                  : "border-neutral-300 bg-white"
              }`}
            >
              <div className="font-bold text-xl">{location.name}</div>
              <div className="mt-4 font-black text-xl uppercase">
                {location.priceText}
              </div>
              <div className="mt-4 font-bold text-2xl">{location.distanceText}</div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-xl bg-neutral-900 px-8 py-3 font-black text-white uppercase"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onToggleMap}
          className="font-medium text-xl text-neutral-700 underline decoration-neutral-400 underline-offset-4 hover:text-neutral-900"
        >
          {showMap ? "Hide locations by map" : "View locations by map"}
        </button>
      </div>

      {showMap ? (
        <div className="relative mt-4 h-[420px] overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10px_10px,rgba(0,0,0,0.14)_1px,transparent_1px)] bg-size-[28px_28px] opacity-30" />

          <div className="absolute top-16 left-16 rounded-full bg-white px-3 py-1 text-sm shadow">
            Wayfarer Lodge
          </div>
          <div className="absolute top-24 right-24 rounded-full bg-white px-3 py-1 text-sm shadow">
            Charter at Beaver Creek
          </div>

          <div className="absolute top-24 left-1/2 text-2xl">📍</div>
          <div className="absolute top-52 left-[36%] text-2xl">📍</div>
          <div className="absolute top-44 right-[28%] text-2xl">📍</div>
          <div className="absolute right-8 bottom-8 w-[320px] rounded-xl border border-neutral-300 bg-white p-4 shadow-lg">
            <p className="font-bold text-lg">
              {selectedLocation?.name ?? "Beaver Creek Sports - Ritz Carlton"}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              0130 Day Break Ridge, Avon, CO 81620
            </p>
            <p className="mt-3 font-black text-lg uppercase">
              {selectedLocation?.priceText ?? "PACKAGES STARTING AT $103.00/DAY"}
            </p>
            <p className="mt-2 font-bold">{selectedLocation?.distanceText}</p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-neutral-900 px-5 py-2 font-semibold text-sm text-white uppercase"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
