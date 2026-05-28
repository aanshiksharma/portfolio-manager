import { fetchData } from "../../../shared/utils/fetchData";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAdmin = () => fetchData("admin", "Could not fetch admin");

export const updateAdmin = async (adminId, formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/${adminId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("Could not find admin");
      if (response.status === 401 || response.status === 403)
        throw new Error((await response.json()).message);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Error while updating admin");
  }
};

export const updatePassword = async (adminId, data) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/admin/change-password/${adminId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("Could not find admin");
      if (response.status === 401 || response.status === 403)
        throw new Error((await response.json()).message);
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Error while updating password.");
  }
};
