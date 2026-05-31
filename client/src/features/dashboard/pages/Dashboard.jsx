import { useState, useEffect } from "react";

import useProject from "@/features/projects/hooks/useProject";
import useSkill from "@/features/skills/hooks/useSkill";
import { getRecentActivity } from "@/shared/utils/getRecentActivity";

import DashboardHeader from "../components/DashboardHeader";
import RecentActivity from "../components/RecentActivity";

function Dashboard() {
  const [recentActivities, setRecentActivities] = useState(null);
  const { projects, loading: projectLoading } = useProject();
  const { skills, loading: skillLoading } = useSkill();

  useEffect(() => {
    if (!projectLoading && !skillLoading) {
      const response = getRecentActivity({ projects, skills });
      setRecentActivities(response);
    }
  }, [projects, skills]);

  return (
    <>
      <DashboardHeader />
      <RecentActivity
        recentActivities={
          recentActivities &&
          recentActivities.slice(0, Math.min(recentActivities.length, 10))
        }
      />
    </>
  );
}

export default Dashboard;
