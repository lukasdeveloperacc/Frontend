import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Contacts from "./routes/Contacts";
import Documents from "./routes/Documents";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Developing from "./routes/Developing";

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
