const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const authenticateUser = async (role, data) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/${role}-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data[`${role}Name`] || undefined,
        password: data.password || undefined,
        role: role,
      }),
    });

    const response = await res.json();

    if (!res.ok) {
      if (res.status === 404) throw new Error("Could not find admin.");
      if (res.status === 401) throw new Error(response.message);

      return response.message;
    }

    const token = response.token;

    if (role !== "admin") {
      sessionStorage.removeItem("token");
      sessionStorage.setItem("login-mode", role);
    }

    sessionStorage.removeItem("login-mode");
    sessionStorage.setItem("token", token);
    return response;
  } catch (err) {
    throw new Error(err.message || "Error occurred during Login");
  }
};
