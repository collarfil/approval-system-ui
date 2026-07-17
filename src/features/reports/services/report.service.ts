import { http } from "@/shared/api/http";
import type { 
    DashboardStats, 
    RequestTrend, 
    RequestByStatus, 
    RequestByDepartment,
    ApprovalTimeDto,
    UserActivityDto
} from "../types/report.types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await http.get<DashboardStats>("/Report/dashboard");
    return response.data;
};

export const getRequestTrend = async (days: number = 30): Promise<RequestTrend[]> => {
    const response = await http.get<RequestTrend[]>(`/Report/trend?days=${days}`);
    return response.data;
};

export const getRequestsByStatus = async (): Promise<RequestByStatus[]> => {
    const response = await http.get<RequestByStatus[]>("/Report/by-status");
    return response.data;
};

export const getRequestsByDepartment = async (): Promise<RequestByDepartment[]> => {
    const response = await http.get<RequestByDepartment[]>("/Report/by-department");
    return response.data;
};

export const getApprovalTime = async (): Promise<ApprovalTimeDto> => {
    const response = await http.get<ApprovalTimeDto>("/Report/approval-time");
    return response.data;
};

export const getUserActivity = async (): Promise<UserActivityDto[]> => {
    const response = await http.get<UserActivityDto[]>("/Report/user-activity");
    return response.data;
};