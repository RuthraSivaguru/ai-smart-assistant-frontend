import { useSettingsStore } from "../../../store/settings.store";
import { getProfileApi, updateProfileApi } from "../api/settings.api";
import type { ProfileResponse } from "../types/settings.types";

export const useSettings = () => {
  const { setUser, setLoading } = useSettingsStore();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfileApi();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: ProfileResponse) => {
    setLoading(true);
    try {
      const response: any = await updateProfileApi(data);
      console.log("Profile updated successfully:", response);
      setUser(response?.updatedData);
      return response?.updatedData;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchProfile,
    updateProfile,
  };
};
