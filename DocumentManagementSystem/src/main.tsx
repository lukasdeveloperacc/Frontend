import { createRoot } from "react-dom/client";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./Router";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const navigate = useNavigate();
      if (error instanceof Error && error.message.includes("401")) {
        navigate("/login");
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);
