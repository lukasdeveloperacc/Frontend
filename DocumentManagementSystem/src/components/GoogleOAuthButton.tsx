import { env } from "../config";

type GoogleLoginButtonProps = {
  text: string;
};
function GoogleLoginButton({ text }: GoogleLoginButtonProps) {
  const handleClick = async () => {
    const SCOPE = [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/drive.file",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: env.googleClientId,
      redirect_uri: env.redirectUrl,
      scope: SCOPE,
      access_type: "offline",
      prompt: "consent",
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        {text}
      </button>
    </div>
  );
}

export default GoogleLoginButton;
