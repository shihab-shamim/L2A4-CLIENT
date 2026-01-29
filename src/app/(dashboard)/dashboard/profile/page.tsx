// import { userService } from '@/service/user.service';
// import React from 'react';

// const StudentPage =async () => {
//     const {data,error}=await userService.getSession()
//     console.log(data.user);

//     return (
//         <div>This is student page 
            
//         </div>
//     );
// };

// export default StudentPage;

import EditButtonUser from "@/componets/user/EditButtonUser";
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

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default async function Page() {
        const {data,error}=await userService.getSession()


  const user: UserProfile = data.user

  const initials = user.name?.slice(0, 1)?.toUpperCase() || "U";

  return (
    <div className="min-h-[70vh] w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Profile
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
          Student Profile
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          Your account details and verification status.
        </p>
      </div>

      {/* Profile Card */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: Avatar + Basic */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="h-14 w-14 rounded-2xl border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-xl font-semibold text-gray-900">
                {initials}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-gray-900">
                {user.name}
              </p>
              <p className="truncate text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-800">
              Role: {user.role}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                user.status === "ACTIVE"
                  ? "border-gray-200 bg-white text-gray-900"
                  : "border-gray-200 bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  user.status === "ACTIVE" ? "bg-gray-900" : "bg-gray-400"
                }`}
              />
              {user.status}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                user.emailVerified
                  ? "border-gray-200 bg-white text-gray-900"
                  : "border-gray-200 bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  user.emailVerified ? "bg-gray-900" : "bg-gray-400"
                }`}
              />
              {user.emailVerified ? "Email Verified" : "Email Not Verified"}
            </span>
          </div>

          {/* Actions (static) */}
          <div className="mt-6 flex flex-col gap-3">
             <EditButtonUser user={user}/>
 
           
          </div>
        </div>

        {/* Right: Details */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            These details help keep your account secure.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Info label="User ID" value={user.id} mono />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone ?? "Not added"} />
            <Info label="Role" value={user.role} />
            <Info label="Status" value={user.status} />
            <Info label="Email Verified" value={user.emailVerified ? "Yes" : "No"} />
            <Info label="Created At" value={formatDate(user.createdAt)} />
            <Info label="Updated At" value={formatDate(user.updatedAt)} />
          </div>

         
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-semibold text-gray-900 ${
          mono ? "font-mono text-xs sm:text-sm" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
