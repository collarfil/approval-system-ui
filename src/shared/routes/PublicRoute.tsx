import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "@/shared/utils/token";

export default function PublicRoute() {

    const token = getToken();

    return token
        ? <Navigate to="/dashboard" replace />
        : <Outlet />;
}