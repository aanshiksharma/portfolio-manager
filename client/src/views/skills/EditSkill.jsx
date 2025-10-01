import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

function EditSkill() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const skill = pathname[pathname.length - 1];

  return (
    <>
      <Navbar />
      <section className="h-screen flex items-center justify-center">
        Edit {skill}
      </section>
    </>
  );
}

export default EditSkill;
