import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { useFormContext } from "react-hook-form";

function PreviewLinksSection() {
  const { register } = useFormContext();

  return (
    <FieldSet>
      <FieldLegend>Preview Links</FieldLegend>
      <FieldDescription>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
        perferendis cupiditate eum!
      </FieldDescription>

      <FieldGroup>
        <Field>
          <FieldLabel>Project Link</FieldLabel>
          <Input
            placeholder="https://project-name.com"
            {...register("projectLink")}
          />
        </Field>

        <Field>
          <FieldLabel>GitHub Link</FieldLabel>
          <Input
            placeholder="https://github.com/github-username/project-name"
            {...register("githubLink")}
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

export default PreviewLinksSection;
