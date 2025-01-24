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

interface GlobalContextType {}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalProvider({ children }: Props) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}

export function useGlobal() {
  return useContext(GlobalContext);
}
