import React from "react";

type StepItem = {
  title: string;
  description: string;
};

const HowItWorksSection: React.FC = () => {
  const steps: StepItem[] = [
    {
      title: "Browse Tutors",
      description: "Search by subject, filter by rating and price, then open tutor profiles.",
    },
    {
      title: "Book Instantly",
      description: "Pick available slots and confirm your booking in a few clicks.",
    },
    {
      title: "Attend & Learn",
      description: "Join the session, track your learning progress and completed bookings.",
    },
    {
      title: "Review Tutors",
      description: "Leave verified reviews after sessions to help the community.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900">How SkillBridge works</h2>
          <p className="mt-2 text-sm text-gray-600">
            A simple workflow for students and tutors—optimized for fast discovery and scheduling.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <div key={s.title} className="rounded-2xl border bg-gray-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white">
                  {idx + 1}
                </div>
                <p className="text-base font-semibold text-gray-900">{s.title}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-gray-900 p-6 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-semibold">Ready to start learning?</p>
              <p className="mt-1 text-sm text-gray-200">
                Create an account and book your first session today.
              </p>
            </div>
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
