import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useRoles } from "../hooks/useRoles";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { usePagination } from "@/shared/hooks/usePagination";
import Pagination from "@/shared/components/Pagination";
import CreateRoleModal from "./CreateRoleModal";

export default function RoleTable() {
    const { data = [], isLoading } = useRoles();
    const deleteRole = useDeleteRole();
    const [open, setOpen] = useState(false);

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
        return <div className="rounded-lg bg-white p-6 shadow">Loading roles...</div>;
    }

    return (
        <>
            <div className="rounded-lg bg-white shadow">
                <div className="flex items-center justify-between border-b p-6">
                    <h2 className="text-xl font-semibold">Roles</h2>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Create Role
                    </button>
                </div>

                {paginatedData.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No roles found.</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Description</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((role) => (
                                <tr key={role.id} className="border-t">
                                    <td className="px-6 py-4">{role.name}</td>
                                    <td className="px-6 py-4">{role.description}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs ${
                                                role.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {role.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteRole.mutate(role.id)}
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
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={goToPage}
                onPageSizeChange={changePageSize}
            />

            <CreateRoleModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}