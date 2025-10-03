import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import LoadingPage from "./LoadingPage";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK;
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`${BACKEND_LINK}/auth/verify-token`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!res.ok) navigate("/auth/login");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingPage />
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
