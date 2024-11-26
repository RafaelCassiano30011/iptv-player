import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { CategorieType, getCategories } from "../modules/getCategories";
import { Type, types } from "../modules/types";
import { getStreams, Stream } from "../modules/getStreams";

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

interface GlobalContextType {
  selectStream?: SelectedStreamProps;
  addSelectStream: (id: number, type: Type) => void;
  removeSelectStream: () => void;
  categories?: Categorys;
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalProvider({ children }: Props) {
  const [selectStream, setSelecteStream] = useState<SelectedStreamProps>();
  const [categories, setCategories] = useState<Categorys>(JSON.parse(localStorage.getItem("categories") || "{}"));
  const [allStreams, setAllStreams] = useState<Stream[]>(JSON.parse(localStorage.getItem("allStreams") || "[]"));

  const addSelectStream = (id: number, type: Type) => setSelecteStream({ id, type });

  const removeSelectStream = () => setSelecteStream(undefined);

  // Atualiza o localStorage sempre que as categorias mudam
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  // Atualiza o localStorage sempre que os streams mudam
  useEffect(() => {
    localStorage.setItem("allStreams", JSON.stringify(allStreams));
  }, [allStreams]);

  const getAllStreams = useCallback(async () => {
    const ONE_HOUR = 60 * 60 * 1000;
    const lastFetchTimeStreams = localStorage.getItem("lastFetchTimeStreams");

    // Verifica se já passou uma hora desde a última requisição de streams
    if (allStreams.length > 0 && lastFetchTimeStreams && Date.now() - parseInt(lastFetchTimeStreams, 10) < ONE_HOUR) {
      console.log("Ignorando atualização de streams.");
      return;
    }

    const init = async (type: Type, categoryId: string) => {
      const data = await getStreams({ type, category_id: categoryId });
      setAllStreams((prevStreams) => ({
        ...prevStreams,
        ...data,
      }));
    };

    const processStreams = async (types: Type[]) => {
      for (const type of types) {
        const categoriesForType = categories?.[type] || [];
        await Promise.all(categoriesForType.map(({ category_id }) => init(type, category_id)));
      }

      localStorage.setItem("lastFetchTimeStreams", Date.now().toString());
    };

    if (Object.keys(categories).length === 3) processStreams(types);
  }, [categories, allStreams]);

  // Efeito para gerenciar as categorias
  useEffect(() => {
    const ONE_HOUR = 60 * 60 * 1000;
    const lastFetchTimeCategories = localStorage.getItem("lastFetchTimeCategories");

    // Verifica se já passou uma hora desde a última requisição de categorias
    if (categories && lastFetchTimeCategories && Date.now() - parseInt(lastFetchTimeCategories, 10) < ONE_HOUR) {
      console.log("Ignorando atualização de categorias.");
      return;
    }

    const getCategoriesInit = async (type: Type) => {
      const data = await getCategories({ type });
      setCategories((prevCategories) => ({ ...prevCategories, [type]: data }));
    };

    const processCategories = async (types: Type[]) => {
      await Promise.all(types.map((type) => getCategoriesInit(type)));

      // Atualiza o timestamp da última execução para categorias
      localStorage.setItem("lastFetchTimeCategories", Date.now().toString());
      getAllStreams();
    };

    // Processa as categorias
    processCategories(types);
  }, []);

  return (
    <GlobalContext.Provider value={{ selectStream, addSelectStream, removeSelectStream, categories }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
