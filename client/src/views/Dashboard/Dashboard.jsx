import { useVerifyToken } from "../../hooks/useVerifyToken";
import { useProjects } from "../../hooks/useProjects";
import { useSkills } from "../../hooks/useSkills";
import { useAdmin } from "../../hooks/useAdmin";

import LoadingPage from "../LoadingPage";
import Navbar from "../../components/Navbar";
import SideBar from "./SideBar";
import DashboardHeader from "./DashboardHeader";
import DashboardAbout from "./DashboardAbout";
import FeaturedProjects from "./FeaturedProjects";
import SkillsPreview from "./SkillsPreview";

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
    return (
      <>
        <Navbar />
        <LoadingPage text={loadingText} />
      </>
    );
  }

  if (!valid) return null; // redirected by hook

  return (
    <>
      <Navbar />
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
