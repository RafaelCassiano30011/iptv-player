import { api } from "../api";
import { Profile } from "../types";

interface AddProfileProps {
  name: string;
  user_id: string;
}

export const addProfile = async ({ name, user_id }: AddProfileProps): Promise<Profile> => {
  const response = await api.post(`/profile`, {
    user_id,
    name,
  });

  return response?.data?.profile;
};
