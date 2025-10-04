import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import LoadingPage from "./LoadingPage";

function ViewHandler() {
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const loginMode = localStorage.getItem("login-mode");

    const verifyTokenAndNavigate = async (token) => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) navigate("/dashboard");
        else navigate("/auth/login");
      } catch (err) {
        setLoadingText(
          `An error occurred on our side. Please try again later!`
        );
      }
    };

    if (loginMode) navigate("/dashboard");
    else verifyTokenAndNavigate(token);
  }, []);

  return (
    <>
      <Navbar />
      <LoadingPage text={loadingText} />
    </>
  );
}

export default ViewHandler;
