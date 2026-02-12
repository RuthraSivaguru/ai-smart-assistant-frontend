import { z } from "zod";
import { LoginSchema } from "../schemas/login.schema";
import { RegisterSchema } from "../schemas/register.schema";

export type LoginPayload = z.infer<typeof LoginSchema>;
export type RegisterPayload = z.infer<typeof RegisterSchema>;

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface DeleteUserResponse {
  message: string;
}
