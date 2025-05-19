import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Contacts from "./routes/Contacts";
import Documents from "./routes/Documents";
import Home from "./routes/Home";
import Developing from "./routes/Developing";
import SignIn from "./routes/SignIn";
import ProtectedRoute from "./routes/Protected";
import SignUp from "./routes/SignUp";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "contacts",
              element: <Contacts />,
            },
            {
              path: "documents",
              element: <Documents />,
            },
            {
              path: "documents/:contactId",
              element: <Documents />,
            },
          ],
        },
        {
          path: "logout",
          element: <Developing />,
        },
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
      // errorElement: <NotFound />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default router;
