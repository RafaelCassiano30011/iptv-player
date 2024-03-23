interface Props {
  img: string;
  name: string;
  stream_id: number;
}

export default function StreamCard({ img, name, stream_id }: Props) {
  return (
    <li className="max-w-48 w-full object-contain cursor-pointer">
      <img src={img} alt={name} />
      <h3 className="text-gray-200 font-bold mt-3">{name}</h3>
    </li>
  );
}
