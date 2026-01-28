
const tutorProfileLoading = () => {
    return (
        <div className="min-h-[70vh] w-full p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-6 w-44 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-100" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-100" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Head */}
        <div className="grid grid-cols-6 gap-0 bg-gray-100 px-5 py-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 8 }).map((_, row) => (
            <div key={row} className="grid grid-cols-6 gap-0 px-5 py-4">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
              <div className="h-6 w-20 animate-pulse rounded bg-gray-100" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-10 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default tutorProfileLoading;