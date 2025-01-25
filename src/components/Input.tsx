interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className="pl-3 py-1 w-full outline-none border-2 border-transparent focus:border-cyan-500 rounded-lg transition-all font-bold text-base text-white bg-neutral-800"
    />
  );
}
