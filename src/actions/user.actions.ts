"use server"

import { userService } from "@/service/user.service"
type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: "STUDENT" | "TUTOR" ;
  callbackURL?: string;
}
