import Button from "../Button";

function ImageViewer({ url, visible, setPreviewImage }) {
  const handleVisibility = () => {
    setPreviewImage({ url: "", visibility: false });
  };
  if (visible)
    return (
      <>
        <div
          className={`
            p-4 backdrop-blur-md
            fixed inset-0 z-50
            flex gap-1 items-center justify-center
            bg-bg-surface-light/15
          `}
        >
          <Button
            variant={"primary"}
            icon={{ icon: "x", size: 16 }}
            onClick={handleVisibility}
            className="border-none fixed top-3 right-3 font-bold bg-transparent hover:bg-transparent"
          />
          <div className="image-container max-w-6xl rounded-lg overflow-hidden">
            <img src={url} alt="" />
          </div>
        </div>
      </>
    );
  else return;
}

export default ImageViewer;
