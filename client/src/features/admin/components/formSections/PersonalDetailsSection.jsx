import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

import Button from "../../../../shared/components/ui/Button";

function PersonalDetailsSection({
  admin,
  register,
  control,
  formState: { errors },
}) {
  const {
    fields: aboutFields,
    append: addAbout,
    remove: removeAbout,
  } = useFieldArray({
    control,
    name: "about",
  });

  useEffect(() => {
    if (aboutFields.length === 0) addAbout("");
  }, [aboutFields]);

  return (
    <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
      <h2 className="text-text-primary">Personal Details</h2>

      <div className="max-w-200 w-full">
        <div className="w-full flex flex-col gap-6">
          <div className="input-group">
            <span className="label">Name*</span>
            <input
              placeholder="John Doe"
              {...register("name", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />

            <span className="error-message">
              {errors.name && errors.name.message}
            </span>
          </div>

          <div className="input-group">
            <span className="label">Email address*</span>
            <input
              placeholder="john_doe@gmail.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />

            <span className="error-message">
              {errors.email && errors.email.message}
            </span>
          </div>

          <div className="input-group">
            <span className="label">Mobile Number</span>
            <input placeholder="9898989898" {...register("mobile")} />
          </div>

          <div className="input-group">
            <span className="label">Portfolio Link*</span>
            <input
              placeholder="https://portfolio-link.com"
              {...register("portfolioLink", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />

            <span className="error-message">
              {errors.portfolioLink && errors.portfolioLink.message}
            </span>
          </div>

          <div className="input-group">
            <span className="label">About</span>

            {aboutFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <textarea
                  placeholder="Write something about yourself"
                  className="flex-1"
                  {...register(`about.${index}`)}
                ></textarea>

                <Button
                  type="button"
                  variant="delete"
                  icon={{ icon: "trash", size: 16 }}
                  className={"self-start border-none bg-transparent"}
                  onClick={() => removeAbout(index)}
                />
              </div>
            ))}

            <Button
              variant={"secondary"}
              icon={{ icon: "plus", size: 16 }}
              label={"Add another line"}
              className={"self-start"}
              onClick={() => {
                addAbout("");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalDetailsSection;
