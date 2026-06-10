import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import ProjectDetailsSection from "./ProjectDetailsSection";
import PreviewLinksSection from "./PreviewLinksSection";
import FilesSection from "./FilesSection";

import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

function ProjectForm({ methods, project, onSubmit, handleDelete }) {
  const navigate = useNavigate();

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (project) reset(project);
  }, [project]);

  return (
    <FormProvider {...methods}>
      <form className="px-4 xl:max-w-3/4" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <ProjectDetailsSection />
          <FieldSeparator />

          <PreviewLinksSection />
          <FieldSeparator />

          <FilesSection />
          <FieldSeparator />

          <Field
            orientation="horizontal"
            className="flex max-md:flex-col md:items-center md:justify-between"
          >
            <div className="flex max-md:flex-col gap-3 max-md:w-full">
              <Button type={"submit"}>
                {project ? "Save" : "Add Project"}
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

            {project && (
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
      </form>
    </FormProvider>
  );
}

export default ProjectForm;
