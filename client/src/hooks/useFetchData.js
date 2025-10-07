import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

export const useFetchData = (endpoint, errorMessage) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setLoadingText("Fetching Data...");

      try {
        const result = await fetchData(endpoint, errorMessage);
        setData(result);
      } catch (err) {
        alert(err.message || "Something went wrong while fetching data");
      } finally {
        setLoading(false);
        setLoadingText("");
      }
    };

    loadData();
  }, [endpoint, errorMessage]);

  return { data, loading, loadingText };
};
