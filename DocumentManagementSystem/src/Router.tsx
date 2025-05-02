import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Contacts from "./screens/Contacts";
import Documents from "./screens/Documents";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Developing from "./screens/Developing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/documents",
        element: <Documents />,
      },
      {
        path: "/documents/:contactId",
        element: <Documents />,
      },
      {
        path: "/logout",
        element: <Developing />,
      },
    ],
    // errorElement: <NotFound />,
  },
]);

export default router;
