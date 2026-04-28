import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ImageViewerProvider } from "./contexts/ImageViewerContext";
import { ToastProvider } from "./contexts/ToastContext";

import AppRoutes from "./routes";
import ImageViewer from "./components/ui/ImageViewer";

function App() {
  return (
    <>
      <ToastProvider>
        <ImageViewerProvider>
          <AppRoutes />

          <ImageViewer />
        </ImageViewerProvider>
      </ToastProvider>
    </>
  );
}

export default App;
