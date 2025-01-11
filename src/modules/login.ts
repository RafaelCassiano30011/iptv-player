import { LoginResponse } from "./types";
import axios from "axios";

export interface IptvLoginProps {
  username: string;
  password: string;
  BASE_URL: string;
}

export async function iptvLogin({ username, password, BASE_URL }: IptvLoginProps): Promise<LoginResponse> {
  console.log(`${BASE_URL}/player_api.php?username=${username}&password=${password}`);

  const response = axios.post("/api/proxy", {
    url: `${BASE_URL}/player_api.php?username=${username}&password=${password}`,
  });

  const data = (await response).data;


  return data;
}
