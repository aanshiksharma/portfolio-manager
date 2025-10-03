import { createContext, useContext, useState } from "react";

const ImageViewerContext = createContext();

function ImageViewerProvider({ children }) {
  const [imageViewData, setImageViewData] = useState({
    visible: false,
    imageUrl: null,
  });

  const open = (imageUrl) => {
    setImageViewData({ visible: true, imageUrl });
  };

  const close = () => {
    setImageViewData({ visible: false, imageUrl: null });
  };

  return (
    <ImageViewerContext.Provider value={{ ...imageViewData, open, close }}>
      {children}
    </ImageViewerContext.Provider>
  );
}

function useImageViewer() {
  return useContext(ImageViewerContext);
}

export { ImageViewerProvider, useImageViewer };
