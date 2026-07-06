import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

import { useDepartments } from "../hooks/useDepartments";
import { useDeleteDepartment } from "../hooks/useDeleteDepartment";
import CreateDepartmentModal from "./CreateDepartmentModal";

export default function DepartmentTable() {
    const [open, setOpen] = useState(false);

    const { data, isLoading, isError } = useDepartments();

    const deleteDepartment = useDeleteDepartment();

    if (isLoading) {
        return (
            <div className="rounded-lg bg-white p-6 shadow">
                <p>Loading departments...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-lg bg-white p-6 shadow">
                <p className="text-red-600">
                    Failed to load departments.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-lg bg-white shadow">

                <div className="flex items-center justify-between border-b p-6">

                    <h2 className="text-2xl font-semibold">
                        Departments
                    </h2>

                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        New Department
                    </button>

                </div>

                {data?.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No departments found.
                    </div>
                ) : (
                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="px-6 py-3 text-left">
                                    Name
                                </th>

                                <th className="px-6 py-3 text-left">
                                    Description
                                </th>

                                <th className="px-6 py-3 text-left">
                                    Status
                                </th>

                                <th className="px-6 py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {data?.map((department) => (

                                <tr
                                    key={department.id}
                                    className="border-t"
                                >

                                    <td className="px-6 py-4">
                                        {department.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {department.description}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${
                                                department.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {department.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            onClick={() =>
                                                deleteDepartment.mutate(
                                                    department.id
                                                )
                                            }
                                            className="text-red-600 hover:text-red-800"
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

            <CreateDepartmentModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}