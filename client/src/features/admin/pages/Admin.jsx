import LoadingScreen from "@/shared/components/ui/LoadingScreen";

import useAdmin from "../hooks/useAdmin";
import useSkill from "@/features/skills/hooks/useSkill";
import useProject from "@/features/projects/hooks/useProject";

import ProfileSidebar from "../components/ProfileSidebar";
import {
  ProfileProjectCardSkeleton,
  ProfileProjectCard,
} from "../components/ProfileProjectCard";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";

function Admin() {
  const { admin, loading: adminLoading } = useAdmin();
  const { skills, loading: skillsLoading } = useSkill();
  const { projects, loading: projectsLoading } = useProject();

  const isVertical = document.body.offsetHeight > document.body.offsetWidth;

  if (
    adminLoading ||
    skillsLoading ||
    projectsLoading ||
    !admin ||
    !skills ||
    !projects
  )
    return <LoadingScreen />;

  return (
    <>
      <section
        className={`
        px-4 py-6
        grid items-start gap-4
        ${isVertical ? "md:grid-cols-1" : "md:grid-cols-3"} min-300:grid-cols-4 min-[1700px]:grid-cols-5
        `}
      >
        <ProfileSidebar admin={admin} className="" />

        <section className="p-4 col-span-2 min-300:col-span-3 min-[1700px]:col-span-4 grid gap-8">
          <section className="space-y-6">
            <h2>About</h2>

            <div className="grid gap-3 text-secondary-foreground">
              {admin.about
                .filter((text) => text)
                .map((text) => (
                  <p>{text}</p>
                ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h2>Featured Projects</h2>
            <div className="grid min-[1000px]:grid-cols-2 2xl:grid-cols-3 gap-3 text-secondary-foreground">
              {projects
                .filter((project) => project.featured)
                .map((project) => (
                  <ProfileProjectCard project={project} />
                ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h2>Skills</h2>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Item variant="muted" size="xs" className={"w-fit"}>
                  <ItemContent>
                    <ItemTitle>{skill.name}</ItemTitle>
                  </ItemContent>
                </Item>
              ))}
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default Admin;
