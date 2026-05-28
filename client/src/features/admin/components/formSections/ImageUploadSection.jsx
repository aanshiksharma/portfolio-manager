import useImageViewer from "../../../../shared/image-viewer/useImageViewer";

function ImageUploadSection({ admin, register }) {
  const { open } = useImageViewer();

  return (
    <section className="py-8 px-4 w-full flex items-start justify-between border-b-1 border-border">
      <div className="text-text-primary">Profile Picture</div>

      <div className="max-w-200 w-full flex flex-col gap-6">
        <div className="input-group">
          <span className="label">Admin Profile Image</span>

          <button
            type="button"
            className="image-overview"
            onClick={() => {
              open(admin.profileImage.url);
            }}
          >
            <div className="flex items-center justify-center rounded-sm w-9.5 min-h-7.5 aspect-sqare overflow-hidden">
              <img
                src={admin.profileImage.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-text-secondary">
              {admin.profileImage.fileName}
            </span>
          </button>

          <input type="file" {...register("profileImage")} />
        </div>
      </div>
    </section>
  );
}

export default ImageUploadSection;
