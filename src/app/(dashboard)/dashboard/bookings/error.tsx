"use client";

import Link from "next/link";
import React from "react";

export default function TutorsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
          <span className="text-xl">⚠️</span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-center text-xl font-semibold text-gray-900 sm:text-2xl">
          Couldn’t load tutors
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
          Something went wrong while fetching tutors. Please try again.
        </p>

        {/* Details (optional) */}
        <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            What you can do
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>Check your internet connection</li>
            <li>Reload the page</li>
            <li>Try again in a moment</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl border border-gray-200 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Try Again
          </button>

          

          <Link
            href="/"
            className="rounded-xl border border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200 text-center"
          >
            Go Home
          </Link>
        </div>

        {/* Motivation */}
        <p className="mt-6 text-center text-xs italic text-gray-500">
          “A small delay doesn’t stop progress — keep going.”
        </p>

        {/* Optional: show digest in dev */}
        {process.env.NODE_ENV !== "production" && (
          <p className="mt-3 text-center text-[11px] text-gray-400">
            Debug: {error?.message || "Unknown error"}
          </p>
        )}
      </div>
    </div>
  );
}
