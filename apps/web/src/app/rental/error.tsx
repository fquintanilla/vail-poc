"use client";

import { useEffect } from "react";

type RentalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RentalErrorPage({ error, reset }: RentalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-700 text-sm uppercase tracking-wider">
          Rental Experience Error
        </p>
        <h1 className="mt-2 font-black text-4xl text-red-900">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-red-800">
          We could not load this step right now. Please try again.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
          >
            Try Again
          </button>
          <a
            className="rounded-xl border border-red-300 bg-white px-5 py-3 font-semibold text-red-800 hover:bg-red-100"
            href="/"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
