import { Trophy } from "react-bootstrap-icons";
import { fetchData } from "../../../shared/utils/fetchData";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProjects = () =>
  fetchData("projects", "Could not fetch projects");

export const fetchProjectById = async (projectId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}`);
    if (!response.ok) {
      throw new Error("Could not find project.");
    }

    const project = await response.json();
    return project ?? null;
  } catch (err) {
    throw new Error("There was an error on our side :", err);
  }
};

export const removeProject = async (projectId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("Could not find project");
      if (response.status === 401 || response.status === 403)
        throw new Error(response.message);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while deleting project.");
  }
};

export const updateProject = async (projectId, formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("Could not find project");
      if (response.status === 401 || response.status === 403)
        throw new Error(response.message);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while deleting project.");
  }
};
