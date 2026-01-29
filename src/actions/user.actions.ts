
"use server"

import { userService } from "@/service/user.service"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { env } from "process";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" ;
  callbackURL?: string;
}
type Category = {
  name: string;
  slug: string;
  isActive: boolean;
};

const API_URL=env.API_URL;
export const updateUserAction =async({email,status}:{
    email: string;
    status: "ACTIVE" | "BANNED";
  })=>{

  const {data,error}=await userService.updateUserAction({email,status})
  revalidateTag("users","max");
  return {data,error}

}
export type TutorProfileData = {
  headline: string;
  about: string;
  hourlyRate: number;
  currency: string // চাইলে extend করা যাবে
  subjects: string[];
  languages: string[];
  isFeatured: boolean;
};
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

type ActionResult<T> = {
  data: T | null;
  error: { message: string } | null;
};

export async function tutorProfileCreateAndUpdate(
  information: TutorProfileData
) {
  // 1) session
  const { data: session, error: sessionError } = await userService.getSession();

  if (sessionError || !session?.user?.id) {
    return { data: null, error: sessionError ?? { message: "Unauthorized" } };
  }

  const userId = session.user.id;
  const cookieStore = await cookies();

  // 2) check existing profile
  const { data: profile, error: profileError } = await userService.getTutorProfile(
    { userId }
  );

  try {
    // If your getTutorProfile returns { success, data }, unwrap here:
    const existing = (profile )?.data ?? profile; // adjust based on your service

    // 3) UPDATE
    if (existing?.id) {
      const res = await fetch(`${API_URL}/api/tutors`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...information,
          userId,
          id: existing.id,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        return { data: null, error: { message: json?.error || "Update failed" } };
      }

      revalidateTag("tutorProfile","max");
      return { data: json, error: null };
    }

    // 4) CREATE
    // If profileError indicates "not found", we create. Otherwise error out.
    // (If your getTutorProfile returns error for 404, you may check message/status)
    const res = await fetch(`${API_URL}/api/tutors`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...information,
        userId,
      }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return { data: null, error: { message: json?.error || "Create failed" } };
    }

    revalidateTag("tutorProfile","max");
    return { data: json, error: null };
  } catch (e) {
    return { data: null, error: { message: "Something went wrong" } };
  }
}

export async function AvailabilitySlotDelete(deleteId:string) {
  try {
     const cookieStore= await cookies()

    // 4) CREATE
    // If profileError indicates "not found", we create. Otherwise error out.
    // (If your getTutorProfile returns error for 404, you may check message/status)
    const res = await fetch(`${API_URL}/api/availability/${deleteId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString()
      }
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return { data: null, error: { message: json?.error || "Create failed" } };
    }

    revalidateTag("slots","max");
    return { data: json, error: null };
  } catch (e) {
    return { data: null, error: { message: "Something went wrong" } };
  }
  
}

export async function AvailabilitySlotUpdate(
  updatedId: string,
  information: { startTime: string; endTime: string }
) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/availability/${updatedId}`, {
      method: "PUT",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(information),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return { data: null, error: { message: json?.error || "Update failed" } };
    }

    revalidateTag("slots");
    return { data: json, error: null };
  } catch {
    return { data: null, error: { message: "Something went wrong" } };
  }
}



export async function createAvailabilitySlot(input: {
  startTime: string; // ISO
  endTime: string; // ISO
}) {
  try {
    // 1) session (service pattern)
    const sessionRes = await userService.getSession();
    const userId = sessionRes.data?.user?.id;

    if (!userId) {
      return {
        data: null,
        error: { message: sessionRes.error?.message || "session is missing" },
      };
    }

    // 2) tutor profile (service pattern) -> profile data shape: { success, data }
    const tutorProfileRes = await userService.getTutorProfile({ userId });

    if (tutorProfileRes.error) {
      return { data: null, error: { message: tutorProfileRes.error.message } };
    }

    const tutorId = tutorProfileRes.data?.data?.userId; // ✅ IMPORTANT
  
    if (!tutorId) {
      return { data: null, error: { message: "Tutor profile not found" } };
    }

    // 3) create slot
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/availability`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tutorId,
        startTime: input.startTime,
        endTime: input.endTime,
      }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        data: null,
        error: {
          message: json?.error || json?.message || `HTTP ${res.status}`,
        },
      };
    }

    // ✅ revalidate tag for slot list
    revalidateTag("slots");

    return { data: json, error: null };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "something went wrong";
    return { data: null, error: { message } };
  }
}


export async function deleteCategory(id: string) {
  try {
    if (!id) return { data: null, error: { message: "Category id is required" } };

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/category?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // ❗ HTTP error handle
    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const errBody = await res.json();
        msg = errBody?.message || errBody?.error || msg;
      } catch {}
      return { data: null, error: { message: msg } };
    }
    
    const result = await res.json();
    revalidateTag("category","max")
    return { data: result, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return { data: null, error: { message } };
  }
}
export async function updateCategory(id: string,info:Category) {
  try {
    if (!id) return { data: null, error: { message: "Category id is required" } };

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/category?id=${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body:JSON.stringify(info)
    });

    // ❗ HTTP error handle
    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const errBody = await res.json();
        msg = errBody?.message || errBody?.error || msg;
      } catch {}
      return { data: null, error: { message: msg } };
    }
    
    const result = await res.json();
    revalidateTag("category","max")
    return { data: result, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return { data: null, error: { message } };
  }
}

export async function addCategory(data:Category) {
  try {
    

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/category`, {
      method:"POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body:JSON.stringify(data)
    });

    // ❗ HTTP error handle
    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const errBody = await res.json();
        msg = errBody?.message || errBody?.error || msg;
      } catch {}
      return { data: null, error: { message: msg } };
    }
    
    const result = await res.json();
    revalidateTag("category","max")
    return { data: result, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return { data: null, error: { message } };
  }
}

export async function updateStudentProfile(info:UserProfile) {
  try {


    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: "PUT",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body:JSON.stringify(info)
    });

    // ❗ HTTP error handle
    if (!res.ok) {
      let msg = `Request failed (${res.status})`;
      try {
        const errBody = await res.json();
        msg = errBody?.message || errBody?.error || msg;
      } catch {}
      return { data: null, error: { message: msg } };
    }
    
    const result = await res.json();
    revalidateTag("users","max")
    return { data: result, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong";
    return { data: null, error: { message } };
  }
}



  

