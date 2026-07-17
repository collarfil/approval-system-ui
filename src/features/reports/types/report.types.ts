export interface DashboardStats {
    totalUsers: number;
    totalDepartments: number;
    totalRoles: number;
    totalWorkflows: number;
    activeWorkflows: number;
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    escalatedRequests: number;
    pendingApprovals: number;
    totalNotifications: number;
    unreadNotifications: number;
    totalAuditLogs: number;
    totalUploadedFiles: number;
}

export interface RequestTrend {
    date: string;
    count: number;
}

export interface RequestByStatus {
    status: string;
    count: number;
}

export interface RequestByDepartment {
    department: string;
    count: number;
}

export interface ApprovalTimeDto {
    averageHours: number;
    minHours: number;
    maxHours: number;
}

export interface UserActivityDto {
    userId: string;
    userName: string;
    requestCount: number;
    approvalCount: number;
}