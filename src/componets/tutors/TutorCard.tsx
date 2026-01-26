import React from "react";
import { Tutor } from "./tutors.data";

type TutorCardProps = {
  tutor: Tutor;
  onViewProfile?: (id: string) => void;
};

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onViewProfile }) => {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-gray-900">
            {tutor.name}
          </p>
          <p className="mt-1 text-sm text-gray-600">{tutor.subject}</p>
        </div>

        <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
          {tutor.rating.toFixed(1)} ★
        </span>
      </div>

      {/* Info */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Experience</p>
          <p className="text-sm font-semibold text-gray-900">
            {tutor.experience}+ yrs
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-sm font-semibold text-gray-900">
            {tutor.location}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Reviews</p>
          <p className="text-sm font-semibold text-gray-900">
            {tutor.reviews}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-sm font-semibold text-gray-900">
            ${tutor.pricePerHour}/hr
          </p>
        </div>
      </div>

      {/* Actions */}
      <button
        type="button"
        onClick={() => onViewProfile?.(tutor.id)}
        className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
      >
        View Profile
      </button>
    </div>
  );
};

export default TutorCard;
