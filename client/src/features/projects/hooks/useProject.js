import { useState, useEffect, useCallback } from "react";
import {
  fetchProjects,
  fetchProjectById,
  removeProject,
  updateProject,
  createProject,
} from "../services/projectServices";

function useProject({ projectId } = {}) {
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const deleteProject = async () => {
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
  };

  const updateProjectData = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateProject(projectId, formData);

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
  };

  const addProject = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createProject(formData);

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
  };

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  useEffect(() => {
    refreshProjects();
  }, []);

  return {
    project,
    projects,
    loading,
    error,
    deleteProject,
    updateProject: updateProjectData,
    addProject,
  };
}

export default useProject;
