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

// const tutorProfileCreateAndUpdate=async(information:TutorProfileData)=>{
//    const { data: session, error: sessionError } = await userService.getSession();
//    const cookieStore = await cookies();
//    if(session.user.id){
//     const {data,error}= await userService.getTutorProfile(session.user.id);
//      if(data){
//      const tutorProfileUpdate=await fetch(`${API_URL}/api/tutors`,{
//       method:"PUT",
//        headers: {
//           Cookie: cookieStore.toString(),
//         },
//         cache: "no-store",
//         next: { tags: ["tutorProfile"] },
//         body:JSON.stringify({...information,userId:session.user.id,id:data.id})
//      })
//      console.log({tutorProfileUpdate});
//      }

//      else if(error){
//       return {error}
//      }
//      else{
//        const createTutorProfile=await fetch(`${API_URL}/api/tutors`,{
//       method:"POST",
//        headers: {
//           Cookie: cookieStore.toString(),
//         },
//         cache: "no-store",
//         next: { tags: ["tutorProfile"] },
//         body:JSON.stringify({...information,userId:session.user.id,id:data.id})
//      })
//      console.log({createTutorProfile});
//      }

//      }

  
//    }
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
    const existing = (profile as any)?.data ?? profile; // adjust based on your service

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


  

