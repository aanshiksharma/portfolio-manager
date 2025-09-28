import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

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
            element={<Login role="recruiter" />}
          />

          {/* DASHBOARD ROUTES */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
