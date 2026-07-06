import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "@/features/auth/pages/LoginPage";

import DepartmentPage from "@/features/departments/pages/DepartmentPage";
import RolePage from "@/features/roles/pages/RolePage";
import UserPage from "@/features/users/pages/UserPage";
import WorkflowPage from "@/features/workflow/pages/WorkflowPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import RequestPage  from "@/features/requests/pages/RequestPage";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Public Routes */}

            <Route element={<PublicRoute />}>

                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                </Route>

            </Route>

            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

                <Route element={<DashboardLayout />}>

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/departments"
                        element={<DepartmentPage />}
                    />

                    <Route
                        path="/roles"
                        element={<RolePage />}
                    />
                    <Route
                        path="/users"
                        element={<UserPage />}
                    />
                    <Route
    path="/requests"
    element={<RequestPage />}
/>
                   <Route
    path="/workflow"
    element={<WorkflowPage />}
/>
                </Route>
 
            </Route>

            {/* Default */}

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

        </Routes>
    );
}