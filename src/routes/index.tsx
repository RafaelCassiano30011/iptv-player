import { createBrowserRouter } from "react-router-dom";

import Login from "../page/Login";
import Home from "../page/Home";
import Profiles from "../page/Profiles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/profiles",
    element: <Profiles />,
  },

  {
    path: "/home",
    element: <Home />,
  },
]);
