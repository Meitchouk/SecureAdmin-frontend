import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "../pages/users/Users";
import Roles from "../pages/roles/Roles";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/resetPassword";
import ForgotPassword from "../pages/forgotPassword";
import CreateUser from "../pages/createUser";

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
        {/* RESET PASSWORD */}
        <Route
          path="/reset-password/"
          element={<ResetPassword />}
        />

        {/* FORGOT PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* CREATE USER */}
        <Route path="/register" element={<CreateUser />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
