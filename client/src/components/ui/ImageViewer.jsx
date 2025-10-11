import Button from "../Button";
import { useImageViewer } from "../../contexts/ImageViewerContext";

function ImageViewer() {
  const { visible, imageUrl, close } = useImageViewer();

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
            onClick={() => close()}
            className="border-none fixed top-3 right-3 font-bold bg-transparent hover:bg-transparent"
          />
          <div className="image-container max-w-6xl h-full rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </>
    );
  else return;
}

export default ImageViewer;
