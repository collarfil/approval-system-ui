import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { RequestByDepartment } from "../types/report.types";

interface DepartmentBarChartProps {
    data: RequestByDepartment[];
    title?: string;
}

export default function DepartmentBarChart({ data, title = "Requests by Department" }: DepartmentBarChartProps) {
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
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8b5cf6" name="Requests" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}