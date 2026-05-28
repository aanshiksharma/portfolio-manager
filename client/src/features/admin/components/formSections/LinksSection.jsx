import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

import Button from "../../../../shared/components/ui/Button";

function LinksSection({ admin, register, reset, watch, control }) {
  const {
    fields: socialFields,
    append: addSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialMediaLinks",
  });

  useEffect(() => {
    if (socialFields.length === 0) addSocial({ platform: "", link: "" });
  }, [socialFields]);

  return (
    <div className="py-8 px-4 w-full flex flex-col gap-6 border-b-1 border-border">
      <section className="w-full flex items-start justify-between">
        <h2 className="text-text-primary">Social Media Links</h2>

        <div className="max-w-200 w-full">
          <div className="flex flex-col gap-3">
            {socialFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Platform"
                  className="basis-40 !text-text-muted"
                  {...register(`socialMediaLinks.${index}.platform`)}
                />
                <input
                  type="text"
                  placeholder="Link"
                  className="flex-1"
                  {...register(`socialMediaLinks.${index}.link`)}
                />

                <Button
                  variant={"delete"}
                  icon={{ icon: "trash", size: 16 }}
                  className={"border-none bg-transparent rounded-sm"}
                  onClick={() => {
                    removeSocial(index);
                  }}
                />
              </div>
            ))}

            <Button
              variant={"secondary"}
              icon={{ icon: "plus", size: 16 }}
              label={"Add a link"}
              className={"self-start"}
              onClick={() => {
                const hasEmpty = socialFields.some(
                  (field) => !field.platform.trim() || !field.link.trim(),
                );
                if (!hasEmpty) addSocial({ platform: "", link: "" });
              }}
            />
          </div>
        </div>
      </section>

      <section className="w-full flex items-start justify-between">
        <h2 className="text-text-primary">Resume</h2>

        <div className="max-w-200 w-full">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="https://example.com/resume-link"
              {...register("resumeLink")}
            />

            <Button
              variant={"delete"}
              icon={{ icon: "trash", size: 16 }}
              className={"border-none bg-transparent"}
              onClick={() => {
                const data = watch();
                reset({ ...data, resumeLink: "" });
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LinksSection;
