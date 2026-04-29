import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../../shared/components/ui/Button";
import LoadingScreen from "../../../shared/components/ui/LoadingScreen";
import useToast from "../../../shared/toast/useToast";

function AddSkill() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { addToast } = useToast();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a skill.",
        "error",
      );

      return navigate("/auth/login");
    }

    try {
      setLoading(true);

      const res = await fetch(`${BACKEND_URL}/api/skills`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

      addToast("New skill added!", response.message, "success");
      reset();
      return navigate(-1);
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

  if (loading) {
    return <LoadingScreen text="Adding Skill..." />;
  }

  return (
    <>
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <section className="p-4">
          <h1 className="form-heading">Add a new skill</h1>
        </section>

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
              reset();
              navigate(-1);
            }}
          />

          <Button type={"submit"} label={"Add Skill"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default AddSkill;
