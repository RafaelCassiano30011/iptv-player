import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
  text: string;
}

export default function LinkCustom({ text, ...rest }: Props) {
  return (
    <Link className="text-gray-200 font-black p-5 bg-neutral-800 hover:bg-transparent transition-all rounded" {...rest}>
      {text}
    </Link>
  );
}
