import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import useToast from "../../../shared/toast/useToast";
import useProject from "../hooks/useProject";

import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import ProjectForm from "../components/form/ProjectForm";

function EditProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const projectId = pathname[pathname.length - 1];

  const { project, loading, updateProject, deleteProject } = useProject({
    projectId,
  });
  const { addToast } = useToast();

  const methods = useForm();
  const { reset } = methods;

  useEffect(() => {
    if (project) {
      const values = {
        ...project,
        coverImage: project.coverImage ? [project.coverImage] : [],
        otherImages: project.otherImages || [],
      };

      reset(values);
    }
  }, [project, reset]);

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to save changes to a project.",
        "error",
      );

      return navigate("/auth/login");
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("skills", JSON.stringify(data.skills));
    formData.append("featured", data.featured);
    formData.append("description", data.description);
    formData.append("projectLink", data.projectLink);
    formData.append("githubLink", data.githubLink);

    // if (data.coverImage?.[0]) {
    //   formData.append("coverImage", data.coverImage[0]);
    // }

    const response = await updateProject(formData);

    if (!response.success) {
      if (response.unauthorized) {
        addToast("Unauthorized access!", response.message, "error");
        return navigate("/auth/login");
      }

      return addToast("Error!", response.message, "error");
    }

    addToast("Project updated!", response.message, "success");
    navigate(-1);
  };

  const handleDeleteProject = async () => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a project.",
        "error",
      );

      return navigate("/auth/login");
    }

    const response = await deleteProject(projectId);

    if (!response.success) {
      if (response.unauthorized) {
        addToast(
          "Unauthorized access!",
          "Session expired. Please login again.",
          "error",
        );

        return navigate("/auth/login");
      }

      return addToast("Error!", response.message, "error");
    }

    addToast("Project deleted!", response.message, "success");
    navigate("/projects");
  };

  // if (loading || !project) return <LoadingScreen />;

  return (
    <>
      <section className="grid gap-4">
        <h1>Edit {project ? project.title : "Project"}</h1>
      </section>

      <ProjectForm
        methods={methods}
        project={project}
        onSubmit={onSubmit}
        handleDelete={handleDeleteProject}
      />
    </>
  );
}

export default EditProject;
