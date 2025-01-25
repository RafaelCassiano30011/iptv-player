interface AvatarProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
}

export default function Avatar({ name, ...rest }: AvatarProps) {
  const initials = name
    .trim()
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");

  const colors = ["cyan-500", "red-500", "yellow-500", "green-500", "blue-500", "indigo-500", "purple-500", "pink-500"];
  const randomIndex = Math.floor(Math.random() * colors.length);

  const color = colors[randomIndex];

  return (
    <button className={`flex items-center justify-center avatar-${color} rounded-full w-20 h-20 text-4xl text-white`} {...rest}>
      {initials}
    </button>
  );
}
