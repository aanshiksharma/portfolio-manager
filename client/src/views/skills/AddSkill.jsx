import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function AddSkill() {
  const [adding, setAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const onSubmit = async (data) => {
    setAdding(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/skills`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 403) {
          alert("You need to be logged in as admin to save changes.");
          return navigate("/auth/login");
        }

        const response = await res.json();
        alert(response.message);
        return console.log("Cannot add the skill right now. Try again later");
      }

      alert("Skill added");
      reset();
      navigate(-1);
    } catch (err) {
      return console.error("An error occurred on our side :", err);
    } finally {
      setAdding(false);
    }
  };

  if (adding) {
    return (
      <>
        <Navbar />
        <LoadingPage text="Adding Skill..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <h1 className="form-heading">Add a new skill</h1>
        </div>

        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left text-text-primary">Skill</div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Name*</span>
                <input
                  placeholder="Name of the skill."
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
            }}
          />
          <Button type={"submit"} label={"Add Skill"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default AddSkill;
