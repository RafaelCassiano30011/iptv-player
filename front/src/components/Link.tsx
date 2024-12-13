import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
  text: string;
}

export default function LinkCustom({ text, ...rest }: Props) {
  return (
    <Link className="text-white font-black p-5 bg-cyan-500 hover:bg-cyan-800 transition-all rounded" {...rest}>
      {text}
    </Link>
  );
}
