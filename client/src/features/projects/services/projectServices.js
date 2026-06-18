import { fetchData } from "../../../shared/utils/fetchData";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProjects = () =>
  fetchData("projects", "Could not fetch projects");

export const fetchProjectBySlug = async (slug) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${slug}`);
    if (!response.ok) throw new Error((await response.json()).message);

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

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while deleting project.");
  }
};

export const updateProject = async (slug, formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/${slug}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      body: formData,
    });

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while updating project.");
  }
};

export const createProject = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/projects/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      body: formData,
    });

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while creating project.");
  }
};
