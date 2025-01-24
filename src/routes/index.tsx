import { createBrowserRouter } from "react-router-dom";

import Login from "../page/Login";
import Home from "../page/Home";
import Categories from "../page/Categories";
import Profiles from "../page/Profiles";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/profiles",
    element: <Profiles />,
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
