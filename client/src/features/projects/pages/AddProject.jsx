import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useToast from "../../../shared/toast/useToast";
import useProject from "../hooks/useProject";

import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import ProjectForm from "../components/form/ProjectForm";

function AddProject() {
  const navigate = useNavigate();

  const methods = useForm();
  const { loading, addProject } = useProject();
  const { addToast } = useToast();

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to add a project.",
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
    formData.append("coverImage", data.coverImage[0]);

    const response = await addProject(formData);

    if (!response.success) {
      if (response.unauthorized) {
        addToast("Unauthorized access!", response.message, "error");
        return navigate("/auth/login");
      }

      return addToast("Error!", response.message, "error");
    }

    addToast("New project added!", response.message, "success");
    navigate("/projects");
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <section className="px-4 py-6 grid gap-4">
        <h1>Add Project</h1>
      </section>

      <ProjectForm methods={methods} onSubmit={onSubmit} />
    </>
  );
}

export default AddProject;
