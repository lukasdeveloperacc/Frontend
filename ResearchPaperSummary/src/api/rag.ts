import React from "react";

export async function ragStream(
  url: string,
  body: string,
  setState: React.Dispatch<React.SetStateAction<string>>
) {
  console.log("Start ragStream");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!res.body) return;

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    buffer += chunk;

    const parts = buffer.split("\r\n\r\n");

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (part.startsWith("event: data")) {
        const raw = part
          .replace("event: data", "")
          .trim()
          .replace("data:", "")
          .trim();

        if (!raw) return;

        try {
          const token = raw;
          setState(
            (prev) => prev + token.replace(/"/g, "").replace(/\\n/g, "\n")
          );
        } catch (err) {
          console.warn("파싱 실패 (data 아님):", raw);
        }
      }
    }

    buffer = parts[parts.length - 1]; // 아직 도착 안 한 스트링 유지
  }
}
