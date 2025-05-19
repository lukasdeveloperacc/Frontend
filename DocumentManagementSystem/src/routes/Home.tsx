import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import callback from "../apis/callback";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { token } from "../atoms";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const navigate = useNavigate();
  const authToken: string = useRecoilValue(token);
  const setToken = useSetRecoilState(token);
  const code: string | null = new URLSearchParams(window.location.search).get(
    "code"
  );

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["auth"],
    queryFn: () => callback(code),
    enabled: !!code,
  });

  useEffect(() => {
    if (isError && error.message.includes("403")) {
      navigate("/signup");
    } else if (data?.token) {
      setToken(data.token);
      navigate("/contacts");
    } else if (!code) {
      navigate("/login");
    }
  }, [data, code, navigate, setToken]);

  return (
    <>
      {authToken ? (
        <h1>{isLoading ? "Wating..." : data?.token}</h1>
      ) : (
        navigate("/login")
      )}
    </>
  );
}

export default Home;
