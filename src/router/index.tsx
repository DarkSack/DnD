import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Characters from "@/pages/Characters";
import Campaigns from "@/pages/Campaigns";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App children={<Outlet />} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "characters",
        element: <Characters />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
