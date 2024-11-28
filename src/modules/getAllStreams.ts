import { getUser } from "../utils/getUser";
import { BASE_URL } from "./index";

interface GetStreamsProps {
  type: "live" | "series" | "movies";
}

export interface Stream {
  num: number;
  name: string;
  title: string;
  year: string;
  stream_type: string;
  stream_id?: number;
  series_id: number;
  cover: string;
  stream_icon?: string;
  plot: string;
  cast: string;
  director?: string;
  genre: string;
  release_date: string;
  releaseDate: string;
  last_modified: string;
  rating: string;
  rating_5based: number;
  backdrop_path: string[];
  youtube_trailer?: string;
  episode_run_time: string;
  category_id: string;
  category_ids: number[];
}

const streamsKeysFetch = {
  live: "live_streams",
  series: "series",
  movies: "vod_streams",
};

async function getStreamsAll({ type }: GetStreamsProps): Promise<Stream[]> {
  const { username, password } = getUser();

  const response = await fetch(
    `${BASE_URL}/player_api.php?&username=${username}&password=${password}&action=get_${streamsKeysFetch[type]}`
  );

  return await response.json();
}

export { getStreamsAll };