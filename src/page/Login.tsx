import React, { useEffect } from "react";
import { useState } from "react";
import { iptvLogin } from "../modules/login";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userLogin")) return;

    navigate("/");
  }, []);

  const { username, password } = formState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await iptvLogin(formState);

    if (data.user_info.status.toLocaleLowerCase() === "active") {
      localStorage.setItem("userLogin", JSON.stringify(formState));
      setFormState({ username: "", password: "" });
      navigate("/");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[300px] w-full">
        <input
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
          value={username}
          placeholder="Usuario"
          className="pl-3 py-1 w-full outline-none border-2 border-transparent focus:border-cyan-500 rounded-lg transition-all font-bold text-base text-white bg-neutral-800"
        />
        <input
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          value={password}
          placeholder="Senha"
          type="password"
          className="pl-3 py-1 w-full outline-none border-2 border-transparent focus:border-cyan-500 rounded-lg transition-all font-bold text-base text-white bg-neutral-800"
        />

        <button className="w-full py-1 text-base bg-cyan-500 hover:bg-cyan-700 transition-all rounded-lg font-bold text-white" type="submit">Logar</button>
      </form>
    </div>
  );
}
