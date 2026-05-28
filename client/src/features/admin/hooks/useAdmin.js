import { useState, useEffect } from "react";

import {
  fetchAdmin,
  updateAdmin,
  updatePassword,
} from "../services/adminServices";

function useAdmin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdmin = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAdmin();
      setAdmin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editAdmin = async (adminId, formData) => {
    setLoading(true);
    setError(false);

    try {
      const response = await updateAdmin(adminId, formData);

      return {
        success: true,
        unauthorized: false,
        message: response.message,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("unauthorized");
      setError(message);

      return { success: false, unauthorized, message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (adminId, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updatePassword(adminId, data);

      return {
        success: true,
        unauthorized: false,
        message: response.message,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("unauthorized");
      setError(message);

      return { success: false, unauthorized, message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => getAdmin, []);

  return { admin, loading, editAdmin, changePassword };
}

export default useAdmin;
