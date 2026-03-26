import { getActivitiesForSeason, titleCase } from "../data";
import type { Activity, Season } from "../types";

type BookingPreferencesStepProps = {
  season: Season;
  activity: Activity;
  onSeasonChange: (season: Season) => void;
  onActivityChange: (activity: Activity) => void;
  onContinue: () => void;
};

export function BookingPreferencesStep({
  season,
  activity,
  onSeasonChange,
  onActivityChange,
  onContinue,
}: BookingPreferencesStepProps) {
  const activities = getActivitiesForSeason(season);

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="max-w-xl space-y-8">
        <h1 className="font-black text-5xl leading-tight tracking-tight md:text-6xl">
          Great Gear at
          <br />
          Every Mountain
        </h1>
        <p className="max-w-lg text-2xl leading-relaxed text-neutral-700">
          To get started with your rentals reservation, select your mountain
          location, dates of rentals and preferences.
        </p>
        <p className="max-w-lg font-semibold text-xl">
          Epic Pass holders save an additional 20% -{" "}
          <span className="font-normal">sign in to your account.</span>
        </p>
      </div>

      <div className="space-y-6 rounded-2xl border border-neutral-200 p-6">
        <div className="space-y-2">
          <label className="font-semibold text-neutral-700 text-sm">Resort</label>
          <select className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg">
            <option>Beaver Creek</option>
            <option>Vail</option>
            <option>Breckenridge</option>
          </select>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-neutral-700 text-sm uppercase">
            Interested In
          </p>
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            {(["winter", "summer"] as const).map((seasonValue) => (
              <button
                key={seasonValue}
                type="button"
                onClick={() => onSeasonChange(seasonValue)}
                className={`rounded-full px-5 py-2 font-semibold text-sm capitalize ${
                  season === seasonValue
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700"
                }`}
              >
                {seasonValue}
              </button>
            ))}
          </div>

          <div
            className={`grid gap-3 ${
              activities.length > 1 ? "md:grid-cols-3" : "md:grid-cols-1"
            }`}
          >
            {activities.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onActivityChange(option)}
                className={`rounded-xl border-2 p-5 text-left transition ${
                  activity === option
                    ? "border-orange-400 bg-orange-50"
                    : "border-neutral-200 bg-neutral-50"
                }`}
              >
                <div className="mb-3 text-4xl">
                  {option === "skiing"
                    ? "🎿"
                    : option === "snowboarding"
                      ? "🏂"
                      : option === "both"
                        ? "🎿🏂"
                        : "🚲"}
                </div>
                <div className="font-black text-lg uppercase">
                  {titleCase(option)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-neutral-700 text-sm uppercase">
            Choose Your Rental Dates & Number of Guests
          </p>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_120px]">
            <input
              defaultValue="3/13/2026"
              className="rounded-xl border border-neutral-300 px-4 py-3 text-lg"
              type="text"
              aria-label="Start date"
            />
            <input
              defaultValue="3/17/2026"
              className="rounded-xl border border-neutral-300 px-4 py-3 text-lg"
              type="text"
              aria-label="End date"
            />
            <select
              className="rounded-xl border border-neutral-300 px-4 py-3 text-lg"
              aria-label="Guests"
            >
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
            </select>
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="font-semibold text-neutral-700 text-sm uppercase">
            Fulfillment
          </legend>
          <label className="flex items-center gap-2 text-lg">
            <input type="radio" defaultChecked name="fulfillment" />
            <span>Pick Up</span>
          </label>
          <label className="flex items-center gap-2 text-lg">
            <input type="radio" name="fulfillment" />
            <span>Delivery (complimentary)</span>
          </label>
        </fieldset>

        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-xl bg-neutral-900 px-6 py-4 font-black text-lg text-white uppercase tracking-wide hover:bg-neutral-700"
        >
          Browse Gear & Packages
        </button>
      </div>
    </section>
  );
}
