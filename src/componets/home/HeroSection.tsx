"use client"

type HeroSectionProps = {
  onBrowseTutors?: () => void;
  onGetStarted?: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onBrowseTutors, onGetStarted }) => {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* Left */}
          <div>
            <p className="inline-flex items-center rounded-full border bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
              SkillBridge • Tutor Marketplace
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Connect with Expert Tutors, Learn Anything
            </h1>

            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Browse tutors by subject, rating, and price. View availability and book sessions instantly.
              Built for students, tutors, and admins with role-based access.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onBrowseTutors}
                className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 cursor-pointer"
              >
                Browse Tutors
              </button>
              <button
                type="button"
                onClick={onGetStarted}
                className="rounded-xl border px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 cursor-pointer"
              >
                Get Started
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500">
              <span className="rounded-full border bg-white px-3 py-1">Instant Booking</span>
              <span className="rounded-full border bg-white px-3 py-1">Verified Tutors</span>
              <span className="rounded-full border bg-white px-3 py-1">Reviews & Ratings</span>
              <span className="rounded-full border bg-white px-3 py-1">Availability Slots</span>
            </div>
          </div>

          {/* Right (simple illustration) */}
          <div className="rounded-2xl border bg-gray-50 p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { title: "Student", desc: "Find tutors & book sessions" },
                { title: "Tutor", desc: "Manage profile & availability" },
                { title: "Admin", desc: "Moderate users & bookings" },
                { title: "Secure", desc: "Role-based permissions" },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border bg-white p-4">
                  <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-gray-900 p-4 text-white">
              <p className="text-sm font-semibold">Tip</p>
              <p className="mt-1 text-sm text-gray-200">
                Search by subject, then filter by rating and price to find the best match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
