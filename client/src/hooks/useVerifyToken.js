import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";

export const useVerifyToken = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const run = async () => {
      const isValid = await verifyToken(navigate);
      setValid(isValid);
      setLoading(false);
    };
    run();
  }, [navigate]);

  return { loading, valid };
};
