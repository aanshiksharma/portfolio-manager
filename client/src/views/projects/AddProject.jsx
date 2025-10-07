import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function AddProject() {
  const [adding, setAdding] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentSkill.trim() !== "") {
      e.preventDefault();
      append(currentSkill.trim());
      setCurrentSkill("");
    }
  };

  const onSubmit = async (data) => {
    const skills = data.skills[0] !== "" ? data.skills : [];
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("skills", JSON.stringify(skills));
    formData.append("featured", data.featured);
    formData.append("description", data.description);
    formData.append("projectLink", data.projectLink);
    formData.append("githubLink", data.githubLink);
    formData.append("coverImage", data.coverImage[0]);

    try {
      setAdding(true);
      const res = await fetch(`${BACKEND_URL}/api/projects/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          alert("You need to be logged in as admin before adding a project");
          return navigate(-1);
        }

        const response = await res.json();
        alert(response.message);
      }

      const response = await res.json();
      alert(response.message);
      navigate(-1);
    } catch (err) {
      alert(err);
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

                <div className="flex flex-wrap items-start gap-2 bg-bg-surface-dark/60 border-1 border-border p-2 rounded-sm focus-within:outline-accent focus-within:border-transparent outline-2 outline-transparent transition ease-out duration-200 ">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 bg-bg-surface-light/75 p-2 rounded-lg text-text-secondary"
                    >
                      <input
                        type="text"
                        disabled
                        className="hidden"
                        {...register(`skills.${index}`)}
                      />

                      <span className="text-xs font-semibold">
                        {watch(`skills.${index}`)}
                      </span>

                      <Button
                        type={"button"}
                        variant={"secondary"}
                        icon={{ icon: "x", size: 12 }}
                        className={
                          "bg-transparent hover:bg-transparent !p-0 border-none"
                        }
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    </div>
                  ))}

                  <input
                    type="text"
                    value={currentSkill}
                    className="!bg-transparent border-none !max-w-none min-w-3xs outline-none !px-0 flex-1"
                    placeholder="Type a skill and press Enter"
                    onChange={(e) => {
                      setCurrentSkill(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>

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
