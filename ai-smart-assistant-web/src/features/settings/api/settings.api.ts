import { httpClient } from "../../../api/httpClient";
import type { ProfileResponse } from "../types/settings.types";

export const getProfileApi = (): Promise<ProfileResponse> => {
  return httpClient.get("/profile");
};

export const updateProfileApi = (profile: ProfileResponse): Promise<void> => {
  return httpClient.put("/profile/update", profile);
};
