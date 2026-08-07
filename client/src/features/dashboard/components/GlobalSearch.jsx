import { useEffect, useState } from "react";

import Searchbar from "@/shared/components/ui/Searchbar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import SearchResultProjectCard from "./SearchResultProjectCard";

import useProject from "@/features/projects/hooks/useProject";
import useSkill from "@/features/skills/hooks/useSkill";
import { Link } from "react-router-dom";
import { timeDiffFormatter } from "@/shared/utils/timeDiffFormatter";

function GlobalSearch() {
  const [searchInput, setSearchInput] = useState("");

  const { projects } = useProject();
  const { skills } = useSkill();

  const [searchedProjects, setSearchedProjects] = useState([]);
  const [searchedSkills, setSearchedSkills] = useState([]);

  useEffect(() => {
    if (!projects || !skills) return;

    if (searchInput.trim() === "") {
      setSearchedProjects(projects.filter((_, index) => index < 5));
      setSearchedSkills(skills.filter((_, index) => index < 5));
      return;
    }

    const filteredProjects = projects.filter((project) => {
      if (project.title.toLowerCase().includes(searchInput)) return project;
    });

    const filteredSkills = skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchInput) ||
        skill.categoryName.toLowerCase().includes(searchInput),
    );

    setSearchedProjects(filteredProjects);
    setSearchedSkills(filteredSkills);
  }, [searchInput, projects, skills]);

  return (
    <ScrollArea className="bg-card w-[90vw] max-w-3xl h-[80vh] px-4 rounded-2xl pb-4 overflow-hidden ring ring-border">
      <div className="sticky top-0 space-y-4 mx-1 pt-4 bg-card mb-4 overflow-x-visible">
        <Searchbar
          placeholder="Search projects, skills, etc..."
          autoFocus
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        <Separator />
      </div>

      <section className="space-y-2 my-4">
        <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
          <h2 className=" uppercase text-xs">Projects</h2>

          <Link to="/projects" className="hover:underline">
            View all
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {searchedProjects.map((project) => (
            <SearchResultProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
          <h2 className=" uppercase text-xs">Skills</h2>

          <Link to="/skills" className="hover:underline">
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {searchedSkills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center justify-between rounded-xl hover:bg-accent px-2 py-1"
            >
              <div className="flex flex-col gap-1">
                <h3>{skill.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {skill.categoryName}
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                {timeDiffFormatter(skill.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ScrollArea>
  );
}

export default GlobalSearch;
