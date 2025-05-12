function callback(): void {
  const code = new URLSearchParams(window.location.search).get("code");

  if (code) {
    fetch("http://localhost:80/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.error("Login error:", err));
  } else {
    console.log("No Callback");
  }
}

export default callback;
