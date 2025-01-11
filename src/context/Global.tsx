"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { CategorieType, getCategories } from "../modules/getCategories";
import { Type, types } from "../modules/types";
import { Stream } from "../modules/getStreams";
import { getStreamsAll } from "../modules/getAllStreams";

interface Props {
  children?: React.ReactNode;
}

interface SelectedStreamProps {
  id: number | null;
  type: Type;
}

interface Categorys {
  [key: Type[number]]: CategorieType[];
}

export interface Login {
  username: string;
  password: string;
  dns: string;
}

interface GlobalContextType {
  selectStream?: SelectedStreamProps;
  addSelectStream: (id: number, type: Type) => void;
  removeSelectStream: () => void;
  categories?: Categorys;
  formState: Login;
  setFormState: React.Dispatch<React.SetStateAction<Login>>;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalProvider({ children }: Props) {
  const [selectStream, setSelecteStream] = useState<SelectedStreamProps>();
  const [categories, setCategories] = useState<Categorys>({});
  const [allStreams, setAllStreams] = useState<Stream[]>([]);

  const [formState, setFormState] = useState<Login>({
    username: process.env.USERNAME_TEST ?? "",
    password: process.env.PASSWORD_TEST ?? "",
    dns: process.env.DNS_TEST ?? "",
  });

  const addSelectStream = (id: number, type: Type) => setSelecteStream({ id, type });

  const removeSelectStream = () => setSelecteStream(undefined);

  useEffect(() => {
    const ONE_HOUR = 60 * 60 * 1000;
    const lastFetchTimeCategories = localStorage.getItem("lastFetchTimeCategories");

    if (
      Object.keys(categories).length === 3 &&
      Object.keys(allStreams).length === 3 &&
      lastFetchTimeCategories &&
      Date.now() - parseInt(lastFetchTimeCategories, 10) < ONE_HOUR
    ) {
      console.log("Ignorando atualização de categorias.");
      return;
    }

    const getCategoriesInit = async (type: Type) => {
      const data = await getCategories({ type, formState });
      setCategories((prevCategories) => ({ ...prevCategories, [type]: data }));
    };

    const getStreamAllInit = async (type: Type) => {
      const data = await getStreamsAll({ type, formState });
      setAllStreams((prevStreams) => ({ ...prevStreams, [type]: data.sort((a, b) => a.name.localeCompare(b.name)) }));
    };

    const processCategories = async (types: Type[]) => {
      await Promise.all(
        types.map(async (type) => {
          await getCategoriesInit(type);
          await getStreamAllInit(type);
        })
      );
    };

    processCategories(types);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ selectStream, addSelectStream, removeSelectStream, categories, formState, setFormState }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
