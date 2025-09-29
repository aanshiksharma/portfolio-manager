import { useLocation } from "react-router-dom";

function ProjectPage() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const project = pathname[pathname.length - 1];

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        Project {project}
      </section>
    </>
  );
}

export default ProjectPage;
