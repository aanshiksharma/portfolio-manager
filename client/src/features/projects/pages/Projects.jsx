import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useProject from "../hooks/useProject";

import ProjectCard from "../components/ProjectCard";
import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

function Projects() {
  const navigate = useNavigate();

  const { projects, loading, error } = useProject();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="container">
        <div className="flex flex-col gap-8 px-4 py-8 w-full">
          <section className="flex items-center justify-between">
            <h1 className="text-[2rem] text-text-primary font-medium">
              Projects
            </h1>
            <div className="flex gap-2 items-center">
              <Button icon={{ icon: "search", size: 16 }} variant={"primary"} />

              <Button
                label={"Add a Project"}
                icon={{ icon: "plus", size: 16 }}
                variant={"accent"}
                onClick={() => {
                  navigate("/projects/add");
                }}
              />
            </div>
          </section>

          <section className="flex flex-wrap gap-4">
            {projects.length === 0 ? (
              <section className="flex flex-col min-h-70 items-center justify-center gap-4 py-3">
                <h2 className="text-text-primary text-2xl text-center w-full">
                  No projects found.
                </h2>
                <Button
                  variant={"accent"}
                  label={"Add one right now"}
                  icon={{ icon: "plus", size: 20 }}
                  onClick={() => {
                    navigate("/projects/add");
                  }}
                />
              </section>
            ) : (
              projects.map((project) => {
                return (
                  <ProjectCard
                    key={project._id}
                    id={project._id}
                    title={project.title}
                    projectLink={project.projectLink}
                    imageUrl={project.coverImage.url}
                  />
                );
              })
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Projects;
