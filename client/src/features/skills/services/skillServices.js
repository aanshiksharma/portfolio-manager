import { fetchData } from "../../../shared/utils/fetchData";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchSkills = () => fetchData("skills", "Could not fetch skills");

export const fetchSkillById = async (slug) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/skills/${slug}`);
    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while fetching skill.");
  }
};

export const fetchCategories = () =>
  fetchData("categories", "Could not fetch categories");

export const removeSkill = async (skillId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/skills/${skillId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while deleting skill.");
  }
};

export const updateSkill = async (slug, data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/skills/${slug}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while updating skill.");
  }
};

export const createSkill = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/skills/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Server error while creating skill.");
  }
};
