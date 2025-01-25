import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/Global";
import Categories from "../components/Categories";

export default function Home() {
  const navigate = useNavigate();
  const { series } = useGlobal();

  console.log(series);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) return navigate("/");
  }, []);

  return (
    <div className="flex flex-col h-full gap-20">
      {series.map((serie) => (
        <Categories {...serie} />
      ))}
    </div>
  );
}
