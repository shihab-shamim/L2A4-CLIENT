// app/dashboard/components/DashboardNavbar.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;

  image: string | null;
  phone: string | null;

  role: UserRole;
  status: UserStatus;

  createdAt: Date;
  updatedAt: Date;
}

const navLinks: Record<UserRole, { label: string; href: string }[]> = {
  STUDENT: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Bookings", href: "/dashboard/bookings" },
    { label: "Profile", href: "/dashboard/profile" },
  ],
  TUTOR: [
    { label: "Dashboard", href: "/tutor/dashboard" },
    { label: "Availability", href: "/tutor/availability" },
    { label: "Profile", href: "/tutor/profile" },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Categories", href: "/admin/categories" },
  ],
};

const DashboardNavbar = () => {
  const pathname = usePathname();

  // 🔴 example UserRole (replace with real session)
   let role: UserRole = "TUTOR";
   const { data } = authClient.useSession();
   const user = (data?.user ?? null) as User | null;
  
   if(user){
    role=user?.role
   }



  return (
    <div className="flex h-full flex-col p-5">
      {/* Brand */}
      <div className="mb-8 text-xl font-bold text-gray-900">
        SkillBridge
      </div>

      {/* Nav links */}
      <nav className="space-y-1">
        {navLinks[role].map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition
                ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t pt-4">
        <Link href={"/"} className="w-full rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
          Home
        </Link>
      </div>
    </div>
  );
};

export default DashboardNavbar;
