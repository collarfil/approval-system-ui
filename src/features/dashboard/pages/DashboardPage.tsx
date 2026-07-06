import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {

    const {
        data,
        isLoading,
        isError,
    } = useDashboard();

    if (isLoading) {
        return (
            <div className="p-6">
                Loading dashboard...
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="p-6 text-red-600">
                Failed to load dashboard.
            </div>
        );
    }

    const cards = [
        {
            title: "Users",
            value: data.totalUsers,
        },
        {
            title: "Departments",
            value: data.totalDepartments,
        },
        {
            title: "Roles",
            value: data.totalRoles,
        },
        {
            title: "Workflows",
            value: data.totalWorkflowDefinitions,
        },
        {
            title: "Active Workflows",
            value: data.activeWorkflowDefinitions,
        },
        {
            title: "Requests",
            value: data.totalRequests,
        },
        {
            title: "Pending Requests",
            value: data.pendingRequests,
        },
        {
            title: "Approved Requests",
            value: data.approvedRequests,
        },
        {
            title: "Rejected Requests",
            value: data.rejectedRequests,
        },
        {
            title: "Escalated Requests",
            value: data.escalatedRequests,
        },
        {
            title: "Pending Approvals",
            value: data.pendingApprovalSteps,
        },
        {
            title: "Notifications",
            value: data.totalNotifications,
        },
        {
            title: "Unread Notifications",
            value: data.unreadNotifications,
        },
        {
            title: "Audit Logs",
            value: data.totalAuditLogs,
        },
        {
            title: "Uploaded Files",
            value: data.totalUploadedFiles,
        },
    ];

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Overview of the Approval System.
                </p>

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-lg bg-white p-6 shadow"
                    >

                        <p className="text-sm text-gray-500">
                            {card.title}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {card.value}
                        </h2>

                    </div>

                ))}

            </div>

        </div>

    );
}