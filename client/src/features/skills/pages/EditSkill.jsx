import { useLocation, useNavigate } from "react-router-dom";

import useToast from "@/shared/toast/useToast";
import useSkill from "../hooks/useSkill";

import SkillForm from "../components/SkillForm";

import { Button } from "@/components/ui/button";

function EditSkill() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const skillId = pathname[pathname.length - 1];

  const { skill, editSkill, deleteSkill } = useSkill({
    skillId,
  });
  const { addToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to edit a skill.",
        "error",
      );

      return navigate("/auth/login");
    }

    const response = await editSkill(skillId, data);

    if (!response.success) {
      if (response.unauthorized) {
        addToast(
          "Unauthorized access!",
          "The token provided is either unauthorized or expired. Please login again.",
          "error",
        );

        return navigate("/auth/login");
      }

      return addToast("Error!", response.message, "error");
    }

    addToast("Changes saved!", response.message, "success");
    return navigate(-1);
  };

  const handleDeleteSkill = async (skillId) => {
    if (localStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a skill.",
        "error",
      );
      return navigate("/auth/login");
    }

    const response = await deleteSkill(skillId);

    if (!response.success) {
      if (response.unauthorized) {
        addToast(
          "Access unauthorized!",
          "The token provided is either invalid or expired. Please login again.",
          "error",
        );

        return navigate("/auth/login");
      }

      return addToast("Some error occurred!", response.message, "error");
    }

    addToast("Skill deleted!", response.message, "success");
    return navigate(-1);
  };

  return (
    <>
      <section className="px-4 py-6 grid gap-4 max-w-1/2">
        <h1>Edit {skill?.name}</h1>
      </section>

      <SkillForm
        skill={skill}
        onSubmit={onSubmit}
        handleDelete={handleDeleteSkill}
      />
    </>
  );
}

export default EditSkill;
