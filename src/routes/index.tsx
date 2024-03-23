import { createBrowserRouter } from "react-router-dom";

import Login from "../page/Login";
import Home from "../page/Home";
import Categories from "../page/Categories";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/list",
    element: <Categories />,
  },
]);
