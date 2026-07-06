import { http } from "@/shared/api/http";

import type { DashboardSummary } from "../types/dashboard.types";

export const getDashboardSummary =
async (): Promise<DashboardSummary> => {

    const response =
        await http.get<DashboardSummary>(
            "/Dashboard/summary"
        );

    return response.data;
};