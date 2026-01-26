"use client"
import TutorCard from "@/componets/tutors/TutorCard";
import { Tutor, tutorsData } from "@/componets/tutors/tutors.data";
import React from "react";
// import TutorCard from "./TutorCard";
// import { tutorsData, Tutor } from "./tutors.data";

const TutorsPage: React.FC = () => {
  const handleViewProfile = (id: string): void => {
    // later replace with router navigation
    window.location.href = `/tutors/${id}`;
  };

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Tutors</h1>
          <p className="mt-2 text-sm text-gray-600">
            Find the best tutors by subject, rating, and price.
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorsData.map((tutor: Tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TutorsPage;
