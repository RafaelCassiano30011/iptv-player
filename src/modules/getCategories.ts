import { getUser } from "../utils/getUser";
import { BASE_URL } from "./index";
import { Type } from "./types";

interface GetCategoriesProps {
  type: Type;
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

async function getCategories({ type }: GetCategoriesProps): Promise<CategorieType[]> {
  const { username, password } = getUser();

  const response = await fetch(
    `${BASE_URL}/player_api.php?&username=${username}&password=${password}&action=get_${categoriesKeysFetch[type]}_categories`
  );

  return await response.json();
}

export { getCategories };
