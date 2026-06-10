import { useState } from "react";
import { getRecentActivity } from "@/shared/utils/getRecentActivity";

export const useActivity = () => {
  const [activities, setActivites] = useState(null);
  const [loading, setLoading] = useState(false);

  const getActivites = () => {
    const response = getRecentActivity({ projects, skills });
  };

  return { activities, loading };
};
