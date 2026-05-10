import useImageViewer from "../../../shared/image-viewer/useImageViewer";

function ProjectGallery({ project }) {
  const { open } = useImageViewer();

  return (
    <section className="flex flex-col gap-4">
      <div
        className="cover-image-container shadow-md shadow-text-secondary/25 border border-border rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={() => {
          open(project.coverImage.url);
        }}
      >
        <img
          src={project.coverImage.url}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="other-images-container flex flex-col gap-4 py-4">
        <h4 className="font-semibold text-text-primary">Other Image</h4>

        <hr className="border-border" />

        <div className="flex flex-wrap gap-4 py-2 items-center justify-center min-h-40">
          {project.otherImages.length === 0 && <p>No more images found!</p>}

          {project.otherImages.length !== 0 &&
            project.otherImages.map((image) => {
              return (
                <div
                  className="border border-border rounded-lg overflow-hidden shadow-md shadow-bg-surface-light max-w-xs"
                  onClick={() => {
                    open(image.url);
                  }}
                >
                  <img src={image.url} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProjectGallery;
