export interface DashboardSummary {
    totalUsers: number;
    totalDepartments: number;
    totalRoles: number;

    totalWorkflowDefinitions: number;
    activeWorkflowDefinitions: number;

    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    escalatedRequests: number;

    pendingApprovalSteps: number;

    totalNotifications: number;
    unreadNotifications: number;

    totalAuditLogs: number;

    totalUploadedFiles: number;
}