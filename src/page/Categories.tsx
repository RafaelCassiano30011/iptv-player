import ListCategories from "../components/ListCategories";
import { getStreams, Stream } from "../modules/getStreams";
import StreamCard from "../components/StreamCard";
import GlobalProvider, { useGlobal } from "../context/Global";
import Player from "../components/Player";
import { useState } from "react";

type StreamType = "live" | "series" | "movies";

function Categories() {
  const { categories } = useGlobal();
  const [streams, setStreams] = useState<Stream[]>([]);
  const { selectStream } = useGlobal();
  const url = new URL(window.location.href);
  const type = url.searchParams.get("type") as StreamType;

  //const [state, setState] = useState("");

  if (!categories) return null;

  const handleGetStreams = async (category_id: string) => {
    const data = await getStreams({
      type,
      category_id,
    });

    setStreams(data);
  };

  const categoriesType = categories[type];

  if (!categoriesType) return null;

  return (
    <div className="flex-1 max-w-7xl h-full w-full mx-auto flex gap-10 justify-between py-8 overflow-hidden">
      <ListCategories handleFunction={handleGetStreams} categories={categoriesType} />

      {selectStream && selectStream.id ? (
        <Player />
      ) : (
        <ul className="w-full grid grid-cols-4 gap-10 overflow-y-auto overflow-x-hidden py-5 pr-3">
          {streams.map((stream) => {
            return (
              <StreamCard
                img={stream.stream_icon ?? stream.cover}
                stream_id={stream.stream_id ?? stream.series_id}
                type={stream.stream_type}
                {...stream}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

function CategoriesProvider() {
  return (
    <GlobalProvider>
      <Categories />
    </GlobalProvider>
  );
}

export default CategoriesProvider;
