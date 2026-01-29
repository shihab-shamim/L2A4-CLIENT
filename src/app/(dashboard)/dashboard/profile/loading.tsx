import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full">
            <div className="h-3 w-28 rounded bg-gray-200" />
            <div className="mt-3 h-7 w-64 rounded bg-gray-200 sm:w-80" />
            <div className="mt-3 h-4 w-full max-w-2xl rounded bg-gray-100" />
            <div className="mt-2 h-4 w-5/6 max-w-xl rounded bg-gray-100" />
          </div>

          {/* Spinner */}
          <div className="shrink-0">
            <div className="h-10 w-10 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
          </div>
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-full rounded bg-gray-100" />
            <div className="mt-2 h-4 w-11/12 rounded bg-gray-100" />
            <div className="mt-2 h-4 w-10/12 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      {/* Bottom Skeleton */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-5 w-52 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-full max-w-3xl rounded bg-gray-100" />
        <div className="mt-2 h-4 w-5/6 max-w-2xl rounded bg-gray-100" />
        <div className="mt-2 h-4 w-2/3 max-w-xl rounded bg-gray-100" />
      </div>
    </div>
  );
}
