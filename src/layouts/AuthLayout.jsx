import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-slate-100">
            <Outlet />
        </div>
    );
}

export default AuthLayout;