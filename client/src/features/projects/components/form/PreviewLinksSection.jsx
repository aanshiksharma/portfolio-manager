import { useFormContext } from "react-hook-form";

function PreviewLinksSection() {
  const { register } = useFormContext();

  return (
    <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
      <div className="left text-text-primary">Preview Links</div>

      <div className="right max-w-200 w-full">
        <div className="w-full flex flex-col gap-6">
          <div className="input-group">
            <span className="label">Project Link</span>
            <input
              placeholder="Project's live link"
              {...register("projectLink")}
            />
          </div>

          <div className="input-group">
            <span className="label">GitHub Link</span>
            <input
              placeholder="Project's github link"
              {...register("githubLink")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PreviewLinksSection;
