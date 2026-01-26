"use server"

import { userService } from "@/service/user.service"
type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" ;
  callbackURL?: string;
};
export const createUser=async(data:CreateUserInput)=>{
    const user = await userService.createUser(data)
    return user 

}