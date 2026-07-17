import { NavLink } from "react-router-dom";

const menus = [
    {
        title: "Dashboard",
        path: "/dashboard",
    },
    {
        title: "Departments",
        path: "/departments",
    },
    {
        title: "Roles",
        path: "/roles",
    },
    {
        title: "Users",
        path: "/users",
    },
    {
        title: "Workflow",
        path: "/workflow",
    },
    {
        title: "Requests",
        path: "/requests",
    },
    {
        title: "Notifications",
        path: "/notifications",
    },
    {
        title: "FileUploads",
        path: "/file-uploads",
    },
    {
        title: "Approvals",
        path: "/approvals",
    },
    {
        title: "Audit Logs",
        path: "/audit-logs",
    },
    {
        title: "Reports",
        path: "/reports",
    },
];

export default function Sidebar() {

    return (

        <aside className="w-64 bg-slate-900 text-white">

            <div className="p-6 text-2xl font-bold border-b border-slate-700">

                Approval System

            </div>

            <nav className="mt-4">

                {menus.map(menu => (

                    <NavLink

                        key={menu.path}

                        to={menu.path}

                        className={({ isActive }) =>
                            `block px-6 py-3 transition ${
                                isActive
                                    ? "bg-blue-700"
                                    : "hover:bg-slate-800"
                            }`
                        }

                    >

                        {menu.title}

                    </NavLink>

                ))}

            </nav>

        </aside>

    );

}