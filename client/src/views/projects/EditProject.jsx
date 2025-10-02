import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import LoadingPage from "../LoadingPage";

function EditProject() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const projectId = pathname[pathname.length - 1];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`);
        if (!res.ok) console.log("Error fetching data");

        const project = await res.json();
        setProjectData(project);

        reset(project);
      } catch (err) {
        // Toast notification to be added
        alert("Could not load projects");
        console.log("Error loading project", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjectData();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // Toast notification to be added
    alert("Project Updated!");
    navigate("/dashboard");
  };

  const handleDeleteProject = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) return;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <LoadingPage />;
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
                  defaultChecked={
                    projectData.featured ? "checked" : "unchecked"
                  }
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
          <Button type={"submit"} label={"Save Changes"} variant={"accent"} />
        </div>
      </form>
    </>
  );
}

export default EditProject;
