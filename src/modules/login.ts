import { BASE_URL } from "./index";
import { LoginResponse } from "./types";

interface IptvLoginProps {
  username: string;
  password: string;
}

export async function iptvLogin({ username, password }: IptvLoginProps): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/player_api.php?&username=${username}&password=${password}`);

  const data = await response.json();

  return data;
}
