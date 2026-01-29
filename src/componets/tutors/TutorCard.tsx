import React from "react";
import { TutorP } from "./tutors.data";
import Link from "next/link";

type TutorCardProps = {
  tutor: TutorP;
  // onViewProfile?: (id: string) => void;
};

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const profile = tutor;
  // console.log(tutor?.tutorProfile?.subjects);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* ===== Header ===== */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-gray-900">
            {tutor?.name}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {tutor?.tutorProfile?.subjects?.join(", ")}
          </p>
        </div>

        <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
          {/* {profile.ratingAvg.toFixed(1)} ★ */}
          {tutor?.reviews?.avgRating} ★
        </span>
      </div>

      {/* ===== Info Grid ===== */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Languages */}
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Languages</p>
          <p className="text-sm font-semibold text-gray-900">
            {/* {profile.languages.join(", ")} */}
            {tutor?.tutorProfile?.languages?.join(", ")}
          </p>
        </div>

     

        {/* Reviews */}
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Reviews</p>
          <p className="text-sm font-semibold text-gray-900">
            {/* {profile.totalReviews} */}
            {tutor?.reviews?.totalReviews} 
          </p>
        </div>

        {/* Price */}
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Hourly Rate</p>
          <p className="text-sm font-semibold text-gray-900">
            {/* {profile.hourlyRate} {profile.currency}/hr */}
               {tutor?.tutorProfile?.hourlyRate}-{tutor?.tutorProfile?.currency} 

          </p>
        </div>
      </div>

      {/* ===== Availability ===== */}
      <div className="mt-4">
        <p className="text-xs text-gray-500">Available Slots</p>
        <p className="text-sm font-semibold text-gray-900">
          {tutor.availability.filter((s) => !s.isBooked).length} slots available
        </p>
      </div>

      {/* ===== Action ===== */}
     <div>
       <Link href={`/tutors/${tutor.id}`}
        type="button"
        // onClick={() => onViewProfile?.(tutor.id)}
        className=" ml-50 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 cursor-pointer"
      >
        View Profile
      </Link>
     </div>

    </div>
    // <></>
  );
};

export default TutorCard;
