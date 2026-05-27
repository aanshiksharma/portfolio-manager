import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import useToast from "../../../shared/toast/useToast";
import useSkill from "../hooks/useSkill";

function EditSkill() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const skillId = pathname[pathname.length - 1];

  const { loading, getSkill, skill, editSkill, deleteSkill } = useSkill({
    skillId,
  });
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

    const response = await editSkill(data);

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
      <section className="p-4 w-full flex items-center justify-between">
        <h1 className="form-heading">Edit "{skill.name}"</h1>

        <Button
          type={"button"}
          variant={"delete"}
          label={"Delete Skill"}
          onClick={() => handleDeleteSkill(skillId)}
        />
      </section>

      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left text-text-primary">Skill</div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Name*</span>
                <input
                  placeholder="Name of the skill."
                  autoFocus
                  {...register("skillName", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors.skillName && errors.skillName.message}
                </span>
              </div>

              <div className="input-group">
                <span className="label">Category*</span>
                <input
                  placeholder="Choose from existing categories or create a new one."
                  {...register("categoryName", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors.categoryName && errors.categoryName.message}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="p-4 w-full flex gap-4 items-center justify-end">
          <Button
            type={"button"}
            label={"Cancel"}
            variant={"secondary"}
            onClick={() => {
              navigate(-1);
            }}
          />
          <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default EditSkill;
