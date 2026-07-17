import { useState } from "react";
import { 
    FileText, 
    Clock, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    Users,
    Building2,
    Bell,
    Upload,
    FileSearch
} from "lucide-react";
import { useDashboardStats } from "../hooks/useReports";
import StatCard from "../components/StatCard";
import RequestTrendChart from "../components/RequestTrendChart";
import StatusPieChart from "../components/StatusPieChart";
import DepartmentBarChart from "../components/DepartmentBarChart";
import ApprovalTimeCard from "../components/ApprovalTimeCard";
import UserActivityTable from "../components/UserActivityTable";
import ReportFilters from "../components/ReportFilters";
import { useRequestTrend, useRequestsByStatus, useRequestsByDepartment, useApprovalTime, useUserActivity } from "../hooks/useReports";

export default function ReportPage() {
    const [dateRange, setDateRange] = useState(30);
    
    const { data: stats, isLoading: statsLoading } = useDashboardStats();
    const { data: trend, isLoading: trendLoading } = useRequestTrend(dateRange);
    const { data: statusData, isLoading: statusLoading } = useRequestsByStatus();
    const { data: departmentData, isLoading: deptLoading } = useRequestsByDepartment();
    const { data: approvalTime, isLoading: approvalLoading } = useApprovalTime();
    const { data: userActivity, isLoading: userLoading } = useUserActivity();

    const isLoading = statsLoading || trendLoading || statusLoading || deptLoading || approvalLoading || userLoading;

    const handleDateRangeChange = (days: number) => {
        setDateRange(days);
    };

    const handleExport = (format: "pdf" | "csv") => {
        console.log(`Exporting as ${format}...`);
        alert(`Export as ${format.toUpperCase()} coming soon!`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Reports & Analytics</h1>
                <p className="mt-1 text-gray-500">
                    Comprehensive analytics and insights for your approval workflow system.
                </p>
            </div>

            {/* Filters */}
            <ReportFilters onDateRangeChange={handleDateRangeChange} onExport={handleExport} />

            {/* Stats Grid */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    <StatCard title="Total Requests" value={stats.totalRequests} icon={FileText} color="blue" />
                    <StatCard title="Pending" value={stats.pendingRequests} icon={Clock} color="orange" />
                    <StatCard title="Approved" value={stats.approvedRequests} icon={CheckCircle} color="green" />
                    <StatCard title="Rejected" value={stats.rejectedRequests} icon={XCircle} color="red" />
                    <StatCard title="Escalated" value={stats.escalatedRequests} icon={AlertCircle} color="red" />
                    <StatCard title="Pending Approvals" value={stats.pendingApprovals} icon={Clock} color="orange" />
                    <StatCard title="Users" value={stats.totalUsers} icon={Users} color="purple" />
                    <StatCard title="Departments" value={stats.totalDepartments} icon={Building2} color="indigo" />
                    <StatCard title="Notifications" value={stats.totalNotifications} icon={Bell} color="blue" />
                    <StatCard title="Unread" value={stats.unreadNotifications} icon={Bell} color="red" />
                    <StatCard title="Audit Logs" value={stats.totalAuditLogs} icon={FileSearch} color="gray" />
                    <StatCard title="Files" value={stats.totalUploadedFiles} icon={Upload} color="green" />
                </div>
            )}

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trend && <RequestTrendChart data={trend} title="Request Trend" />}
                {statusData && <StatusPieChart data={statusData} title="Requests by Status" />}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {departmentData && (
                    <div className="lg:col-span-2">
                        <DepartmentBarChart data={departmentData} title="Requests by Department" />
                    </div>
                )}
                {approvalTime && <ApprovalTimeCard data={approvalTime} />}
            </div>

            {/* User Activity Table */}
            {userActivity && userActivity.length > 0 && (
                <UserActivityTable data={userActivity} />
            )}
        </div>
    );
}