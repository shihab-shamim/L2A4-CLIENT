export type Tutor = {
  id: string;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  location: string;
  experience: number; // years
};
// Availability slot
export type AvailabilitySlot = {
  id: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  isBooked: boolean;
};

// Tutor profile (detailed info)
export type TutorProfile = {
  id: string;
  userId: string;

  headline: string;
  about: string;

  hourlyRate: number;
  currency: "BDT" | "USD";

  subjects: string[];
  languages: string[];

  ratingAvg: number;
  totalReviews: number;
  totalSessions: number;

  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
};

// Main Tutor type
export type TutorP = {
  // ===== Existing fields (keep these) =====
  id: string;
  name: string;
  subject: string;
  rating: number;
  // reviews: number;
  pricePerHour: number;
  location: string;
  experience: number; // years

  // ===== Added fields =====
  image?: string | null;

  availability: AvailabilitySlot[];

  tutorProfile: TutorProfile;
  reviews:{
avgRating:number,
 totalReviews: number
  }
};


export const tutorsData: Tutor[] = [
  {
    id: "1",
    name: "Ayesha Rahman",
    subject: "IELTS & English",
    rating: 4.9,
    reviews: 124,
    pricePerHour: 18,
    location: "Dhaka",
    experience: 6,
  },
  {
    id: "2",
    name: "Tanvir Hasan",
    subject: "JavaScript & React",
    rating: 4.8,
    reviews: 98,
    pricePerHour: 22,
    location: "Chittagong",
    experience: 5,
  },
  {
    id: "3",
    name: "Nusrat Jahan",
    subject: "Math (Algebra)",
    rating: 4.7,
    reviews: 86,
    pricePerHour: 15,
    location: "Rajshahi",
    experience: 4,
  },
  {
    id: "4",
    name: "Mahmudul Islam",
    subject: "Physics",
    rating: 4.6,
    reviews: 72,
    pricePerHour: 20,
    location: "Khulna",
    experience: 7,
  },
  {
    id: "5",
    name: "Farzana Akter",
    subject: "Biology",
    rating: 4.8,
    reviews: 90,
    pricePerHour: 17,
    location: "Sylhet",
    experience: 5,
  },
  {
    id: "6",
    name: "Rakib Hossain",
    subject: "Python & Data Basics",
    rating: 4.5,
    reviews: 60,
    pricePerHour: 19,
    location: "Dhaka",
    experience: 3,
  },
];
