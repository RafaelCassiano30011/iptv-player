import { BASE_URL } from "./index";

interface GetStreamsProps {
  username: string;
  password: string;
  type: "live" | "series" | "movies";
  category_id: string;
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

async function getStreams({ username, password, type, category_id }: GetStreamsProps): Promise<Stream[]> {
  const response = await fetch(
    `${BASE_URL}/player_api.php?&username=${username}&password=${password}&action=get_${streamsKeysFetch[type]}&category_id=${category_id}`
  );

  return await response.json();
}

export { getStreams };
