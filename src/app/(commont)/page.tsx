import FeaturedTutorsSection from "@/componets/home/FeaturedTutorsSection";
import HeroSection from "@/componets/home/HeroSection";
import HowItWorksSection from "@/componets/home/HowItWorksSection";
import SearchAndFiltersSection from "@/componets/home/SearchAndFiltersSection";


export  default async function Home() {

    const featuredTutors = [
    { id: "1", name: "Ayesha Rahman", subject: "IELTS Speaking", rating: 4.9, pricePerHour: 18, totalReviews: 120 },
    { id: "2", name: "Tanvir Hasan", subject: "JavaScript & React", rating: 4.8, pricePerHour: 22, totalReviews: 95 },
    { id: "3", name: "Nusrat Jahan", subject: "Math (Algebra)", rating: 4.7, pricePerHour: 15, totalReviews: 80 },
  ];
  return (
   <div>
    <HeroSection/>
    <SearchAndFiltersSection/>
    <FeaturedTutorsSection tutors={featuredTutors}/>
    <HowItWorksSection/>
  
   </div>
  );
}

// // import React from "react";
// import HeroSection from "../components/home/HeroSection";
// import SearchAndFiltersSection from "../components/home/SearchAndFiltersSection";
// import FeaturedTutorsSection, { TutorCard } from "../components/home/FeaturedTutorsSection";
// import HowItWorksSection from "../components/home/HowItWorksSection";

// const HomePage: React.FC = () => {
//   const featuredTutors: TutorCard[] = [
//     { id: "1", name: "Ayesha Rahman", subject: "IELTS Speaking", rating: 4.9, pricePerHour: 18, totalReviews: 120 },
//     { id: "2", name: "Tanvir Hasan", subject: "JavaScript & React", rating: 4.8, pricePerHour: 22, totalReviews: 95 },
//     { id: "3", name: "Nusrat Jahan", subject: "Math (Algebra)", rating: 4.7, pricePerHour: 15, totalReviews: 80 },
//   ];

//   return (
//     <main>
//       <HeroSection
//         onBrowseTutors={() => (window.location.href = "/tutors")}
//         onGetStarted={() => (window.location.href = "/register")}
//       />

//       <SearchAndFiltersSection
//         onSearch={(params) => {
//           // Example: redirect with query string; replace with your state/store as needed
//           const qs = new URLSearchParams({
//             q: params.query,
//             category: params.category,
//             rating: String(params.minRating),
//             price: String(params.maxPrice),
//           });
//           window.location.href = `/tutors?${qs.toString()}`;
//         }}
//       />

//       <FeaturedTutorsSection
//         tutors={featuredTutors}
//         onViewTutor={(id) => (window.location.href = `/tutors/${id}`)}
//       />

//       <HowItWorksSection />
//     </main>
//   );
// };

// export default HomePage;

