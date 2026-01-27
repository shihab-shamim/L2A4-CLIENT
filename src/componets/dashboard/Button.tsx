"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUserAction } from "@/actions/user.actions";
// import { updateUserAction } from "@/actions/user.actions";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  emailVerified: boolean;
  createdAt: string;
};

const Button = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const nextStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";

  return (
    <button
      disabled={isPending}
      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
        user.status === "ACTIVE"
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-gray-900 text-white hover:bg-gray-800"
      }`}
      onClick={() =>
        startTransition(async () => {
          await updateUserAction({
            email: user.email, 
            status: nextStatus,
          });

        //   // 🔁 UI refresh (server components refetch)
        //   router.refresh();
        })
      }
    >
      {isPending
        ? "Updating..."
        : user.status === "ACTIVE"
        ? "Ban"
        : "Activate"}
    </button>
  );
};

export default Button;
