import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import LoadingPage from "./LoadingPage";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState();

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loginMode = localStorage.getItem("login-mode");

    const verifyToken = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!res.ok) {
          const response = await res.json();
          alert(response.message);
          return navigate("/auth/login");
        }

        setLoading(false);
      } catch (err) {
        setLoadingText("An error occurred on our side.");
      }
    };

    if (!loginMode) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingPage text={loadingText} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="h-screen flex items-center justify-center">
        Dashboard
      </section>
    </>
  );
}

export default Dashboard;
