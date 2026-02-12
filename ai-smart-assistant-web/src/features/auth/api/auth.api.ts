import { httpClient } from "../../../api/httpClient";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  DeleteUserResponse,
} from "../types/auth.types";

export const loginApi = (data: LoginPayload): Promise<LoginResponse> => {
  return httpClient.post("/auth/login", data);
};

export const registerApi = (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  return httpClient.post("/auth/register", data);
};

export const deleteUserApi = (id: string): Promise<DeleteUserResponse> => {
  return httpClient.delete(`/auth/delete-user/${id}`);
};
