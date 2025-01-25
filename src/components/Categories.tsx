import { StreamFormated } from "../context/Global";

interface CategoriesProps extends StreamFormated {}

export default function Categories({ genre, streams }: CategoriesProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-4xl text-white font-bold mb-5">{genre}</h2>

      <ul className="flex">
        {streams.map((stream) => (
          <li key={stream.series_id} className="flex flex-col">
            <img src={stream.cover} alt={stream?.title} className="w-40 h-40" />
            <span>{stream?.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
