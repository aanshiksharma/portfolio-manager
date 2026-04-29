import { useVerifyToken } from "../../auth/hooks/useVerifyToken";
import { useProjects } from "../../projects/hooks/useProjects";
import { useSkills } from "../../skills/hooks/useSkills";
import { useAdmin } from "../../admin/hooks/useAdmin";

import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import SideBar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardAbout from "../components/DashboardAbout";
import FeaturedProjects from "../components/FeaturedProjects";
import SkillsPreview from "../components/SkillsPreview";

function Dashboard() {
  const { loading: verifying, valid } = useVerifyToken();

  const {
    data: projects,
    loading: loadingProjects,
    loadingText: projectsText,
  } = useProjects();

  const {
    data: skills,
    loading: loadingSkills,
    loadingText: skillsText,
  } = useSkills();

  const {
    data: admin,
    loading: loadingAdmin,
    loadingText: adminText,
  } = useAdmin();

  const isLoading =
    verifying || loadingProjects || loadingSkills || loadingAdmin;

  const loadingText =
    (verifying && "Verifying...") ||
    projectsText ||
    skillsText ||
    adminText ||
    "Loading...";

  if (isLoading) {
    return <LoadingScreen text={loadingText} />;
  }

  if (!valid) return null; // redirected by hook

  return (
    <>
      <div className="container !max-w-300">
        <div className="px-4 py-8 flex gap-4 w-full">
          <SideBar admin={admin} />

          <main className="px-2 flex-1 flex flex-col gap-8">
            <DashboardHeader admin={admin} />

            <DashboardAbout about={admin.about} />
            <hr className="border-border/50" />

            <FeaturedProjects projects={projects} />
            <hr className="border-border/50" />

            <SkillsPreview skills={skills} />
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
