import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ProjectsHeader({ projects }) {
  return (
    <section className="px-4 py-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Projects Workspace</h1>
        <Button asChild>
          <Link to="/projects/add">Add Project</Link>
        </Button>
      </div>

      <p className="text-secondary-foreground">
        Manage your portfolio projects and showcase work
      </p>

      <div className="text-muted-foreground text-xs space-x-2">
        <span>
          {projects ? projects.length : "-"} Project
          {projects?.length > 1 && "s"}
        </span>
        <span>&bull;</span>
        <span>{projects ? projects.length : "-"} Live</span>
        <span>&bull;</span>
        <span>Updated 7d ago</span>
      </div>
    </section>
  );
}

export default ProjectsHeader;
