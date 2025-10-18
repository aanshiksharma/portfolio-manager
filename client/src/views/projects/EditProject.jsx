import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useImageViewer } from "../../contexts/ImageViewerContext";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function EditProject() {
  const [loading, setLoading] = useState({
    value: true,
    message: "Loading...",
  });
  const [currentSkill, setCurrentSkill] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const projectId = pathname[pathname.length - 1];

  const { open } = useImageViewer();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`);
        if (!res.ok) {
          if (res.status === 404) navigate("/page-not-found");
          console.log("Error fetching data");
        }
        const project = await res.json();

        reset(project);
      } catch (err) {
        // Toast notification to be added
        console.log("Error loading project", err);
      } finally {
        setLoading({ value: false, message: "" });
      }
    };

    loadProjectData();
  }, []);

  const onSubmit = async (data) => {
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
      setLoading({
        value: true,
        message: "Uploading Data...",
      });

      const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 403) {
          alert("You need to login as admin before you can save changes!");
          return navigate("/auth/login");
        } else return alert("Cannot update project at the moment!");
      }

      const result = await res.json();
      console.log(result);

      // Toast notification to be added
      alert(res.status + ":" + result.message);
      navigate(-1);
    } catch (err) {
      console.error("Error updating project :", err);
    } finally {
      setLoading({
        value: false,
        message: "",
      });
    }
  };

  const handleDeleteProject = async () => {
    setLoading({ value: true, message: "Deleting Project..." });

    try {
      const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          alert("You need to login as admin before you can save changes!");
          navigate("/auth/login");
        } else return alert("Cannot update project at the moment!");
      }

      const result = await res.json();
      console.log(result);

      // Toast notification to be added
      alert(res.status + ":" + result.message);
      navigate("/projects");
    } catch (err) {
      console.error("Error updating project :", err);
    } finally {
      setLoading({ value: false, message: "" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentSkill.trim() !== "") {
      console.log(fields);
      e.preventDefault();
      append(currentSkill.trim());
      setCurrentSkill("");
    }
  };

  const projectData = watch();

  if (loading.value)
    return (
      <>
        <Navbar />
        <LoadingPage text={loading.message} />
      </>
    );

  return (
    <>
      <Navbar />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 flex items-center justify-between w-full">
          <h1 className="form-heading">
            Edit {projectData.title || "Project"}
          </h1>
          <Button
            type={"button"}
            variant={"delete"}
            label={"Delete Project"}
            onClick={handleDeleteProject}
          />
        </div>

        <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
          <div className="left text-text-primary">Project Details</div>

          <div className="right max-w-200 w-full">
            <div className="w-full flex flex-col gap-6">
              <div className="input-group">
                <span className="label">Title*</span>
                <input
                  placeholder="Title of your project."
                  autoFocus
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

                {/* The button below opens an image view. */}
                <button
                  type="button"
                  className="image-overview"
                  onClick={() => {
                    open(projectData.coverImage.url);
                  }}
                >
                  <div className="flex items-center justify-center rounded-sm w-9.5 min-h-7.5 aspect-video overflow-hidden">
                    <img
                      src={projectData.coverImage.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-text-secondary">
                    {projectData.coverImage.fileName}
                  </span>
                </button>
                <input type="file" {...register("coverImage")} />
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
          <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default EditProject;
