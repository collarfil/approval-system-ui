import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary }
from "../services/dashboard.service";

export const useDashboard = () => {

    return useQuery({

        queryKey: ["dashboard"],

        queryFn: getDashboardSummary,

    });

};