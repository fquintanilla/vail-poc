type RenterInformationStepProps = {
  onBack: () => void;
};

export function RenterInformationStep({ onBack }: RenterInformationStepProps) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="font-medium text-neutral-600 text-sm hover:text-neutral-900"
        >
          ← Back to cart
        </button>

        <h2 className="font-black text-6xl leading-tight tracking-tight uppercase">
          Provide Renter
          <br />
          Information
        </h2>
        <p className="max-w-xl text-3xl leading-relaxed text-neutral-700">
          For the best gear experience, enter your renter metrics and information.
          This will help the team ensure the most accurate gear ready for you - to
          get you on the slopes even faster.
        </p>
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="font-bold text-xs uppercase">First Name*</label>
            <input className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5" />
          </div>
          <div>
            <label className="font-bold text-xs uppercase">Last Name*</label>
            <input className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5" />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="font-bold text-xs uppercase">Date of Birth*</label>
            <input
              placeholder="xx / xx / xxxx"
              className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5"
            />
          </div>
          <div />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="font-bold text-xs uppercase">Height*</label>
            <input
              defaultValue="5.6 FT"
              className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="font-bold text-xs uppercase">Weight*</label>
            <input
              defaultValue="130 LBS"
              className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="font-bold text-xs uppercase">Shoe Size Type*</label>
            <select className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5">
              <option>US Womens</option>
              <option>US Mens</option>
              <option>EU</option>
              <option>UK</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-xs uppercase">Shoe Size*</label>
            <input
              defaultValue="8.5"
              className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="font-bold text-xs uppercase">
              Preferred Ski Length (Optional)
            </label>
            <input className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5" />
          </div>
          <div>
            <label className="font-bold text-xs uppercase">
              Preferred Mondopoint (Optional)
            </label>
            <input className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5" />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="font-bold text-xs uppercase">Gear Type</label>
            <select className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5">
              <option>Select</option>
              <option>Skis</option>
              <option>Snowboard</option>
            </select>
          </div>
          <div />
        </div>

        <fieldset className="space-y-2">
          <legend className="font-bold text-xs uppercase">Skier Type*</legend>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" name="skier-type" defaultChecked />
              <span>Type I - Cautious</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="skier-type" />
              <span>Type II - Moderate</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="skier-type" />
              <span>Type III - Aggressive</span>
            </label>
          </div>
        </fieldset>

        <div>
          <label className="font-bold text-xs uppercase">Special Requests (Optional)</label>
          <input className="mt-1 w-full rounded-lg border border-neutral-400 px-3 py-2.5" />
        </div>

        <button
          type="button"
          className="mt-2 rounded-lg bg-neutral-900 px-7 py-3 font-black text-white uppercase"
        >
          Checkout
        </button>
      </form>
    </section>
  );
}
