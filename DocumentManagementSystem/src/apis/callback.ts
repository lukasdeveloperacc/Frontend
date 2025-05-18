import { env } from "../config";

async function callback(code: string | null): Promise<{ token: string }> {
  return await fetch(`${env.backendUrl}/auth/google/signin`, {
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
