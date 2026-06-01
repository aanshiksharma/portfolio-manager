import { useState } from "react";
import { Link } from "react-router-dom";

import useProject from "../hooks/useProject";

import { ProjectCard, ProjectCardSkeleton } from "../components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpDown, Plus } from "lucide-react";

import Searchbar from "@/shared/components/ui/Searchbar";
import ProjectsHeader from "../components/ProjectHeader";

function Projects() {
  const [searchInput, setSearchInput] = useState("");
  const { projects, loading } = useProject();

  const filteredProjects =
    projects?.filter((project) => {
      const titleMatch = project.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      const skillMatch = project.skills.some((skill) =>
        skill.toLowerCase().includes(searchInput.toLowerCase()),
      );

      return titleMatch || skillMatch;
    }) || [];

  return (
    <>
      <ProjectsHeader projects={projects} />
      <Separator />

      <section className="px-4 py-6 grid gap-6">
        <div className="flex items-center justify-between gap-2">
          <Searchbar
            placeholder="Search Projects by name or technologies..."
            className={"max-w-xs bg-transparent"}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Button variant="outline">
            <ArrowUpDown />
            Sort
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {loading || !projects ? (
            Array.from(new Array(2)).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : projects.length === 0 ? (
            <section className="md:col-span-2 lg:col-span-3 2xl:col-span-4 flex flex-col min-h-70 items-center justify-center gap-4 py-3">
              <h2>No projects found.</h2>
              <Button asChild>
                <Link to={"/projects/add"}>
                  <Plus />
                  <span>Add a Project</span>
                </Link>
              </Button>
            </section>
          ) : searchInput.trim() ? (
            filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                return <ProjectCard key={project._id} project={project} />;
              })
            ) : (
              <section className="md:col-span-2 lg:col-span-3 2xl:col-span-4 flex flex-col min-h-70 items-center justify-center gap-4 py-3">
                <h2>No projects found based on search!</h2>
              </section>
            )
          ) : (
            projects.map((project) => {
              return <ProjectCard key={project._id} project={project} />;
            })
          )}
        </div>
      </section>
    </>
  );
}

export default Projects;
