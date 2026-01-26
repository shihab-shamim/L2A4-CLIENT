"use client"
import Link from "next/link";
import React from "react";


const NotFoundPage: React.FC = () => {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon / Code */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-900 text-white text-2xl font-bold">
          404
        </div>

        {/* Text */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Sorry, the page you’re looking for doesn’t exist or may have been moved.
          Please check the URL or return to the home page.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Go to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Go Back
          </button>
        </div>

        {/* Footer hint */}
        <p className="mt-10 text-xs text-gray-500">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
