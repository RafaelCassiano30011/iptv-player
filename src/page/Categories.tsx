import { useCallback, useEffect, useState } from "react";
import { getCategories, CategorieType } from "../modules/getCategories";
import { getUser } from "../utils/getUser";
import ListCategories from "../components/ListCategories";
import { getStreams, Stream } from "../modules/getStreams";
import StreamCard from "../components/StreamCard";

type StreamType = "live" | "series" | "movies";

function Categories() {
  const [categories, setCategories] = useState<CategorieType[]>();
  const [streams, setStreams] = useState<Stream[]>([]);
  //const [state, setState] = useState("");

  const handleGetStreams = async (category_id: string) => {
    const user = getUser();
    const url = new URL(window.location.href);
    const type = url.searchParams.get("type") as StreamType;

    const data = await getStreams({
      ...user,
      type,
      category_id,
    });

    console.log(data);

    setStreams(data);
  };

  const getCategoriesAsync = useCallback(async () => {
    const url = new URL(window.location.href);
    const type = url.searchParams.get("type") as StreamType;
    const user = getUser();

    const data = await getCategories({ ...user, type });

    setCategories(data);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    getCategoriesAsync();
  }, []);

  if (!categories) return null;

  return (
    <div className="flex-1 max-w-7xl h-full w-full mx-auto flex gap-10 justify-between py-8 overflow-hidden">
      <ListCategories handleFunction={handleGetStreams} categories={categories} />

      <ul className="w-full grid grid-cols-4 gap-10 overflow-y-auto overflow-x-hidden py-5 pr-3">
        {streams.map((stream) => {
          return (
            <StreamCard
              img={stream.stream_icon ?? stream.cover}
              name={stream.name}
              stream_id={stream.stream_id ?? stream.series_id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
