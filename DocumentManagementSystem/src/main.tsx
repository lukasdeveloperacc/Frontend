import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
// import { RecoilRoot } from "recoil";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <RecoilRoot>
  <GoogleOAuthProvider clientId="956757050949-0svmsp5s2g7s16cs5ojldec1jkp9n909.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </GoogleOAuthProvider>
  // </RecoilRoot>
);
