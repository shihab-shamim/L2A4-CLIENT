import { env } from "@/env"
import { methods } from "better-auth/react";
import { cookies } from "next/headers"



const API_URL=env.API_URL;
const AUTH_URL=env.AUTH_URL;

export  const userService={
    getSession:async function (){
       try {
        
          const cookieStore= await cookies()
const res= await fetch(`${AUTH_URL}/get-session`,{
  headers:{
    Cookie:cookieStore.toString()
  },
  cache:"no-store"
})


 const session = await res.json()
 if(!session.user){
   return {data:null , error:{message:"session is missing"}}
 }
 return {data:session,error:null}
       } catch (error) {
        return {data:null , error:{message:"something went wrong"}}
       }

    },
     getAllUsers:async function (){
       try {
        
          const cookieStore= await cookies()
      const res= await fetch(`${API_URL}/api/users`,{
        headers:{
          Cookie:cookieStore.toString()
        },
        cache:"no-store"
       , next: {
          tags: ["users"],
        },
      })



       const user = await res.json()
        if(!user){
          return {data:null , error:{message:"session is missing"}}
        }
        return {data:user,error:null}
              } catch (error) {
                return {data:null , error:{message:"something went wrong"}}
              }

            },
   updateUserAction: async function ({
    email,
    status,
  }: {
    email: string;
    status: "ACTIVE" | "BANNED";
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${API_URL}/api/users?email=${encodeURIComponent(email)}&status=${status}`,
        {
          method: "PUT",
          headers: {
            Cookie: cookieStore.toString(),
          },
          next: { tags: ["users"] },
        }
      );

      if (!res.ok) {
        const err = await res.text().catch(() => "");
        return { data: null, error: { message: err || "Failed to update user" } };
      }

      

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
 
  getTutorProfile: async function ({
    userId,
  }: {
    userId: string;
  }) {
    try {
      if (!userId) {
        return { data: null, error: { message: "userId missing" } };
      }

      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/tutors?userId=${userId}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { tags: ["tutorProfile"] },
      });

      // IMPORTANT: non-2xx handle
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        return {
          data: null,
          error: { message: txt || `HTTP ${res.status}` },
        };
      }

      const json = await res.json();
      // backend returns { success, data }
      return { data: json, error: null };
    } catch (e) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
getAvailabilitySlot: async function () {
  try {
    const session = await userService.getSession();
    const tutorId = session.data?.user?.id;

    if (!tutorId) {
      return { data: null, error: { message: "unauthorized" } };
    }

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/availability/${tutorId}`, {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
      next: { tags: ["slots"] },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { data: null, error: { message: txt || `HTTP ${res.status}` } };
    }

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
},

getAllCategory:async function(){

   try {
        
          const cookieStore= await cookies()
      const res= await fetch(`${API_URL}/api/category`,{
        headers:{
          Cookie:cookieStore.toString()
        },
        cache:"no-store"
       , next: {
          tags: ["category"],
        },
      })



       const category = await res.json()
        if(!category){
          return {data:null , error:{message:"session is missing"}}
        }
        return {data:category,error:null}
              } catch (error) {
                return {data:null , error:{message:"something went wrong"}}
              }

},

getAllTutorsProfile:async function(){

   try {
      const res= await fetch(`${API_URL}/api/alltutors`,{
        cache:"no-store"
       , next: {
          tags: ["alltutors"],
        },
      })



       const category = await res.json()
        if(!category){
          return {data:null , error:{message:"all tutors get filed"}}
        }
        return {data:category,error:null}
              } catch (error) {
                return {data:null , error:{message:"something went wrong"}}
              }

},
myBooking: async function () {
  const session = await userService.getSession();

  const id = session.data?.user?.id;
  if (!id) {
    return { data: null, error: { message: "unauthorized" } };
  }

  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/booking/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: ["booking"] },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { data: null, error: { message: txt || `HTTP ${res.status}` } };
    }

    const json = await res.json();
    return { data: json, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
},

getAllBooking:async function () {

  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/booking`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: { tags: ["booking"] },
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { data: null, error: { message: txt || `HTTP ${res.status}` } };
    }

    const json = await res.json();
    return { data: json, error: null };
  } catch {
    return { data: null, error: { message: "something went wrong" } };
  }
},

  

    
}