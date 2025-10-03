import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function AddProject() {
  const [adding, setAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setAdding(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("skills", data.skills.split(","));
    formData.append("featured", data.featured);
    formData.append("description", data.description);
    formData.append("projectLink", data.projectLink);
    formData.append("githubLink", data.githubLink);
    formData.append("coverImage", data.coverImage[0]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/projects/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 403) {
          alert("You need to be logged in as admin before adding a project");
          navigate("/auth/login");
          return;
        }

        return alert(
          "Could not add your project at the moment. Try again later!"
        );
      }

      const response = await res.json();
      alert(response.message);
      navigate(-1);
    } catch (err) {
      console.log("SERVER ERROR", err);
    } finally {
      setAdding(false);
    }
  };

  if (adding)
    return (
      <>
        <Navbar />
        <LoadingPage text="Adding Project..." />
      </>
    );

  return (
    <>
      {uploading && <UploadingOverlay />}
      <Navbar />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <h1 className="form-heading">Add a new project</h1>
        </div>

        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left text-text-primary">Project Details</div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Title*</span>
                <input
                  placeholder="Title of your project."
                  {...register("title", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors.title && errors.title.message}
                </span>
              </div>

              <div className="input-group">
                <span className="label">Description</span>
                <textarea
                  placeholder="Write something about your project."
                  {...register("description")}
                ></textarea>
                <span className="error-message">
                  {errors.description && errors.description.message}
                </span>
              </div>

              <div className="input-group">
                <span className="label">Skills*</span>
                <textarea
                  placeholder="Skills applied in this project."
                  {...register("skills", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                ></textarea>
                <span className="error-message">
                  {errors.skills && errors.skills.message}
                </span>
              </div>

              <div className="input-group checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  {...register("featured")}
                />
                <label htmlFor="checkbox" className="text-text-primary">
                  Add to featured projects
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left text-text-primary">Preview Links</div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Project Link</span>
                <input
                  placeholder="Project's live link"
                  {...register("projectLink")}
                />
              </div>

              <div className="input-group">
                <span className="label">GitHub Link</span>
                <input
                  placeholder="Project's github link"
                  {...register("githubLink")}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left flex flex-col gap-2">
            <h4 className="text-text-primary">Gallery</h4>
            <p className="text-xs max-w-[232px]">
              Choose your project’s main cover photo and some more photos for
              the gallery section.
            </p>
          </div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Main Cover Image*</span>
                <input
                  type="file"
                  {...register("coverImage", {
                    required: {
                      value: true,
                      message: "Please upload a cover image.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors.coverImage && errors.coverImage.message}
                </span>
              </div>

              <div className="input-group">
                <span className="label">Other Photos</span>
                <input type="file" {...register("otherPhotos")} />
              </div>
            </div>
          </div>
        </section>

        <div className="p-4 w-full flex gap-4 items-center justify-end">
          <Button type={"button"} label={"Cancel"} variant={"secondary"} />
          <Button type={"submit"} label={"Add Project"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default AddProject;
