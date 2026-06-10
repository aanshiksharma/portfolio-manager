import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import useImageViewer from "@/shared/image-viewer/useImageViewer";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import ImageDropzone from "./ImageDropzone";

function FilesSection() {
  const { control } = useFormContext();

  return (
    <FieldSet>
      <FieldLegend>Gallery</FieldLegend>
      <FieldDescription>
        Choose your project’s main cover photo and some more photos for the
        gallery section.
      </FieldDescription>

      <FieldGroup>
        <Field>
          <FieldLabel>Main Cover Image*</FieldLabel>

          <Controller
            name="coverImage"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <ImageDropzone
                value={field.value || []}
                onChange={field.onChange}
                maxFiles={1}
              />
            )}
          />
        </Field>

        <Field>
          <FieldLabel>Other Photos</FieldLabel>

          <Controller
            name="otherImages"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <ImageDropzone
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export default FilesSection;
