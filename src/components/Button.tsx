interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="w-full py-1 text-base bg-cyan-500 hover:bg-cyan-700 transition-all rounded-lg font-bold text-white"
      {...rest}
    >
      {children}
    </button>
  );
}
