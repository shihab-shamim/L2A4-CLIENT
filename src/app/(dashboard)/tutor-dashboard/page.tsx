

// app/tutor/dashboard/page.tsx
import Link from "next/link";

export default function TutorDashboardPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tutor Dashboard
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl lg:text-3xl">
                Session Stats
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
                Track your teaching performance, upcoming sessions, and reviews.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/tutor-dashboard/availability"
                className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 sm:w-auto"
              >
                Set Availability
              </Link>
              <Link
                href="/tutor-dashboard/profile"
                className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Total Sessions"
            value="128"
            hint="+12 this month"
            accent="bg-indigo-600"
          />
          <KpiCard
            label="Upcoming"
            value="6"
            hint="Next: Tomorrow 7:30 PM"
            accent="bg-emerald-600"
          />
          <KpiCard
            label="Avg Rating"
            value="4.8"
            hint="From 54 reviews"
            accent="bg-amber-500"
          />
          <KpiCard
            label="Earnings"
            value="$1,240"
            hint="This month"
            accent="bg-gray-900"
          />
        </div>

        {/* Main Grid */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Upcoming Sessions */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Upcoming Sessions
              </h2>
              <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                Static
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { time: "Tomorrow • 7:30 PM", student: "Ayesha Rahman", subject: "English", status: "Confirmed" },
                { time: "Fri • 9:00 PM", student: "Sabbir Hossain", subject: "Math", status: "Confirmed" },
                { time: "Sat • 6:00 PM", student: "Nusrat Jahan", subject: "Physics", status: "Pending" },
                { time: "Sun • 8:15 PM", student: "Rafi Hasan", subject: "Programming", status: "Confirmed" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {s.student} • <span className="font-medium text-gray-600">{s.subject}</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-600">{s.time}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusPill status={s.status as "Confirmed" | "Pending"} />
                    <button className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Performance */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Performance
              </h2>

              <div className="mt-4 space-y-4">
                <MetricRow label="Completion Rate" value="92%" bar={92} />
                <MetricRow label="On-time Start" value="88%" bar={88} />
                <MetricRow label="Response Rate" value="95%" bar={95} />
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Recent Reviews
                </h2>
                <Link
                  href="/tutor/profile"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { name: "Ayesha", rating: "5.0", text: "Explained concepts clearly and patiently." },
                  { name: "Sabbir", rating: "4.5", text: "Great session—very helpful examples." },
                  { name: "Nusrat", rating: "4.8", text: "Friendly and well-structured teaching." },
                ].map((r, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                      <span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                        ★ {r.rating}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-500">
          This is a static dashboard UI. Connect your real data later.
        </p>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </p>
        <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
      </div>

      <p className="mt-3 text-2xl font-semibold text-gray-900">{value}</p>
      <p className="mt-2 text-sm text-gray-600">{hint}</p>
    </div>
  );
}

function StatusPill({ status }: { status: "Confirmed" | "Pending" }) {
  const cls =
    status === "Confirmed"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";

  return (
    <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

function MetricRow({
  label,
  value,
  bar,
}: {
  label: string;
  value: string;
  bar: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-sm font-semibold text-gray-700">{value}</p>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ width: `${bar}%` }}
        />
      </div>
    </div>
  );
}
