import { httpClient } from "../../../api/httpClient";
import type { ProfileResponse } from "../types/settings.types";

export const getProfileApi = (): Promise<ProfileResponse> => {
  return httpClient.get("/profile");
};
