import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useProject from "../hooks/useProject";

import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import ProjectDetails from "../components/ProjectDetails";
import ProjectGallery from "../components/ProjectGallery";

function ProjectPage() {
  const [activeTab, setActiveTab] = useState("general");

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const projectId = pathname[pathname.length - 1];

  const { project, loading } = useProject({ projectId });

  if (loading || !project) return <LoadingScreen />;

  return (
    <>
      <div className="container">
        <div className="flex flex-col gap-4 px-4 py-8 w-full">
          <section className="flex items-center justify-between">
            <h1 className="text-[2rem] text-text-primary font-medium">
              {project.title}
            </h1>

            <div className="flex gap-2 items-center">
              <Button
                label={"Edit Project"}
                variant={"primary"}
                onClick={() => {
                  navigate(`/projects/edit/${project._id}`);
                }}
              />
            </div>
          </section>

          <section className="flex items-center gap-3">
            {["general", "gallery"].map((tab) => {
              return (
                <Button
                  key={tab}
                  variant={tab === activeTab ? "primary" : "secondary"}
                  icon={{
                    icon: tab === "general" ? "database" : "images",
                    size: 16,
                  }}
                  label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                />
              );
            })}
          </section>

          {/* General Details Section */}
          {activeTab === "general" && <ProjectDetails project={project} />}

          {/* Gallery Section */}
          {activeTab === "gallery" && <ProjectGallery project={project} />}
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
