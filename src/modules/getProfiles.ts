import { api } from "../api";
import { Profile } from "../types";

export const getProfiles = async (user_id: string): Promise<Profile[] | null> => {
  const response = await api.get(`/profile/${user_id}`);

  return response?.data?.profiles;
};
