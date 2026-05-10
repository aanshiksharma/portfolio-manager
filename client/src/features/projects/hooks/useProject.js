import { useState, useEffect, useCallback } from "react";
import {
  fetchProjectById,
  removeProject,
  updateProject,
} from "../services/projectServices";

function useProject({ projectId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const deleteProject = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await removeProject(projectId);

      return {
        success: true,
        unauthorized: false,
        message: response.message,
      };
    } catch (err) {
      const message = err.message;
      const unauthorized = message.toLowerCase().includes("unauthorized");

      setError(message);

      return {
        success: false,
        message,
        unauthorized,
      };
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const updateProjectData = useCallback(
    async (formData) => {
      // setLoading(true);
      // setError(null);
      console.log(formData);

      try {
        const response = await updateProject(projectId);

        return {
          success: true,
          unauthorized: false,
          message: response.message,
        };
      } catch (err) {
        const message = err.message;
        const unauthrorized = message.toLowerCase().inlcudes("unauthorized");

        return {
          success: false,
          message,
          unauthorized,
        };
      } finally {
        setLoading(false);
      }
    },
    [projectId],
  );

  useEffect(() => {
    fetchProject();
  }, []);

  return {
    project,
    loading,
    error,
    deleteProject,
    updateProject: updateProjectData,
  };
}

export default useProject;
