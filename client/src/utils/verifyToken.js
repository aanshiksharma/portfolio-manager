export const verifyToken = async (navigate) => {
  try {
    const guest = sessionStorage.getItem("login-mode");
    if (guest) return true;

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-token`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    // Token invalid or expired
    if (!res.ok) {
      const response = await res.json().catch(() => ({}));
      alert(response.message || "Session expired. Please log in again.");
      if (navigate) navigate("/auth/login");
      return false;
    }

    // Token valid
    return true;
  } catch (err) {
    console.error("[verifyToken]", err);
    alert("An error occurred while verifying your session.");
    if (navigate) navigate("/auth/login");
    return false;
  }
};
