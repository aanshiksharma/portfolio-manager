import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function SkillForm({ skill, onSubmit, handleDelete }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (skill)
      reset({ skillName: skill?.name, categoryName: skill?.categoryName });
  }, [skill]);

  return (
    <>
      <form className="px-4 xl:max-w-3/4" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend>Skill Information</FieldLegend>
          <FieldDescription>
            Skills are grouped by category on your portfolio
          </FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="skillName">Name of the skill*</FieldLabel>
              <Input
                id="skillName"
                placeholder="NextJs or React.js"
                autoFocus
                {...register("skillName", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
              />
              <FieldError>
                {errors.skillName && errors.skillName.message}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Category*</FieldLabel>

              <Input
                id="category"
                placeholder="Choose from existing categories or create a new one."
                {...register("categoryName", {
                  required: {
                    value: true,
                    message: "This field is required.",
                  },
                })}
              />
              <FieldError>
                {errors.categoryName && errors.categoryName.message}
              </FieldError>
            </Field>
            <FieldSeparator />

            <FieldGroup>
              <Field
                orientation="horizontal"
                className="flex max-md:flex-col md:items-center md:justify-between"
              >
                <div className="flex max-md:flex-col gap-3 max-md:w-full">
                  <Button type={"submit"}>
                    {skill ? "Save" : "Add Skill"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </div>

                {skill && (
                  <Button
                    variant="destructive"
                    className="max-md:w-full"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
}

export default SkillForm;
