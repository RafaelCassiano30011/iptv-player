import { proxy } from "../api";
import { LoginResponse } from "./types";

interface IptvLoginProps {
  username: string;
  password: string;
  BASE_URL: string;
}

export async function iptvLogin({ username, password, BASE_URL }: IptvLoginProps): Promise<LoginResponse> {
  const response = await proxy(`${BASE_URL}/player_api.php?username=${username}&password=${password}`);

  const data = await response.data;

  return data;
}
