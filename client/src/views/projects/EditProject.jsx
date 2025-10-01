import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

function EditProject() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const project = pathname[pathname.length - 1];

  return (
    <>
      <Navbar />
      <section className="h-screen flex items-center justify-center">
        Edit {project}
      </section>
    </>
  );
}

export default EditProject;
