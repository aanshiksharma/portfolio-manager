import { useEffect, useState } from "react";
import { verifyToken } from "../services/verifyToken";

export const useVerifyToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyUser = async () => {
    setLoading(true);
    setError(null);

    if (sessionStorage.getItem("login-mode")) {
      setIsAuthenticated(true);
      return setLoading(false);
    }

    try {
      await verifyToken();
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => verifyUser, []);

  return { loading, error, isAuthenticated, verifyUser };
};
