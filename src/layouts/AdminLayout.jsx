import { NavLink, Outlet } from "react-router";

const AdminLayout = () => {
    return (
        <div className="h-screen flex gap-4 p-4 bg-slate-100">
            <header className="w-[270px] bg-white rounded-md p-4">
                <h1 className="text-center">LOGO</h1>
                <nav className="grid gap-3 mt-6 *:leading-[40px] *:border *:border-slate-300 *:pl-4 *:rounded *:text-slate-500 *:duration-150">
                    <NavLink end className="hover:bg-slate-500 hover:text-white [&.active]:bg-slate-500 [&.active]:text-white" to="/admin">Dashboard</NavLink>
                    <NavLink end className="hover:bg-slate-500 hover:text-white [&.active]:bg-slate-500 [&.active]:text-white" to="/admin/users">Usuários</NavLink>
                    <NavLink end className="hover:bg-slate-500 hover:text-white [&.active]:bg-slate-500 [&.active]:text-white" to="/admin/especialities">Especialidades</NavLink>
                </nav>
            </header>
            <div className="flex-1 p-4 bg-white rounded-md overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;