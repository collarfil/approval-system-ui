import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import type { RequestTrend } from "../types/report.types";

interface RequestTrendChartProps {
    data: RequestTrend[];
    title?: string;
}

export default function RequestTrendChart({ data, title = "Request Trend" }: RequestTrendChartProps) {
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
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="Requests"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}