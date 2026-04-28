import { useContext } from "react";
import { ImageViewerContext } from "./ImageViewerProvider";

const useImageViewer = () => useContext(ImageViewerContext);
export default useImageViewer;
