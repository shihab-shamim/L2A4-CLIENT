import FeaturedTutorsSection from "@/componets/home/FeaturedTutorsSection";
import HeroSection from "@/componets/home/HeroSection";
import HowItWorksSection from "@/componets/home/HowItWorksSection";
import SearchAndFiltersSection from "@/componets/home/SearchAndFiltersSection";
import Image from "next/image";
export default function Home() {
  return (
   <div>
    <HeroSection/>
    <SearchAndFiltersSection/>
    <FeaturedTutorsSection tutors={[]}/>
    <HowItWorksSection/>
  
   </div>
  );
}
