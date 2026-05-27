import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import useToast from "../../../shared/toast/useToast";
import useSkill from "../hooks/useSkill";

import SkillForm from "../components/SkillForm";

function EditSkill() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const skillId = pathname[pathname.length - 1];

  const { loading, skill, editSkill, deleteSkill } = useSkill({
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

  if (loading || !skill) return <LoadingScreen />;

  return (
    <>
      <div className="container">
        <section className="p-4 w-full flex items-center justify-between">
          <h1 className="form-heading">Edit "{skill.name}"</h1>

          <Button
            type={"button"}
            variant={"delete"}
            label={"Delete Skill"}
            onClick={() => handleDeleteSkill(skillId)}
          />
        </section>

        <SkillForm skill={skill} onSubmit={onSubmit} />
      </div>
    </>
  );
}

export default EditSkill;
