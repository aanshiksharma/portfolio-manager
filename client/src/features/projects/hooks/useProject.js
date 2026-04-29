import { useState, useEffect } from "react";
import { fetchProjectById } from "../services/projectServices";

function useProject({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = async () => {
    try {
      const data = await fetchProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return { project, loading, error };
}

export default useProject;
