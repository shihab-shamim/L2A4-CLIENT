"use server"

import { userService } from "@/service/user.service"
import { revalidateTag } from "next/cache";
type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" ;
  callbackURL?: string;
}

export const updateUserAction =async({email,status}:{
    email: string;
    status: "ACTIVE" | "BANNED";
  })=>{

  const {data,error}=await userService.updateUserAction({email,status})
  revalidateTag("users","max");
  return {data,error}

}
