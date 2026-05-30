import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ImageViewerProvider from "./shared/image-viewer/ImageViewerProvider";
import ToastProvider from "./shared/toast/ToastProvider";
import { TooltipProvider } from "./components/ui/tooltip";

import AppRoutes from "./routes";
import ImageViewer from "./shared/image-viewer/ImageViewer";

function App() {
  return (
    <>
      <ToastProvider>
        <ImageViewerProvider>
          <TooltipProvider>
            <AppRoutes />
            <ImageViewer />
          </TooltipProvider>
        </ImageViewerProvider>
      </ToastProvider>
    </>
  );
}

export default App;
