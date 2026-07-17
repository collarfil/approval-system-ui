import { useState, useMemo } from "react";
import { Search, Filter, FileText, User, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useAuditLogs } from "../hooks/useAuditLogs";
import { usePagination } from "@/shared/hooks/usePagination";
import Pagination from "@/shared/components/Pagination";

type SortField = "timestamp" | "entityName" | "action" | "performedByName";
type SortDirection = "asc" | "desc";

export default function AuditLogTable() {
    const { data = [], isLoading } = useAuditLogs();
    const [filter, setFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortField, setSortField] = useState<SortField>("timestamp");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const getActionColor = (action: string) => {
        const colors: Record<string, string> = {
            "Approved": "bg-green-100 text-green-700",
            "Workflow Completed": "bg-green-100 text-green-700",
            "Rejected": "bg-red-100 text-red-700",
            "Deleted": "bg-red-100 text-red-700",
            "Escalated": "bg-yellow-100 text-yellow-700",
            "Moved To Next Step": "bg-yellow-100 text-yellow-700",
            "Workflow Started": "bg-blue-100 text-blue-700",
            "Approval": "bg-blue-100 text-blue-700",
            "Created": "bg-purple-100 text-purple-700",
            "Updated": "bg-indigo-100 text-indigo-700",
        };
        return colors[action] || "bg-gray-100 text-gray-700";
    };

    // Filter and search
    const filteredData = useMemo(() => {
        if (!data || data.length === 0) return [];
        
        let result = data;
        
        if (filter !== "all") {
            result = result.filter(log => log.action === filter);
        }
        
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(log =>
                log.entityName?.toLowerCase().includes(term) ||
                log.entityId?.toLowerCase().includes(term) ||
                log.action?.toLowerCase().includes(term) ||
                log.performedByName?.toLowerCase().includes(term) ||
                log.performedById?.toLowerCase().includes(term)
            );
        }
        
        return result;
    }, [data, filter, searchTerm]);

    // Sort
    const sortedData = useMemo(() => {
        if (!filteredData || filteredData.length === 0) return [];
        
        const sorted = [...filteredData];
        sorted.sort((a, b) => {
            let aVal: string | number = a[sortField] || "";
            let bVal: string | number = b[sortField] || "";
            
            if (sortField === "timestamp") {
                aVal = new Date(a.timestamp).getTime();
                bVal = new Date(b.timestamp).getTime();
            }
            
            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredData, sortField, sortDirection]);

    // Pagination
    const {
        currentPage,
        pageSize,
        totalPages,
        totalItems,
        paginatedData,
        goToPage,
        changePageSize,
    } = usePagination({
        data: sortedData,
        pageSize: 15,
    });

    const actions = data && data.length > 0 ? [...new Set(data.map(log => log.action))] : [];

    if (isLoading) {
        return <p className="py-8 text-center">Loading audit logs...</p>;
    }

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
        <th
            className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors select-none"
            onClick={() => handleSort(field)}
        >
            <div className="flex items-center gap-1">
                {children}
                {sortField === field && (
                    sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                )}
            </div>
        </th>
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">Audit Logs</h2>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                        />
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Actions</option>
                        {actions.map(action => (
                            <option key={action} value={action}>{action}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto rounded border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <SortableHeader field="entityName">
                                <div className="flex items-center gap-1">
                                    <FileText size={14} />
                                    Entity
                                </div>
                            </SortableHeader>
                            <th className="px-4 py-3 text-left">Entity ID</th>
                            <SortableHeader field="action">
                                <div className="flex items-center gap-1">
                                    <Filter size={14} />
                                    Action
                                </div>
                            </SortableHeader>
                            <th className="px-4 py-3 text-left">Changed From</th>
                            <th className="px-4 py-3 text-left">Changed To</th>
                            <SortableHeader field="performedByName">
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    Performed By
                                </div>
                            </SortableHeader>
                            <SortableHeader field="timestamp">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    Timestamp
                                </div>
                            </SortableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-8 text-center text-gray-500">
                                    No audit logs found.
                                </td>
                            </tr>
                        )}

                        {paginatedData.map((log) => (
                            <tr key={log.id} className="border-t hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium">{log.entityName}</td>
                                <td className="px-4 py-3 font-mono text-sm">{log.entityId}</td>
                                <td className="px-4 py-3">
                                    <span className={`rounded px-2 py-1 text-xs font-semibold ${getActionColor(log.action)}`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                                    {log.oldValue || "-"}
                                </td>
                                <td className="px-4 py-3 text-sm max-w-xs truncate">
                                    {log.newValue || "-"}
                                </td>
                                <td className="px-4 py-3">
                                    {/* Display name instead of ID */}
                                    {log.performedByName || log.performedById}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={goToPage}
                onPageSizeChange={changePageSize}
            />

            <div className="text-sm text-gray-500">
                Showing {paginatedData.length} of {totalItems} entries
            </div>
        </div>
    );
}