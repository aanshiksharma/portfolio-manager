import { createContext, useState } from "react";

export const ImageViewerContext = createContext();

const ImageViewerProvider = ({ children }) => {
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
};

export default ImageViewerProvider;
