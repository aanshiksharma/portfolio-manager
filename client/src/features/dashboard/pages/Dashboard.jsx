import SideBar from "../components/SideBar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardAbout from "../components/DashboardAbout";
import FeaturedProjects from "../components/FeaturedProjects";
import SkillsPreview from "../components/SkillsPreview";

function Dashboard() {
  return (
    <>
      <div className="">
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
