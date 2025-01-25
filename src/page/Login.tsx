import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../modules/login";

import { useNavigate } from "react-router-dom";
import { createdUser } from "../modules/createdUser";
import { getUser } from "../modules/getUser";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [formState, setFormState] = useState({
    username: import.meta.env.VITE_USERNAME ?? "",
    password: import.meta.env.VITE_PASSWORD ?? "",
    dns: import.meta.env.VITE_DNS ?? "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");

    if (!userLogin) return;

    navigate("/profiles");
  }, []);

  const { username, password, dns } = formState;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await login({ ...formState, BASE_URL: dns });

    if (data && data?.user_info.status.toLocaleLowerCase() === "active") {
      const userAlreadyExist = await getUser(username);

      if (!userAlreadyExist) {
        const userCreated = await createdUser(username);

        if (!userCreated) return;

        localStorage.setItem("user_id", userCreated.id);
      } else {
        localStorage.setItem("user_id", userAlreadyExist.id);
      }

      localStorage.setItem("userLogin", JSON.stringify(formState));
      navigate("/profiles");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[300px] w-full">
        <Input
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
          value={username}
          placeholder="Usuario"
        />
        <Input
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          value={password}
          placeholder="Senha"
          type="password"
        />

        <Input
          onChange={(e) => setFormState({ ...formState, dns: e.target.value })}
          value={dns}
          placeholder="URL do DNS"
          type="text"
        />

        <Button type="submit">Logar</Button>
      </form>
    </div>
  );
}
