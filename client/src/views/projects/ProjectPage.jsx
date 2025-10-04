import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useImageViewer } from "../../contexts/ImageViewerContext";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import TableRow from "../../components/TableRow";
import LoadingPage from "../LoadingPage";

function ProjectPage() {
  const [project, setProject] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const projectId = pathname[pathname.length - 1];

  const { open } = useImageViewer();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`);
        if (!res.ok) {
          console.log("Could not fetch data.");
          return;
        }

        const result = await res.json();
        setProject(result);
      } catch (err) {
        console.error("There was an error from our side :", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingPage />
      </>
    );
  }

  return (
    <>
      <Navbar />
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
          {activeTab === "general" && (
            <section>
              <TableRow
                heading={"Title"}
                value={project.title}
                background={true}
              />
              <TableRow heading={"Skills"} value={project.skills} />
              <TableRow
                heading={"Description"}
                value={project.description}
                background={true}
              />
              <TableRow
                heading={"Project Link"}
                value={project.projectLink}
                type="link"
              />
              <TableRow
                heading={"GitHub Link"}
                value={project.githubLink}
                type="link"
                background={true}
                last={true}
              />
            </section>
          )}

          {/* Gallery Section */}
          {activeTab === "gallery" && (
            <section className="flex flex-col gap-4">
              <div
                className="cover-image-container shadow-md shadow-text-secondary/25 border border-border rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  open(project.coverImage.url);
                }}
              >
                <img src={project.coverImage.url} alt="" />
              </div>

              <div className="other-images-container flex flex-col gap-4 py-4">
                <h4 className="font-semibold text-text-primary">Other Image</h4>

                <hr className="border-border" />

                <div className="flex flex-wrap gap-4 py-2 items-center justify-center min-h-40">
                  {project.otherImages.length === 0 && (
                    <p>No more images found!</p>
                  )}

                  {project.otherImages.length !== 0 &&
                    project.otherImages.map((image) => {
                      return (
                        <div
                          className="border border-border rounded-lg overflow-hidden shadow-md shadow-bg-surface-light max-w-xs"
                          onClick={() => {
                            open(image.url);
                          }}
                        >
                          <img src={image.url} alt="" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
