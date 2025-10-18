import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";
import { useToast } from "../../contexts/ToastContext";

function EditSkill() {
  const [loading, setLoading] = useState({
    value: false,
    message: "Loading...",
  });
  const [skill, setSkill] = useState({});

  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname.split("/");
  const skillId = pathname[pathname.length - 1];

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadSkillData = async () => {
      try {
        setLoading({ value: true, message: "Loading..." });
        const res = await fetch(`${BACKEND_URL}/api/skills/${skillId}`);
        const skill = await res.json();

        const categoryRes = await fetch(
          `${BACKEND_URL}/api/categories/${skill.category}`
        );
        const category = await categoryRes.json();

        setSkill({ id: skill._id, name: skill.name, category: category.name });
        reset({ skillName: skill.name, categoryName: category.name });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading({ value: false, message: "" });
      }
    };

    loadSkillData();
  }, []);

  const onSubmit = async (data) => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a skill.",
        "error"
      );

      return navigate("/auth/login");
    }

    try {
      setLoading({ value: true, message: "Saving changes..." });

      const res = await fetch(`${BACKEND_URL}/api/skills/${skillId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          addToast(
            "Unauthorized access!",
            "The token provided is either unauthorized or expired. Please login again.",
            "error"
          );

          return navigate("/auth/login");
        }

        return addToast("Error!", result.message, "error");
      }

      addToast("Changes saved!", result.message, "success");
      return navigate(-1);
    } catch (err) {
      console.log("INTERNAL SERVER ERROR", err);

      addToast(
        "INTERNAL SERVER ERROR!",
        "There was an error on our side. Please try again.",
        "error"
      );
    } finally {
      setLoading({ value: false, message: "" });
    }
  };

  const onDelete = async () => {
    if (sessionStorage.getItem("login-mode")) {
      addToast(
        "Access Denied!",
        "You need to be logged in as admin to delete a skill.",
        "error"
      );

      return navigate("/auth/login");
    }

    try {
      setLoading({ value: true, message: "Deleting..." });

      const res = await fetch(`${BACKEND_URL}/api/skills/${skill.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const response = await res.json();

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          addToast(
            "Access unauthorized!",
            "The token provided is either invalid or expired. Please login again.",
            "error"
          );

          return navigate("/auth/login");
        }

        return addToast("Some error occurred!", response.message, "error");
      }

      addToast("Skill deleted!", response.message, "success");
      return navigate(-1);
    } catch (err) {
      console.log("INTERNAL SERVER ERROR", err);

      addToast(
        "INTERNAL SERVER ERROR!",
        "There was an error on our side. Please try again.",
        "error"
      );
    } finally {
      setLoading({ value: false, message: "" });
    }
  };

  if (loading.value) {
    return (
      <>
        <Navbar />
        <LoadingPage text={loading.message} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <section className="p-4 w-full flex items-center justify-between">
          <h1 className="form-heading">Edit "{skill.name}"</h1>

          <Button
            type={"button"}
            variant={"delete"}
            label={"Delete Skill"}
            onClick={() => onDelete()}
          />
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
