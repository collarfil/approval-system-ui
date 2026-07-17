import { User, FileText, CheckCircle } from "lucide-react";
import type { UserActivityDto } from "../types/report.types";

interface UserActivityTableProps {
    data: UserActivityDto[];
}

export default function UserActivityTable({ data }: UserActivityTableProps) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-lg border bg-white p-6">
                <h3 className="text-lg font-semibold mb-4">User Activity</h3>
                <div className="py-8 text-center text-gray-400">
                    No user activity data available
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border bg-white p-6">
            <h3 className="text-lg font-semibold mb-4">User Activity</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">
                                <div className="flex items-center justify-center gap-1">
                                    <FileText size={14} />
                                    Requests
                                </div>
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">
                                <div className="flex items-center justify-center gap-1">
                                    <CheckCircle size={14} />
                                    Approvals
                                </div>
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.userId} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-gray-400" />
                                        <span className="font-medium">{user.userName}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">{user.requestCount}</td>
                                <td className="px-4 py-3 text-center">{user.approvalCount}</td>
                                <td className="px-4 py-3 text-center font-semibold">
                                    {user.requestCount + user.approvalCount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}