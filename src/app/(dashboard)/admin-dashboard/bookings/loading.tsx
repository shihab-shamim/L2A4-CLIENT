export default function TutorsLoading() {
  return (
    <div className="min-h-[70vh] w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-40 rounded bg-gray-200" />
        <div className="mt-3 h-7 w-72 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-full max-w-2xl rounded bg-gray-100" />
      </div>

      {/* Filters skeleton */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-32 rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Tutor cards skeleton */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-28 rounded bg-gray-100" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded bg-gray-100" />
              <div className="h-3 w-5/6 rounded bg-gray-100" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-9 w-28 rounded-xl bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
