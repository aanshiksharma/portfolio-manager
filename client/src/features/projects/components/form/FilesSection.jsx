import { useFormContext } from "react-hook-form";
import useImageViewer from "../../../../shared/image-viewer/useImageViewer";

function FilesSection() {
  const { register, watch } = useFormContext();
  const { open } = useImageViewer();

  const coverImage = watch("coverImage");

  const previewUrl = coverImage?.[0]
    ? URL.createObjectURL(coverImage[0])
    : coverImage?.url;

  const fileName = coverImage?.[0] ? coverImage[0].name : coverImage?.fileName;

  return (
    <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
      <div className="left flex flex-col gap-2">
        <h4 className="text-text-primary">Gallery</h4>
        <p className="text-xs max-w-[232px]">
          Choose your project’s main cover photo and some more photos for the
          gallery section.
        </p>
      </div>

      <div className="right max-w-200 w-full">
        <div className="w-full flex flex-col gap-6">
          <div className="input-group">
            <span className="label">Main Cover Image*</span>

            {/* The button below opens an image view. */}
            <button
              type="button"
              className="image-overview"
              onClick={() => {
                open(previewUrl);
              }}
            >
              <div className="flex items-center justify-center rounded-sm w-9.5 min-h-7.5 aspect-video overflow-hidden">
                <img
                  src={previewUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-text-secondary">{fileName}</span>
            </button>
            <input type="file" {...register("coverImage")} />
          </div>

          <div className="input-group">
            <span className="label">Other Photos</span>
            <input type="file" {...register("otherPhotos")} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilesSection;
