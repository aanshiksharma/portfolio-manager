import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewHandler from "./views/ViewHandler";
import MainLayout from "./shared/components/layout/MainLayout";

// Auth Routes
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

// App Routes
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard/Dashboard";

// Projects Routes
import Projects from "./views/projects/Projects";
import ProjectPage from "./views/projects/ProjectPage";
import AddProject from "./views/projects/AddProject";
import EditProject from "./views/projects/EditProject";

// Skills Routes
import Skills from "./views/skills/Skills";
import AddSkill from "./views/skills/AddSkill";
import EditSkill from "./views/skills/EditSkill";

// Admin Routes
import Admin from "./views/admin/Admin";
import EditPersonal from "./views/admin/EditPersonal";

function AppRoutes() {
  return (
    <>
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

          <Route element={<MainLayout />}>
            {/* DASHBOARD ROUTES */}
            <Route path="/" element={<ViewHandler />} />
            <Route path="/dashboard" element={<Dashboard />} />

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
