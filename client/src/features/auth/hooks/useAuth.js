import { useState } from "react";
import { authenticateUser } from "../services/authServices";

function useAuth() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (role, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticateUser(role, data);

      setUser(response.user);

      return {
        success: true,
        unauthorized: false,
        message: response.message,
        user,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("password");

      setError(message);

      return {
        success: false,
        unauthorized,
        message,
        user,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (sessionStorage.getItem("token")) sessionStorage.removeItem("token");
    if (sessionStorage.getItem("login-mode"))
      sessionStorage.removeItem("login-mode");
  };

  return { user, loading, error, login, logout };
}

export default useAuth;
