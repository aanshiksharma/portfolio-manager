export const fetchData = async (endpoint, errorMessage) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const res = await fetch(`${BASE_URL}/api/${endpoint}`);

    if (!res.ok && res.status !== 404) {
      throw new Error(errorMessage || `Could not fetch ${endpoint}`);
    }

    // If it's a 404, return something predictable
    if (res.status === 404) return null;

    const data = await res.json();

    // Just return what the backend sends, no assumptions
    return data ?? null;
  } catch (err) {
    console.error(`[fetchData:${endpoint}]`, err);
    throw err;
  }
};
