import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import LoadingPage from "./LoadingPage";

function ViewHandler() {
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const verifyTokenAndNavigate = async (token) => {
      const res = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) navigate("/dashboard");
      else navigate("/auth/login");
    };

    verifyTokenAndNavigate(token);
  }, []);

  return (
    <>
      <Navbar />
      <LoadingPage />
    </>
  );
}

export default ViewHandler;
