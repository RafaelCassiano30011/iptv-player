import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LinkCustom from "../components/Link";

export default function Home() {
  const navigate = useNavigate();
  const userLogin = localStorage.getItem("userLogin");

  useEffect(() => {
    if (userLogin) return;

    navigate("/login");
  }, []);

  if (!userLogin) return null;

  return (
    <div className="flex justify-center items-center h-full gap-20">
      <LinkCustom text="Tv ao vivo" to={"/list?type=live"} />
      <LinkCustom text="Series" to={"/list?type=series"} />
      <LinkCustom text="Filmes" to={"/list?type=movies"} />
      {/*<video autoPlay controls>
        <source
          src="https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.ts"
          type="application/x-mpegURL"
        />
      </video>*/}
    </div>
  );
}
