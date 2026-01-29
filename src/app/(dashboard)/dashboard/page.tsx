import React from "react";

export default function Page() {
  return (
    <div className="min-h-[70vh] w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Student Dashboard
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
          Welcome Back 👋
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
          Every small step you take today brings you closer to your goals.
          Stay consistent, stay curious, and keep learning.
        </p>
      </div>

      {/* Motivation Cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">
            🌱 Learn Every Day
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            You don’t need to be perfect. You just need to be better than
            yesterday. Small daily progress creates big results.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">
            🎯 Stay Focused
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Focus on understanding, not memorizing. True learning happens when
            you ask questions and explore deeply.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900">
            🚀 Believe in Yourself
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Confidence comes from effort. Trust the process, trust your hard
            work, and success will follow.
          </p>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
        <p className="text-sm italic text-gray-700 sm:text-base">
          “Success is the sum of small efforts repeated day in and day out.”
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          — Stay Consistent
        </p>
      </div>

      {/* Closing Message */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          You’re on the Right Path ✨
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600">
          Learning is a journey, not a race. Keep showing up, keep practicing,
          and never hesitate to challenge yourself. Your future self will thank
          you.
        </p>
      </div>
    </div>
  );
}
