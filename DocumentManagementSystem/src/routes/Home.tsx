function GoogleLoginButton() {
  const handleLogin = async () => {
    const SCOPE = [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/drive.file",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id:
        "956757050949-0svmsp5s2g7s16cs5ojldec1jkp9n909.apps.googleusercontent.com",
      redirect_uri: "http://localhost:5174",
      scope: SCOPE,
      access_type: "offline",
      prompt: "consent",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1>Home</h1>
      <GoogleLoginButton />
    </>
  );
}

export default Home;
