import { useState } from "react";

import { useUsers } from "../hooks/useUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";

import CreateUserModal from "./CreateUserModal";

export default function UserTable() {

    const { data, isLoading } = useUsers();

    const deleteMutation = useDeleteUser();

    const [open, setOpen] = useState(false);

    if (isLoading) {
        return (
            <p className="text-center py-8">
                Loading users...
            </p>
        );
    }

    return (
        <div className="space-y-4">

            <div className="flex justify-between">

                <h2 className="text-xl font-semibold">
                    Users
                </h2>

                <button
                    onClick={() => setOpen(true)}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Create User
                </button>

            </div>

            <CreateUserModal
                open={open}
                onClose={() => setOpen(false)}
            />

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

                        {data?.length === 0 && (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No users found.
                                </td>

                            </tr>

                        )}

                        {data?.map(user => (

                            <tr
                                key={user.id}
                                className="border-t"
                            >

                                <td className="px-4 py-3">
                                    {user.firstName}
                                </td>

                                <td className="px-4 py-3">
                                    {user.lastName}
                                </td>

                                <td className="px-4 py-3">
                                    {user.email}
                                </td>

                                <td className="px-4 py-3 font-mono text-sm">
                                    {user.departmentId}
                                </td>

                                <td className="px-4 py-3">

                                    <span
                                        className={`rounded px-2 py-1 text-xs font-semibold ${
                                            user.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {user.isActive
                                            ? "Active"
                                            : "Inactive"}
                                    </span>

                                </td>

                                <td className="px-4 py-3 text-right">

                                    <button
                                        onClick={() =>
                                            deleteMutation.mutate(user.id)
                                        }
                                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                    >
                                        Delete
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