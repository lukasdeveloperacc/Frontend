export const loginGoogle = async (user: {
  name: string;
  email: string;
  googleAccessToken: string;
  googleRefreshToken: string;
}) => {
  await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
