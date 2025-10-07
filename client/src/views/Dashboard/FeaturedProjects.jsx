import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import DashboardProjectCard from "./DashboardProjectCard";

function FeaturedProjects({ projects }) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2 py-1">
        <h4 className="font-semibold text-xl">Featured Projects</h4>
        <Button
          variant="normal"
          label="See All ->"
          onClick={() => navigate("/projects")}
        />
      </div>

      {projects?.length ? (
        <div className="flex flex-wrap gap-4">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <DashboardProjectCard
                key={project._id}
                project={project}
                onDoubleClick={() => navigate(`/projects/${project._id}`)}
              />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-25">
          <p>Projects not found</p>
        </div>
      )}
    </section>
  );
}

export default FeaturedProjects;
