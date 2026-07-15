import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useUsersWithDepartments } from "../hooks/useUsersWithDepartments";
import { useDeleteUser } from "../hooks/useDeleteUser";
import CreateUserModal from "./CreateUserModal";

export default function UserTable() {
    const { data: users, isLoading } = useUsersWithDepartments();
    const deleteMutation = useDeleteUser();
    const [open, setOpen] = useState(false);

    if (isLoading) {
        return <p className="py-8 text-center">Loading users...</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Users</h2>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Create User
                </button>
            </div>

            <CreateUserModal open={open} onClose={() => setOpen(false)} />

            <div className="overflow-x-auto rounded border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">First Name</th>
                            <th className="px-4 py-3 text-left">Last Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Department</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}

                        {users?.map((user) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">{user.firstName}</td>
                                <td className="px-4 py-3">{user.lastName}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    {/* Display department name instead of ID */}
                                    {user.departmentName || "No Department"}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded px-2 py-1 text-xs font-semibold ${
                                            user.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => deleteMutation.mutate(user.id)}
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
        </div>
    );
}