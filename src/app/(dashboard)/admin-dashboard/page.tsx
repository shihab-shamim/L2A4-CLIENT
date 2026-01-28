import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    // ✅ prevents left-to-right scrollbar
    <div className="w-full overflow-y-auto">
      <div className="min-h-[70vh] w-full max-w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* Header */}
        <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Admin Panel
          </p>

          <h1 className="mt-2 break-words text-xl font-semibold text-gray-900 sm:text-2xl lg:text-3xl">
            Welcome back 👋
          </h1>

          <p className="mt-2 max-w-2xl break-words text-sm text-gray-600 sm:text-base">
            Manage users, monitor activity, and keep the platform healthy.
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/admin-dashboard/users"
              className="inline-flex w-full min-w-0 items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Manage Users
            </Link>

            <Link
              href="/admin-dashboard/tutors"
              className="inline-flex w-full min-w-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Tutor Profiles
            </Link>

            <Link
              href="/admin-dashboard/bookings"
              className="inline-flex w-full min-w-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Bookings
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Total Users
            </p>
            <div className="mt-3 h-8 w-24 rounded bg-gray-100" />
            <p className="mt-3 break-words text-sm text-gray-600">
              Overview of all registered accounts.
            </p>
          </div>

          <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Active Tutors
            </p>
            <div className="mt-3 h-8 w-24 rounded bg-gray-100" />
            <p className="mt-3 break-words text-sm text-gray-600">
              Tutors currently available and active.
            </p>
          </div>

          <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Pending Issues
            </p>
            <div className="mt-3 h-8 w-24 rounded bg-gray-100" />
            <p className="mt-3 break-words text-sm text-gray-600">
              Reports, bans, and verification checks.
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-5 w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="min-w-0 break-words text-base font-semibold text-gray-900 sm:text-lg">
              Recent Activity
            </h2>

            <span className="w-fit max-w-full rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              Placeholder
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex min-w-0 flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-2">
                  <div className="h-3 w-56 max-w-full rounded bg-gray-200 sm:w-72" />
                  <div className="h-3 w-40 max-w-full rounded bg-gray-100 sm:w-56" />
                </div>

                <div className="h-8 w-24 shrink-0 rounded bg-gray-200 sm:h-7 sm:w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
