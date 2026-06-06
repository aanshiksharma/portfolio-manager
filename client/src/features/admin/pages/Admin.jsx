import useAdmin from "../hooks/useAdmin";
import useSkill from "@/features/skills/hooks/useSkill";
import useProject from "@/features/projects/hooks/useProject";

import {
  ProfileSidebarSkeleton,
  ProfileSidebar,
} from "../components/ProfileSidebar";
import {
  ProfileProjectCardSkeleton,
  ProfileProjectCard,
} from "../components/ProfileProjectCard";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function Admin() {
  const { admin, loading: adminLoading } = useAdmin();
  const { skills, loading: skillsLoading } = useSkill();
  const { projects, loading: projectsLoading } = useProject();

  const isVertical = document.body.offsetHeight > document.body.offsetWidth;

  return (
    <>
      <section
        className={`
        px-4 py-6
        grid items-start gap-4
        ${isVertical ? "grid-cols-1" : "min-[1200px]:grid-cols-4 2xl:grid-cols-5"} `}
      >
        {adminLoading || !admin ? (
          <ProfileSidebarSkeleton />
        ) : (
          <ProfileSidebar
            admin={admin}
            className="min-[1200px]:sticky top-22"
          />
        )}

        <section className="p-4 col-span-2 min-[1200px]:col-span-3 2xl:col-span-4 grid gap-8">
          <section className="space-y-6">
            <h2>About</h2>

            <div className="grid gap-3 text-secondary-foreground">
              {adminLoading || !admin ? (
                <>
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                  <Skeleton className="w-full h-4 mt-3" />
                  <Skeleton className="w-3/5 h-4" />
                </>
              ) : (
                admin.about.filter((text) => text).map((text) => <p>{text}</p>)
              )}
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h2>Featured Projects</h2>
            <div className="grid min-[1000px]:grid-cols-2 2xl:grid-cols-3 gap-3 text-secondary-foreground">
              {projectsLoading || !projects
                ? Array.from(new Array(2)).map((_, index) => (
                    <ProfileProjectCardSkeleton key={index} />
                  ))
                : projects
                    .filter((project) => project.featured)
                    .map((project) => (
                      <ProfileProjectCard key={project._id} project={project} />
                    ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h2>Skills</h2>

            <div className="flex flex-wrap gap-3">
              {skillsLoading || !skills
                ? Array.from(new Array(5)).map((_, index) => (
                    <Skeleton key={index} className="w-30 h-5" />
                  ))
                : skills.map((skill) => (
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
