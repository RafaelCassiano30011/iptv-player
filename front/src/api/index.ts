import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // Endpoint do proxy
  headers: {
    "Content-Type": "application/json",
  },
});

const proxy = async (url: string) => {
  return await api.post("/proxy", { url });
};

export { api, proxy };
