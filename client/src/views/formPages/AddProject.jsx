import { useForm } from "react-hook-form";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";

function AddProject() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const promise = new Promise((resolve, rej) => {
      setTimeout(() => resolve(), 1500);
    });
    await promise;
    reset();
  };

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
                <span className="label">Deployed Site</span>
                <input
                  placeholder="Project's live site link"
                  {...register("deployed-link")}
                />
              </div>

              <div className="input-group">
                <span className="label">GitHub</span>
                <input
                  placeholder="Project's github link"
                  {...register("github-link")}
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
                <span className="label">Main Cover Photo*</span>
                <input
                  type="file"
                  {...register("main-cover-photo", {
                    required: {
                      value: true,
                      message: "Please upload a cover image.",
                    },
                  })}
                />
                <span className="error-message">
                  {errors["main-cover-photo"] &&
                    errors["main-cover-photo"].message}
                </span>
              </div>

              <div className="input-group">
                <span className="label">Other Photos</span>
                <input type="file" {...register("other-photos")} />
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
