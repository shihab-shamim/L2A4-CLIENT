"use client";

import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
          <span className="text-xl">⚠️</span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
          Something went wrong
        </h1>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Don’t worry — this happens sometimes.  
          Take a deep breath and try again.
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-gray-200" />

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl border border-gray-200 bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Try Again
          </button>

          <a
            href="/dashboard"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Go to Dashboard
          </a>
        </div>

        {/* Motivation */}
        <p className="mt-6 text-xs italic text-gray-500">
          “Every error is a step closer to success.”
        </p>
      </div>
    </div>
  );
}
