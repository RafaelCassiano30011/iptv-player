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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setFormState({ ...formState, username: e.target.value })}
        value={username}
        placeholder="Usuario"
      />
      <input
        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        value={password}
        placeholder="Senha"
        type="password"
      />

      <button type="submit">teste</button>
    </form>
  );
}
