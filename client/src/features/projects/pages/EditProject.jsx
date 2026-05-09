import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import useToast from "../../../shared/toast/useToast";
import useProject from "../hooks/useProject";

import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";

import ProjectDetailsSection from "../components/form/ProjectDetailsSection";
import PreviewLinksSection from "../components/form/PreviewLinksSection";
import FilesSection from "../components/form/FilesSection";

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
  const { handleSubmit, watch, reset } = methods;

  useEffect(() => {
    if (project) reset(project);
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

    const skills = data.skills[0] !== "" ? data.skills : [];

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("skills", JSON.stringify(skills));
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

  const projectData = watch();

  if (loading || !project) return <LoadingScreen />;

  return (
    <>
      <FormProvider {...methods}>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <header className="p-4 flex items-center justify-between w-full">
            <h1 className="form-heading">
              Edit {projectData.title || "Project"}
            </h1>

            <Button
              type={"button"}
              variant={"delete"}
              label={"Delete Project"}
              onClick={handleDeleteProject}
            />
          </header>

          <ProjectDetailsSection />
          <PreviewLinksSection />
          <FilesSection />

          <div className="p-4 w-full flex gap-4 items-center justify-end">
            <Button type={"button"} label={"Cancel"} variant={"secondary"} />
            <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default EditProject;
