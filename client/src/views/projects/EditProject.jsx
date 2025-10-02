import { useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function EditProject() {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const pathname = location.pathname.split("/");
  const projectId = pathname[pathname.length - 1];

  const handleDeleteProject = async () => {
    setLoading(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) return;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <LoadingPage />;
      </>
    );

  return (
    <>
      <Navbar />
      <section className="h-screen flex items-center gap-4 justify-center">
        Edit {projectId}
        <Button
          className={"bg-red-800/20 text-error"}
          label={"Delete Project"}
          onClick={handleDeleteProject}
        />
      </section>
    </>
  );
}

export default EditProject;
