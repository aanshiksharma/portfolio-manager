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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";

import SkillSelect from "./SkillSelect";
import { generateSlug } from "@/lib/generateSlug";

function ProjectDetailsSection({ addingProject }) {
  const {
    register,
    control,
    watch,
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
        <FieldGroup className="flex-row flex-wrap">
          <Field className="min-w-3xs flex-1">
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
            {addingProject && (
              <FieldDescription>
                <p className="overflow-x-clip">
                  Generated Slug:{" "}
                  <span className="text-foreground">
                    {generateSlug(watch("title"))}
                  </span>
                </p>
              </FieldDescription>
            )}
            <FieldError>{errors.title && errors.title.message}</FieldError>
          </Field>

          {!addingProject && (
            <Field className="min-w-3xs flex-1">
              <FieldLabel>
                Slug
                <Tooltip>
                  <TooltipTrigger>
                    <Button type="button" variant="outline" size="icon-xs">
                      <Info />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    A human-readable, URL-safe unique identifier derived from a
                    resource’s name or title
                  </TooltipContent>
                </Tooltip>
              </FieldLabel>
              <Input
                placeholder="Choose custom slug for your project."
                {...register("slug")}
              />
            </Field>
          )}
        </FieldGroup>

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
