import type { LucideIcon } from "lucide-react";

type StatColor = "blue" | "green" | "purple" | "orange" | "red" | "indigo" | "gray";

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    color?: StatColor;
}

const colorClasses: Record<StatColor, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    red: "bg-red-50 text-red-600 border-red-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
};

export default function StatCard({ 
    title, 
    value, 
    icon: Icon, 
    color = "blue" 
}: StatCardProps) {
    return (
        <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-80">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <Icon size={32} className="opacity-80" />
            </div>
        </div>
    );
}