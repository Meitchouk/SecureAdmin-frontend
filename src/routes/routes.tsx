import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "../pages/users/Users";
import Roles from "../pages/roles/Roles";
import Profile from "../pages/profile/Profile";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* RUTA BASE */}
        <Route path="/" element={<Login />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* SEGURIDAD */}
        {/*SEGURIDAD -> USUARIOS */}
        <Route path="/security/users" element={<Users />} />

        {/*SEGURIDAD -> ROLES */}
        <Route path="/security/roles" element={<Roles />} />

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
