async function callback(code: string | null): Promise<{ token: string }> {
  //   const backend_url = import.meta.env.VITE_BACKEND_URL;
  const backend_url = "http://localhost:1234";

  return await fetch(`${backend_url}/auth/google/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.error("Login error:", err));
}

export default callback;
