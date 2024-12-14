"use client";

import { useEffect } from "react";
import LinkCustom from "../components/Link";

export default function Home() {
  //const navigate = useNavigate();

  useEffect(() => {
    const userLogin = window.localStorage.getItem("userLogin");

    if (userLogin) return;

    //navigate("/login");
  }, []);

  return (
    <div className="flex justify-center items-center h-full gap-20">
      <LinkCustom text="Tv ao vivo" href={"/list?type=live"} />
      <LinkCustom text="Series" href={"/list?type=series"} />
      <LinkCustom text="Filmes" href={"/list?type=movies"} />
      {/*<video autoPlay controls>
        <source src="blob:http://cplayer.io/1cb92a42-fc36-495c-8f46-e1a322ebd704" type="application/x-mpegURL" />
      </video>*/}
    </div>
  );
}
