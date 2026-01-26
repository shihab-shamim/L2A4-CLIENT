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
