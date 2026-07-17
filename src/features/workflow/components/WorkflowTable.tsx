import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useWorkflows } from "../hooks/useWorkflows";
import { useDeleteWorkflow } from "../hooks/useDeleteWorkflow";
import { usePagination } from "@/shared/hooks/usePagination";
import Pagination from "@/shared/components/Pagination";
import CreateWorkflowModal from "./CreateWorkflowModal";

export default function WorkflowTable() {
    const [open, setOpen] = useState(false);
    const { data = [], isLoading } = useWorkflows();
    const deleteWorkflow = useDeleteWorkflow();

    const {
        currentPage,
        pageSize,
        totalPages,
        totalItems,
        paginatedData,
        goToPage,
        changePageSize,
    } = usePagination({
        data,
        pageSize: 10,
    });

    if (isLoading) {
        return <p className="py-8 text-center">Loading workflows...</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Workflow Definitions</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />
                    New Workflow
                </button>
            </div>

            <CreateWorkflowModal open={open} onClose={() => setOpen(false)} />

            <div className="overflow-x-auto rounded border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Description</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-500">
                                    No workflow definitions found.
                                </td>
                            </tr>
                        )}

                        {paginatedData.map((workflow) => (
                            <tr key={workflow.id} className="border-t">
                                <td className="px-4 py-3">{workflow.name}</td>
                                <td className="px-4 py-3">{workflow.description}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded px-2 py-1 text-xs font-semibold ${
                                            workflow.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {workflow.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => deleteWorkflow.mutate(workflow.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
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
        </div>
    );
}