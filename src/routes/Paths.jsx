import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/Register";
import RecoveryPassword from "../pages/auth/RecoveryPassword";
import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Especialities from "../pages/admin/Especialities";
import SafePath from "./SafePath";

const Paths = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/recovery" element={<RecoveryPassword />} />
                </Route>
                <Route path="/admin" element={<SafePath><AdminLayout /></SafePath>}>
                    <Route index element={<Dashboard />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/especialities" element={<Especialities />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;