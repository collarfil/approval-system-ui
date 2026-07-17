import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { RequestByStatus } from "../types/report.types";

interface StatusPieChartProps {
    data: RequestByStatus[];
    title?: string;
}

const COLORS: Record<string, string> = {
    Pending: "#f59e0b",
    Approved: "#22c55e",
    Rejected: "#ef4444",
    Escalated: "#8b5cf6",
    Draft: "#6b7280",
    InProgress: "#3b82f6",
    Cancelled: "#9ca3af",
};

const getStatusColor = (status: string): string => {
    return COLORS[status] || "#6b7280";
};

// Custom label formatter to handle undefined percent
const renderCustomLabel = (entry: { name?: string; percent?: number }) => {
    const { name, percent } = entry;
    if (!name || percent === undefined || percent === null) {
        return "";
    }
    return `${name}: ${(percent * 100).toFixed(0)}%`;
};

export default function StatusPieChart({ data, title = "Requests by Status" }: StatusPieChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-lg border bg-white p-6">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <div className="h-80 flex items-center justify-center text-gray-400">
                    No data available
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border bg-white p-6">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="status"
                        >
                            {data.map((entry) => (
                                <Cell key={entry.status} fill={getStatusColor(entry.status)} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}