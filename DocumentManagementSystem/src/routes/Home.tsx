import { useNavigate } from "react-router-dom";
import callback from "../apis/callback";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { token, userId } from "../atoms";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const authToken = useRecoilValue(token);
  const setToken = useSetRecoilState(token);
  const setUserId = useSetRecoilState(userId);
  const code: string | null = new URLSearchParams(window.location.search).get(
    "code"
  );

  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { token, userId } = await callback(code);

      try {
        setToken(token);
        setUserId(userId);
        navigate("/contacts");
      } catch (error) {
        console.error("Error in callback: ", error);
        throw new Error("Error in callback");
      }
    },
    enabled: !!code,
  });

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken]);

  return <h1>Home</h1>;
}

export default Home;
