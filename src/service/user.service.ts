import { env } from "@/env"
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers"


const AUTH_URL=env.AUTH_URL;
type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" ;
  callbackURL?: string;
};

type ServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string; details?: unknown } };
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
    
}