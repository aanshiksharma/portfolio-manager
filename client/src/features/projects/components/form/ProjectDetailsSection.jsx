import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import Button from "../../../../shared/components/ui/Button";

function ProjectDetailsSection() {
  const [currentSkill, setCurrentSkill] = useState("");

  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentSkill.trim() !== "") {
      e.preventDefault();
      append(currentSkill.trim());
      setCurrentSkill("");
    }
  };

  return (
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
                  <input type="text" hidden {...register(`skills.${index}`)} />

                  <span className="text-xs font-semibold">
                    {watch(`skills.${index}`)}
                  </span>

                  <Button
                    type="button"
                    variant="secondary"
                    icon={{ icon: "x", size: 12 }}
                    className="bg-transparent !p-0 border-none"
                    onClick={() => remove(index)}
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
            <input type="checkbox" id="checkbox" {...register("featured")} />
            <label htmlFor="checkbox" className="text-text-primary">
              Add to featured projects
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetailsSection;
