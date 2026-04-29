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

    const result = await response.json();
    return result ?? null;
  } catch (err) {
    throw new Error("There was an error from our side :", err);
  }
};
