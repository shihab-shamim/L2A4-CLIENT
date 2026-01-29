import FeaturedTutorsSection from "@/componets/home/FeaturedTutorsSection";
import HeroSection from "@/componets/home/HeroSection";
import HowItWorksSection from "@/componets/home/HowItWorksSection";
import SearchAndFiltersSection from "@/componets/home/SearchAndFiltersSection";
import { userService } from "@/service/user.service";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string | null;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
};

export default async function Home() {
  const { data } = await userService.getSession();

  const user = (data?.user ?? null) as UserProfile | null;

  const featuredTutors = [
    { id: "1", name: "Ayesha Rahman", subject: "IELTS Speaking", rating: 4.9, pricePerHour: 18, totalReviews: 120 },
    { id: "2", name: "Tanvir Hasan", subject: "JavaScript & React", rating: 4.8, pricePerHour: 22, totalReviews: 95 },
    { id: "3", name: "Nusrat Jahan", subject: "Math (Algebra)", rating: 4.7, pricePerHour: 15, totalReviews: 80 },
  ];

  return (
    <div>
      <HeroSection />
      <SearchAndFiltersSection />
      <FeaturedTutorsSection tutors={featuredTutors} />
      <HowItWorksSection user={user} />
    </div>
  );
}
