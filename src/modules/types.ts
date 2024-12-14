export const types: Type[] = ["live", "movies", "series"];

export type Type = "live" | "movies" | "series";

export interface Serverinfo {
  xui: boolean;
  version: string;
  revision: number;
  url: string;
  port: string;
  https_port: string;
  server_protocol: string;
  rtmp_port: string;
  timestamp_now: number;
  time_now: string;
  timezone: string;
}
export interface Userinfo {
  username: string;
  password: string;
  message?: string;
  auth: number;
  status: string;
  exp_date: string;
  is_trial: string;
  active_cons: number;
  created_at: string;
  max_connections: string;
  allowed_output_formats: string[];
}

export interface LoginResponse {
  user_info: Userinfo;
  server_info: Serverinfo;
}
