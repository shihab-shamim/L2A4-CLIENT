"use client"

export type TutorCard = {
  id: string;
  name: string;
  subject: string;
  rating: number; // 0-5
  pricePerHour: number;
  totalReviews: number;
};

type FeaturedTutorsSectionProps = {
  tutors: TutorCard[];
  onViewTutor?: (id: string) => void;
};

const FeaturedTutorsSection: React.FC<FeaturedTutorsSectionProps> = ({ tutors, onViewTutor }) => {
  return (
    <section className="border-y bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Tutors</h2>
            <p className="mt-1 text-sm text-gray-600">Top-rated tutors selected based on reviews and performance.</p>
          </div>

          <a
            href="/tutors"
            className="hidden rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 sm:inline-flex"
          >
            View all
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((t) => (
            <div key={t.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-gray-900">{t.name}</p>
                  <p className="mt-1 text-sm text-gray-600">{t.subject}</p>
                </div>
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                  {t.rating.toFixed(1)} ★
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-sm font-semibold text-gray-900">${t.pricePerHour}/hr</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Reviews</p>
                  <p className="text-sm font-semibold text-gray-900">{t.totalReviews}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onViewTutor?.(t.id)}
                className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <a
            href="/tutors"
            className="inline-flex w-full items-center justify-center rounded-xl border bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
          >
            View all tutors
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutorsSection;
