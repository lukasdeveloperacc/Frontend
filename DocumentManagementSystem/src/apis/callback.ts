import { env } from "../config";

async function callback(
  code: string | null
): Promise<{ token: string; userId: string; status: number }> {
  const res = await fetch(`${env.backendUrl}/auth/google/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  let token = "";
  let userId = "";
  if (!res.ok) {
    const error = await res.text();
    console.error("Error fetching token: ", error);
  } else {
    const data = await res.json();
    token = data.token;
    userId = data.userId;
  }

  return { token, userId, status: res.status };
}

export default callback;
