import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ImageViewerProvider } from "./contexts/ImageViewerContext";

import ImageViewer from "./components/ui/ImageViewer";

// Auth Routes
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

// Pages Routes
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard/Dashboard";

// Projects
import Projects from "./views/projects/Projects";
import ProjectPage from "./views/projects/ProjectPage";
import AddProject from "./views/projects/AddProject";
import EditProject from "./views/projects/EditProject";

// Skills
import Skills from "./views/skills/Skills";
import AddSkill from "./views/skills/AddSkill";
import EditSkill from "./views/skills/EditSkill";

// Personal
import Admin from "./views/admin/Admin";
import EditPersonal from "./views/admin/EditPersonal";
import ViewHandler from "./views/ViewHandler";

function App() {
  return (
    <>
      <ImageViewerProvider>
        <Router>
          <Routes>
            {/* AUTH ROUTES */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login role="admin" />} />
            <Route
              path="/auth/recruiter-login"
              element={<Login role="recruiter" />}
            />
            <Route
              path="/auth/visitor-login"
              element={<Login role="visitor" />}
            />

            {/* DASHBOARD ROUTES */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<ViewHandler />} />

            {/* PROJECTS ROUTES */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/*" element={<ProjectPage />} />
            <Route path="/projects/add" element={<AddProject />} />
            <Route path="/projects/edit/*" element={<EditProject />} />

            {/* SKILLS ROUTES */}
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills/add" element={<AddSkill />} />
            <Route path="/skills/edit/*" element={<EditSkill />} />

            {/* ADMIN ROUTES */}
            <Route path="/personal" element={<Admin />} />
            <Route path="/personal/edit" element={<EditPersonal />} />

            {/* NOT FOUND PAGE ROUTE */}
            <Route path="/page-not-found" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>

        <ImageViewer />
      </ImageViewerProvider>
    </>
  );
}

export default App;
