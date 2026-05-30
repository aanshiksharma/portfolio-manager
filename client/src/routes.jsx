import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Auth Routes
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

// App Routes
import NotFound from "./NotFound";
import Dashboard from "./features/dashboard/pages/Dashboard";

// Projects Routes
import Projects from "./features/projects/pages/Projects";
import ProjectPage from "./features/projects/pages/ProjectPage";
import AddProject from "./features/projects/pages/AddProject";
import EditProject from "./features/projects/pages/EditProject";

// Skills Routes
import Skills from "./features/skills/pages/Skills";
import AddSkill from "./features/skills/pages/AddSkill";
import EditSkill from "./features/skills/pages/EditSkill";

// Admin Routes
import Admin from "./features/admin/pages/Admin";
import EditPersonal from "./features/admin/pages/EditPersonal";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />

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
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
