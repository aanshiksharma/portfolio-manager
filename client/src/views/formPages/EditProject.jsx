import { useLocation } from "react-router-dom";

function EditProject() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const project = pathname[pathname.length - 1];

  return (
    <section className="h-screen flex items-center justify-center">
      Edit {project}
    </section>
  );
}

export default EditProject;
