import { useQuery } from "@tanstack/react-query";
import { 
    getDashboardStats, 
    getRequestTrend, 
    getRequestsByStatus, 
    getRequestsByDepartment,
    getApprovalTime,
    getUserActivity
} from "../services/report.service";

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["reports", "dashboard"],
        queryFn: getDashboardStats,
    });
};

export const useRequestTrend = (days: number = 30) => {
    return useQuery({
        queryKey: ["reports", "trend", days],
        queryFn: () => getRequestTrend(days),
    });
};

export const useRequestsByStatus = () => {
    return useQuery({
        queryKey: ["reports", "by-status"],
        queryFn: getRequestsByStatus,
    });
};

export const useRequestsByDepartment = () => {
    return useQuery({
        queryKey: ["reports", "by-department"],
        queryFn: getRequestsByDepartment,
    });
};

export const useApprovalTime = () => {
    return useQuery({
        queryKey: ["reports", "approval-time"],
        queryFn: getApprovalTime,
    });
};

export const useUserActivity = () => {
    return useQuery({
        queryKey: ["reports", "user-activity"],
        queryFn: getUserActivity,
    });
};