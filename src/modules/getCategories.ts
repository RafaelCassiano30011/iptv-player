import { Login } from "@/context/Global";
import { getUser } from "../utils/getUser";
import { Type } from "./types";

interface GetCategoriesProps {
  type: Type;
  formState: Login;
}

export interface CategorieType {
  category_id: string;
  category_name: string;
  parent_id: number;
}

const categoriesKeysFetch = {
  live: "live",
  series: "series",
  movies: "vod",
};

async function getCategories({ type, formState }: GetCategoriesProps): Promise<CategorieType[]> {
  const { username, password, dns: BASE_URL } = formState;

  console.log(
    `${BASE_URL}/player_api.php?&username=${username}&password=${password}&action=get_${categoriesKeysFetch[type]}_categories`
  );

  const response = await fetch(
    `${BASE_URL}/player_api.php?&username=${username}&password=${password}&action=get_${categoriesKeysFetch[type]}_categories`
  );

  return await response.json();
}

export { getCategories };
