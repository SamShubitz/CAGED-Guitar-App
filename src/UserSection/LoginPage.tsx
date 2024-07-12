import { useState } from "react";
import { User } from "../types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getUsers, postUser } from "../api/uncaged-api";

const LoginPage = () => {
  const [signedIn, setSignedIn] = useState(false);
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const postUserMutation = useMutation({
    mutationFn: (email: string) => postUser(email),
    onSuccess: (data) => {
      localStorage.setItem("CAGED-id", JSON.stringify(data.id));
    },
    onError: (error) => console.error("Error:", error),
  });

  const handleSuccess = (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const { email } = jwtDecode<User>(token as string);
    const emails = data.map((user: User) => user.email);
    if (emails.includes(email)) {
      const currentUser = data.find((user: User) => user.email === email);
      localStorage.setItem("CAGED-id", JSON.stringify(currentUser.id));
      setSignedIn(true);
    } else {
      postUserMutation.mutate(email as string);
      setSignedIn(true);
    }
  };

  if (isPending) {
    return <p className="message">Loading...</p>;
  }

  if (error) {
    return <p className="message">Error: {error.message}</p>;
  }

  return (
    <div className="login-page">
      {signedIn ? <h1>{`Welcome!`}</h1> : <h1>Sign In</h1>}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginPage;
