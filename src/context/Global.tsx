import { useContext, createContext, useState, useEffect } from "react";
import { getStreamsAll, Stream } from "../modules/getAllStreams";
import { isLastModifiedOlderThanThreeDays } from "../utils/isLastModifiedOlderThanThreeDays";
import { all } from "axios";

interface Props {
  children?: React.ReactNode;
}

export interface StreamFormated {
  genre: string;
  streams: Stream[];
}

interface GlobalContextType {
  allStreams: Stream[];
  series: StreamFormated[];
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalProvider({ children }: Props) {
  const [allStreams, setAllStreams] = useState<Stream[]>([]);
  const [series, setSeries] = useState<StreamFormated[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const allSeries = await getStreamsAll({ type: "series" });

      const seriesForGenre = allSeries.reduce((acc: StreamFormated[], item: Stream) => {
        const genrySplit = item?.genre?.split(" ");

        const genrePrimary = genrySplit && genrySplit.length === 1 ? genrySplit[0] : "Outros";

        const categoryAlreadyExists = acc.find((category) => category.genre === genrePrimary);

        if (categoryAlreadyExists) {
          categoryAlreadyExists.streams.push(item);
        } else {
          acc.push({
            genre: genrePrimary,
            streams: [item],
          });
        }

        return acc;
      }, []);

      setSeries(seriesForGenre);
      setAllStreams([...allStreams, ...allSeries]);
    };

    fetchSeries();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        allStreams,
        series,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
