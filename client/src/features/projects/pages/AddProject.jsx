import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";

import Button from "../../../shared/components/ui/Button";

import useToast from "../../../shared/toast/useToast";

import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import ProjectDetailsSection from "../components/form/ProjectDetailsSection";
import PreviewLinksSection from "../components/form/PreviewLinksSection";
import FilesSection from "../components/form/FilesSection";

function AddProject() {
  const [loading, setLoading] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");

  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit, watch } = methods;

  const { addToast } = useToast();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to add a project.",
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
    formData.append("coverImage", data.coverImage[0]);

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/api/projects/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formData,
      });

      const response = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          addToast(
            "Unauthorized access!",
            "The token provided is either unauthorized or expired. Please login again.",
            "error",
          );

          return navigate("/auth/login");
        }

        return addToast("Error!", response.message, "error");
      }

      addToast("New project added!", response.message, "success");
      navigate(-1);
    } catch (err) {
      console.log("INTERNAL SERVER ERROR", err);

      addToast(
        "INTERNAL SERVER ERROR!",
        "There was an error on our side. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen text="Adding Project..." />;

  return (
    <>
      <FormProvider {...methods}>
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            <h1 className="form-heading">Add a new project</h1>
          </div>

          <ProjectDetailsSection />
          <PreviewLinksSection />
          <FilesSection />

          <div className="p-4 w-full flex gap-4 items-center justify-end">
            <Button type={"button"} label={"Cancel"} variant={"secondary"} />
            <Button type={"submit"} label={"Add Project"} variant={"accent"} />
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default AddProject;
