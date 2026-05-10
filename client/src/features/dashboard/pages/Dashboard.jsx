import { useVerifyToken } from "../../auth/hooks/useVerifyToken";

import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import SideBar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardAbout from "../components/DashboardAbout";
import FeaturedProjects from "../components/FeaturedProjects";
import SkillsPreview from "../components/SkillsPreview";

function Dashboard() {
  const { verifying, valid } = useVerifyToken();

  if (verifying) return <LoadingScreen text={"Verifying..."} />;
  if (!valid) return null; // redirected by hook

  return (
    <>
      <div className="container !max-w-300">
        <div className="px-4 py-8 flex gap-4 w-full">
          <SideBar />

          <main className="px-2 flex-1 flex flex-col gap-8">
            <DashboardHeader />

            <DashboardAbout />
            <hr className="border-border/50" />

            <FeaturedProjects />
            <hr className="border-border/50" />

            <SkillsPreview />
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
