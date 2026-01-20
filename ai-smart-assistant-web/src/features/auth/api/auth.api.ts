import { httpClient } from "../../../api/httpClient";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/auth.types";

export const loginApi = (data: LoginPayload): Promise<LoginResponse> => {
  return httpClient.post("/auth/login", data);
};

export const registerApi = (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  return httpClient.post("/auth/register", data);
};
