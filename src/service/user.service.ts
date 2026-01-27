import { env } from "@/env"
import { authClient } from "@/lib/auth-client";
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

            }
    
}