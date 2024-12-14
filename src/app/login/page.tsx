"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { iptvLogin } from "../../modules/login";


export default function Login() {
  const [formState, setFormState] = useState({
    username: import.meta.env.VITE_USERNAME ?? "",
    password: import.meta.env.VITE_PASSWORD ?? "",
    dns: import.meta.env.VITE_DNS ?? "",
  });

  //const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userLogin")) return;

    //navigate("/");
  }, []);

  const { username, password, dns } = formState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await iptvLogin({ ...formState, BASE_URL: dns });

    if (data.user_info.status.toLocaleLowerCase() === "active") {
      localStorage.setItem("userLogin", JSON.stringify(formState));
      setFormState({ username: "", password: "", dns: "" });
      //navigate("/");
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

        <input
          onChange={(e) => setFormState({ ...formState, dns: e.target.value })}
          value={dns}
          placeholder="URL do DNS"
          type="text"
          className="pl-3 py-1 w-full outline-none border-2 border-transparent focus:border-cyan-500 rounded-lg transition-all font-bold text-base text-white bg-neutral-800"
        />

        <button
          className="w-full py-1 text-base bg-cyan-500 hover:bg-cyan-700 transition-all rounded-lg font-bold text-white"
          type="submit"
        >
          Logar
        </button>
      </form>
    </div>
  );
}
