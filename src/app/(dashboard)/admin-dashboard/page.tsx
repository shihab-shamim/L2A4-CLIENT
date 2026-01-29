import { userService } from "@/service/user.service";
import Link from "next/link";
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  TUTOR = "TUTOR",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
}
export type User = {
  id: string;              // uuid
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  avatarUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default async function AdminDashboardPage() {
  const {data,error}=await userService.getAllUsers();
  
  const activeTutor= data.data.filter((item:User) => item.status ==="ACTIVE" && item.role ==="TUTOR");
    const {data:category,error:categoryError}=await userService.getAllCategory()


  return (
    // ✅ prevents left-to-right scrollbar
    <div className="w-full overflow-y-auto">
      <div className="min-h-[70vh] w-full max-w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        {/* Header */}
        <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Admin Panel
          </p>

          <h1 className="mt-2 break-words text-xl font-semibold text-gray-900 sm:text-2xl lg:text-3xl">
            Welcome back 👋
          </h1>

          <p className="mt-2 max-w-2xl break-words text-sm text-gray-600 sm:text-base">
            Manage users, monitor activity, and keep the platform healthy.
          </p>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/admin-dashboard/users"
              className="inline-flex w-full min-w-0 items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Manage Users
            </Link>

           

            
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Total Users
            </p>
            <div className="mt-3 h-8 w-24 rounded bg-gray-100" />
              {data.data.length || 0}
            <p className="mt-3 break-words text-sm text-gray-600">
              Overview of all registered accounts.
            </p>
          </div>

          <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Active Tutors
            </p>
            <div className="mt-3 h-8 w-24 rounded bg-gray-100" />
            {activeTutor.length || 0}
            <p className="mt-3 break-words text-sm text-gray-600">
              Tutors currently available and active.
            </p>
          </div>
          <div className="w-full max-w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Total Category
            </p>
            <div className="mt-3 h-8 w-24 rounded bg-gray-100" />
            {category.data.length || 0}
            <p className="mt-3 break-words text-sm text-gray-600">
              Tutors currently available and active.
            </p>
          </div>

         
        </div>

        {/* Recent Activity */}
        
      </div>
    </div>
  );
}
