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

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* AUTH ROUTES */}
          <Route path="/auth/login" element={<Login role="admin" />} />
          <Route path="/auth/register" element={<Register />} />
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

          {/* FORM PAGES ROUTES */}
          {/* ADD */}
          <Route path="/add/project" element={<AddProject />} />
          <Route path="/add/skill" element={<AddSkill />} />

          {/* EDIT */}
          <Route path="/edit/personal" element={<EditPersonal />} />
          <Route path="/edit/project/*" element={<EditProject />} />
          <Route path="/edit/skill/*" element={<EditSkill />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
