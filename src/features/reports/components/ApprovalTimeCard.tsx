import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { ApprovalTimeDto } from "../types/report.types";

interface ApprovalTimeCardProps {
    data: ApprovalTimeDto;
}

export default function ApprovalTimeCard({ data }: ApprovalTimeCardProps) {
    if (!data) {
        return (
            <div className="rounded-lg border bg-white p-6">
                <h3 className="text-lg font-semibold mb-4">Approval Time</h3>
                <div className="h-80 flex items-center justify-center text-gray-400">
                    No data available
                </div>
            </div>
        );
    }

    const getTrendIcon = () => {
        if (data.averageHours < 24) return <TrendingDown className="text-green-500" size={20} />;
        if (data.averageHours > 72) return <TrendingUp className="text-red-500" size={20} />;
        return <Minus className="text-yellow-500" size={20} />;
    };

    const getTrendText = () => {
        if (data.averageHours < 24) return "Good - Fast approval time";
        if (data.averageHours > 72) return "Slow - Needs improvement";
        return "Average approval time";
    };

    return (
        <div className="rounded-lg border bg-white p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Approval Time</h3>
                <Clock size={24} className="text-blue-500" />
            </div>
            
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500">Average Time</p>
                    <p className="text-3xl font-bold">{data.averageHours.toFixed(1)} hours</p>
                </div>
                
                <div className="flex items-center gap-2">
                    {getTrendIcon()}
                    <span className="text-sm text-gray-600">{getTrendText()}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                        <p className="text-sm text-gray-500">Fastest</p>
                        <p className="text-lg font-semibold text-green-600">{data.minHours.toFixed(1)}h</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Slowest</p>
                        <p className="text-lg font-semibold text-red-600">{data.maxHours.toFixed(1)}h</p>
                    </div>
                </div>
            </div>
        </div>
    );
}