import { useGlobal } from "../context/Global";
import { Stream } from "../modules/getStreams";

interface Props extends Stream {
  img: string;
  stream_id: number;
  type: string;
}

export default function StreamCard({ img, name, stream_id, type }: Props) {
  const { addSelectStream } = useGlobal();

  return (
    <li
      onClick={() => {
        if (type === "live" || type === "movies") {
          addSelectStream(stream_id, type);
        }
      }}
      className="max-w-48 w-full object-contain cursor-pointer"
    >
      <img
        onError={(e) => {
          e.currentTarget.classList.add("hidden");
        }}
        src={img}
        alt={name}
      />
      <h3 className="text-gray-200 font-bold mt-3">{name}</h3>
    </li>
  );
}
