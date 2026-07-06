import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "@/shared/utils/token";

export default function ProtectedRoute() {

    const token = getToken();

    return token
        ? <Outlet />
        : <Navigate to="/login" replace />;
}