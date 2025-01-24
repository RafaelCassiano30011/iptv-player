import { api } from "../api";
import { User } from "../types";

export const createdUser = async (username: string): Promise<User | null> => {
  const response = await api.post("/users", {
    username,
  });

  return response?.data?.user;
};
