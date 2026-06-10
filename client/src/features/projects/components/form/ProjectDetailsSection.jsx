import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import SkillSelect from "./SkillSelect";
import { Switch } from "@/components/ui/switch";

function ProjectDetailsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldSet>
      <FieldLegend>Project Details</FieldLegend>
      <FieldDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        expedita eligendi obcaecati quos officia quod!
      </FieldDescription>

      <FieldGroup>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input
            placeholder="Title of your project."
            autoFocus
            {...register("title", {
              required: {
                value: true,
                message: "Title cannot be empty.",
              },
            })}
          />
          <FieldError>{errors.title && errors.title.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            placeholder="Write something about your project."
            {...register("description")}
          />
        </Field>

        <Field>
          <FieldLabel>Skills</FieldLabel>

          <Controller
            name="skills"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <SkillSelect
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        <Field orientation="horizontal">
          <Controller
            name="featured"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch
                id="featured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <FieldLabel htmlFor="featured">Add to featured projects</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export default ProjectDetailsSection;
