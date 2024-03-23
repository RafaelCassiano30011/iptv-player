import { CategorieType } from "../modules/getCategories";

interface Props {
  categories: CategorieType[];
  handleFunction: (category_id: string) => void;
}

export default function ListCategories({ handleFunction, categories }: Props) {
  return (
    <ul
      data-no-scroll="true"
      className="h-full overflow-y-auto overflow-x-hidden max-w-96 w-full bg-neutral-800 rounded"
    >
      {categories.map((item) => (
        <li
          className="text-gray-100 font-bold last:border-b-0 border-b-white border-b hover:text-neutral-500 transition-all cursor-pointer"
          key={item.category_id}
        >
          <button
            onClick={() => {
              handleFunction(item.category_id);
            }}
            className="outline-none border-0 p-5 w-full text-left"
          >
            {item.category_name}
          </button>
        </li>
      ))}
    </ul>
  );
}
