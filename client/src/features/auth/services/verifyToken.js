const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const verifyToken = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error((await response.json()).message);

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Error occurred while verifying user");
  }
};
