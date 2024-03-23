import { BASE_URL } from "./index";

interface GetCategoriesProps {
  username: string;
  password: string;
  type: "live" | "series" | "movies";
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

async function getCategories({ username, password, type }: GetCategoriesProps): Promise<CategorieType[]> {
  const response = await fetch(
    `${BASE_URL}/player_api.php?&username=${username}&password=${password}&action=get_${categoriesKeysFetch[type]}_categories`
  );

  return await response.json();
}

export { getCategories };
