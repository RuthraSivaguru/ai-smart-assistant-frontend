import { useSettingsStore } from "../../../store/settings.store";
import { getProfileApi } from "../api/settings.api";

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

  return {
    fetchProfile,
  };
};
