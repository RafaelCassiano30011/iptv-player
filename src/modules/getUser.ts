import { api } from "../api";
import { User } from "../types";

export const getUser = async (username: string): Promise<User | null> => {
  const response = await api.get(`/users/${username}`);

  return response?.data?.user;
};
