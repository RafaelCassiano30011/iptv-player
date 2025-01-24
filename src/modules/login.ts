import { proxy } from "../api";
import { LoginResponse } from "./types";

interface IptvLoginProps {
  username: string;
  password: string;
  BASE_URL: string;
}

export async function login({ username, password, BASE_URL }: IptvLoginProps): Promise<LoginResponse | null> {
  try {
    const response = await proxy(`${BASE_URL}/player_api.php?username=${username}&password=${password}`);

    const data = await response.data;

    return data;
  } catch (err) {
    console.error({
      module: "login",
      err,
    });
  }

  return null;
}
