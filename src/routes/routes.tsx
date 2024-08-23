import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "../pages/users/Users";

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
      </Routes>
    </Router>
  );
};

export default AppRoutes;
