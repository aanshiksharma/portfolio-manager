import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Routes
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

// Pages Routes
import Dashboard from "./views/Dashboard";
import Projects from "./views/pages/Projects";
import ProjectPage from "./views/pages/ProjectPage";
import Skills from "./views/pages/Skills";

// Form Pages Routes
// Add
import AddSkill from "./views/formPages/AddSkill";
import AddProject from "./views/formPages/AddProject";

// Edit
import EditPersonal from "./views/formPages/EditPersonal";
import EditSkill from "./views/formPages/EditSkill";
import EditProject from "./views/formPages/EditProject";
import Admin from "./views/pages/Admin";

function App() {
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

          {/* DASHBOARD ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />

          {/* PAGES ROUTES */}
          <Route path="/projects/*" element={<ProjectPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/personal" element={<Admin />} />

          {/* FORM PAGES ROUTES */}
          {/* ADD */}
          <Route path="/project/add" element={<AddProject />} />
          <Route path="/skill/add" element={<AddSkill />} />

          {/* EDIT */}
          <Route path="/personal/edit" element={<EditPersonal />} />
          <Route path="/projects/edit/*" element={<EditProject />} />
          <Route path="/skill/edit/*" element={<EditSkill />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
