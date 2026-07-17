import { useState } from "react";
import { Calendar, Download, Filter } from "lucide-react";

interface Props {
    onDateRangeChange: (days: number) => void;
    onExport: (format: "pdf" | "csv") => void;
}

export default function ReportFilters({ onDateRangeChange, onExport }: Props) {
    const [days, setDays] = useState(30);

    const handleDaysChange = (value: number) => {
        setDays(value);
        onDateRangeChange(value);
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-white p-4">
            <div className="flex items-center gap-3">
                <Filter size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
                
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <select
                        value={days}
                        onChange={(e) => handleDaysChange(Number(e.target.value))}
                        className="rounded border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={90}>Last 90 days</option>
                        <option value={365}>Last year</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onExport("csv")}
                    className="flex items-center gap-2 rounded border px-4 py-1.5 text-sm hover:bg-gray-50"
                >
                    <Download size={16} />
                    Export CSV
                </button>
                <button
                    onClick={() => onExport("pdf")}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                >
                    <Download size={16} />
                    Export PDF
                </button>
            </div>
        </div>
    );
}